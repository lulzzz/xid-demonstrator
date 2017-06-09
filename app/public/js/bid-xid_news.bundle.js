/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _features = __webpack_require__(17);

var _features2 = _interopRequireDefault(_features);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ease in/out based on danro's jQuery plugin
 * https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 * @param time {Number} current time
 * @param startVal {Number} start value
 * @param changeInVal {Number} change in value
 * @param duration {Number} duration
 * @returns {Number}
 */
function easeInOutQuad(time, startVal, changeInVal, duration) {
    var d2 = duration / 2;
    var t2 = time / d2;
    if (t2 < 1) {
        return changeInVal / 2 * t2 * t2 + startVal;
    }
    t2--;
    return -changeInVal / 2 * (t2 * (t2 - 2) - 1) + startVal;
}

var DomHelper = function () {
    function DomHelper() {
        _classCallCheck(this, DomHelper);
    }

    _createClass(DomHelper, null, [{
        key: 'scrollIntoView',

        /**
         * @param {HTMLElement} element
         * @param [options] {Object}
         * @param [options.duration] {Number} Duration in milliseconds. Defaults to 300.
         * @param [options.native] {Boolean} Use native behavior (no animation). Defaults to false.
         * @param [options.offset] {Number}
         * @param [options.alignToTop] {Boolean}
         *      If true, the top of the element will be aligned to the top of the visible area of the scrollable ancestor.
         *      If false, the bottom of the element will be aligned to the bottom of the visible area of the scrollable ancestor.
         */
        value: function scrollIntoView(element, options) {
            options = options || {};

            function scrollTo(element, to, duration) {
                var el = element;
                if (!el) {
                    return;
                }
                var start = el.scrollTop;
                var change = Math.min(to, el.scrollHeight - el.offsetHeight) - start;
                var currentTime = 0;
                var increment = 30;

                if (change === 0) {
                    return;
                }

                var animateScroll = function animateScroll() {
                    currentTime += increment;
                    el.scrollTop = easeInOutQuad(currentTime, start, change, duration);

                    if (currentTime < duration) {
                        setTimeout(animateScroll, increment);
                    }
                };
                animateScroll();
            }

            function getScrollableParent() {
                var parent = element.parentNode;

                while (parent) {

                    var currentStyle = window.getComputedStyle(parent) || {};
                    var re = /auto|scroll/i;

                    if (re.test(currentStyle.overflow) || re.test(currentStyle.overflowY)) {
                        return parent;
                    } else {
                        parent = parent.parentNode;
                    }
                }
                return document.body;
            }

            if (options.native) {
                return document.HTMLElement.prototype.scrollIntoView.call(element, options.alignToTop, options);
            }

            var el = element;
            var parent = getScrollableParent();
            var offsetEl = el;
            var top = 0;

            while (offsetEl && offsetEl !== parent) {
                top += offsetEl.offsetTop;
                offsetEl = offsetEl.offsetParent;
            }

            top -= options.offset || 0;

            if (!options.alignToTop) {
                top = top - parent.offsetHeight + el.offsetHeight;
            }

            scrollTo(parent, top, options.duration || 300);
        }

        /**
         * @param {HTMLElement} elm
         * @param {String} selector
         * @return {Node|null} Null if not found
         */

    }, {
        key: 'findParentBySelector',
        value: function findParentBySelector(elm, selector) {
            function collectionHas(a, b) {
                for (var i = 0, len = a.length; i < len; i++) {
                    if (a[i] == b) {
                        return true;
                    }
                }
                return false;
            }

            var all = document.querySelectorAll(selector);
            var cur = elm.parentNode;
            while (cur && !collectionHas(all, cur)) {
                cur = cur.parentNode;
            }
            return cur;
        }
    }, {
        key: 'loadImagePromise',
        value: function loadImagePromise(src) {
            return new Promise(function (fulfill) {
                var downloadingImage = new window.Image();
                downloadingImage.onload = fulfill;
                downloadingImage.onerror = fulfill;
                downloadingImage.src = src;
            });
        }

        /**
         * @param {Boolean} isAdd
         * @param {HTMLElement} element
         * @param {String} className
         * @param {Number} [defDelay=250]
         * @return {Promise}
         */

    }, {
        key: 'toggleAnimationClass',
        value: function toggleAnimationClass(isAdd, element, className) {
            var defDelay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 250;

            var transitionEvent = _features2.default.supportsTransitionEvent;
            var animationEvent = _features2.default.supportsAnimationEvent;

            var timeoutPromise = void 0;
            var transitionPromise = void 0;
            var animationPromise = void 0;

            timeoutPromise = new Promise(function (fulfill) {
                return setTimeout(fulfill, defDelay);
            });

            if (transitionEvent && animationEvent) {
                transitionPromise = new Promise(function (fulfill) {
                    return element.addEventListener(transitionEvent, fulfill, false);
                });
                animationPromise = new Promise(function (fulfill) {
                    return element.addEventListener(animationEvent, fulfill, false);
                });
            }

            if (isAdd) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }

            return Promise.race([timeoutPromise, transitionPromise, animationPromise]);
        }

        /**
         * @param {HTMLElement} element
         * @param {String} className
         * @param {Number} [defDelay=250]
         * @return {Promise}
         */

    }, {
        key: 'addAnimationClass',
        value: function addAnimationClass(element, className) {
            var defDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

            return DomHelper.toggleAnimationClass(true, element, className, defDelay);
        }

        /**
         * @param {HTMLElement} element
         * @param {String} className
         * @param {Number} [defDelay=250]
         * @return {Promise}
         */

    }, {
        key: 'removeAnimationClass',
        value: function removeAnimationClass(element, className) {
            var defDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

            return DomHelper.toggleAnimationClass(false, element, className, defDelay);
        }

        /**
         * Add multiple event listeners
         * @param el {HTMLElement}
         * @param ev {Array}
         * @param listener {Function}
         */

    }, {
        key: 'addListeners',
        value: function addListeners(el, ev, listener) {
            for (var i = 0; i < ev.length; i++) {
                el.addEventListener(ev[i], listener, false);
            }
        }

        /**
         * Add multiple eventlisteners
         * @param el {HTMLElement}
         * @param ev {Array}
         * @param listener {Function}
         */

    }, {
        key: 'removeListeners',
        value: function removeListeners(el, ev, listener) {
            for (var i = 0; i < ev.length; i++) {
                el.removeEventListener(ev[i], listener, false);
            }
        }

        /**
         * @param {HTMLElement} containerElement
         * @param {Object} [options]
         * @param {Function} [options.onResized] Function(width, height)
         */

    }, {
        key: 'initResizeClient',
        value: function initResizeClient(containerElement) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            /**
             * Get the client container
             * @type {HTMLElement}
             */
            var client = containerElement;

            // No client container?
            if (!client) {
                return;
            }

            /**
             * Get resize handle
             * @type {HTMLElement}
             */
            var resizer = client.querySelector('button');

            // No resize handle?
            if (!resizer) {
                return;
            }

            DomHelper.addListeners(resizer, ['mousedown', 'touchstart'], initResize);

            /**
             * To prevent mouse/touch event to disappear into the iframe we need to cover by
             * adding this invisible container on top of the iframe
             * @type {Element}
             */
            var blocker = document.createElement('div');
            blocker.className = 'blocker';
            //noinspection JSUndefinedPropertyAssignment
            blocker.show = function () {
                client.appendChild(blocker);
            };
            //noinspection JSUndefinedPropertyAssignment
            blocker.hide = function () {
                client.removeChild(blocker);
            };

            var start = void 0,
                docEl = document.querySelector('body');

            /**
             * Start resize mode
             * @param e {Event}
             */
            function initResize(e) {
                e.preventDefault();
                //noinspection JSUnresolvedFunction
                blocker.show();
                start = {
                    x: e.pageX || e.clientX,
                    y: e.pageY || e.clientY,
                    w: parseInt(window.getComputedStyle(client, null).width, 10),
                    h: parseInt(window.getComputedStyle(client, null).height, 10)
                };
                DomHelper.addListeners(docEl, ['mousemove', 'touchmove'], doDrag);
                DomHelper.addListeners(docEl, ['mouseup', 'touchend'], stopDrag);
            }

            /**
             * Do resize on move
             * @param e {Event}
             */
            function doDrag(e) {
                e.preventDefault();
                client.style.width = Math.round((start.w + ((e.pageX || e.clientX) - start.x) * 2) / 2) * 2 + 'px';
                client.style.height = Math.round((start.h + ((e.pageY || e.clientY) - start.y) * 2) / 2) * 2 + 'px';

                if (options.onResized) {
                    options.onResized(parseInt(client.style.width), parseInt(client.style.height));
                }
            }

            /**
             * End resize mode. Cleanup
             * @param e {Event}
             */
            function stopDrag(e) {
                e.preventDefault();
                //noinspection JSUnresolvedFunction
                blocker.hide();
                DomHelper.removeListeners(docEl, ['mousemove', 'touchmove'], doDrag);
                DomHelper.removeListeners(docEl, ['mouseup', 'touchend'], stopDrag);
            }
        }

        /**
         * @param {HTMLElement} rootElement
         */

    }, {
        key: 'enableView',
        value: function enableView(rootElement) {
            Array.from(rootElement.querySelectorAll('button, input, a, [data-tabindex]')).forEach(function (element) {
                if (element.getAttribute('data-tabindex')) {
                    element.setAttribute('tabindex', element.getAttribute('data-tabindex'));
                    element.removeAttribute('data-tabindex');
                } else if (element.tagName === 'A') {
                    element.setAttribute('href', element.getAttribute('data-href'));
                    element.removeAttribute('data-href');
                } else {
                    element.disabled = false;
                }
            });
        }

        /**
         * @param {HTMLElement} rootElement
         */

    }, {
        key: 'disableView',
        value: function disableView(rootElement) {
            Array.from(rootElement.querySelectorAll('button, input, a, [tabindex]')).forEach(function (element) {
                if (element.getAttribute('tabindex')) {
                    element.setAttribute('data-tabindex', element.getAttribute('tabindex'));
                    element.removeAttribute('tabindex');
                } else if (element.tagName === 'A') {
                    element.setAttribute('data-href', element.getAttribute('href'));
                    element.removeAttribute('href');
                } else {
                    element.disabled = true;
                }
            });
        }

        /**
         * @param {HTMLElement} form
         * @returns {Object}
         */

    }, {
        key: 'formToObject',
        value: function formToObject(form) {
            var result = {};
            if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) === 'object' && form.nodeName === 'FORM') {
                Array.from(form.elements).forEach(function (control) {
                    if (control.name && !control.disabled && ['file', 'reset', 'submit', 'button'].indexOf(control.type) === -1 && !control.getAttribute('data-ignore')) {
                        if (control.type === 'select-multiple') {
                            Array.from(control.options).forEach(function (option) {
                                if (option.selected) {
                                    result[control.name] = option.value;
                                }
                            });
                        } else if (['checkbox', 'radio'].indexOf(control.type) === -1 || control.checked) {
                            var arrayMatch = control.name.match(/^([\w\-]+)\[([\w\-]+)]$/);
                            var objectMatch = control.name.match(/^([\w\-]+)\.([\w\-]+)$/);

                            if (arrayMatch) {
                                var _arrayMatch$slice = arrayMatch.slice(1),
                                    _arrayMatch$slice2 = _slicedToArray(_arrayMatch$slice, 2),
                                    key = _arrayMatch$slice2[0],
                                    prop = _arrayMatch$slice2[1];

                                if (!result[key]) {
                                    result[key] = [{}];
                                }

                                if (typeof result[key][result[key].length - 1][prop] !== 'undefined') {
                                    result[key].push({});
                                }

                                result[key][result[key].length - 1][prop] = control.value;
                            } else if (objectMatch) {
                                var _objectMatch$slice = objectMatch.slice(1),
                                    _objectMatch$slice2 = _slicedToArray(_objectMatch$slice, 2),
                                    _key = _objectMatch$slice2[0],
                                    _prop = _objectMatch$slice2[1];

                                if (!result[_key]) {
                                    result[_key] = {};
                                }

                                result[_key][_prop] = control.value;
                            } else {
                                result[control.name] = control.value;
                            }
                        }
                    }
                });
            }
            return result;
        }
    }, {
        key: 'serializeObjectToUrl',
        value: function serializeObjectToUrl(obj) {
            var arr = [];
            for (var key in obj) {
                arr.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return arr.join('&');
        }

        /**
         * @param {String} path
         * @param {Object} params
         * @param {String} [method=post]
         */

    }, {
        key: 'submit',
        value: function submit(path, params) {
            var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';

            var form = document.createElement('form');
            form.setAttribute('method', method);
            form.setAttribute('action', path);

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement('input');
                    hiddenField.setAttribute('type', 'hidden');
                    hiddenField.setAttribute('name', key);
                    hiddenField.setAttribute('value', params[key]);

                    form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
        }

        /**
         * @returns {Boolean}
         */

    }, {
        key: 'isTouchDevice',
        value: function isTouchDevice() {
            return 'ontouchstart' in window // works on most browsers
            || window.navigator['maxTouchPoints']; // works on IE10/11 and Surface
        }

        /**
         * @typedef {Object} DomHelper.AjaxError
         * @typedef {Object} error
         * @typedef {Number} [code]
         * @typedef {String} [message]
         * @memberOf DomHelper
         */

        /**
         * @callback DomHelper.AjaxCallback
         * @param {DomHelper.AjaxError|null} error
         * @param {String} [result]
         * @memberOf DomHelper
         */

        /**
         * @param {String} url
         * @param {Object|String} [data]
         * @param {DomHelper.AjaxCallback} callback
         * @param {String} method
         * @param {Boolean} json
         */

    }, {
        key: 'ajax',
        value: function ajax(url, data, callback) {
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';
            var json = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var contentType = 'application/x-www-form-urlencoded';
            if (data && !json && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
                var y = '',
                    e = encodeURIComponent;
                for (var x in data) {
                    if (data.hasOwnProperty(x)) {
                        y += '&' + e(x) + '=' + e(data[x]);
                    }
                }
                data = y.slice(1);
            } else if (data && json && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
                data = JSON.stringify(data);
                contentType = 'application/json';
            }

            if (data && method === 'GET') {
                method = 'POST';
            }

            try {
                var xhr = new (window.XMLHttpRequest || window.ActiveXObject)('MSXML2.XMLHTTP.3.0');
                xhr.open(method, url, 1);
                xhr.withCredentials = true;
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.setRequestHeader('Content-type', contentType);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState > 3) {
                        if (xhr.status === 200) {
                            callback(null, xhr.responseText);
                        } else {
                            callback({ message: xhr.responseText, error: xhr, code: xhr.status });
                        }
                    }
                };
                xhr.send(data);
            } catch (e) {
                callback({ error: e });
            }
        }
    }]);

    return DomHelper;
}();

