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

  const Constructor = function(name, options = {}) {
    const settings = Object.assign({}, defaults, options)

    Object.freeze(settings)

    Object.defineProperties(this, {
      _name: { value: name },
      _settings: { value: settings }
    })
  } 
  Constructor.prototype.sayHi = function () {
    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${this._settings.hiBefore} ${this._name} ${this._settings.hiAfter}`
    )

    this._settings.onHi(this._name, this._settings.hiBefore, this._settings.hiAfter)
    return this
  }

  Constructor.prototype.sayBye = function () {
    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${this._settings.byeBefore} ${this._name} ${this._settings.byeAfter}`
    )
    
    this._settings.onBye(this._name, this._settings.byeBefore, this._settings.byeAfter);
    return this
  }

  return Constructor
})()

const merlin = new Greeting('Merlin', {
  hiAfter: '.',
  onBye: function(name) {
    const app = document.querySelector('.bye-text')
    app.textContent = `👋 ${name}`;
  }
});

// console.log(merlin.name)
// console.log(merlin.settings)

let form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.reset();
    merlin.sayBye();
});

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hlYWRyb29tLmpzL2Rpc3QvaGVhZHJvb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kb20tbWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9ob29rcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsU0FDc0Q7QUFDeEQsQ0FBQyxvQkFBb0I7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFdBQVc7QUFDeEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpREFBaUQ7QUFDaEU7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNwYkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUyxrQkFBa0IsR0FBRyxnQ0FBZ0MsR0FBRyxpQkFBaUI7QUFDbEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixTQUFTLG1CQUFtQixHQUFHLGdDQUFnQyxHQUFHLGtCQUFrQjtBQUNwRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQSxpREFBaUQ7QUFDakQscUNBQXFDOztBQUVyQzs7QUFFQTtBQUNBLGNBQWMsY0FBYztBQUM1QixrQkFBa0I7QUFDbEIsS0FBSztBQUNMLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUyx3QkFBd0IsR0FBRyxXQUFXLEdBQUcsdUJBQXVCO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUyx5QkFBeUIsR0FBRyxXQUFXLEdBQUcsd0JBQXdCO0FBQzNFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsS0FBSztBQUNqQztBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQzlHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLHlCQUF5Qjs7QUFFOUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEM7QUFDOUM7O0FBRUEscUNBQXFDO0FBQ3JDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLGNBQWM7QUFDNUIsa0JBQWtCLGdCQUFnQjtBQUNsQyxhQUFhLFlBQVk7QUFDekIsa0JBQWtCLGtCQUFrQjtBQUNwQyxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMOztBQUVBLDhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxlOzs7Ozs7Ozs7OztBQzdKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBQTtBQUFtQzs7QUFFbkM7QUFDQSxxQkFBcUIsa0RBQVE7QUFDN0I7QUFDQSxlIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKiFcbiAqIGhlYWRyb29tLmpzIHYwLjEyLjAgLSBHaXZlIHlvdXIgcGFnZSBzb21lIGhlYWRyb29tLiBIaWRlIHlvdXIgaGVhZGVyIHVudGlsIHlvdSBuZWVkIGl0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgTmljayBXaWxsaWFtcyAtIGh0dHA6Ly93aWNreS5uaWxsaWEubXMvaGVhZHJvb20uanNcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuSGVhZHJvb20gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBpc0Jyb3dzZXIoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgYnJvd3NlciBzdXBwb3J0IGZvciBhZGRpbmcgYW4gZXZlbnQgbGlzdGVuZXIgd2l0aCBvcHRpb25zXG4gICAqIENyZWRpdDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXJcbiAgICovXG4gIGZ1bmN0aW9uIHBhc3NpdmVFdmVudHNTdXBwb3J0ZWQoKSB7XG4gICAgdmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2V0dGVyLXJldHVyblxuICAgICAgICBnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIGlzQnJvd3NlcigpICYmXG4gICAgICBmdW5jdGlvbigpIHt9LmJpbmQgJiZcbiAgICAgIFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmXG4gICAgICBPYmplY3QuYXNzaWduICYmXG4gICAgICBPYmplY3Qua2V5cyAmJlxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIG9iai5ub2RlVHlwZSA9PT0gOTsgLy8gTm9kZS5ET0NVTUVOVF9OT0RFID09PSA5XG4gIH1cblxuICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopIHtcbiAgICAvLyBgb2JqID09PSB3aW5kb3dgIG9yIGBvYmogaW5zdGFuY2VvZiBXaW5kb3dgIGlzIG5vdCBzdWZmaWNpZW50LFxuICAgIC8vIGFzIHRoZSBvYmogbWF5IGJlIHRoZSB3aW5kb3cgb2YgYW4gaWZyYW1lLlxuICAgIHJldHVybiBvYmogJiYgb2JqLmRvY3VtZW50ICYmIGlzRG9jdW1lbnQob2JqLmRvY3VtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdpbmRvd1Njcm9sbGVyKHdpbikge1xuICAgIHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG4gICAgdmFyIGJvZHkgPSBkb2MuYm9keTtcbiAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBAc2VlIGh0dHA6Ly9qYW1lcy5wYWRvbHNleS5jb20vamF2YXNjcmlwdC9nZXQtZG9jdW1lbnQtaGVpZ2h0LWNyb3NzLWJyb3dzZXIvXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBzY3JvbGwgaGVpZ2h0IG9mIHRoZSBkb2N1bWVudCBpbiBwaXhlbHNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsSGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAgIGJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGh0bWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGh0bWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGJvZHkuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIGh0bWwuY2xpZW50SGVpZ2h0XG4gICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBzZWUgaHR0cDovL2FuZHlsYW5ndG9uLmNvLnVrL2Jsb2cvZGV2ZWxvcG1lbnQvZ2V0LXZpZXdwb3J0LXNpemUtd2lkdGgtYW5kLWhlaWdodC1qYXZhc2NyaXB0XG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIHZpZXdwb3J0IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gd2luLmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0IHx8IGJvZHkuY2xpZW50SGVpZ2h0O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXRzIHRoZSBZIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSBwaXhlbHMgdGhlIHBhZ2UgaGFzIHNjcm9sbGVkIGFsb25nIHRoZSBZLWF4aXNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsWTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW4ucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGh0bWwgfHwgYm9keS5wYXJlbnROb2RlIHx8IGJvZHkpLnNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZWxlbWVudFNjcm9sbGVyKGVsZW1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBzY3JvbGwgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBzY3JvbGxIZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoZWxlbWVudC5vZmZzZXRIZWlnaHQsIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogR2V0cyB0aGUgWSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gcGl4ZWxzIHRoZSBlbGVtZW50IGhhcyBzY3JvbGxlZCBhbG9uZyB0aGUgWS1heGlzXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbFk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNjcm9sbGVyKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNXaW5kb3coZWxlbWVudCkgPyB3aW5kb3dTY3JvbGxlcihlbGVtZW50KSA6IGVsZW1lbnRTY3JvbGxlcihlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZWxlbWVudCBFdmVudFRhcmdldFxuICAgKi9cbiAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgaXNQYXNzaXZlU3VwcG9ydGVkID0gcGFzc2l2ZUV2ZW50c1N1cHBvcnRlZCgpO1xuICAgIHZhciByYWZJZDtcbiAgICB2YXIgc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICB2YXIgc2Nyb2xsZXIgPSBjcmVhdGVTY3JvbGxlcihlbGVtZW50KTtcbiAgICB2YXIgbGFzdFNjcm9sbFkgPSBzY3JvbGxlci5zY3JvbGxZKCk7XG4gICAgdmFyIGRldGFpbHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzY3JvbGxZID0gTWF0aC5yb3VuZChzY3JvbGxlci5zY3JvbGxZKCkpO1xuICAgICAgdmFyIGhlaWdodCA9IHNjcm9sbGVyLmhlaWdodCgpO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbGVyLnNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAvLyByZXVzZSBvYmplY3QgZm9yIGxlc3MgbWVtb3J5IGNodXJuXG4gICAgICBkZXRhaWxzLnNjcm9sbFkgPSBzY3JvbGxZO1xuICAgICAgZGV0YWlscy5sYXN0U2Nyb2xsWSA9IGxhc3RTY3JvbGxZO1xuICAgICAgZGV0YWlscy5kaXJlY3Rpb24gPSBzY3JvbGxZID4gbGFzdFNjcm9sbFkgPyBcImRvd25cIiA6IFwidXBcIjtcbiAgICAgIGRldGFpbHMuZGlzdGFuY2UgPSBNYXRoLmFicyhzY3JvbGxZIC0gbGFzdFNjcm9sbFkpO1xuICAgICAgZGV0YWlscy5pc091dE9mQm91bmRzID0gc2Nyb2xsWSA8IDAgfHwgc2Nyb2xsWSArIGhlaWdodCA+IHNjcm9sbEhlaWdodDtcbiAgICAgIGRldGFpbHMudG9wID0gc2Nyb2xsWSA8PSBvcHRpb25zLm9mZnNldFtkZXRhaWxzLmRpcmVjdGlvbl07XG4gICAgICBkZXRhaWxzLmJvdHRvbSA9IHNjcm9sbFkgKyBoZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0O1xuICAgICAgZGV0YWlscy50b2xlcmFuY2VFeGNlZWRlZCA9XG4gICAgICAgIGRldGFpbHMuZGlzdGFuY2UgPiBvcHRpb25zLnRvbGVyYW5jZVtkZXRhaWxzLmRpcmVjdGlvbl07XG5cbiAgICAgIGNhbGxiYWNrKGRldGFpbHMpO1xuXG4gICAgICBsYXN0U2Nyb2xsWSA9IHNjcm9sbFk7XG4gICAgICBzY3JvbGxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAgIGlmICghc2Nyb2xsZWQpIHtcbiAgICAgICAgc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBldmVudE9wdGlvbnMgPSBpc1Bhc3NpdmVTdXBwb3J0ZWRcbiAgICAgID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9XG4gICAgICA6IGZhbHNlO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCwgZXZlbnRPcHRpb25zKTtcbiAgICB1cGRhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsLCBldmVudE9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVVcERvd24odCkge1xuICAgIHJldHVybiB0ID09PSBPYmplY3QodCkgPyB0IDogeyBkb3duOiB0LCB1cDogdCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVJIGVuaGFuY2VtZW50IGZvciBmaXhlZCBoZWFkZXJzLlxuICAgKiBIaWRlcyBoZWFkZXIgd2hlbiBzY3JvbGxpbmcgZG93blxuICAgKiBTaG93cyBoZWFkZXIgd2hlbiBzY3JvbGxpbmcgdXBcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbSB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIHdpZGdldFxuICAgKi9cbiAgZnVuY3Rpb24gSGVhZHJvb20oZWxlbSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgSGVhZHJvb20ub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc2VzID0gT2JqZWN0LmFzc2lnbih7fSwgSGVhZHJvb20ub3B0aW9ucy5jbGFzc2VzLCBvcHRpb25zLmNsYXNzZXMpO1xuXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLnRvbGVyYW5jZSA9IG5vcm1hbGl6ZVVwRG93bih0aGlzLnRvbGVyYW5jZSk7XG4gICAgdGhpcy5vZmZzZXQgPSBub3JtYWxpemVVcERvd24odGhpcy5vZmZzZXQpO1xuICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xuICB9XG4gIEhlYWRyb29tLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogSGVhZHJvb20sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gc2Nyb2xsaW5nXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKEhlYWRyb29tLmN1dHNUaGVNdXN0YXJkICYmICF0aGlzLmluaXRpYWxpc2VkKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJpbml0aWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBkZWZlciBldmVudCByZWdpc3RyYXRpb24gdG8gaGFuZGxlIGJyb3dzZXJcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgcmVzdG9yaW5nIHByZXZpb3VzIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgIGZ1bmN0aW9uKHNlbGYpIHtcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsVHJhY2tlciA9IHRyYWNrU2Nyb2xsKFxuICAgICAgICAgICAgICBzZWxmLnNjcm9sbGVyLFxuICAgICAgICAgICAgICB7IG9mZnNldDogc2VsZi5vZmZzZXQsIHRvbGVyYW5jZTogc2VsZi50b2xlcmFuY2UgfSxcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGUuYmluZChzZWxmKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMCxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSB3aWRnZXQsIGNsZWFyaW5nIHVwIGFmdGVyIGl0c2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2xhc3NlcykuZm9yRWFjaCh0aGlzLnJlbW92ZUNsYXNzLCB0aGlzKTtcbiAgICAgIHRoaXMuc2Nyb2xsVHJhY2tlci5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVucGluIHRoZSBlbGVtZW50XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVucGluOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhhc0NsYXNzKFwicGlubmVkXCIpIHx8ICF0aGlzLmhhc0NsYXNzKFwidW5waW5uZWRcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInVucGlubmVkXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwicGlubmVkXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uVW5waW4pIHtcbiAgICAgICAgICB0aGlzLm9uVW5waW4uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQaW4gdGhlIGVsZW1lbnRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcGluOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhhc0NsYXNzKFwidW5waW5uZWRcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInBpbm5lZFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInVucGlubmVkXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uUGluKSB7XG4gICAgICAgICAgdGhpcy5vblBpbi5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZyZWV6ZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHdpZGdldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBmcmVlemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5mcm96ZW4gPSB0cnVlO1xuICAgICAgdGhpcy5hZGRDbGFzcyhcImZyb3plblwiKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmUtZW5hYmxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgdGhlIHdpZGdldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmZyZWV6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcImZyb3plblwiKTtcbiAgICB9LFxuXG4gICAgdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcInRvcFwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwidG9wXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwibm90VG9wXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uVG9wKSB7XG4gICAgICAgICAgdGhpcy5vblRvcC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG5vdFRvcDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoXCJub3RUb3BcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vdFRvcFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInRvcFwiKTtcblxuICAgICAgICBpZiAodGhpcy5vbk5vdFRvcCkge1xuICAgICAgICAgIHRoaXMub25Ob3RUb3AuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKFwiYm90dG9tXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJib3R0b21cIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJub3RCb3R0b21cIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25Cb3R0b20pIHtcbiAgICAgICAgICB0aGlzLm9uQm90dG9tLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbm90Qm90dG9tOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcIm5vdEJvdHRvbVwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwibm90Qm90dG9tXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwiYm90dG9tXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uTm90Qm90dG9tKSB7XG4gICAgICAgICAgdGhpcy5vbk5vdEJvdHRvbS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3VsZFVucGluOiBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICB2YXIgc2Nyb2xsaW5nRG93biA9IGRldGFpbHMuZGlyZWN0aW9uID09PSBcImRvd25cIjtcblxuICAgICAgcmV0dXJuIHNjcm9sbGluZ0Rvd24gJiYgIWRldGFpbHMudG9wICYmIGRldGFpbHMudG9sZXJhbmNlRXhjZWVkZWQ7XG4gICAgfSxcblxuICAgIHNob3VsZFBpbjogZnVuY3Rpb24oZGV0YWlscykge1xuICAgICAgdmFyIHNjcm9sbGluZ1VwID0gZGV0YWlscy5kaXJlY3Rpb24gPT09IFwidXBcIjtcblxuICAgICAgcmV0dXJuIChzY3JvbGxpbmdVcCAmJiBkZXRhaWxzLnRvbGVyYW5jZUV4Y2VlZGVkKSB8fCBkZXRhaWxzLnRvcDtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQuYXBwbHkoXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QsXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUuYXBwbHkoXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QsXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKS5ldmVyeShmdW5jdGlvbihjbHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNscyk7XG4gICAgICB9LCB0aGlzLmVsZW0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGRldGFpbHMpIHtcbiAgICAgIGlmIChkZXRhaWxzLmlzT3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgLy8gSWdub3JlIGJvdW5jeSBzY3JvbGxpbmcgaW4gT1NYXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZnJvemVuID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRldGFpbHMudG9wKSB7XG4gICAgICAgIHRoaXMudG9wKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdFRvcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGV0YWlscy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90Qm90dG9tKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNob3VsZFVucGluKGRldGFpbHMpKSB7XG4gICAgICAgIHRoaXMudW5waW4oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG91bGRQaW4oZGV0YWlscykpIHtcbiAgICAgICAgdGhpcy5waW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgb3B0aW9uc1xuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgSGVhZHJvb20ub3B0aW9ucyA9IHtcbiAgICB0b2xlcmFuY2U6IHtcbiAgICAgIHVwOiAwLFxuICAgICAgZG93bjogMFxuICAgIH0sXG4gICAgb2Zmc2V0OiAwLFxuICAgIHNjcm9sbGVyOiBpc0Jyb3dzZXIoKSA/IHdpbmRvdyA6IG51bGwsXG4gICAgY2xhc3Nlczoge1xuICAgICAgZnJvemVuOiBcImhlYWRyb29tLS1mcm96ZW5cIixcbiAgICAgIHBpbm5lZDogXCJoZWFkcm9vbS0tcGlubmVkXCIsXG4gICAgICB1bnBpbm5lZDogXCJoZWFkcm9vbS0tdW5waW5uZWRcIixcbiAgICAgIHRvcDogXCJoZWFkcm9vbS0tdG9wXCIsXG4gICAgICBub3RUb3A6IFwiaGVhZHJvb20tLW5vdC10b3BcIixcbiAgICAgIGJvdHRvbTogXCJoZWFkcm9vbS0tYm90dG9tXCIsXG4gICAgICBub3RCb3R0b206IFwiaGVhZHJvb20tLW5vdC1ib3R0b21cIixcbiAgICAgIGluaXRpYWw6IFwiaGVhZHJvb21cIlxuICAgIH1cbiAgfTtcblxuICBIZWFkcm9vbS5jdXRzVGhlTXVzdGFyZCA9IGlzU3VwcG9ydGVkKCk7XG5cbiAgcmV0dXJuIEhlYWRyb29tO1xuXG59KSk7XG4iLCJsZXQgZ3JlZXRpbmdzID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHNldHRpbmdzID0ge1xuICAgIGdyZWV0aW5nOiAneW91JyxcbiAgICBoaUJlZm9yZTogJ0hleW8nLFxuICAgIGhpQWZ0ZXI6ICcnLFxuICAgIGJ5ZUJlZm9yZTogJ1NlZSB5YSBsYXRlcicsXG4gICAgYnllQWZ0ZXI6ICdUYWtlIGl0IGVhc3kuJyAgXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTZXR0aW5ncyAob3B0aW9ucyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzZXR0aW5ncywgb3B0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIHNheUhpIChuYW1lKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAnJWMlcycsIFxuICAgICAgJ2NvbG9yOiBwaW5rO2ZvbnQtc2l6ZTogMjVweCcsIFxuICAgICAgYCR7c2V0dGluZ3MuaGlCZWZvcmV9ICR7bmFtZSA/IG5hbWUgOiBzZXR0aW5ncy5ncmVldGluZ30gJHtzZXR0aW5ncy5oaUFmdGVyfWBcbiAgICApXG4gICAgcmV0dXJuIFxuICB9XG5cbiAgZnVuY3Rpb24gc2F5QnllIChuYW1lKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAnJWMlcycsIFxuICAgICAgJ2NvbG9yOiBwaW5rO2ZvbnQtc2l6ZTogMjVweCcsIFxuICAgICAgYCR7c2V0dGluZ3MuYnllQmVmb3JlfSAke25hbWUgPyBuYW1lIDogc2V0dGluZ3MuZ3JlZXRpbmd9ICR7c2V0dGluZ3MuYnllQWZ0ZXJ9YFxuICAgIClcblxuICAgIHJldHVybiBcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlU2V0dGluZ3MsXG4gICAgc2F5SGksXG4gICAgc2F5QnllICAgIFxuICB9XG59KSgpXG5cbi8vIGdyZWV0aW5ncy51cGRhdGVTZXR0aW5ncyh7XG4vLyAgIGdyZWV0aW5nczogJ3dvcmxkJ1xuLy8gfSlcblxuLy8gZ3JlZXRpbmdzLnNheUhpKCdtZXJsaW4nKTtcbi8vIGdyZWV0aW5ncy5zYXlCeWUoJ21vcmdhbicpO1xuXG5sZXQgR3JlZXRpbmcgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBncmVldGluZzogJ3lvdScsXG4gICAgaGlCZWZvcmU6ICdIZXlvJyxcbiAgICBoaUFmdGVyOiAnJyxcbiAgICBieWVCZWZvcmU6ICdTZWUgeWEgbGF0ZXInLFxuICAgIGJ5ZUFmdGVyOiAnVGFrZSBpdCBlYXN5LicsXG5cbiAgICAvLyBjYWxsYmFja3NcbiAgICBvbkhpOiBmdW5jdGlvbiAoKSB7fSxcbiAgICBvbkJ5ZTogZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIGNvbnN0IENvbnN0cnVjdG9yID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucylcblxuICAgIE9iamVjdC5mcmVlemUoc2V0dGluZ3MpXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfbmFtZTogeyB2YWx1ZTogbmFtZSB9LFxuICAgICAgX3NldHRpbmdzOiB7IHZhbHVlOiBzZXR0aW5ncyB9XG4gICAgfSlcbiAgfSBcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnNheUhpID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3RoaXMuX3NldHRpbmdzLmhpQmVmb3JlfSAke3RoaXMuX25hbWV9ICR7dGhpcy5fc2V0dGluZ3MuaGlBZnRlcn1gXG4gICAgKVxuXG4gICAgdGhpcy5fc2V0dGluZ3Mub25IaSh0aGlzLl9uYW1lLCB0aGlzLl9zZXR0aW5ncy5oaUJlZm9yZSwgdGhpcy5fc2V0dGluZ3MuaGlBZnRlcilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnNheUJ5ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICclYyVzJywgXG4gICAgICAnY29sb3I6IHBpbms7Zm9udC1zaXplOiAyNXB4JywgXG4gICAgICBgJHt0aGlzLl9zZXR0aW5ncy5ieWVCZWZvcmV9ICR7dGhpcy5fbmFtZX0gJHt0aGlzLl9zZXR0aW5ncy5ieWVBZnRlcn1gXG4gICAgKVxuICAgIFxuICAgIHRoaXMuX3NldHRpbmdzLm9uQnllKHRoaXMuX25hbWUsIHRoaXMuX3NldHRpbmdzLmJ5ZUJlZm9yZSwgdGhpcy5fc2V0dGluZ3MuYnllQWZ0ZXIpO1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZXR1cm4gQ29uc3RydWN0b3Jcbn0pKClcblxuY29uc3QgbWVybGluID0gbmV3IEdyZWV0aW5nKCdNZXJsaW4nLCB7XG4gIGhpQWZ0ZXI6ICcuJyxcbiAgb25CeWU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnllLXRleHQnKVxuICAgIGFwcC50ZXh0Q29udGVudCA9IGDwn5GLICR7bmFtZX1gO1xuICB9XG59KTtcblxuLy8gY29uc29sZS5sb2cobWVybGluLm5hbWUpXG4vLyBjb25zb2xlLmxvZyhtZXJsaW4uc2V0dGluZ3MpXG5cbmxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBtZXJsaW4uc2F5QnllKCk7XG59KTsiLCIvKipcbiogKiBET00gTWFuaXB1bGF0aW9uIExJYnJhcmllc1xuKiAxLiBodHRwczovL3Njcm9sbHJldmVhbGpzLm9yZy9cbiogMi4gaHR0cHM6Ly9waG90b3N3aXBlLmNvbS9cbiogKiBET00gbWFuaXB1bGF0aW9uIGxpYnJhcmllcyBoYXZlIHNvbWUgdW5pcXVlIGNvbnNpZGVyYXRpb25zIGNvbXBhcmVkIHRvIHV0aWxpdHkgbGlicmFyaWVzLlxuKiAqIEhvdyBjYW4gd2UgY29udmVydCB0aGlzIGludG8gYSBsaWJyYXJ5XG4qIDEuIEluamVjdGluZyBjb250ZW50IGludG8gdGhlIERPTVxuKiAyLiBMaXN0ZW5pbmcgZm9yIGV2ZW50c1xuKiAzLiBBZGRpbmcgb3B0aW9ucyBhbmQgc2V0dGluZ3NcbiogNC4gRXhwb3NpbmcgcHVibGljIG1ldGhvZHNcbiogNS4gRGVzdHJveWluZyB0aGUgaW5zdGFudGlhdGlvblxuICovXG5cbmNvbnN0IGVnZyA9IChmdW5jdGlvbigpIHtcbiAgLy8gR2V0IHRoZSBlbGVtZW50XG4gIGNvbnN0IGluaXQgPSAgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWdnJyk7XG4gICAgbGV0IHNjYWxlZCA9IGZhbHNlO1xuICBcbiAgICAvLyBDcmVhdGUgYnV0dG9uXG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ0bi5pbm5lckhUTUwgPSAn8J+lmic7XG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGBjbGljayBtZWApO1xuICAgIGJ0bi5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAzMDBtcyBlYXNlLWluJztcbiAgXG4gICAgLy8gSW5qZWN0IGludG8gdGhlIERPTVxuICAgIGVsZW0uYXBwZW5kKGJ0bik7XG4gIFxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGljayBldmVudHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b2dnbGUgKCkge1xuICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBzY2FsZWQsIHNocmluayBpdFxuICAgICAgLy8gT3RoZXJ3aXNlLCBncm93IGl0XG4gICAgICBidG4uc3R5bGUudHJhbnNmb3JtID0gc2NhbGVkID8gJycgOiAnc2NhbGUoMiknO1xuICBcbiAgICAgIC8vIEZsaXAgdGhlIHNjYWxlZCBzdGF0ZVxuICAgICAgc2NhbGVkID0gIXNjYWxlZDtcbiAgICB9XG4gIFxuICAgIC8vIExpc3RlbiBmb3IgY2xpY2tzIG9uIHRoZSBidXR0b25cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGUpO1xuICB9XG4gIFxuICByZXR1cm4geyBpbml0IH1cbn0pKClcblxuLy8gZWdnLmluaXQoKVxuXG4vLyAqIERPTSBtYW5pcHVsYXRpb24gbGlicmFyaWVzIHRoYXQgYWRkIGNvbnRlbnQgdG8gdGhlIFVJXG4vLyB1c3VhbGx5IHRha2Ugb25lIG9mIHR3byBhcHByb2FjaGVzOlxuLy8gMS4gSW5qZWN0IGl0IG9uIGluc3RhbnRpYXRpb25cbi8vIDIuIEhhdmUgYW4gZXhwbGljaXQgaW5pdCgpIG1ldGhvZFxuXG4vLyAqIE9uZSBvZiB0aGUgdW5pcXVlIGNoYWxsZW5nZXMgd2l0aCB0aGUgY29uc3RydWN0b3IgcGF0dGVybiBhbmQgRE9NXG4vLyAqIG1hbmlwdWxhdGlvbiBsaWJyYXJpZXMgaXMgdGhhdCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaW4gdGhlIFxuLy8gKiBldmVudCBsaXN0ZW5lciBuZWVkcyB0byBrbm93IHNvbWUgdW5pcXVlIHByb3BlcnRpZXMgZnJvbSBlYWNoIFxuLy8gKiBzcGVjaWZpYyBpbnN0YW5jZVxuXG4vLyAqIEFkZCBhIHB1YmxpYyB0b2dnbGUoKSBtZXRob2RcblxuLy8gKiBEZXN0cm95aW5nIGFuIGluc3RhbnRpYXRpb25cbi8vIDEuIFRoaXMgdHlwaWNhbGx5IGludm9sdmVzIHJlbW92aW5nIGFueSBhZGRlZCBET01cbi8vICAgIGVsZW1lbnRzIGFuZCBzdG9wcGluZyBhbnkgZXZlbnQgbGlzdGVuZXJzLiBcbi8vIDIuIEEgY29tbW9uIGNvbnZlbnRpb24gaXMgdG8gZXhwb3NlIGEgZGVzdHJveSgpIG1ldGhvZCB0byBkbyB0aGF0LlxuLy8gMy4gUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIGNhbGxiYWNrIGltbWVkaWF0ZWx5XG5cbmxldCBFZ2cgPSAoZnVuY3Rpb24gKCkge1xuXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGxhYmVsOiAnY2xpY2sgbWUnLFxuICAgIGJ0blRleHQ6ICfwn6WaJyxcbiAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDMwMG1zIGVhc2UtaW4nLFxuICAgIHNjYWxlOiAnMidcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUJ0biAoZWxlbSwgc2V0dGluZ3MpIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnRuLmlubmVySFRNTCA9IHNldHRpbmdzLmJ0blRleHQ7XG5cbiAgICBpZiAoc2V0dGluZ3MubGFiZWwpIHtcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBzZXR0aW5ncy5sYWJlbCk7XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy50cmFuc2l0aW9uKSB7XG4gICAgICBidG4uc3R5bGUudHJhbnNpdGlvbiA9IHNldHRpbmdzLnRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgZWxlbS5hcHBlbmQoYnRuKTtcblxuICAgIHJldHVybiBidG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUJ0biAoaW5zdGFuY2UpIHtcbiAgICAvLyBJZiB0aGUgYnV0dG9uIGlzIHNjYWxlZCwgc2hyaW5rIGl0XG4gICAgLy8gT3RoZXJ3aXNlLCBncm93IGl0XG4gICAgaW5zdGFuY2UuX2J0bi5zdHlsZS50cmFuc2Zvcm0gPSBpbnN0YW5jZS5fc2NhbGVkID8gJycgOiBgc2NhbGUoJHtpbnN0YW5jZS5fc2V0dGluZ3Muc2NhbGV9KWA7XG5cbiAgICAvLyBGbGlwIHRoZSBzY2FsZWQgc3RhdGVcbiAgICBpbnN0YW5jZS5fc2NhbGVkID0gIWluc3RhbmNlLl9zY2FsZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFdmVudExpc3RlbmVyKGJ0biwgaW5zdGFuY2UpIHtcbiAgICBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICB0b2dnbGVCdG4oaW5zdGFuY2UpXG4gICAgfVxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZSlcblxuICAgIHJldHVybiB0b2dnbGVcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnN0cnVjdG9yIChzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgT2JqZWN0LmZyZWV6ZShzZXR0aW5ncyk7XG5cbiAgICBjb25zdCBidG4gPSBjcmVhdGVCdG4oZWxlbSwgc2V0dGluZ3MpO1xuICAgIFxuICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICBjb25zdCBsaXN0ZW5lciA9IGNyZWF0ZUV2ZW50TGlzdGVuZXIoYnRuLCB0aGlzKVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgX2VsZW06IHsgdmFsdWU6IGVsZW0gfSxcbiAgICAgIF9zZXR0aW5nczoge3ZhbHVlOiBzZXR0aW5nc30sXG4gICAgICBfYnRuOiB7IHZhbHVlOiBidG59LFxuICAgICAgX2xpc3RlbmVyOiB7IHZhbHVlOiBsaXN0ZW5lciB9LFxuICAgICAgX3NjYWxlZDogeyB2YWx1ZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cbiAgICB9KVxuICB9XG5cbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHsgIFxuICAgIHRvZ2dsZUJ0bih0aGlzKVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhpcyBpbnN0YW5jZVxuICAgKi9cblxuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGltbWVkaWF0ZWx5XG4gICAgdGhpcy5fYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fbGlzdGVuZXIpO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBidXR0b25cbiAgICB0aGlzLl9idG4ucmVtb3ZlKCk7XG4gIH07XG5cbiAgcmV0dXJuIENvbnN0cnVjdG9yXG59KSgpXG5cbmNvbnN0IGVnZzEgPSBuZXcgRWdnKCcjZWdnJylcbmVnZzEudG9nZ2xlKClcbmNvbnN0IHBhcnR5ID0gbmV3IEVnZygnI3BhcnR5Jywge1xuICBidG5UZXh0OiAn8J+OiScsXG4gIGxhYmVsOiBgSXQncyBwYXJ0eSB0aW1lYCxcbiAgc2NhbGU6ICczJ1xufSlcblxucGFydHkuZGVzdHJveSgpIiwiLy8gSG9va3MgLSBpbiB0aGUgZm9ybSBvZiBjYWxsYmFja3MgYW5kIGN1c3RvbSBldmVudHNcbi8vIERldmVsb3BlcnMgY2FuIHVzZSB0byBydW4gY29kZSB3aGVuIHNwZWNpZmljIHRoaW5nc1xuLy8gaGFwcGVuIGluIHlvdXIgbGlicmFyeVxuXG4vLyAqIENhbGxiYWNrc1xuLy8gMS4gQSBjYWxsYmFjayBpcyBhIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCBhIHNwZWNpZmljIHRpbWUuXG4vLyAyLiBJbiB5b3VyIGxpYnJhcnksIHlvdSBjYW4gbGV0IHVzZXJzIHBhc3MgY2FsbGJhY2tcbi8vICAgIGZ1bmN0aW9uIGluIGFzIG9wdGlvbnMuXG4vLyAzLiBXaGVuIGEgcGFydGljdWxhciBhY3Rpb24gaGFwcGVucyBpbiB5b3VyIGxpYnJhcnksXG4vLyAgICB5b3UgY2FuIHJ1biB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4vLyA0LiBZb3UgY2FuIGV2ZW4gcGFzcyBpbiBhcmd1bWVudHMgdGhhdCBkZXZlbG9wZXJzIGNhblxuLy8gLiAgdXNlIHRvIGFjY2VzcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudFxuLy8gLiAgaW5zdGFudGlhdGlvbiBpbiB0aGVpciBjYWxsYmFjay4gXG5cblxuLy8gKiBDdXN0b20gRXZlbnRzXG4iLCJpbXBvcnQgSGVhZHJvb20gZnJvbSAnaGVhZHJvb20uanMnO1xuXG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbmNvbnN0IGhlYWRyb29tID0gbmV3IEhlYWRyb29tKGhlYWRlcik7XG5oZWFkcm9vbS5pbml0KCk7XG5oZWFkcm9vbS50b3AoKTsiXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyaGxZV1J5YjI5dExtcHpMMlJwYzNRdmFHVmhaSEp2YjIwdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMMnB6TDJOdmJuTjBjblZqZEc5eUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwzTnlZeTlxY3k5a2IyMHRiV0Z1YVhCMWJHRjBhVzl1TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDNOeVl5OXFjeTlvYjI5cmN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmFXNWtaWGd1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0UlFVRkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk96czdVVUZIUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc01FTkJRVEJETEdkRFFVRm5RenRSUVVNeFJUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxIZEVRVUYzUkN4clFrRkJhMEk3VVVGRE1VVTdVVUZEUVN4cFJFRkJhVVFzWTBGQll6dFJRVU12UkRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEVzZVVOQlFYbERMR2xEUVVGcFF6dFJRVU14UlN4blNFRkJaMGdzYlVKQlFXMUNMRVZCUVVVN1VVRkRja2s3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3d5UWtGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3VVVGRGRrUXNhVU5CUVdsRExHVkJRV1U3VVVGRGFFUTdVVUZEUVR0UlFVTkJPenRSUVVWQk8xRkJRMEVzYzBSQlFYTkVMQ3RFUVVFclJEczdVVUZGY2tnN1VVRkRRVHM3TzFGQlIwRTdVVUZEUVRzN096czdPenM3T3pzN08wRkRiRVpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFTeEZRVUZGTEV0QlFUUkVPMEZCUXpsRUxFVkJRVVVzVTBGRGMwUTdRVUZEZUVRc1EwRkJReXh2UWtGQmIwSTdPMEZCUlhKQ08wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h0UWtGQmJVSTdRVUZEYmtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc09FSkJRVGhDTzBGQlF6bENPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2EwSkJRV3RDTEU5QlFVODdRVUZEZWtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE96dEJRVVZRTzBGQlEwRTdRVUZEUVN4clFrRkJhMElzVDBGQlR6dEJRVU42UWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE96dEJRVVZRTzBGQlEwRTdRVUZEUVN4clFrRkJhMElzVDBGQlR6dEJRVU42UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEd0Q1FVRnJRaXhQUVVGUE8wRkJRM3BDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6czdRVUZGVUR0QlFVTkJMR3RDUVVGclFpeFBRVUZQTzBGQlEzcENPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3TzBGQlJWQTdRVUZEUVR0QlFVTkJMR3RDUVVGclFpeFBRVUZQTzBGQlEzcENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEZOQlFWTTdRVUZEVkRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNhME5CUVd0RE8wRkJRMnhET3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeGhRVUZoTEZkQlFWYzdRVUZEZUVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2JVTkJRVzFET3p0QlFVVnVRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1pVRkJaU3hwUkVGQmFVUTdRVUZEYUVVN1FVRkRRVHRCUVVOQkxGZEJRVmM3UVVGRFdEdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUUxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3haUVVGWk8wRkJRMW83UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHM3UVVGRlFTeERRVUZET3pzN096czdPenM3T3pzN1FVTndZa1E3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFTeDFRMEZCZFVNN1FVRkRka003UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h0UWtGQmJVSTdRVUZEYmtJc1UwRkJVeXhyUWtGQmEwSXNSMEZCUnl4blEwRkJaME1zUjBGQlJ5eHBRa0ZCYVVJN1FVRkRiRVk3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHMUNRVUZ0UWp0QlFVTnVRaXhUUVVGVExHMUNRVUZ0UWl4SFFVRkhMR2REUVVGblF5eEhRVUZITEd0Q1FVRnJRanRCUVVOd1JqczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4RFFVRkRPenRCUVVWRU8wRkJRMEU3UVVGRFFTeEpRVUZKT3p0QlFVVktPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFTeDNRa0ZCZDBJN1FVRkRlRUk3UVVGRFFUczdRVUZGUVN4cFJFRkJhVVE3UVVGRGFrUXNjVU5CUVhGRE96dEJRVVZ5UXpzN1FVRkZRVHRCUVVOQkxHTkJRV01zWTBGQll6dEJRVU0xUWl4clFrRkJhMEk3UVVGRGJFSXNTMEZCU3p0QlFVTk1MRWM3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4dFFrRkJiVUk3UVVGRGJrSXNVMEZCVXl4M1FrRkJkMElzUjBGQlJ5eFhRVUZYTEVkQlFVY3NkVUpCUVhWQ08wRkJRM3BGT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4dFFrRkJiVUk3UVVGRGJrSXNVMEZCVXl4NVFrRkJlVUlzUjBGQlJ5eFhRVUZYTEVkQlFVY3NkMEpCUVhkQ08wRkJRek5GT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEVOQlFVTTdPMEZCUlVRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTdzBRa0ZCTkVJc1MwRkJTenRCUVVOcVF6dEJRVU5CTEVOQlFVTTdPMEZCUlVRN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1EwRkJReXhGT3pzN096czdPenM3T3p0QlF6bEhSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVN4VlFVRlZPMEZCUTFZc1EwRkJRenM3UVVGRlJEczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2NVVkJRWEZGTEhsQ1FVRjVRanM3UVVGRk9VWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFTdzRRMEZCT0VNN1FVRkRPVU03TzBGQlJVRXNjVU5CUVhGRE8wRkJRM0pET3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4alFVRmpMR05CUVdNN1FVRkROVUlzYTBKQlFXdENMR2RDUVVGblFqdEJRVU5zUXl4aFFVRmhMRmxCUVZrN1FVRkRla0lzYTBKQlFXdENMR3RDUVVGclFqdEJRVU53UXl4blFrRkJaMEk3UVVGRGFFSXNTMEZCU3p0QlFVTk1PenRCUVVWQkxEaERPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUTBGQlF6czdRVUZGUkN4bE96czdPenM3T3pzN096dEJRemRLUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdRVUZIUVRzN096czdPenM3T3pzN096dEJRMlpCTzBGQlFVRTdRVUZCUVR0QlFVRnRRenM3UVVGRmJrTTdRVUZEUVN4eFFrRkJjVUlzYTBSQlFWRTdRVUZETjBJN1FVRkRRU3hsSWl3aVptbHNaU0k2SWpVek0ySXpOVEZtTW1Ka01EYzBaVGRrTkRnekxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmx4dUlGeDBMeThnVkdobElISmxjWFZwY21VZ1puVnVZM1JwYjI1Y2JpQmNkR1oxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseHVJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaUJjZEZ4MGFXWW9hVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHBJSHRjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNiaUJjZEZ4MGZWeHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MGFUb2diVzlrZFd4bFNXUXNYRzRnWEhSY2RGeDBiRG9nWm1Gc2MyVXNYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzFjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1YkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pHVm1hVzVsSUdkbGRIUmxjaUJtZFc1amRHbHZiaUJtYjNJZ2FHRnliVzl1ZVNCbGVIQnZjblJ6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFnUFNCbWRXNWpkR2x2YmlobGVIQnZjblJ6TENCdVlXMWxMQ0JuWlhSMFpYSXBJSHRjYmlCY2RGeDBhV1lvSVY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJ5aGxlSEJ2Y25SekxDQnVZVzFsS1NrZ2UxeHVJRngwWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0J1WVcxbExDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJR2RsZERvZ1oyVjBkR1Z5SUgwcE8xeHVJRngwWEhSOVhHNGdYSFI5TzF4dVhHNGdYSFF2THlCa1pXWnBibVVnWDE5bGMwMXZaSFZzWlNCdmJpQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5JZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SektTQjdYRzRnWEhSY2RHbG1LSFI1Y0dWdlppQlRlVzFpYjJ3Z0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5a2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjc0lIc2dkbUZzZFdVNklDZE5iMlIxYkdVbklIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0FuWDE5bGMwMXZaSFZzWlNjc0lIc2dkbUZzZFdVNklIUnlkV1VnZlNrN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCamNtVmhkR1VnWVNCbVlXdGxJRzVoYldWemNHRmpaU0J2WW1wbFkzUmNiaUJjZEM4dklHMXZaR1VnSmlBeE9pQjJZV3gxWlNCcGN5QmhJRzF2WkhWc1pTQnBaQ3dnY21WeGRXbHlaU0JwZEZ4dUlGeDBMeThnYlc5a1pTQW1JREk2SUcxbGNtZGxJR0ZzYkNCd2NtOXdaWEowYVdWeklHOW1JSFpoYkhWbElHbHVkRzhnZEdobElHNXpYRzRnWEhRdkx5QnRiMlJsSUNZZ05Eb2djbVYwZFhKdUlIWmhiSFZsSUhkb1pXNGdZV3h5WldGa2VTQnVjeUJ2WW1wbFkzUmNiaUJjZEM4dklHMXZaR1VnSmlBNGZERTZJR0psYUdGMlpTQnNhV3RsSUhKbGNYVnBjbVZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVkQ0E5SUdaMWJtTjBhVzl1S0haaGJIVmxMQ0J0YjJSbEtTQjdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXhLU0IyWVd4MVpTQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvZG1Gc2RXVXBPMXh1SUZ4MFhIUnBaaWh0YjJSbElDWWdPQ2tnY21WMGRYSnVJSFpoYkhWbE8xeHVJRngwWEhScFppZ29iVzlrWlNBbUlEUXBJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ2RtRnNkV1VnSmlZZ2RtRnNkV1V1WDE5bGMwMXZaSFZzWlNrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUjJZWElnYm5NZ1BTQlBZbXBsWTNRdVkzSmxZWFJsS0c1MWJHd3BPMXh1SUZ4MFhIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbklvYm5NcE8xeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29ibk1zSUNka1pXWmhkV3gwSnl3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQjJZV3gxWlRvZ2RtRnNkV1VnZlNrN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBeUlDWW1JSFI1Y0dWdlppQjJZV3gxWlNBaFBTQW5jM1J5YVc1bkp5a2dabTl5S0haaGNpQnJaWGtnYVc0Z2RtRnNkV1VwSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDaHVjeXdnYTJWNUxDQm1kVzVqZEdsdmJpaHJaWGtwSUhzZ2NtVjBkWEp1SUhaaGJIVmxXMnRsZVYwN0lIMHVZbWx1WkNodWRXeHNMQ0JyWlhrcEtUdGNiaUJjZEZ4MGNtVjBkWEp1SUc1ek8xeHVJRngwZlR0Y2JseHVJRngwTHk4Z1oyVjBSR1ZtWVhWc2RFVjRjRzl5ZENCbWRXNWpkR2x2YmlCbWIzSWdZMjl0Y0dGMGFXSnBiR2wwZVNCM2FYUm9JRzV2Ymkxb1lYSnRiMjU1SUcxdlpIVnNaWE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViaUE5SUdaMWJtTjBhVzl1S0cxdlpIVnNaU2tnZTF4dUlGeDBYSFIyWVhJZ1oyVjBkR1Z5SUQwZ2JXOWtkV3hsSUNZbUlHMXZaSFZzWlM1ZlgyVnpUVzlrZFd4bElEOWNiaUJjZEZ4MFhIUm1kVzVqZEdsdmJpQm5aWFJFWldaaGRXeDBLQ2tnZXlCeVpYUjFjbTRnYlc5a2RXeGxXeWRrWldaaGRXeDBKMTA3SUgwZ09seHVJRngwWEhSY2RHWjFibU4wYVc5dUlHZGxkRTF2WkhWc1pVVjRjRzl5ZEhNb0tTQjdJSEpsZEhWeWJpQnRiMlIxYkdVN0lIMDdYRzRnWEhSY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2huWlhSMFpYSXNJQ2RoSnl3Z1oyVjBkR1Z5S1R0Y2JpQmNkRngwY21WMGRYSnVJR2RsZEhSbGNqdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JGeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dklEMGdablZ1WTNScGIyNG9iMkpxWldOMExDQndjbTl3WlhKMGVTa2dleUJ5WlhSMWNtNGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRzlpYW1WamRDd2djSEp2Y0dWeWRIa3BPeUI5TzF4dVhHNGdYSFF2THlCZlgzZGxZbkJoWTJ0ZmNIVmliR2xqWDNCaGRHaGZYMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXdJRDBnWENKY0lqdGNibHh1WEc0Z1hIUXZMeUJNYjJGa0lHVnVkSEo1SUcxdlpIVnNaU0JoYm1RZ2NtVjBkWEp1SUdWNGNHOXlkSE5jYmlCY2RISmxkSFZ5YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjeUE5SURBcE8xeHVJaXdpTHlvaFhHNGdLaUJvWldGa2NtOXZiUzVxY3lCMk1DNHhNaTR3SUMwZ1IybDJaU0I1YjNWeUlIQmhaMlVnYzI5dFpTQm9aV0ZrY205dmJTNGdTR2xrWlNCNWIzVnlJR2hsWVdSbGNpQjFiblJwYkNCNWIzVWdibVZsWkNCcGRGeHVJQ29nUTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUU1cFkyc2dWMmxzYkdsaGJYTWdMU0JvZEhSd09pOHZkMmxqYTNrdWJtbHNiR2xoTG0xekwyaGxZV1J5YjI5dExtcHpYRzRnS2lCTWFXTmxibk5sT2lCTlNWUmNiaUFxTDF4dVhHNG9ablZ1WTNScGIyNGdLR2RzYjJKaGJDd2dabUZqZEc5eWVTa2dlMXh1SUNCMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkSGx3Wlc5bUlHMXZaSFZzWlNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnUHlCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaaFkzUnZjbmtvS1NBNlhHNGdJSFI1Y0dWdlppQmtaV1pwYm1VZ1BUMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ1pHVm1hVzVsTG1GdFpDQS9JR1JsWm1sdVpTaG1ZV04wYjNKNUtTQTZYRzRnSUNobmJHOWlZV3dnUFNCbmJHOWlZV3dnZkh3Z2MyVnNaaXdnWjJ4dlltRnNMa2hsWVdSeWIyOXRJRDBnWm1GamRHOXllU2dwS1R0Y2JuMG9kR2hwY3l3Z1puVnVZM1JwYjI0Z0tDa2dleUFuZFhObElITjBjbWxqZENjN1hHNWNiaUFnWm5WdVkzUnBiMjRnYVhOQ2NtOTNjMlZ5S0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwZVhCbGIyWWdkMmx1Wkc5M0lDRTlQU0JjSW5WdVpHVm1hVzVsWkZ3aU8xeHVJQ0I5WEc1Y2JpQWdMeW9xWEc0Z0lDQXFJRlZ6WldRZ2RHOGdaR1YwWldOMElHSnliM2R6WlhJZ2MzVndjRzl5ZENCbWIzSWdZV1JrYVc1bklHRnVJR1YyWlc1MElHeHBjM1JsYm1WeUlIZHBkR2dnYjNCMGFXOXVjMXh1SUNBZ0tpQkRjbVZrYVhRNklHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwRlFTUzlGZG1WdWRGUmhjbWRsZEM5aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5WEc0Z0lDQXFMMXh1SUNCbWRXNWpkR2x2YmlCd1lYTnphWFpsUlhabGJuUnpVM1Z3Y0c5eWRHVmtLQ2tnZTF4dUlDQWdJSFpoY2lCemRYQndiM0owWldRZ1BTQm1ZV3h6WlR0Y2JseHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUh0Y2JpQWdJQ0FnSUNBZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJtVjRkQzFzYVc1bElHZGxkSFJsY2kxeVpYUjFjbTVjYmlBZ0lDQWdJQ0FnWjJWMElIQmhjM05wZG1Vb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnYzNWd2NHOXlkR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpZEdWemRGd2lMQ0J2Y0hScGIyNXpMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQWdJSGRwYm1SdmR5NXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLRndpZEdWemRGd2lMQ0J2Y0hScGIyNXpMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxjbklwSUh0Y2JpQWdJQ0FnSUhOMWNIQnZjblJsWkNBOUlHWmhiSE5sTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQnpkWEJ3YjNKMFpXUTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJwYzFOMWNIQnZjblJsWkNncElIdGNiaUFnSUNCeVpYUjFjbTRnSVNFb1hHNGdJQ0FnSUNCcGMwSnliM2R6WlhJb0tTQW1KbHh1SUNBZ0lDQWdablZ1WTNScGIyNG9LU0I3ZlM1aWFXNWtJQ1ltWEc0Z0lDQWdJQ0JjSW1Oc1lYTnpUR2x6ZEZ3aUlHbHVJR1J2WTNWdFpXNTBMbVJ2WTNWdFpXNTBSV3hsYldWdWRDQW1KbHh1SUNBZ0lDQWdUMkpxWldOMExtRnpjMmxuYmlBbUpseHVJQ0FnSUNBZ1QySnFaV04wTG10bGVYTWdKaVpjYmlBZ0lDQWdJSEpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlZ4dUlDQWdJQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCcGMwUnZZM1Z0Wlc1MEtHOWlhaWtnZTF4dUlDQWdJSEpsZEhWeWJpQnZZbW91Ym05a1pWUjVjR1VnUFQwOUlEazdJQzh2SUU1dlpHVXVSRTlEVlUxRlRsUmZUazlFUlNBOVBUMGdPVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYVhOWGFXNWtiM2NvYjJKcUtTQjdYRzRnSUNBZ0x5OGdZRzlpYWlBOVBUMGdkMmx1Wkc5M1lDQnZjaUJnYjJKcUlHbHVjM1JoYm1ObGIyWWdWMmx1Wkc5M1lDQnBjeUJ1YjNRZ2MzVm1abWxqYVdWdWRDeGNiaUFnSUNBdkx5QmhjeUIwYUdVZ2IySnFJRzFoZVNCaVpTQjBhR1VnZDJsdVpHOTNJRzltSUdGdUlHbG1jbUZ0WlM1Y2JpQWdJQ0J5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVrYjJOMWJXVnVkQ0FtSmlCcGMwUnZZM1Z0Wlc1MEtHOWlhaTVrYjJOMWJXVnVkQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCM2FXNWtiM2RUWTNKdmJHeGxjaWgzYVc0cElIdGNiaUFnSUNCMllYSWdaRzlqSUQwZ2QybHVMbVJ2WTNWdFpXNTBPMXh1SUNBZ0lIWmhjaUJpYjJSNUlEMGdaRzlqTG1KdlpIazdYRzRnSUNBZ2RtRnlJR2gwYld3Z1BTQmtiMk11Wkc5amRXMWxiblJGYkdWdFpXNTBPMXh1WEc0Z0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nUUhObFpTQm9kSFJ3T2k4dmFtRnRaWE11Y0dGa2IyeHpaWGt1WTI5dEwycGhkbUZ6WTNKcGNIUXZaMlYwTFdSdlkzVnRaVzUwTFdobGFXZG9kQzFqY205emN5MWljbTkzYzJWeUwxeHVJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQjBhR1VnYzJOeWIyeHNJR2hsYVdkb2RDQnZaaUIwYUdVZ1pHOWpkVzFsYm5RZ2FXNGdjR2w0Wld4elhHNGdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lITmpjbTlzYkVobGFXZG9kRG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCTllYUm9MbTFoZUNoY2JpQWdJQ0FnSUNBZ0lDQmliMlI1TG5OamNtOXNiRWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdJQ0JvZEcxc0xuTmpjbTlzYkVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnSUNCaWIyUjVMbTltWm5ObGRFaGxhV2RvZEN4Y2JpQWdJQ0FnSUNBZ0lDQm9kRzFzTG05bVpuTmxkRWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdJQ0JpYjJSNUxtTnNhV1Z1ZEVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnSUNCb2RHMXNMbU5zYVdWdWRFaGxhV2RvZEZ4dUlDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ2ZTeGNibHh1SUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnS2lCQWMyVmxJR2gwZEhBNkx5OWhibVI1YkdGdVozUnZiaTVqYnk1MWF5OWliRzluTDJSbGRtVnNiM0J0Wlc1MEwyZGxkQzEyYVdWM2NHOXlkQzF6YVhwbExYZHBaSFJvTFdGdVpDMW9aV2xuYUhRdGFtRjJZWE5qY21sd2RGeHVJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQjBhR1VnYUdWcFoyaDBJRzltSUhSb1pTQjJhV1YzY0c5eWRDQnBiaUJ3YVhobGJITmNiaUFnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdhR1ZwWjJoME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSGRwYmk1cGJtNWxja2hsYVdkb2RDQjhmQ0JvZEcxc0xtTnNhV1Z1ZEVobGFXZG9kQ0I4ZkNCaWIyUjVMbU5zYVdWdWRFaGxhV2RvZER0Y2JpQWdJQ0FnSUgwc1hHNWNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nUjJWMGN5QjBhR1VnV1NCelkzSnZiR3dnY0c5emFYUnBiMjVjYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnY0dsNFpXeHpJSFJvWlNCd1lXZGxJR2hoY3lCelkzSnZiR3hsWkNCaGJHOXVaeUIwYUdVZ1dTMWhlR2x6WEc0Z0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUhOamNtOXNiRms2SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvZDJsdUxuQmhaMlZaVDJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRcElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkMmx1TG5CaFoyVlpUMlptYzJWME8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ2hvZEcxc0lIeDhJR0p2WkhrdWNHRnlaVzUwVG05a1pTQjhmQ0JpYjJSNUtTNXpZM0p2Ykd4VWIzQTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1ZzWlcxbGJuUlRZM0p2Ykd4bGNpaGxiR1Z0Wlc1MEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQjBhR1VnYzJOeWIyeHNJR2hsYVdkb2RDQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCcGJpQndhWGhsYkhOY2JpQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ2MyTnliMnhzU0dWcFoyaDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUUxaGRHZ3ViV0Y0S0Z4dUlDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RdWMyTnliMnhzU0dWcFoyaDBMRnh1SUNBZ0lDQWdJQ0FnSUdWc1pXMWxiblF1YjJabWMyVjBTR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUXVZMnhwWlc1MFNHVnBaMmgwWEc0Z0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNCOUxGeHVYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnZEdobElHaGxhV2RvZENCdlppQjBhR1VnWld4bGJXVnVkQ0JwYmlCd2FYaGxiSE5jYmlBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnYUdWcFoyaDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUUxaGRHZ3ViV0Y0S0dWc1pXMWxiblF1YjJabWMyVjBTR1ZwWjJoMExDQmxiR1Z0Wlc1MExtTnNhV1Z1ZEVobGFXZG9kQ2s3WEc0Z0lDQWdJQ0I5TEZ4dVhHNGdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQXFJRWRsZEhNZ2RHaGxJRmtnYzJOeWIyeHNJSEJ2YzJsMGFXOXVYRzRnSUNBZ0lDQWdLaUJBY21WMGRYSnVJSHRPZFcxaVpYSjlJSEJwZUdWc2N5QjBhR1VnWld4bGJXVnVkQ0JvWVhNZ2MyTnliMnhzWldRZ1lXeHZibWNnZEdobElGa3RZWGhwYzF4dUlDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNCelkzSnZiR3haT2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHVnNaVzFsYm5RdWMyTnliMnhzVkc5d08xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpjbVZoZEdWVFkzSnZiR3hsY2lobGJHVnRaVzUwS1NCN1hHNGdJQ0FnY21WMGRYSnVJR2x6VjJsdVpHOTNLR1ZzWlcxbGJuUXBJRDhnZDJsdVpHOTNVMk55YjJ4c1pYSW9aV3hsYldWdWRDa2dPaUJsYkdWdFpXNTBVMk55YjJ4c1pYSW9aV3hsYldWdWRDazdYRzRnSUgxY2JseHVJQ0F2S2lwY2JpQWdJQ29nUUhCaGNtRnRJR1ZzWlcxbGJuUWdSWFpsYm5SVVlYSm5aWFJjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUhSeVlXTnJVMk55YjJ4c0tHVnNaVzFsYm5Rc0lHOXdkR2x2Ym5Nc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ2RtRnlJR2x6VUdGemMybDJaVk4xY0hCdmNuUmxaQ0E5SUhCaGMzTnBkbVZGZG1WdWRITlRkWEJ3YjNKMFpXUW9LVHRjYmlBZ0lDQjJZWElnY21GbVNXUTdYRzRnSUNBZ2RtRnlJSE5qY205c2JHVmtJRDBnWm1Gc2MyVTdYRzRnSUNBZ2RtRnlJSE5qY205c2JHVnlJRDBnWTNKbFlYUmxVMk55YjJ4c1pYSW9aV3hsYldWdWRDazdYRzRnSUNBZ2RtRnlJR3hoYzNSVFkzSnZiR3haSUQwZ2MyTnliMnhzWlhJdWMyTnliMnhzV1NncE8xeHVJQ0FnSUhaaGNpQmtaWFJoYVd4eklEMGdlMzA3WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUIxY0dSaGRHVW9LU0I3WEc0Z0lDQWdJQ0IyWVhJZ2MyTnliMnhzV1NBOUlFMWhkR2d1Y205MWJtUW9jMk55YjJ4c1pYSXVjMk55YjJ4c1dTZ3BLVHRjYmlBZ0lDQWdJSFpoY2lCb1pXbG5hSFFnUFNCelkzSnZiR3hsY2k1b1pXbG5hSFFvS1R0Y2JpQWdJQ0FnSUhaaGNpQnpZM0p2Ykd4SVpXbG5hSFFnUFNCelkzSnZiR3hsY2k1elkzSnZiR3hJWldsbmFIUW9LVHRjYmx4dUlDQWdJQ0FnTHk4Z2NtVjFjMlVnYjJKcVpXTjBJR1p2Y2lCc1pYTnpJRzFsYlc5eWVTQmphSFZ5Ymx4dUlDQWdJQ0FnWkdWMFlXbHNjeTV6WTNKdmJHeFpJRDBnYzJOeWIyeHNXVHRjYmlBZ0lDQWdJR1JsZEdGcGJITXViR0Z6ZEZOamNtOXNiRmtnUFNCc1lYTjBVMk55YjJ4c1dUdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdVpHbHlaV04wYVc5dUlEMGdjMk55YjJ4c1dTQStJR3hoYzNSVFkzSnZiR3haSUQ4Z1hDSmtiM2R1WENJZ09pQmNJblZ3WENJN1hHNGdJQ0FnSUNCa1pYUmhhV3h6TG1ScGMzUmhibU5sSUQwZ1RXRjBhQzVoWW5Nb2MyTnliMnhzV1NBdElHeGhjM1JUWTNKdmJHeFpLVHRjYmlBZ0lDQWdJR1JsZEdGcGJITXVhWE5QZFhSUFprSnZkVzVrY3lBOUlITmpjbTlzYkZrZ1BDQXdJSHg4SUhOamNtOXNiRmtnS3lCb1pXbG5hSFFnUGlCelkzSnZiR3hJWldsbmFIUTdYRzRnSUNBZ0lDQmtaWFJoYVd4ekxuUnZjQ0E5SUhOamNtOXNiRmtnUEQwZ2IzQjBhVzl1Y3k1dlptWnpaWFJiWkdWMFlXbHNjeTVrYVhKbFkzUnBiMjVkTzF4dUlDQWdJQ0FnWkdWMFlXbHNjeTVpYjNSMGIyMGdQU0J6WTNKdmJHeFpJQ3NnYUdWcFoyaDBJRDQ5SUhOamNtOXNiRWhsYVdkb2REdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdWRHOXNaWEpoYm1ObFJYaGpaV1ZrWldRZ1BWeHVJQ0FnSUNBZ0lDQmtaWFJoYVd4ekxtUnBjM1JoYm1ObElENGdiM0IwYVc5dWN5NTBiMnhsY21GdVkyVmJaR1YwWVdsc2N5NWthWEpsWTNScGIyNWRPMXh1WEc0Z0lDQWdJQ0JqWVd4c1ltRmpheWhrWlhSaGFXeHpLVHRjYmx4dUlDQWdJQ0FnYkdGemRGTmpjbTlzYkZrZ1BTQnpZM0p2Ykd4Wk8xeHVJQ0FnSUNBZ2MyTnliMnhzWldRZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJvWVc1a2JHVlRZM0p2Ykd3b0tTQjdYRzRnSUNBZ0lDQnBaaUFvSVhOamNtOXNiR1ZrS1NCN1hHNGdJQ0FnSUNBZ0lITmpjbTlzYkdWa0lEMGdkSEoxWlR0Y2JpQWdJQ0FnSUNBZ2NtRm1TV1FnUFNCeVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVW9kWEJrWVhSbEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdaWFpsYm5SUGNIUnBiMjV6SUQwZ2FYTlFZWE56YVhabFUzVndjRzl5ZEdWa1hHNGdJQ0FnSUNBL0lIc2djR0Z6YzJsMlpUb2dkSEoxWlN3Z1kyRndkSFZ5WlRvZ1ptRnNjMlVnZlZ4dUlDQWdJQ0FnT2lCbVlXeHpaVHRjYmx4dUlDQWdJR1ZzWlcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbk5qY205c2JGd2lMQ0JvWVc1a2JHVlRZM0p2Ykd3c0lHVjJaVzUwVDNCMGFXOXVjeWs3WEc0Z0lDQWdkWEJrWVhSbEtDazdYRzVjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ1pHVnpkSEp2ZVRvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJR05oYm1ObGJFRnVhVzFoZEdsdmJrWnlZVzFsS0hKaFprbGtLVHRjYmlBZ0lDQWdJQ0FnWld4bGJXVnVkQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWMyTnliMnhzWENJc0lHaGhibVJzWlZOamNtOXNiQ3dnWlhabGJuUlBjSFJwYjI1ektUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdibTl5YldGc2FYcGxWWEJFYjNkdUtIUXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RDQTlQVDBnVDJKcVpXTjBLSFFwSUQ4Z2RDQTZJSHNnWkc5M2Jqb2dkQ3dnZFhBNklIUWdmVHRjYmlBZ2ZWeHVYRzRnSUM4cUtseHVJQ0FnS2lCVlNTQmxibWhoYm1ObGJXVnVkQ0JtYjNJZ1ptbDRaV1FnYUdWaFpHVnljeTVjYmlBZ0lDb2dTR2xrWlhNZ2FHVmhaR1Z5SUhkb1pXNGdjMk55YjJ4c2FXNW5JR1J2ZDI1Y2JpQWdJQ29nVTJodmQzTWdhR1ZoWkdWeUlIZG9aVzRnYzJOeWIyeHNhVzVuSUhWd1hHNGdJQ0FxSUVCamIyNXpkSEoxWTNSdmNseHVJQ0FnS2lCQWNHRnlZVzBnZTBSUFRVVnNaVzFsYm5SOUlHVnNaVzBnZEdobElHaGxZV1JsY2lCbGJHVnRaVzUwWEc0Z0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnZjSFJwYjI1eklHOXdkR2x2Ym5NZ1ptOXlJSFJvWlNCM2FXUm5aWFJjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUVobFlXUnliMjl0S0dWc1pXMHNJRzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQnZjSFJwYjI1eklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlR0Y2JpQWdJQ0JQWW1wbFkzUXVZWE56YVdkdUtIUm9hWE1zSUVobFlXUnliMjl0TG05d2RHbHZibk1zSUc5d2RHbHZibk1wTzF4dUlDQWdJSFJvYVhNdVkyeGhjM05sY3lBOUlFOWlhbVZqZEM1aGMzTnBaMjRvZTMwc0lFaGxZV1J5YjI5dExtOXdkR2x2Ym5NdVkyeGhjM05sY3l3Z2IzQjBhVzl1Y3k1amJHRnpjMlZ6S1R0Y2JseHVJQ0FnSUhSb2FYTXVaV3hsYlNBOUlHVnNaVzA3WEc0Z0lDQWdkR2hwY3k1MGIyeGxjbUZ1WTJVZ1BTQnViM0p0WVd4cGVtVlZjRVJ2ZDI0b2RHaHBjeTUwYjJ4bGNtRnVZMlVwTzF4dUlDQWdJSFJvYVhNdWIyWm1jMlYwSUQwZ2JtOXliV0ZzYVhwbFZYQkViM2R1S0hSb2FYTXViMlptYzJWMEtUdGNiaUFnSUNCMGFHbHpMbWx1YVhScFlXeHBjMlZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdkR2hwY3k1bWNtOTZaVzRnUFNCbVlXeHpaVHRjYmlBZ2ZWeHVJQ0JJWldGa2NtOXZiUzV3Y205MGIzUjVjR1VnUFNCN1hHNGdJQ0FnWTI5dWMzUnlkV04wYjNJNklFaGxZV1J5YjI5dExGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVM1JoY25RZ2JHbHpkR1Z1YVc1bklIUnZJSE5qY205c2JHbHVaMXh1SUNBZ0lDQXFJRUJ3ZFdKc2FXTmNiaUFnSUNBZ0tpOWNiaUFnSUNCcGJtbDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUdsbUlDaElaV0ZrY205dmJTNWpkWFJ6VkdobFRYVnpkR0Z5WkNBbUppQWhkR2hwY3k1cGJtbDBhV0ZzYVhObFpDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtRmtaRU5zWVhOektGd2lhVzVwZEdsaGJGd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXBibWwwYVdGc2FYTmxaQ0E5SUhSeWRXVTdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z1pHVm1aWElnWlhabGJuUWdjbVZuYVhOMGNtRjBhVzl1SUhSdklHaGhibVJzWlNCaWNtOTNjMlZ5WEc0Z0lDQWdJQ0FnSUM4dklIQnZkR1Z1ZEdsaGJHeDVJSEpsYzNSdmNtbHVaeUJ3Y21WMmFXOTFjeUJ6WTNKdmJHd2djRzl6YVhScGIyNWNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2hjYmlBZ0lDQWdJQ0FnSUNCbWRXNWpkR2x2YmloelpXeG1LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG5OamNtOXNiRlJ5WVdOclpYSWdQU0IwY21GamExTmpjbTlzYkNoY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNXpZM0p2Ykd4bGNpeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2V5QnZabVp6WlhRNklITmxiR1l1YjJabWMyVjBMQ0IwYjJ4bGNtRnVZMlU2SUhObGJHWXVkRzlzWlhKaGJtTmxJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWRYQmtZWFJsTG1KcGJtUW9jMlZzWmlsY2JpQWdJQ0FnSUNBZ0lDQWdJQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdJQ0F4TURBc1hHNGdJQ0FnSUNBZ0lDQWdkR2hwYzF4dUlDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjenRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUkdWemRISnZlU0IwYUdVZ2QybGtaMlYwTENCamJHVmhjbWx1WnlCMWNDQmhablJsY2lCcGRITmxiR1pjYmlBZ0lDQWdLaUJBY0hWaWJHbGpYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1pHVnpkSEp2ZVRvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG1sdWFYUnBZV3hwYzJWa0lEMGdabUZzYzJVN1hHNGdJQ0FnSUNCUFltcGxZM1F1YTJWNWN5aDBhR2x6TG1Oc1lYTnpaWE1wTG1admNrVmhZMmdvZEdocGN5NXlaVzF2ZG1WRGJHRnpjeXdnZEdocGN5azdYRzRnSUNBZ0lDQjBhR2x6TG5OamNtOXNiRlJ5WVdOclpYSXVaR1Z6ZEhKdmVTZ3BPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJWYm5CcGJpQjBhR1VnWld4bGJXVnVkRnh1SUNBZ0lDQXFJRUJ3ZFdKc2FXTmNiaUFnSUNBZ0tpOWNiaUFnSUNCMWJuQnBiam9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9kR2hwY3k1b1lYTkRiR0Z6Y3loY0luQnBibTVsWkZ3aUtTQjhmQ0FoZEdocGN5NW9ZWE5EYkdGemN5aGNJblZ1Y0dsdWJtVmtYQ0lwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1EyeGhjM01vWENKMWJuQnBibTVsWkZ3aUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpXMXZkbVZEYkdGemN5aGNJbkJwYm01bFpGd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJsVnVjR2x1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1dmJsVnVjR2x1TG1OaGJHd29kR2hwY3lrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOUxGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVR2x1SUhSb1pTQmxiR1Z0Wlc1MFhHNGdJQ0FnSUNvZ1FIQjFZbXhwWTF4dUlDQWdJQ0FxTDF4dUlDQWdJSEJwYmpvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NW9ZWE5EYkdGemN5aGNJblZ1Y0dsdWJtVmtYQ0lwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1EyeGhjM01vWENKd2FXNXVaV1JjSWlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y21WdGIzWmxRMnhoYzNNb1hDSjFibkJwYm01bFpGd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJsQnBiaWtnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1UWFXNHVZMkZzYkNoMGFHbHpLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBzWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCR2NtVmxlbVZ6SUhSb1pTQmpkWEp5Wlc1MElITjBZWFJsSUc5bUlIUm9aU0IzYVdSblpYUmNiaUFnSUNBZ0tpQkFjSFZpYkdsalhHNGdJQ0FnSUNvdlhHNGdJQ0FnWm5KbFpYcGxPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVabkp2ZW1WdUlEMGdkSEoxWlR0Y2JpQWdJQ0FnSUhSb2FYTXVZV1JrUTJ4aGMzTW9YQ0ptY205NlpXNWNJaWs3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZKbExXVnVZV0pzWlhNZ2RHaGxJR1JsWm1GMWJIUWdZbVZvWVhacGIzVnlJRzltSUhSb1pTQjNhV1JuWlhSY2JpQWdJQ0FnS2lCQWNIVmliR2xqWEc0Z0lDQWdJQ292WEc0Z0lDQWdkVzVtY21WbGVtVTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NW1jbTk2Wlc0Z1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKbWNtOTZaVzVjSWlrN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhSdmNEb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0JwWmlBb0lYUm9hWE11YUdGelEyeGhjM01vWENKMGIzQmNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW5SdmNGd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaVzF2ZG1WRGJHRnpjeWhjSW01dmRGUnZjRndpS1R0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXZibFJ2Y0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNVViM0F1WTJGc2JDaDBhR2x6S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCdWIzUlViM0E2SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0YwYUdsekxtaGhjME5zWVhOektGd2libTkwVkc5d1hDSXBLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZV1JrUTJ4aGMzTW9YQ0p1YjNSVWIzQmNJaWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKMGIzQmNJaWs3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWIyNU9iM1JVYjNBcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVUbTkwVkc5d0xtTmhiR3dvZEdocGN5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdZbTkwZEc5dE9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGRHaHBjeTVvWVhORGJHRnpjeWhjSW1KdmRIUnZiVndpS1NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Ga1pFTnNZWE56S0Z3aVltOTBkRzl0WENJcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGJXOTJaVU5zWVhOektGd2libTkwUW05MGRHOXRYQ0lwTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxtOXVRbTkwZEc5dEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXZia0p2ZEhSdmJTNWpZV3hzS0hSb2FYTXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmx4dUlDQWdJRzV2ZEVKdmRIUnZiVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWFJvYVhNdWFHRnpRMnhoYzNNb1hDSnViM1JDYjNSMGIyMWNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW01dmRFSnZkSFJ2YlZ3aUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpXMXZkbVZEYkdGemN5aGNJbUp2ZEhSdmJWd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJrNXZkRUp2ZEhSdmJTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVPYjNSQ2IzUjBiMjB1WTJGc2JDaDBhR2x6S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCemFHOTFiR1JWYm5CcGJqb2dablZ1WTNScGIyNG9aR1YwWVdsc2N5a2dlMXh1SUNBZ0lDQWdkbUZ5SUhOamNtOXNiR2x1WjBSdmQyNGdQU0JrWlhSaGFXeHpMbVJwY21WamRHbHZiaUE5UFQwZ1hDSmtiM2R1WENJN1hHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCelkzSnZiR3hwYm1kRWIzZHVJQ1ltSUNGa1pYUmhhV3h6TG5SdmNDQW1KaUJrWlhSaGFXeHpMblJ2YkdWeVlXNWpaVVY0WTJWbFpHVmtPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQnphRzkxYkdSUWFXNDZJR1oxYm1OMGFXOXVLR1JsZEdGcGJITXBJSHRjYmlBZ0lDQWdJSFpoY2lCelkzSnZiR3hwYm1kVmNDQTlJR1JsZEdGcGJITXVaR2x5WldOMGFXOXVJRDA5UFNCY0luVndYQ0k3WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUFvYzJOeWIyeHNhVzVuVlhBZ0ppWWdaR1YwWVdsc2N5NTBiMnhsY21GdVkyVkZlR05sWldSbFpDa2dmSHdnWkdWMFlXbHNjeTUwYjNBN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdGa1pFTnNZWE56T2lCbWRXNWpkR2x2YmloamJHRnpjMDVoYldVcElIdGNiaUFnSUNBZ0lIUm9hWE11Wld4bGJTNWpiR0Z6YzB4cGMzUXVZV1JrTG1Gd2NHeDVLRnh1SUNBZ0lDQWdJQ0IwYUdsekxtVnNaVzB1WTJ4aGMzTk1hWE4wTEZ4dUlDQWdJQ0FnSUNCMGFHbHpMbU5zWVhOelpYTmJZMnhoYzNOT1lXMWxYUzV6Y0d4cGRDaGNJaUJjSWlsY2JpQWdJQ0FnSUNrN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhKbGJXOTJaVU5zWVhOek9pQm1kVzVqZEdsdmJpaGpiR0Z6YzA1aGJXVXBJSHRjYmlBZ0lDQWdJSFJvYVhNdVpXeGxiUzVqYkdGemMweHBjM1F1Y21WdGIzWmxMbUZ3Y0d4NUtGeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Wc1pXMHVZMnhoYzNOTWFYTjBMRnh1SUNBZ0lDQWdJQ0IwYUdsekxtTnNZWE56WlhOYlkyeGhjM05PWVcxbFhTNXpjR3hwZENoY0lpQmNJaWxjYmlBZ0lDQWdJQ2s3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJR2hoYzBOc1lYTnpPaUJtZFc1amRHbHZiaWhqYkdGemMwNWhiV1VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtTnNZWE56WlhOYlkyeGhjM05PWVcxbFhTNXpjR3hwZENoY0lpQmNJaWt1WlhabGNua29ablZ1WTNScGIyNG9ZMnh6S1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbU5zWVhOelRHbHpkQzVqYjI1MFlXbHVjeWhqYkhNcE8xeHVJQ0FnSUNBZ2ZTd2dkR2hwY3k1bGJHVnRLVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdkWEJrWVhSbE9pQm1kVzVqZEdsdmJpaGtaWFJoYVd4ektTQjdYRzRnSUNBZ0lDQnBaaUFvWkdWMFlXbHNjeTVwYzA5MWRFOW1RbTkxYm1SektTQjdYRzRnSUNBZ0lDQWdJQzh2SUVsbmJtOXlaU0JpYjNWdVkza2djMk55YjJ4c2FXNW5JR2x1SUU5VFdGeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxtWnliM3BsYmlBOVBUMGdkSEoxWlNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHbG1JQ2hrWlhSaGFXeHpMblJ2Y0NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5SdmNDZ3BPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1dWIzUlViM0FvS1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLR1JsZEdGcGJITXVZbTkwZEc5dEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVltOTBkRzl0S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbTV2ZEVKdmRIUnZiU2dwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9kR2hwY3k1emFHOTFiR1JWYm5CcGJpaGtaWFJoYVd4ektTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuVnVjR2x1S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11YzJodmRXeGtVR2x1S0dSbGRHRnBiSE1wS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y0dsdUtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJQzhxS2x4dUlDQWdLaUJFWldaaGRXeDBJRzl3ZEdsdmJuTmNiaUFnSUNvZ1FIUjVjR1VnZTA5aWFtVmpkSDFjYmlBZ0lDb3ZYRzRnSUVobFlXUnliMjl0TG05d2RHbHZibk1nUFNCN1hHNGdJQ0FnZEc5c1pYSmhibU5sT2lCN1hHNGdJQ0FnSUNCMWNEb2dNQ3hjYmlBZ0lDQWdJR1J2ZDI0NklEQmNiaUFnSUNCOUxGeHVJQ0FnSUc5bVpuTmxkRG9nTUN4Y2JpQWdJQ0J6WTNKdmJHeGxjam9nYVhOQ2NtOTNjMlZ5S0NrZ1B5QjNhVzVrYjNjZ09pQnVkV3hzTEZ4dUlDQWdJR05zWVhOelpYTTZJSHRjYmlBZ0lDQWdJR1p5YjNwbGJqb2dYQ0pvWldGa2NtOXZiUzB0Wm5KdmVtVnVYQ0lzWEc0Z0lDQWdJQ0J3YVc1dVpXUTZJRndpYUdWaFpISnZiMjB0TFhCcGJtNWxaRndpTEZ4dUlDQWdJQ0FnZFc1d2FXNXVaV1E2SUZ3aWFHVmhaSEp2YjIwdExYVnVjR2x1Ym1Wa1hDSXNYRzRnSUNBZ0lDQjBiM0E2SUZ3aWFHVmhaSEp2YjIwdExYUnZjRndpTEZ4dUlDQWdJQ0FnYm05MFZHOXdPaUJjSW1obFlXUnliMjl0TFMxdWIzUXRkRzl3WENJc1hHNGdJQ0FnSUNCaWIzUjBiMjA2SUZ3aWFHVmhaSEp2YjIwdExXSnZkSFJ2YlZ3aUxGeHVJQ0FnSUNBZ2JtOTBRbTkwZEc5dE9pQmNJbWhsWVdSeWIyOXRMUzF1YjNRdFltOTBkRzl0WENJc1hHNGdJQ0FnSUNCcGJtbDBhV0ZzT2lCY0ltaGxZV1J5YjI5dFhDSmNiaUFnSUNCOVhHNGdJSDA3WEc1Y2JpQWdTR1ZoWkhKdmIyMHVZM1YwYzFSb1pVMTFjM1JoY21RZ1BTQnBjMU4xY0hCdmNuUmxaQ2dwTzF4dVhHNGdJSEpsZEhWeWJpQklaV0ZrY205dmJUdGNibHh1ZlNrcE8xeHVJaXdpYkdWMElHZHlaV1YwYVc1bmN5QTlJQ2htZFc1amRHbHZiaUFvS1NCN1hHNGdJR3hsZENCelpYUjBhVzVuY3lBOUlIdGNiaUFnSUNCbmNtVmxkR2x1WnpvZ0ozbHZkU2NzWEc0Z0lDQWdhR2xDWldadmNtVTZJQ2RJWlhsdkp5eGNiaUFnSUNCb2FVRm1kR1Z5T2lBbkp5eGNiaUFnSUNCaWVXVkNaV1p2Y21VNklDZFRaV1VnZVdFZ2JHRjBaWEluTEZ4dUlDQWdJR0o1WlVGbWRHVnlPaUFuVkdGclpTQnBkQ0JsWVhONUxpY2dJRnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnZFhCa1lYUmxVMlYwZEdsdVozTWdLRzl3ZEdsdmJuTWdQU0I3ZlNrZ2UxeHVJQ0FnSUU5aWFtVmpkQzVoYzNOcFoyNG9jMlYwZEdsdVozTXNJRzl3ZEdsdmJuTXBYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ6WVhsSWFTQW9ibUZ0WlNrZ2UxeHVJQ0FnSUdOdmJuTnZiR1V1Ykc5bktGeHVJQ0FnSUNBZ0p5VmpKWE1uTENCY2JpQWdJQ0FnSUNkamIyeHZjam9nY0dsdWF6dG1iMjUwTFhOcGVtVTZJREkxY0hnbkxDQmNiaUFnSUNBZ0lHQWtlM05sZEhScGJtZHpMbWhwUW1WbWIzSmxmU0FrZTI1aGJXVWdQeUJ1WVcxbElEb2djMlYwZEdsdVozTXVaM0psWlhScGJtZDlJQ1I3YzJWMGRHbHVaM011YUdsQlpuUmxjbjFnWEc0Z0lDQWdLVnh1SUNBZ0lISmxkSFZ5YmlCY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlITmhlVUo1WlNBb2JtRnRaU2tnZTF4dUlDQWdJR052Ym5OdmJHVXViRzluS0Z4dUlDQWdJQ0FnSnlWakpYTW5MQ0JjYmlBZ0lDQWdJQ2RqYjJ4dmNqb2djR2x1YXp0bWIyNTBMWE5wZW1VNklESTFjSGduTENCY2JpQWdJQ0FnSUdBa2UzTmxkSFJwYm1kekxtSjVaVUpsWm05eVpYMGdKSHR1WVcxbElEOGdibUZ0WlNBNklITmxkSFJwYm1kekxtZHlaV1YwYVc1bmZTQWtlM05sZEhScGJtZHpMbUo1WlVGbWRHVnlmV0JjYmlBZ0lDQXBYRzVjYmlBZ0lDQnlaWFIxY200Z1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUhWd1pHRjBaVk5sZEhScGJtZHpMRnh1SUNBZ0lITmhlVWhwTEZ4dUlDQWdJSE5oZVVKNVpTQWdJQ0JjYmlBZ2ZWeHVmU2tvS1Z4dVhHNHZMeUJuY21WbGRHbHVaM011ZFhCa1lYUmxVMlYwZEdsdVozTW9lMXh1THk4Z0lDQm5jbVZsZEdsdVozTTZJQ2QzYjNKc1pDZGNiaTh2SUgwcFhHNWNiaTh2SUdkeVpXVjBhVzVuY3k1ellYbElhU2duYldWeWJHbHVKeWs3WEc0dkx5Qm5jbVZsZEdsdVozTXVjMkY1UW5sbEtDZHRiM0puWVc0bktUdGNibHh1YkdWMElFZHlaV1YwYVc1bklEMGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdZMjl1YzNRZ1pHVm1ZWFZzZEhNZ1BTQjdYRzRnSUNBZ1ozSmxaWFJwYm1jNklDZDViM1VuTEZ4dUlDQWdJR2hwUW1WbWIzSmxPaUFuU0dWNWJ5Y3NYRzRnSUNBZ2FHbEJablJsY2pvZ0p5Y3NYRzRnSUNBZ1lubGxRbVZtYjNKbE9pQW5VMlZsSUhsaElHeGhkR1Z5Snl4Y2JpQWdJQ0JpZVdWQlpuUmxjam9nSjFSaGEyVWdhWFFnWldGemVTNG5MRnh1WEc0Z0lDQWdMeThnWTJGc2JHSmhZMnR6WEc0Z0lDQWdiMjVJYVRvZ1puVnVZM1JwYjI0Z0tDa2dlMzBzWEc0Z0lDQWdiMjVDZVdVNklHWjFibU4wYVc5dUlDZ3BJSHQ5WEc0Z0lIMWNibHh1SUNCamIyNXpkQ0JEYjI1emRISjFZM1J2Y2lBOUlHWjFibU4wYVc5dUtHNWhiV1VzSUc5d2RHbHZibk1nUFNCN2ZTa2dlMXh1SUNBZ0lHTnZibk4wSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcFhHNWNiaUFnSUNCUFltcGxZM1F1Wm5KbFpYcGxLSE5sZEhScGJtZHpLVnh1WEc0Z0lDQWdUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblJwWlhNb2RHaHBjeXdnZTF4dUlDQWdJQ0FnWDI1aGJXVTZJSHNnZG1Gc2RXVTZJRzVoYldVZ2ZTeGNiaUFnSUNBZ0lGOXpaWFIwYVc1bmN6b2dleUIyWVd4MVpUb2djMlYwZEdsdVozTWdmVnh1SUNBZ0lIMHBYRzRnSUgwZ1hHNGdJRU52Ym5OMGNuVmpkRzl5TG5CeWIzUnZkSGx3WlM1ellYbElhU0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGNiaUFnSUNBZ0lDY2xZeVZ6Snl3Z1hHNGdJQ0FnSUNBblkyOXNiM0k2SUhCcGJtczdabTl1ZEMxemFYcGxPaUF5TlhCNEp5d2dYRzRnSUNBZ0lDQmdKSHQwYUdsekxsOXpaWFIwYVc1bmN5NW9hVUpsWm05eVpYMGdKSHQwYUdsekxsOXVZVzFsZlNBa2UzUm9hWE11WDNObGRIUnBibWR6TG1ocFFXWjBaWEo5WUZ4dUlDQWdJQ2xjYmx4dUlDQWdJSFJvYVhNdVgzTmxkSFJwYm1kekxtOXVTR2tvZEdocGN5NWZibUZ0WlN3Z2RHaHBjeTVmYzJWMGRHbHVaM011YUdsQ1pXWnZjbVVzSUhSb2FYTXVYM05sZEhScGJtZHpMbWhwUVdaMFpYSXBYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTmNiaUFnZlZ4dVhHNGdJRU52Ym5OMGNuVmpkRzl5TG5CeWIzUnZkSGx3WlM1ellYbENlV1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29YRzRnSUNBZ0lDQW5KV01sY3ljc0lGeHVJQ0FnSUNBZ0oyTnZiRzl5T2lCd2FXNXJPMlp2Ym5RdGMybDZaVG9nTWpWd2VDY3NJRnh1SUNBZ0lDQWdZQ1I3ZEdocGN5NWZjMlYwZEdsdVozTXVZbmxsUW1WbWIzSmxmU0FrZTNSb2FYTXVYMjVoYldWOUlDUjdkR2hwY3k1ZmMyVjBkR2x1WjNNdVlubGxRV1owWlhKOVlGeHVJQ0FnSUNsY2JpQWdJQ0JjYmlBZ0lDQjBhR2x6TGw5elpYUjBhVzVuY3k1dmJrSjVaU2gwYUdsekxsOXVZVzFsTENCMGFHbHpMbDl6WlhSMGFXNW5jeTVpZVdWQ1pXWnZjbVVzSUhSb2FYTXVYM05sZEhScGJtZHpMbUo1WlVGbWRHVnlLVHRjYmlBZ0lDQnlaWFIxY200Z2RHaHBjMXh1SUNCOVhHNWNiaUFnY21WMGRYSnVJRU52Ym5OMGNuVmpkRzl5WEc1OUtTZ3BYRzVjYm1OdmJuTjBJRzFsY214cGJpQTlJRzVsZHlCSGNtVmxkR2x1WnlnblRXVnliR2x1Snl3Z2UxeHVJQ0JvYVVGbWRHVnlPaUFuTGljc1hHNGdJRzl1UW5sbE9pQm1kVzVqZEdsdmJpaHVZVzFsS1NCN1hHNGdJQ0FnWTI5dWMzUWdZWEJ3SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1KNVpTMTBaWGgwSnlsY2JpQWdJQ0JoY0hBdWRHVjRkRU52Ym5SbGJuUWdQU0JnOEorUml5QWtlMjVoYldWOVlEdGNiaUFnZlZ4dWZTazdYRzVjYmk4dklHTnZibk52YkdVdWJHOW5LRzFsY214cGJpNXVZVzFsS1Z4dUx5OGdZMjl1YzI5c1pTNXNiMmNvYldWeWJHbHVMbk5sZEhScGJtZHpLVnh1WEc1c1pYUWdabTl5YlNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSjJadmNtMG5LVHRjYm1admNtMHVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jM1ZpYldsMEp5d2dablZ1WTNScGIyNGdLR1YyWlc1MEtTQjdYRzRnSUNBZ1pYWmxiblF1Y0hKbGRtVnVkRVJsWm1GMWJIUW9LVHRjYmlBZ0lDQm1iM0p0TG5KbGMyVjBLQ2s3WEc0Z0lDQWdiV1Z5YkdsdUxuTmhlVUo1WlNncE8xeHVmU2s3SWl3aUx5b3FYRzRxSUNvZ1JFOU5JRTFoYm1sd2RXeGhkR2x2YmlCTVNXSnlZWEpwWlhOY2Jpb2dNUzRnYUhSMGNITTZMeTl6WTNKdmJHeHlaWFpsWVd4cWN5NXZjbWN2WEc0cUlESXVJR2gwZEhCek9pOHZjR2h2ZEc5emQybHdaUzVqYjIwdlhHNHFJQ29nUkU5TklHMWhibWx3ZFd4aGRHbHZiaUJzYVdKeVlYSnBaWE1nYUdGMlpTQnpiMjFsSUhWdWFYRjFaU0JqYjI1emFXUmxjbUYwYVc5dWN5QmpiMjF3WVhKbFpDQjBieUIxZEdsc2FYUjVJR3hwWW5KaGNtbGxjeTVjYmlvZ0tpQkliM2NnWTJGdUlIZGxJR052Ym5abGNuUWdkR2hwY3lCcGJuUnZJR0VnYkdsaWNtRnllVnh1S2lBeExpQkpibXBsWTNScGJtY2dZMjl1ZEdWdWRDQnBiblJ2SUhSb1pTQkVUMDFjYmlvZ01pNGdUR2x6ZEdWdWFXNW5JR1p2Y2lCbGRtVnVkSE5jYmlvZ015NGdRV1JrYVc1bklHOXdkR2x2Ym5NZ1lXNWtJSE5sZEhScGJtZHpYRzRxSURRdUlFVjRjRzl6YVc1bklIQjFZbXhwWXlCdFpYUm9iMlJ6WEc0cUlEVXVJRVJsYzNSeWIzbHBibWNnZEdobElHbHVjM1JoYm5ScFlYUnBiMjVjYmlBcUwxeHVYRzVqYjI1emRDQmxaMmNnUFNBb1puVnVZM1JwYjI0b0tTQjdYRzRnSUM4dklFZGxkQ0IwYUdVZ1pXeGxiV1Z1ZEZ4dUlDQmpiMjV6ZENCcGJtbDBJRDBnSUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUd4bGRDQmxiR1Z0SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduSTJWblp5Y3BPMXh1SUNBZ0lHeGxkQ0J6WTJGc1pXUWdQU0JtWVd4elpUdGNiaUFnWEc0Z0lDQWdMeThnUTNKbFlYUmxJR0oxZEhSdmJseHVJQ0FnSUd4bGRDQmlkRzRnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RpZFhSMGIyNG5LVHRjYmlBZ0lDQmlkRzR1YVc1dVpYSklWRTFNSUQwZ0ovQ2ZwWm9uTzF4dUlDQWdJR0owYmk1elpYUkJkSFJ5YVdKMWRHVW9KMkZ5YVdFdGJHRmlaV3duTENCZ1kyeHBZMnNnYldWZ0tUdGNiaUFnSUNCaWRHNHVjM1I1YkdVdWRISmhibk5wZEdsdmJpQTlJQ2QwY21GdWMyWnZjbTBnTXpBd2JYTWdaV0Z6WlMxcGJpYzdYRzRnSUZ4dUlDQWdJQzh2SUVsdWFtVmpkQ0JwYm5SdklIUm9aU0JFVDAxY2JpQWdJQ0JsYkdWdExtRndjR1Z1WkNoaWRHNHBPMXh1SUNCY2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSVlXNWtiR1VnWTJ4cFkyc2daWFpsYm5SelhHNGdJQ0FnSUNvdlhHNGdJQ0FnWm5WdVkzUnBiMjRnZEc5bloyeGxJQ2dwSUh0Y2JpQWdJQ0FnSUM4dklFbG1JSFJvWlNCaWRYUjBiMjRnYVhNZ2MyTmhiR1ZrTENCemFISnBibXNnYVhSY2JpQWdJQ0FnSUM4dklFOTBhR1Z5ZDJselpTd2daM0p2ZHlCcGRGeHVJQ0FnSUNBZ1luUnVMbk4wZVd4bExuUnlZVzV6Wm05eWJTQTlJSE5qWVd4bFpDQS9JQ2NuSURvZ0ozTmpZV3hsS0RJcEp6dGNiaUFnWEc0Z0lDQWdJQ0F2THlCR2JHbHdJSFJvWlNCelkyRnNaV1FnYzNSaGRHVmNiaUFnSUNBZ0lITmpZV3hsWkNBOUlDRnpZMkZzWldRN1hHNGdJQ0FnZlZ4dUlDQmNiaUFnSUNBdkx5Qk1hWE4wWlc0Z1ptOXlJR05zYVdOcmN5QnZiaUIwYUdVZ1luVjBkRzl1WEc0Z0lDQWdZblJ1TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJOc2FXTnJKeXdnZEc5bloyeGxLVHRjYmlBZ2ZWeHVJQ0JjYmlBZ2NtVjBkWEp1SUhzZ2FXNXBkQ0I5WEc1OUtTZ3BYRzVjYmk4dklHVm5aeTVwYm1sMEtDbGNibHh1THk4Z0tpQkVUMDBnYldGdWFYQjFiR0YwYVc5dUlHeHBZbkpoY21sbGN5QjBhR0YwSUdGa1pDQmpiMjUwWlc1MElIUnZJSFJvWlNCVlNWeHVMeThnZFhOMVlXeHNlU0IwWVd0bElHOXVaU0J2WmlCMGQyOGdZWEJ3Y205aFkyaGxjenBjYmk4dklERXVJRWx1YW1WamRDQnBkQ0J2YmlCcGJuTjBZVzUwYVdGMGFXOXVYRzR2THlBeUxpQklZWFpsSUdGdUlHVjRjR3hwWTJsMElHbHVhWFFvS1NCdFpYUm9iMlJjYmx4dUx5OGdLaUJQYm1VZ2IyWWdkR2hsSUhWdWFYRjFaU0JqYUdGc2JHVnVaMlZ6SUhkcGRHZ2dkR2hsSUdOdmJuTjBjblZqZEc5eUlIQmhkSFJsY200Z1lXNWtJRVJQVFZ4dUx5OGdLaUJ0WVc1cGNIVnNZWFJwYjI0Z2JHbGljbUZ5YVdWeklHbHpJSFJvWVhRZ2RHaGxJR05oYkd4aVlXTnJJR1oxYm1OMGFXOXVJR2x1SUhSb1pTQmNiaTh2SUNvZ1pYWmxiblFnYkdsemRHVnVaWElnYm1WbFpITWdkRzhnYTI1dmR5QnpiMjFsSUhWdWFYRjFaU0J3Y205d1pYSjBhV1Z6SUdaeWIyMGdaV0ZqYUNCY2JpOHZJQ29nYzNCbFkybG1hV01nYVc1emRHRnVZMlZjYmx4dUx5OGdLaUJCWkdRZ1lTQndkV0pzYVdNZ2RHOW5aMnhsS0NrZ2JXVjBhRzlrWEc1Y2JpOHZJQ29nUkdWemRISnZlV2x1WnlCaGJpQnBibk4wWVc1MGFXRjBhVzl1WEc0dkx5QXhMaUJVYUdseklIUjVjR2xqWVd4c2VTQnBiblp2YkhabGN5QnlaVzF2ZG1sdVp5QmhibmtnWVdSa1pXUWdSRTlOWEc0dkx5QWdJQ0JsYkdWdFpXNTBjeUJoYm1RZ2MzUnZjSEJwYm1jZ1lXNTVJR1YyWlc1MElHeHBjM1JsYm1WeWN5NGdYRzR2THlBeUxpQkJJR052YlcxdmJpQmpiMjUyWlc1MGFXOXVJR2x6SUhSdklHVjRjRzl6WlNCaElHUmxjM1J5YjNrb0tTQnRaWFJvYjJRZ2RHOGdaRzhnZEdoaGRDNWNiaTh2SURNdUlGSmxiVzkyWlNCaGJpQmxkbVZ1ZENCc2FYTjBaVzVsY2lCallXeHNZbUZqYXlCcGJXMWxaR2xoZEdWc2VWeHVYRzVzWlhRZ1JXZG5JRDBnS0daMWJtTjBhVzl1SUNncElIdGNibHh1SUNCamIyNXpkQ0JrWldaaGRXeDBjeUE5SUh0Y2JpQWdJQ0JzWVdKbGJEb2dKMk5zYVdOcklHMWxKeXhjYmlBZ0lDQmlkRzVVWlhoME9pQW44SitsbWljc1hHNGdJQ0FnZEhKaGJuTnBkR2x2YmpvZ0ozUnlZVzV6Wm05eWJTQXpNREJ0Y3lCbFlYTmxMV2x1Snl4Y2JpQWdJQ0J6WTJGc1pUb2dKekluWEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCamNtVmhkR1ZDZEc0Z0tHVnNaVzBzSUhObGRIUnBibWR6S1NCN1hHNGdJQ0FnYkdWMElHSjBiaUE5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMkoxZEhSdmJpY3BPMXh1SUNBZ0lHSjBiaTVwYm01bGNraFVUVXdnUFNCelpYUjBhVzVuY3k1aWRHNVVaWGgwTzF4dVhHNGdJQ0FnYVdZZ0tITmxkSFJwYm1kekxteGhZbVZzS1NCN1hHNGdJQ0FnSUNCaWRHNHVjMlYwUVhSMGNtbGlkWFJsS0NkaGNtbGhMV3hoWW1Wc0p5d2djMlYwZEdsdVozTXViR0ZpWld3cE8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2MyVjBkR2x1WjNNdWRISmhibk5wZEdsdmJpa2dlMXh1SUNBZ0lDQWdZblJ1TG5OMGVXeGxMblJ5WVc1emFYUnBiMjRnUFNCelpYUjBhVzVuY3k1MGNtRnVjMmwwYVc5dU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdWc1pXMHVZWEJ3Wlc1a0tHSjBiaWs3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdZblJ1WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCMGIyZG5iR1ZDZEc0Z0tHbHVjM1JoYm1ObEtTQjdYRzRnSUNBZ0x5OGdTV1lnZEdobElHSjFkSFJ2YmlCcGN5QnpZMkZzWldRc0lITm9jbWx1YXlCcGRGeHVJQ0FnSUM4dklFOTBhR1Z5ZDJselpTd2daM0p2ZHlCcGRGeHVJQ0FnSUdsdWMzUmhibU5sTGw5aWRHNHVjM1I1YkdVdWRISmhibk5tYjNKdElEMGdhVzV6ZEdGdVkyVXVYM05qWVd4bFpDQS9JQ2NuSURvZ1lITmpZV3hsS0NSN2FXNXpkR0Z1WTJVdVgzTmxkSFJwYm1kekxuTmpZV3hsZlNsZ08xeHVYRzRnSUNBZ0x5OGdSbXhwY0NCMGFHVWdjMk5oYkdWa0lITjBZWFJsWEc0Z0lDQWdhVzV6ZEdGdVkyVXVYM05qWVd4bFpDQTlJQ0ZwYm5OMFlXNWpaUzVmYzJOaGJHVmtPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWTNKbFlYUmxSWFpsYm5STWFYTjBaVzVsY2loaWRHNHNJR2x1YzNSaGJtTmxLU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdkRzluWjJ4bEtDa2dlMXh1SUNBZ0lDQWdkRzluWjJ4bFFuUnVLR2x1YzNSaGJtTmxLVnh1SUNBZ0lIMWNiaUFnSUNCaWRHNHVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQjBiMmRuYkdVcFhHNWNiaUFnSUNCeVpYUjFjbTRnZEc5bloyeGxYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJEYjI1emRISjFZM1J2Y2lBb2MyVnNaV04wYjNJc0lHOXdkR2x2Ym5NZ1BTQjdmU2tnZTF4dUlDQWdJR052Ym5OMElHVnNaVzBnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLSE5sYkdWamRHOXlLVHRjYmx4dUlDQWdJR052Ym5OMElITmxkSFJwYm1keklEMGdUMkpxWldOMExtRnpjMmxuYmloN2ZTd2daR1ZtWVhWc2RITXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lFOWlhbVZqZEM1bWNtVmxlbVVvYzJWMGRHbHVaM01wTzF4dVhHNGdJQ0FnWTI5dWMzUWdZblJ1SUQwZ1kzSmxZWFJsUW5SdUtHVnNaVzBzSUhObGRIUnBibWR6S1R0Y2JpQWdJQ0JjYmlBZ0lDQXZMeUJEY21WaGRHVWdkR2hsSUdWMlpXNTBJR3hwYzNSbGJtVnlYRzRnSUNBZ1kyOXVjM1FnYkdsemRHVnVaWElnUFNCamNtVmhkR1ZGZG1WdWRFeHBjM1JsYm1WeUtHSjBiaXdnZEdocGN5bGNibHh1SUNBZ0lFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBhV1Z6S0hSb2FYTXNJSHRjYmlBZ0lDQWdJRjlsYkdWdE9pQjdJSFpoYkhWbE9pQmxiR1Z0SUgwc1hHNGdJQ0FnSUNCZmMyVjBkR2x1WjNNNklIdDJZV3gxWlRvZ2MyVjBkR2x1WjNOOUxGeHVJQ0FnSUNBZ1gySjBiam9nZXlCMllXeDFaVG9nWW5SdWZTeGNiaUFnSUNBZ0lGOXNhWE4wWlc1bGNqb2dleUIyWVd4MVpUb2diR2x6ZEdWdVpYSWdmU3hjYmlBZ0lDQWdJRjl6WTJGc1pXUTZJSHNnZG1Gc2RXVTZJR1poYkhObExDQjNjbWwwWVdKc1pUb2dkSEoxWlNCOVhHNGdJQ0FnZlNsY2JpQWdmVnh1WEc0Z0lFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaUzUwYjJkbmJHVWdQU0JtZFc1amRHbHZiaUFvS1NCN0lDQmNiaUFnSUNCMGIyZG5iR1ZDZEc0b2RHaHBjeWxjYmlBZ2ZWeHVYRzRnSUM4cUtseHVJQ0FnS2lCRVpYTjBjbTk1SUhSb2FYTWdhVzV6ZEdGdVkyVmNiaUFnSUNvdlhHNWNiaUFnUTI5dWMzUnlkV04wYjNJdWNISnZkRzkwZVhCbExtUmxjM1J5YjNrZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdMeThnVW1WdGIzWmxJSFJvWlNCbGRtVnVkQ0JzYVhOMFpXNWxjaUJwYlcxbFpHbGhkR1ZzZVZ4dUlDQWdJSFJvYVhNdVgySjBiaTV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUhSb2FYTXVYMnhwYzNSbGJtVnlLVHRjYmx4dUlDQWdJQzh2SUZKbGJXOTJaU0IwYUdVZ1luVjBkRzl1WEc0Z0lDQWdkR2hwY3k1ZlluUnVMbkpsYlc5MlpTZ3BPMXh1SUNCOU8xeHVYRzRnSUhKbGRIVnliaUJEYjI1emRISjFZM1J2Y2x4dWZTa29LVnh1WEc1amIyNXpkQ0JsWjJjeElEMGdibVYzSUVWblp5Z25JMlZuWnljcFhHNWxaMmN4TG5SdloyZHNaU2dwWEc1amIyNXpkQ0J3WVhKMGVTQTlJRzVsZHlCRloyY29KeU53WVhKMGVTY3NJSHRjYmlBZ1luUnVWR1Y0ZERvZ0ovQ2Zqb2tuTEZ4dUlDQnNZV0psYkRvZ1lFbDBKM01nY0dGeWRIa2dkR2x0WldBc1hHNGdJSE5qWVd4bE9pQW5NeWRjYm4wcFhHNWNibkJoY25SNUxtUmxjM1J5YjNrb0tTSXNJaTh2SUVodmIydHpJQzBnYVc0Z2RHaGxJR1p2Y20wZ2IyWWdZMkZzYkdKaFkydHpJR0Z1WkNCamRYTjBiMjBnWlhabGJuUnpYRzR2THlCRVpYWmxiRzl3WlhKeklHTmhiaUIxYzJVZ2RHOGdjblZ1SUdOdlpHVWdkMmhsYmlCemNHVmphV1pwWXlCMGFHbHVaM05jYmk4dklHaGhjSEJsYmlCcGJpQjViM1Z5SUd4cFluSmhjbmxjYmx4dUx5OGdLaUJEWVd4c1ltRmphM05jYmk4dklERXVJRUVnWTJGc2JHSmhZMnNnYVhNZ1lTQm1kVzVqZEdsdmJpQjBhR0YwSUhKMWJuTWdZWFFnWVNCemNHVmphV1pwWXlCMGFXMWxMbHh1THk4Z01pNGdTVzRnZVc5MWNpQnNhV0p5WVhKNUxDQjViM1VnWTJGdUlHeGxkQ0IxYzJWeWN5QndZWE56SUdOaGJHeGlZV05yWEc0dkx5QWdJQ0JtZFc1amRHbHZiaUJwYmlCaGN5QnZjSFJwYjI1ekxseHVMeThnTXk0Z1YyaGxiaUJoSUhCaGNuUnBZM1ZzWVhJZ1lXTjBhVzl1SUdoaGNIQmxibk1nYVc0Z2VXOTFjaUJzYVdKeVlYSjVMRnh1THk4Z0lDQWdlVzkxSUdOaGJpQnlkVzRnZEdobElHTmhiR3hpWVdOcklHWjFibU4wYVc5dUxseHVMeThnTkM0Z1dXOTFJR05oYmlCbGRtVnVJSEJoYzNNZ2FXNGdZWEpuZFcxbGJuUnpJSFJvWVhRZ1pHVjJaV3h2Y0dWeWN5QmpZVzVjYmk4dklDNGdJSFZ6WlNCMGJ5QmhZMk5sYzNNZ2FXNW1iM0p0WVhScGIyNGdZV0p2ZFhRZ2RHaGxJR04xY25KbGJuUmNiaTh2SUM0Z0lHbHVjM1JoYm5ScFlYUnBiMjRnYVc0Z2RHaGxhWElnWTJGc2JHSmhZMnN1SUZ4dVhHNWNiaTh2SUNvZ1EzVnpkRzl0SUVWMlpXNTBjMXh1SWl3aWFXMXdiM0owSUVobFlXUnliMjl0SUdaeWIyMGdKMmhsWVdSeWIyOXRMbXB6Snp0Y2JseHVZMjl1YzNRZ2FHVmhaR1Z5SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduYUdWaFpHVnlKeWs3WEc1amIyNXpkQ0JvWldGa2NtOXZiU0E5SUc1bGR5QklaV0ZrY205dmJTaG9aV0ZrWlhJcE8xeHVhR1ZoWkhKdmIyMHVhVzVwZENncE8xeHVhR1ZoWkhKdmIyMHVkRzl3S0NrN0lsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0ifQ==
