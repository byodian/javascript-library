/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/headroom.js/dist/headroom.js":
/*!***************************************************!*\
  !*** ./node_modules/headroom.js/dist/headroom.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * headroom.js v0.12.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, function () { 'use strict';

  function isBrowser() {
    return typeof window !== "undefined";
  }

  /**
   * Used to detect browser support for adding an event listener with options
   * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  function passiveEventsSupported() {
    var supported = false;

    try {
      var options = {
        // eslint-disable-next-line getter-return
        get passive() {
          supported = true;
        }
      };
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      supported = false;
    }

    return supported;
  }

  function isSupported() {
    return !!(
      isBrowser() &&
      function() {}.bind &&
      "classList" in document.documentElement &&
      Object.assign &&
      Object.keys &&
      requestAnimationFrame
    );
  }

  function isDocument(obj) {
    return obj.nodeType === 9; // Node.DOCUMENT_NODE === 9
  }

  function isWindow(obj) {
    // `obj === window` or `obj instanceof Window` is not sufficient,
    // as the obj may be the window of an iframe.
    return obj && obj.document && isDocument(obj.document);
  }

  function windowScroller(win) {
    var doc = win.document;
    var body = doc.body;
    var html = doc.documentElement;

    return {
      /**
       * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
       * @return {Number} the scroll height of the document in pixels
       */
      scrollHeight: function() {
        return Math.max(
          body.scrollHeight,
          html.scrollHeight,
          body.offsetHeight,
          html.offsetHeight,
          body.clientHeight,
          html.clientHeight
        );
      },

      /**
       * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
       * @return {Number} the height of the viewport in pixels
       */
      height: function() {
        return win.innerHeight || html.clientHeight || body.clientHeight;
      },

      /**
       * Gets the Y scroll position
       * @return {Number} pixels the page has scrolled along the Y-axis
       */
      scrollY: function() {
        if (win.pageYOffset !== undefined) {
          return win.pageYOffset;
        }

        return (html || body.parentNode || body).scrollTop;
      }
    };
  }

  function elementScroller(element) {
    return {
      /**
       * @return {Number} the scroll height of the element in pixels
       */
      scrollHeight: function() {
        return Math.max(
          element.scrollHeight,
          element.offsetHeight,
          element.clientHeight
        );
      },

      /**
       * @return {Number} the height of the element in pixels
       */
      height: function() {
        return Math.max(element.offsetHeight, element.clientHeight);
      },

      /**
       * Gets the Y scroll position
       * @return {Number} pixels the element has scrolled along the Y-axis
       */
      scrollY: function() {
        return element.scrollTop;
      }
    };
  }

  function createScroller(element) {
    return isWindow(element) ? windowScroller(element) : elementScroller(element);
  }

  /**
   * @param element EventTarget
   */
  function trackScroll(element, options, callback) {
    var isPassiveSupported = passiveEventsSupported();
    var rafId;
    var scrolled = false;
    var scroller = createScroller(element);
    var lastScrollY = scroller.scrollY();
    var details = {};

    function update() {
      var scrollY = Math.round(scroller.scrollY());
      var height = scroller.height();
      var scrollHeight = scroller.scrollHeight();

      // reuse object for less memory churn
      details.scrollY = scrollY;
      details.lastScrollY = lastScrollY;
      details.direction = scrollY > lastScrollY ? "down" : "up";
      details.distance = Math.abs(scrollY - lastScrollY);
      details.isOutOfBounds = scrollY < 0 || scrollY + height > scrollHeight;
      details.top = scrollY <= options.offset[details.direction];
      details.bottom = scrollY + height >= scrollHeight;
      details.toleranceExceeded =
        details.distance > options.tolerance[details.direction];

      callback(details);

      lastScrollY = scrollY;
      scrolled = false;
    }

    function handleScroll() {
      if (!scrolled) {
        scrolled = true;
        rafId = requestAnimationFrame(update);
      }
    }

    var eventOptions = isPassiveSupported
      ? { passive: true, capture: false }
      : false;

    element.addEventListener("scroll", handleScroll, eventOptions);
    update();

    return {
      destroy: function() {
        cancelAnimationFrame(rafId);
        element.removeEventListener("scroll", handleScroll, eventOptions);
      }
    };
  }

  function normalizeUpDown(t) {
    return t === Object(t) ? t : { down: t, up: t };
  }

  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom(elem, options) {
    options = options || {};
    Object.assign(this, Headroom.options, options);
    this.classes = Object.assign({}, Headroom.options.classes, options.classes);

    this.elem = elem;
    this.tolerance = normalizeUpDown(this.tolerance);
    this.offset = normalizeUpDown(this.offset);
    this.initialised = false;
    this.frozen = false;
  }
  Headroom.prototype = {
    constructor: Headroom,

    /**
     * Start listening to scrolling
     * @public
     */
    init: function() {
      if (Headroom.cutsTheMustard && !this.initialised) {
        this.addClass("initial");
        this.initialised = true;

        // defer event registration to handle browser
        // potentially restoring previous scroll position
        setTimeout(
          function(self) {
            self.scrollTracker = trackScroll(
              self.scroller,
              { offset: self.offset, tolerance: self.tolerance },
              self.update.bind(self)
            );
          },
          100,
          this
        );
      }

      return this;
    },

    /**
     * Destroy the widget, clearing up after itself
     * @public
     */
    destroy: function() {
      this.initialised = false;
      Object.keys(this.classes).forEach(this.removeClass, this);
      this.scrollTracker.destroy();
    },

    /**
     * Unpin the element
     * @public
     */
    unpin: function() {
      if (this.hasClass("pinned") || !this.hasClass("unpinned")) {
        this.addClass("unpinned");
        this.removeClass("pinned");

        if (this.onUnpin) {
          this.onUnpin.call(this);
        }
      }
    },

    /**
     * Pin the element
     * @public
     */
    pin: function() {
      if (this.hasClass("unpinned")) {
        this.addClass("pinned");
        this.removeClass("unpinned");

        if (this.onPin) {
          this.onPin.call(this);
        }
      }
    },

    /**
     * Freezes the current state of the widget
     * @public
     */
    freeze: function() {
      this.frozen = true;
      this.addClass("frozen");
    },

    /**
     * Re-enables the default behaviour of the widget
     * @public
     */
    unfreeze: function() {
      this.frozen = false;
      this.removeClass("frozen");
    },

    top: function() {
      if (!this.hasClass("top")) {
        this.addClass("top");
        this.removeClass("notTop");

        if (this.onTop) {
          this.onTop.call(this);
        }
      }
    },

    notTop: function() {
      if (!this.hasClass("notTop")) {
        this.addClass("notTop");
        this.removeClass("top");

        if (this.onNotTop) {
          this.onNotTop.call(this);
        }
      }
    },

    bottom: function() {
      if (!this.hasClass("bottom")) {
        this.addClass("bottom");
        this.removeClass("notBottom");

        if (this.onBottom) {
          this.onBottom.call(this);
        }
      }
    },

    notBottom: function() {
      if (!this.hasClass("notBottom")) {
        this.addClass("notBottom");
        this.removeClass("bottom");

        if (this.onNotBottom) {
          this.onNotBottom.call(this);
        }
      }
    },

    shouldUnpin: function(details) {
      var scrollingDown = details.direction === "down";

      return scrollingDown && !details.top && details.toleranceExceeded;
    },

    shouldPin: function(details) {
      var scrollingUp = details.direction === "up";

      return (scrollingUp && details.toleranceExceeded) || details.top;
    },

    addClass: function(className) {
      this.elem.classList.add.apply(
        this.elem.classList,
        this.classes[className].split(" ")
      );
    },

    removeClass: function(className) {
      this.elem.classList.remove.apply(
        this.elem.classList,
        this.classes[className].split(" ")
      );
    },

    hasClass: function(className) {
      return this.classes[className].split(" ").every(function(cls) {
        return this.classList.contains(cls);
      }, this.elem);
    },

    update: function(details) {
      if (details.isOutOfBounds) {
        // Ignore bouncy scrolling in OSX
        return;
      }

      if (this.frozen === true) {
        return;
      }

      if (details.top) {
        this.top();
      } else {
        this.notTop();
      }

      if (details.bottom) {
        this.bottom();
      } else {
        this.notBottom();
      }

      if (this.shouldUnpin(details)) {
        this.unpin();
      } else if (this.shouldPin(details)) {
        this.pin();
      }
    }
  };

  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance: {
      up: 0,
      down: 0
    },
    offset: 0,
    scroller: isBrowser() ? window : null,
    classes: {
      frozen: "headroom--frozen",
      pinned: "headroom--pinned",
      unpinned: "headroom--unpinned",
      top: "headroom--top",
      notTop: "headroom--not-top",
      bottom: "headroom--bottom",
      notBottom: "headroom--not-bottom",
      initial: "headroom"
    }
  };

  Headroom.cutsTheMustard = isSupported();

  return Headroom;

}));


/***/ }),

/***/ "./src/js/constructor.js":
/*!*******************************!*\
  !*** ./src/js/constructor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function emitEvent(type, detail = {}, elem = document) {
  // Make sure there's an event type
  if (!type) return;

  // Create a new event
  const customEvent = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail
  });

  // Dispatch the event
  return elem.dispatchEvent(customEvent);
}

let greetings = (function () {
  let settings = {
    greeting: 'you',
    hiBefore: 'Heyo',
    hiAfter: '',
    byeBefore: 'See ya later',
    byeAfter: 'Take it easy.'  
  }

  function updateSettings (options = {}) {
    Object.assign(settings, options)
  }

  function sayHi (name) {
    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${settings.hiBefore} ${name ? name : settings.greeting} ${settings.hiAfter}`
    )
    return 
  }

  function sayBye (name) {
    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${settings.byeBefore} ${name ? name : settings.greeting} ${settings.byeAfter}`
    )

    return 
  }

  return {
    updateSettings,
    sayHi,
    sayBye    
  }
})()

// greetings.updateSettings({
//   greetings: 'world'
// })

// greetings.sayHi('merlin');
// greetings.sayBye('morgan');

let Greeting = (function () {
  const defaults = {
    greeting: 'you',
    hiBefore: 'Heyo',
    hiAfter: '',
    byeBefore: 'See ya later',
    byeAfter: 'Take it easy.',

    // callbacks
    onHi: function () {},
    onBye: function () {}
  }

  function emitEvent(type, detail = {}, elem = document) {
    // Make sure there's an event type
    if (!type) return;
  
    // Create a new event
    const customEvent = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      detail: detail
    });
  
    // Dispatch the event
    return elem.dispatchEvent(customEvent);
  }

  const Constructor = function(name, options = {}) {
    const settings = Object.assign({}, defaults, options)

    Object.freeze(settings)

    Object.defineProperties(this, {
      _name: { value: name },
      _settings: { value: settings }
    })
  } 
  Constructor.prototype.sayHi = function () {
    // Emit custom event
    const canceled = !emitEvent('greeting:before-hi', {
      name: this._name,
      before: this._settings.hiBefore,
      after: this._settings.hiAfter
    });

    // If the event was canceled, end
    if (canceled) return;

    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${this._settings.hiBefore} ${this._name} ${this._settings.hiAfter}`
    )
    
    // Run callback
    this._settings.onHi(this._name, this._settings.hiBefore, this._settings.hiAfter)

    // Emit custom event
    emitEvent('greeting:hi', {
      name: this._name,
      before: this._settings.hiBefore,
      after: this._settings.hiAfter
    })

    return this
  }

  Constructor.prototype.sayBye = function () {
    // Emit custom event
    const canceled = !emitEvent('greeting:before-bye', {
      name: this._name,
      before: this._settings.byeBefore,
      after: this._settings.byeAfter
    });

    // If the event was canceled, end
    if (canceled) return;

    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${this._settings.byeBefore} ${this._name} ${this._settings.byeAfter}`
    )
    
    this._settings.onBye(this._name, this._settings.byeBefore, this._settings.byeAfter);
    
    // Emit custom event
    emitEvent('greeting:bye', {
      name: this._name,
      before: this._settings.byeBefore,
      after: this._settings.byeAfter
    });
    
    return this
  }

  return Constructor
})()

const merlin = new Greeting('Merlin', {
  hiAfter: '.',
  // onBye: function(name) {
  //   const app = document.querySelector('.bye-text')
  //   app.textContent = `👋 ${name}`;
  // }
});

document.addEventListener('greeting:bye', function (event) {
  const app = document.querySelector('.bye-text');
  app.textContent = `👋 ${event.detail.name}`
});

let form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.reset();
    merlin.sayBye();
});


/**
 * Emit a custom event
 */
// document.addEventListener('my-custom-event', function(event) {
//   console.log(123)
//   console.log(event.type)
//   event.preventDefault()
// })

// let myEvent = new CustomEvent('my-custom-event', {
//   bubbles: true,
//   cancelable: true
// })

// // Emit the event
// const canceled = document.dispatchEvent(myEvent);
// console.log(myEvent)
// console.log(canceled)



/***/ }),

/***/ "./src/js/dom-manipulation.js":
/*!************************************!*\
  !*** ./src/js/dom-manipulation.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
* * DOM Manipulation LIbraries
* 1. https://scrollrevealjs.org/
* 2. https://photoswipe.com/
* * DOM manipulation libraries have some unique considerations compared to utility libraries.
* * How can we convert this into a library
* 1. Injecting content into the DOM
* 2. Listening for events
* 3. Adding options and settings
* 4. Exposing public methods
* 5. Destroying the instantiation
 */

const egg = (function() {
  // Get the element
  const init =  function() {
    let elem = document.querySelector('#egg');
    let scaled = false;
  
    // Create button
    let btn = document.createElement('button');
    btn.innerHTML = '🥚';
    btn.setAttribute('aria-label', `click me`);
    btn.style.transition = 'transform 300ms ease-in';
  
    // Inject into the DOM
    elem.append(btn);
  
    /**
     * Handle click events
     */
    function toggle () {
      // If the button is scaled, shrink it
      // Otherwise, grow it
      btn.style.transform = scaled ? '' : 'scale(2)';
  
      // Flip the scaled state
      scaled = !scaled;
    }
  
    // Listen for clicks on the button
    btn.addEventListener('click', toggle);
  }
  
  return { init }
})()

// egg.init()

// * DOM manipulation libraries that add content to the UI
// usually take one of two approaches:
// 1. Inject it on instantiation
// 2. Have an explicit init() method

// * One of the unique challenges with the constructor pattern and DOM
// * manipulation libraries is that the callback function in the 
// * event listener needs to know some unique properties from each 
// * specific instance

// * Add a public toggle() method

// * Destroying an instantiation
// 1. This typically involves removing any added DOM
//    elements and stopping any event listeners. 
// 2. A common convention is to expose a destroy() method to do that.
// 3. Remove an event listener callback immediately

let Egg = (function () {

  const defaults = {
    label: 'click me',
    btnText: '🥚',
    transition: 'transform 300ms ease-in',
    scale: '2'
  }

  function createBtn (elem, settings) {
    let btn = document.createElement('button');
    btn.innerHTML = settings.btnText;

    if (settings.label) {
      btn.setAttribute('aria-label', settings.label);
    }
    if (settings.transition) {
      btn.style.transition = settings.transition;
    }

    elem.append(btn);

    return btn
  }

  function toggleBtn (instance) {
    // If the button is scaled, shrink it
    // Otherwise, grow it
    instance._btn.style.transform = instance._scaled ? '' : `scale(${instance._settings.scale})`;

    // Flip the scaled state
    instance._scaled = !instance._scaled;
  }

  function createEventListener(btn, instance) {
    function toggle() {
      toggleBtn(instance)
    }
    btn.addEventListener('click', toggle)

    return toggle
  }

  function Constructor (selector, options = {}) {
    const elem = document.querySelector(selector);

    const settings = Object.assign({}, defaults, options);
    Object.freeze(settings);

    const btn = createBtn(elem, settings);
    
    // Create the event listener
    const listener = createEventListener(btn, this)

    Object.defineProperties(this, {
      _elem: { value: elem },
      _settings: {value: settings},
      _btn: { value: btn},
      _listener: { value: listener },
      _scaled: { value: false, writable: true }
    })
  }

  Constructor.prototype.toggle = function () {  
    toggleBtn(this)
  }

  /**
   * Destroy this instance
   */

  Constructor.prototype.destroy = function () {
    // Remove the event listener immediately
    this._btn.removeEventListener('click', this._listener);

    // Remove the button
    this._btn.remove();
  };

  return Constructor
})()

const egg1 = new Egg('#egg')
egg1.toggle()
const party = new Egg('#party', {
  btnText: '🎉',
  label: `It's party time`,
  scale: '3'
})

party.destroy()

/***/ }),

/***/ "./src/js/hooks.js":
/*!*************************!*\
  !*** ./src/js/hooks.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Hooks - in the form of callbacks and custom events
// Developers can use to run code when specific things
// happen in your library

// * Callbacks
// 1. A callback is a function that runs at a specific time.
// 2. In your library, you can let users pass callback
//    function in as options.
// 3. When a particular action happens in your library,
//    you can run the callback function.
// 4. You can even pass in arguments that developers can
// .  use to access information about the current
// .  instantiation in their callback. 


// * Custom Events
// Instead of padding in a callback function, you can
// alternatively emit a custom event that developers 
// can listen for with the `Element.addEventListener()` method.

// The `CustomEvent()` object provides a way to create and emit
// custom events, as well as pass in custom event details.



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! headroom.js */ "./node_modules/headroom.js/dist/headroom.js");
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(headroom_js__WEBPACK_IMPORTED_MODULE_0__);


const header = document.querySelector('header');
const headroom = new headroom_js__WEBPACK_IMPORTED_MODULE_0___default.a(header);
headroom.init();
headroom.top();

/***/ }),

/***/ 0:
/*!******************************************************************************************************!*\
  !*** multi ./src/js/constructor.js ./src/js/dom-manipulation.js ./src/js/hooks.js ./src/js/index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/constructor.js */"./src/js/constructor.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/dom-manipulation.js */"./src/js/dom-manipulation.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/hooks.js */"./src/js/hooks.js");