exports.default = DomHelper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.observe = observe;
exports.observable = observable;
exports.isObservable = isObservable;
/*
 * VM observer just for use in POC. Not to be used in production.
 */

var observables = new WeakMap();
var callbackTimeouts = new WeakMap();

function get(target, key, receiver) {
    var result = Reflect.get(target, key, receiver);

    // if ( typeof result === 'object' ) {
    //     const observableResult = observable( result );
    //     registerObserverToParentObservable( receiver, observableResult );
    //     Reflect.set( target, key, observableResult, receiver );
    //     return observableResult;
    // }

    return result;
}

function registerObserverToParentObservable(parentObservable, observable) {
    if (observables.has(parentObservable)) {
        observables.get(observable).push(function (value, key, target) {
            observables.get(parentObservable).forEach(function (callback) {
                return callCallback(callback, value, key, target);
            });
        });
    }
}

function set(target, key, value, receiver) {
    var result = value;

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        result = observable(value);
        registerObserverToParentObservable(receiver, result);
    }

    Reflect.set(target, key, result, receiver);

    if (observables.has(receiver)) {
        observables.get(receiver).forEach(function (callback) {
            return callCallback(callback, result, key, receiver);
        });
    }

    return true;
}

function callCallback(callback, value, key, target) {
    if (callbackTimeouts.has(callback)) {
        clearTimeout(callbackTimeouts.get(callback));
    }
    callbackTimeouts.set(callback, setTimeout(function () {
        callback(value, key, target);
        callbackTimeouts.delete(callback);
    }, 1));
}

function observe(observable, callback) {
    if (observables.has(observable)) {
        observables.get(observable).push(callback);
    }
}

function observable(obj) {
    var proxy = new Proxy(obj, { get: get, set: set });
    observables.set(proxy, []);
    return proxy;
}

function isObservable(obj) {
    return observables.has(obj);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domHelper = __webpack_require__(1);

var _domHelper2 = _interopRequireDefault(_domHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToastHelper = function () {
    function ToastHelper() {
        _classCallCheck(this, ToastHelper);
    }

    _createClass(ToastHelper, null, [{
        key: 'showToast',
        value: function showToast(containerElement, message) {
            var toastElement = document.createElement('div');
            toastElement.classList.add('toast');
            toastElement.innerText = message;

            containerElement.appendChild(toastElement);

            setTimeout(function () {
                ToastHelper.removeToast(toastElement);
            }, 5000);
        }
    }, {
        key: 'removeToast',
        value: function removeToast(toastElement) {
            if (toastElement.parentNode) {
                _domHelper2.default.addAnimationClass(toastElement, 'remove').then(function () {
                    toastElement.parentNode.removeChild(toastElement);
                    toastElement.classList.remove('remove');
                });
            }
        }
    }]);

    return ToastHelper;
}();

exports.default = ToastHelper;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilHelper = function () {
    function UtilHelper() {
        _classCallCheck(this, UtilHelper);
    }

    _createClass(UtilHelper, null, [{
        key: 'parseJSON',
        value: function parseJSON(str) {
            var fixedJSON = str.replace(/:\s*"([^"]*)"/g, function (match, p1) {
                return ': "' + p1.replace(/:/g, '@colon@') + '"';
            }).replace(/:\s*'([^']*)'/g, function (match, p1) {
                return ': "' + p1.replace(/:/g, '@colon@') + '"';
            }).replace(/(['"])?([!a-z0-9A-Z_\-]+)(['"])?\s*:/g, '"$2": ').replace(/@colon@/g, ':');

            return JSON.parse(fixedJSON);
        }
    }, {
        key: 'objDiff',
        value: function objDiff(obj, objCompare) {
            var objDiff = {};

            if (!obj) {
                return objDiff;
            }

            Object.keys(obj).forEach(function (key) {
                if (JSON.stringify(obj[key]) !== JSON.stringify(objCompare[key])) {
                    objDiff[key] = obj[key];
                }
            });

            return objDiff;
        }

        /**
         * @param {String} search
         * @returns {Object}
         */

    }, {
        key: 'urlSearchToObj',
        value: function urlSearchToObj(search) {
            var pairs = search.substring(1).split('&'),
                obj = {};
            var pair = void 0,
                i = void 0;

            for (i in pairs) {
                if (pairs[i] === '') {
                    continue;
                }

                pair = pairs[i].split('=');
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }

            return obj;
        }
    }]);

    return UtilHelper;
}();

exports.default = UtilHelper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                               * DOM and VM binder just for use in POC. Not to be used in production.
                                                                                                                                                                                                                                                                               */

exports.applyBindings = applyBindings;

var _observer = __webpack_require__(2);

var _utilHelper = __webpack_require__(4);

