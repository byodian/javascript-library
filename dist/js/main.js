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
    byeAfter: 'Take it easy.'
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
    return this
  }

  Constructor.prototype.sayBye = function () {
    console.log(
      '%c%s', 
      'color: pink;font-size: 25px', 
      `${this._settings.byeBefore} ${this._name} ${this._settings.byeAfter}`
    )
    
    return this
  }

  return Constructor
})()

const merlin = new Greeting('Merlin', {
  hiAfter: '.'
});

console.log(merlin.name)
console.log(merlin.settings)

merlin.sayHi().sayBye();
window.Greeting = Greeting

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

egg.init()


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
/*!************************************************************************************!*\
  !*** multi ./src/js/constructor.js ./src/js/dom-manipulation.js ./src/js/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/constructor.js */"./src/js/constructor.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/dom-manipulation.js */"./src/js/dom-manipulation.js");
module.exports = __webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hlYWRyb29tLmpzL2Rpc3QvaGVhZHJvb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kb20tbWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsS0FBNEQ7QUFDOUQsRUFBRSxTQUNzRDtBQUN4RCxDQUFDLG9CQUFvQjs7QUFFckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlEQUFpRDtBQUNoRTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7OztBQ3BiRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixTQUFTLGtCQUFrQixHQUFHLGdDQUFnQyxHQUFHLGlCQUFpQjtBQUNsRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLFNBQVMsbUJBQW1CLEdBQUcsZ0NBQWdDLEdBQUcsa0JBQWtCO0FBQ3BGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlEQUFpRDtBQUNqRCxxQ0FBcUM7O0FBRXJDOztBQUVBO0FBQ0EsY0FBYyxjQUFjO0FBQzVCLGtCQUFrQjtBQUNsQixLQUFLO0FBQ0wsRztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixTQUFTLHdCQUF3QixHQUFHLFdBQVcsR0FBRyx1QkFBdUI7QUFDekU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixTQUFTLHlCQUF5QixHQUFHLFdBQVcsR0FBRyx3QkFBd0I7QUFDM0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBLDBCOzs7Ozs7Ozs7OztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7OztBQy9DQTtBQUFBO0FBQUE7QUFBbUM7O0FBRW5DO0FBQ0EscUJBQXFCLGtEQUFRO0FBQzdCO0FBQ0EsZSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyohXG4gKiBoZWFkcm9vbS5qcyB2MC4xMi4wIC0gR2l2ZSB5b3VyIHBhZ2Ugc29tZSBoZWFkcm9vbS4gSGlkZSB5b3VyIGhlYWRlciB1bnRpbCB5b3UgbmVlZCBpdFxuICogQ29weXJpZ2h0IChjKSAyMDIwIE5pY2sgV2lsbGlhbXMgLSBodHRwOi8vd2lja3kubmlsbGlhLm1zL2hlYWRyb29tLmpzXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkhlYWRyb29tID0gZmFjdG9yeSgpKTtcbn0odGhpcywgZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gaXNCcm93c2VyKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZWN0IGJyb3dzZXIgc3VwcG9ydCBmb3IgYWRkaW5nIGFuIGV2ZW50IGxpc3RlbmVyIHdpdGggb3B0aW9uc1xuICAgKiBDcmVkaXQ6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyXG4gICAqL1xuICBmdW5jdGlvbiBwYXNzaXZlRXZlbnRzU3VwcG9ydGVkKCkge1xuICAgIHZhciBzdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGdldHRlci1yZXR1cm5cbiAgICAgICAgZ2V0IHBhc3NpdmUoKSB7XG4gICAgICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidGVzdFwiLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gISEoXG4gICAgICBpc0Jyb3dzZXIoKSAmJlxuICAgICAgZnVuY3Rpb24oKSB7fS5iaW5kICYmXG4gICAgICBcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxuICAgICAgT2JqZWN0LmFzc2lnbiAmJlxuICAgICAgT2JqZWN0LmtleXMgJiZcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RvY3VtZW50KG9iaikge1xuICAgIHJldHVybiBvYmoubm9kZVR5cGUgPT09IDk7IC8vIE5vZGUuRE9DVU1FTlRfTk9ERSA9PT0gOVxuICB9XG5cbiAgZnVuY3Rpb24gaXNXaW5kb3cob2JqKSB7XG4gICAgLy8gYG9iaiA9PT0gd2luZG93YCBvciBgb2JqIGluc3RhbmNlb2YgV2luZG93YCBpcyBub3Qgc3VmZmljaWVudCxcbiAgICAvLyBhcyB0aGUgb2JqIG1heSBiZSB0aGUgd2luZG93IG9mIGFuIGlmcmFtZS5cbiAgICByZXR1cm4gb2JqICYmIG9iai5kb2N1bWVudCAmJiBpc0RvY3VtZW50KG9iai5kb2N1bWVudCk7XG4gIH1cblxuICBmdW5jdGlvbiB3aW5kb3dTY3JvbGxlcih3aW4pIHtcbiAgICB2YXIgZG9jID0gd2luLmRvY3VtZW50O1xuICAgIHZhciBib2R5ID0gZG9jLmJvZHk7XG4gICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8qKlxuICAgICAgICogQHNlZSBodHRwOi8vamFtZXMucGFkb2xzZXkuY29tL2phdmFzY3JpcHQvZ2V0LWRvY3VtZW50LWhlaWdodC1jcm9zcy1icm93c2VyL1xuICAgICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgc2Nyb2xsIGhlaWdodCBvZiB0aGUgZG9jdW1lbnQgaW4gcGl4ZWxzXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbEhlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgICBib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgICBodG1sLnNjcm9sbEhlaWdodCxcbiAgICAgICAgICBib2R5Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICBodG1sLm9mZnNldEhlaWdodCxcbiAgICAgICAgICBib2R5LmNsaWVudEhlaWdodCxcbiAgICAgICAgICBodG1sLmNsaWVudEhlaWdodFxuICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAc2VlIGh0dHA6Ly9hbmR5bGFuZ3Rvbi5jby51ay9ibG9nL2RldmVsb3BtZW50L2dldC12aWV3cG9ydC1zaXplLXdpZHRoLWFuZC1oZWlnaHQtamF2YXNjcmlwdFxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHNcbiAgICAgICAqL1xuICAgICAgaGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHdpbi5pbm5lckhlaWdodCB8fCBodG1sLmNsaWVudEhlaWdodCB8fCBib2R5LmNsaWVudEhlaWdodDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogR2V0cyB0aGUgWSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gcGl4ZWxzIHRoZSBwYWdlIGhhcyBzY3JvbGxlZCBhbG9uZyB0aGUgWS1heGlzXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbFk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luLnBhZ2VZT2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gd2luLnBhZ2VZT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChodG1sIHx8IGJvZHkucGFyZW50Tm9kZSB8fCBib2R5KS5zY3JvbGxUb3A7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnRTY3JvbGxlcihlbGVtZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8qKlxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgc2Nyb2xsIGhlaWdodCBvZiB0aGUgZWxlbWVudCBpbiBwaXhlbHNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsSGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCBpbiBwaXhlbHNcbiAgICAgICAqL1xuICAgICAgaGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGVsZW1lbnQub2Zmc2V0SGVpZ2h0LCBlbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEdldHMgdGhlIFkgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHBpeGVscyB0aGUgZWxlbWVudCBoYXMgc2Nyb2xsZWQgYWxvbmcgdGhlIFktYXhpc1xuICAgICAgICovXG4gICAgICBzY3JvbGxZOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTY3JvbGxlcihlbGVtZW50KSB7XG4gICAgcmV0dXJuIGlzV2luZG93KGVsZW1lbnQpID8gd2luZG93U2Nyb2xsZXIoZWxlbWVudCkgOiBlbGVtZW50U2Nyb2xsZXIoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGVsZW1lbnQgRXZlbnRUYXJnZXRcbiAgICovXG4gIGZ1bmN0aW9uIHRyYWNrU2Nyb2xsKGVsZW1lbnQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGlzUGFzc2l2ZVN1cHBvcnRlZCA9IHBhc3NpdmVFdmVudHNTdXBwb3J0ZWQoKTtcbiAgICB2YXIgcmFmSWQ7XG4gICAgdmFyIHNjcm9sbGVkID0gZmFsc2U7XG4gICAgdmFyIHNjcm9sbGVyID0gY3JlYXRlU2Nyb2xsZXIoZWxlbWVudCk7XG4gICAgdmFyIGxhc3RTY3JvbGxZID0gc2Nyb2xsZXIuc2Nyb2xsWSgpO1xuICAgIHZhciBkZXRhaWxzID0ge307XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgc2Nyb2xsWSA9IE1hdGgucm91bmQoc2Nyb2xsZXIuc2Nyb2xsWSgpKTtcbiAgICAgIHZhciBoZWlnaHQgPSBzY3JvbGxlci5oZWlnaHQoKTtcbiAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzY3JvbGxlci5zY3JvbGxIZWlnaHQoKTtcblxuICAgICAgLy8gcmV1c2Ugb2JqZWN0IGZvciBsZXNzIG1lbW9yeSBjaHVyblxuICAgICAgZGV0YWlscy5zY3JvbGxZID0gc2Nyb2xsWTtcbiAgICAgIGRldGFpbHMubGFzdFNjcm9sbFkgPSBsYXN0U2Nyb2xsWTtcbiAgICAgIGRldGFpbHMuZGlyZWN0aW9uID0gc2Nyb2xsWSA+IGxhc3RTY3JvbGxZID8gXCJkb3duXCIgOiBcInVwXCI7XG4gICAgICBkZXRhaWxzLmRpc3RhbmNlID0gTWF0aC5hYnMoc2Nyb2xsWSAtIGxhc3RTY3JvbGxZKTtcbiAgICAgIGRldGFpbHMuaXNPdXRPZkJvdW5kcyA9IHNjcm9sbFkgPCAwIHx8IHNjcm9sbFkgKyBoZWlnaHQgPiBzY3JvbGxIZWlnaHQ7XG4gICAgICBkZXRhaWxzLnRvcCA9IHNjcm9sbFkgPD0gb3B0aW9ucy5vZmZzZXRbZGV0YWlscy5kaXJlY3Rpb25dO1xuICAgICAgZGV0YWlscy5ib3R0b20gPSBzY3JvbGxZICsgaGVpZ2h0ID49IHNjcm9sbEhlaWdodDtcbiAgICAgIGRldGFpbHMudG9sZXJhbmNlRXhjZWVkZWQgPVxuICAgICAgICBkZXRhaWxzLmRpc3RhbmNlID4gb3B0aW9ucy50b2xlcmFuY2VbZGV0YWlscy5kaXJlY3Rpb25dO1xuXG4gICAgICBjYWxsYmFjayhkZXRhaWxzKTtcblxuICAgICAgbGFzdFNjcm9sbFkgPSBzY3JvbGxZO1xuICAgICAgc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICBpZiAoIXNjcm9sbGVkKSB7XG4gICAgICAgIHNjcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZXZlbnRPcHRpb25zID0gaXNQYXNzaXZlU3VwcG9ydGVkXG4gICAgICA/IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogZmFsc2UgfVxuICAgICAgOiBmYWxzZTtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwsIGV2ZW50T3B0aW9ucyk7XG4gICAgdXBkYXRlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZklkKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCwgZXZlbnRPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVXBEb3duKHQpIHtcbiAgICByZXR1cm4gdCA9PT0gT2JqZWN0KHQpID8gdCA6IHsgZG93bjogdCwgdXA6IHQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVSSBlbmhhbmNlbWVudCBmb3IgZml4ZWQgaGVhZGVycy5cbiAgICogSGlkZXMgaGVhZGVyIHdoZW4gc2Nyb2xsaW5nIGRvd25cbiAgICogU2hvd3MgaGVhZGVyIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW0gdGhlIGhlYWRlciBlbGVtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSB3aWRnZXRcbiAgICovXG4gIGZ1bmN0aW9uIEhlYWRyb29tKGVsZW0sIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEhlYWRyb29tLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NlcyA9IE9iamVjdC5hc3NpZ24oe30sIEhlYWRyb29tLm9wdGlvbnMuY2xhc3Nlcywgb3B0aW9ucy5jbGFzc2VzKTtcblxuICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgdGhpcy50b2xlcmFuY2UgPSBub3JtYWxpemVVcERvd24odGhpcy50b2xlcmFuY2UpO1xuICAgIHRoaXMub2Zmc2V0ID0gbm9ybWFsaXplVXBEb3duKHRoaXMub2Zmc2V0KTtcbiAgICB0aGlzLmluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgdGhpcy5mcm96ZW4gPSBmYWxzZTtcbiAgfVxuICBIZWFkcm9vbS5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IEhlYWRyb29tLFxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgbGlzdGVuaW5nIHRvIHNjcm9sbGluZ1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChIZWFkcm9vbS5jdXRzVGhlTXVzdGFyZCAmJiAhdGhpcy5pbml0aWFsaXNlZCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwiaW5pdGlhbFwiKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gZGVmZXIgZXZlbnQgcmVnaXN0cmF0aW9uIHRvIGhhbmRsZSBicm93c2VyXG4gICAgICAgIC8vIHBvdGVudGlhbGx5IHJlc3RvcmluZyBwcmV2aW91cyBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICBmdW5jdGlvbihzZWxmKSB7XG4gICAgICAgICAgICBzZWxmLnNjcm9sbFRyYWNrZXIgPSB0cmFja1Njcm9sbChcbiAgICAgICAgICAgICAgc2VsZi5zY3JvbGxlcixcbiAgICAgICAgICAgICAgeyBvZmZzZXQ6IHNlbGYub2Zmc2V0LCB0b2xlcmFuY2U6IHNlbGYudG9sZXJhbmNlIH0sXG4gICAgICAgICAgICAgIHNlbGYudXBkYXRlLmJpbmQoc2VsZilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMDAsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGUgd2lkZ2V0LCBjbGVhcmluZyB1cCBhZnRlciBpdHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNsYXNzZXMpLmZvckVhY2godGhpcy5yZW1vdmVDbGFzcywgdGhpcyk7XG4gICAgICB0aGlzLnNjcm9sbFRyYWNrZXIuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbnBpbiB0aGUgZWxlbWVudFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bnBpbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5oYXNDbGFzcyhcInBpbm5lZFwiKSB8fCAhdGhpcy5oYXNDbGFzcyhcInVucGlubmVkXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJ1bnBpbm5lZFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInBpbm5lZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5vblVucGluKSB7XG4gICAgICAgICAgdGhpcy5vblVucGluLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGluIHRoZSBlbGVtZW50XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHBpbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5oYXNDbGFzcyhcInVucGlubmVkXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJwaW5uZWRcIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJ1bnBpbm5lZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5vblBpbikge1xuICAgICAgICAgIHRoaXMub25QaW4uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBGcmVlemVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB3aWRnZXRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZnJlZXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZnJvemVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoXCJmcm96ZW5cIik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlLWVuYWJsZXMgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIHRoZSB3aWRnZXRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5mcmVlemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5mcm96ZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJmcm96ZW5cIik7XG4gICAgfSxcblxuICAgIHRvcDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoXCJ0b3BcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInRvcFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcIm5vdFRvcFwiKTtcblxuICAgICAgICBpZiAodGhpcy5vblRvcCkge1xuICAgICAgICAgIHRoaXMub25Ub3AuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBub3RUb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKFwibm90VG9wXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub3RUb3BcIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJ0b3BcIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25Ob3RUb3ApIHtcbiAgICAgICAgICB0aGlzLm9uTm90VG9wLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYm90dG9tOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcImJvdHRvbVwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwiYm90dG9tXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwibm90Qm90dG9tXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uQm90dG9tKSB7XG4gICAgICAgICAgdGhpcy5vbkJvdHRvbS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG5vdEJvdHRvbTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoXCJub3RCb3R0b21cIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vdEJvdHRvbVwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcImJvdHRvbVwiKTtcblxuICAgICAgICBpZiAodGhpcy5vbk5vdEJvdHRvbSkge1xuICAgICAgICAgIHRoaXMub25Ob3RCb3R0b20uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG91bGRVbnBpbjogZnVuY3Rpb24oZGV0YWlscykge1xuICAgICAgdmFyIHNjcm9sbGluZ0Rvd24gPSBkZXRhaWxzLmRpcmVjdGlvbiA9PT0gXCJkb3duXCI7XG5cbiAgICAgIHJldHVybiBzY3JvbGxpbmdEb3duICYmICFkZXRhaWxzLnRvcCAmJiBkZXRhaWxzLnRvbGVyYW5jZUV4Y2VlZGVkO1xuICAgIH0sXG5cbiAgICBzaG91bGRQaW46IGZ1bmN0aW9uKGRldGFpbHMpIHtcbiAgICAgIHZhciBzY3JvbGxpbmdVcCA9IGRldGFpbHMuZGlyZWN0aW9uID09PSBcInVwXCI7XG5cbiAgICAgIHJldHVybiAoc2Nyb2xsaW5nVXAgJiYgZGV0YWlscy50b2xlcmFuY2VFeGNlZWRlZCkgfHwgZGV0YWlscy50b3A7XG4gICAgfSxcblxuICAgIGFkZENsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkLmFwcGx5KFxuICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LFxuICAgICAgICB0aGlzLmNsYXNzZXNbY2xhc3NOYW1lXS5zcGxpdChcIiBcIilcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlLmFwcGx5KFxuICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LFxuICAgICAgICB0aGlzLmNsYXNzZXNbY2xhc3NOYW1lXS5zcGxpdChcIiBcIilcbiAgICAgICk7XG4gICAgfSxcblxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsYXNzZXNbY2xhc3NOYW1lXS5zcGxpdChcIiBcIikuZXZlcnkoZnVuY3Rpb24oY2xzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucyhjbHMpO1xuICAgICAgfSwgdGhpcy5lbGVtKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICBpZiAoZGV0YWlscy5pc091dE9mQm91bmRzKSB7XG4gICAgICAgIC8vIElnbm9yZSBib3VuY3kgc2Nyb2xsaW5nIGluIE9TWFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZyb3plbiA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkZXRhaWxzLnRvcCkge1xuICAgICAgICB0aGlzLnRvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub3RUb3AoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRldGFpbHMuYm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdEJvdHRvbSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zaG91bGRVbnBpbihkZXRhaWxzKSkge1xuICAgICAgICB0aGlzLnVucGluKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvdWxkUGluKGRldGFpbHMpKSB7XG4gICAgICAgIHRoaXMucGluKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IG9wdGlvbnNcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIEhlYWRyb29tLm9wdGlvbnMgPSB7XG4gICAgdG9sZXJhbmNlOiB7XG4gICAgICB1cDogMCxcbiAgICAgIGRvd246IDBcbiAgICB9LFxuICAgIG9mZnNldDogMCxcbiAgICBzY3JvbGxlcjogaXNCcm93c2VyKCkgPyB3aW5kb3cgOiBudWxsLFxuICAgIGNsYXNzZXM6IHtcbiAgICAgIGZyb3plbjogXCJoZWFkcm9vbS0tZnJvemVuXCIsXG4gICAgICBwaW5uZWQ6IFwiaGVhZHJvb20tLXBpbm5lZFwiLFxuICAgICAgdW5waW5uZWQ6IFwiaGVhZHJvb20tLXVucGlubmVkXCIsXG4gICAgICB0b3A6IFwiaGVhZHJvb20tLXRvcFwiLFxuICAgICAgbm90VG9wOiBcImhlYWRyb29tLS1ub3QtdG9wXCIsXG4gICAgICBib3R0b206IFwiaGVhZHJvb20tLWJvdHRvbVwiLFxuICAgICAgbm90Qm90dG9tOiBcImhlYWRyb29tLS1ub3QtYm90dG9tXCIsXG4gICAgICBpbml0aWFsOiBcImhlYWRyb29tXCJcbiAgICB9XG4gIH07XG5cbiAgSGVhZHJvb20uY3V0c1RoZU11c3RhcmQgPSBpc1N1cHBvcnRlZCgpO1xuXG4gIHJldHVybiBIZWFkcm9vbTtcblxufSkpO1xuIiwibGV0IGdyZWV0aW5ncyA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBzZXR0aW5ncyA9IHtcbiAgICBncmVldGluZzogJ3lvdScsXG4gICAgaGlCZWZvcmU6ICdIZXlvJyxcbiAgICBoaUFmdGVyOiAnJyxcbiAgICBieWVCZWZvcmU6ICdTZWUgeWEgbGF0ZXInLFxuICAgIGJ5ZUFmdGVyOiAnVGFrZSBpdCBlYXN5LicgIFxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3MgKG9wdGlvbnMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBzYXlIaSAobmFtZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3NldHRpbmdzLmhpQmVmb3JlfSAke25hbWUgPyBuYW1lIDogc2V0dGluZ3MuZ3JlZXRpbmd9ICR7c2V0dGluZ3MuaGlBZnRlcn1gXG4gICAgKVxuICAgIHJldHVybiBcbiAgfVxuXG4gIGZ1bmN0aW9uIHNheUJ5ZSAobmFtZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJyVjJXMnLCBcbiAgICAgICdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcbiAgICAgIGAke3NldHRpbmdzLmJ5ZUJlZm9yZX0gJHtuYW1lID8gbmFtZSA6IHNldHRpbmdzLmdyZWV0aW5nfSAke3NldHRpbmdzLmJ5ZUFmdGVyfWBcbiAgICApXG5cbiAgICByZXR1cm4gXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZVNldHRpbmdzLFxuICAgIHNheUhpLFxuICAgIHNheUJ5ZSAgICBcbiAgfVxufSkoKVxuXG4vLyBncmVldGluZ3MudXBkYXRlU2V0dGluZ3Moe1xuLy8gICBncmVldGluZ3M6ICd3b3JsZCdcbi8vIH0pXG5cbi8vIGdyZWV0aW5ncy5zYXlIaSgnbWVybGluJyk7XG4vLyBncmVldGluZ3Muc2F5QnllKCdtb3JnYW4nKTtcblxubGV0IEdyZWV0aW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgZ3JlZXRpbmc6ICd5b3UnLFxuICAgIGhpQmVmb3JlOiAnSGV5bycsXG4gICAgaGlBZnRlcjogJycsXG4gICAgYnllQmVmb3JlOiAnU2VlIHlhIGxhdGVyJyxcbiAgICBieWVBZnRlcjogJ1Rha2UgaXQgZWFzeS4nXG4gIH1cblxuICBjb25zdCBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpXG5cbiAgICBPYmplY3QuZnJlZXplKHNldHRpbmdzKVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgX25hbWU6IHsgdmFsdWU6IG5hbWUgfSxcbiAgICAgIF9zZXR0aW5nczogeyB2YWx1ZTogc2V0dGluZ3MgfVxuICAgIH0pXG4gIH0gXG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZS5zYXlIaSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICclYyVzJywgXG4gICAgICAnY29sb3I6IHBpbms7Zm9udC1zaXplOiAyNXB4JywgXG4gICAgICBgJHt0aGlzLl9zZXR0aW5ncy5oaUJlZm9yZX0gJHt0aGlzLl9uYW1lfSAke3RoaXMuX3NldHRpbmdzLmhpQWZ0ZXJ9YFxuICAgIClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnNheUJ5ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICclYyVzJywgXG4gICAgICAnY29sb3I6IHBpbms7Zm9udC1zaXplOiAyNXB4JywgXG4gICAgICBgJHt0aGlzLl9zZXR0aW5ncy5ieWVCZWZvcmV9ICR7dGhpcy5fbmFtZX0gJHt0aGlzLl9zZXR0aW5ncy5ieWVBZnRlcn1gXG4gICAgKVxuICAgIFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZXR1cm4gQ29uc3RydWN0b3Jcbn0pKClcblxuY29uc3QgbWVybGluID0gbmV3IEdyZWV0aW5nKCdNZXJsaW4nLCB7XG4gIGhpQWZ0ZXI6ICcuJ1xufSk7XG5cbmNvbnNvbGUubG9nKG1lcmxpbi5uYW1lKVxuY29uc29sZS5sb2cobWVybGluLnNldHRpbmdzKVxuXG5tZXJsaW4uc2F5SGkoKS5zYXlCeWUoKTtcbndpbmRvdy5HcmVldGluZyA9IEdyZWV0aW5nIiwiLyoqXG4qICogRE9NIE1hbmlwdWxhdGlvbiBMSWJyYXJpZXNcbiogMS4gaHR0cHM6Ly9zY3JvbGxyZXZlYWxqcy5vcmcvXG4qIDIuIGh0dHBzOi8vcGhvdG9zd2lwZS5jb20vXG4qICogRE9NIG1hbmlwdWxhdGlvbiBsaWJyYXJpZXMgaGF2ZSBzb21lIHVuaXF1ZSBjb25zaWRlcmF0aW9ucyBjb21wYXJlZCB0byB1dGlsaXR5IGxpYnJhcmllcy5cbiogKiBIb3cgY2FuIHdlIGNvbnZlcnQgdGhpcyBpbnRvIGEgbGlicmFyeVxuKiAxLiBJbmplY3RpbmcgY29udGVudCBpbnRvIHRoZSBET01cbiogMi4gTGlzdGVuaW5nIGZvciBldmVudHNcbiogMy4gQWRkaW5nIG9wdGlvbnMgYW5kIHNldHRpbmdzXG4qIDQuIEV4cG9zaW5nIHB1YmxpYyBtZXRob2RzXG4qIDUuIERlc3Ryb3lpbmcgdGhlIGluc3RhbnRpYXRpb25cbiAqL1xuXG5jb25zdCBlZ2cgPSAoZnVuY3Rpb24oKSB7XG4gIC8vIEdldCB0aGUgZWxlbWVudFxuICBjb25zdCBpbml0ID0gIGZ1bmN0aW9uKCkge1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VnZycpO1xuICAgIGxldCBzY2FsZWQgPSBmYWxzZTtcbiAgXG4gICAgLy8gQ3JlYXRlIGJ1dHRvblxuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidG4uaW5uZXJIVE1MID0gJ/CfpZonO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgY2xpY2sgbWVgKTtcbiAgICBidG4uc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbic7XG4gIFxuICAgIC8vIEluamVjdCBpbnRvIHRoZSBET01cbiAgICBlbGVtLmFwcGVuZChidG4pO1xuICBcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9nZ2xlICgpIHtcbiAgICAgIC8vIElmIHRoZSBidXR0b24gaXMgc2NhbGVkLCBzaHJpbmsgaXRcbiAgICAgIC8vIE90aGVyd2lzZSwgZ3JvdyBpdFxuICAgICAgYnRuLnN0eWxlLnRyYW5zZm9ybSA9IHNjYWxlZCA/ICcnIDogJ3NjYWxlKDIpJztcbiAgXG4gICAgICAvLyBGbGlwIHRoZSBzY2FsZWQgc3RhdGVcbiAgICAgIHNjYWxlZCA9ICFzY2FsZWQ7XG4gICAgfVxuICBcbiAgICAvLyBMaXN0ZW4gZm9yIGNsaWNrcyBvbiB0aGUgYnV0dG9uXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlKTtcbiAgfVxuICBcbiAgcmV0dXJuIHsgaW5pdCB9XG59KSgpXG5cbmVnZy5pbml0KClcbiIsImltcG9ydCBIZWFkcm9vbSBmcm9tICdoZWFkcm9vbS5qcyc7XG5cbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuY29uc3QgaGVhZHJvb20gPSBuZXcgSGVhZHJvb20oaGVhZGVyKTtcbmhlYWRyb29tLmluaXQoKTtcbmhlYWRyb29tLnRvcCgpOyJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJobFlXUnliMjl0TG1wekwyUnBjM1F2YUdWaFpISnZiMjB1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMk52Ym5OMGNuVmpkRzl5TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDNOeVl5OXFjeTlrYjIwdGJXRnVhWEIxYkdGMGFXOXVMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OXBibVJsZUM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8xRkJRVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdPenRSUVVkQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTd3dRMEZCTUVNc1owTkJRV2RETzFGQlF6RkZPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNkMFJCUVhkRUxHdENRVUZyUWp0UlFVTXhSVHRSUVVOQkxHbEVRVUZwUkN4alFVRmpPMUZCUXk5RU96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVN4NVEwRkJlVU1zYVVOQlFXbERPMUZCUXpGRkxHZElRVUZuU0N4dFFrRkJiVUlzUlVGQlJUdFJRVU55U1R0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTERKQ1FVRXlRaXd3UWtGQk1FSXNSVUZCUlR0UlFVTjJSQ3hwUTBGQmFVTXNaVUZCWlR0UlFVTm9SRHRSUVVOQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVN4elJFRkJjMFFzSzBSQlFTdEVPenRSUVVWeVNEdFJRVU5CT3pzN1VVRkhRVHRSUVVOQk96czdPenM3T3pzN096czdRVU5zUmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVVc1MwRkJORVE3UVVGRE9VUXNSVUZCUlN4VFFVTnpSRHRCUVVONFJDeERRVUZETEc5Q1FVRnZRanM3UVVGRmNrSTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxQ1FVRnRRanRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFTdzRRa0ZCT0VJN1FVRkRPVUk3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYTBJc1QwRkJUenRCUVVONlFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdPMEZCUlZBN1FVRkRRVHRCUVVOQkxHdENRVUZyUWl4UFFVRlBPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdPMEZCUlZBN1FVRkRRVHRCUVVOQkxHdENRVUZyUWl4UFFVRlBPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2EwSkJRV3RDTEU5QlFVODdRVUZEZWtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPenRCUVVWUU8wRkJRMEVzYTBKQlFXdENMRTlCUVU4N1FVRkRla0k3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVRHRCUVVOQk8wRkJRMEVzYTBKQlFXdENMRTlCUVU4N1FVRkRla0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc1UwRkJVenRCUVVOVU96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hyUTBGQmEwTTdRVUZEYkVNN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR0ZCUVdFc1YwRkJWenRCUVVONFFpeGhRVUZoTEU5QlFVODdRVUZEY0VJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHRRMEZCYlVNN08wRkJSVzVETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeGxRVUZsTEdsRVFVRnBSRHRCUVVOb1JUdEJRVU5CTzBGQlEwRXNWMEZCVnp0QlFVTllPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMT3p0QlFVVk1PMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk96dEJRVVZCTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk96dEJRVVZCTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEZsQlFWazdRVUZEV2p0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCT3p0QlFVVkJMRU5CUVVNN096czdPenM3T3pzN096dEJRM0JpUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMSFZEUVVGMVF6dEJRVU4yUXp0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxQ1FVRnRRanRCUVVOdVFpeFRRVUZUTEd0Q1FVRnJRaXhIUVVGSExHZERRVUZuUXl4SFFVRkhMR2xDUVVGcFFqdEJRVU5zUmp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNiVUpCUVcxQ08wRkJRMjVDTEZOQlFWTXNiVUpCUVcxQ0xFZEJRVWNzWjBOQlFXZERMRWRCUVVjc2EwSkJRV3RDTzBGQlEzQkdPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJMRWxCUVVrN08wRkJSVW83UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMR2xFUVVGcFJEdEJRVU5xUkN4eFEwRkJjVU03TzBGQlJYSkRPenRCUVVWQk8wRkJRMEVzWTBGQll5eGpRVUZqTzBGQlF6VkNMR3RDUVVGclFqdEJRVU5zUWl4TFFVRkxPMEZCUTB3c1J6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRzFDUVVGdFFqdEJRVU51UWl4VFFVRlRMSGRDUVVGM1FpeEhRVUZITEZkQlFWY3NSMEZCUnl4MVFrRkJkVUk3UVVGRGVrVTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxQ1FVRnRRanRCUVVOdVFpeFRRVUZUTEhsQ1FVRjVRaXhIUVVGSExGZEJRVmNzUjBGQlJ5eDNRa0ZCZDBJN1FVRkRNMFU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJMRU5CUVVNN08wRkJSVVE3UVVGRFFUczdRVUZGUVR0QlFVTkJMREJDT3pzN096czdPenM3T3p0QlF5OUdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVN4VlFVRlZPMEZCUTFZc1EwRkJRenM3UVVGRlJEczdPenM3T3pzN096czdPenRCUXk5RFFUdEJRVUZCTzBGQlFVRTdRVUZCYlVNN08wRkJSVzVETzBGQlEwRXNjVUpCUVhGQ0xHdEVRVUZSTzBGQlF6ZENPMEZCUTBFc1pTSXNJbVpwYkdVaU9pSXpZVFk1WlRBeE0ySmpOMkV5TUdFM05qRTROUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpQmNkQzh2SUZSb1pTQnRiMlIxYkdVZ1kyRmphR1ZjYmlCY2RIWmhjaUJwYm5OMFlXeHNaV1JOYjJSMWJHVnpJRDBnZTMwN1hHNWNiaUJjZEM4dklGUm9aU0J5WlhGMWFYSmxJR1oxYm1OMGFXOXVYRzRnWEhSbWRXNWpkR2x2YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktHMXZaSFZzWlVsa0tTQjdYRzVjYmlCY2RGeDBMeThnUTJobFkyc2dhV1lnYlc5a2RXeGxJR2x6SUdsdUlHTmhZMmhsWEc0Z1hIUmNkR2xtS0dsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkS1NCN1hHNGdYSFJjZEZ4MGNtVjBkWEp1SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1WNGNHOXlkSE03WEc0Z1hIUmNkSDFjYmlCY2RGeDBMeThnUTNKbFlYUmxJR0VnYm1WM0lHMXZaSFZzWlNBb1lXNWtJSEIxZENCcGRDQnBiblJ2SUhSb1pTQmpZV05vWlNsY2JpQmNkRngwZG1GeUlHMXZaSFZzWlNBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZElEMGdlMXh1SUZ4MFhIUmNkR2s2SUcxdlpIVnNaVWxrTEZ4dUlGeDBYSFJjZEd3NklHWmhiSE5sTEZ4dUlGeDBYSFJjZEdWNGNHOXlkSE02SUh0OVhHNGdYSFJjZEgwN1hHNWNiaUJjZEZ4MEx5OGdSWGhsWTNWMFpTQjBhR1VnYlc5a2RXeGxJR1oxYm1OMGFXOXVYRzRnWEhSY2RHMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtTmhiR3dvYlc5a2RXeGxMbVY0Y0c5eWRITXNJRzF2WkhWc1pTd2diVzlrZFd4bExtVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBPMXh1WEc0Z1hIUmNkQzh2SUVac1lXY2dkR2hsSUcxdlpIVnNaU0JoY3lCc2IyRmtaV1JjYmlCY2RGeDBiVzlrZFd4bExtd2dQU0IwY25WbE8xeHVYRzRnWEhSY2RDOHZJRkpsZEhWeWJpQjBhR1VnWlhod2IzSjBjeUJ2WmlCMGFHVWdiVzlrZFd4bFhHNGdYSFJjZEhKbGRIVnliaUJ0YjJSMWJHVXVaWGh3YjNKMGN6dGNiaUJjZEgxY2JseHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pYTWdiMkpxWldOMElDaGZYM2RsWW5CaFkydGZiVzlrZFd4bGMxOWZLVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXRJRDBnYlc5a2RXeGxjenRjYmx4dUlGeDBMeThnWlhod2IzTmxJSFJvWlNCdGIyUjFiR1VnWTJGamFHVmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVl5QTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1JsWm1sdVpTQm5aWFIwWlhJZ1puVnVZM1JwYjI0Z1ptOXlJR2hoY20xdmJua2daWGh3YjNKMGMxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1a0lEMGdablZ1WTNScGIyNG9aWGh3YjNKMGN5d2dibUZ0WlN3Z1oyVjBkR1Z5S1NCN1hHNGdYSFJjZEdsbUtDRmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbThvWlhod2IzSjBjeXdnYm1GdFpTa3BJSHRjYmlCY2RGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z2JtRnRaU3dnZXlCbGJuVnRaWEpoWW14bE9pQjBjblZsTENCblpYUTZJR2RsZEhSbGNpQjlLVHRjYmlCY2RGeDBmVnh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdaR1ZtYVc1bElGOWZaWE5OYjJSMWJHVWdiMjRnWlhod2IzSjBjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXlJRDBnWm5WdVkzUnBiMjRvWlhod2IzSjBjeWtnZTF4dUlGeDBYSFJwWmloMGVYQmxiMllnVTNsdFltOXNJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJUZVcxaWIyd3VkRzlUZEhKcGJtZFVZV2NwSUh0Y2JpQmNkRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dVM2x0WW05c0xuUnZVM1J5YVc1blZHRm5MQ0I3SUhaaGJIVmxPaUFuVFc5a2RXeGxKeUI5S1R0Y2JpQmNkRngwZlZ4dUlGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z0oxOWZaWE5OYjJSMWJHVW5MQ0I3SUhaaGJIVmxPaUIwY25WbElIMHBPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdZM0psWVhSbElHRWdabUZyWlNCdVlXMWxjM0JoWTJVZ2IySnFaV04wWEc0Z1hIUXZMeUJ0YjJSbElDWWdNVG9nZG1Gc2RXVWdhWE1nWVNCdGIyUjFiR1VnYVdRc0lISmxjWFZwY21VZ2FYUmNiaUJjZEM4dklHMXZaR1VnSmlBeU9pQnRaWEpuWlNCaGJHd2djSEp2Y0dWeWRHbGxjeUJ2WmlCMllXeDFaU0JwYm5SdklIUm9aU0J1YzF4dUlGeDBMeThnYlc5a1pTQW1JRFE2SUhKbGRIVnliaUIyWVd4MVpTQjNhR1Z1SUdGc2NtVmhaSGtnYm5NZ2IySnFaV04wWEc0Z1hIUXZMeUJ0YjJSbElDWWdPSHd4T2lCaVpXaGhkbVVnYkdsclpTQnlaWEYxYVhKbFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5RZ1BTQm1kVzVqZEdsdmJpaDJZV3gxWlN3Z2JXOWtaU2tnZTF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnTVNrZ2RtRnNkV1VnUFNCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktIWmhiSFZsS1R0Y2JpQmNkRngwYVdZb2JXOWtaU0FtSURncElISmxkSFZ5YmlCMllXeDFaVHRjYmlCY2RGeDBhV1lvS0cxdlpHVWdKaUEwS1NBbUppQjBlWEJsYjJZZ2RtRnNkV1VnUFQwOUlDZHZZbXBsWTNRbklDWW1JSFpoYkhWbElDWW1JSFpoYkhWbExsOWZaWE5OYjJSMWJHVXBJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQmNkRngwZG1GeUlHNXpJRDBnVDJKcVpXTjBMbU55WldGMFpTaHVkV3hzS1R0Y2JpQmNkRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1eUtHNXpLVHRjYmlCY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0c1ekxDQW5aR1ZtWVhWc2RDY3NJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnZG1Gc2RXVTZJSFpoYkhWbElIMHBPMXh1SUZ4MFhIUnBaaWh0YjJSbElDWWdNaUFtSmlCMGVYQmxiMllnZG1Gc2RXVWdJVDBnSjNOMGNtbHVaeWNwSUdadmNpaDJZWElnYTJWNUlHbHVJSFpoYkhWbEtTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFvYm5Nc0lHdGxlU3dnWm5WdVkzUnBiMjRvYTJWNUtTQjdJSEpsZEhWeWJpQjJZV3gxWlZ0clpYbGRPeUI5TG1KcGJtUW9iblZzYkN3Z2EyVjVLU2s3WEc0Z1hIUmNkSEpsZEhWeWJpQnVjenRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR2RsZEVSbFptRjFiSFJGZUhCdmNuUWdablZ1WTNScGIyNGdabTl5SUdOdmJYQmhkR2xpYVd4cGRIa2dkMmwwYUNCdWIyNHRhR0Z5Ylc5dWVTQnRiMlIxYkdWelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG00Z1BTQm1kVzVqZEdsdmJpaHRiMlIxYkdVcElIdGNiaUJjZEZ4MGRtRnlJR2RsZEhSbGNpQTlJRzF2WkhWc1pTQW1KaUJ0YjJSMWJHVXVYMTlsYzAxdlpIVnNaU0EvWEc0Z1hIUmNkRngwWm5WdVkzUnBiMjRnWjJWMFJHVm1ZWFZzZENncElIc2djbVYwZFhKdUlHMXZaSFZzWlZzblpHVm1ZWFZzZENkZE95QjlJRHBjYmlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSTmIyUjFiR1ZGZUhCdmNuUnpLQ2tnZXlCeVpYUjFjbTRnYlc5a2RXeGxPeUI5TzF4dUlGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb1oyVjBkR1Z5TENBbllTY3NJR2RsZEhSbGNpazdYRzRnWEhSY2RISmxkSFZ5YmlCblpYUjBaWEk3WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3hjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieUE5SUdaMWJtTjBhVzl1S0c5aWFtVmpkQ3dnY0hKdmNHVnlkSGtwSUhzZ2NtVjBkWEp1SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNodlltcGxZM1FzSUhCeWIzQmxjblI1S1RzZ2ZUdGNibHh1SUZ4MEx5OGdYMTkzWldKd1lXTnJYM0IxWW14cFkxOXdZWFJvWDE5Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y0NBOUlGd2lYQ0k3WEc1Y2JseHVJRngwTHk4Z1RHOWhaQ0JsYm5SeWVTQnRiMlIxYkdVZ1lXNWtJSEpsZEhWeWJpQmxlSEJ2Y25SelhHNGdYSFJ5WlhSMWNtNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWhmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5NZ1BTQXdLVHRjYmlJc0lpOHFJVnh1SUNvZ2FHVmhaSEp2YjIwdWFuTWdkakF1TVRJdU1DQXRJRWRwZG1VZ2VXOTFjaUJ3WVdkbElITnZiV1VnYUdWaFpISnZiMjB1SUVocFpHVWdlVzkxY2lCb1pXRmtaWElnZFc1MGFXd2dlVzkxSUc1bFpXUWdhWFJjYmlBcUlFTnZjSGx5YVdkb2RDQW9ZeWtnTWpBeU1DQk9hV05ySUZkcGJHeHBZVzF6SUMwZ2FIUjBjRG92TDNkcFkydDVMbTVwYkd4cFlTNXRjeTlvWldGa2NtOXZiUzVxYzF4dUlDb2dUR2xqWlc1elpUb2dUVWxVWEc0Z0tpOWNibHh1S0daMWJtTjBhVzl1SUNobmJHOWlZV3dzSUdaaFkzUnZjbmtwSUh0Y2JpQWdkSGx3Wlc5bUlHVjRjRzl5ZEhNZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhSNWNHVnZaaUJ0YjJSMWJHVWdJVDA5SUNkMWJtUmxabWx1WldRbklEOGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1ZV04wYjNKNUtDa2dPbHh1SUNCMGVYQmxiMllnWkdWbWFXNWxJRDA5UFNBblpuVnVZM1JwYjI0bklDWW1JR1JsWm1sdVpTNWhiV1FnUHlCa1pXWnBibVVvWm1GamRHOXllU2tnT2x4dUlDQW9aMnh2WW1Gc0lEMGdaMnh2WW1Gc0lIeDhJSE5sYkdZc0lHZHNiMkpoYkM1SVpXRmtjbTl2YlNBOUlHWmhZM1J2Y25rb0tTazdYRzU5S0hSb2FYTXNJR1oxYm1OMGFXOXVJQ2dwSUhzZ0ozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0Z0lHWjFibU4wYVc5dUlHbHpRbkp2ZDNObGNpZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwZ1hDSjFibVJsWm1sdVpXUmNJanRjYmlBZ2ZWeHVYRzRnSUM4cUtseHVJQ0FnS2lCVmMyVmtJSFJ2SUdSbGRHVmpkQ0JpY205M2MyVnlJSE4xY0hCdmNuUWdabTl5SUdGa1pHbHVaeUJoYmlCbGRtVnVkQ0JzYVhOMFpXNWxjaUIzYVhSb0lHOXdkR2x2Ym5OY2JpQWdJQ29nUTNKbFpHbDBPaUJvZEhSd2N6b3ZMMlJsZG1Wc2IzQmxjaTV0YjNwcGJHeGhMbTl5Wnk5bGJpMVZVeTlrYjJOekwxZGxZaTlCVUVrdlJYWmxiblJVWVhKblpYUXZZV1JrUlhabGJuUk1hWE4wWlc1bGNseHVJQ0FnS2k5Y2JpQWdablZ1WTNScGIyNGdjR0Z6YzJsMlpVVjJaVzUwYzFOMWNIQnZjblJsWkNncElIdGNiaUFnSUNCMllYSWdjM1Z3Y0c5eWRHVmtJRDBnWm1Gc2MyVTdYRzVjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnZG1GeUlHOXdkR2x2Ym5NZ1BTQjdYRzRnSUNBZ0lDQWdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMVzVsZUhRdGJHbHVaU0JuWlhSMFpYSXRjbVYwZFhKdVhHNGdJQ0FnSUNBZ0lHZGxkQ0J3WVhOemFYWmxLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lITjFjSEJ2Y25SbFpDQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMDdYRzRnSUNBZ0lDQjNhVzVrYjNjdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0luUmxjM1JjSWl3Z2IzQjBhVzl1Y3l3Z2IzQjBhVzl1Y3lrN1hHNGdJQ0FnSUNCM2FXNWtiM2N1Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2loY0luUmxjM1JjSWl3Z2IzQjBhVzl1Y3l3Z2IzQjBhVzl1Y3lrN1hHNGdJQ0FnZlNCallYUmphQ0FvWlhKeUtTQjdYRzRnSUNBZ0lDQnpkWEJ3YjNKMFpXUWdQU0JtWVd4elpUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnYzNWd2NHOXlkR1ZrTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2FYTlRkWEJ3YjNKMFpXUW9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlDRWhLRnh1SUNBZ0lDQWdhWE5DY205M2MyVnlLQ2tnSmlaY2JpQWdJQ0FnSUdaMWJtTjBhVzl1S0NrZ2UzMHVZbWx1WkNBbUpseHVJQ0FnSUNBZ1hDSmpiR0Z6YzB4cGMzUmNJaUJwYmlCa2IyTjFiV1Z1ZEM1a2IyTjFiV1Z1ZEVWc1pXMWxiblFnSmlaY2JpQWdJQ0FnSUU5aWFtVmpkQzVoYzNOcFoyNGdKaVpjYmlBZ0lDQWdJRTlpYW1WamRDNXJaWGx6SUNZbVhHNGdJQ0FnSUNCeVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVmNiaUFnSUNBcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdhWE5FYjJOMWJXVnVkQ2h2WW1vcElIdGNiaUFnSUNCeVpYUjFjbTRnYjJKcUxtNXZaR1ZVZVhCbElEMDlQU0E1T3lBdkx5Qk9iMlJsTGtSUFExVk5SVTVVWDA1UFJFVWdQVDA5SURsY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHbHpWMmx1Wkc5M0tHOWlhaWtnZTF4dUlDQWdJQzh2SUdCdlltb2dQVDA5SUhkcGJtUnZkMkFnYjNJZ1lHOWlhaUJwYm5OMFlXNWpaVzltSUZkcGJtUnZkMkFnYVhNZ2JtOTBJSE4xWm1acFkybGxiblFzWEc0Z0lDQWdMeThnWVhNZ2RHaGxJRzlpYWlCdFlYa2dZbVVnZEdobElIZHBibVJ2ZHlCdlppQmhiaUJwWm5KaGJXVXVYRzRnSUNBZ2NtVjBkWEp1SUc5aWFpQW1KaUJ2WW1vdVpHOWpkVzFsYm5RZ0ppWWdhWE5FYjJOMWJXVnVkQ2h2WW1vdVpHOWpkVzFsYm5RcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdkMmx1Wkc5M1UyTnliMnhzWlhJb2QybHVLU0I3WEc0Z0lDQWdkbUZ5SUdSdll5QTlJSGRwYmk1a2IyTjFiV1Z1ZER0Y2JpQWdJQ0IyWVhJZ1ltOWtlU0E5SUdSdll5NWliMlI1TzF4dUlDQWdJSFpoY2lCb2RHMXNJRDBnWkc5akxtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZER0Y2JseHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBcUlFQnpaV1VnYUhSMGNEb3ZMMnBoYldWekxuQmhaRzlzYzJWNUxtTnZiUzlxWVhaaGMyTnlhWEIwTDJkbGRDMWtiMk4xYldWdWRDMW9aV2xuYUhRdFkzSnZjM010WW5KdmQzTmxjaTljYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnZEdobElITmpjbTlzYkNCb1pXbG5hSFFnYjJZZ2RHaGxJR1J2WTNWdFpXNTBJR2x1SUhCcGVHVnNjMXh1SUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0J6WTNKdmJHeElaV2xuYUhRNklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdUV0YwYUM1dFlYZ29YRzRnSUNBZ0lDQWdJQ0FnWW05a2VTNXpZM0p2Ykd4SVpXbG5hSFFzWEc0Z0lDQWdJQ0FnSUNBZ2FIUnRiQzV6WTNKdmJHeElaV2xuYUhRc1hHNGdJQ0FnSUNBZ0lDQWdZbTlrZVM1dlptWnpaWFJJWldsbmFIUXNYRzRnSUNBZ0lDQWdJQ0FnYUhSdGJDNXZabVp6WlhSSVpXbG5hSFFzWEc0Z0lDQWdJQ0FnSUNBZ1ltOWtlUzVqYkdsbGJuUklaV2xuYUhRc1hHNGdJQ0FnSUNBZ0lDQWdhSFJ0YkM1amJHbGxiblJJWldsbmFIUmNiaUFnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJSDBzWEc1Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dRSE5sWlNCb2RIUndPaTh2WVc1a2VXeGhibWQwYjI0dVkyOHVkV3N2WW14dlp5OWtaWFpsYkc5d2JXVnVkQzluWlhRdGRtbGxkM0J2Y25RdGMybDZaUzEzYVdSMGFDMWhibVF0YUdWcFoyaDBMV3BoZG1GelkzSnBjSFJjYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnZEdobElHaGxhV2RvZENCdlppQjBhR1VnZG1sbGQzQnZjblFnYVc0Z2NHbDRaV3h6WEc0Z0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUdobGFXZG9kRG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCM2FXNHVhVzV1WlhKSVpXbG5hSFFnZkh3Z2FIUnRiQzVqYkdsbGJuUklaV2xuYUhRZ2ZId2dZbTlrZVM1amJHbGxiblJJWldsbmFIUTdYRzRnSUNBZ0lDQjlMRnh1WEc0Z0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBcUlFZGxkSE1nZEdobElGa2djMk55YjJ4c0lIQnZjMmwwYVc5dVhHNGdJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlIQnBlR1ZzY3lCMGFHVWdjR0ZuWlNCb1lYTWdjMk55YjJ4c1pXUWdZV3h2Ym1jZ2RHaGxJRmt0WVhocGMxeHVJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQnpZM0p2Ykd4Wk9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIZHBiaTV3WVdkbFdVOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhkcGJpNXdZV2RsV1U5bVpuTmxkRHRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlBb2FIUnRiQ0I4ZkNCaWIyUjVMbkJoY21WdWRFNXZaR1VnZkh3Z1ltOWtlU2t1YzJOeWIyeHNWRzl3TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCbGJHVnRaVzUwVTJOeWIyeHNaWElvWld4bGJXVnVkQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnZEdobElITmpjbTlzYkNCb1pXbG5hSFFnYjJZZ2RHaGxJR1ZzWlcxbGJuUWdhVzRnY0dsNFpXeHpYRzRnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJSE5qY205c2JFaGxhV2RvZERvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQk5ZWFJvTG0xaGVDaGNiaUFnSUNBZ0lDQWdJQ0JsYkdWdFpXNTBMbk5qY205c2JFaGxhV2RvZEN4Y2JpQWdJQ0FnSUNBZ0lDQmxiR1Z0Wlc1MExtOW1abk5sZEVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnSUNCbGJHVnRaVzUwTG1Oc2FXVnVkRWhsYVdkb2RGeHVJQ0FnSUNBZ0lDQXBPMXh1SUNBZ0lDQWdmU3hjYmx4dUlDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlIUm9aU0JvWldsbmFIUWdiMllnZEdobElHVnNaVzFsYm5RZ2FXNGdjR2w0Wld4elhHNGdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lHaGxhV2RvZERvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQk5ZWFJvTG0xaGVDaGxiR1Z0Wlc1MExtOW1abk5sZEVobGFXZG9kQ3dnWld4bGJXVnVkQzVqYkdsbGJuUklaV2xuYUhRcE8xeHVJQ0FnSUNBZ2ZTeGNibHh1SUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnS2lCSFpYUnpJSFJvWlNCWklITmpjbTlzYkNCd2IzTnBkR2x2Ymx4dUlDQWdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlNCd2FYaGxiSE1nZEdobElHVnNaVzFsYm5RZ2FHRnpJSE5qY205c2JHVmtJR0ZzYjI1bklIUm9aU0JaTFdGNGFYTmNiaUFnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdjMk55YjJ4c1dUb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJsYkdWdFpXNTBMbk5qY205c2JGUnZjRHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWTNKbFlYUmxVMk55YjJ4c1pYSW9aV3hsYldWdWRDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCcGMxZHBibVJ2ZHlobGJHVnRaVzUwS1NBL0lIZHBibVJ2ZDFOamNtOXNiR1Z5S0dWc1pXMWxiblFwSURvZ1pXeGxiV1Z1ZEZOamNtOXNiR1Z5S0dWc1pXMWxiblFwTzF4dUlDQjlYRzVjYmlBZ0x5b3FYRzRnSUNBcUlFQndZWEpoYlNCbGJHVnRaVzUwSUVWMlpXNTBWR0Z5WjJWMFhHNGdJQ0FxTDF4dUlDQm1kVzVqZEdsdmJpQjBjbUZqYTFOamNtOXNiQ2hsYkdWdFpXNTBMQ0J2Y0hScGIyNXpMQ0JqWVd4c1ltRmpheWtnZTF4dUlDQWdJSFpoY2lCcGMxQmhjM05wZG1WVGRYQndiM0owWldRZ1BTQndZWE56YVhabFJYWmxiblJ6VTNWd2NHOXlkR1ZrS0NrN1hHNGdJQ0FnZG1GeUlISmhaa2xrTzF4dUlDQWdJSFpoY2lCelkzSnZiR3hsWkNBOUlHWmhiSE5sTzF4dUlDQWdJSFpoY2lCelkzSnZiR3hsY2lBOUlHTnlaV0YwWlZOamNtOXNiR1Z5S0dWc1pXMWxiblFwTzF4dUlDQWdJSFpoY2lCc1lYTjBVMk55YjJ4c1dTQTlJSE5qY205c2JHVnlMbk5qY205c2JGa29LVHRjYmlBZ0lDQjJZWElnWkdWMFlXbHNjeUE5SUh0OU8xeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z2RYQmtZWFJsS0NrZ2UxeHVJQ0FnSUNBZ2RtRnlJSE5qY205c2JGa2dQU0JOWVhSb0xuSnZkVzVrS0hOamNtOXNiR1Z5TG5OamNtOXNiRmtvS1NrN1hHNGdJQ0FnSUNCMllYSWdhR1ZwWjJoMElEMGdjMk55YjJ4c1pYSXVhR1ZwWjJoMEtDazdYRzRnSUNBZ0lDQjJZWElnYzJOeWIyeHNTR1ZwWjJoMElEMGdjMk55YjJ4c1pYSXVjMk55YjJ4c1NHVnBaMmgwS0NrN1hHNWNiaUFnSUNBZ0lDOHZJSEpsZFhObElHOWlhbVZqZENCbWIzSWdiR1Z6Y3lCdFpXMXZjbmtnWTJoMWNtNWNiaUFnSUNBZ0lHUmxkR0ZwYkhNdWMyTnliMnhzV1NBOUlITmpjbTlzYkZrN1hHNGdJQ0FnSUNCa1pYUmhhV3h6TG14aGMzUlRZM0p2Ykd4WklEMGdiR0Z6ZEZOamNtOXNiRms3WEc0Z0lDQWdJQ0JrWlhSaGFXeHpMbVJwY21WamRHbHZiaUE5SUhOamNtOXNiRmtnUGlCc1lYTjBVMk55YjJ4c1dTQS9JRndpWkc5M2Jsd2lJRG9nWENKMWNGd2lPMXh1SUNBZ0lDQWdaR1YwWVdsc2N5NWthWE4wWVc1alpTQTlJRTFoZEdndVlXSnpLSE5qY205c2JGa2dMU0JzWVhOMFUyTnliMnhzV1NrN1hHNGdJQ0FnSUNCa1pYUmhhV3h6TG1selQzVjBUMlpDYjNWdVpITWdQU0J6WTNKdmJHeFpJRHdnTUNCOGZDQnpZM0p2Ykd4WklDc2dhR1ZwWjJoMElENGdjMk55YjJ4c1NHVnBaMmgwTzF4dUlDQWdJQ0FnWkdWMFlXbHNjeTUwYjNBZ1BTQnpZM0p2Ykd4WklEdzlJRzl3ZEdsdmJuTXViMlptYzJWMFcyUmxkR0ZwYkhNdVpHbHlaV04wYVc5dVhUdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdVltOTBkRzl0SUQwZ2MyTnliMnhzV1NBcklHaGxhV2RvZENBK1BTQnpZM0p2Ykd4SVpXbG5hSFE3WEc0Z0lDQWdJQ0JrWlhSaGFXeHpMblJ2YkdWeVlXNWpaVVY0WTJWbFpHVmtJRDFjYmlBZ0lDQWdJQ0FnWkdWMFlXbHNjeTVrYVhOMFlXNWpaU0ErSUc5d2RHbHZibk11ZEc5c1pYSmhibU5sVzJSbGRHRnBiSE11WkdseVpXTjBhVzl1WFR0Y2JseHVJQ0FnSUNBZ1kyRnNiR0poWTJzb1pHVjBZV2xzY3lrN1hHNWNiaUFnSUNBZ0lHeGhjM1JUWTNKdmJHeFpJRDBnYzJOeWIyeHNXVHRjYmlBZ0lDQWdJSE5qY205c2JHVmtJRDBnWm1Gc2MyVTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z2FHRnVaR3hsVTJOeWIyeHNLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRnpZM0p2Ykd4bFpDa2dlMXh1SUNBZ0lDQWdJQ0J6WTNKdmJHeGxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJSEpoWmtsa0lEMGdjbVZ4ZFdWemRFRnVhVzFoZEdsdmJrWnlZVzFsS0hWd1pHRjBaU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkbUZ5SUdWMlpXNTBUM0IwYVc5dWN5QTlJR2x6VUdGemMybDJaVk4xY0hCdmNuUmxaRnh1SUNBZ0lDQWdQeUI3SUhCaGMzTnBkbVU2SUhSeWRXVXNJR05oY0hSMWNtVTZJR1poYkhObElIMWNiaUFnSUNBZ0lEb2dabUZzYzJVN1hHNWNiaUFnSUNCbGJHVnRaVzUwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKelkzSnZiR3hjSWl3Z2FHRnVaR3hsVTJOeWIyeHNMQ0JsZG1WdWRFOXdkR2x2Ym5NcE8xeHVJQ0FnSUhWd1pHRjBaU2dwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJR1JsYzNSeWIzazZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNCallXNWpaV3hCYm1sdFlYUnBiMjVHY21GdFpTaHlZV1pKWkNrN1hHNGdJQ0FnSUNBZ0lHVnNaVzFsYm5RdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpaGNJbk5qY205c2JGd2lMQ0JvWVc1a2JHVlRZM0p2Ykd3c0lHVjJaVzUwVDNCMGFXOXVjeWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUc1dmNtMWhiR2w2WlZWd1JHOTNiaWgwS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFFnUFQwOUlFOWlhbVZqZENoMEtTQS9JSFFnT2lCN0lHUnZkMjQ2SUhRc0lIVndPaUIwSUgwN1hHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dWVWtnWlc1b1lXNWpaVzFsYm5RZ1ptOXlJR1pwZUdWa0lHaGxZV1JsY25NdVhHNGdJQ0FxSUVocFpHVnpJR2hsWVdSbGNpQjNhR1Z1SUhOamNtOXNiR2x1WnlCa2IzZHVYRzRnSUNBcUlGTm9iM2R6SUdobFlXUmxjaUIzYUdWdUlITmpjbTlzYkdsdVp5QjFjRnh1SUNBZ0tpQkFZMjl1YzNSeWRXTjBiM0pjYmlBZ0lDb2dRSEJoY21GdElIdEVUMDFGYkdWdFpXNTBmU0JsYkdWdElIUm9aU0JvWldGa1pYSWdaV3hsYldWdWRGeHVJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjNCMGFXOXVjeUJ2Y0hScGIyNXpJR1p2Y2lCMGFHVWdkMmxrWjJWMFhHNGdJQ0FxTDF4dUlDQm1kVzVqZEdsdmJpQklaV0ZrY205dmJTaGxiR1Z0TENCdmNIUnBiMjV6S1NCN1hHNGdJQ0FnYjNCMGFXOXVjeUE5SUc5d2RHbHZibk1nZkh3Z2UzMDdYRzRnSUNBZ1QySnFaV04wTG1GemMybG5iaWgwYUdsekxDQklaV0ZrY205dmJTNXZjSFJwYjI1ekxDQnZjSFJwYjI1ektUdGNiaUFnSUNCMGFHbHpMbU5zWVhOelpYTWdQU0JQWW1wbFkzUXVZWE56YVdkdUtIdDlMQ0JJWldGa2NtOXZiUzV2Y0hScGIyNXpMbU5zWVhOelpYTXNJRzl3ZEdsdmJuTXVZMnhoYzNObGN5azdYRzVjYmlBZ0lDQjBhR2x6TG1Wc1pXMGdQU0JsYkdWdE8xeHVJQ0FnSUhSb2FYTXVkRzlzWlhKaGJtTmxJRDBnYm05eWJXRnNhWHBsVlhCRWIzZHVLSFJvYVhNdWRHOXNaWEpoYm1ObEtUdGNiaUFnSUNCMGFHbHpMbTltWm5ObGRDQTlJRzV2Y20xaGJHbDZaVlZ3Ukc5M2JpaDBhR2x6TG05bVpuTmxkQ2s3WEc0Z0lDQWdkR2hwY3k1cGJtbDBhV0ZzYVhObFpDQTlJR1poYkhObE8xeHVJQ0FnSUhSb2FYTXVabkp2ZW1WdUlEMGdabUZzYzJVN1hHNGdJSDFjYmlBZ1NHVmhaSEp2YjIwdWNISnZkRzkwZVhCbElEMGdlMXh1SUNBZ0lHTnZibk4wY25WamRHOXlPaUJJWldGa2NtOXZiU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZOMFlYSjBJR3hwYzNSbGJtbHVaeUIwYnlCelkzSnZiR3hwYm1kY2JpQWdJQ0FnS2lCQWNIVmliR2xqWEc0Z0lDQWdJQ292WEc0Z0lDQWdhVzVwZERvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQnBaaUFvU0dWaFpISnZiMjB1WTNWMGMxUm9aVTExYzNSaGNtUWdKaVlnSVhSb2FYTXVhVzVwZEdsaGJHbHpaV1FwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW1sdWFYUnBZV3hjSWlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1cGRHbGhiR2x6WldRZ1BTQjBjblZsTzF4dVhHNGdJQ0FnSUNBZ0lDOHZJR1JsWm1WeUlHVjJaVzUwSUhKbFoybHpkSEpoZEdsdmJpQjBieUJvWVc1a2JHVWdZbkp2ZDNObGNseHVJQ0FnSUNBZ0lDQXZMeUJ3YjNSbGJuUnBZV3hzZVNCeVpYTjBiM0pwYm1jZ2NISmxkbWx2ZFhNZ2MyTnliMnhzSUhCdmMybDBhVzl1WEc0Z0lDQWdJQ0FnSUhObGRGUnBiV1Z2ZFhRb1hHNGdJQ0FnSUNBZ0lDQWdablZ1WTNScGIyNG9jMlZzWmlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNXpZM0p2Ykd4VWNtRmphMlZ5SUQwZ2RISmhZMnRUWTNKdmJHd29YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YzJOeWIyeHNaWElzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSHNnYjJabWMyVjBPaUJ6Wld4bUxtOW1abk5sZEN3Z2RHOXNaWEpoYm1ObE9pQnpaV3htTG5SdmJHVnlZVzVqWlNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpXeG1MblZ3WkdGMFpTNWlhVzVrS0hObGJHWXBYRzRnSUNBZ0lDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ01UQXdMRnh1SUNBZ0lDQWdJQ0FnSUhSb2FYTmNiaUFnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFUmxjM1J5YjNrZ2RHaGxJSGRwWkdkbGRDd2dZMnhsWVhKcGJtY2dkWEFnWVdaMFpYSWdhWFJ6Wld4bVhHNGdJQ0FnSUNvZ1FIQjFZbXhwWTF4dUlDQWdJQ0FxTDF4dUlDQWdJR1JsYzNSeWIzazZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NXBibWwwYVdGc2FYTmxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdUMkpxWldOMExtdGxlWE1vZEdocGN5NWpiR0Z6YzJWektTNW1iM0pGWVdOb0tIUm9hWE11Y21WdGIzWmxRMnhoYzNNc0lIUm9hWE1wTzF4dUlDQWdJQ0FnZEdocGN5NXpZM0p2Ykd4VWNtRmphMlZ5TG1SbGMzUnliM2tvS1R0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1ZXNXdhVzRnZEdobElHVnNaVzFsYm5SY2JpQWdJQ0FnS2lCQWNIVmliR2xqWEc0Z0lDQWdJQ292WEc0Z0lDQWdkVzV3YVc0NklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXVhR0Z6UTJ4aGMzTW9YQ0p3YVc1dVpXUmNJaWtnZkh3Z0lYUm9hWE11YUdGelEyeGhjM01vWENKMWJuQnBibTVsWkZ3aUtTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtRmtaRU5zWVhOektGd2lkVzV3YVc1dVpXUmNJaWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKd2FXNXVaV1JjSWlrN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXViMjVWYm5CcGJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVWYm5CcGJpNWpZV3hzS0hSb2FYTXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZCcGJpQjBhR1VnWld4bGJXVnVkRnh1SUNBZ0lDQXFJRUJ3ZFdKc2FXTmNiaUFnSUNBZ0tpOWNiaUFnSUNCd2FXNDZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tIUm9hWE11YUdGelEyeGhjM01vWENKMWJuQnBibTVsWkZ3aUtTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtRmtaRU5zWVhOektGd2ljR2x1Ym1Wa1hDSXBPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuSmxiVzkyWlVOc1lYTnpLRndpZFc1d2FXNXVaV1JjSWlrN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXViMjVRYVc0cElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVVR2x1TG1OaGJHd29kR2hwY3lrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOUxGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSbkpsWlhwbGN5QjBhR1VnWTNWeWNtVnVkQ0J6ZEdGMFpTQnZaaUIwYUdVZ2QybGtaMlYwWEc0Z0lDQWdJQ29nUUhCMVlteHBZMXh1SUNBZ0lDQXFMMXh1SUNBZ0lHWnlaV1Y2WlRvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG1aeWIzcGxiaUE5SUhSeWRXVTdYRzRnSUNBZ0lDQjBhR2x6TG1Ga1pFTnNZWE56S0Z3aVpuSnZlbVZ1WENJcE8xeHVJQ0FnSUgwc1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlNaUzFsYm1GaWJHVnpJSFJvWlNCa1pXWmhkV3gwSUdKbGFHRjJhVzkxY2lCdlppQjBhR1VnZDJsa1oyVjBYRzRnSUNBZ0lDb2dRSEIxWW14cFkxeHVJQ0FnSUNBcUwxeHVJQ0FnSUhWdVpuSmxaWHBsT2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lIUm9hWE11Wm5KdmVtVnVJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQjBhR2x6TG5KbGJXOTJaVU5zWVhOektGd2labkp2ZW1WdVhDSXBPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQjBiM0E2SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0YwYUdsekxtaGhjME5zWVhOektGd2lkRzl3WENJcEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtRMnhoYzNNb1hDSjBiM0JjSWlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y21WdGIzWmxRMnhoYzNNb1hDSnViM1JVYjNCY0lpazdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11YjI1VWIzQXBJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbTl1Vkc5d0xtTmhiR3dvZEdocGN5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdibTkwVkc5d09pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGRHaHBjeTVvWVhORGJHRnpjeWhjSW01dmRGUnZjRndpS1NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Ga1pFTnNZWE56S0Z3aWJtOTBWRzl3WENJcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGJXOTJaVU5zWVhOektGd2lkRzl3WENJcE8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbTl1VG05MFZHOXdLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTV2Yms1dmRGUnZjQzVqWVd4c0tIUm9hWE1wTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdKdmRIUnZiVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWFJvYVhNdWFHRnpRMnhoYzNNb1hDSmliM1IwYjIxY0lpa3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWhaR1JEYkdGemN5aGNJbUp2ZEhSdmJWd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaVzF2ZG1WRGJHRnpjeWhjSW01dmRFSnZkSFJ2YlZ3aUtUdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV2YmtKdmRIUnZiU2tnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1Q2IzUjBiMjB1WTJGc2JDaDBhR2x6S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCdWIzUkNiM1IwYjIwNklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdhV1lnS0NGMGFHbHpMbWhoYzBOc1lYTnpLRndpYm05MFFtOTBkRzl0WENJcEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtRMnhoYzNNb1hDSnViM1JDYjNSMGIyMWNJaWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKaWIzUjBiMjFjSWlrN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXViMjVPYjNSQ2IzUjBiMjBwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG05dVRtOTBRbTkwZEc5dExtTmhiR3dvZEdocGN5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdjMmh2ZFd4a1ZXNXdhVzQ2SUdaMWJtTjBhVzl1S0dSbGRHRnBiSE1wSUh0Y2JpQWdJQ0FnSUhaaGNpQnpZM0p2Ykd4cGJtZEViM2R1SUQwZ1pHVjBZV2xzY3k1a2FYSmxZM1JwYjI0Z1BUMDlJRndpWkc5M2Jsd2lPMXh1WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjMk55YjJ4c2FXNW5SRzkzYmlBbUppQWhaR1YwWVdsc2N5NTBiM0FnSmlZZ1pHVjBZV2xzY3k1MGIyeGxjbUZ1WTJWRmVHTmxaV1JsWkR0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnYzJodmRXeGtVR2x1T2lCbWRXNWpkR2x2Ymloa1pYUmhhV3h6S1NCN1hHNGdJQ0FnSUNCMllYSWdjMk55YjJ4c2FXNW5WWEFnUFNCa1pYUmhhV3h6TG1ScGNtVmpkR2x2YmlBOVBUMGdYQ0oxY0Z3aU8xeHVYRzRnSUNBZ0lDQnlaWFIxY200Z0tITmpjbTlzYkdsdVoxVndJQ1ltSUdSbGRHRnBiSE11ZEc5c1pYSmhibU5sUlhoalpXVmtaV1FwSUh4OElHUmxkR0ZwYkhNdWRHOXdPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQmhaR1JEYkdGemN6b2dablZ1WTNScGIyNG9ZMnhoYzNOT1lXMWxLU0I3WEc0Z0lDQWdJQ0IwYUdsekxtVnNaVzB1WTJ4aGMzTk1hWE4wTG1Ga1pDNWhjSEJzZVNoY2JpQWdJQ0FnSUNBZ2RHaHBjeTVsYkdWdExtTnNZWE56VEdsemRDeGNiaUFnSUNBZ0lDQWdkR2hwY3k1amJHRnpjMlZ6VzJOc1lYTnpUbUZ0WlYwdWMzQnNhWFFvWENJZ1hDSXBYRzRnSUNBZ0lDQXBPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQnlaVzF2ZG1WRGJHRnpjem9nWm5WdVkzUnBiMjRvWTJ4aGMzTk9ZVzFsS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbVZzWlcwdVkyeGhjM05NYVhOMExuSmxiVzkyWlM1aGNIQnNlU2hjYmlBZ0lDQWdJQ0FnZEdocGN5NWxiR1Z0TG1Oc1lYTnpUR2x6ZEN4Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVqYkdGemMyVnpXMk5zWVhOelRtRnRaVjB1YzNCc2FYUW9YQ0lnWENJcFhHNGdJQ0FnSUNBcE8xeHVJQ0FnSUgwc1hHNWNiaUFnSUNCb1lYTkRiR0Z6Y3pvZ1puVnVZM1JwYjI0b1kyeGhjM05PWVcxbEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVqYkdGemMyVnpXMk5zWVhOelRtRnRaVjB1YzNCc2FYUW9YQ0lnWENJcExtVjJaWEo1S0daMWJtTjBhVzl1S0dOc2N5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1amJHRnpjMHhwYzNRdVkyOXVkR0ZwYm5Nb1kyeHpLVHRjYmlBZ0lDQWdJSDBzSUhSb2FYTXVaV3hsYlNrN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhWd1pHRjBaVG9nWm5WdVkzUnBiMjRvWkdWMFlXbHNjeWtnZTF4dUlDQWdJQ0FnYVdZZ0tHUmxkR0ZwYkhNdWFYTlBkWFJQWmtKdmRXNWtjeWtnZTF4dUlDQWdJQ0FnSUNBdkx5QkpaMjV2Y21VZ1ltOTFibU41SUhOamNtOXNiR2x1WnlCcGJpQlBVMWhjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTVtY205NlpXNGdQVDA5SUhSeWRXVXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb1pHVjBZV2xzY3k1MGIzQXBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NTBiM0FvS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVibTkwVkc5d0tDazdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR2xtSUNoa1pYUmhhV3h6TG1KdmRIUnZiU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbUp2ZEhSdmJTZ3BPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1dWIzUkNiM1IwYjIwb0tUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdhV1lnS0hSb2FYTXVjMmh2ZFd4a1ZXNXdhVzRvWkdWMFlXbHNjeWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTUxYm5CcGJpZ3BPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2gwYUdsekxuTm9iM1ZzWkZCcGJpaGtaWFJoYVd4ektTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuQnBiaWdwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZUdGNibHh1SUNBdktpcGNiaUFnSUNvZ1JHVm1ZWFZzZENCdmNIUnBiMjV6WEc0Z0lDQXFJRUIwZVhCbElIdFBZbXBsWTNSOVhHNGdJQ0FxTDF4dUlDQklaV0ZrY205dmJTNXZjSFJwYjI1eklEMGdlMXh1SUNBZ0lIUnZiR1Z5WVc1alpUb2dlMXh1SUNBZ0lDQWdkWEE2SURBc1hHNGdJQ0FnSUNCa2IzZHVPaUF3WEc0Z0lDQWdmU3hjYmlBZ0lDQnZabVp6WlhRNklEQXNYRzRnSUNBZ2MyTnliMnhzWlhJNklHbHpRbkp2ZDNObGNpZ3BJRDhnZDJsdVpHOTNJRG9nYm5Wc2JDeGNiaUFnSUNCamJHRnpjMlZ6T2lCN1hHNGdJQ0FnSUNCbWNtOTZaVzQ2SUZ3aWFHVmhaSEp2YjIwdExXWnliM3BsYmx3aUxGeHVJQ0FnSUNBZ2NHbHVibVZrT2lCY0ltaGxZV1J5YjI5dExTMXdhVzV1WldSY0lpeGNiaUFnSUNBZ0lIVnVjR2x1Ym1Wa09pQmNJbWhsWVdSeWIyOXRMUzExYm5CcGJtNWxaRndpTEZ4dUlDQWdJQ0FnZEc5d09pQmNJbWhsWVdSeWIyOXRMUzEwYjNCY0lpeGNiaUFnSUNBZ0lHNXZkRlJ2Y0RvZ1hDSm9aV0ZrY205dmJTMHRibTkwTFhSdmNGd2lMRnh1SUNBZ0lDQWdZbTkwZEc5dE9pQmNJbWhsWVdSeWIyOXRMUzFpYjNSMGIyMWNJaXhjYmlBZ0lDQWdJRzV2ZEVKdmRIUnZiVG9nWENKb1pXRmtjbTl2YlMwdGJtOTBMV0p2ZEhSdmJWd2lMRnh1SUNBZ0lDQWdhVzVwZEdsaGJEb2dYQ0pvWldGa2NtOXZiVndpWEc0Z0lDQWdmVnh1SUNCOU8xeHVYRzRnSUVobFlXUnliMjl0TG1OMWRITlVhR1ZOZFhOMFlYSmtJRDBnYVhOVGRYQndiM0owWldRb0tUdGNibHh1SUNCeVpYUjFjbTRnU0dWaFpISnZiMjA3WEc1Y2JuMHBLVHRjYmlJc0lteGxkQ0JuY21WbGRHbHVaM01nUFNBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCc1pYUWdjMlYwZEdsdVozTWdQU0I3WEc0Z0lDQWdaM0psWlhScGJtYzZJQ2Q1YjNVbkxGeHVJQ0FnSUdocFFtVm1iM0psT2lBblNHVjVieWNzWEc0Z0lDQWdhR2xCWm5SbGNqb2dKeWNzWEc0Z0lDQWdZbmxsUW1WbWIzSmxPaUFuVTJWbElIbGhJR3hoZEdWeUp5eGNiaUFnSUNCaWVXVkJablJsY2pvZ0oxUmhhMlVnYVhRZ1pXRnplUzRuSUNCY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIVndaR0YwWlZObGRIUnBibWR6SUNodmNIUnBiMjV6SUQwZ2UzMHBJSHRjYmlBZ0lDQlBZbXBsWTNRdVlYTnphV2R1S0hObGRIUnBibWR6TENCdmNIUnBiMjV6S1Z4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2MyRjVTR2tnS0c1aGJXVXBJSHRjYmlBZ0lDQmpiMjV6YjJ4bExteHZaeWhjYmlBZ0lDQWdJQ2NsWXlWekp5d2dYRzRnSUNBZ0lDQW5ZMjlzYjNJNklIQnBibXM3Wm05dWRDMXphWHBsT2lBeU5YQjRKeXdnWEc0Z0lDQWdJQ0JnSkh0elpYUjBhVzVuY3k1b2FVSmxabTl5WlgwZ0pIdHVZVzFsSUQ4Z2JtRnRaU0E2SUhObGRIUnBibWR6TG1keVpXVjBhVzVuZlNBa2UzTmxkSFJwYm1kekxtaHBRV1owWlhKOVlGeHVJQ0FnSUNsY2JpQWdJQ0J5WlhSMWNtNGdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ6WVhsQ2VXVWdLRzVoYldVcElIdGNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGNiaUFnSUNBZ0lDY2xZeVZ6Snl3Z1hHNGdJQ0FnSUNBblkyOXNiM0k2SUhCcGJtczdabTl1ZEMxemFYcGxPaUF5TlhCNEp5d2dYRzRnSUNBZ0lDQmdKSHR6WlhSMGFXNW5jeTVpZVdWQ1pXWnZjbVY5SUNSN2JtRnRaU0EvSUc1aGJXVWdPaUJ6WlhSMGFXNW5jeTVuY21WbGRHbHVaMzBnSkh0elpYUjBhVzVuY3k1aWVXVkJablJsY24xZ1hHNGdJQ0FnS1Z4dVhHNGdJQ0FnY21WMGRYSnVJRnh1SUNCOVhHNWNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQjFjR1JoZEdWVFpYUjBhVzVuY3l4Y2JpQWdJQ0J6WVhsSWFTeGNiaUFnSUNCellYbENlV1VnSUNBZ1hHNGdJSDFjYm4wcEtDbGNibHh1THk4Z1ozSmxaWFJwYm1kekxuVndaR0YwWlZObGRIUnBibWR6S0h0Y2JpOHZJQ0FnWjNKbFpYUnBibWR6T2lBbmQyOXliR1FuWEc0dkx5QjlLVnh1WEc0dkx5Qm5jbVZsZEdsdVozTXVjMkY1U0drb0oyMWxjbXhwYmljcE8xeHVMeThnWjNKbFpYUnBibWR6TG5OaGVVSjVaU2duYlc5eVoyRnVKeWs3WEc1Y2JteGxkQ0JIY21WbGRHbHVaeUE5SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUdOdmJuTjBJR1JsWm1GMWJIUnpJRDBnZTF4dUlDQWdJR2R5WldWMGFXNW5PaUFuZVc5MUp5eGNiaUFnSUNCb2FVSmxabTl5WlRvZ0owaGxlVzhuTEZ4dUlDQWdJR2hwUVdaMFpYSTZJQ2NuTEZ4dUlDQWdJR0o1WlVKbFptOXlaVG9nSjFObFpTQjVZU0JzWVhSbGNpY3NYRzRnSUNBZ1lubGxRV1owWlhJNklDZFVZV3RsSUdsMElHVmhjM2t1SjF4dUlDQjlYRzVjYmlBZ1kyOXVjM1FnUTI5dWMzUnlkV04wYjNJZ1BTQm1kVzVqZEdsdmJpaHVZVzFsTENCdmNIUnBiMjV6SUQwZ2UzMHBJSHRjYmlBZ0lDQmpiMjV6ZENCelpYUjBhVzVuY3lBOUlFOWlhbVZqZEM1aGMzTnBaMjRvZTMwc0lHUmxabUYxYkhSekxDQnZjSFJwYjI1ektWeHVYRzRnSUNBZ1QySnFaV04wTG1aeVpXVjZaU2h6WlhSMGFXNW5jeWxjYmx4dUlDQWdJRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowYVdWektIUm9hWE1zSUh0Y2JpQWdJQ0FnSUY5dVlXMWxPaUI3SUhaaGJIVmxPaUJ1WVcxbElIMHNYRzRnSUNBZ0lDQmZjMlYwZEdsdVozTTZJSHNnZG1Gc2RXVTZJSE5sZEhScGJtZHpJSDFjYmlBZ0lDQjlLVnh1SUNCOUlGeHVJQ0JEYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVdWMyRjVTR2tnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29YRzRnSUNBZ0lDQW5KV01sY3ljc0lGeHVJQ0FnSUNBZ0oyTnZiRzl5T2lCd2FXNXJPMlp2Ym5RdGMybDZaVG9nTWpWd2VDY3NJRnh1SUNBZ0lDQWdZQ1I3ZEdocGN5NWZjMlYwZEdsdVozTXVhR2xDWldadmNtVjlJQ1I3ZEdocGN5NWZibUZ0WlgwZ0pIdDBhR2x6TGw5elpYUjBhVzVuY3k1b2FVRm1kR1Z5ZldCY2JpQWdJQ0FwWEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE5jYmlBZ2ZWeHVYRzRnSUVOdmJuTjBjblZqZEc5eUxuQnliM1J2ZEhsd1pTNXpZWGxDZVdVZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdZMjl1YzI5c1pTNXNiMmNvWEc0Z0lDQWdJQ0FuSldNbGN5Y3NJRnh1SUNBZ0lDQWdKMk52Ykc5eU9pQndhVzVyTzJadmJuUXRjMmw2WlRvZ01qVndlQ2NzSUZ4dUlDQWdJQ0FnWUNSN2RHaHBjeTVmYzJWMGRHbHVaM011WW5sbFFtVm1iM0psZlNBa2UzUm9hWE11WDI1aGJXVjlJQ1I3ZEdocGN5NWZjMlYwZEdsdVozTXVZbmxsUVdaMFpYSjlZRnh1SUNBZ0lDbGNiaUFnSUNCY2JpQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQjlYRzVjYmlBZ2NtVjBkWEp1SUVOdmJuTjBjblZqZEc5eVhHNTlLU2dwWEc1Y2JtTnZibk4wSUcxbGNteHBiaUE5SUc1bGR5QkhjbVZsZEdsdVp5Z25UV1Z5YkdsdUp5d2dlMXh1SUNCb2FVRm1kR1Z5T2lBbkxpZGNibjBwTzF4dVhHNWpiMjV6YjJ4bExteHZaeWh0WlhKc2FXNHVibUZ0WlNsY2JtTnZibk52YkdVdWJHOW5LRzFsY214cGJpNXpaWFIwYVc1bmN5bGNibHh1YldWeWJHbHVMbk5oZVVocEtDa3VjMkY1UW5sbEtDazdYRzUzYVc1a2IzY3VSM0psWlhScGJtY2dQU0JIY21WbGRHbHVaeUlzSWk4cUtseHVLaUFxSUVSUFRTQk5ZVzVwY0hWc1lYUnBiMjRnVEVsaWNtRnlhV1Z6WEc0cUlERXVJR2gwZEhCek9pOHZjMk55YjJ4c2NtVjJaV0ZzYW5NdWIzSm5MMXh1S2lBeUxpQm9kSFJ3Y3pvdkwzQm9iM1J2YzNkcGNHVXVZMjl0TDF4dUtpQXFJRVJQVFNCdFlXNXBjSFZzWVhScGIyNGdiR2xpY21GeWFXVnpJR2hoZG1VZ2MyOXRaU0IxYm1seGRXVWdZMjl1YzJsa1pYSmhkR2x2Ym5NZ1kyOXRjR0Z5WldRZ2RHOGdkWFJwYkdsMGVTQnNhV0p5WVhKcFpYTXVYRzRxSUNvZ1NHOTNJR05oYmlCM1pTQmpiMjUyWlhKMElIUm9hWE1nYVc1MGJ5QmhJR3hwWW5KaGNubGNiaW9nTVM0Z1NXNXFaV04wYVc1bklHTnZiblJsYm5RZ2FXNTBieUIwYUdVZ1JFOU5YRzRxSURJdUlFeHBjM1JsYm1sdVp5Qm1iM0lnWlhabGJuUnpYRzRxSURNdUlFRmtaR2x1WnlCdmNIUnBiMjV6SUdGdVpDQnpaWFIwYVc1bmMxeHVLaUEwTGlCRmVIQnZjMmx1WnlCd2RXSnNhV01nYldWMGFHOWtjMXh1S2lBMUxpQkVaWE4wY205NWFXNW5JSFJvWlNCcGJuTjBZVzUwYVdGMGFXOXVYRzRnS2k5Y2JseHVZMjl1YzNRZ1pXZG5JRDBnS0daMWJtTjBhVzl1S0NrZ2UxeHVJQ0F2THlCSFpYUWdkR2hsSUdWc1pXMWxiblJjYmlBZ1kyOXVjM1FnYVc1cGRDQTlJQ0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0JzWlhRZ1pXeGxiU0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeU5sWjJjbktUdGNiaUFnSUNCc1pYUWdjMk5oYkdWa0lEMGdabUZzYzJVN1hHNGdJRnh1SUNBZ0lDOHZJRU55WldGMFpTQmlkWFIwYjI1Y2JpQWdJQ0JzWlhRZ1luUnVJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25ZblYwZEc5dUp5azdYRzRnSUNBZ1luUnVMbWx1Ym1WeVNGUk5UQ0E5SUNmd242V2FKenRjYmlBZ0lDQmlkRzR1YzJWMFFYUjBjbWxpZFhSbEtDZGhjbWxoTFd4aFltVnNKeXdnWUdOc2FXTnJJRzFsWUNrN1hHNGdJQ0FnWW5SdUxuTjBlV3hsTG5SeVlXNXphWFJwYjI0Z1BTQW5kSEpoYm5ObWIzSnRJRE13TUcxeklHVmhjMlV0YVc0bk8xeHVJQ0JjYmlBZ0lDQXZMeUJKYm1wbFkzUWdhVzUwYnlCMGFHVWdSRTlOWEc0Z0lDQWdaV3hsYlM1aGNIQmxibVFvWW5SdUtUdGNiaUFnWEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nU0dGdVpHeGxJR05zYVdOcklHVjJaVzUwYzF4dUlDQWdJQ0FxTDF4dUlDQWdJR1oxYm1OMGFXOXVJSFJ2WjJkc1pTQW9LU0I3WEc0Z0lDQWdJQ0F2THlCSlppQjBhR1VnWW5WMGRHOXVJR2x6SUhOallXeGxaQ3dnYzJoeWFXNXJJR2wwWEc0Z0lDQWdJQ0F2THlCUGRHaGxjbmRwYzJVc0lHZHliM2NnYVhSY2JpQWdJQ0FnSUdKMGJpNXpkSGxzWlM1MGNtRnVjMlp2Y20wZ1BTQnpZMkZzWldRZ1B5QW5KeUE2SUNkelkyRnNaU2d5S1NjN1hHNGdJRnh1SUNBZ0lDQWdMeThnUm14cGNDQjBhR1VnYzJOaGJHVmtJSE4wWVhSbFhHNGdJQ0FnSUNCelkyRnNaV1FnUFNBaGMyTmhiR1ZrTzF4dUlDQWdJSDFjYmlBZ1hHNGdJQ0FnTHk4Z1RHbHpkR1Z1SUdadmNpQmpiR2xqYTNNZ2IyNGdkR2hsSUdKMWRIUnZibHh1SUNBZ0lHSjBiaTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJSFJ2WjJkc1pTazdYRzRnSUgxY2JpQWdYRzRnSUhKbGRIVnliaUI3SUdsdWFYUWdmVnh1ZlNrb0tWeHVYRzVsWjJjdWFXNXBkQ2dwWEc0aUxDSnBiWEJ2Y25RZ1NHVmhaSEp2YjIwZ1puSnZiU0FuYUdWaFpISnZiMjB1YW5Nbk8xeHVYRzVqYjI1emRDQm9aV0ZrWlhJZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Nkb1pXRmtaWEluS1R0Y2JtTnZibk4wSUdobFlXUnliMjl0SUQwZ2JtVjNJRWhsWVdSeWIyOXRLR2hsWVdSbGNpazdYRzVvWldGa2NtOXZiUzVwYm1sMEtDazdYRzVvWldGa2NtOXZiUzUwYjNBb0tUc2lYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjkifQ==
