/*
 * VM observer just for use in POC. Not to be used in production.
 */

const observables = new WeakMap();
const callbackTimeouts = new WeakMap();

function get( target, key, receiver ) {
    const result = Reflect.get( target, key, receiver );

    // if ( typeof result === 'object' ) {
    //     const observableResult = observable( result );
    //     registerObserverToParentObservable( receiver, observableResult );
    //     Reflect.set( target, key, observableResult, receiver );
    //     return observableResult;
    // }

    return result;
}

function registerObserverToParentObservable( parentObservable, observable ) {
    if ( observables.has( parentObservable ) ) {
        observables.get( observable ).push( ( value, key, target ) => {
            observables.get( parentObservable ).forEach( callback => callCallback( callback, value, key, target ) );
        } );
    }
}

function set( target, key, value, receiver ) {
    let result = value;

    if ( typeof value === 'object' ) {
        result = observable( value );
        registerObserverToParentObservable( receiver, result );
    }

    Reflect.set( target, key, result, receiver );

    if ( observables.has( receiver ) ) {
        observables.get( receiver ).forEach( callback => callCallback( callback, result, key, receiver ) );
    }

    return true;
}

function callCallback( callback, value, key, target ) {
    if ( callbackTimeouts.has( callback ) ) {
        clearTimeout( callbackTimeouts.get( callback ) );
    }
    callbackTimeouts.set( callback, setTimeout( () => {
        callback( value, key, target );
        callbackTimeouts.delete( callback );
    }, 1 ) );
}

export function observe( observable, callback ) {
    if ( observables.has( observable ) ) {
        observables.get( observable ).push( callback );
    }
}

export function observable( obj ) {
    const proxy = new Proxy( obj, {get, set} );
    observables.set( proxy, [] );
    return proxy;
}

export function isObservable( obj ) {
    return observables.has( obj );
}