var _utilHelper2 = _interopRequireDefault(_utilHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createDataBindFromElement(element) {
    var dataBind = null;
    try {
        dataBind = _utilHelper2.default.parseJSON(element.getAttribute('data-bind'));
    } catch (e) {
        console.error('createDataBindFromElement', element, e);
    }

    return dataBind || {};
}

var boundDomGlobal = new WeakMap();
var templatesGlobal = {};

function setBoundDomGlobal(element, key, dataBind) {
    if (!boundDomGlobal.has(element)) {
        boundDomGlobal.set(element, {});
    }
    boundDomGlobal.get(element)[key] = dataBind;
}

function hasBoundDomGlobal(element, key) {
    return boundDomGlobal.has(element) && !!boundDomGlobal.get(element)[key];
}

function renderTemplate(templateId, rootElement, data, dataFilter, rootVm) {
    var templateScriptElement = templatesGlobal[templateId] || document.querySelector('script[data-template=' + templateId + ']');

    if (!templateScriptElement) {
        console.warn('renderTemplate', 'Could not render template', templateId);
        return;
    }

    var template = document.createElement('div');
    template.innerHTML = templateScriptElement.innerHTML;

    var dataAsList = Array.isArray(data) ? data : (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? data : [data];

    var boundDoms = new Map();
    Object.keys(dataAsList).forEach(function (key) {
        var vm = dataAsList[key];

        Array.from(template.children).forEach(function (templateChild) {
            var clonedTemplate = templateChild.cloneNode(true);
            applyBindings(clonedTemplate, vm, data, rootVm, false, key);
            rootElement.appendChild(clonedTemplate);

            boundDoms.set(vm, clonedTemplate);

            if ((0, _observer.isObservable)(vm)) {
                (0, _observer.observe)(vm, function () {
                    applyBindings(clonedTemplate, vm, data, rootVm, true, key);
                });
            }
        });
    });

    if ((0, _observer.isObservable)(data)) {
        (0, _observer.observe)(data, function (value, key) {
            if (key === 'length') {
                data.forEach(function (vm) {
                    // new item
                    if (!boundDoms.has(vm)) {
                        var clonedTemplate = template.children[0].cloneNode(true);
                        applyBindings(clonedTemplate, vm, data, rootVm);
                        rootElement.appendChild(clonedTemplate);
                        boundDoms.set(vm, clonedTemplate);

                        if ((0, _observer.isObservable)(vm)) {
                            (0, _observer.observe)(vm, function () {
                                applyBindings(clonedTemplate, vm, data, rootVm, true);
                            });
                        }
                    }
                });

                // remove nodes
                boundDoms.forEach(function (element, vm) {
                    if (data.indexOf(vm) === -1 && element.parentNode) {
                        element.parentNode.removeChild(element);
                        boundDoms.delete(vm);
                    }
                });
            }
        });
    }
}

function applyBindings(rootElement, vm, parentVm, rootVm, isUpdate, index) {
    var dataBinds = Array.from(rootElement.querySelectorAll('[data-bind]'));

    if (rootElement.getAttribute('data-bind')) {
        dataBinds.push(rootElement);
    }

    var getDataBindValue = function getDataBindValue(key, isApplyFunction) {
        var keys = key.split('.');
        var paths = keys.slice(0, keys.length - 1);

        var funcMatch = String(keys.slice(-1)).match(/^(.*?)(?:\((.*?)\))?$/);
        key = funcMatch && funcMatch[1] || keys.slice(-1);
        var args = (funcMatch && funcMatch[2] && funcMatch[2].split(',').map(function (par) {
            return par.trim();
        }).filter(function (par) {
            return !!par;
        }) || []).map(function (arg) {
            if (arg === '$index' && index !== undefined) {
                return index;
            }
            return arg;
        });

        var context = vm;
        paths.forEach(function (v) {
            if (v === '$root') {
                context = rootVm || parentVm || vm;
            } else if (context[v]) {
                context = context[v];
            }
        });

        if (key === '$index' && index !== undefined) {
            return { context: context, key: key, value: index };
        }

        if (key === '$data') {
            return { context: context, key: key, value: context };
        }

        if (!context || context[key] === undefined || context[key] === null) {
            return { context: context, key: key, value: '', isUndefined: true };
        }

        if (typeof context[key] === 'function') {
            if (isApplyFunction) {
                return { context: context, key: key, value: context[key].apply(context[key], args.concat(vm)) };
            } else {
                var _context$key;

                return { context: context, key: key, value: (_context$key = context[key]).bind.apply(_context$key, [context[key]].concat(_toConsumableArray(args.concat(vm)))) }; // TODO concat args
            }
        }

        return {
            context: context,
            key: key,
            value: context[key]
        };
    };

    var renderDataBindTemplate = function renderDataBindTemplate(templateId, templateContainerElement, dataKey, dataFilter) {
        renderTemplate(templateId, templateContainerElement, getDataBindValue(dataKey).value, dataFilter, rootVm || vm);
    };

    dataBinds.forEach(function (element) {
        var dataBind = createDataBindFromElement(element);

        Object.keys(dataBind).forEach(function (key) {
            switch (key) {
                case 'text':
                    {
                        var dataBindValue = getDataBindValue(dataBind[key], true);
                        element.textContent = dataBindValue.value;

                        if ((0, _observer.isObservable)(dataBindValue.context) && !hasBoundDomGlobal(element, key)) {
                            (0, _observer.observe)(dataBindValue.context, function () {
                                element.textContent = getDataBindValue(dataBind[key], true).value;
                            });
                            setBoundDomGlobal(element, key, dataBind[key]);
                        }
                        break;
                    }

                case 'value':
                    {
                        var _dataBindValue = getDataBindValue(dataBind[key], true);
                        element.value = _dataBindValue.value;

                        if ((0, _observer.isObservable)(_dataBindValue.context) && !hasBoundDomGlobal(element, key)) {
                            element.addEventListener('change', function (event) {
                                _dataBindValue.context[_dataBindValue.key] = event.target.value;
                            }, false);

                            (0, _observer.observe)(_dataBindValue.context, function () {
                                element.value = getDataBindValue(dataBind[key], true).value;
                            });
                            setBoundDomGlobal(element, key, dataBind[key]);
                        }
                        break;
                    }

                case 'html':
                    {
                        var _dataBindValue2 = getDataBindValue(dataBind[key], true);
                        element.innerHTML = _dataBindValue2.value;

                        if ((0, _observer.isObservable)(_dataBindValue2.context) && !hasBoundDomGlobal(element, key)) {
                            (0, _observer.observe)(_dataBindValue2.context, function () {
                                element.innerHTML = getDataBindValue(dataBind[key], true).value;
                            });
                            setBoundDomGlobal(element, key, dataBind[key]);
                        }
                        break;
                    }

                case 'click':
                    {
                        if (!isUpdate) {
                            element.addEventListener('click', getDataBindValue(dataBind[key]).value, false);
                        }
                        break;
                    }

                case 'attr':
                    {
                        Object.keys(dataBind[key]).forEach(function (attrKey) {
                            var dataBindValue = getDataBindValue(dataBind[key][attrKey], true);
                            if (typeof dataBindValue.value === 'boolean' && !dataBindValue.value) {
                                element.removeAttribute(attrKey);
                            } else {
                                element.setAttribute(attrKey, dataBindValue.value);
                            }

                            if ((0, _observer.isObservable)(dataBindValue.context) && !hasBoundDomGlobal(element, key)) {
                                (0, _observer.observe)(dataBindValue.context, function () {
                                    var dataBindValue = getDataBindValue(dataBind[key][attrKey], true);
                                    if (typeof dataBindValue.value === 'boolean' && !dataBindValue.value) {
                                        element.removeAttribute(attrKey);
                                    } else {
                                        element.setAttribute(attrKey, dataBindValue.value);
                                    }
                                });
                                setBoundDomGlobal(element, key, dataBind[key]);
                            }
                        });
                        break;
                    }

                case 'template':
                    {
                        renderDataBindTemplate(dataBind.template.id, element, dataBind.template.data, dataBind.template.filter);
                        break;
                    }

                case 'css':
                    {
                        Object.keys(dataBind[key]).forEach(function (attrKey) {
                            var cssClass = attrKey.replace(/^!/, '');
                            var isReverse = /^!/.test(attrKey);
                            var dataBindValue = getDataBindValue(dataBind[key][attrKey], true);

                            if (dataBindValue.value) {
                                if (isReverse) {
                                    element.classList.remove(cssClass);
                                } else {
                                    element.classList.add(cssClass);
                                }
                            } else {
                                if (isReverse) {
                                    element.classList.add(cssClass);
                                } else {
                                    element.classList.remove(cssClass);
                                }
                            }

                            if ((0, _observer.isObservable)(dataBindValue.context) && !hasBoundDomGlobal(element, attrKey)) {
                                (0, _observer.observe)(dataBindValue.context, function () {
                                    var dataBindValue = getDataBindValue(dataBind[key][attrKey], true);

                                    if (dataBindValue.value) {
                                        if (isReverse) {
                                            element.classList.remove(cssClass);
                                        } else {
                                            element.classList.add(cssClass);
                                        }
                                    } else {
                                        if (isReverse) {
                                            element.classList.add(cssClass);
                                        } else {
                                            element.classList.remove(cssClass);
                                        }
                                    }
                                });
                                setBoundDomGlobal(element, attrKey, dataBind[key]);
                            }
                        });
                        break;
                    }

                case 'visible':
                    {
                        var _dataBindValue3 = getDataBindValue(dataBind[key], true);

                        if (!_dataBindValue3.value) {
                            element.style.display = 'none';
                        } else {
                            element.style.removeProperty('display');
                        }

                        if ((0, _observer.isObservable)(_dataBindValue3.context) && !hasBoundDomGlobal(element, key)) {
                            (0, _observer.observe)(_dataBindValue3.context, function () {
                                if (!getDataBindValue(dataBind[key], true).value) {
                                    element.style.display = 'none';
                                } else {
                                    element.style.removeProperty('display');
                                }
                            });
                            setBoundDomGlobal(element, key, dataBind[key]);
                        }
                        break;
                    }

                case 'hidden':
                    {
                        var _dataBindValue4 = getDataBindValue(dataBind[key], true);

                        if (_dataBindValue4.value) {
                            element.style.display = 'none';
                        } else {
                            element.style.removeProperty('display');
                        }

                        if ((0, _observer.isObservable)(_dataBindValue4.context) && !hasBoundDomGlobal(element, key)) {
                            (0, _observer.observe)(_dataBindValue4.context, function () {
                                if (getDataBindValue(dataBind[key], true).value) {
                                    element.style.display = 'none';
                                } else {
                                    element.style.removeProperty('display');
                                }
                            });
                            setBoundDomGlobal(element, key, dataBind[key]);
                        }
                        break;
                    }
            }
        });
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @license MIT, GPL, do whatever you want
 * @requires polyfill: Array.prototype.slice fix {@link https://gist.github.com/brettz9/6093105}
 */
if (!Array.from) {
    Array.from = function (object) {
        'use strict';

        return [].slice.call(object);
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170112
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

    // Full polyfill for browsers with no classList support
    // Including IE < Edge missing SVGElement.classList
    if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

        (function (view) {

            "use strict";

            if (!('Element' in view)) return;

            var classListProp = "classList",
                protoProp = "prototype",
                elemCtrProto = view.Element[protoProp],
                objCtr = Object,
                strTrim = String[protoProp].trim || function () {
                return this.replace(/^\s+|\s+$/g, "");
            },
                arrIndexOf = Array[protoProp].indexOf || function (item) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (i in this && this[i] === item) {
                        return i;
                    }
                }
                return -1;
            }
            // Vendors: please allow content code to instantiate DOMExceptions
            ,
                DOMEx = function DOMEx(type, message) {
                this.name = type;
                this.code = DOMException[type];
                this.message = message;
            },
                checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
                if (token === "") {
                    throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
                }
                if (/\s/.test(token)) {
                    throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
                }
                return arrIndexOf.call(classList, token);
            },
                ClassList = function ClassList(elem) {
                var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
                    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                    i = 0,
                    len = classes.length;
                for (; i < len; i++) {
                    this.push(classes[i]);
                }
                this._updateClassName = function () {
                    elem.setAttribute("class", this.toString());
                };
            },
                classListProto = ClassList[protoProp] = [],
                classListGetter = function classListGetter() {
                return new ClassList(this);
            };
            // Most DOMException implementations don't allow calling DOMException's toString()
            // on non-DOMExceptions. Error's toString() is sufficient here.
            DOMEx[protoProp] = Error[protoProp];
            classListProto.item = function (i) {
                return this[i] || null;
            };
            classListProto.contains = function (token) {
                token += "";
                return checkTokenAndGetIndex(this, token) !== -1;
            };
            classListProto.add = function () {
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false;
                do {
                    token = tokens[i] + "";
                    if (checkTokenAndGetIndex(this, token) === -1) {
                        this.push(token);
                        updated = true;
                    }
                } while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };
            classListProto.remove = function () {
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false,
                    index;
                do {
                    token = tokens[i] + "";
                    index = checkTokenAndGetIndex(this, token);
                    while (index !== -1) {
                        this.splice(index, 1);
                        updated = true;
                        index = checkTokenAndGetIndex(this, token);
                    }
                } while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };
            classListProto.toggle = function (token, force) {
                token += "";

                var result = this.contains(token),
                    method = result ? force !== true && "remove" : force !== false && "add";

                if (method) {
                    this[method](token);
                }

                if (force === true || force === false) {
                    return force;
                } else {
                    return !result;
                }
            };
            classListProto.toString = function () {
                return this.join(" ");
            };

            if (objCtr.defineProperty) {
                var classListPropDesc = {
                    get: classListGetter,
                    enumerable: true,
                    configurable: true
                };
                try {
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                } catch (ex) {
                    // IE 8 doesn't support enumerable:true
                    // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                    // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                    if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                        classListPropDesc.enumerable = false;
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    }
                }
            } else if (objCtr[protoProp].__defineGetter__) {
                elemCtrProto.__defineGetter__(classListProp, classListGetter);
            }
        })(self);
    } else {
        // There is full or partial native classList support, so just check if we need
        // to normalize the add/remove and toggle APIs.

        (function () {
            "use strict";

            var testElement = document.createElement("_");

            testElement.classList.add("c1", "c2");

            // Polyfill for IE 10/11 and Firefox <26, where classList.add and
            // classList.remove exist but support only one argument at a time.
            if (!testElement.classList.contains("c2")) {
                var createMethod = function createMethod(method) {
                    var original = DOMTokenList.prototype[method];

                    DOMTokenList.prototype[method] = function (token) {
                        var i,
                            len = arguments.length;

                        for (i = 0; i < len; i++) {
                            token = arguments[i];
                            original.call(this, token);
                        }
                    };
                };
                createMethod('add');
                createMethod('remove');
            }

            testElement.classList.toggle("c3", false);

            // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
            // support the second argument.
            if (testElement.classList.contains("c3")) {
                var _toggle = DOMTokenList.prototype.toggle;

                DOMTokenList.prototype.toggle = function (token, force) {
                    if (1 in arguments && !this.contains(token) === !force) {
                        return force;
                    } else {
                        return _toggle.call(this, token);
                    }
                };
            }

            testElement = null;
        })();
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0+f9a5575b
 */

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.ES6Promise = factory();
})(undefined, function () {
  'use strict';

  function objectOrFunction(x) {
    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
  }

  function isFunction(x) {
    return typeof x === 'function';
  }

  var _isArray = undefined;
  if (!Array.isArray) {
    _isArray = function _isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  } else {
    _isArray = Array.isArray;
  }

  var isArray = _isArray;

  var len = 0;
  var vertxNext = undefined;
  var customSchedulerFn = undefined;

  var asap = function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 2, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      if (customSchedulerFn) {
        customSchedulerFn(flush);
      } else {
        scheduleFlush();
      }
    }
  };

  function setScheduler(scheduleFn) {
    customSchedulerFn = scheduleFn;
  }

  function setAsap(asapFn) {
    asap = asapFn;
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // see https://github.com/cujojs/when/issues/410 for details
    return function () {
      return process.nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }

    return useSetTimeout();
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    // Store setTimeout reference so es6-promise will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var globalSetTimeout = setTimeout;
    return function () {
      return globalSetTimeout(flush, 1);
    };
  }

  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];

      callback(arg);

      queue[i] = undefined;
      queue[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertx() {
    try {
      var r = require;
      var vertx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush = undefined;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && "function" === 'function') {
    scheduleFlush = attemptVertx();
  } else {
    scheduleFlush = useSetTimeout();
  }

  function then(onFulfillment, onRejection) {
    var _arguments = arguments;

    var parent = this;

    var child = new this.constructor(noop);

    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
    }

    var _state = parent._state;

    if (_state) {
      (function () {
        var callback = _arguments[_state - 1];
        asap(function () {
          return invokeCallback(_state, child, callback, parent._result);
        });
      })();
    } else {
      subscribe(parent, child, onFulfillment, onRejection);
    }

    return child;
  }

  /**
    `Promise.resolve` returns a promise that will become resolved with the
    passed `value`. It is shorthand for the following:
  
    ```javascript
    let promise = new Promise(function(resolve, reject){
      resolve(1);
    });
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = Promise.resolve(1);
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    @method resolve
    @static
    @param {Any} value value that the returned promise will be resolved with
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve(object) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop);
    _resolve(promise, object);
    return promise;
  }

  var PROMISE_ID = Math.random().toString(36).substring(16);

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  var GET_THEN_ERROR = new ErrorObject();

  function selfFulfillment() {
    return new TypeError("You cannot resolve a promise with itself");
  }

  function cannotReturnOwn() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function getThen(promise) {
    try {
      return promise.then;
    } catch (error) {
      GET_THEN_ERROR.error = error;
      return GET_THEN_ERROR;
    }
  }

  function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
    try {
      then.call(value, fulfillmentHandler, rejectionHandler);
    } catch (e) {
      return e;
    }
  }

  function handleForeignThenable(promise, thenable, then) {
    asap(function (promise) {
      var sealed = false;
      var error = tryThen(then, thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable !== value) {
          _resolve(promise, value);
        } else {
          fulfill(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        _reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && error) {
        sealed = true;
        _reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      _reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        return _resolve(promise, value);
      }, function (reason) {
        return _reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$) {
    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
      handleOwnThenable(promise, maybeThenable);
    } else {
      if (then$$ === GET_THEN_ERROR) {
        _reject(promise, GET_THEN_ERROR.error);
        GET_THEN_ERROR.error = null;
      } else if (then$$ === undefined) {
        fulfill(promise, maybeThenable);
      } else if (isFunction(then$$)) {
        handleForeignThenable(promise, maybeThenable, then$$);
      } else {
        fulfill(promise, maybeThenable);
      }
    }
  }

  function _resolve(promise, value) {
    if (promise === value) {
      _reject(promise, selfFulfillment());
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value));
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onerror) {
      promise._onerror(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length !== 0) {
      asap(publish, promise);
    }
  }

  function _reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;

    asap(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var _subscribers = parent._subscribers;
    var length = _subscribers.length;

    parent._onerror = null;

    _subscribers[length] = child;
    _subscribers[length + FULFILLED] = onFulfillment;
    _subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      asap(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (subscribers.length === 0) {
      return;
    }

    var child = undefined,
        callback = undefined,
        detail = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, detail);
      } else {
        callback(detail);
      }
    }

    promise._subscribers.length = 0;
  }

  function ErrorObject() {
    this.error = null;
  }

  var TRY_CATCH_ERROR = new ErrorObject();

  function tryCatch(callback, detail) {
    try {
      return callback(detail);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }

  function invokeCallback(settled, promise, callback, detail) {
    var hasCallback = isFunction(callback),
        value = undefined,
        error = undefined,
        succeeded = undefined,
        failed = undefined;

    if (hasCallback) {
      value = tryCatch(callback, detail);

      if (value === TRY_CATCH_ERROR) {
        failed = true;
        error = value.error;
        value.error = null;
      } else {
        succeeded = true;
      }

      if (promise === value) {
        _reject(promise, cannotReturnOwn());
        return;
      }
    } else {
      value = detail;
      succeeded = true;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    try {
      resolver(function resolvePromise(value) {
        _resolve(promise, value);
      }, function rejectPromise(reason) {
        _reject(promise, reason);
      });
    } catch (e) {
      _reject(promise, e);
    }
  }

  var id = 0;
  function nextId() {
    return id++;
  }

  function makePromise(promise) {
    promise[PROMISE_ID] = id++;
    promise._state = undefined;
    promise._result = undefined;
    promise._subscribers = [];
  }

  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this._input = input;
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate();
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      _reject(this.promise, validationError());
    }
  }

  function validationError() {
    return new Error('Array Methods must be provided an Array');
  };

  Enumerator.prototype._enumerate = function () {
    var length = this.length;
    var _input = this._input;

    for (var i = 0; this._state === PENDING && i < length; i++) {
      this._eachEntry(_input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function (entry, i) {
    var c = this._instanceConstructor;
    var resolve$$ = c.resolve;

    if (resolve$$ === resolve) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$) {
          return resolve$$(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function (state, i, value) {
    var promise = this.promise;

    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        _reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function (promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  /**
    `Promise.all` accepts an array of promises, and returns a new promise which
    is fulfilled with an array of fulfillment values for the passed promises, or
    rejected with the reason of the first passed promise to be rejected. It casts all
    elements of the passed iterable to promises as it runs this algorithm.
  
    Example:
  
    ```javascript
    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];
  
    Promise.all(promises).then(function(array){
      // The array here would be [ 1, 2, 3 ];
    });
    ```
  
    If any of the `promises` given to `all` are rejected, the first promise
    that is rejected will be given as an argument to the returned promises's
    rejection handler. For example:
  
    Example:
  
    ```javascript
    let promise1 = resolve(1);
    let promise2 = reject(new Error("2"));
    let promise3 = reject(new Error("3"));
    let promises = [ promise1, promise2, promise3 ];
  
    Promise.all(promises).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(error) {
      // error.message === "2"
    });
    ```
  
    @method all
    @static
    @param {Array} entries array of promises
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries) {
    return new Enumerator(this, entries).promise;
  }

  /**
    `Promise.race` returns a new promise which is settled in the same way as the
    first passed promise to settle.
  
    Example:
  
    ```javascript
    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 2');
      }, 100);
    });
  
    Promise.race([promise1, promise2]).then(function(result){
      // result === 'promise 2' because it was resolved before promise1
      // was resolved.
    });
    ```
  
    `Promise.race` is deterministic in that only the state of the first
    settled promise matters. For example, even if other promises given to the
    `promises` array argument are resolved, but the first settled promise has
    become rejected before the other promises became fulfilled, the returned
    promise will become rejected:
  
    ```javascript
    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error('promise 2'));
      }, 100);
    });
  
    Promise.race([promise1, promise2]).then(function(result){
      // Code here never runs
    }, function(reason){
      // reason.message === 'promise 2' because promise 2 became rejected before
      // promise 1 became fulfilled
    });
    ```
  
    An example real-world use case is implementing timeouts:
  
    ```javascript
    Promise.race([ajax('foo.json'), timeout(5000)])
    ```
  
    @method race
    @static
    @param {Array} promises array of promises to observe
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries) {
    /*jshint validthis:true */
    var Constructor = this;

    if (!isArray(entries)) {
      return new Constructor(function (_, reject) {
        return reject(new TypeError('You must pass an array to race.'));
      });
    } else {
      return new Constructor(function (resolve, reject) {
        var length = entries.length;
        for (var i = 0; i < length; i++) {
          Constructor.resolve(entries[i]).then(resolve, reject);
        }
      });
    }
  }

  /**
    `Promise.reject` returns a promise rejected with the passed `reason`.
    It is shorthand for the following:
  
    ```javascript
    let promise = new Promise(function(resolve, reject){
      reject(new Error('WHOOPS'));
    });
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = Promise.reject(new Error('WHOOPS'));
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    @method reject
    @static
    @param {Any} reason value that the returned promise will be rejected with.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject(reason) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop);
    _reject(promise, reason);
    return promise;
  }

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise's eventual value or the reason
    why the promise cannot be fulfilled.
  
    Terminology
    -----------
  
    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.
  
    A promise can be in one of three states: pending, fulfilled, or rejected.
  
    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.
  
    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.
  
  
    Basic Usage:
    ------------
  
    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);
  
      // on failure
      reject(reason);
    });
  
    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Advanced Usage:
    ---------------
  
    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.
  
    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
  
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
  
        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }
  
    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Unlike callbacks, promises are great composable primitives.
  
    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON
  
      return values;
    });
    ```
  
    @class Promise
    @param {function} resolver
    Useful for tooling.
    @constructor
  */
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve;
  Promise.reject = reject;
  Promise._setScheduler = setScheduler;
  Promise._setAsap = setAsap;
  Promise._asap = asap;

  Promise.prototype = {
    constructor: Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.
    
      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```
    
      Chaining
      --------
    
      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.
    
      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });
    
      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
    
      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```
    
      Assimilation
      ------------
    
      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.
    
      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```
    
      If the assimliated promise rejects, then the downstream promise will also reject.
    
      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```
    
      Simple Example
      --------------
    
      Synchronous Example
    
      ```javascript
      let result;
    
      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```
    
      Errback Example
    
      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```
    
      Promise Example;
    
      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```
    
      Advanced Example
      --------------
    
      Synchronous Example
    
      ```javascript
      let author, books;
    
      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```
    
      Errback Example
    
      ```js
    
      function foundBooks(books) {
    
      }
    
      function failure(reason) {
    
      }
    
      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```
    
      Promise Example;
    
      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```
    
      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
    then: then,

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
    
      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }
    
      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }
    
      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```
    
      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
    'catch': function _catch(onRejection) {
      return this.then(null, onRejection);
    }
  };

  function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
      local = global;
    } else if (typeof self !== 'undefined') {
      local = self;
    } else {
      try {
        local = Function('return this')();
      } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
      }
    }

    var P = local.Promise;

    if (P) {
      var promiseToString = null;
      try {
        promiseToString = Object.prototype.toString.call(P.resolve());
      } catch (e) {
        // silently ignored
      }

      if (promiseToString === '[object Promise]' && !P.cast) {
        return;
      }
    }

    local.Promise = Promise;
  }

  // Strange compat..
  Promise.polyfill = polyfill;
  Promise.Promise = Promise;

  Promise.polyfill();

  return Promise;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(10);