module.exports = __webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hlYWRyb29tLmpzL2Rpc3QvaGVhZHJvb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kb20tbWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9ob29rcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsU0FDc0Q7QUFDeEQsQ0FBQyxvQkFBb0I7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpREFBaUQ7QUFDaEU7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNwYkQsb0NBQW9DO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLFNBQVMsa0JBQWtCLEdBQUcsZ0NBQWdDLEdBQUcsaUJBQWlCO0FBQ2xGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUyxtQkFBbUIsR0FBRyxnQ0FBZ0MsR0FBRyxrQkFBa0I7QUFDcEY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLGlEQUFpRDtBQUNqRCxxQ0FBcUM7O0FBRXJDOztBQUVBO0FBQ0EsY0FBYyxjQUFjO0FBQzVCLGtCQUFrQjtBQUNsQixLQUFLO0FBQ0wsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLFNBQVMsd0JBQXdCLEdBQUcsV0FBVyxHQUFHLHVCQUF1QjtBQUN6RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUyx5QkFBeUIsR0FBRyxXQUFXLEdBQUcsd0JBQXdCO0FBQzNFOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSwwQkFBMEIsa0JBQWtCO0FBQzVDLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUseUJBQXlCOztBQUU5RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5Qzs7QUFFQSxxQ0FBcUM7QUFDckM7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWMsY0FBYztBQUM1QixrQkFBa0IsZ0JBQWdCO0FBQ2xDLGFBQWEsWUFBWTtBQUN6QixrQkFBa0Isa0JBQWtCO0FBQ3BDLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7O0FBRUEsOEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGU7Ozs7Ozs7Ozs7O0FDN0pBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQUE7QUFBQTtBQUFtQzs7QUFFbkM7QUFDQSxxQkFBcUIsa0RBQVE7QUFDN0I7QUFDQSxlIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKiFcbiAqIGhlYWRyb29tLmpzIHYwLjEyLjAgLSBHaXZlIHlvdXIgcGFnZSBzb21lIGhlYWRyb29tLiBIaWRlIHlvdXIgaGVhZGVyIHVudGlsIHlvdSBuZWVkIGl0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgTmljayBXaWxsaWFtcyAtIGh0dHA6Ly93aWNreS5uaWxsaWEubXMvaGVhZHJvb20uanNcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuSGVhZHJvb20gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBpc0Jyb3dzZXIoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgYnJvd3NlciBzdXBwb3J0IGZvciBhZGRpbmcgYW4gZXZlbnQgbGlzdGVuZXIgd2l0aCBvcHRpb25zXG4gICAqIENyZWRpdDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXJcbiAgICovXG4gIGZ1bmN0aW9uIHBhc3NpdmVFdmVudHNTdXBwb3J0ZWQoKSB7XG4gICAgdmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2V0dGVyLXJldHVyblxuICAgICAgICBnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIGlzQnJvd3NlcigpICYmXG4gICAgICBmdW5jdGlvbigpIHt9LmJpbmQgJiZcbiAgICAgIFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmXG4gICAgICBPYmplY3QuYXNzaWduICYmXG4gICAgICBPYmplY3Qua2V5cyAmJlxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIG9iai5ub2RlVHlwZSA9PT0gOTsgLy8gTm9kZS5ET0NVTUVOVF9OT0RFID09PSA5XG4gIH1cblxuICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopIHtcbiAgICAvLyBgb2JqID09PSB3aW5kb3dgIG9yIGBvYmogaW5zdGFuY2VvZiBXaW5kb3dgIGlzIG5vdCBzdWZmaWNpZW50LFxuICAgIC8vIGFzIHRoZSBvYmogbWF5IGJlIHRoZSB3aW5kb3cgb2YgYW4gaWZyYW1lLlxuICAgIHJldHVybiBvYmogJiYgb2JqLmRvY3VtZW50ICYmIGlzRG9jdW1lbnQob2JqLmRvY3VtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdpbmRvd1Njcm9sbGVyKHdpbikge1xuICAgIHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG4gICAgdmFyIGJvZHkgPSBkb2MuYm9keTtcbiAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBAc2VlIGh0dHA6Ly9qYW1lcy5wYWRvbHNleS5jb20vamF2YXNjcmlwdC9nZXQtZG9jdW1lbnQtaGVpZ2h0LWNyb3NzLWJyb3dzZXIvXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBzY3JvbGwgaGVpZ2h0IG9mIHRoZSBkb2N1bWVudCBpbiBwaXhlbHNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsSGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAgIGJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGh0bWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGh0bWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGJvZHkuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIGh0bWwuY2xpZW50SGVpZ2h0XG4gICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBzZWUgaHR0cDovL2FuZHlsYW5ndG9uLmNvLnVrL2Jsb2cvZGV2ZWxvcG1lbnQvZ2V0LXZpZXdwb3J0LXNpemUtd2lkdGgtYW5kLWhlaWdodC1qYXZhc2NyaXB0XG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIHZpZXdwb3J0IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gd2luLmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0IHx8IGJvZHkuY2xpZW50SGVpZ2h0O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXRzIHRoZSBZIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSBwaXhlbHMgdGhlIHBhZ2UgaGFzIHNjcm9sbGVkIGFsb25nIHRoZSBZLWF4aXNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsWTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW4ucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGh0bWwgfHwgYm9keS5wYXJlbnROb2RlIHx8IGJvZHkpLnNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZWxlbWVudFNjcm9sbGVyKGVsZW1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBzY3JvbGwgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBzY3JvbGxIZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoZWxlbWVudC5vZmZzZXRIZWlnaHQsIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogR2V0cyB0aGUgWSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gcGl4ZWxzIHRoZSBlbGVtZW50IGhhcyBzY3JvbGxlZCBhbG9uZyB0aGUgWS1heGlzXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbFk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNjcm9sbGVyKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNXaW5kb3coZWxlbWVudCkgPyB3aW5kb3dTY3JvbGxlcihlbGVtZW50KSA6IGVsZW1lbnRTY3JvbGxlcihlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZWxlbWVudCBFdmVudFRhcmdldFxuICAgKi9cbiAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgaXNQYXNzaXZlU3VwcG9ydGVkID0gcGFzc2l2ZUV2ZW50c1N1cHBvcnRlZCgpO1xuICAgIHZhciByYWZJZDtcbiAgICB2YXIgc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICB2YXIgc2Nyb2xsZXIgPSBjcmVhdGVTY3JvbGxlcihlbGVtZW50KTtcbiAgICB2YXIgbGFzdFNjcm9sbFkgPSBzY3JvbGxlci5zY3JvbGxZKCk7XG4gICAgdmFyIGRldGFpbHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzY3JvbGxZID0gTWF0aC5yb3VuZChzY3JvbGxlci5zY3JvbGxZKCkpO1xuICAgICAgdmFyIGhlaWdodCA9IHNjcm9sbGVyLmhlaWdodCgpO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbGVyLnNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAvLyByZXVzZSBvYmplY3QgZm9yIGxlc3MgbWVtb3J5IGNodXJuXG4gICAgICBkZXRhaWxzLnNjcm9sbFkgPSBzY3JvbGxZO1xuICAgICAgZGV0YWlscy5sYXN0U2Nyb2xsWSA9IGxhc3RTY3JvbGxZO1xuICAgICAgZGV0YWlscy5kaXJlY3Rpb24gPSBzY3JvbGxZID4gbGFzdFNjcm9sbFkgPyBcImRvd25cIiA6IFwidXBcIjtcbiAgICAgIGRldGFpbHMuZGlzdGFuY2UgPSBNYXRoLmFicyhzY3JvbGxZIC0gbGFzdFNjcm9sbFkpO1xuICAgICAgZGV0YWlscy5pc091dE9mQm91bmRzID0gc2Nyb2xsWSA8IDAgfHwgc2Nyb2xsWSArIGhlaWdodCA+IHNjcm9sbEhlaWdodDtcbiAgICAgIGRldGFpbHMudG9wID0gc2Nyb2xsWSA8PSBvcHRpb25zLm9mZnNldFtkZXRhaWxzLmRpcmVjdGlvbl07XG4gICAgICBkZXRhaWxzLmJvdHRvbSA9IHNjcm9sbFkgKyBoZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0O1xuICAgICAgZGV0YWlscy50b2xlcmFuY2VFeGNlZWRlZCA9XG4gICAgICAgIGRldGFpbHMuZGlzdGFuY2UgPiBvcHRpb25zLnRvbGVyYW5jZVtkZXRhaWxzLmRpcmVjdGlvbl07XG5cbiAgICAgIGNhbGxiYWNrKGRldGFpbHMpO1xuXG4gICAgICBsYXN0U2Nyb2xsWSA9IHNjcm9sbFk7XG4gICAgICBzY3JvbGxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAgIGlmICghc2Nyb2xsZWQpIHtcbiAgICAgICAgc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBldmVudE9wdGlvbnMgPSBpc1Bhc3NpdmVTdXBwb3J0ZWRcbiAgICAgID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9XG4gICAgICA6IGZhbHNlO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCwgZXZlbnRPcHRpb25zKTtcbiAgICB1cGRhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsLCBldmVudE9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVVcERvd24odCkge1xuICAgIHJldHVybiB0ID09PSBPYmplY3QodCkgPyB0IDogeyBkb3duOiB0LCB1cDogdCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVJIGVuaGFuY2VtZW50IGZvciBmaXhlZCBoZWFkZXJzLlxuICAgKiBIaWRlcyBoZWFkZXIgd2hlbiBzY3JvbGxpbmcgZG93blxuICAgKiBTaG93cyBoZWFkZXIgd2hlbiBzY3JvbGxpbmcgdXBcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbSB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIHdpZGdldFxuICAgKi9cbiAgZnVuY3Rpb24gSGVhZHJvb20oZWxlbSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgSGVhZHJvb20ub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc2VzID0gT2JqZWN0LmFzc2lnbih7fSwgSGVhZHJvb20ub3B0aW9ucy5jbGFzc2VzLCBvcHRpb25zLmNsYXNzZXMpO1xuXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLnRvbGVyYW5jZSA9IG5vcm1hbGl6ZVVwRG93bih0aGlzLnRvbGVyYW5jZSk7XG4gICAgdGhpcy5vZmZzZXQgPSBub3JtYWxpemVVcERvd24odGhpcy5vZmZzZXQpO1xuICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xuICB9XG4gIEhlYWRyb29tLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogSGVhZHJvb20sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gc2Nyb2xsaW5nXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKEhlYWRyb29tLmN1dHNUaGVNdXN0YXJkICYmICF0aGlzLmluaXRpYWxpc2VkKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJpbml0aWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBkZWZlciBldmVudCByZWdpc3RyYXRpb24gdG8gaGFuZGxlIGJyb3dzZXJcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgcmVzdG9yaW5nIHByZXZpb3VzIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgIGZ1bmN0aW9uKHNlbGYpIHtcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsVHJhY2tlciA9IHRyYWNrU2Nyb2xsKFxuICAgICAgICAgICAgICBzZWxmLnNjcm9sbGVyLFxuICAgICAgICAgICAgICB7IG9mZnNldDogc2VsZi5vZmZzZXQsIHRvbGVyYW5jZTogc2VsZi50b2xlcmFuY2UgfSxcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGUuYmluZChzZWxmKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMCxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSB3aWRnZXQsIGNsZWFyaW5nIHVwIGFmdGVyIGl0c2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2xhc3NlcykuZm9yRWFjaCh0aGlzLnJlbW92ZUNsYXNzLCB0aGlzKTtcbiAgICAgIHRoaXMuc2Nyb2xsVHJhY2tlci5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVucGluIHRoZSBlbGVtZW50XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVucGluOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhhc0NsYXNzKFwicGlubmVkXCIpIHx8ICF0aGlzLmhhc0NsYXNzKFwidW5waW5uZWRcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInVucGlubmVkXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwicGlubmVkXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uVW5waW4pIHtcbiAgICAgICAgICB0aGlzLm9uVW5waW4uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQaW4gdGhlIGVsZW1lbnRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcGluOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhhc0NsYXNzKFwidW5waW5uZWRcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInBpbm5lZFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInVucGlubmVkXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uUGluKSB7XG4gICAgICAgICAgdGhpcy5vblBpbi5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZyZWV6ZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHdpZGdldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBmcmVlemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5mcm96ZW4gPSB0cnVlO1xuICAgICAgdGhpcy5hZGRDbGFzcyhcImZyb3plblwiKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmUtZW5hYmxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgdGhlIHdpZGdldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmZyZWV6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcImZyb3plblwiKTtcbiAgICB9LFxuXG4gICAgdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcInRvcFwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwidG9wXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwibm90VG9wXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uVG9wKSB7XG4gICAgICAgICAgdGhpcy5vblRvcC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG5vdFRvcDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoXCJub3RUb3BcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vdFRvcFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInRvcFwiKTtcblxuICAgICAgICBpZiAodGhpcy5vbk5vdFRvcCkge1xuICAgICAgICAgIHRoaXMub25Ob3RUb3AuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKFwiYm90dG9tXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJib3R0b21cIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJub3RCb3R0b21cIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25Cb3R0b20pIHtcbiAgICAgICAgICB0aGlzLm9uQm90dG9tLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbm90Qm90dG9tOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcIm5vdEJvdHRvbVwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwibm90Qm90dG9tXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwiYm90dG9tXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uTm90Qm90dG9tKSB7XG4gICAgICAgICAgdGhpcy5vbk5vdEJvdHRvbS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3VsZFVucGluOiBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICB2YXIgc2Nyb2xsaW5nRG93biA9IGRldGFpbHMuZGlyZWN0aW9uID09PSBcImRvd25cIjtcblxuICAgICAgcmV0dXJuIHNjcm9sbGluZ0Rvd24gJiYgIWRldGFpbHMudG9wICYmIGRldGFpbHMudG9sZXJhbmNlRXhjZWVkZWQ7XG4gICAgfSxcblxuICAgIHNob3VsZFBpbjogZnVuY3Rpb24oZGV0YWlscykge1xuICAgICAgdmFyIHNjcm9sbGluZ1VwID0gZGV0YWlscy5kaXJlY3Rpb24gPT09IFwidXBcIjtcblxuICAgICAgcmV0dXJuIChzY3JvbGxpbmdVcCAmJiBkZXRhaWxzLnRvbGVyYW5jZUV4Y2VlZGVkKSB8fCBkZXRhaWxzLnRvcDtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQuYXBwbHkoXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QsXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUuYXBwbHkoXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QsXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKS5ldmVyeShmdW5jdGlvbihjbHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNscyk7XG4gICAgICB9LCB0aGlzLmVsZW0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGRldGFpbHMpIHtcbiAgICAgIGlmIChkZXRhaWxzLmlzT3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgLy8gSWdub3JlIGJvdW5jeSBzY3JvbGxpbmcgaW4gT1NYXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZnJvemVuID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRldGFpbHMudG9wKSB7XG4gICAgICAgIHRoaXMudG9wKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdFRvcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGV0YWlscy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90Qm90dG9tKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNob3VsZFVucGluKGRldGFpbHMpKSB7XG4gICAgICAgIHRoaXMudW5waW4oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG91bGRQaW4oZGV0YWlscykpIHtcbiAgICAgICAgdGhpcy5waW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgb3B0aW9uc1xuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgSGVhZHJvb20ub3B0aW9ucyA9IHtcbiAgICB0b2xlcmFuY2U6IHtcbiAgICAgIHVwOiAwLFxuICAgICAgZG93bjogMFxuICAgIH0sXG4gICAgb2Zmc2V0OiAwLFxuICAgIHNjcm9sbGVyOiBpc0Jyb3dzZXIoKSA/IHdpbmRvdyA6IG51bGwsXG4gICAgY2xhc3Nlczoge1xuICAgICAgZnJvemVuOiBcImhlYWRyb29tLS1mcm96ZW5cIixcbiAgICAgIHBpbm5lZDogXCJoZWFkcm9vbS0tcGlubmVkXCIsXG4gICAgICB1bnBpbm5lZDogXCJoZWFkcm9vbS0tdW5waW5uZWRcIixcbiAgICAgIHRvcDogXCJoZWFkcm9vbS0tdG9wXCIsXG4gICAgICBub3RUb3A6IFwiaGVhZHJvb20tLW5vdC10b3BcIixcbiAgICAgIGJvdHRvbTogXCJoZWFkcm9vbS0tYm90dG9tXCIsXG4gICAgICBub3RCb3R0b206IFwiaGVhZHJvb20tLW5vdC1ib3R0b21cIixcbiAgICAgIGluaXRpYWw6IFwiaGVhZHJvb21cIlxuICAgIH1cbiAgfTtcblxuICBIZWFkcm9vbS5jdXRzVGhlTXVzdGFyZCA9IGlzU3VwcG9ydGVkKCk7XG5cbiAgcmV0dXJuIEhlYWRyb29tO1xuXG59KSk7XG4iLCJmdW5jdGlvbiBlbWl0RXZlbnQodHlwZSwgZGV0YWlsID0ge30sIGVsZW0gPSBkb2N1bWVudCkge1xuICAvLyBNYWtlIHN1cmUgdGhlcmUncyBhbiBldmVudCB0eXBlXG4gIGlmICghdHlwZSkgcmV0dXJuO1xuXG4gIC8vIENyZWF0ZSBhIG5ldyBldmVudFxuICBjb25zdCBjdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogZGV0YWlsXG4gIH0pO1xuXG4gIC8vIERpc3BhdGNoIHRoZSBldmVudFxuICByZXR1cm4gZWxlbS5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcbn1cblxubGV0IGdyZWV0aW5ncyA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBzZXR0aW5ncyA9IHtcbiAgICBncmVldGluZzogJ3lvdScsXG4gICAgaGlCZWZvcmU6ICdIZXlvJyxcbiAgICBoaUFmdGVyOiAnJyxcbiAgICBieWVCZWZvcmU6ICdTZWUgeWEgbGF0ZXInLFxuICAgIGJ5ZUFmdGVyOiAnVGFrZSBpdCBlYXN5LicgIFxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3MgKG9wdGlvbnMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBzYXlIaSAobmFtZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3NldHRpbmdzLmhpQmVmb3JlfSAke25hbWUgPyBuYW1lIDogc2V0dGluZ3MuZ3JlZXRpbmd9ICR7c2V0dGluZ3MuaGlBZnRlcn1gXG4gICAgKVxuICAgIHJldHVybiBcbiAgfVxuXG4gIGZ1bmN0aW9uIHNheUJ5ZSAobmFtZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3NldHRpbmdzLmJ5ZUJlZm9yZX0gJHtuYW1lID8gbmFtZSA6IHNldHRpbmdzLmdyZWV0aW5nfSAke3NldHRpbmdzLmJ5ZUFmdGVyfWBcbiAgICApXG5cbiAgICByZXR1cm4gXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZVNldHRpbmdzLFxuICAgIHNheUhpLFxuICAgIHNheUJ5ZSAgICBcbiAgfVxufSkoKVxuXG4vLyBncmVldGluZ3MudXBkYXRlU2V0dGluZ3Moe1xuLy8gICBncmVldGluZ3M6ICd3b3JsZCdcbi8vIH0pXG5cbi8vIGdyZWV0aW5ncy5zYXlIaSgnbWVybGluJyk7XG4vLyBncmVldGluZ3Muc2F5QnllKCdtb3JnYW4nKTtcblxubGV0IEdyZWV0aW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgZ3JlZXRpbmc6ICd5b3UnLFxuICAgIGhpQmVmb3JlOiAnSGV5bycsXG4gICAgaGlBZnRlcjogJycsXG4gICAgYnllQmVmb3JlOiAnU2VlIHlhIGxhdGVyJyxcbiAgICBieWVBZnRlcjogJ1Rha2UgaXQgZWFzeS4nLFxuXG4gICAgLy8gY2FsbGJhY2tzXG4gICAgb25IaTogZnVuY3Rpb24gKCkge30sXG4gICAgb25CeWU6IGZ1bmN0aW9uICgpIHt9XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0RXZlbnQodHlwZSwgZGV0YWlsID0ge30sIGVsZW0gPSBkb2N1bWVudCkge1xuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSdzIGFuIGV2ZW50IHR5cGVcbiAgICBpZiAoIXR5cGUpIHJldHVybjtcbiAgXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGV2ZW50XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwge1xuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBkZXRhaWw6IGRldGFpbFxuICAgIH0pO1xuICBcbiAgICAvLyBEaXNwYXRjaCB0aGUgZXZlbnRcbiAgICByZXR1cm4gZWxlbS5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcbiAgfVxuXG4gIGNvbnN0IENvbnN0cnVjdG9yID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucylcblxuICAgIE9iamVjdC5mcmVlemUoc2V0dGluZ3MpXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfbmFtZTogeyB2YWx1ZTogbmFtZSB9LFxuICAgICAgX3NldHRpbmdzOiB7IHZhbHVlOiBzZXR0aW5ncyB9XG4gICAgfSlcbiAgfSBcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnNheUhpID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIEVtaXQgY3VzdG9tIGV2ZW50XG4gICAgY29uc3QgY2FuY2VsZWQgPSAhZW1pdEV2ZW50KCdncmVldGluZzpiZWZvcmUtaGknLCB7XG4gICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgYmVmb3JlOiB0aGlzLl9zZXR0aW5ncy5oaUJlZm9yZSxcbiAgICAgIGFmdGVyOiB0aGlzLl9zZXR0aW5ncy5oaUFmdGVyXG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGUgZXZlbnQgd2FzIGNhbmNlbGVkLCBlbmRcbiAgICBpZiAoY2FuY2VsZWQpIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3RoaXMuX3NldHRpbmdzLmhpQmVmb3JlfSAke3RoaXMuX25hbWV9ICR7dGhpcy5fc2V0dGluZ3MuaGlBZnRlcn1gXG4gICAgKVxuICAgIFxuICAgIC8vIFJ1biBjYWxsYmFja1xuICAgIHRoaXMuX3NldHRpbmdzLm9uSGkodGhpcy5fbmFtZSwgdGhpcy5fc2V0dGluZ3MuaGlCZWZvcmUsIHRoaXMuX3NldHRpbmdzLmhpQWZ0ZXIpXG5cbiAgICAvLyBFbWl0IGN1c3RvbSBldmVudFxuICAgIGVtaXRFdmVudCgnZ3JlZXRpbmc6aGknLCB7XG4gICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgYmVmb3JlOiB0aGlzLl9zZXR0aW5ncy5oaUJlZm9yZSxcbiAgICAgIGFmdGVyOiB0aGlzLl9zZXR0aW5ncy5oaUFmdGVyXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuc2F5QnllID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIEVtaXQgY3VzdG9tIGV2ZW50XG4gICAgY29uc3QgY2FuY2VsZWQgPSAhZW1pdEV2ZW50KCdncmVldGluZzpiZWZvcmUtYnllJywge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIGJlZm9yZTogdGhpcy5fc2V0dGluZ3MuYnllQmVmb3JlLFxuICAgICAgYWZ0ZXI6IHRoaXMuX3NldHRpbmdzLmJ5ZUFmdGVyXG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGUgZXZlbnQgd2FzIGNhbmNlbGVkLCBlbmRcbiAgICBpZiAoY2FuY2VsZWQpIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3RoaXMuX3NldHRpbmdzLmJ5ZUJlZm9yZX0gJHt0aGlzLl9uYW1lfSAke3RoaXMuX3NldHRpbmdzLmJ5ZUFmdGVyfWBcbiAgICApXG4gICAgXG4gICAgdGhpcy5fc2V0dGluZ3Mub25CeWUodGhpcy5fbmFtZSwgdGhpcy5fc2V0dGluZ3MuYnllQmVmb3JlLCB0aGlzLl9zZXR0aW5ncy5ieWVBZnRlcik7XG4gICAgXG4gICAgLy8gRW1pdCBjdXN0b20gZXZlbnRcbiAgICBlbWl0RXZlbnQoJ2dyZWV0aW5nOmJ5ZScsIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICBiZWZvcmU6IHRoaXMuX3NldHRpbmdzLmJ5ZUJlZm9yZSxcbiAgICAgIGFmdGVyOiB0aGlzLl9zZXR0aW5ncy5ieWVBZnRlclxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZXR1cm4gQ29uc3RydWN0b3Jcbn0pKClcblxuY29uc3QgbWVybGluID0gbmV3IEdyZWV0aW5nKCdNZXJsaW4nLCB7XG4gIGhpQWZ0ZXI6ICcuJyxcbiAgLy8gb25CeWU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgLy8gICBjb25zdCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnllLXRleHQnKVxuICAvLyAgIGFwcC50ZXh0Q29udGVudCA9IGDwn5GLICR7bmFtZX1gO1xuICAvLyB9XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ3JlZXRpbmc6YnllJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGNvbnN0IGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ieWUtdGV4dCcpO1xuICBhcHAudGV4dENvbnRlbnQgPSBg8J+RiyAke2V2ZW50LmRldGFpbC5uYW1lfWBcbn0pO1xuXG5sZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgbWVybGluLnNheUJ5ZSgpO1xufSk7XG5cblxuLyoqXG4gKiBFbWl0IGEgY3VzdG9tIGV2ZW50XG4gKi9cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ215LWN1c3RvbS1ldmVudCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4vLyAgIGNvbnNvbGUubG9nKDEyMylcbi8vICAgY29uc29sZS5sb2coZXZlbnQudHlwZSlcbi8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuLy8gfSlcblxuLy8gbGV0IG15RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ215LWN1c3RvbS1ldmVudCcsIHtcbi8vICAgYnViYmxlczogdHJ1ZSxcbi8vICAgY2FuY2VsYWJsZTogdHJ1ZVxuLy8gfSlcblxuLy8gLy8gRW1pdCB0aGUgZXZlbnRcbi8vIGNvbnN0IGNhbmNlbGVkID0gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChteUV2ZW50KTtcbi8vIGNvbnNvbGUubG9nKG15RXZlbnQpXG4vLyBjb25zb2xlLmxvZyhjYW5jZWxlZClcblxuIiwiLyoqXG4qICogRE9NIE1hbmlwdWxhdGlvbiBMSWJyYXJpZXNcbiogMS4gaHR0cHM6Ly9zY3JvbGxyZXZlYWxqcy5vcmcvXG4qIDIuIGh0dHBzOi8vcGhvdG9zd2lwZS5jb20vXG4qICogRE9NIG1hbmlwdWxhdGlvbiBsaWJyYXJpZXMgaGF2ZSBzb21lIHVuaXF1ZSBjb25zaWRlcmF0aW9ucyBjb21wYXJlZCB0byB1dGlsaXR5IGxpYnJhcmllcy5cbiogKiBIb3cgY2FuIHdlIGNvbnZlcnQgdGhpcyBpbnRvIGEgbGlicmFyeVxuKiAxLiBJbmplY3RpbmcgY29udGVudCBpbnRvIHRoZSBET01cbiogMi4gTGlzdGVuaW5nIGZvciBldmVudHNcbiogMy4gQWRkaW5nIG9wdGlvbnMgYW5kIHNldHRpbmdzXG4qIDQuIEV4cG9zaW5nIHB1YmxpYyBtZXRob2RzXG4qIDUuIERlc3Ryb3lpbmcgdGhlIGluc3RhbnRpYXRpb25cbiAqL1xuXG5jb25zdCBlZ2cgPSAoZnVuY3Rpb24oKSB7XG4gIC8vIEdldCB0aGUgZWxlbWVudFxuICBjb25zdCBpbml0ID0gIGZ1bmN0aW9uKCkge1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VnZycpO1xuICAgIGxldCBzY2FsZWQgPSBmYWxzZTtcbiAgXG4gICAgLy8gQ3JlYXRlIGJ1dHRvblxuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidG4uaW5uZXJIVE1MID0gJ/CfpZonO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgY2xpY2sgbWVgKTtcbiAgICBidG4uc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbic7XG4gIFxuICAgIC8vIEluamVjdCBpbnRvIHRoZSBET01cbiAgICBlbGVtLmFwcGVuZChidG4pO1xuICBcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9nZ2xlICgpIHtcbiAgICAgIC8vIElmIHRoZSBidXR0b24gaXMgc2NhbGVkLCBzaHJpbmsgaXRcbiAgICAgIC8vIE90aGVyd2lzZSwgZ3JvdyBpdFxuICAgICAgYnRuLnN0eWxlLnRyYW5zZm9ybSA9IHNjYWxlZCA/ICcnIDogJ3NjYWxlKDIpJztcbiAgXG4gICAgICAvLyBGbGlwIHRoZSBzY2FsZWQgc3RhdGVcbiAgICAgIHNjYWxlZCA9ICFzY2FsZWQ7XG4gICAgfVxuICBcbiAgICAvLyBMaXN0ZW4gZm9yIGNsaWNrcyBvbiB0aGUgYnV0dG9uXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlKTtcbiAgfVxuICBcbiAgcmV0dXJuIHsgaW5pdCB9XG59KSgpXG5cbi8vIGVnZy5pbml0KClcblxuLy8gKiBET00gbWFuaXB1bGF0aW9uIGxpYnJhcmllcyB0aGF0IGFkZCBjb250ZW50IHRvIHRoZSBVSVxuLy8gdXN1YWxseSB0YWtlIG9uZSBvZiB0d28gYXBwcm9hY2hlczpcbi8vIDEuIEluamVjdCBpdCBvbiBpbnN0YW50aWF0aW9uXG4vLyAyLiBIYXZlIGFuIGV4cGxpY2l0IGluaXQoKSBtZXRob2RcblxuLy8gKiBPbmUgb2YgdGhlIHVuaXF1ZSBjaGFsbGVuZ2VzIHdpdGggdGhlIGNvbnN0cnVjdG9yIHBhdHRlcm4gYW5kIERPTVxuLy8gKiBtYW5pcHVsYXRpb24gbGlicmFyaWVzIGlzIHRoYXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGluIHRoZSBcbi8vICogZXZlbnQgbGlzdGVuZXIgbmVlZHMgdG8ga25vdyBzb21lIHVuaXF1ZSBwcm9wZXJ0aWVzIGZyb20gZWFjaCBcbi8vICogc3BlY2lmaWMgaW5zdGFuY2VcblxuLy8gKiBBZGQgYSBwdWJsaWMgdG9nZ2xlKCkgbWV0aG9kXG5cbi8vICogRGVzdHJveWluZyBhbiBpbnN0YW50aWF0aW9uXG4vLyAxLiBUaGlzIHR5cGljYWxseSBpbnZvbHZlcyByZW1vdmluZyBhbnkgYWRkZWQgRE9NXG4vLyAgICBlbGVtZW50cyBhbmQgc3RvcHBpbmcgYW55IGV2ZW50IGxpc3RlbmVycy4gXG4vLyAyLiBBIGNvbW1vbiBjb252ZW50aW9uIGlzIHRvIGV4cG9zZSBhIGRlc3Ryb3koKSBtZXRob2QgdG8gZG8gdGhhdC5cbi8vIDMuIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciBjYWxsYmFjayBpbW1lZGlhdGVseVxuXG5sZXQgRWdnID0gKGZ1bmN0aW9uICgpIHtcblxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBsYWJlbDogJ2NsaWNrIG1lJyxcbiAgICBidG5UZXh0OiAn8J+lmicsXG4gICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAzMDBtcyBlYXNlLWluJyxcbiAgICBzY2FsZTogJzInXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVCdG4gKGVsZW0sIHNldHRpbmdzKSB7XG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBzZXR0aW5ncy5idG5UZXh0O1xuXG4gICAgaWYgKHNldHRpbmdzLmxhYmVsKSB7XG4gICAgICBidG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgc2V0dGluZ3MubGFiZWwpO1xuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MudHJhbnNpdGlvbikge1xuICAgICAgYnRuLnN0eWxlLnRyYW5zaXRpb24gPSBzZXR0aW5ncy50cmFuc2l0aW9uO1xuICAgIH1cblxuICAgIGVsZW0uYXBwZW5kKGJ0bik7XG5cbiAgICByZXR1cm4gYnRuXG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVCdG4gKGluc3RhbmNlKSB7XG4gICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBzY2FsZWQsIHNocmluayBpdFxuICAgIC8vIE90aGVyd2lzZSwgZ3JvdyBpdFxuICAgIGluc3RhbmNlLl9idG4uc3R5bGUudHJhbnNmb3JtID0gaW5zdGFuY2UuX3NjYWxlZCA/ICcnIDogYHNjYWxlKCR7aW5zdGFuY2UuX3NldHRpbmdzLnNjYWxlfSlgO1xuXG4gICAgLy8gRmxpcCB0aGUgc2NhbGVkIHN0YXRlXG4gICAgaW5zdGFuY2UuX3NjYWxlZCA9ICFpbnN0YW5jZS5fc2NhbGVkO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRXZlbnRMaXN0ZW5lcihidG4sIGluc3RhbmNlKSB7XG4gICAgZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgdG9nZ2xlQnRuKGluc3RhbmNlKVxuICAgIH1cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGUpXG5cbiAgICByZXR1cm4gdG9nZ2xlXG4gIH1cblxuICBmdW5jdGlvbiBDb25zdHJ1Y3RvciAoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIE9iamVjdC5mcmVlemUoc2V0dGluZ3MpO1xuXG4gICAgY29uc3QgYnRuID0gY3JlYXRlQnRuKGVsZW0sIHNldHRpbmdzKTtcbiAgICBcbiAgICAvLyBDcmVhdGUgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBjcmVhdGVFdmVudExpc3RlbmVyKGJ0biwgdGhpcylcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIF9lbGVtOiB7IHZhbHVlOiBlbGVtIH0sXG4gICAgICBfc2V0dGluZ3M6IHt2YWx1ZTogc2V0dGluZ3N9LFxuICAgICAgX2J0bjogeyB2YWx1ZTogYnRufSxcbiAgICAgIF9saXN0ZW5lcjogeyB2YWx1ZTogbGlzdGVuZXIgfSxcbiAgICAgIF9zY2FsZWQ6IHsgdmFsdWU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSB9XG4gICAgfSlcbiAgfVxuXG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7ICBcbiAgICB0b2dnbGVCdG4odGhpcylcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoaXMgaW5zdGFuY2VcbiAgICovXG5cbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciBpbW1lZGlhdGVseVxuICAgIHRoaXMuX2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2xpc3RlbmVyKTtcblxuICAgIC8vIFJlbW92ZSB0aGUgYnV0dG9uXG4gICAgdGhpcy5fYnRuLnJlbW92ZSgpO1xuICB9O1xuXG4gIHJldHVybiBDb25zdHJ1Y3RvclxufSkoKVxuXG5jb25zdCBlZ2cxID0gbmV3IEVnZygnI2VnZycpXG5lZ2cxLnRvZ2dsZSgpXG5jb25zdCBwYXJ0eSA9IG5ldyBFZ2coJyNwYXJ0eScsIHtcbiAgYnRuVGV4dDogJ/CfjoknLFxuICBsYWJlbDogYEl0J3MgcGFydHkgdGltZWAsXG4gIHNjYWxlOiAnMydcbn0pXG5cbnBhcnR5LmRlc3Ryb3koKSIsIi8vIEhvb2tzIC0gaW4gdGhlIGZvcm0gb2YgY2FsbGJhY2tzIGFuZCBjdXN0b20gZXZlbnRzXG4vLyBEZXZlbG9wZXJzIGNhbiB1c2UgdG8gcnVuIGNvZGUgd2hlbiBzcGVjaWZpYyB0aGluZ3Ncbi8vIGhhcHBlbiBpbiB5b3VyIGxpYnJhcnlcblxuLy8gKiBDYWxsYmFja3Ncbi8vIDEuIEEgY2FsbGJhY2sgaXMgYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYXQgYSBzcGVjaWZpYyB0aW1lLlxuLy8gMi4gSW4geW91ciBsaWJyYXJ5LCB5b3UgY2FuIGxldCB1c2VycyBwYXNzIGNhbGxiYWNrXG4vLyAgICBmdW5jdGlvbiBpbiBhcyBvcHRpb25zLlxuLy8gMy4gV2hlbiBhIHBhcnRpY3VsYXIgYWN0aW9uIGhhcHBlbnMgaW4geW91ciBsaWJyYXJ5LFxuLy8gICAgeW91IGNhbiBydW4gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuLy8gNC4gWW91IGNhbiBldmVuIHBhc3MgaW4gYXJndW1lbnRzIHRoYXQgZGV2ZWxvcGVycyBjYW5cbi8vIC4gIHVzZSB0byBhY2Nlc3MgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnRcbi8vIC4gIGluc3RhbnRpYXRpb24gaW4gdGhlaXIgY2FsbGJhY2suIFxuXG5cbi8vICogQ3VzdG9tIEV2ZW50c1xuLy8gSW5zdGVhZCBvZiBwYWRkaW5nIGluIGEgY2FsbGJhY2sgZnVuY3Rpb24sIHlvdSBjYW5cbi8vIGFsdGVybmF0aXZlbHkgZW1pdCBhIGN1c3RvbSBldmVudCB0aGF0IGRldmVsb3BlcnMgXG4vLyBjYW4gbGlzdGVuIGZvciB3aXRoIHRoZSBgRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKClgIG1ldGhvZC5cblxuLy8gVGhlIGBDdXN0b21FdmVudCgpYCBvYmplY3QgcHJvdmlkZXMgYSB3YXkgdG8gY3JlYXRlIGFuZCBlbWl0XG4vLyBjdXN0b20gZXZlbnRzLCBhcyB3ZWxsIGFzIHBhc3MgaW4gY3VzdG9tIGV2ZW50IGRldGFpbHMuXG5cbiIsImltcG9ydCBIZWFkcm9vbSBmcm9tICdoZWFkcm9vbS5qcyc7XG5cbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuY29uc3QgaGVhZHJvb20gPSBuZXcgSGVhZHJvb20oaGVhZGVyKTtcbmhlYWRyb29tLmluaXQoKTtcbmhlYWRyb29tLnRvcCgpOyJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJobFlXUnliMjl0TG1wekwyUnBjM1F2YUdWaFpISnZiMjB1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMk52Ym5OMGNuVmpkRzl5TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDNOeVl5OXFjeTlrYjIwdGJXRnVhWEIxYkdGMGFXOXVMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OW9iMjlyY3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12YVc1a1pYZ3Vhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRSUVVGQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHM3VVVGRlFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CT3pzN1VVRkhRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk8xRkJRMEVzTUVOQlFUQkRMR2REUVVGblF6dFJRVU14UlR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTEhkRVFVRjNSQ3hyUWtGQmEwSTdVVUZETVVVN1VVRkRRU3hwUkVGQmFVUXNZMEZCWXp0UlFVTXZSRHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRXNlVU5CUVhsRExHbERRVUZwUXp0UlFVTXhSU3huU0VGQlowZ3NiVUpCUVcxQ0xFVkJRVVU3VVVGRGNrazdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTd3lRa0ZCTWtJc01FSkJRVEJDTEVWQlFVVTdVVUZEZGtRc2FVTkJRV2xETEdWQlFXVTdVVUZEYUVRN1VVRkRRVHRSUVVOQk96dFJRVVZCTzFGQlEwRXNjMFJCUVhORUxDdEVRVUVyUkRzN1VVRkZja2c3VVVGRFFUczdPMUZCUjBFN1VVRkRRVHM3T3pzN096czdPenM3TzBGRGJFWkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RlFVRkZMRXRCUVRSRU8wRkJRemxFTEVWQlFVVXNVMEZEYzBRN1FVRkRlRVFzUTBGQlF5eHZRa0ZCYjBJN08wRkJSWEpDTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHRRa0ZCYlVJN1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzT0VKQlFUaENPMEZCUXpsQ096dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYTBKQlFXdENMRTlCUVU4N1FVRkRla0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQT3p0QlFVVlFPMEZCUTBFN1FVRkRRU3hyUWtGQmEwSXNUMEZCVHp0QlFVTjZRanRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQT3p0QlFVVlFPMEZCUTBFN1FVRkRRU3hyUWtGQmEwSXNUMEZCVHp0QlFVTjZRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMR3RDUVVGclFpeFBRVUZQTzBGQlEzcENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVRHRCUVVOQkxHdENRVUZyUWl4UFFVRlBPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdPMEZCUlZBN1FVRkRRVHRCUVVOQkxHdENRVUZyUWl4UFFVRlBPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2EwTkJRV3RETzBGQlEyeERPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4aFFVRmhMRmRCUVZjN1FVRkRlRUlzWVVGQllTeFBRVUZQTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYlVOQlFXMURPenRCUVVWdVF6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzWlVGQlpTeHBSRUZCYVVRN1FVRkRhRVU3UVVGRFFUdEJRVU5CTEZkQlFWYzdRVUZEV0R0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMT3p0QlFVVk1PMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHM3UVVGRlFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHM3UVVGRlFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeFpRVUZaTzBGQlExbzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUczdRVUZGUVN4RFFVRkRPenM3T3pzN096czdPenM3UVVOd1lrUXNiME5CUVc5RE8wRkJRM0JETzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRXNkVU5CUVhWRE8wRkJRM1pETzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYlVKQlFXMUNPMEZCUTI1Q0xGTkJRVk1zYTBKQlFXdENMRWRCUVVjc1owTkJRV2RETEVkQlFVY3NhVUpCUVdsQ08wRkJRMnhHTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHRRa0ZCYlVJN1FVRkRia0lzVTBGQlV5eHRRa0ZCYlVJc1IwRkJSeXhuUTBGQlowTXNSMEZCUnl4clFrRkJhMEk3UVVGRGNFWTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1EwRkJRenM3UVVGRlJEdEJRVU5CTzBGQlEwRXNTVUZCU1RzN1FVRkZTanRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNkMEpCUVhkQ08wRkJRM2hDTzBGQlEwRTdPMEZCUlVFc2MwTkJRWE5ETzBGQlEzUkRPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CT3p0QlFVVkJMR2xFUVVGcFJEdEJRVU5xUkN4eFEwRkJjVU03TzBGQlJYSkRPenRCUVVWQk8wRkJRMEVzWTBGQll5eGpRVUZqTzBGQlF6VkNMR3RDUVVGclFqdEJRVU5zUWl4TFFVRkxPMEZCUTB3c1J6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzYlVKQlFXMUNPMEZCUTI1Q0xGTkJRVk1zZDBKQlFYZENMRWRCUVVjc1YwRkJWeXhIUVVGSExIVkNRVUYxUWp0QlFVTjZSVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMT3p0QlFVVk1PMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3h0UWtGQmJVSTdRVUZEYmtJc1UwRkJVeXg1UWtGQmVVSXNSMEZCUnl4WFFVRlhMRWRCUVVjc2QwSkJRWGRDTzBGQlF6TkZPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hEUVVGRE96dEJRVVZFTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc0swSkJRU3RDTEV0QlFVczdRVUZEY0VNN1FVRkRRU3hEUVVGRE96dEJRVVZFTzBGQlEwRTdRVUZEUVN3d1FrRkJNRUlzYTBKQlFXdENPMEZCUXpWRExFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03T3p0QlFVZEVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCU1RzN1FVRkZTanRCUVVOQk8wRkJRMEU3UVVGRFFTeEpRVUZKT3p0QlFVVktPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEZGsxQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMRlZCUVZVN1FVRkRWaXhEUVVGRE96dEJRVVZFT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h4UlVGQmNVVXNlVUpCUVhsQ096dEJRVVU1Ump0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTERoRFFVRTRRenRCUVVNNVF6czdRVUZGUVN4eFEwRkJjVU03UVVGRGNrTTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJMR05CUVdNc1kwRkJZenRCUVVNMVFpeHJRa0ZCYTBJc1owSkJRV2RDTzBGQlEyeERMR0ZCUVdFc1dVRkJXVHRCUVVONlFpeHJRa0ZCYTBJc2EwSkJRV3RDTzBGQlEzQkRMR2RDUVVGblFqdEJRVU5vUWl4TFFVRkxPMEZCUTB3N08wRkJSVUVzT0VNN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzUTBGQlF6czdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeERRVUZET3p0QlFVVkVMR1U3T3pzN096czdPenM3TzBGRE4wcEJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPenM3T3pzN096czdPenM3TzBGRGNrSkJPMEZCUVVFN1FVRkJRVHRCUVVGdFF6czdRVUZGYmtNN1FVRkRRU3h4UWtGQmNVSXNhMFJCUVZFN1FVRkROMEk3UVVGRFFTeGxJaXdpWm1sc1pTSTZJalUxTWpoa1l6VXlORGswTW1ReVpXSmhaV1l3TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBkbUZ5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE1nUFNCN2ZUdGNibHh1SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmx4dUlGeDBYSFF2THlCRGFHVmpheUJwWmlCdGIyUjFiR1VnYVhNZ2FXNGdZMkZqYUdWY2JpQmNkRngwYVdZb2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwcElIdGNiaUJjZEZ4MFhIUnlaWFIxY200Z2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVpYaHdiM0owY3p0Y2JpQmNkRngwZlZ4dUlGeDBYSFF2THlCRGNtVmhkR1VnWVNCdVpYY2diVzlrZFd4bElDaGhibVFnY0hWMElHbDBJR2x1ZEc4Z2RHaGxJR05oWTJobEtWeHVJRngwWEhSMllYSWdiVzlrZFd4bElEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMGdQU0I3WEc0Z1hIUmNkRngwYVRvZ2JXOWtkV3hsU1dRc1hHNGdYSFJjZEZ4MGJEb2dabUZzYzJVc1hHNGdYSFJjZEZ4MFpYaHdiM0owY3pvZ2UzMWNiaUJjZEZ4MGZUdGNibHh1SUZ4MFhIUXZMeUJGZUdWamRYUmxJSFJvWlNCdGIyUjFiR1VnWm5WdVkzUnBiMjVjYmlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JpQmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUlGeDBYSFJ0YjJSMWJHVXViQ0E5SUhSeWRXVTdYRzVjYmlCY2RGeDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNiaUJjZEZ4MGNtVjBkWEp1SUcxdlpIVnNaUzVsZUhCdmNuUnpPMXh1SUZ4MGZWeHVYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxjeUJ2WW1wbFkzUWdLRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMThwWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTBnUFNCdGIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWpJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjenRjYmx4dUlGeDBMeThnWkdWbWFXNWxJR2RsZEhSbGNpQm1kVzVqZEdsdmJpQm1iM0lnYUdGeWJXOXVlU0JsZUhCdmNuUnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpMQ0J1WVcxbExDQm5aWFIwWlhJcElIdGNiaUJjZEZ4MGFXWW9JVjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlobGVIQnZjblJ6TENCdVlXMWxLU2tnZTF4dUlGeDBYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQnVZVzFsTENCN0lHVnVkVzFsY21GaWJHVTZJSFJ5ZFdVc0lHZGxkRG9nWjJWMGRHVnlJSDBwTzF4dUlGeDBYSFI5WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJrWldacGJtVWdYMTlsYzAxdlpIVnNaU0J2YmlCbGVIQnZjblJ6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbklnUFNCbWRXNWpkR2x2YmlobGVIQnZjblJ6S1NCN1hHNGdYSFJjZEdsbUtIUjVjR1Z2WmlCVGVXMWliMndnSVQwOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUZONWJXSnZiQzUwYjFOMGNtbHVaMVJoWnlrZ2UxeHVJRngwWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JUZVcxaWIyd3VkRzlUZEhKcGJtZFVZV2NzSUhzZ2RtRnNkV1U2SUNkTmIyUjFiR1VuSUgwcE8xeHVJRngwWEhSOVhHNGdYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQW5YMTlsYzAxdlpIVnNaU2NzSUhzZ2RtRnNkV1U2SUhSeWRXVWdmU2s3WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJqY21WaGRHVWdZU0JtWVd0bElHNWhiV1Z6Y0dGalpTQnZZbXBsWTNSY2JpQmNkQzh2SUcxdlpHVWdKaUF4T2lCMllXeDFaU0JwY3lCaElHMXZaSFZzWlNCcFpDd2djbVZ4ZFdseVpTQnBkRnh1SUZ4MEx5OGdiVzlrWlNBbUlESTZJRzFsY21kbElHRnNiQ0J3Y205d1pYSjBhV1Z6SUc5bUlIWmhiSFZsSUdsdWRHOGdkR2hsSUc1elhHNGdYSFF2THlCdGIyUmxJQ1lnTkRvZ2NtVjBkWEp1SUhaaGJIVmxJSGRvWlc0Z1lXeHlaV0ZrZVNCdWN5QnZZbXBsWTNSY2JpQmNkQzh2SUcxdlpHVWdKaUE0ZkRFNklHSmxhR0YyWlNCc2FXdGxJSEpsY1hWcGNtVmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWRDQTlJR1oxYm1OMGFXOXVLSFpoYkhWbExDQnRiMlJsS1NCN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBeEtTQjJZV3gxWlNBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9kbUZzZFdVcE8xeHVJRngwWEhScFppaHRiMlJsSUNZZ09Da2djbVYwZFhKdUlIWmhiSFZsTzF4dUlGeDBYSFJwWmlnb2JXOWtaU0FtSURRcElDWW1JSFI1Y0dWdlppQjJZV3gxWlNBOVBUMGdKMjlpYW1WamRDY2dKaVlnZG1Gc2RXVWdKaVlnZG1Gc2RXVXVYMTlsYzAxdlpIVnNaU2tnY21WMGRYSnVJSFpoYkhWbE8xeHVJRngwWEhSMllYSWdibk1nUFNCUFltcGxZM1F1WTNKbFlYUmxLRzUxYkd3cE8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuSW9ibk1wTzF4dUlGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2JuTXNJQ2RrWldaaGRXeDBKeXdnZXlCbGJuVnRaWEpoWW14bE9pQjBjblZsTENCMllXeDFaVG9nZG1Gc2RXVWdmU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUF5SUNZbUlIUjVjR1Z2WmlCMllXeDFaU0FoUFNBbmMzUnlhVzVuSnlrZ1ptOXlLSFpoY2lCclpYa2dhVzRnZG1Gc2RXVXBJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNodWN5d2dhMlY1TENCbWRXNWpkR2x2YmloclpYa3BJSHNnY21WMGRYSnVJSFpoYkhWbFcydGxlVjA3SUgwdVltbHVaQ2h1ZFd4c0xDQnJaWGtwS1R0Y2JpQmNkRngwY21WMGRYSnVJRzV6TzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWjJWMFJHVm1ZWFZzZEVWNGNHOXlkQ0JtZFc1amRHbHZiaUJtYjNJZ1kyOXRjR0YwYVdKcGJHbDBlU0IzYVhSb0lHNXZiaTFvWVhKdGIyNTVJRzF2WkhWc1pYTmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJpQTlJR1oxYm1OMGFXOXVLRzF2WkhWc1pTa2dlMXh1SUZ4MFhIUjJZWElnWjJWMGRHVnlJRDBnYlc5a2RXeGxJQ1ltSUcxdlpIVnNaUzVmWDJWelRXOWtkV3hsSUQ5Y2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUkVaV1poZFd4MEtDa2dleUJ5WlhSMWNtNGdiVzlrZFd4bFd5ZGtaV1poZFd4MEoxMDdJSDBnT2x4dUlGeDBYSFJjZEdaMWJtTjBhVzl1SUdkbGRFMXZaSFZzWlVWNGNHOXlkSE1vS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1U3SUgwN1hHNGdYSFJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDaG5aWFIwWlhJc0lDZGhKeXdnWjJWMGRHVnlLVHRjYmlCY2RGeDBjbVYwZFhKdUlHZGxkSFJsY2p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2SUQwZ1puVnVZM1JwYjI0b2IySnFaV04wTENCd2NtOXdaWEowZVNrZ2V5QnlaWFIxY200Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcE95QjlPMXh1WEc0Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pjSWp0Y2JseHVYRzRnWEhRdkx5Qk1iMkZrSUdWdWRISjVJRzF2WkhWc1pTQmhibVFnY21WMGRYSnVJR1Y0Y0c5eWRITmNiaUJjZEhKbGRIVnliaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0Y5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWN5QTlJREFwTzF4dUlpd2lMeW9oWEc0Z0tpQm9aV0ZrY205dmJTNXFjeUIyTUM0eE1pNHdJQzBnUjJsMlpTQjViM1Z5SUhCaFoyVWdjMjl0WlNCb1pXRmtjbTl2YlM0Z1NHbGtaU0I1YjNWeUlHaGxZV1JsY2lCMWJuUnBiQ0I1YjNVZ2JtVmxaQ0JwZEZ4dUlDb2dRMjl3ZVhKcFoyaDBJQ2hqS1NBeU1ESXdJRTVwWTJzZ1YybHNiR2xoYlhNZ0xTQm9kSFJ3T2k4dmQybGphM2t1Ym1sc2JHbGhMbTF6TDJobFlXUnliMjl0TG1welhHNGdLaUJNYVdObGJuTmxPaUJOU1ZSY2JpQXFMMXh1WEc0b1puVnVZM1JwYjI0Z0tHZHNiMkpoYkN3Z1ptRmpkRzl5ZVNrZ2UxeHVJQ0IwZVhCbGIyWWdaWGh3YjNKMGN5QTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ2RIbHdaVzltSUcxdlpIVnNaU0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dQeUJ0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1poWTNSdmNua29LU0E2WEc0Z0lIUjVjR1Z2WmlCa1pXWnBibVVnUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnWkdWbWFXNWxMbUZ0WkNBL0lHUmxabWx1WlNobVlXTjBiM0o1S1NBNlhHNGdJQ2huYkc5aVlXd2dQU0JuYkc5aVlXd2dmSHdnYzJWc1ppd2daMnh2WW1Gc0xraGxZV1J5YjI5dElEMGdabUZqZEc5eWVTZ3BLVHRjYm4wb2RHaHBjeXdnWm5WdVkzUnBiMjRnS0NrZ2V5QW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpQWdablZ1WTNScGIyNGdhWE5DY205M2MyVnlLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjBlWEJsYjJZZ2QybHVaRzkzSUNFOVBTQmNJblZ1WkdWbWFXNWxaRndpTzF4dUlDQjlYRzVjYmlBZ0x5b3FYRzRnSUNBcUlGVnpaV1FnZEc4Z1pHVjBaV04wSUdKeWIzZHpaWElnYzNWd2NHOXlkQ0JtYjNJZ1lXUmthVzVuSUdGdUlHVjJaVzUwSUd4cGMzUmxibVZ5SUhkcGRHZ2diM0IwYVc5dWMxeHVJQ0FnS2lCRGNtVmthWFE2SUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBGUVNTOUZkbVZ1ZEZSaGNtZGxkQzloWkdSRmRtVnVkRXhwYzNSbGJtVnlYRzRnSUNBcUwxeHVJQ0JtZFc1amRHbHZiaUJ3WVhOemFYWmxSWFpsYm5SelUzVndjRzl5ZEdWa0tDa2dlMXh1SUNBZ0lIWmhjaUJ6ZFhCd2IzSjBaV1FnUFNCbVlXeHpaVHRjYmx4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNCMllYSWdiM0IwYVc5dWN5QTlJSHRjYmlBZ0lDQWdJQ0FnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUdkbGRIUmxjaTF5WlhSMWNtNWNiaUFnSUNBZ0lDQWdaMlYwSUhCaGMzTnBkbVVvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdjM1Z3Y0c5eWRHVmtJRDBnZEhKMVpUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVHRjYmlBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lkR1Z6ZEZ3aUxDQnZjSFJwYjI1ekxDQnZjSFJwYjI1ektUdGNiaUFnSUNBZ0lIZHBibVJ2ZHk1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtGd2lkR1Z6ZEZ3aUxDQnZjSFJwYjI1ekxDQnZjSFJwYjI1ektUdGNiaUFnSUNCOUlHTmhkR05vSUNobGNuSXBJSHRjYmlBZ0lDQWdJSE4xY0hCdmNuUmxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCemRYQndiM0owWldRN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnBjMU4xY0hCdmNuUmxaQ2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdJU0VvWEc0Z0lDQWdJQ0JwYzBKeWIzZHpaWElvS1NBbUpseHVJQ0FnSUNBZ1puVnVZM1JwYjI0b0tTQjdmUzVpYVc1a0lDWW1YRzRnSUNBZ0lDQmNJbU5zWVhOelRHbHpkRndpSUdsdUlHUnZZM1Z0Wlc1MExtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZENBbUpseHVJQ0FnSUNBZ1QySnFaV04wTG1GemMybG5iaUFtSmx4dUlDQWdJQ0FnVDJKcVpXTjBMbXRsZVhNZ0ppWmNiaUFnSUNBZ0lISmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaVnh1SUNBZ0lDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJwYzBSdlkzVnRaVzUwS0c5aWFpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdlltb3VibTlrWlZSNWNHVWdQVDA5SURrN0lDOHZJRTV2WkdVdVJFOURWVTFGVGxSZlRrOUVSU0E5UFQwZ09WeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdhWE5YYVc1a2IzY29iMkpxS1NCN1hHNGdJQ0FnTHk4Z1lHOWlhaUE5UFQwZ2QybHVaRzkzWUNCdmNpQmdiMkpxSUdsdWMzUmhibU5sYjJZZ1YybHVaRzkzWUNCcGN5QnViM1FnYzNWbVptbGphV1Z1ZEN4Y2JpQWdJQ0F2THlCaGN5QjBhR1VnYjJKcUlHMWhlU0JpWlNCMGFHVWdkMmx1Wkc5M0lHOW1JR0Z1SUdsbWNtRnRaUzVjYmlBZ0lDQnlaWFIxY200Z2IySnFJQ1ltSUc5aWFpNWtiMk4xYldWdWRDQW1KaUJwYzBSdlkzVnRaVzUwS0c5aWFpNWtiMk4xYldWdWRDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUIzYVc1a2IzZFRZM0p2Ykd4bGNpaDNhVzRwSUh0Y2JpQWdJQ0IyWVhJZ1pHOWpJRDBnZDJsdUxtUnZZM1Z0Wlc1ME8xeHVJQ0FnSUhaaGNpQmliMlI1SUQwZ1pHOWpMbUp2WkhrN1hHNGdJQ0FnZG1GeUlHaDBiV3dnUFNCa2IyTXVaRzlqZFcxbGJuUkZiR1Z0Wlc1ME8xeHVYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dRSE5sWlNCb2RIUndPaTh2YW1GdFpYTXVjR0ZrYjJ4elpYa3VZMjl0TDJwaGRtRnpZM0pwY0hRdloyVjBMV1J2WTNWdFpXNTBMV2hsYVdkb2RDMWpjbTl6Y3kxaWNtOTNjMlZ5TDF4dUlDQWdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlNCMGFHVWdjMk55YjJ4c0lHaGxhV2RvZENCdlppQjBhR1VnWkc5amRXMWxiblFnYVc0Z2NHbDRaV3h6WEc0Z0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUhOamNtOXNiRWhsYVdkb2REb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJOWVhSb0xtMWhlQ2hjYmlBZ0lDQWdJQ0FnSUNCaWIyUjVMbk5qY205c2JFaGxhV2RvZEN4Y2JpQWdJQ0FnSUNBZ0lDQm9kRzFzTG5OamNtOXNiRWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdJQ0JpYjJSNUxtOW1abk5sZEVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnSUNCb2RHMXNMbTltWm5ObGRFaGxhV2RvZEN4Y2JpQWdJQ0FnSUNBZ0lDQmliMlI1TG1Oc2FXVnVkRWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdJQ0JvZEcxc0xtTnNhV1Z1ZEVobGFXZG9kRnh1SUNBZ0lDQWdJQ0FwTzF4dUlDQWdJQ0FnZlN4Y2JseHVJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdLaUJBYzJWbElHaDBkSEE2THk5aGJtUjViR0Z1WjNSdmJpNWpieTUxYXk5aWJHOW5MMlJsZG1Wc2IzQnRaVzUwTDJkbGRDMTJhV1YzY0c5eWRDMXphWHBsTFhkcFpIUm9MV0Z1WkMxb1pXbG5hSFF0YW1GMllYTmpjbWx3ZEZ4dUlDQWdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlNCMGFHVWdhR1ZwWjJoMElHOW1JSFJvWlNCMmFXVjNjRzl5ZENCcGJpQndhWGhsYkhOY2JpQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ2FHVnBaMmgwT2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIZHBiaTVwYm01bGNraGxhV2RvZENCOGZDQm9kRzFzTG1Oc2FXVnVkRWhsYVdkb2RDQjhmQ0JpYjJSNUxtTnNhV1Z1ZEVobGFXZG9kRHRjYmlBZ0lDQWdJSDBzWEc1Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dSMlYwY3lCMGFHVWdXU0J6WTNKdmJHd2djRzl6YVhScGIyNWNiaUFnSUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMDUxYldKbGNuMGdjR2w0Wld4eklIUm9aU0J3WVdkbElHaGhjeUJ6WTNKdmJHeGxaQ0JoYkc5dVp5QjBhR1VnV1MxaGVHbHpYRzRnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJSE5qY205c2JGazZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9kMmx1TG5CaFoyVlpUMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2QybHVMbkJoWjJWWlQyWm1jMlYwTzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlDaG9kRzFzSUh4OElHSnZaSGt1Y0dGeVpXNTBUbTlrWlNCOGZDQmliMlI1S1M1elkzSnZiR3hVYjNBN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHVnNaVzFsYm5SVFkzSnZiR3hsY2lobGJHVnRaVzUwS1NCN1hHNGdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlNCMGFHVWdjMk55YjJ4c0lHaGxhV2RvZENCdlppQjBhR1VnWld4bGJXVnVkQ0JwYmlCd2FYaGxiSE5jYmlBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnYzJOeWIyeHNTR1ZwWjJoME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRTFoZEdndWJXRjRLRnh1SUNBZ0lDQWdJQ0FnSUdWc1pXMWxiblF1YzJOeWIyeHNTR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUXViMlptYzJWMFNHVnBaMmgwTEZ4dUlDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RdVkyeHBaVzUwU0dWcFoyaDBYRzRnSUNBZ0lDQWdJQ2s3WEc0Z0lDQWdJQ0I5TEZ4dVhHNGdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMDUxYldKbGNuMGdkR2hsSUdobGFXZG9kQ0J2WmlCMGFHVWdaV3hsYldWdWRDQnBiaUJ3YVhobGJITmNiaUFnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdhR1ZwWjJoME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRTFoZEdndWJXRjRLR1ZzWlcxbGJuUXViMlptYzJWMFNHVnBaMmgwTENCbGJHVnRaVzUwTG1Oc2FXVnVkRWhsYVdkb2RDazdYRzRnSUNBZ0lDQjlMRnh1WEc0Z0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBcUlFZGxkSE1nZEdobElGa2djMk55YjJ4c0lIQnZjMmwwYVc5dVhHNGdJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlIQnBlR1ZzY3lCMGFHVWdaV3hsYldWdWRDQm9ZWE1nYzJOeWIyeHNaV1FnWVd4dmJtY2dkR2hsSUZrdFlYaHBjMXh1SUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0J6WTNKdmJHeFpPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdWc1pXMWxiblF1YzJOeWIyeHNWRzl3TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCamNtVmhkR1ZUWTNKdmJHeGxjaWhsYkdWdFpXNTBLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHbHpWMmx1Wkc5M0tHVnNaVzFsYm5RcElEOGdkMmx1Wkc5M1UyTnliMnhzWlhJb1pXeGxiV1Z1ZENrZ09pQmxiR1Z0Wlc1MFUyTnliMnhzWlhJb1pXeGxiV1Z1ZENrN1hHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dRSEJoY21GdElHVnNaVzFsYm5RZ1JYWmxiblJVWVhKblpYUmNiaUFnSUNvdlhHNGdJR1oxYm1OMGFXOXVJSFJ5WVdOclUyTnliMnhzS0dWc1pXMWxiblFzSUc5d2RHbHZibk1zSUdOaGJHeGlZV05yS1NCN1hHNGdJQ0FnZG1GeUlHbHpVR0Z6YzJsMlpWTjFjSEJ2Y25SbFpDQTlJSEJoYzNOcGRtVkZkbVZ1ZEhOVGRYQndiM0owWldRb0tUdGNiaUFnSUNCMllYSWdjbUZtU1dRN1hHNGdJQ0FnZG1GeUlITmpjbTlzYkdWa0lEMGdabUZzYzJVN1hHNGdJQ0FnZG1GeUlITmpjbTlzYkdWeUlEMGdZM0psWVhSbFUyTnliMnhzWlhJb1pXeGxiV1Z1ZENrN1hHNGdJQ0FnZG1GeUlHeGhjM1JUWTNKdmJHeFpJRDBnYzJOeWIyeHNaWEl1YzJOeWIyeHNXU2dwTzF4dUlDQWdJSFpoY2lCa1pYUmhhV3h6SUQwZ2UzMDdYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQjFjR1JoZEdVb0tTQjdYRzRnSUNBZ0lDQjJZWElnYzJOeWIyeHNXU0E5SUUxaGRHZ3VjbTkxYm1Rb2MyTnliMnhzWlhJdWMyTnliMnhzV1NncEtUdGNiaUFnSUNBZ0lIWmhjaUJvWldsbmFIUWdQU0J6WTNKdmJHeGxjaTVvWldsbmFIUW9LVHRjYmlBZ0lDQWdJSFpoY2lCelkzSnZiR3hJWldsbmFIUWdQU0J6WTNKdmJHeGxjaTV6WTNKdmJHeElaV2xuYUhRb0tUdGNibHh1SUNBZ0lDQWdMeThnY21WMWMyVWdiMkpxWldOMElHWnZjaUJzWlhOeklHMWxiVzl5ZVNCamFIVnlibHh1SUNBZ0lDQWdaR1YwWVdsc2N5NXpZM0p2Ykd4WklEMGdjMk55YjJ4c1dUdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdWJHRnpkRk5qY205c2JGa2dQU0JzWVhOMFUyTnliMnhzV1R0Y2JpQWdJQ0FnSUdSbGRHRnBiSE11WkdseVpXTjBhVzl1SUQwZ2MyTnliMnhzV1NBK0lHeGhjM1JUWTNKdmJHeFpJRDhnWENKa2IzZHVYQ0lnT2lCY0luVndYQ0k3WEc0Z0lDQWdJQ0JrWlhSaGFXeHpMbVJwYzNSaGJtTmxJRDBnVFdGMGFDNWhZbk1vYzJOeWIyeHNXU0F0SUd4aGMzUlRZM0p2Ykd4WktUdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdWFYTlBkWFJQWmtKdmRXNWtjeUE5SUhOamNtOXNiRmtnUENBd0lIeDhJSE5qY205c2JGa2dLeUJvWldsbmFIUWdQaUJ6WTNKdmJHeElaV2xuYUhRN1hHNGdJQ0FnSUNCa1pYUmhhV3h6TG5SdmNDQTlJSE5qY205c2JGa2dQRDBnYjNCMGFXOXVjeTV2Wm1aelpYUmJaR1YwWVdsc2N5NWthWEpsWTNScGIyNWRPMXh1SUNBZ0lDQWdaR1YwWVdsc2N5NWliM1IwYjIwZ1BTQnpZM0p2Ykd4WklDc2dhR1ZwWjJoMElENDlJSE5qY205c2JFaGxhV2RvZER0Y2JpQWdJQ0FnSUdSbGRHRnBiSE11ZEc5c1pYSmhibU5sUlhoalpXVmtaV1FnUFZ4dUlDQWdJQ0FnSUNCa1pYUmhhV3h6TG1ScGMzUmhibU5sSUQ0Z2IzQjBhVzl1Y3k1MGIyeGxjbUZ1WTJWYlpHVjBZV2xzY3k1a2FYSmxZM1JwYjI1ZE8xeHVYRzRnSUNBZ0lDQmpZV3hzWW1GamF5aGtaWFJoYVd4ektUdGNibHh1SUNBZ0lDQWdiR0Z6ZEZOamNtOXNiRmtnUFNCelkzSnZiR3haTzF4dUlDQWdJQ0FnYzJOeWIyeHNaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQm9ZVzVrYkdWVFkzSnZiR3dvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWE5qY205c2JHVmtLU0I3WEc0Z0lDQWdJQ0FnSUhOamNtOXNiR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnY21GbVNXUWdQU0J5WlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVb2RYQmtZWFJsS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWVhJZ1pYWmxiblJQY0hScGIyNXpJRDBnYVhOUVlYTnphWFpsVTNWd2NHOXlkR1ZrWEc0Z0lDQWdJQ0EvSUhzZ2NHRnpjMmwyWlRvZ2RISjFaU3dnWTJGd2RIVnlaVG9nWm1Gc2MyVWdmVnh1SUNBZ0lDQWdPaUJtWVd4elpUdGNibHh1SUNBZ0lHVnNaVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0luTmpjbTlzYkZ3aUxDQm9ZVzVrYkdWVFkzSnZiR3dzSUdWMlpXNTBUM0IwYVc5dWN5azdYRzRnSUNBZ2RYQmtZWFJsS0NrN1hHNWNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnWkdWemRISnZlVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lHTmhibU5sYkVGdWFXMWhkR2x2YmtaeVlXMWxLSEpoWmtsa0tUdGNiaUFnSUNBZ0lDQWdaV3hsYldWdWRDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLRndpYzJOeWIyeHNYQ0lzSUdoaGJtUnNaVk5qY205c2JDd2daWFpsYm5SUGNIUnBiMjV6S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2JtOXliV0ZzYVhwbFZYQkViM2R1S0hRcElIdGNiaUFnSUNCeVpYUjFjbTRnZENBOVBUMGdUMkpxWldOMEtIUXBJRDhnZENBNklIc2daRzkzYmpvZ2RDd2dkWEE2SUhRZ2ZUdGNiaUFnZlZ4dVhHNGdJQzhxS2x4dUlDQWdLaUJWU1NCbGJtaGhibU5sYldWdWRDQm1iM0lnWm1sNFpXUWdhR1ZoWkdWeWN5NWNiaUFnSUNvZ1NHbGtaWE1nYUdWaFpHVnlJSGRvWlc0Z2MyTnliMnhzYVc1bklHUnZkMjVjYmlBZ0lDb2dVMmh2ZDNNZ2FHVmhaR1Z5SUhkb1pXNGdjMk55YjJ4c2FXNW5JSFZ3WEc0Z0lDQXFJRUJqYjI1emRISjFZM1J2Y2x4dUlDQWdLaUJBY0dGeVlXMGdlMFJQVFVWc1pXMWxiblI5SUdWc1pXMGdkR2hsSUdobFlXUmxjaUJsYkdWdFpXNTBYRzRnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdmNIUnBiMjV6SUc5d2RHbHZibk1nWm05eUlIUm9aU0IzYVdSblpYUmNiaUFnSUNvdlhHNGdJR1oxYm1OMGFXOXVJRWhsWVdSeWIyOXRLR1ZzWlcwc0lHOXdkR2x2Ym5NcElIdGNiaUFnSUNCdmNIUnBiMjV6SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmlBZ0lDQlBZbXBsWTNRdVlYTnphV2R1S0hSb2FYTXNJRWhsWVdSeWIyOXRMbTl3ZEdsdmJuTXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lIUm9hWE11WTJ4aGMzTmxjeUE5SUU5aWFtVmpkQzVoYzNOcFoyNG9lMzBzSUVobFlXUnliMjl0TG05d2RHbHZibk11WTJ4aGMzTmxjeXdnYjNCMGFXOXVjeTVqYkdGemMyVnpLVHRjYmx4dUlDQWdJSFJvYVhNdVpXeGxiU0E5SUdWc1pXMDdYRzRnSUNBZ2RHaHBjeTUwYjJ4bGNtRnVZMlVnUFNCdWIzSnRZV3hwZW1WVmNFUnZkMjRvZEdocGN5NTBiMnhsY21GdVkyVXBPMXh1SUNBZ0lIUm9hWE11YjJabWMyVjBJRDBnYm05eWJXRnNhWHBsVlhCRWIzZHVLSFJvYVhNdWIyWm1jMlYwS1R0Y2JpQWdJQ0IwYUdsekxtbHVhWFJwWVd4cGMyVmtJRDBnWm1Gc2MyVTdYRzRnSUNBZ2RHaHBjeTVtY205NlpXNGdQU0JtWVd4elpUdGNiaUFnZlZ4dUlDQklaV0ZrY205dmJTNXdjbTkwYjNSNWNHVWdQU0I3WEc0Z0lDQWdZMjl1YzNSeWRXTjBiM0k2SUVobFlXUnliMjl0TEZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1UzUmhjblFnYkdsemRHVnVhVzVuSUhSdklITmpjbTlzYkdsdVoxeHVJQ0FnSUNBcUlFQndkV0pzYVdOY2JpQWdJQ0FnS2k5Y2JpQWdJQ0JwYm1sME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJR2xtSUNoSVpXRmtjbTl2YlM1amRYUnpWR2hsVFhWemRHRnlaQ0FtSmlBaGRHaHBjeTVwYm1sMGFXRnNhWE5sWkNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Ga1pFTnNZWE56S0Z3aWFXNXBkR2xoYkZ3aUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1cGJtbDBhV0ZzYVhObFpDQTlJSFJ5ZFdVN1hHNWNiaUFnSUNBZ0lDQWdMeThnWkdWbVpYSWdaWFpsYm5RZ2NtVm5hWE4wY21GMGFXOXVJSFJ2SUdoaGJtUnNaU0JpY205M2MyVnlYRzRnSUNBZ0lDQWdJQzh2SUhCdmRHVnVkR2xoYkd4NUlISmxjM1J2Y21sdVp5QndjbVYyYVc5MWN5QnpZM0p2Ykd3Z2NHOXphWFJwYjI1Y2JpQWdJQ0FnSUNBZ2MyVjBWR2x0Wlc5MWRDaGNiaUFnSUNBZ0lDQWdJQ0JtZFc1amRHbHZiaWh6Wld4bUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCelpXeG1Mbk5qY205c2JGUnlZV05yWlhJZ1BTQjBjbUZqYTFOamNtOXNiQ2hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1elkzSnZiR3hsY2l4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZXlCdlptWnpaWFE2SUhObGJHWXViMlptYzJWMExDQjBiMnhsY21GdVkyVTZJSE5sYkdZdWRHOXNaWEpoYm1ObElIMHNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1ZFhCa1lYUmxMbUpwYm1Rb2MyVnNaaWxjYmlBZ0lDQWdJQ0FnSUNBZ0lDazdYRzRnSUNBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ0lDQXhNREFzWEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjMXh1SUNBZ0lDQWdJQ0FwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCeVpYUjFjbTRnZEdocGN6dGNiaUFnSUNCOUxGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSR1Z6ZEhKdmVTQjBhR1VnZDJsa1oyVjBMQ0JqYkdWaGNtbHVaeUIxY0NCaFpuUmxjaUJwZEhObGJHWmNiaUFnSUNBZ0tpQkFjSFZpYkdsalhHNGdJQ0FnSUNvdlhHNGdJQ0FnWkdWemRISnZlVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbWx1YVhScFlXeHBjMlZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0JQWW1wbFkzUXVhMlY1Y3loMGFHbHpMbU5zWVhOelpYTXBMbVp2Y2tWaFkyZ29kR2hwY3k1eVpXMXZkbVZEYkdGemN5d2dkR2hwY3lrN1hHNGdJQ0FnSUNCMGFHbHpMbk5qY205c2JGUnlZV05yWlhJdVpHVnpkSEp2ZVNncE8xeHVJQ0FnSUgwc1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlZibkJwYmlCMGFHVWdaV3hsYldWdWRGeHVJQ0FnSUNBcUlFQndkV0pzYVdOY2JpQWdJQ0FnS2k5Y2JpQWdJQ0IxYm5CcGJqb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTVvWVhORGJHRnpjeWhjSW5CcGJtNWxaRndpS1NCOGZDQWhkR2hwY3k1b1lYTkRiR0Z6Y3loY0luVnVjR2x1Ym1Wa1hDSXBLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZV1JrUTJ4aGMzTW9YQ0oxYm5CcGJtNWxaRndpS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WlcxdmRtVkRiR0Z6Y3loY0luQnBibTVsWkZ3aUtUdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV2YmxWdWNHbHVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTV2YmxWdWNHbHVMbU5oYkd3b2RHaHBjeWs3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1VHbHVJSFJvWlNCbGJHVnRaVzUwWEc0Z0lDQWdJQ29nUUhCMVlteHBZMXh1SUNBZ0lDQXFMMXh1SUNBZ0lIQnBiam9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9kR2hwY3k1b1lYTkRiR0Z6Y3loY0luVnVjR2x1Ym1Wa1hDSXBLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZV1JrUTJ4aGMzTW9YQ0p3YVc1dVpXUmNJaWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKMWJuQnBibTVsWkZ3aUtUdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV2YmxCcGJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVRYVc0dVkyRnNiQ2gwYUdsektUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJHY21WbGVtVnpJSFJvWlNCamRYSnlaVzUwSUhOMFlYUmxJRzltSUhSb1pTQjNhV1JuWlhSY2JpQWdJQ0FnS2lCQWNIVmliR2xqWEc0Z0lDQWdJQ292WEc0Z0lDQWdabkpsWlhwbE9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJSFJvYVhNdVpuSnZlbVZ1SUQwZ2RISjFaVHRjYmlBZ0lDQWdJSFJvYVhNdVlXUmtRMnhoYzNNb1hDSm1jbTk2Wlc1Y0lpazdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRkpsTFdWdVlXSnNaWE1nZEdobElHUmxabUYxYkhRZ1ltVm9ZWFpwYjNWeUlHOW1JSFJvWlNCM2FXUm5aWFJjYmlBZ0lDQWdLaUJBY0hWaWJHbGpYRzRnSUNBZ0lDb3ZYRzRnSUNBZ2RXNW1jbVZsZW1VNklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdkR2hwY3k1bWNtOTZaVzRnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJSFJvYVhNdWNtVnRiM1psUTJ4aGMzTW9YQ0ptY205NlpXNWNJaWs3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJSFJ2Y0RvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQnBaaUFvSVhSb2FYTXVhR0Z6UTJ4aGMzTW9YQ0owYjNCY0lpa3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWhaR1JEYkdGemN5aGNJblJ2Y0Z3aUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpXMXZkbVZEYkdGemN5aGNJbTV2ZEZSdmNGd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJsUnZjQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1VWIzQXVZMkZzYkNoMGFHbHpLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBzWEc1Y2JpQWdJQ0J1YjNSVWIzQTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRjBhR2x6TG1oaGMwTnNZWE56S0Z3aWJtOTBWRzl3WENJcEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtRMnhoYzNNb1hDSnViM1JVYjNCY0lpazdYRzRnSUNBZ0lDQWdJSFJvYVhNdWNtVnRiM1psUTJ4aGMzTW9YQ0owYjNCY0lpazdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11YjI1T2IzUlViM0FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG05dVRtOTBWRzl3TG1OaGJHd29kR2hwY3lrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOUxGeHVYRzRnSUNBZ1ltOTBkRzl0T2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lHbG1JQ2doZEdocGN5NW9ZWE5EYkdGemN5aGNJbUp2ZEhSdmJWd2lLU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbUZrWkVOc1lYTnpLRndpWW05MGRHOXRYQ0lwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYlc5MlpVTnNZWE56S0Z3aWJtOTBRbTkwZEc5dFhDSXBPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG05dVFtOTBkRzl0S1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1dmJrSnZkSFJ2YlM1allXeHNLSFJvYVhNcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHNXZkRUp2ZEhSdmJUb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0JwWmlBb0lYUm9hWE11YUdGelEyeGhjM01vWENKdWIzUkNiM1IwYjIxY0lpa3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWhaR1JEYkdGemN5aGNJbTV2ZEVKdmRIUnZiVndpS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WlcxdmRtVkRiR0Z6Y3loY0ltSnZkSFJ2YlZ3aUtUdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV2Yms1dmRFSnZkSFJ2YlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNU9iM1JDYjNSMGIyMHVZMkZzYkNoMGFHbHpLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBzWEc1Y2JpQWdJQ0J6YUc5MWJHUlZibkJwYmpvZ1puVnVZM1JwYjI0b1pHVjBZV2xzY3lrZ2UxeHVJQ0FnSUNBZ2RtRnlJSE5qY205c2JHbHVaMFJ2ZDI0Z1BTQmtaWFJoYVd4ekxtUnBjbVZqZEdsdmJpQTlQVDBnWENKa2IzZHVYQ0k3WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUJ6WTNKdmJHeHBibWRFYjNkdUlDWW1JQ0ZrWlhSaGFXeHpMblJ2Y0NBbUppQmtaWFJoYVd4ekxuUnZiR1Z5WVc1alpVVjRZMlZsWkdWa08xeHVJQ0FnSUgwc1hHNWNiaUFnSUNCemFHOTFiR1JRYVc0NklHWjFibU4wYVc5dUtHUmxkR0ZwYkhNcElIdGNiaUFnSUNBZ0lIWmhjaUJ6WTNKdmJHeHBibWRWY0NBOUlHUmxkR0ZwYkhNdVpHbHlaV04wYVc5dUlEMDlQU0JjSW5Wd1hDSTdYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQW9jMk55YjJ4c2FXNW5WWEFnSmlZZ1pHVjBZV2xzY3k1MGIyeGxjbUZ1WTJWRmVHTmxaV1JsWkNrZ2ZId2daR1YwWVdsc2N5NTBiM0E3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJR0ZrWkVOc1lYTnpPaUJtZFc1amRHbHZiaWhqYkdGemMwNWhiV1VwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVaV3hsYlM1amJHRnpjMHhwYzNRdVlXUmtMbUZ3Y0d4NUtGeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Wc1pXMHVZMnhoYzNOTWFYTjBMRnh1SUNBZ0lDQWdJQ0IwYUdsekxtTnNZWE56WlhOYlkyeGhjM05PWVcxbFhTNXpjR3hwZENoY0lpQmNJaWxjYmlBZ0lDQWdJQ2s3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJSEpsYlc5MlpVTnNZWE56T2lCbWRXNWpkR2x2YmloamJHRnpjMDVoYldVcElIdGNiaUFnSUNBZ0lIUm9hWE11Wld4bGJTNWpiR0Z6YzB4cGMzUXVjbVZ0YjNabExtRndjR3g1S0Z4dUlDQWdJQ0FnSUNCMGFHbHpMbVZzWlcwdVkyeGhjM05NYVhOMExGeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Oc1lYTnpaWE5iWTJ4aGMzTk9ZVzFsWFM1emNHeHBkQ2hjSWlCY0lpbGNiaUFnSUNBZ0lDazdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHaGhjME5zWVhOek9pQm1kVzVqZEdsdmJpaGpiR0Z6YzA1aGJXVXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1Oc1lYTnpaWE5iWTJ4aGMzTk9ZVzFsWFM1emNHeHBkQ2hjSWlCY0lpa3VaWFpsY25rb1puVnVZM1JwYjI0b1kyeHpLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtTnNZWE56VEdsemRDNWpiMjUwWVdsdWN5aGpiSE1wTzF4dUlDQWdJQ0FnZlN3Z2RHaHBjeTVsYkdWdEtUdGNiaUFnSUNCOUxGeHVYRzRnSUNBZ2RYQmtZWFJsT2lCbWRXNWpkR2x2Ymloa1pYUmhhV3h6S1NCN1hHNGdJQ0FnSUNCcFppQW9aR1YwWVdsc2N5NXBjMDkxZEU5bVFtOTFibVJ6S1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRWxuYm05eVpTQmliM1Z1WTNrZ2MyTnliMnhzYVc1bklHbHVJRTlUV0Z4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TG1aeWIzcGxiaUE5UFQwZ2RISjFaU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaGtaWFJoYVd4ekxuUnZjQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMblJ2Y0NncE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV1YjNSVWIzQW9LVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYVdZZ0tHUmxkR0ZwYkhNdVltOTBkRzl0S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WW05MGRHOXRLQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtNXZkRUp2ZEhSdmJTZ3BPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTV6YUc5MWJHUlZibkJwYmloa1pYUmhhV3h6S1NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5WdWNHbHVLQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hSb2FYTXVjMmh2ZFd4a1VHbHVLR1JsZEdGcGJITXBLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjR2x1S0NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlPMXh1WEc0Z0lDOHFLbHh1SUNBZ0tpQkVaV1poZFd4MElHOXdkR2x2Ym5OY2JpQWdJQ29nUUhSNWNHVWdlMDlpYW1WamRIMWNiaUFnSUNvdlhHNGdJRWhsWVdSeWIyOXRMbTl3ZEdsdmJuTWdQU0I3WEc0Z0lDQWdkRzlzWlhKaGJtTmxPaUI3WEc0Z0lDQWdJQ0IxY0RvZ01DeGNiaUFnSUNBZ0lHUnZkMjQ2SURCY2JpQWdJQ0I5TEZ4dUlDQWdJRzltWm5ObGREb2dNQ3hjYmlBZ0lDQnpZM0p2Ykd4bGNqb2dhWE5DY205M2MyVnlLQ2tnUHlCM2FXNWtiM2NnT2lCdWRXeHNMRnh1SUNBZ0lHTnNZWE56WlhNNklIdGNiaUFnSUNBZ0lHWnliM3BsYmpvZ1hDSm9aV0ZrY205dmJTMHRabkp2ZW1WdVhDSXNYRzRnSUNBZ0lDQndhVzV1WldRNklGd2lhR1ZoWkhKdmIyMHRMWEJwYm01bFpGd2lMRnh1SUNBZ0lDQWdkVzV3YVc1dVpXUTZJRndpYUdWaFpISnZiMjB0TFhWdWNHbHVibVZrWENJc1hHNGdJQ0FnSUNCMGIzQTZJRndpYUdWaFpISnZiMjB0TFhSdmNGd2lMRnh1SUNBZ0lDQWdibTkwVkc5d09pQmNJbWhsWVdSeWIyOXRMUzF1YjNRdGRHOXdYQ0lzWEc0Z0lDQWdJQ0JpYjNSMGIyMDZJRndpYUdWaFpISnZiMjB0TFdKdmRIUnZiVndpTEZ4dUlDQWdJQ0FnYm05MFFtOTBkRzl0T2lCY0ltaGxZV1J5YjI5dExTMXViM1F0WW05MGRHOXRYQ0lzWEc0Z0lDQWdJQ0JwYm1sMGFXRnNPaUJjSW1obFlXUnliMjl0WENKY2JpQWdJQ0I5WEc0Z0lIMDdYRzVjYmlBZ1NHVmhaSEp2YjIwdVkzVjBjMVJvWlUxMWMzUmhjbVFnUFNCcGMxTjFjSEJ2Y25SbFpDZ3BPMXh1WEc0Z0lISmxkSFZ5YmlCSVpXRmtjbTl2YlR0Y2JseHVmU2twTzF4dUlpd2lablZ1WTNScGIyNGdaVzFwZEVWMlpXNTBLSFI1Y0dVc0lHUmxkR0ZwYkNBOUlIdDlMQ0JsYkdWdElEMGdaRzlqZFcxbGJuUXBJSHRjYmlBZ0x5OGdUV0ZyWlNCemRYSmxJSFJvWlhKbEozTWdZVzRnWlhabGJuUWdkSGx3WlZ4dUlDQnBaaUFvSVhSNWNHVXBJSEpsZEhWeWJqdGNibHh1SUNBdkx5QkRjbVZoZEdVZ1lTQnVaWGNnWlhabGJuUmNiaUFnWTI5dWMzUWdZM1Z6ZEc5dFJYWmxiblFnUFNCdVpYY2dRM1Z6ZEc5dFJYWmxiblFvZEhsd1pTd2dlMXh1SUNBZ0lHSjFZbUpzWlhNNklIUnlkV1VzWEc0Z0lDQWdZMkZ1WTJWc1lXSnNaVG9nZEhKMVpTeGNiaUFnSUNCa1pYUmhhV3c2SUdSbGRHRnBiRnh1SUNCOUtUdGNibHh1SUNBdkx5QkVhWE53WVhSamFDQjBhR1VnWlhabGJuUmNiaUFnY21WMGRYSnVJR1ZzWlcwdVpHbHpjR0YwWTJoRmRtVnVkQ2hqZFhOMGIyMUZkbVZ1ZENrN1hHNTlYRzVjYm14bGRDQm5jbVZsZEdsdVozTWdQU0FvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0JzWlhRZ2MyVjBkR2x1WjNNZ1BTQjdYRzRnSUNBZ1ozSmxaWFJwYm1jNklDZDViM1VuTEZ4dUlDQWdJR2hwUW1WbWIzSmxPaUFuU0dWNWJ5Y3NYRzRnSUNBZ2FHbEJablJsY2pvZ0p5Y3NYRzRnSUNBZ1lubGxRbVZtYjNKbE9pQW5VMlZsSUhsaElHeGhkR1Z5Snl4Y2JpQWdJQ0JpZVdWQlpuUmxjam9nSjFSaGEyVWdhWFFnWldGemVTNG5JQ0JjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhWd1pHRjBaVk5sZEhScGJtZHpJQ2h2Y0hScGIyNXpJRDBnZTMwcElIdGNiaUFnSUNCUFltcGxZM1F1WVhOemFXZHVLSE5sZEhScGJtZHpMQ0J2Y0hScGIyNXpLVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYzJGNVNHa2dLRzVoYldVcElIdGNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGNiaUFnSUNBZ0lDY2xZeVZ6Snl3Z1hHNGdJQ0FnSUNBblkyOXNiM0k2SUhCcGJtczdabTl1ZEMxemFYcGxPaUF5TlhCNEp5d2dYRzRnSUNBZ0lDQmdKSHR6WlhSMGFXNW5jeTVvYVVKbFptOXlaWDBnSkh0dVlXMWxJRDhnYm1GdFpTQTZJSE5sZEhScGJtZHpMbWR5WldWMGFXNW5mU0FrZTNObGRIUnBibWR6TG1ocFFXWjBaWEo5WUZ4dUlDQWdJQ2xjYmlBZ0lDQnlaWFIxY200Z1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnpZWGxDZVdVZ0tHNWhiV1VwSUh0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloY2JpQWdJQ0FnSUNjbFl5VnpKeXdnWEc0Z0lDQWdJQ0FuWTI5c2IzSTZJSEJwYm1zN1ptOXVkQzF6YVhwbE9pQXlOWEI0Snl3Z1hHNGdJQ0FnSUNCZ0pIdHpaWFIwYVc1bmN5NWllV1ZDWldadmNtVjlJQ1I3Ym1GdFpTQS9JRzVoYldVZ09pQnpaWFIwYVc1bmN5NW5jbVZsZEdsdVozMGdKSHR6WlhSMGFXNW5jeTVpZVdWQlpuUmxjbjFnWEc0Z0lDQWdLVnh1WEc0Z0lDQWdjbVYwZFhKdUlGeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCMWNHUmhkR1ZUWlhSMGFXNW5jeXhjYmlBZ0lDQnpZWGxJYVN4Y2JpQWdJQ0J6WVhsQ2VXVWdJQ0FnWEc0Z0lIMWNibjBwS0NsY2JseHVMeThnWjNKbFpYUnBibWR6TG5Wd1pHRjBaVk5sZEhScGJtZHpLSHRjYmk4dklDQWdaM0psWlhScGJtZHpPaUFuZDI5eWJHUW5YRzR2THlCOUtWeHVYRzR2THlCbmNtVmxkR2x1WjNNdWMyRjVTR2tvSjIxbGNteHBiaWNwTzF4dUx5OGdaM0psWlhScGJtZHpMbk5oZVVKNVpTZ25iVzl5WjJGdUp5azdYRzVjYm14bGRDQkhjbVZsZEdsdVp5QTlJQ2htZFc1amRHbHZiaUFvS1NCN1hHNGdJR052Ym5OMElHUmxabUYxYkhSeklEMGdlMXh1SUNBZ0lHZHlaV1YwYVc1bk9pQW5lVzkxSnl4Y2JpQWdJQ0JvYVVKbFptOXlaVG9nSjBobGVXOG5MRnh1SUNBZ0lHaHBRV1owWlhJNklDY25MRnh1SUNBZ0lHSjVaVUpsWm05eVpUb2dKMU5sWlNCNVlTQnNZWFJsY2ljc1hHNGdJQ0FnWW5sbFFXWjBaWEk2SUNkVVlXdGxJR2wwSUdWaGMza3VKeXhjYmx4dUlDQWdJQzh2SUdOaGJHeGlZV05yYzF4dUlDQWdJRzl1U0drNklHWjFibU4wYVc5dUlDZ3BJSHQ5TEZ4dUlDQWdJRzl1UW5sbE9pQm1kVzVqZEdsdmJpQW9LU0I3ZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pXMXBkRVYyWlc1MEtIUjVjR1VzSUdSbGRHRnBiQ0E5SUh0OUxDQmxiR1Z0SUQwZ1pHOWpkVzFsYm5RcElIdGNiaUFnSUNBdkx5Qk5ZV3RsSUhOMWNtVWdkR2hsY21VbmN5QmhiaUJsZG1WdWRDQjBlWEJsWEc0Z0lDQWdhV1lnS0NGMGVYQmxLU0J5WlhSMWNtNDdYRzRnSUZ4dUlDQWdJQzh2SUVOeVpXRjBaU0JoSUc1bGR5QmxkbVZ1ZEZ4dUlDQWdJR052Ym5OMElHTjFjM1J2YlVWMlpXNTBJRDBnYm1WM0lFTjFjM1J2YlVWMlpXNTBLSFI1Y0dVc0lIdGNiaUFnSUNBZ0lHSjFZbUpzWlhNNklIUnlkV1VzWEc0Z0lDQWdJQ0JqWVc1alpXeGhZbXhsT2lCMGNuVmxMRnh1SUNBZ0lDQWdaR1YwWVdsc09pQmtaWFJoYVd4Y2JpQWdJQ0I5S1R0Y2JpQWdYRzRnSUNBZ0x5OGdSR2x6Y0dGMFkyZ2dkR2hsSUdWMlpXNTBYRzRnSUNBZ2NtVjBkWEp1SUdWc1pXMHVaR2x6Y0dGMFkyaEZkbVZ1ZENoamRYTjBiMjFGZG1WdWRDazdYRzRnSUgxY2JseHVJQ0JqYjI1emRDQkRiMjV6ZEhKMVkzUnZjaUE5SUdaMWJtTjBhVzl1S0c1aGJXVXNJRzl3ZEdsdmJuTWdQU0I3ZlNrZ2UxeHVJQ0FnSUdOdmJuTjBJSE5sZEhScGJtZHpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnWkdWbVlYVnNkSE1zSUc5d2RHbHZibk1wWEc1Y2JpQWdJQ0JQWW1wbFkzUXVabkpsWlhwbEtITmxkSFJwYm1kektWeHVYRzRnSUNBZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUnBaWE1vZEdocGN5d2dlMXh1SUNBZ0lDQWdYMjVoYldVNklIc2dkbUZzZFdVNklHNWhiV1VnZlN4Y2JpQWdJQ0FnSUY5elpYUjBhVzVuY3pvZ2V5QjJZV3gxWlRvZ2MyVjBkR2x1WjNNZ2ZWeHVJQ0FnSUgwcFhHNGdJSDBnWEc0Z0lFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaUzV6WVhsSWFTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0F2THlCRmJXbDBJR04xYzNSdmJTQmxkbVZ1ZEZ4dUlDQWdJR052Ym5OMElHTmhibU5sYkdWa0lEMGdJV1Z0YVhSRmRtVnVkQ2duWjNKbFpYUnBibWM2WW1WbWIzSmxMV2hwSnl3Z2UxeHVJQ0FnSUNBZ2JtRnRaVG9nZEdocGN5NWZibUZ0WlN4Y2JpQWdJQ0FnSUdKbFptOXlaVG9nZEdocGN5NWZjMlYwZEdsdVozTXVhR2xDWldadmNtVXNYRzRnSUNBZ0lDQmhablJsY2pvZ2RHaHBjeTVmYzJWMGRHbHVaM011YUdsQlpuUmxjbHh1SUNBZ0lIMHBPMXh1WEc0Z0lDQWdMeThnU1dZZ2RHaGxJR1YyWlc1MElIZGhjeUJqWVc1alpXeGxaQ3dnWlc1a1hHNGdJQ0FnYVdZZ0tHTmhibU5sYkdWa0tTQnlaWFIxY200N1hHNWNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGNiaUFnSUNBZ0lDY2xZeVZ6Snl3Z1hHNGdJQ0FnSUNBblkyOXNiM0k2SUhCcGJtczdabTl1ZEMxemFYcGxPaUF5TlhCNEp5d2dYRzRnSUNBZ0lDQmdKSHQwYUdsekxsOXpaWFIwYVc1bmN5NW9hVUpsWm05eVpYMGdKSHQwYUdsekxsOXVZVzFsZlNBa2UzUm9hWE11WDNObGRIUnBibWR6TG1ocFFXWjBaWEo5WUZ4dUlDQWdJQ2xjYmlBZ0lDQmNiaUFnSUNBdkx5QlNkVzRnWTJGc2JHSmhZMnRjYmlBZ0lDQjBhR2x6TGw5elpYUjBhVzVuY3k1dmJraHBLSFJvYVhNdVgyNWhiV1VzSUhSb2FYTXVYM05sZEhScGJtZHpMbWhwUW1WbWIzSmxMQ0IwYUdsekxsOXpaWFIwYVc1bmN5NW9hVUZtZEdWeUtWeHVYRzRnSUNBZ0x5OGdSVzFwZENCamRYTjBiMjBnWlhabGJuUmNiaUFnSUNCbGJXbDBSWFpsYm5Rb0oyZHlaV1YwYVc1bk9taHBKeXdnZTF4dUlDQWdJQ0FnYm1GdFpUb2dkR2hwY3k1ZmJtRnRaU3hjYmlBZ0lDQWdJR0psWm05eVpUb2dkR2hwY3k1ZmMyVjBkR2x1WjNNdWFHbENaV1p2Y21Vc1hHNGdJQ0FnSUNCaFpuUmxjam9nZEdocGN5NWZjMlYwZEdsdVozTXVhR2xCWm5SbGNseHVJQ0FnSUgwcFhHNWNiaUFnSUNCeVpYUjFjbTRnZEdocGMxeHVJQ0I5WEc1Y2JpQWdRMjl1YzNSeWRXTjBiM0l1Y0hKdmRHOTBlWEJsTG5OaGVVSjVaU0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBdkx5QkZiV2wwSUdOMWMzUnZiU0JsZG1WdWRGeHVJQ0FnSUdOdmJuTjBJR05oYm1ObGJHVmtJRDBnSVdWdGFYUkZkbVZ1ZENnblozSmxaWFJwYm1jNlltVm1iM0psTFdKNVpTY3NJSHRjYmlBZ0lDQWdJRzVoYldVNklIUm9hWE11WDI1aGJXVXNYRzRnSUNBZ0lDQmlaV1p2Y21VNklIUm9hWE11WDNObGRIUnBibWR6TG1KNVpVSmxabTl5WlN4Y2JpQWdJQ0FnSUdGbWRHVnlPaUIwYUdsekxsOXpaWFIwYVc1bmN5NWllV1ZCWm5SbGNseHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ0x5OGdTV1lnZEdobElHVjJaVzUwSUhkaGN5QmpZVzVqWld4bFpDd2daVzVrWEc0Z0lDQWdhV1lnS0dOaGJtTmxiR1ZrS1NCeVpYUjFjbTQ3WEc1Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloY2JpQWdJQ0FnSUNjbFl5VnpKeXdnWEc0Z0lDQWdJQ0FuWTI5c2IzSTZJSEJwYm1zN1ptOXVkQzF6YVhwbE9pQXlOWEI0Snl3Z1hHNGdJQ0FnSUNCZ0pIdDBhR2x6TGw5elpYUjBhVzVuY3k1aWVXVkNaV1p2Y21WOUlDUjdkR2hwY3k1ZmJtRnRaWDBnSkh0MGFHbHpMbDl6WlhSMGFXNW5jeTVpZVdWQlpuUmxjbjFnWEc0Z0lDQWdLVnh1SUNBZ0lGeHVJQ0FnSUhSb2FYTXVYM05sZEhScGJtZHpMbTl1UW5sbEtIUm9hWE11WDI1aGJXVXNJSFJvYVhNdVgzTmxkSFJwYm1kekxtSjVaVUpsWm05eVpTd2dkR2hwY3k1ZmMyVjBkR2x1WjNNdVlubGxRV1owWlhJcE8xeHVJQ0FnSUZ4dUlDQWdJQzh2SUVWdGFYUWdZM1Z6ZEc5dElHVjJaVzUwWEc0Z0lDQWdaVzFwZEVWMlpXNTBLQ2RuY21WbGRHbHVaenBpZVdVbkxDQjdYRzRnSUNBZ0lDQnVZVzFsT2lCMGFHbHpMbDl1WVcxbExGeHVJQ0FnSUNBZ1ltVm1iM0psT2lCMGFHbHpMbDl6WlhSMGFXNW5jeTVpZVdWQ1pXWnZjbVVzWEc0Z0lDQWdJQ0JoWm5SbGNqb2dkR2hwY3k1ZmMyVjBkR2x1WjNNdVlubGxRV1owWlhKY2JpQWdJQ0I5S1R0Y2JpQWdJQ0JjYmlBZ0lDQnlaWFIxY200Z2RHaHBjMXh1SUNCOVhHNWNiaUFnY21WMGRYSnVJRU52Ym5OMGNuVmpkRzl5WEc1OUtTZ3BYRzVjYm1OdmJuTjBJRzFsY214cGJpQTlJRzVsZHlCSGNtVmxkR2x1WnlnblRXVnliR2x1Snl3Z2UxeHVJQ0JvYVVGbWRHVnlPaUFuTGljc1hHNGdJQzh2SUc5dVFubGxPaUJtZFc1amRHbHZiaWh1WVcxbEtTQjdYRzRnSUM4dklDQWdZMjl1YzNRZ1lYQndJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbUo1WlMxMFpYaDBKeWxjYmlBZ0x5OGdJQ0JoY0hBdWRHVjRkRU52Ym5SbGJuUWdQU0JnOEorUml5QWtlMjVoYldWOVlEdGNiaUFnTHk4Z2ZWeHVmU2s3WEc1Y2JtUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyZHlaV1YwYVc1bk9tSjVaU2NzSUdaMWJtTjBhVzl1SUNobGRtVnVkQ2tnZTF4dUlDQmpiMjV6ZENCaGNIQWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VZbmxsTFhSbGVIUW5LVHRjYmlBZ1lYQndMblJsZUhSRGIyNTBaVzUwSUQwZ1lQQ2ZrWXNnSkh0bGRtVnVkQzVrWlhSaGFXd3VibUZ0WlgxZ1hHNTlLVHRjYmx4dWJHVjBJR1p2Y20wZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NkbWIzSnRKeWs3WEc1bWIzSnRMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KM04xWW0xcGRDY3NJR1oxYm1OMGFXOXVJQ2hsZG1WdWRDa2dlMXh1SUNBZ0lHVjJaVzUwTG5CeVpYWmxiblJFWldaaGRXeDBLQ2s3WEc0Z0lDQWdabTl5YlM1eVpYTmxkQ2dwTzF4dUlDQWdJRzFsY214cGJpNXpZWGxDZVdVb0tUdGNibjBwTzF4dVhHNWNiaThxS2x4dUlDb2dSVzFwZENCaElHTjFjM1J2YlNCbGRtVnVkRnh1SUNvdlhHNHZMeUJrYjJOMWJXVnVkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R0ZVMxamRYTjBiMjB0WlhabGJuUW5MQ0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh1THk4Z0lDQmpiMjV6YjJ4bExteHZaeWd4TWpNcFhHNHZMeUFnSUdOdmJuTnZiR1V1Ykc5bktHVjJaVzUwTG5SNWNHVXBYRzR2THlBZ0lHVjJaVzUwTG5CeVpYWmxiblJFWldaaGRXeDBLQ2xjYmk4dklIMHBYRzVjYmk4dklHeGxkQ0J0ZVVWMlpXNTBJRDBnYm1WM0lFTjFjM1J2YlVWMlpXNTBLQ2R0ZVMxamRYTjBiMjB0WlhabGJuUW5MQ0I3WEc0dkx5QWdJR0oxWW1Kc1pYTTZJSFJ5ZFdVc1hHNHZMeUFnSUdOaGJtTmxiR0ZpYkdVNklIUnlkV1ZjYmk4dklIMHBYRzVjYmk4dklDOHZJRVZ0YVhRZ2RHaGxJR1YyWlc1MFhHNHZMeUJqYjI1emRDQmpZVzVqWld4bFpDQTlJR1J2WTNWdFpXNTBMbVJwYzNCaGRHTm9SWFpsYm5Rb2JYbEZkbVZ1ZENrN1hHNHZMeUJqYjI1emIyeGxMbXh2WnlodGVVVjJaVzUwS1Z4dUx5OGdZMjl1YzI5c1pTNXNiMmNvWTJGdVkyVnNaV1FwWEc1Y2JpSXNJaThxS2x4dUtpQXFJRVJQVFNCTllXNXBjSFZzWVhScGIyNGdURWxpY21GeWFXVnpYRzRxSURFdUlHaDBkSEJ6T2k4dmMyTnliMnhzY21WMlpXRnNhbk11YjNKbkwxeHVLaUF5TGlCb2RIUndjem92TDNCb2IzUnZjM2RwY0dVdVkyOXRMMXh1S2lBcUlFUlBUU0J0WVc1cGNIVnNZWFJwYjI0Z2JHbGljbUZ5YVdWeklHaGhkbVVnYzI5dFpTQjFibWx4ZFdVZ1kyOXVjMmxrWlhKaGRHbHZibk1nWTI5dGNHRnlaV1FnZEc4Z2RYUnBiR2wwZVNCc2FXSnlZWEpwWlhNdVhHNHFJQ29nU0c5M0lHTmhiaUIzWlNCamIyNTJaWEowSUhSb2FYTWdhVzUwYnlCaElHeHBZbkpoY25sY2Jpb2dNUzRnU1c1cVpXTjBhVzVuSUdOdmJuUmxiblFnYVc1MGJ5QjBhR1VnUkU5TlhHNHFJREl1SUV4cGMzUmxibWx1WnlCbWIzSWdaWFpsYm5SelhHNHFJRE11SUVGa1pHbHVaeUJ2Y0hScGIyNXpJR0Z1WkNCelpYUjBhVzVuYzF4dUtpQTBMaUJGZUhCdmMybHVaeUJ3ZFdKc2FXTWdiV1YwYUc5a2MxeHVLaUExTGlCRVpYTjBjbTk1YVc1bklIUm9aU0JwYm5OMFlXNTBhV0YwYVc5dVhHNGdLaTljYmx4dVkyOXVjM1FnWldkbklEMGdLR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQXZMeUJIWlhRZ2RHaGxJR1ZzWlcxbGJuUmNiaUFnWTI5dWMzUWdhVzVwZENBOUlDQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQnNaWFFnWld4bGJTQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5TmxaMmNuS1R0Y2JpQWdJQ0JzWlhRZ2MyTmhiR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lGeHVJQ0FnSUM4dklFTnlaV0YwWlNCaWRYUjBiMjVjYmlBZ0lDQnNaWFFnWW5SdUlEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENnblluVjBkRzl1SnlrN1hHNGdJQ0FnWW5SdUxtbHVibVZ5U0ZSTlRDQTlJQ2Z3bjZXYUp6dGNiaUFnSUNCaWRHNHVjMlYwUVhSMGNtbGlkWFJsS0NkaGNtbGhMV3hoWW1Wc0p5d2dZR05zYVdOcklHMWxZQ2s3WEc0Z0lDQWdZblJ1TG5OMGVXeGxMblJ5WVc1emFYUnBiMjRnUFNBbmRISmhibk5tYjNKdElETXdNRzF6SUdWaGMyVXRhVzRuTzF4dUlDQmNiaUFnSUNBdkx5QkpibXBsWTNRZ2FXNTBieUIwYUdVZ1JFOU5YRzRnSUNBZ1pXeGxiUzVoY0hCbGJtUW9ZblJ1S1R0Y2JpQWdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dTR0Z1Wkd4bElHTnNhV05ySUdWMlpXNTBjMXh1SUNBZ0lDQXFMMXh1SUNBZ0lHWjFibU4wYVc5dUlIUnZaMmRzWlNBb0tTQjdYRzRnSUNBZ0lDQXZMeUJKWmlCMGFHVWdZblYwZEc5dUlHbHpJSE5qWVd4bFpDd2djMmh5YVc1cklHbDBYRzRnSUNBZ0lDQXZMeUJQZEdobGNuZHBjMlVzSUdkeWIzY2dhWFJjYmlBZ0lDQWdJR0owYmk1emRIbHNaUzUwY21GdWMyWnZjbTBnUFNCelkyRnNaV1FnUHlBbkp5QTZJQ2R6WTJGc1pTZ3lLU2M3WEc0Z0lGeHVJQ0FnSUNBZ0x5OGdSbXhwY0NCMGFHVWdjMk5oYkdWa0lITjBZWFJsWEc0Z0lDQWdJQ0J6WTJGc1pXUWdQU0FoYzJOaGJHVmtPMXh1SUNBZ0lIMWNiaUFnWEc0Z0lDQWdMeThnVEdsemRHVnVJR1p2Y2lCamJHbGphM01nYjI0Z2RHaGxJR0oxZEhSdmJseHVJQ0FnSUdKMGJpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lIUnZaMmRzWlNrN1hHNGdJSDFjYmlBZ1hHNGdJSEpsZEhWeWJpQjdJR2x1YVhRZ2ZWeHVmU2tvS1Z4dVhHNHZMeUJsWjJjdWFXNXBkQ2dwWEc1Y2JpOHZJQ29nUkU5TklHMWhibWx3ZFd4aGRHbHZiaUJzYVdKeVlYSnBaWE1nZEdoaGRDQmhaR1FnWTI5dWRHVnVkQ0IwYnlCMGFHVWdWVWxjYmk4dklIVnpkV0ZzYkhrZ2RHRnJaU0J2Ym1VZ2IyWWdkSGR2SUdGd2NISnZZV05vWlhNNlhHNHZMeUF4TGlCSmJtcGxZM1FnYVhRZ2IyNGdhVzV6ZEdGdWRHbGhkR2x2Ymx4dUx5OGdNaTRnU0dGMlpTQmhiaUJsZUhCc2FXTnBkQ0JwYm1sMEtDa2diV1YwYUc5a1hHNWNiaTh2SUNvZ1QyNWxJRzltSUhSb1pTQjFibWx4ZFdVZ1kyaGhiR3hsYm1kbGN5QjNhWFJvSUhSb1pTQmpiMjV6ZEhKMVkzUnZjaUJ3WVhSMFpYSnVJR0Z1WkNCRVQwMWNiaTh2SUNvZ2JXRnVhWEIxYkdGMGFXOXVJR3hwWW5KaGNtbGxjeUJwY3lCMGFHRjBJSFJvWlNCallXeHNZbUZqYXlCbWRXNWpkR2x2YmlCcGJpQjBhR1VnWEc0dkx5QXFJR1YyWlc1MElHeHBjM1JsYm1WeUlHNWxaV1J6SUhSdklHdHViM2NnYzI5dFpTQjFibWx4ZFdVZ2NISnZjR1Z5ZEdsbGN5Qm1jbTl0SUdWaFkyZ2dYRzR2THlBcUlITndaV05wWm1saklHbHVjM1JoYm1ObFhHNWNiaTh2SUNvZ1FXUmtJR0VnY0hWaWJHbGpJSFJ2WjJkc1pTZ3BJRzFsZEdodlpGeHVYRzR2THlBcUlFUmxjM1J5YjNscGJtY2dZVzRnYVc1emRHRnVkR2xoZEdsdmJseHVMeThnTVM0Z1ZHaHBjeUIwZVhCcFkyRnNiSGtnYVc1MmIyeDJaWE1nY21WdGIzWnBibWNnWVc1NUlHRmtaR1ZrSUVSUFRWeHVMeThnSUNBZ1pXeGxiV1Z1ZEhNZ1lXNWtJSE4wYjNCd2FXNW5JR0Z1ZVNCbGRtVnVkQ0JzYVhOMFpXNWxjbk11SUZ4dUx5OGdNaTRnUVNCamIyMXRiMjRnWTI5dWRtVnVkR2x2YmlCcGN5QjBieUJsZUhCdmMyVWdZU0JrWlhOMGNtOTVLQ2tnYldWMGFHOWtJSFJ2SUdSdklIUm9ZWFF1WEc0dkx5QXpMaUJTWlcxdmRtVWdZVzRnWlhabGJuUWdiR2x6ZEdWdVpYSWdZMkZzYkdKaFkyc2dhVzF0WldScFlYUmxiSGxjYmx4dWJHVjBJRVZuWnlBOUlDaG1kVzVqZEdsdmJpQW9LU0I3WEc1Y2JpQWdZMjl1YzNRZ1pHVm1ZWFZzZEhNZ1BTQjdYRzRnSUNBZ2JHRmlaV3c2SUNkamJHbGpheUJ0WlNjc1hHNGdJQ0FnWW5SdVZHVjRkRG9nSi9DZnBab25MRnh1SUNBZ0lIUnlZVzV6YVhScGIyNDZJQ2QwY21GdWMyWnZjbTBnTXpBd2JYTWdaV0Z6WlMxcGJpY3NYRzRnSUNBZ2MyTmhiR1U2SUNjeUoxeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM0psWVhSbFFuUnVJQ2hsYkdWdExDQnpaWFIwYVc1bmN5a2dlMXh1SUNBZ0lHeGxkQ0JpZEc0Z1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0NkaWRYUjBiMjRuS1R0Y2JpQWdJQ0JpZEc0dWFXNXVaWEpJVkUxTUlEMGdjMlYwZEdsdVozTXVZblJ1VkdWNGREdGNibHh1SUNBZ0lHbG1JQ2h6WlhSMGFXNW5jeTVzWVdKbGJDa2dlMXh1SUNBZ0lDQWdZblJ1TG5ObGRFRjBkSEpwWW5WMFpTZ25ZWEpwWVMxc1lXSmxiQ2NzSUhObGRIUnBibWR6TG14aFltVnNLVHRjYmlBZ0lDQjlYRzRnSUNBZ2FXWWdLSE5sZEhScGJtZHpMblJ5WVc1emFYUnBiMjRwSUh0Y2JpQWdJQ0FnSUdKMGJpNXpkSGxzWlM1MGNtRnVjMmwwYVc5dUlEMGdjMlYwZEdsdVozTXVkSEpoYm5OcGRHbHZianRjYmlBZ0lDQjlYRzVjYmlBZ0lDQmxiR1Z0TG1Gd2NHVnVaQ2hpZEc0cE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUdKMGJseHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdkRzluWjJ4bFFuUnVJQ2hwYm5OMFlXNWpaU2tnZTF4dUlDQWdJQzh2SUVsbUlIUm9aU0JpZFhSMGIyNGdhWE1nYzJOaGJHVmtMQ0J6YUhKcGJtc2dhWFJjYmlBZ0lDQXZMeUJQZEdobGNuZHBjMlVzSUdkeWIzY2dhWFJjYmlBZ0lDQnBibk4wWVc1alpTNWZZblJ1TG5OMGVXeGxMblJ5WVc1elptOXliU0E5SUdsdWMzUmhibU5sTGw5elkyRnNaV1FnUHlBbkp5QTZJR0J6WTJGc1pTZ2tlMmx1YzNSaGJtTmxMbDl6WlhSMGFXNW5jeTV6WTJGc1pYMHBZRHRjYmx4dUlDQWdJQzh2SUVac2FYQWdkR2hsSUhOallXeGxaQ0J6ZEdGMFpWeHVJQ0FnSUdsdWMzUmhibU5sTGw5elkyRnNaV1FnUFNBaGFXNXpkR0Z1WTJVdVgzTmpZV3hsWkR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHTnlaV0YwWlVWMlpXNTBUR2x6ZEdWdVpYSW9ZblJ1TENCcGJuTjBZVzVqWlNrZ2UxeHVJQ0FnSUdaMWJtTjBhVzl1SUhSdloyZHNaU2dwSUh0Y2JpQWdJQ0FnSUhSdloyZHNaVUowYmlocGJuTjBZVzVqWlNsY2JpQWdJQ0I5WEc0Z0lDQWdZblJ1TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJOc2FXTnJKeXdnZEc5bloyeGxLVnh1WEc0Z0lDQWdjbVYwZFhKdUlIUnZaMmRzWlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1EyOXVjM1J5ZFdOMGIzSWdLSE5sYkdWamRHOXlMQ0J2Y0hScGIyNXpJRDBnZTMwcElIdGNiaUFnSUNCamIyNXpkQ0JsYkdWdElEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loelpXeGxZM1J2Y2lrN1hHNWNiaUFnSUNCamIyNXpkQ0J6WlhSMGFXNW5jeUE5SUU5aWFtVmpkQzVoYzNOcFoyNG9lMzBzSUdSbFptRjFiSFJ6TENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0JQWW1wbFkzUXVabkpsWlhwbEtITmxkSFJwYm1kektUdGNibHh1SUNBZ0lHTnZibk4wSUdKMGJpQTlJR055WldGMFpVSjBiaWhsYkdWdExDQnpaWFIwYVc1bmN5azdYRzRnSUNBZ1hHNGdJQ0FnTHk4Z1EzSmxZWFJsSUhSb1pTQmxkbVZ1ZENCc2FYTjBaVzVsY2x4dUlDQWdJR052Ym5OMElHeHBjM1JsYm1WeUlEMGdZM0psWVhSbFJYWmxiblJNYVhOMFpXNWxjaWhpZEc0c0lIUm9hWE1wWEc1Y2JpQWdJQ0JQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEdsbGN5aDBhR2x6TENCN1hHNGdJQ0FnSUNCZlpXeGxiVG9nZXlCMllXeDFaVG9nWld4bGJTQjlMRnh1SUNBZ0lDQWdYM05sZEhScGJtZHpPaUI3ZG1Gc2RXVTZJSE5sZEhScGJtZHpmU3hjYmlBZ0lDQWdJRjlpZEc0NklIc2dkbUZzZFdVNklHSjBibjBzWEc0Z0lDQWdJQ0JmYkdsemRHVnVaWEk2SUhzZ2RtRnNkV1U2SUd4cGMzUmxibVZ5SUgwc1hHNGdJQ0FnSUNCZmMyTmhiR1ZrT2lCN0lIWmhiSFZsT2lCbVlXeHpaU3dnZDNKcGRHRmliR1U2SUhSeWRXVWdmVnh1SUNBZ0lIMHBYRzRnSUgxY2JseHVJQ0JEYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVdWRHOW5aMnhsSUQwZ1puVnVZM1JwYjI0Z0tDa2dleUFnWEc0Z0lDQWdkRzluWjJ4bFFuUnVLSFJvYVhNcFhHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dSR1Z6ZEhKdmVTQjBhR2x6SUdsdWMzUmhibU5sWEc0Z0lDQXFMMXh1WEc0Z0lFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaUzVrWlhOMGNtOTVJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUM4dklGSmxiVzkyWlNCMGFHVWdaWFpsYm5RZ2JHbHpkR1Z1WlhJZ2FXMXRaV1JwWVhSbGJIbGNiaUFnSUNCMGFHbHpMbDlpZEc0dWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQjBhR2x6TGw5c2FYTjBaVzVsY2lrN1hHNWNiaUFnSUNBdkx5QlNaVzF2ZG1VZ2RHaGxJR0oxZEhSdmJseHVJQ0FnSUhSb2FYTXVYMkowYmk1eVpXMXZkbVVvS1R0Y2JpQWdmVHRjYmx4dUlDQnlaWFIxY200Z1EyOXVjM1J5ZFdOMGIzSmNibjBwS0NsY2JseHVZMjl1YzNRZ1pXZG5NU0E5SUc1bGR5QkZaMmNvSnlObFoyY25LVnh1Wldkbk1TNTBiMmRuYkdVb0tWeHVZMjl1YzNRZ2NHRnlkSGtnUFNCdVpYY2dSV2RuS0NjamNHRnlkSGtuTENCN1hHNGdJR0owYmxSbGVIUTZJQ2Z3bjQ2Skp5eGNiaUFnYkdGaVpXdzZJR0JKZENkeklIQmhjblI1SUhScGJXVmdMRnh1SUNCelkyRnNaVG9nSnpNblhHNTlLVnh1WEc1d1lYSjBlUzVrWlhOMGNtOTVLQ2tpTENJdkx5QkliMjlyY3lBdElHbHVJSFJvWlNCbWIzSnRJRzltSUdOaGJHeGlZV05yY3lCaGJtUWdZM1Z6ZEc5dElHVjJaVzUwYzF4dUx5OGdSR1YyWld4dmNHVnljeUJqWVc0Z2RYTmxJSFJ2SUhKMWJpQmpiMlJsSUhkb1pXNGdjM0JsWTJsbWFXTWdkR2hwYm1kelhHNHZMeUJvWVhCd1pXNGdhVzRnZVc5MWNpQnNhV0p5WVhKNVhHNWNiaTh2SUNvZ1EyRnNiR0poWTJ0elhHNHZMeUF4TGlCQklHTmhiR3hpWVdOcklHbHpJR0VnWm5WdVkzUnBiMjRnZEdoaGRDQnlkVzV6SUdGMElHRWdjM0JsWTJsbWFXTWdkR2x0WlM1Y2JpOHZJREl1SUVsdUlIbHZkWElnYkdsaWNtRnllU3dnZVc5MUlHTmhiaUJzWlhRZ2RYTmxjbk1nY0dGemN5QmpZV3hzWW1GamExeHVMeThnSUNBZ1puVnVZM1JwYjI0Z2FXNGdZWE1nYjNCMGFXOXVjeTVjYmk4dklETXVJRmRvWlc0Z1lTQndZWEowYVdOMWJHRnlJR0ZqZEdsdmJpQm9ZWEJ3Wlc1eklHbHVJSGx2ZFhJZ2JHbGljbUZ5ZVN4Y2JpOHZJQ0FnSUhsdmRTQmpZVzRnY25WdUlIUm9aU0JqWVd4c1ltRmpheUJtZFc1amRHbHZiaTVjYmk4dklEUXVJRmx2ZFNCallXNGdaWFpsYmlCd1lYTnpJR2x1SUdGeVozVnRaVzUwY3lCMGFHRjBJR1JsZG1Wc2IzQmxjbk1nWTJGdVhHNHZMeUF1SUNCMWMyVWdkRzhnWVdOalpYTnpJR2x1Wm05eWJXRjBhVzl1SUdGaWIzVjBJSFJvWlNCamRYSnlaVzUwWEc0dkx5QXVJQ0JwYm5OMFlXNTBhV0YwYVc5dUlHbHVJSFJvWldseUlHTmhiR3hpWVdOckxpQmNibHh1WEc0dkx5QXFJRU4xYzNSdmJTQkZkbVZ1ZEhOY2JpOHZJRWx1YzNSbFlXUWdiMllnY0dGa1pHbHVaeUJwYmlCaElHTmhiR3hpWVdOcklHWjFibU4wYVc5dUxDQjViM1VnWTJGdVhHNHZMeUJoYkhSbGNtNWhkR2wyWld4NUlHVnRhWFFnWVNCamRYTjBiMjBnWlhabGJuUWdkR2hoZENCa1pYWmxiRzl3WlhKeklGeHVMeThnWTJGdUlHeHBjM1JsYmlCbWIzSWdkMmwwYUNCMGFHVWdZRVZzWlcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ3BZQ0J0WlhSb2IyUXVYRzVjYmk4dklGUm9aU0JnUTNWemRHOXRSWFpsYm5Rb0tXQWdiMkpxWldOMElIQnliM1pwWkdWeklHRWdkMkY1SUhSdklHTnlaV0YwWlNCaGJtUWdaVzFwZEZ4dUx5OGdZM1Z6ZEc5dElHVjJaVzUwY3l3Z1lYTWdkMlZzYkNCaGN5QndZWE56SUdsdUlHTjFjM1J2YlNCbGRtVnVkQ0JrWlhSaGFXeHpMbHh1WEc0aUxDSnBiWEJ2Y25RZ1NHVmhaSEp2YjIwZ1puSnZiU0FuYUdWaFpISnZiMjB1YW5Nbk8xeHVYRzVqYjI1emRDQm9aV0ZrWlhJZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Nkb1pXRmtaWEluS1R0Y2JtTnZibk4wSUdobFlXUnliMjl0SUQwZ2JtVjNJRWhsWVdSeWIyOXRLR2hsWVdSbGNpazdYRzVvWldGa2NtOXZiUzVwYm1sMEtDazdYRzVvWldGa2NtOXZiUzUwYjNBb0tUc2lYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjkifQ==
