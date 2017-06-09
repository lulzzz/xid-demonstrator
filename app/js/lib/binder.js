/*
 * DOM and VM binder just for use in POC. Not to be used in production.
 */

import {
    isObservable,
    observe
} from '../lib/observer';

import UtilHelper from '../helper/util-helper';

function createDataBindFromElement( element ) {
    let dataBind = null;
    try {
        dataBind = UtilHelper.parseJSON( element.getAttribute( 'data-bind' ) );
    }
    catch ( e ) {
        console.error( 'createDataBindFromElement', element, e );
    }

    return dataBind || {};
}

const boundDomGlobal = new WeakMap();
const templatesGlobal = {};

function setBoundDomGlobal( element, key, dataBind ) {
    if ( !boundDomGlobal.has( element ) ) {
        boundDomGlobal.set( element, {} );
    }
    boundDomGlobal.get( element )[key] = dataBind;
}

function hasBoundDomGlobal( element, key ) {
    return boundDomGlobal.has( element ) && !!boundDomGlobal.get( element )[key];
}

function renderTemplate( templateId, rootElement, data, dataFilter, rootVm ) {
    const templateScriptElement = templatesGlobal[templateId] || document.querySelector( `script[data-template=${templateId}]` );

    if ( !templateScriptElement ) {
        console.warn( 'renderTemplate', 'Could not render template', templateId );
        return;
    }

    const template = document.createElement( 'div' );
    template.innerHTML = templateScriptElement.innerHTML;

    let dataAsList = Array.isArray( data ) ? data : (typeof data === 'object' ? data : [data]);

    const boundDoms = new Map();
    Object.keys( dataAsList ).forEach( key => {
        const vm = dataAsList[key];

        Array.from( template.children ).forEach( templateChild => {
            const clonedTemplate = templateChild.cloneNode( true );
            applyBindings( clonedTemplate, vm, data, rootVm, false, key );
            rootElement.appendChild( clonedTemplate );

            boundDoms.set( vm, clonedTemplate );

            if ( isObservable( vm ) ) {
                observe( vm, () => {
                    applyBindings( clonedTemplate, vm, data, rootVm, true, key );
                } );
            }
        } );
    } );

    if ( isObservable( data ) ) {
        observe( data, ( value, key ) => {
            if ( key === 'length' ) {
                data.forEach( vm => {
                    // new item
                    if ( !boundDoms.has( vm ) ) {
                        const clonedTemplate = template.children[0].cloneNode( true );
                        applyBindings( clonedTemplate, vm, data, rootVm );
                        rootElement.appendChild( clonedTemplate );
                        boundDoms.set( vm, clonedTemplate );

                        if ( isObservable( vm ) ) {
                            observe( vm, () => {
                                applyBindings( clonedTemplate, vm, data, rootVm, true );
                            } );
                        }
                    }
                } );

                // remove nodes
                boundDoms.forEach( ( element, vm ) => {
                    if ( data.indexOf( vm ) === -1 && element.parentNode ) {
                        element.parentNode.removeChild( element );
                        boundDoms.delete( vm );
                    }
                } );
            }
        } );
    }
}