__webpack_require__(11);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function () {
  function N(p, r) {
    function q(a) {
      if (q[a] !== w) return q[a];var c;if ("bug-string-char-index" == a) c = "a" != "a"[0];else if ("json" == a) c = q("json-stringify") && q("json-parse");else {
        var e;if ("json-stringify" == a) {
          c = r.stringify;var b = "function" == typeof c && s;if (b) {
            (e = function e() {
              return 1;
            }).toJSON = e;try {
              b = "0" === c(0) && "0" === c(new t()) && '""' == c(new A()) && c(u) === w && c(w) === w && c() === w && "1" === c(e) && "[1]" == c([e]) && "[null]" == c([w]) && "null" == c(null) && "[null,null,null]" == c([w, u, null]) && "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}" == c({ a: [e, !0, !1, null, "\x00\b\n\f\r\t"] }) && "1" === c(null, e) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new C(-864E13)) && '"+275760-09-13T00:00:00.000Z"' == c(new C(864E13)) && '"-000001-01-01T00:00:00.000Z"' == c(new C(-621987552E5)) && '"1969-12-31T23:59:59.999Z"' == c(new C(-1));
            } catch (f) {
              b = !1;
            }
          }c = b;
        }if ("json-parse" == a) {
          c = r.parse;if ("function" == typeof c) try {
            if (0 === c("0") && !c(!1)) {
              e = c("{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}");var n = 5 == e.a.length && 1 === e.a[0];if (n) {
                try {
                  n = !c('"\t"');
                } catch (d) {}if (n) try {
                  n = 1 !== c("01");
                } catch (g) {}if (n) try {
                  n = 1 !== c("1.");
                } catch (m) {}
              }
            }
          } catch (X) {
            n = !1;
          }c = n;
        }
      }return q[a] = !!c;
    }p || (p = k.Object());r || (r = k.Object());var t = p.Number || k.Number,
        A = p.String || k.String,
        H = p.Object || k.Object,
        C = p.Date || k.Date,
        G = p.SyntaxError || k.SyntaxError,
        K = p.TypeError || k.TypeError,
        L = p.Math || k.Math,
        I = p.JSON || k.JSON;"object" == (typeof I === "undefined" ? "undefined" : _typeof(I)) && I && (r.stringify = I.stringify, r.parse = I.parse);var H = H.prototype,
        u = H.toString,
        _v,
        _B,
        w,
        s = new C(-0xc782b5b800cec);try {
      s = -109252 == s.getUTCFullYear() && 0 === s.getUTCMonth() && 1 === s.getUTCDate() && 10 == s.getUTCHours() && 37 == s.getUTCMinutes() && 6 == s.getUTCSeconds() && 708 == s.getUTCMilliseconds();
    } catch (Q) {}if (!q("json")) {
      var D = q("bug-string-char-index");if (!s) var x = L.floor,
          M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
          E = function E(a, c) {
        return M[c] + 365 * (a - 1970) + x((a - 1969 + (c = +(1 < c))) / 4) - x((a - 1901 + c) / 100) + x((a - 1601 + c) / 400);
      };(_v = H.hasOwnProperty) || (_v = function v(a) {
        var c = {},
            e;(c.__proto__ = null, c.__proto__ = { toString: 1 }, c).toString != u ? _v = function v(a) {
          var c = this.__proto__;a = a in (this.__proto__ = null, this);this.__proto__ = c;return a;
        } : (e = c.constructor, _v = function v(a) {
          var c = (this.constructor || e).prototype;return a in this && !(a in c && this[a] === c[a]);
        });c = null;return _v.call(this, a);
      });_B = function B(a, c) {
        var e = 0,
            b,
            f,
            n;(b = function b() {
          this.valueOf = 0;
        }).prototype.valueOf = 0;f = new b();for (n in f) {
          _v.call(f, n) && e++;
        }b = f = null;e ? _B = 2 == e ? function (a, c) {
          var e = {},
              b = "[object Function]" == u.call(a),
              f;for (f in a) {
            b && "prototype" == f || _v.call(e, f) || !(e[f] = 1) || !_v.call(a, f) || c(f);
          }
        } : function (a, c) {
          var e = "[object Function]" == u.call(a),
              b,
              f;for (b in a) {
            e && "prototype" == b || !_v.call(a, b) || (f = "constructor" === b) || c(b);
          }(f || _v.call(a, b = "constructor")) && c(b);
        } : (f = "valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "), _B = function B(a, c) {
          var e = "[object Function]" == u.call(a),
              b,
              h = !e && "function" != typeof a.constructor && F[_typeof(a.hasOwnProperty)] && a.hasOwnProperty || _v;for (b in a) {
            e && "prototype" == b || !h.call(a, b) || c(b);
          }for (e = f.length; b = f[--e]; h.call(a, b) && c(b)) {}
        });return _B(a, c);
      };if (!q("json-stringify")) {
        var U = { 92: "\\\\", 34: '\\"', 8: "\\b",
          12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t" },
            y = function y(a, c) {
          return ("000000" + (c || 0)).slice(-a);
        },
            R = function R(a) {
          for (var c = '"', b = 0, h = a.length, f = !D || 10 < h, n = f && (D ? a.split("") : a); b < h; b++) {
            var d = a.charCodeAt(b);switch (d) {case 8:case 9:case 10:case 12:case 13:case 34:case 92:
                c += U[d];break;default:
                if (32 > d) {
                  c += "\\u00" + y(2, d.toString(16));break;
                }c += f ? n[b] : a.charAt(b);}
          }return c + '"';
        },
            O = function O(a, c, b, h, f, n, d) {
          var g, m, k, l, p, r, s, t, q;try {
            g = c[a];
          } catch (z) {}if ("object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) && g) if (m = u.call(g), "[object Date]" != m || _v.call(g, "toJSON")) "function" == typeof g.toJSON && ("[object Number]" != m && "[object String]" != m && "[object Array]" != m || _v.call(g, "toJSON")) && (g = g.toJSON(a));else if (g > -1 / 0 && g < 1 / 0) {
            if (E) {
              l = x(g / 864E5);for (m = x(l / 365.2425) + 1970 - 1; E(m + 1, 0) <= l; m++) {}for (k = x((l - E(m, 0)) / 30.42); E(m, k + 1) <= l; k++) {}l = 1 + l - E(m, k);p = (g % 864E5 + 864E5) % 864E5;r = x(p / 36E5) % 24;s = x(p / 6E4) % 60;t = x(p / 1E3) % 60;p %= 1E3;
            } else m = g.getUTCFullYear(), k = g.getUTCMonth(), l = g.getUTCDate(), r = g.getUTCHours(), s = g.getUTCMinutes(), t = g.getUTCSeconds(), p = g.getUTCMilliseconds();
            g = (0 >= m || 1E4 <= m ? (0 > m ? "-" : "+") + y(6, 0 > m ? -m : m) : y(4, m)) + "-" + y(2, k + 1) + "-" + y(2, l) + "T" + y(2, r) + ":" + y(2, s) + ":" + y(2, t) + "." + y(3, p) + "Z";
          } else g = null;b && (g = b.call(c, a, g));if (null === g) return "null";m = u.call(g);if ("[object Boolean]" == m) return "" + g;if ("[object Number]" == m) return g > -1 / 0 && g < 1 / 0 ? "" + g : "null";if ("[object String]" == m) return R("" + g);if ("object" == (typeof g === "undefined" ? "undefined" : _typeof(g))) {
            for (a = d.length; a--;) {
              if (d[a] === g) throw K();
            }d.push(g);q = [];c = n;n += f;if ("[object Array]" == m) {
              k = 0;for (a = g.length; k < a; k++) {
                m = O(k, g, b, h, f, n, d), q.push(m === w ? "null" : m);
              }a = q.length ? f ? "[\n" + n + q.join(",\n" + n) + "\n" + c + "]" : "[" + q.join(",") + "]" : "[]";
            } else _B(h || g, function (a) {
              var c = O(a, g, b, h, f, n, d);c !== w && q.push(R(a) + ":" + (f ? " " : "") + c);
            }), a = q.length ? f ? "{\n" + n + q.join(",\n" + n) + "\n" + c + "}" : "{" + q.join(",") + "}" : "{}";d.pop();return a;
          }
        };r.stringify = function (a, c, b) {
          var h, f, n, d;if (F[typeof c === "undefined" ? "undefined" : _typeof(c)] && c) if ("[object Function]" == (d = u.call(c))) f = c;else if ("[object Array]" == d) {
            n = {};for (var g = 0, k = c.length, l; g < k; l = c[g++], (d = u.call(l), "[object String]" == d || "[object Number]" == d) && (n[l] = 1)) {}
          }if (b) if ("[object Number]" == (d = u.call(b))) {
            if (0 < (b -= b % 1)) for (h = "", 10 < b && (b = 10); h.length < b; h += " ") {}
          } else "[object String]" == d && (h = 10 >= b.length ? b : b.slice(0, 10));return O("", (l = {}, l[""] = a, l), f, n, h, "", []);
        };
      }if (!q("json-parse")) {
        var V = A.fromCharCode,
            W = { 92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r" },
            b,
            J,
            l = function l() {
          b = J = null;throw G();
        },
            z = function z() {
          for (var a = J, c = a.length, e, h, f, k, d; b < c;) {
            switch (d = a.charCodeAt(b), d) {case 9:case 10:case 13:case 32:
                b++;break;case 123:case 125:case 91:case 93:case 58:case 44:
                return e = D ? a.charAt(b) : a[b], b++, e;case 34:
                e = "@";for (b++; b < c;) {
                  if (d = a.charCodeAt(b), 32 > d) l();else if (92 == d) switch (d = a.charCodeAt(++b), d) {case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
                      e += W[d];b++;break;case 117:
                      h = ++b;for (f = b + 4; b < f; b++) {
                        d = a.charCodeAt(b), 48 <= d && 57 >= d || 97 <= d && 102 >= d || 65 <= d && 70 >= d || l();
                      }e += V("0x" + a.slice(h, b));break;default:
                      l();} else {
                    if (34 == d) break;d = a.charCodeAt(b);for (h = b; 32 <= d && 92 != d && 34 != d;) {
                      d = a.charCodeAt(++b);
                    }e += a.slice(h, b);
                  }
                }if (34 == a.charCodeAt(b)) return b++, e;l();default:
                h = b;45 == d && (k = !0, d = a.charCodeAt(++b));if (48 <= d && 57 >= d) {
                  for (48 == d && (d = a.charCodeAt(b + 1), 48 <= d && 57 >= d) && l(); b < c && (d = a.charCodeAt(b), 48 <= d && 57 >= d); b++) {}if (46 == a.charCodeAt(b)) {
                    for (f = ++b; f < c && (d = a.charCodeAt(f), 48 <= d && 57 >= d); f++) {}f == b && l();b = f;
                  }d = a.charCodeAt(b);if (101 == d || 69 == d) {
                    d = a.charCodeAt(++b);43 != d && 45 != d || b++;for (f = b; f < c && (d = a.charCodeAt(f), 48 <= d && 57 >= d); f++) {}f == b && l();b = f;
                  }return +a.slice(h, b);
                }k && l();if ("true" == a.slice(b, b + 4)) return b += 4, !0;if ("false" == a.slice(b, b + 5)) return b += 5, !1;if ("null" == a.slice(b, b + 4)) return b += 4, null;l();}
          }return "$";
        },
            P = function P(a) {
          var c, b;"$" == a && l();if ("string" == typeof a) {
            if ("@" == (D ? a.charAt(0) : a[0])) return a.slice(1);if ("[" == a) {
              for (c = [];; b || (b = !0)) {
                a = z();if ("]" == a) break;b && ("," == a ? (a = z(), "]" == a && l()) : l());"," == a && l();c.push(P(a));
              }return c;
            }if ("{" == a) {
              for (c = {};; b || (b = !0)) {
                a = z();if ("}" == a) break;b && ("," == a ? (a = z(), "}" == a && l()) : l());"," != a && "string" == typeof a && "@" == (D ? a.charAt(0) : a[0]) && ":" == z() || l();c[a.slice(1)] = P(z());
              }return c;
            }l();
          }return a;
        },
            T = function T(a, b, e) {
          e = S(a, b, e);e === w ? delete a[b] : a[b] = e;
        },
            S = function S(a, b, e) {
          var h = a[b],
              f;if ("object" == (typeof h === "undefined" ? "undefined" : _typeof(h)) && h) if ("[object Array]" == u.call(h)) for (f = h.length; f--;) {
            T(h, f, e);
          } else _B(h, function (a) {
            T(h, a, e);
          });return e.call(a, b, h);
        };r.parse = function (a, c) {
          var e, h;b = 0;J = "" + a;e = P(z());"$" != z() && l();b = J = null;return c && "[object Function]" == u.call(c) ? S((h = {}, h[""] = e, h), "", c) : e;
        };
      }
    }r.runInContext = N;return r;
  }var K = "function" === "function" && __webpack_require__(13),
      F = { "function": !0, object: !0 },
      G = F[ false ? "undefined" : _typeof(exports)] && exports && !exports.nodeType && exports,
      k = F[typeof window === "undefined" ? "undefined" : _typeof(window)] && window || this,
      t = G && F[ false ? "undefined" : _typeof(module)] && module && !module.nodeType && "object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) && global;!t || t.global !== t && t.window !== t && t.self !== t || (k = t);if (G && !K) N(k, G);else {
    var L = k.JSON,
        Q = k.JSON3,
        M = !1,
        A = N(k, k.JSON3 = { noConflict: function noConflict() {
        M || (M = !0, k.JSON = L, k.JSON3 = Q, L = Q = null);return A;
      } });k.JSON = { parse: A.parse, stringify: A.stringify };
  }K && !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return A;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).call(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module), __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (d) {
  function k(a) {
    return a ? "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a : !1;
  }if (!d.Proxy) {
    var l = null;d.a = function (a, c) {
      function d() {}if (!k(a) || !k(c)) throw new TypeError("Cannot create proxy with a non-object as target or handler");l = function l() {
        d = function d(b) {
          throw new TypeError("Cannot perform '" + b + "' on a proxy that has been revoked");
        };
      };var f = c;c = { get: null, set: null, apply: null, construct: null };for (var g in f) {
        if (!(g in c)) throw new TypeError("Proxy polyfill does not support trap '" + g + "'");c[g] = f[g];
      }"function" == typeof f && (c.apply = f.apply.bind(f));var _e = this,
          m = !1,
          n = "function" == typeof a;if (c.apply || c.construct || n) _e = function e() {
        var b = this && this.constructor === _e;d(b ? "construct" : "apply");if (b && c.construct) return c.construct.call(this, a, arguments);if (!b && c.apply) return c.apply(a, this, arguments);if (n) return b ? (b = Array.prototype.slice.call(arguments), b.unshift(a), new (a.bind.apply(a, b))()) : a.apply(this, arguments);throw new TypeError(b ? "not a constructor" : "not a function");
      }, m = !0;var p = c.get ? function (b) {
        d("get");
        return c.get(this, b, _e);
      } : function (b) {
        d("get");return this[b];
      },
          r = c.set ? function (b, a) {
        d("set");c.set(this, b, a, _e);
      } : function (a, c) {
        d("set");this[a] = c;
      },
          q = {};Object.getOwnPropertyNames(a).forEach(function (b) {
        m && b in _e || (Object.defineProperty(_e, b, { enumerable: !!Object.getOwnPropertyDescriptor(a, b).enumerable, get: p.bind(a, b), set: r.bind(a, b) }), q[b] = !0);
      });f = !0;Object.setPrototypeOf ? Object.setPrototypeOf(_e, Object.getPrototypeOf(a)) : _e.__proto__ ? _e.__proto__ = a.__proto__ : f = !1;if (c.get || !f) for (var h in a) {
        q[h] || Object.defineProperty(_e, h, { get: p.bind(a, h) });
      }Object.seal(a);Object.seal(_e);return _e;
    };d.a.b = function (a, c) {
      return { proxy: new d.a(a, c), revoke: l };
    };d.a.revocable = d.a.b;d.Proxy = d.a;
  }
})("undefined" !== typeof module && module.exports ? global : window);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var BASE = 'bid';

exports.default = {
    BASE: BASE,
    ROOT: '.' + BASE,
    MAIN: '.' + BASE + '__main',

    VISIBLE: BASE + '--visible',

    HEADER: '.' + BASE + '__header',
    HEADER_HEADLINE: '.' + BASE + '__header .' + BASE + '__title--headline',

    DIALOG: '.' + BASE + '__dialog',
    DIALOG_MAIN: '.' + BASE + '__dialog .' + BASE + '__dialog__main',
    DIALOG_SECTION: '.' + BASE + '__dialog .' + BASE + '__dialog__section',
    DIALOG_SECTION_CONTAINER: '.' + BASE + '__dialog .' + BASE + '__dialog__section__container',
    DIALOG_HEADER: '.' + BASE + '__dialog .' + BASE + '__dialog__header',
    DIALOG_HEADER_HEADLINE: '.' + BASE + '__dialog .' + BASE + '__dialog__header__headline',
    DIALOG_CLOSE: '.' + BASE + '__dialog .' + BASE + '__dialog__close',

    MENU_POPOVER: '.' + BASE + '__popover[data-popover=menu]',
    MENU_BUTTON: '.' + BASE + '__button-icon__button[data-button=menu]',

    CERTIFICATE_POPOVER: '.' + BASE + '__popover[data-popover=certificate]',
    CERTIFICATE_BUTTON: '.' + BASE + '__button-icon__button[data-button=certificate]',

    POPOVER_CLOSE: '.' + BASE + '__popover .' + BASE + '__popover__close',
    POPOVER_CLOSE__BUTTON: '.' + BASE + '__popover .' + BASE + '__popover__close button',

    CONTENT_HEADER_HEADLINE: '.' + BASE + '__content__header--headline',
    LIST_ITEM: 'ul.' + BASE + '__list li'
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _selector = __webpack_require__(15);

var _selector2 = _interopRequireDefault(_selector);

var _domHelper = __webpack_require__(1);

var _domHelper2 = _interopRequireDefault(_domHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popover = function () {
    _createClass(Popover, null, [{
        key: 'SELECTORS',
        get: function get() {
            return {
                VISIBLE: _selector2.default.BASE + '--visible',
                POPOVER: '.' + _selector2.default.BASE + '__popover',
                CLOSE: '.' + _selector2.default.BASE + '__popover .' + _selector2.default.BASE + '__popover__close'
            };
        }

        /**
         * @param {HTMLElement} popoverElement
         * @param {HTMLElement} popoverButtonElement
         * @param {Object} [options]
         * @param {Boolean} [options.allowClickInside]
         */

    }]);

    function Popover(popoverElement, popoverButtonElement) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Popover);

        this.options = options;
        this.popoverElement = popoverElement;
        this.popoverButtonElement = popoverButtonElement;

        // re-bind
        this.onGlobalEvent = this.onGlobalEvent.bind(this);
    }

    _createClass(Popover, [{
        key: 'isVisible',
        value: function isVisible() {
            return this.popoverElement.classList.contains(Popover.SELECTORS.VISIBLE);
        }
    }, {
        key: 'onGlobalEvent',
        value: function onGlobalEvent(event) {
            var isCloseByMouse = event.type === 'click';
            var isCloseByKeyboard = event.which === 27; // ESC key

            if (isCloseByMouse && this.options.allowClickInside) {
                isCloseByMouse = !this.popoverElement.contains(event.target) && this.popoverElement !== event.target;
            }

            if (isCloseByMouse || isCloseByKeyboard) {
                setTimeout(this.hidePopover.bind(this), 1);
            }
        }
    }, {
        key: 'initPopover',
        value: function initPopover() {
            this.popoverButtonElement.addEventListener('click', this.togglePopover.bind(this), false);
            var closeButtonElement = this.popoverElement.querySelector(Popover.SELECTORS.CLOSE + ' button');

            if (closeButtonElement) {
                closeButtonElement.addEventListener('click', this.hidePopover.bind(this), false);
            }
        }
    }, {
        key: 'showPopover',
        value: function showPopover() {
            var _this = this;

            this.popoverButtonElement.classList.add('active');

            _domHelper2.default.addAnimationClass(this.popoverElement, Popover.SELECTORS.VISIBLE).then(function () {
                document.querySelector('body').addEventListener('click', _this.onGlobalEvent, false);
                document.querySelector('body').addEventListener('keyup', _this.onGlobalEvent, false);
            });
        }
    }, {
        key: 'hidePopover',
        value: function hidePopover() {
            document.querySelector('body').removeEventListener('click', this.onGlobalEvent);
            document.querySelector('body').removeEventListener('keyup', this.onGlobalEvent);

            this.popoverButtonElement.classList.remove('active');
            _domHelper2.default.removeAnimationClass(this.popoverElement, Popover.SELECTORS.VISIBLE);
        }
    }, {
        key: 'togglePopover',
        value: function togglePopover() {
            if (this.isVisible()) {
                this.hidePopover();
            } else {
                this.showPopover();
            }
        }
    }]);

    return Popover;
}();