export function applyBindings( rootElement, vm, parentVm, rootVm, isUpdate, index ) {
    const dataBinds = Array.from( rootElement.querySelectorAll( '[data-bind]' ) );

    if ( rootElement.getAttribute( 'data-bind' ) ) {
        dataBinds.push( rootElement );
    }

    const getDataBindValue = ( key, isApplyFunction ) => {
        const keys = key.split( '.' );
        const paths = keys.slice( 0, keys.length - 1 );

        const funcMatch = String( keys.slice( -1 ) ).match( /^(.*?)(?:\((.*?)\))?$/ );
        key = funcMatch && funcMatch[1] || keys.slice( -1 );
        const args = (funcMatch && funcMatch[2] && funcMatch[2].split( ',' ).map( par => par.trim() ).filter( par => !!par ) || []).map( arg => {
            if ( arg === '$index' && index !== undefined ) {
                return index;
            }
            return arg;
        } );

        let context = vm;
        paths.forEach( v => {
            if ( v === '$root' ) {
                context = rootVm || parentVm || vm;
            }
            else if ( context[v] ) {
                context = context[v];
            }
        } );

        if ( key === '$index' && index !== undefined ) {
            return {context, key, value: index};
        }

        if ( key === '$data' ) {
            return {context, key, value: context};
        }

        if ( !context || context[key] === undefined || context[key] === null ) {
            return {context, key, value: '', isUndefined: true};
        }

        if ( typeof context[key] === 'function' ) {
            if ( isApplyFunction ) {
                return {context, key, value: context[key].apply( context[key], args.concat( vm ) )};
            }
            else {
                return {context, key, value: context[key].bind( context[key], ...args.concat( vm ) )}; // TODO concat args
            }
        }

        return {
            context,
            key,
            value: context[key]
        };
    };

    const renderDataBindTemplate = ( templateId, templateContainerElement, dataKey, dataFilter ) => {
        renderTemplate( templateId, templateContainerElement, getDataBindValue( dataKey ).value, dataFilter, rootVm || vm );
    };

    dataBinds.forEach( element => {
        const dataBind = createDataBindFromElement( element );

        Object.keys( dataBind ).forEach( key => {
            switch ( key ) {
                case 'text': {
                    let dataBindValue = getDataBindValue( dataBind[key], true );
                    element.textContent = dataBindValue.value;

                    if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, key ) ) {
                        observe( dataBindValue.context, () => {
                            element.textContent = getDataBindValue( dataBind[key], true ).value;
                        } );
                        setBoundDomGlobal( element, key, dataBind[key] );
                    }
                    break;
                }

                case 'value': {
                    let dataBindValue = getDataBindValue( dataBind[key], true );
                    element.value = dataBindValue.value;

                    if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, key ) ) {
                        element.addEventListener( 'change', ( event ) => {
                            dataBindValue.context[dataBindValue.key] = event.target.value;
                        }, false );

                        observe( dataBindValue.context, () => {
                            element.value = getDataBindValue( dataBind[key], true ).value;
                        } );
                        setBoundDomGlobal( element, key, dataBind[key] );
                    }
                    break;
                }

                case 'html': {
                    let dataBindValue = getDataBindValue( dataBind[key], true );
                    element.innerHTML = dataBindValue.value;

                    if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, key ) ) {
                        observe( dataBindValue.context, () => {
                            element.innerHTML = getDataBindValue( dataBind[key], true ).value;
                        } );
                        setBoundDomGlobal( element, key, dataBind[key] );
                    }
                    break;
                }

                case 'click': {
                    if ( !isUpdate ) {
                        element.addEventListener( 'click', getDataBindValue( dataBind[key] ).value, false );
                    }
                    break;
                }

                case 'attr': {
                    Object.keys( dataBind[key] ).forEach( attrKey => {
                        const dataBindValue = getDataBindValue( dataBind[key][attrKey], true );
                        if ( typeof dataBindValue.value === 'boolean' && !dataBindValue.value ) {
                            element.removeAttribute( attrKey );
                        }
                        else {
                            element.setAttribute( attrKey, dataBindValue.value );
                        }

                        if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, key ) ) {
                            observe( dataBindValue.context, () => {
                                const dataBindValue = getDataBindValue( dataBind[key][attrKey], true );
                                if ( typeof dataBindValue.value === 'boolean' && !dataBindValue.value ) {
                                    element.removeAttribute( attrKey );
                                }
                                else {
                                    element.setAttribute( attrKey, dataBindValue.value );
                                }
                            } );
                            setBoundDomGlobal( element, key, dataBind[key] );
                        }
                    } );
                    break;
                }

                case 'template': {
                    renderDataBindTemplate( dataBind.template.id, element, dataBind.template.data, dataBind.template.filter );
                    break;
                }

                case 'css': {
                    Object.keys( dataBind[key] ).forEach( attrKey => {
                        const cssClass = attrKey.replace( /^!/, '' );
                        const isReverse = /^!/.test( attrKey );
                        const dataBindValue = getDataBindValue( dataBind[key][attrKey], true );

                        if ( dataBindValue.value ) {
                            if ( isReverse ) {
                                element.classList.remove( cssClass );
                            }
                            else {
                                element.classList.add( cssClass );
                            }
                        }
                        else {
                            if ( isReverse ) {
                                element.classList.add( cssClass );
                            }
                            else {
                                element.classList.remove( cssClass );
                            }
                        }

                        if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, attrKey ) ) {
                            observe( dataBindValue.context, () => {
                                const dataBindValue = getDataBindValue( dataBind[key][attrKey], true );

                                if ( dataBindValue.value ) {
                                    if ( isReverse ) {
                                        element.classList.remove( cssClass );
                                    }
                                    else {
                                        element.classList.add( cssClass );
                                    }
                                }
                                else {
                                    if ( isReverse ) {
                                        element.classList.add( cssClass );
                                    }
                                    else {
                                        element.classList.remove( cssClass );
                                    }
                                }
                            } );
                            setBoundDomGlobal( element, attrKey, dataBind[key] );
                        }
                    } );
                    break;
                }

                case 'visible': {
                    let dataBindValue = getDataBindValue( dataBind[key], true );

                    if ( !dataBindValue.value ) {
                        element.style.display = 'none';
                    }
                    else {
                        element.style.removeProperty( 'display' );
                    }

                    if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, key ) ) {
                        observe( dataBindValue.context, () => {
                            if ( !getDataBindValue( dataBind[key], true ).value ) {
                                element.style.display = 'none';
                            }
                            else {
                                element.style.removeProperty( 'display' );
                            }
                        } );
                        setBoundDomGlobal( element, key, dataBind[key] );
                    }
                    break;
                }

                case 'hidden': {
                    let dataBindValue = getDataBindValue( dataBind[key], true );

                    if ( dataBindValue.value ) {
                        element.style.display = 'none';
                    }
                    else {
                        element.style.removeProperty( 'display' );
                    }

                    if ( isObservable( dataBindValue.context ) && !hasBoundDomGlobal( element, key ) ) {
                        observe( dataBindValue.context, () => {
                            if ( getDataBindValue( dataBind[key], true ).value ) {
                                element.style.display = 'none';
                            }
                            else {
                                element.style.removeProperty( 'display' );
                            }
                        } );
                        setBoundDomGlobal( element, key, dataBind[key] );
                    }
                    break;
                }
            }
        } );
    } );
}