exports.default = Popover;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    supportsTransitionEvent: function () {
        var t = void 0;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'IETransition': 'MSAnimationEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }

        return false;
    }(),

    supportsAnimationEvent: function () {
        var t = void 0;
        var el = document.createElement('fakeelement');
        var animations = {
            'animation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'MozAnimation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd',
            'IEAnimation': 'MSAnimationEnd'
        };

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }

        return false;
    }()
};

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleXIDLogin = exports.isUserLoggedIn = exports.doInit = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(9);

var _binder = __webpack_require__(5);

var _observer = __webpack_require__(2);

var _domHelper = __webpack_require__(1);

var _domHelper2 = _interopRequireDefault(_domHelper);

var _toastHelper = __webpack_require__(3);

var _toastHelper2 = _interopRequireDefault(_toastHelper);

var _popover = __webpack_require__(16);

var _popover2 = _interopRequireDefault(_popover);

var _constants = __webpack_require__(22);

var _constants2 = _interopRequireDefault(_constants);

var _store = __webpack_require__(26);

var _xid = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// VARIABLES
var isContentLoaded = false;

var loginButtonElement = document.querySelector('#login-button');
var menuButtonElement = document.querySelector('#menu-button');
var toastContainerElement = document.querySelector('.toast-wrapper');

// VIEW MODELS
var weatherVm = (0, _observer.observable)({
    icon: '',
    text: '',
    color: '',
    subtext: ''
});

var stockVm = (0, _observer.observable)({
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgNmwyLjI5IDIuMjktNC44OCA0Ljg4LTQtNEwyIDE2LjU5IDMuNDEgMThsNi02IDQgNCA2LjMtNi4yOUwyMiAxMlY2eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=',
    text: '+5,96',
    color: 'green',
    subtext: 'OSBEX'
});

var latestNewsVm = (0, _observer.observable)({
    text: 'Phasellus congue sapien at urna',
    time: '11:28'
});

var newsVm = {
    main: (0, _observer.observable)([]),
    sidebar: (0, _observer.observable)([]),
    bottom: (0, _observer.observable)([])
};

var adsVm = (0, _observer.observable)({
    primary: 'img/article/Fjordkraft.png',
    secondary: 'img/article/BankID_ad.png'
});

// FUNCTIONS

function getUserPlace() {
    var user = (0, _store.getLoggedInUser)();
    if (user) {
        return user.address && user.address.locality || 'Oslo';
    } else {
        return 'Bergen';
    }
}

function isUserLoggedIn() {
    return !!(0, _store.getLoggedInUser)();
}

/**
 * @param {BIDXidConnect.UserInfo} [user]
 */
function handleXIDLogin(user) {
    console.log('handleXIDLogin', user);
    (0, _store.doStoreUser)(user);

    if (user) {
        loginButtonElement.disabled = true;
        loginButtonElement.classList.remove('visible');

        menuButtonElement.disabled = false;
        menuButtonElement.classList.add('visible');

        menuButtonElement.querySelector('span').innerText = user.name;

        _toastHelper2.default.showToast(toastContainerElement, 'Innholdet er tilpasset');
    } else {
        loginButtonElement.disabled = false;
        loginButtonElement.classList.add('visible');

        menuButtonElement.disabled = true;
        menuButtonElement.classList.remove('visible');
    }

    doUpdateContent();
}

function doUpdateContent() {
    if (!isContentLoaded) {
        return doPopulateContent();
    }

    _domHelper2.default.addAnimationClass(document.body, 'customizing').then(function () {
        doPopulateContent();
        return new Promise(function (fulfill) {
            return setTimeout(fulfill, 250);
        });
    }).then(function () {
        return _domHelper2.default.addAnimationClass(document.body, 'customizing--remove');
    }).then(function () {
        document.body.classList.remove('customizing');
        document.body.classList.remove('customizing--remove');
    });
}

function doPopulateContent() {
    var type = isUserLoggedIn() ? 'customise' : 'default';

    Object.keys(newsVm).forEach(function (key) {
        var length = newsVm[key].length;

        for (var i = 0; i < length; i++) {
            newsVm[key].pop();
        }
    });

    Object.keys(_constants2.default.NEWS[type]).forEach(function (key) {
        _constants2.default.NEWS[type][key].forEach(function (article) {
            var articlePrepared = _extends({}, article);

            if (articlePrepared.title) {
                articlePrepared.title = articlePrepared.title.replace(/{{place}}/ig, getUserPlace());
            }

            newsVm[key].push(articlePrepared);
        });
    });

    Object.keys(adsVm).forEach(function (key) {
        adsVm[key] = _constants2.default.ADS[type][key];
    });

    Object.keys(weatherVm).forEach(function (key) {
        weatherVm[key] = _constants2.default.WEATHER[type][key];
    });

    doUpdateWeather();

    isContentLoaded = true;
}

function doUpdateWeather() {
    var place = getUserPlace();

    var updateWeatherFromYahoo = function updateWeatherFromYahoo(temperatureFahrenheit, place, code) {
        var icon = weatherVm.icon;

        Object.keys(_constants2.default.WEATHER_YAHOO_CODE).forEach(function (key) {
            if (_constants2.default.WEATHER_YAHOO_CODE[key].indexOf(code) !== -1) {
                icon = _constants2.default.WEATHER_ICON[key];
            }
        });

        weatherVm.text = Math.round((temperatureFahrenheit - 32) * 5 / 9) + '\xB0C';
        weatherVm.subtext = place;
        weatherVm.icon = icon;
    };

    if (!window.fetch) {
        weatherVm.subtext = place;
        return;
    }

    window.fetch('https://query.yahooapis.com/v1/public/yql' + '?q=' + encodeURIComponent('select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + place + ', norway")') + '&format=json').then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result['query']['count'] > 0 && result['query']['results'] && result['query']['results']['channel'] && result['query']['results']['channel']['item'] && result['query']['results']['channel']['item']['condition']) {
            updateWeatherFromYahoo(parseInt(result['query']['results']['channel']['item']['condition']['temp']), place, parseInt(result['query']['results']['channel']['item']['condition']['code']));
        } else {
            console.warn('doUpdateWeather', 'Could not update weather', result);
        }
    }).catch(console.error.bind(null, 'doUpdateWeather'));
}

function loadImages() {
    var images = [];

    Object.keys(_constants2.default.NEWS).forEach(function (type) {
        Object.keys(_constants2.default.NEWS[type]).forEach(function (key) {
            _constants2.default.NEWS[type][key].forEach(function (article) {
                if (article.image) {
                    images.push(_domHelper2.default.loadImagePromise(article.image));
                }
            });
        });
    });

    Object.keys(_constants2.default.ADS).forEach(function (type) {
        Object.keys(_constants2.default.ADS[type]).forEach(function (key) {
            return images.push(_domHelper2.default.loadImagePromise(_constants2.default.ADS[type][key]));
        });
    });

    return Promise.all(images);
}

(0, _binder.applyBindings)(document.body, {
    weather: weatherVm,
    stock: stockVm,
    news: newsVm,
    ads: adsVm,
    latestNews: latestNewsVm
});

function doInit() {
    handleXIDLogin((0, _store.getLoggedInUser)());

    loadImages().then(function () {
        return document.body.classList.add('active');
    });

    var menuPopover = new _popover2.default(document.querySelector('[data-popover=menu]'), menuButtonElement);
    menuPopover.initPopover();

    var loginButtonElement = document.querySelector('#login-button');
    var logoutButtonElement = document.querySelector('#logout-button');
    var switchUserButtonElement = document.querySelector('#switch-user-button');

    loginButtonElement.addEventListener('click', _xid.doLoginWithXID, false);
    logoutButtonElement.addEventListener('click', _xid.doLogoutFromXID, false);
    switchUserButtonElement.addEventListener('click', _xid.doSwitchUserXID, false);

    document.body.addEventListener('xid-loaded', _xid.onXIDLoaded, false);
}

exports.doInit = doInit;
exports.isUserLoggedIn = isUserLoggedIn;
exports.handleXIDLogin = handleXIDLogin;

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var STORAGE_KEY_USER = 'xid-news-user';
var NEWS = {
    default: {
        main: [{
            image: 'img/article/001.jpeg',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            size: 'large',
            custom: false
        }, {
            image: 'img/article/010.jpeg',
            title: 'Nulla id mauris congue',
            size: 'small',
            custom: false
        }, {
            image: 'img/article/013.jpeg',
            title: 'Proin eget mi dictum',
            size: 'medium-x',
            custom: false
        }],
        sidebar: [{
            image: 'img/article/011.jpeg',
            title: 'Aenean tincidunt lectus ac fringilla dignissim',
            size: 'medium',
            custom: false
        }, {
            image: 'img/article/012.jpeg',
            title: 'Vivamus maximus lorem a mi sollicitudin',
            size: 'medium',
            custom: false
        }, {
            list: ['Sed aliquet dui non tincidunt consequat', 'Phasellus dapibus dolor vel neque vulputate facilisis.', 'In et urna pellentesque, suscipit turpis sit amet', 'Ut vel nibh tempor, iaculis leo semper', 'Proin nec risus fermentum, commodo arcu vel'],
            size: 'large',
            custom: false
        }],
        bottom: [{
            image: 'img/article/006.jpeg',
            title: 'Quisque ullamcorper purus eget metus',
            size: 'small',
            custom: false
        }, {
            image: 'img/article/014.jpeg',
            title: 'Mauris at risus non magna',
            size: 'small',
            custom: false,
            color: 'red'
        }, {
            image: 'img/article/008.jpeg',
            title: 'Sed fringilla nibh',
            size: 'small',
            custom: false
        }]
    },
    customise: {
        main: [{
            image: 'img/article/001.jpeg',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            size: 'large',
            custom: false
        }, {
            image: 'img/article/005.jpeg',
            title: 'Integer rutrum nunc in libero',
            size: 'small',
            custom: true
        }, {
            image: 'img/article/004.jpeg',
            title: 'Ut ut lacus placerat lorem efficitur fringilla',
            size: 'medium-x',
            custom: true
        }],
        sidebar: [{
            image: 'img/article/002.jpeg',
            title: 'Curabitur maximus eros convallis',
            size: 'medium',
            custom: true
        }, {
            image: 'img/article/003.jpeg',
            title: '{{place}} today: Traffic chaos',
            size: 'medium',
            custom: true
        }, {
            list: ['Sed aliquet dui non tincidunt consequat', 'Phasellus dapibus dolor vel neque vulputate facilisis.', 'In et urna pellentesque, suscipit turpis sit amet', 'Ut vel nibh tempor, iaculis leo semper', 'Proin nec risus fermentum, commodo arcu vel'],
            size: 'large',
            custom: false
        }],
        bottom: [{
            image: 'img/article/006.jpeg',
            title: 'Quisque ullamcorper purus eget metus',
            size: 'small',
            custom: false
        }, {
            image: 'img/article/007.jpeg',
            title: 'Phasellus congue sapien at urna',
            size: 'small',
            custom: true,
            color: 'red'
        }, {
            image: 'img/article/008.jpeg',
            title: 'Sed fringilla nibh',
            size: 'small',
            custom: false
        }]
    }
};

var ADS = {
    default: {
        primary: 'img/article/red.png',
        secondary: 'img/article/BankID_ad.png'
    },
    customise: {
        primary: 'img/article/green.png',
        secondary: 'img/article/BankID_ad.png'
    }
};

var WEATHER_ICON = {
    CLOUD: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LDE5QTUsNSAwIDAsMSAxLDE0QTUsNSAwIDAsMSA2LDlDNyw2LjY1IDkuMyw1IDEyLDVDMTUuNDMsNSAxOC4yNCw3LjY2IDE4LjUsMTEuMDNMMTksMTFBNCw0IDAgMCwxIDIzLDE1QTQsNCAwIDAsMSAxOSwxOUg2TTE5LDEzSDE3VjEyQTUsNSAwIDAsMCAxMiw3QzkuNSw3IDcuNDUsOC44MiA3LjA2LDExLjE5QzYuNzMsMTEuMDcgNi4zNywxMSA2LDExQTMsMyAwIDAsMCAzLDE0QTMsMyAwIDAsMCA2LDE3SDE5QTIsMiAwIDAsMCAyMSwxNUEyLDIgMCAwLDAgMTksMTNaIiAvPjwvc3ZnPg==',
    RAIN: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LDE0QTEsMSAwIDAsMSA3LDE1QTEsMSAwIDAsMSA2LDE2QTUsNSAwIDAsMSAxLDExQTUsNSAwIDAsMSA2LDZDNywzLjY1IDkuMywyIDEyLDJDMTUuNDMsMiAxOC4yNCw0LjY2IDE4LjUsOC4wM0wxOSw4QTQsNCAwIDAsMSAyMywxMkE0LDQgMCAwLDEgMTksMTZIMThBMSwxIDAgMCwxIDE3LDE1QTEsMSAwIDAsMSAxOCwxNEgxOUEyLDIgMCAwLDAgMjEsMTJBMiwyIDAgMCwwIDE5LDEwSDE3VjlBNSw1IDAgMCwwIDEyLDRDOS41LDQgNy40NSw1LjgyIDcuMDYsOC4xOUM2LjczLDguMDcgNi4zNyw4IDYsOEEzLDMgMCAwLDAgMywxMUEzLDMgMCAwLDAgNiwxNE0xNC44MywxNS42N0MxNi4zOSwxNy4yMyAxNi4zOSwxOS41IDE0LjgzLDIxLjA4QzE0LjA1LDIxLjg2IDEzLDIyIDEyLDIyQzExLDIyIDkuOTUsMjEuODYgOS4xNywyMS4wOEM3LjYxLDE5LjUgNy42MSwxNy4yMyA5LjE3LDE1LjY3TDEyLDExTDE0LjgzLDE1LjY3TTEzLjQxLDE2LjY5TDEyLDE0LjI1TDEwLjU5LDE2LjY5QzkuOCwxNy41IDkuOCwxOC43IDEwLjU5LDE5LjVDMTEsMTkuOTMgMTEuNSwyMCAxMiwyMEMxMi41LDIwIDEzLDE5LjkzIDEzLjQxLDE5LjVDMTQuMiwxOC43IDE0LjIsMTcuNSAxMy40MSwxNi42OVoiIC8+PC9zdmc+',
    RAIN2: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNC41IDEzLjU5Yy41LjI4LjY0LjkxLjM3IDEuMzctLjI4LjQ4LS44Ny42NC0xLjM3LjM3QTQuOTggNC45OCAwIDAgMSAxIDExYTUgNSAwIDAgMSA1LTVjMS0yLjM1IDMuMy00IDYtNCAzLjQzIDAgNi4yNCAyLjY2IDYuNSA2LjAzTDE5IDhhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEtNCA0IDEgMSAwIDAgMS0xLTEgMSAxIDAgMCAxIDEtMSAyIDIgMCAwIDAgMi0yIDIgMiAwIDAgMC0yLTJoLTJWOWE1IDUgMCAwIDAtNS01QzkuNSA0IDcuNDUgNS44MiA3LjA2IDguMTkgNi43MyA4LjA3IDYuMzcgOCA2IDhhMyAzIDAgMCAwLTMgM2MwIDEuMTEuNiAyLjA4IDEuNSAyLjZ2LS4wMW01LTIuNTloM2wtMiA0aDJsLTMuNzUgNyAuNzUtNUg3bDIuNS02bTggNy42N2MwIDEuMjktMSAyLjMzLTIuMjUgMi4zM1MxMyAxOS45NiAxMyAxOC42N2MwLTEuNTUgMi4yNS00LjE3IDIuMjUtNC4xN3MyLjI1IDIuNjIgMi4yNSA0LjE3eiIvPjwvc3ZnPg==',
    SNOW: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LDE0QTEsMSAwIDAsMSA3LDE1QTEsMSAwIDAsMSA2LDE2QTUsNSAwIDAsMSAxLDExQTUsNSAwIDAsMSA2LDZDNywzLjY1IDkuMywyIDEyLDJDMTUuNDMsMiAxOC4yNCw0LjY2IDE4LjUsOC4wM0wxOSw4QTQsNCAwIDAsMSAyMywxMkE0LDQgMCAwLDEgMTksMTZIMThBMSwxIDAgMCwxIDE3LDE1QTEsMSAwIDAsMSAxOCwxNEgxOUEyLDIgMCAwLDAgMjEsMTJBMiwyIDAgMCwwIDE5LDEwSDE3VjlBNSw1IDAgMCwwIDEyLDRDOS41LDQgNy40NSw1LjgyIDcuMDYsOC4xOUM2LjczLDguMDcgNi4zNyw4IDYsOEEzLDMgMCAwLDAgMywxMUEzLDMgMCAwLDAgNiwxNE03Ljg4LDE4LjA3TDEwLjA3LDE3LjVMOC40NiwxNS44OEM4LjA3LDE1LjUgOC4wNywxNC44NiA4LjQ2LDE0LjQ2QzguODUsMTQuMDcgOS41LDE0LjA3IDkuODgsMTQuNDZMMTEuNSwxNi4wN0wxMi4wNywxMy44OEMxMi4yMSwxMy4zNCAxMi43NiwxMy4wMyAxMy4yOSwxMy4xN0MxMy44MywxMy4zMSAxNC4xNCwxMy44NiAxNCwxNC40TDEzLjQxLDE2LjU5TDE1LjYsMTZDMTYuMTQsMTUuODYgMTYuNjksMTYuMTcgMTYuODMsMTYuNzFDMTYuOTcsMTcuMjQgMTYuNjYsMTcuNzkgMTYuMTIsMTcuOTNMMTMuOTMsMTguNUwxNS41NCwyMC4xMkMxNS45MywyMC41IDE1LjkzLDIxLjE1IDE1LjU0LDIxLjU0QzE1LjE1LDIxLjkzIDE0LjUsMjEuOTMgMTQuMTIsMjEuNTRMMTIuNSwxOS45M0wxMS45MywyMi4xMkMxMS43OSwyMi42NiAxMS4yNCwyMi45NyAxMC43MSwyMi44M0MxMC4xNywyMi42OSA5Ljg2LDIyLjE0IDEwLDIxLjZMMTAuNTksMTkuNDFMOC40LDIwQzcuODYsMjAuMTQgNy4zMSwxOS44MyA3LjE3LDE5LjI5QzcuMDMsMTguNzYgNy4zNCwxOC4yMSA3Ljg4LDE4LjA3WiIgLz48L3N2Zz4=',
    SUN: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMiw3QTUsNSAwIDAsMSAxNywxMkE1LDUgMCAwLDEgMTIsMTdBNSw1IDAgMCwxIDcsMTJBNSw1IDAgMCwxIDEyLDdNMTIsOUEzLDMgMCAwLDAgOSwxMkEzLDMgMCAwLDAgMTIsMTVBMywzIDAgMCwwIDE1LDEyQTMsMyAwIDAsMCAxMiw5TTEyLDJMMTQuMzksNS40MkMxMy42NSw1LjE1IDEyLjg0LDUgMTIsNUMxMS4xNiw1IDEwLjM1LDUuMTUgOS42MSw1LjQyTDEyLDJNMy4zNCw3TDcuNSw2LjY1QzYuOSw3LjE2IDYuMzYsNy43OCA1Ljk0LDguNUM1LjUsOS4yNCA1LjI1LDEwIDUuMTEsMTAuNzlMMy4zNCw3TTMuMzYsMTdMNS4xMiwxMy4yM0M1LjI2LDE0IDUuNTMsMTQuNzggNS45NSwxNS41QzYuMzcsMTYuMjQgNi45MSwxNi44NiA3LjUsMTcuMzdMMy4zNiwxN00yMC42NSw3TDE4Ljg4LDEwLjc5QzE4Ljc0LDEwIDE4LjQ3LDkuMjMgMTguMDUsOC41QzE3LjYzLDcuNzggMTcuMSw3LjE1IDE2LjUsNi42NEwyMC42NSw3TTIwLjY0LDE3TDE2LjUsMTcuMzZDMTcuMDksMTYuODUgMTcuNjIsMTYuMjIgMTguMDQsMTUuNUMxOC40NiwxNC43NyAxOC43MywxNCAxOC44NywxMy4yMUwyMC42NCwxN00xMiwyMkw5LjU5LDE4LjU2QzEwLjMzLDE4LjgzIDExLjE0LDE5IDEyLDE5QzEyLjgyLDE5IDEzLjYzLDE4LjgzIDE0LjM3LDE4LjU2TDEyLDIyWiIgLz48L3N2Zz4=',
    SUN2: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTYuNzYgNC44NGwtMS44LTEuNzktMS40MSAxLjQxIDEuNzkgMS43OSAxLjQyLTEuNDF6TTQgMTAuNUgxdjJoM3YtMnptOS05Ljk1aC0yVjMuNWgyVi41NXptNy40NSAzLjkxbC0xLjQxLTEuNDEtMS43OSAxLjc5IDEuNDEgMS40MSAxLjc5LTEuNzl6bS0zLjIxIDEzLjdsMS43OSAxLjggMS40MS0xLjQxLTEuOC0xLjc5LTEuNCAxLjR6TTIwIDEwLjV2Mmgzdi0yaC0zem0tOC01Yy0zLjMxIDAtNiAyLjY5LTYgNnMyLjY5IDYgNiA2IDYtMi42OSA2LTYtMi42OS02LTYtNnptLTEgMTYuOTVoMlYxOS41aC0ydjIuOTV6bS03LjQ1LTMuOTFsMS40MSAxLjQxIDEuNzktMS44LTEuNDEtMS40MS0xLjc5IDEuOHoiLz48L3N2Zz4=',
    WIND: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik00LDEwQTEsMSAwIDAsMSAzLDlBMSwxIDAgMCwxIDQsOEgxMkEyLDIgMCAwLDAgMTQsNkEyLDIgMCAwLDAgMTIsNEMxMS40NSw0IDEwLjk1LDQuMjIgMTAuNTksNC41OUMxMC4yLDUgOS41Niw1IDkuMTcsNC41OUM4Ljc4LDQuMiA4Ljc4LDMuNTYgOS4xNywzLjE3QzkuOSwyLjQ1IDEwLjksMiAxMiwyQTQsNCAwIDAsMSAxNiw2QTQsNCAwIDAsMSAxMiwxMEg0TTE5LDEyQTEsMSAwIDAsMCAyMCwxMUExLDEgMCAwLDAgMTksMTBDMTguNzIsMTAgMTguNDcsMTAuMTEgMTguMjksMTAuMjlDMTcuOSwxMC42OCAxNy4yNywxMC42OCAxNi44OCwxMC4yOUMxNi41LDkuOSAxNi41LDkuMjcgMTYuODgsOC44OEMxNy40Miw4LjM0IDE4LjE3LDggMTksOEEzLDMgMCAwLDEgMjIsMTFBMywzIDAgMCwxIDE5LDE0SDVBMSwxIDAgMCwxIDQsMTNBMSwxIDAgMCwxIDUsMTJIMTlNMTgsMThINEExLDEgMCAwLDEgMywxN0ExLDEgMCAwLDEgNCwxNkgxOEEzLDMgMCAwLDEgMjEsMTlBMywzIDAgMCwxIDE4LDIyQzE3LjE3LDIyIDE2LjQyLDIxLjY2IDE1Ljg4LDIxLjEyQzE1LjUsMjAuNzMgMTUuNSwyMC4xIDE1Ljg4LDE5LjcxQzE2LjI3LDE5LjMyIDE2LjksMTkuMzIgMTcuMjksMTkuNzFDMTcuNDcsMTkuODkgMTcuNzIsMjAgMTgsMjBBMSwxIDAgMCwwIDE5LDE5QTEsMSAwIDAsMCAxOCwxOFoiIC8+PC9zdmc+'
};

var WEATHER_YAHOO_CODE = {
    CLOUD: [19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 44],
    RAIN: [6, 8, 9, 10, 11, 12, 35, 37, 38, 39, 40, 45, 47],
    SNOW: [5, 7, 13, 14, 15, 16, 17, 18, 41, 42, 43, 46],
    SUN: [31, 32, 33, 34, 36],
    WIND: [0, 1, 2, 3, 24]
};

var WEATHER = {
    default: {
        icon: WEATHER_ICON.SUN,
        text: '22°C',
        color: 'red',
        subtext: 'Bergen'
    },
    customise: {
        icon: WEATHER_ICON.RAIN,
        text: '-5°C',
        color: 'blue',
        subtext: 'Oslo'
    }
};

exports.default = { ADS: ADS, NEWS: NEWS, WEATHER: WEATHER, WEATHER_ICON: WEATHER_ICON, WEATHER_YAHOO_CODE: WEATHER_YAHOO_CODE, STORAGE_KEY_USER: STORAGE_KEY_USER };

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLoggedInUser = exports.doStoreUser = undefined;

var _constants = __webpack_require__(22);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {BIDXidConnect.UserInfo|null}
 */
function getLoggedInUser() {
    try {
        return JSON.parse(window.sessionStorage.getItem(_constants2.default.STORAGE_KEY_USER)) || null;
    } catch (e) {
        return null;
    }
}

function doStoreUser(user) {
    if (user) {
        window.sessionStorage.setItem(_constants2.default.STORAGE_KEY_USER, JSON.stringify(user));
    } else {
        window.sessionStorage.removeItem(_constants2.default.STORAGE_KEY_USER);
    }
}

exports.doStoreUser = doStoreUser;
exports.getLoggedInUser = getLoggedInUser;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onXIDLoaded = exports.doLogoutFromXID = exports.doSwitchUserXID = exports.doLoginWithXID = undefined;

var _app = __webpack_require__(19);

var _toastHelper = __webpack_require__(3);

var _toastHelper2 = _interopRequireDefault(_toastHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onXIDLoaded() {
    var loginButtonElement = document.querySelector('#login-button');
    loginButtonElement.disabled = false;

    doInitXID();
    if (!(0, _app.isUserLoggedIn)()) {
        doLoginWithXID({ noStepup: true });
    }
}

function doInitXID() {
    if (!window.XID) {
        return console.warn('xID not loaded yet');
    }

    window.XID.doInit({
        client_id: 'xIDNews',
        client_type: 'XID',
        scope: 'openid phone address',
        noStepup: false,
        method: 'inline',
        redirect_uri: '{data_xidOauthRedirectUri}',
        oauth_url: '{data_xidOauthEndpoint}',
        token_endpoint: '{data_xidOauthTokenUrl}',
        userinfo_endpoint: '{data_xidOauthUserInfoUrl}'
    });
}

function doLoginWithXID() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!window.XID) {
        return console.warn('xID not loaded yet');
    }

    window.XID.doConnect({
        callback: function callback(err, accessToken) {
            console.log('doConnectCallback', accessToken);
            if (err) {
                console.error('doLoginWithXID', err);
                if ((0, _app.isUserLoggedIn)()) {
                    (0, _app.handleXIDLogin)(null);
                }
            } else {
                window.XID.doGetUserInfo(function (err, user) {
                    return (0, _app.handleXIDLogin)(user || null);
                });
            }
        },
        config: config,
        inlineElementID: 'authenticate-client',
        inlineModalWindow: true
    });
}

function doLogoutFromXID() {
    if (!window.XID) {
        return console.warn('xID not loaded yet');
    }

    window.XID.doLogout();

    (0, _app.handleXIDLogin)(null);

    var toastContainerElement = document.querySelector('.toast-wrapper');
    _toastHelper2.default.showToast(toastContainerElement, 'Logget ut');
}

function doSwitchUserXID() {
    doLogoutFromXID();
    // Remove xID Cookie
    window.XID.doReset();
    doLoginWithXID({ client_type: '' });
}

exports.doLoginWithXID = doLoginWithXID;
exports.doSwitchUserXID = doSwitchUserXID;
exports.doLogoutFromXID = doLogoutFromXID;
exports.onXIDLoaded = onXIDLoaded;

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(19);

(0, _app.doInit)();

/***/ })
/******/ ]);