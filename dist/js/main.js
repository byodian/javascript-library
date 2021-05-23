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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hlYWRyb29tLmpzL2Rpc3QvaGVhZHJvb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSxLQUE0RDtBQUM5RCxFQUFFLFNBQ3NEO0FBQ3hELENBQUMsb0JBQW9COztBQUVyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxXQUFXO0FBQ3hCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaURBQWlEO0FBQ2hFO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BiRDtBQUFBO0FBQUE7QUFBbUM7O0FBRW5DO0FBQ0EscUJBQXFCLGtEQUFRO0FBQzdCO0FBQ0EsZSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaW5kZXguanNcIik7XG4iLCIvKiFcbiAqIGhlYWRyb29tLmpzIHYwLjEyLjAgLSBHaXZlIHlvdXIgcGFnZSBzb21lIGhlYWRyb29tLiBIaWRlIHlvdXIgaGVhZGVyIHVudGlsIHlvdSBuZWVkIGl0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgTmljayBXaWxsaWFtcyAtIGh0dHA6Ly93aWNreS5uaWxsaWEubXMvaGVhZHJvb20uanNcbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuSGVhZHJvb20gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBpc0Jyb3dzZXIoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgYnJvd3NlciBzdXBwb3J0IGZvciBhZGRpbmcgYW4gZXZlbnQgbGlzdGVuZXIgd2l0aCBvcHRpb25zXG4gICAqIENyZWRpdDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXJcbiAgICovXG4gIGZ1bmN0aW9uIHBhc3NpdmVFdmVudHNTdXBwb3J0ZWQoKSB7XG4gICAgdmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2V0dGVyLXJldHVyblxuICAgICAgICBnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIGlzQnJvd3NlcigpICYmXG4gICAgICBmdW5jdGlvbigpIHt9LmJpbmQgJiZcbiAgICAgIFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmXG4gICAgICBPYmplY3QuYXNzaWduICYmXG4gICAgICBPYmplY3Qua2V5cyAmJlxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIG9iai5ub2RlVHlwZSA9PT0gOTsgLy8gTm9kZS5ET0NVTUVOVF9OT0RFID09PSA5XG4gIH1cblxuICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopIHtcbiAgICAvLyBgb2JqID09PSB3aW5kb3dgIG9yIGBvYmogaW5zdGFuY2VvZiBXaW5kb3dgIGlzIG5vdCBzdWZmaWNpZW50LFxuICAgIC8vIGFzIHRoZSBvYmogbWF5IGJlIHRoZSB3aW5kb3cgb2YgYW4gaWZyYW1lLlxuICAgIHJldHVybiBvYmogJiYgb2JqLmRvY3VtZW50ICYmIGlzRG9jdW1lbnQob2JqLmRvY3VtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdpbmRvd1Njcm9sbGVyKHdpbikge1xuICAgIHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG4gICAgdmFyIGJvZHkgPSBkb2MuYm9keTtcbiAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBAc2VlIGh0dHA6Ly9qYW1lcy5wYWRvbHNleS5jb20vamF2YXNjcmlwdC9nZXQtZG9jdW1lbnQtaGVpZ2h0LWNyb3NzLWJyb3dzZXIvXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBzY3JvbGwgaGVpZ2h0IG9mIHRoZSBkb2N1bWVudCBpbiBwaXhlbHNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsSGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAgIGJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGh0bWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIGJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGh0bWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgIGJvZHkuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIGh0bWwuY2xpZW50SGVpZ2h0XG4gICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBzZWUgaHR0cDovL2FuZHlsYW5ndG9uLmNvLnVrL2Jsb2cvZGV2ZWxvcG1lbnQvZ2V0LXZpZXdwb3J0LXNpemUtd2lkdGgtYW5kLWhlaWdodC1qYXZhc2NyaXB0XG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIHZpZXdwb3J0IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gd2luLmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0IHx8IGJvZHkuY2xpZW50SGVpZ2h0O1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXRzIHRoZSBZIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSBwaXhlbHMgdGhlIHBhZ2UgaGFzIHNjcm9sbGVkIGFsb25nIHRoZSBZLWF4aXNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsWTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW4ucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKGh0bWwgfHwgYm9keS5wYXJlbnROb2RlIHx8IGJvZHkpLnNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZWxlbWVudFNjcm9sbGVyKGVsZW1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBzY3JvbGwgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBzY3JvbGxIZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoZWxlbWVudC5vZmZzZXRIZWlnaHQsIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogR2V0cyB0aGUgWSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gcGl4ZWxzIHRoZSBlbGVtZW50IGhhcyBzY3JvbGxlZCBhbG9uZyB0aGUgWS1heGlzXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbFk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNjcm9sbGVyKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNXaW5kb3coZWxlbWVudCkgPyB3aW5kb3dTY3JvbGxlcihlbGVtZW50KSA6IGVsZW1lbnRTY3JvbGxlcihlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZWxlbWVudCBFdmVudFRhcmdldFxuICAgKi9cbiAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgaXNQYXNzaXZlU3VwcG9ydGVkID0gcGFzc2l2ZUV2ZW50c1N1cHBvcnRlZCgpO1xuICAgIHZhciByYWZJZDtcbiAgICB2YXIgc2Nyb2xsZWQgPSBmYWxzZTtcbiAgICB2YXIgc2Nyb2xsZXIgPSBjcmVhdGVTY3JvbGxlcihlbGVtZW50KTtcbiAgICB2YXIgbGFzdFNjcm9sbFkgPSBzY3JvbGxlci5zY3JvbGxZKCk7XG4gICAgdmFyIGRldGFpbHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzY3JvbGxZID0gTWF0aC5yb3VuZChzY3JvbGxlci5zY3JvbGxZKCkpO1xuICAgICAgdmFyIGhlaWdodCA9IHNjcm9sbGVyLmhlaWdodCgpO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbGVyLnNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAvLyByZXVzZSBvYmplY3QgZm9yIGxlc3MgbWVtb3J5IGNodXJuXG4gICAgICBkZXRhaWxzLnNjcm9sbFkgPSBzY3JvbGxZO1xuICAgICAgZGV0YWlscy5sYXN0U2Nyb2xsWSA9IGxhc3RTY3JvbGxZO1xuICAgICAgZGV0YWlscy5kaXJlY3Rpb24gPSBzY3JvbGxZID4gbGFzdFNjcm9sbFkgPyBcImRvd25cIiA6IFwidXBcIjtcbiAgICAgIGRldGFpbHMuZGlzdGFuY2UgPSBNYXRoLmFicyhzY3JvbGxZIC0gbGFzdFNjcm9sbFkpO1xuICAgICAgZGV0YWlscy5pc091dE9mQm91bmRzID0gc2Nyb2xsWSA8IDAgfHwgc2Nyb2xsWSArIGhlaWdodCA+IHNjcm9sbEhlaWdodDtcbiAgICAgIGRldGFpbHMudG9wID0gc2Nyb2xsWSA8PSBvcHRpb25zLm9mZnNldFtkZXRhaWxzLmRpcmVjdGlvbl07XG4gICAgICBkZXRhaWxzLmJvdHRvbSA9IHNjcm9sbFkgKyBoZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0O1xuICAgICAgZGV0YWlscy50b2xlcmFuY2VFeGNlZWRlZCA9XG4gICAgICAgIGRldGFpbHMuZGlzdGFuY2UgPiBvcHRpb25zLnRvbGVyYW5jZVtkZXRhaWxzLmRpcmVjdGlvbl07XG5cbiAgICAgIGNhbGxiYWNrKGRldGFpbHMpO1xuXG4gICAgICBsYXN0U2Nyb2xsWSA9IHNjcm9sbFk7XG4gICAgICBzY3JvbGxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAgIGlmICghc2Nyb2xsZWQpIHtcbiAgICAgICAgc2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBldmVudE9wdGlvbnMgPSBpc1Bhc3NpdmVTdXBwb3J0ZWRcbiAgICAgID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9XG4gICAgICA6IGZhbHNlO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVNjcm9sbCwgZXZlbnRPcHRpb25zKTtcbiAgICB1cGRhdGUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsLCBldmVudE9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVVcERvd24odCkge1xuICAgIHJldHVybiB0ID09PSBPYmplY3QodCkgPyB0IDogeyBkb3duOiB0LCB1cDogdCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVJIGVuaGFuY2VtZW50IGZvciBmaXhlZCBoZWFkZXJzLlxuICAgKiBIaWRlcyBoZWFkZXIgd2hlbiBzY3JvbGxpbmcgZG93blxuICAgKiBTaG93cyBoZWFkZXIgd2hlbiBzY3JvbGxpbmcgdXBcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbSB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIHdpZGdldFxuICAgKi9cbiAgZnVuY3Rpb24gSGVhZHJvb20oZWxlbSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgSGVhZHJvb20ub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc2VzID0gT2JqZWN0LmFzc2lnbih7fSwgSGVhZHJvb20ub3B0aW9ucy5jbGFzc2VzLCBvcHRpb25zLmNsYXNzZXMpO1xuXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLnRvbGVyYW5jZSA9IG5vcm1hbGl6ZVVwRG93bih0aGlzLnRvbGVyYW5jZSk7XG4gICAgdGhpcy5vZmZzZXQgPSBub3JtYWxpemVVcERvd24odGhpcy5vZmZzZXQpO1xuICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xuICB9XG4gIEhlYWRyb29tLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogSGVhZHJvb20sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBsaXN0ZW5pbmcgdG8gc2Nyb2xsaW5nXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKEhlYWRyb29tLmN1dHNUaGVNdXN0YXJkICYmICF0aGlzLmluaXRpYWxpc2VkKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJpbml0aWFsXCIpO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBkZWZlciBldmVudCByZWdpc3RyYXRpb24gdG8gaGFuZGxlIGJyb3dzZXJcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgcmVzdG9yaW5nIHByZXZpb3VzIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgIGZ1bmN0aW9uKHNlbGYpIHtcbiAgICAgICAgICAgIHNlbGYuc2Nyb2xsVHJhY2tlciA9IHRyYWNrU2Nyb2xsKFxuICAgICAgICAgICAgICBzZWxmLnNjcm9sbGVyLFxuICAgICAgICAgICAgICB7IG9mZnNldDogc2VsZi5vZmZzZXQsIHRvbGVyYW5jZTogc2VsZi50b2xlcmFuY2UgfSxcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGUuYmluZChzZWxmKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMCxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSB3aWRnZXQsIGNsZWFyaW5nIHVwIGFmdGVyIGl0c2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2xhc3NlcykuZm9yRWFjaCh0aGlzLnJlbW92ZUNsYXNzLCB0aGlzKTtcbiAgICAgIHRoaXMuc2Nyb2xsVHJhY2tlci5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVucGluIHRoZSBlbGVtZW50XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVucGluOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhhc0NsYXNzKFwicGlubmVkXCIpIHx8ICF0aGlzLmhhc0NsYXNzKFwidW5waW5uZWRcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInVucGlubmVkXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwicGlubmVkXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uVW5waW4pIHtcbiAgICAgICAgICB0aGlzLm9uVW5waW4uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQaW4gdGhlIGVsZW1lbnRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcGluOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmhhc0NsYXNzKFwidW5waW5uZWRcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcInBpbm5lZFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInVucGlubmVkXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uUGluKSB7XG4gICAgICAgICAgdGhpcy5vblBpbi5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZyZWV6ZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHdpZGdldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBmcmVlemU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5mcm96ZW4gPSB0cnVlO1xuICAgICAgdGhpcy5hZGRDbGFzcyhcImZyb3plblwiKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmUtZW5hYmxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgdGhlIHdpZGdldFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmZyZWV6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZyb3plbiA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcImZyb3plblwiKTtcbiAgICB9LFxuXG4gICAgdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcInRvcFwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwidG9wXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwibm90VG9wXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uVG9wKSB7XG4gICAgICAgICAgdGhpcy5vblRvcC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG5vdFRvcDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoXCJub3RUb3BcIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcIm5vdFRvcFwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcInRvcFwiKTtcblxuICAgICAgICBpZiAodGhpcy5vbk5vdFRvcCkge1xuICAgICAgICAgIHRoaXMub25Ob3RUb3AuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBib3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKFwiYm90dG9tXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJib3R0b21cIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJub3RCb3R0b21cIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25Cb3R0b20pIHtcbiAgICAgICAgICB0aGlzLm9uQm90dG9tLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbm90Qm90dG9tOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcIm5vdEJvdHRvbVwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwibm90Qm90dG9tXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwiYm90dG9tXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uTm90Qm90dG9tKSB7XG4gICAgICAgICAgdGhpcy5vbk5vdEJvdHRvbS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3VsZFVucGluOiBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICB2YXIgc2Nyb2xsaW5nRG93biA9IGRldGFpbHMuZGlyZWN0aW9uID09PSBcImRvd25cIjtcblxuICAgICAgcmV0dXJuIHNjcm9sbGluZ0Rvd24gJiYgIWRldGFpbHMudG9wICYmIGRldGFpbHMudG9sZXJhbmNlRXhjZWVkZWQ7XG4gICAgfSxcblxuICAgIHNob3VsZFBpbjogZnVuY3Rpb24oZGV0YWlscykge1xuICAgICAgdmFyIHNjcm9sbGluZ1VwID0gZGV0YWlscy5kaXJlY3Rpb24gPT09IFwidXBcIjtcblxuICAgICAgcmV0dXJuIChzY3JvbGxpbmdVcCAmJiBkZXRhaWxzLnRvbGVyYW5jZUV4Y2VlZGVkKSB8fCBkZXRhaWxzLnRvcDtcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQuYXBwbHkoXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QsXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUuYXBwbHkoXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QsXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2xhc3Nlc1tjbGFzc05hbWVdLnNwbGl0KFwiIFwiKS5ldmVyeShmdW5jdGlvbihjbHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNscyk7XG4gICAgICB9LCB0aGlzLmVsZW0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGRldGFpbHMpIHtcbiAgICAgIGlmIChkZXRhaWxzLmlzT3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgLy8gSWdub3JlIGJvdW5jeSBzY3JvbGxpbmcgaW4gT1NYXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZnJvemVuID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRldGFpbHMudG9wKSB7XG4gICAgICAgIHRoaXMudG9wKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdFRvcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGV0YWlscy5ib3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90Qm90dG9tKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNob3VsZFVucGluKGRldGFpbHMpKSB7XG4gICAgICAgIHRoaXMudW5waW4oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG91bGRQaW4oZGV0YWlscykpIHtcbiAgICAgICAgdGhpcy5waW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgb3B0aW9uc1xuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgSGVhZHJvb20ub3B0aW9ucyA9IHtcbiAgICB0b2xlcmFuY2U6IHtcbiAgICAgIHVwOiAwLFxuICAgICAgZG93bjogMFxuICAgIH0sXG4gICAgb2Zmc2V0OiAwLFxuICAgIHNjcm9sbGVyOiBpc0Jyb3dzZXIoKSA/IHdpbmRvdyA6IG51bGwsXG4gICAgY2xhc3Nlczoge1xuICAgICAgZnJvemVuOiBcImhlYWRyb29tLS1mcm96ZW5cIixcbiAgICAgIHBpbm5lZDogXCJoZWFkcm9vbS0tcGlubmVkXCIsXG4gICAgICB1bnBpbm5lZDogXCJoZWFkcm9vbS0tdW5waW5uZWRcIixcbiAgICAgIHRvcDogXCJoZWFkcm9vbS0tdG9wXCIsXG4gICAgICBub3RUb3A6IFwiaGVhZHJvb20tLW5vdC10b3BcIixcbiAgICAgIGJvdHRvbTogXCJoZWFkcm9vbS0tYm90dG9tXCIsXG4gICAgICBub3RCb3R0b206IFwiaGVhZHJvb20tLW5vdC1ib3R0b21cIixcbiAgICAgIGluaXRpYWw6IFwiaGVhZHJvb21cIlxuICAgIH1cbiAgfTtcblxuICBIZWFkcm9vbS5jdXRzVGhlTXVzdGFyZCA9IGlzU3VwcG9ydGVkKCk7XG5cbiAgcmV0dXJuIEhlYWRyb29tO1xuXG59KSk7XG4iLCJpbXBvcnQgSGVhZHJvb20gZnJvbSAnaGVhZHJvb20uanMnO1xuXG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbmNvbnN0IGhlYWRyb29tID0gbmV3IEhlYWRyb29tKGhlYWRlcik7XG5oZWFkcm9vbS5pbml0KCk7XG5oZWFkcm9vbS50b3AoKTsiXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyaGxZV1J5YjI5dExtcHpMMlJwYzNRdmFHVmhaSEp2YjIwdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMMnB6TDJsdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3VVVGQlFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTERCRFFVRXdReXhuUTBGQlowTTdVVUZETVVVN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN4M1JFRkJkMFFzYTBKQlFXdENPMUZCUXpGRk8xRkJRMEVzYVVSQlFXbEVMR05CUVdNN1VVRkRMMFE3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGxEUVVGNVF5eHBRMEZCYVVNN1VVRkRNVVVzWjBoQlFXZElMRzFDUVVGdFFpeEZRVUZGTzFGQlEzSkpPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNa0pCUVRKQ0xEQkNRVUV3UWl4RlFVRkZPMUZCUTNaRUxHbERRVUZwUXl4bFFVRmxPMUZCUTJoRU8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJMSE5FUVVGelJDd3JSRUZCSzBRN08xRkJSWEpJTzFGQlEwRTdPenRSUVVkQk8xRkJRMEU3T3pzN096czdPenM3T3p0QlEyeEdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc1JVRkJSU3hMUVVFMFJEdEJRVU01UkN4RlFVRkZMRk5CUTNORU8wRkJRM2hFTEVOQlFVTXNiMEpCUVc5Q096dEJRVVZ5UWp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNiVUpCUVcxQ08wRkJRMjVDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTERoQ1FVRTRRanRCUVVNNVFqczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEd0Q1FVRnJRaXhQUVVGUE8wRkJRM3BDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVRHRCUVVOQk8wRkJRMEVzYTBKQlFXdENMRTlCUVU4N1FVRkRla0k3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVRHRCUVVOQk8wRkJRMEVzYTBKQlFXdENMRTlCUVU4N1FVRkRla0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmEwSXNUMEZCVHp0QlFVTjZRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N08wRkJSVkE3UVVGRFFTeHJRa0ZCYTBJc1QwRkJUenRCUVVONlFqdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPenRCUVVWUU8wRkJRMEU3UVVGRFFTeHJRa0ZCYTBJc1QwRkJUenRCUVVONlFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hUUVVGVE8wRkJRMVE3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxHdERRVUZyUXp0QlFVTnNRenM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1lVRkJZU3hYUVVGWE8wRkJRM2hDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxRFFVRnRRenM3UVVGRmJrTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdWQlFXVXNhVVJCUVdsRU8wRkJRMmhGTzBGQlEwRTdRVUZEUVN4WFFVRlhPMEZCUTFnN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNXVUZCV1R0QlFVTmFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFc1EwRkJRenM3T3pzN096czdPenM3T3p0QlEzQmlSRHRCUVVGQk8wRkJRVUU3UVVGQmJVTTdPMEZCUlc1RE8wRkJRMEVzY1VKQlFYRkNMR3RFUVVGUk8wRkJRemRDTzBGQlEwRXNaU0lzSW1acGJHVWlPaUk0WWpGaFlUWmpZVGMzWWpJd1pEbGlZemhoTlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaUJjZEM4dklGUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkSFpoY2lCcGJuTjBZV3hzWldSTmIyUjFiR1Z6SUQwZ2UzMDdYRzVjYmlCY2RDOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc0Z1hIUm1kVzVqZEdsdmJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRzF2WkhWc1pVbGtLU0I3WEc1Y2JpQmNkRngwTHk4Z1EyaGxZMnNnYVdZZ2JXOWtkV3hsSUdseklHbHVJR05oWTJobFhHNGdYSFJjZEdsbUtHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZEtTQjdYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNGdYSFJjZEgxY2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdrNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHdzZJR1poYkhObExGeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXdnUFNCMGNuVmxPMXh1WEc0Z1hIUmNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzRnWEhSY2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYmlCY2RIMWNibHh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaWE1nYjJKcVpXTjBJQ2hmWDNkbFluQmhZMnRmYlc5a2RXeGxjMTlmS1Z4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV0SUQwZ2JXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdVZ1kyRmphR1ZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVZeUE5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdSbFptbHVaU0JuWlhSMFpYSWdablZ1WTNScGIyNGdabTl5SUdoaGNtMXZibmtnWlhod2IzSjBjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtJRDBnWm5WdVkzUnBiMjRvWlhod2IzSjBjeXdnYm1GdFpTd2daMlYwZEdWeUtTQjdYRzRnWEhSY2RHbG1LQ0ZmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04b1pYaHdiM0owY3l3Z2JtRnRaU2twSUh0Y2JpQmNkRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dibUZ0WlN3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQm5aWFE2SUdkbGRIUmxjaUI5S1R0Y2JpQmNkRngwZlZ4dUlGeDBmVHRjYmx4dUlGeDBMeThnWkdWbWFXNWxJRjlmWlhOTmIyUjFiR1VnYjI0Z1pYaHdiM0owYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5SUQwZ1puVnVZM1JwYjI0b1pYaHdiM0owY3lrZ2UxeHVJRngwWEhScFppaDBlWEJsYjJZZ1UzbHRZbTlzSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjcElIdGNiaUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuTENCN0lIWmhiSFZsT2lBblRXOWtkV3hsSnlCOUtUdGNiaUJjZEZ4MGZWeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dKMTlmWlhOTmIyUjFiR1VuTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWTNKbFlYUmxJR0VnWm1GclpTQnVZVzFsYzNCaFkyVWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnTVRvZ2RtRnNkV1VnYVhNZ1lTQnRiMlIxYkdVZ2FXUXNJSEpsY1hWcGNtVWdhWFJjYmlCY2RDOHZJRzF2WkdVZ0ppQXlPaUJ0WlhKblpTQmhiR3dnY0hKdmNHVnlkR2xsY3lCdlppQjJZV3gxWlNCcGJuUnZJSFJvWlNCdWMxeHVJRngwTHk4Z2JXOWtaU0FtSURRNklISmxkSFZ5YmlCMllXeDFaU0IzYUdWdUlHRnNjbVZoWkhrZ2JuTWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnT0h3eE9pQmlaV2hoZG1VZ2JHbHJaU0J5WlhGMWFYSmxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuUWdQU0JtZFc1amRHbHZiaWgyWVd4MVpTd2diVzlrWlNrZ2UxeHVJRngwWEhScFppaHRiMlJsSUNZZ01Ta2dkbUZzZFdVZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLSFpoYkhWbEtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlEZ3BJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQmNkRngwYVdZb0tHMXZaR1VnSmlBMEtTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhaaGJIVmxJQ1ltSUhaaGJIVmxMbDlmWlhOTmIyUjFiR1VwSUhKbGRIVnliaUIyWVd4MVpUdGNiaUJjZEZ4MGRtRnlJRzV6SUQwZ1QySnFaV04wTG1OeVpXRjBaU2h1ZFd4c0tUdGNiaUJjZEZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXlLRzV6S1R0Y2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHNXpMQ0FuWkdWbVlYVnNkQ2NzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z2RtRnNkV1U2SUhaaGJIVmxJSDBwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnTWlBbUppQjBlWEJsYjJZZ2RtRnNkV1VnSVQwZ0ozTjBjbWx1WnljcElHWnZjaWgyWVhJZ2EyVjVJR2x1SUhaaGJIVmxLU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb2JuTXNJR3RsZVN3Z1puVnVZM1JwYjI0b2EyVjVLU0I3SUhKbGRIVnliaUIyWVd4MVpWdHJaWGxkT3lCOUxtSnBibVFvYm5Wc2JDd2dhMlY1S1NrN1hHNGdYSFJjZEhKbGRIVnliaUJ1Y3p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdkbGRFUmxabUYxYkhSRmVIQnZjblFnWm5WdVkzUnBiMjRnWm05eUlHTnZiWEJoZEdsaWFXeHBkSGtnZDJsMGFDQnViMjR0YUdGeWJXOXVlU0J0YjJSMWJHVnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtNGdQU0JtZFc1amRHbHZiaWh0YjJSMWJHVXBJSHRjYmlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBSR1ZtWVhWc2RDZ3BJSHNnY21WMGRYSnVJRzF2WkhWc1pWc25aR1ZtWVhWc2RDZGRPeUI5SURwY2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUk5iMlIxYkdWRmVIQnZjblJ6S0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsT3lCOU8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9aMlYwZEdWeUxDQW5ZU2NzSUdkbGRIUmxjaWs3WEc0Z1hIUmNkSEpsZEhWeWJpQm5aWFIwWlhJN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd4Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlBOUlHWjFibU4wYVc5dUtHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcElIc2djbVYwZFhKdUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lIQnliM0JsY25SNUtUc2dmVHRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuTWdQU0JjSWk0dmMzSmpMMnB6TDJsdVpHVjRMbXB6WENJcE8xeHVJaXdpTHlvaFhHNGdLaUJvWldGa2NtOXZiUzVxY3lCMk1DNHhNaTR3SUMwZ1IybDJaU0I1YjNWeUlIQmhaMlVnYzI5dFpTQm9aV0ZrY205dmJTNGdTR2xrWlNCNWIzVnlJR2hsWVdSbGNpQjFiblJwYkNCNWIzVWdibVZsWkNCcGRGeHVJQ29nUTI5d2VYSnBaMmgwSUNoaktTQXlNREl3SUU1cFkyc2dWMmxzYkdsaGJYTWdMU0JvZEhSd09pOHZkMmxqYTNrdWJtbHNiR2xoTG0xekwyaGxZV1J5YjI5dExtcHpYRzRnS2lCTWFXTmxibk5sT2lCTlNWUmNiaUFxTDF4dVhHNG9ablZ1WTNScGIyNGdLR2RzYjJKaGJDd2dabUZqZEc5eWVTa2dlMXh1SUNCMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkSGx3Wlc5bUlHMXZaSFZzWlNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnUHlCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaaFkzUnZjbmtvS1NBNlhHNGdJSFI1Y0dWdlppQmtaV1pwYm1VZ1BUMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ1pHVm1hVzVsTG1GdFpDQS9JR1JsWm1sdVpTaG1ZV04wYjNKNUtTQTZYRzRnSUNobmJHOWlZV3dnUFNCbmJHOWlZV3dnZkh3Z2MyVnNaaXdnWjJ4dlltRnNMa2hsWVdSeWIyOXRJRDBnWm1GamRHOXllU2dwS1R0Y2JuMG9kR2hwY3l3Z1puVnVZM1JwYjI0Z0tDa2dleUFuZFhObElITjBjbWxqZENjN1hHNWNiaUFnWm5WdVkzUnBiMjRnYVhOQ2NtOTNjMlZ5S0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwZVhCbGIyWWdkMmx1Wkc5M0lDRTlQU0JjSW5WdVpHVm1hVzVsWkZ3aU8xeHVJQ0I5WEc1Y2JpQWdMeW9xWEc0Z0lDQXFJRlZ6WldRZ2RHOGdaR1YwWldOMElHSnliM2R6WlhJZ2MzVndjRzl5ZENCbWIzSWdZV1JrYVc1bklHRnVJR1YyWlc1MElHeHBjM1JsYm1WeUlIZHBkR2dnYjNCMGFXOXVjMXh1SUNBZ0tpQkRjbVZrYVhRNklHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwRlFTUzlGZG1WdWRGUmhjbWRsZEM5aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5WEc0Z0lDQXFMMXh1SUNCbWRXNWpkR2x2YmlCd1lYTnphWFpsUlhabGJuUnpVM1Z3Y0c5eWRHVmtLQ2tnZTF4dUlDQWdJSFpoY2lCemRYQndiM0owWldRZ1BTQm1ZV3h6WlR0Y2JseHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQjJZWElnYjNCMGFXOXVjeUE5SUh0Y2JpQWdJQ0FnSUNBZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJtVjRkQzFzYVc1bElHZGxkSFJsY2kxeVpYUjFjbTVjYmlBZ0lDQWdJQ0FnWjJWMElIQmhjM05wZG1Vb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnYzNWd2NHOXlkR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpZEdWemRGd2lMQ0J2Y0hScGIyNXpMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQWdJSGRwYm1SdmR5NXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLRndpZEdWemRGd2lMQ0J2Y0hScGIyNXpMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxjbklwSUh0Y2JpQWdJQ0FnSUhOMWNIQnZjblJsWkNBOUlHWmhiSE5sTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQnpkWEJ3YjNKMFpXUTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJwYzFOMWNIQnZjblJsWkNncElIdGNiaUFnSUNCeVpYUjFjbTRnSVNFb1hHNGdJQ0FnSUNCcGMwSnliM2R6WlhJb0tTQW1KbHh1SUNBZ0lDQWdablZ1WTNScGIyNG9LU0I3ZlM1aWFXNWtJQ1ltWEc0Z0lDQWdJQ0JjSW1Oc1lYTnpUR2x6ZEZ3aUlHbHVJR1J2WTNWdFpXNTBMbVJ2WTNWdFpXNTBSV3hsYldWdWRDQW1KbHh1SUNBZ0lDQWdUMkpxWldOMExtRnpjMmxuYmlBbUpseHVJQ0FnSUNBZ1QySnFaV04wTG10bGVYTWdKaVpjYmlBZ0lDQWdJSEpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlZ4dUlDQWdJQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCcGMwUnZZM1Z0Wlc1MEtHOWlhaWtnZTF4dUlDQWdJSEpsZEhWeWJpQnZZbW91Ym05a1pWUjVjR1VnUFQwOUlEazdJQzh2SUU1dlpHVXVSRTlEVlUxRlRsUmZUazlFUlNBOVBUMGdPVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYVhOWGFXNWtiM2NvYjJKcUtTQjdYRzRnSUNBZ0x5OGdZRzlpYWlBOVBUMGdkMmx1Wkc5M1lDQnZjaUJnYjJKcUlHbHVjM1JoYm1ObGIyWWdWMmx1Wkc5M1lDQnBjeUJ1YjNRZ2MzVm1abWxqYVdWdWRDeGNiaUFnSUNBdkx5QmhjeUIwYUdVZ2IySnFJRzFoZVNCaVpTQjBhR1VnZDJsdVpHOTNJRzltSUdGdUlHbG1jbUZ0WlM1Y2JpQWdJQ0J5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVrYjJOMWJXVnVkQ0FtSmlCcGMwUnZZM1Z0Wlc1MEtHOWlhaTVrYjJOMWJXVnVkQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCM2FXNWtiM2RUWTNKdmJHeGxjaWgzYVc0cElIdGNiaUFnSUNCMllYSWdaRzlqSUQwZ2QybHVMbVJ2WTNWdFpXNTBPMXh1SUNBZ0lIWmhjaUJpYjJSNUlEMGdaRzlqTG1KdlpIazdYRzRnSUNBZ2RtRnlJR2gwYld3Z1BTQmtiMk11Wkc5amRXMWxiblJGYkdWdFpXNTBPMXh1WEc0Z0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nUUhObFpTQm9kSFJ3T2k4dmFtRnRaWE11Y0dGa2IyeHpaWGt1WTI5dEwycGhkbUZ6WTNKcGNIUXZaMlYwTFdSdlkzVnRaVzUwTFdobGFXZG9kQzFqY205emN5MWljbTkzYzJWeUwxeHVJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQjBhR1VnYzJOeWIyeHNJR2hsYVdkb2RDQnZaaUIwYUdVZ1pHOWpkVzFsYm5RZ2FXNGdjR2w0Wld4elhHNGdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lITmpjbTlzYkVobGFXZG9kRG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCTllYUm9MbTFoZUNoY2JpQWdJQ0FnSUNBZ0lDQmliMlI1TG5OamNtOXNiRWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdJQ0JvZEcxc0xuTmpjbTlzYkVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnSUNCaWIyUjVMbTltWm5ObGRFaGxhV2RvZEN4Y2JpQWdJQ0FnSUNBZ0lDQm9kRzFzTG05bVpuTmxkRWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdJQ0JpYjJSNUxtTnNhV1Z1ZEVobGFXZG9kQ3hjYmlBZ0lDQWdJQ0FnSUNCb2RHMXNMbU5zYVdWdWRFaGxhV2RvZEZ4dUlDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ2ZTeGNibHh1SUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnS2lCQWMyVmxJR2gwZEhBNkx5OWhibVI1YkdGdVozUnZiaTVqYnk1MWF5OWliRzluTDJSbGRtVnNiM0J0Wlc1MEwyZGxkQzEyYVdWM2NHOXlkQzF6YVhwbExYZHBaSFJvTFdGdVpDMW9aV2xuYUhRdGFtRjJZWE5qY21sd2RGeHVJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQjBhR1VnYUdWcFoyaDBJRzltSUhSb1pTQjJhV1YzY0c5eWRDQnBiaUJ3YVhobGJITmNiaUFnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdhR1ZwWjJoME9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSGRwYmk1cGJtNWxja2hsYVdkb2RDQjhmQ0JvZEcxc0xtTnNhV1Z1ZEVobGFXZG9kQ0I4ZkNCaWIyUjVMbU5zYVdWdWRFaGxhV2RvZER0Y2JpQWdJQ0FnSUgwc1hHNWNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nUjJWMGN5QjBhR1VnV1NCelkzSnZiR3dnY0c5emFYUnBiMjVjYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnY0dsNFpXeHpJSFJvWlNCd1lXZGxJR2hoY3lCelkzSnZiR3hsWkNCaGJHOXVaeUIwYUdVZ1dTMWhlR2x6WEc0Z0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUhOamNtOXNiRms2SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvZDJsdUxuQmhaMlZaVDJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRcElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkMmx1TG5CaFoyVlpUMlptYzJWME8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ2hvZEcxc0lIeDhJR0p2WkhrdWNHRnlaVzUwVG05a1pTQjhmQ0JpYjJSNUtTNXpZM0p2Ykd4VWIzQTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1ZzWlcxbGJuUlRZM0p2Ykd4bGNpaGxiR1Z0Wlc1MEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQjBhR1VnYzJOeWIyeHNJR2hsYVdkb2RDQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCcGJpQndhWGhsYkhOY2JpQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ2MyTnliMnhzU0dWcFoyaDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUUxaGRHZ3ViV0Y0S0Z4dUlDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RdWMyTnliMnhzU0dWcFoyaDBMRnh1SUNBZ0lDQWdJQ0FnSUdWc1pXMWxiblF1YjJabWMyVjBTR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUXVZMnhwWlc1MFNHVnBaMmgwWEc0Z0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNCOUxGeHVYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnZEdobElHaGxhV2RvZENCdlppQjBhR1VnWld4bGJXVnVkQ0JwYmlCd2FYaGxiSE5jYmlBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnYUdWcFoyaDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUUxaGRHZ3ViV0Y0S0dWc1pXMWxiblF1YjJabWMyVjBTR1ZwWjJoMExDQmxiR1Z0Wlc1MExtTnNhV1Z1ZEVobGFXZG9kQ2s3WEc0Z0lDQWdJQ0I5TEZ4dVhHNGdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQXFJRWRsZEhNZ2RHaGxJRmtnYzJOeWIyeHNJSEJ2YzJsMGFXOXVYRzRnSUNBZ0lDQWdLaUJBY21WMGRYSnVJSHRPZFcxaVpYSjlJSEJwZUdWc2N5QjBhR1VnWld4bGJXVnVkQ0JvWVhNZ2MyTnliMnhzWldRZ1lXeHZibWNnZEdobElGa3RZWGhwYzF4dUlDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNCelkzSnZiR3haT2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHVnNaVzFsYm5RdWMyTnliMnhzVkc5d08xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpjbVZoZEdWVFkzSnZiR3hsY2lobGJHVnRaVzUwS1NCN1hHNGdJQ0FnY21WMGRYSnVJR2x6VjJsdVpHOTNLR1ZzWlcxbGJuUXBJRDhnZDJsdVpHOTNVMk55YjJ4c1pYSW9aV3hsYldWdWRDa2dPaUJsYkdWdFpXNTBVMk55YjJ4c1pYSW9aV3hsYldWdWRDazdYRzRnSUgxY2JseHVJQ0F2S2lwY2JpQWdJQ29nUUhCaGNtRnRJR1ZzWlcxbGJuUWdSWFpsYm5SVVlYSm5aWFJjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUhSeVlXTnJVMk55YjJ4c0tHVnNaVzFsYm5Rc0lHOXdkR2x2Ym5Nc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ2RtRnlJR2x6VUdGemMybDJaVk4xY0hCdmNuUmxaQ0E5SUhCaGMzTnBkbVZGZG1WdWRITlRkWEJ3YjNKMFpXUW9LVHRjYmlBZ0lDQjJZWElnY21GbVNXUTdYRzRnSUNBZ2RtRnlJSE5qY205c2JHVmtJRDBnWm1Gc2MyVTdYRzRnSUNBZ2RtRnlJSE5qY205c2JHVnlJRDBnWTNKbFlYUmxVMk55YjJ4c1pYSW9aV3hsYldWdWRDazdYRzRnSUNBZ2RtRnlJR3hoYzNSVFkzSnZiR3haSUQwZ2MyTnliMnhzWlhJdWMyTnliMnhzV1NncE8xeHVJQ0FnSUhaaGNpQmtaWFJoYVd4eklEMGdlMzA3WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUIxY0dSaGRHVW9LU0I3WEc0Z0lDQWdJQ0IyWVhJZ2MyTnliMnhzV1NBOUlFMWhkR2d1Y205MWJtUW9jMk55YjJ4c1pYSXVjMk55YjJ4c1dTZ3BLVHRjYmlBZ0lDQWdJSFpoY2lCb1pXbG5hSFFnUFNCelkzSnZiR3hsY2k1b1pXbG5hSFFvS1R0Y2JpQWdJQ0FnSUhaaGNpQnpZM0p2Ykd4SVpXbG5hSFFnUFNCelkzSnZiR3hsY2k1elkzSnZiR3hJWldsbmFIUW9LVHRjYmx4dUlDQWdJQ0FnTHk4Z2NtVjFjMlVnYjJKcVpXTjBJR1p2Y2lCc1pYTnpJRzFsYlc5eWVTQmphSFZ5Ymx4dUlDQWdJQ0FnWkdWMFlXbHNjeTV6WTNKdmJHeFpJRDBnYzJOeWIyeHNXVHRjYmlBZ0lDQWdJR1JsZEdGcGJITXViR0Z6ZEZOamNtOXNiRmtnUFNCc1lYTjBVMk55YjJ4c1dUdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdVpHbHlaV04wYVc5dUlEMGdjMk55YjJ4c1dTQStJR3hoYzNSVFkzSnZiR3haSUQ4Z1hDSmtiM2R1WENJZ09pQmNJblZ3WENJN1hHNGdJQ0FnSUNCa1pYUmhhV3h6TG1ScGMzUmhibU5sSUQwZ1RXRjBhQzVoWW5Nb2MyTnliMnhzV1NBdElHeGhjM1JUWTNKdmJHeFpLVHRjYmlBZ0lDQWdJR1JsZEdGcGJITXVhWE5QZFhSUFprSnZkVzVrY3lBOUlITmpjbTlzYkZrZ1BDQXdJSHg4SUhOamNtOXNiRmtnS3lCb1pXbG5hSFFnUGlCelkzSnZiR3hJWldsbmFIUTdYRzRnSUNBZ0lDQmtaWFJoYVd4ekxuUnZjQ0E5SUhOamNtOXNiRmtnUEQwZ2IzQjBhVzl1Y3k1dlptWnpaWFJiWkdWMFlXbHNjeTVrYVhKbFkzUnBiMjVkTzF4dUlDQWdJQ0FnWkdWMFlXbHNjeTVpYjNSMGIyMGdQU0J6WTNKdmJHeFpJQ3NnYUdWcFoyaDBJRDQ5SUhOamNtOXNiRWhsYVdkb2REdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdWRHOXNaWEpoYm1ObFJYaGpaV1ZrWldRZ1BWeHVJQ0FnSUNBZ0lDQmtaWFJoYVd4ekxtUnBjM1JoYm1ObElENGdiM0IwYVc5dWN5NTBiMnhsY21GdVkyVmJaR1YwWVdsc2N5NWthWEpsWTNScGIyNWRPMXh1WEc0Z0lDQWdJQ0JqWVd4c1ltRmpheWhrWlhSaGFXeHpLVHRjYmx4dUlDQWdJQ0FnYkdGemRGTmpjbTlzYkZrZ1BTQnpZM0p2Ykd4Wk8xeHVJQ0FnSUNBZ2MyTnliMnhzWldRZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJvWVc1a2JHVlRZM0p2Ykd3b0tTQjdYRzRnSUNBZ0lDQnBaaUFvSVhOamNtOXNiR1ZrS1NCN1hHNGdJQ0FnSUNBZ0lITmpjbTlzYkdWa0lEMGdkSEoxWlR0Y2JpQWdJQ0FnSUNBZ2NtRm1TV1FnUFNCeVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVW9kWEJrWVhSbEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdaWFpsYm5SUGNIUnBiMjV6SUQwZ2FYTlFZWE56YVhabFUzVndjRzl5ZEdWa1hHNGdJQ0FnSUNBL0lIc2djR0Z6YzJsMlpUb2dkSEoxWlN3Z1kyRndkSFZ5WlRvZ1ptRnNjMlVnZlZ4dUlDQWdJQ0FnT2lCbVlXeHpaVHRjYmx4dUlDQWdJR1ZzWlcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbk5qY205c2JGd2lMQ0JvWVc1a2JHVlRZM0p2Ykd3c0lHVjJaVzUwVDNCMGFXOXVjeWs3WEc0Z0lDQWdkWEJrWVhSbEtDazdYRzVjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ1pHVnpkSEp2ZVRvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJR05oYm1ObGJFRnVhVzFoZEdsdmJrWnlZVzFsS0hKaFprbGtLVHRjYmlBZ0lDQWdJQ0FnWld4bGJXVnVkQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWMyTnliMnhzWENJc0lHaGhibVJzWlZOamNtOXNiQ3dnWlhabGJuUlBjSFJwYjI1ektUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdibTl5YldGc2FYcGxWWEJFYjNkdUtIUXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RDQTlQVDBnVDJKcVpXTjBLSFFwSUQ4Z2RDQTZJSHNnWkc5M2Jqb2dkQ3dnZFhBNklIUWdmVHRjYmlBZ2ZWeHVYRzRnSUM4cUtseHVJQ0FnS2lCVlNTQmxibWhoYm1ObGJXVnVkQ0JtYjNJZ1ptbDRaV1FnYUdWaFpHVnljeTVjYmlBZ0lDb2dTR2xrWlhNZ2FHVmhaR1Z5SUhkb1pXNGdjMk55YjJ4c2FXNW5JR1J2ZDI1Y2JpQWdJQ29nVTJodmQzTWdhR1ZoWkdWeUlIZG9aVzRnYzJOeWIyeHNhVzVuSUhWd1hHNGdJQ0FxSUVCamIyNXpkSEoxWTNSdmNseHVJQ0FnS2lCQWNHRnlZVzBnZTBSUFRVVnNaVzFsYm5SOUlHVnNaVzBnZEdobElHaGxZV1JsY2lCbGJHVnRaVzUwWEc0Z0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnZjSFJwYjI1eklHOXdkR2x2Ym5NZ1ptOXlJSFJvWlNCM2FXUm5aWFJjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUVobFlXUnliMjl0S0dWc1pXMHNJRzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQnZjSFJwYjI1eklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlR0Y2JpQWdJQ0JQWW1wbFkzUXVZWE56YVdkdUtIUm9hWE1zSUVobFlXUnliMjl0TG05d2RHbHZibk1zSUc5d2RHbHZibk1wTzF4dUlDQWdJSFJvYVhNdVkyeGhjM05sY3lBOUlFOWlhbVZqZEM1aGMzTnBaMjRvZTMwc0lFaGxZV1J5YjI5dExtOXdkR2x2Ym5NdVkyeGhjM05sY3l3Z2IzQjBhVzl1Y3k1amJHRnpjMlZ6S1R0Y2JseHVJQ0FnSUhSb2FYTXVaV3hsYlNBOUlHVnNaVzA3WEc0Z0lDQWdkR2hwY3k1MGIyeGxjbUZ1WTJVZ1BTQnViM0p0WVd4cGVtVlZjRVJ2ZDI0b2RHaHBjeTUwYjJ4bGNtRnVZMlVwTzF4dUlDQWdJSFJvYVhNdWIyWm1jMlYwSUQwZ2JtOXliV0ZzYVhwbFZYQkViM2R1S0hSb2FYTXViMlptYzJWMEtUdGNiaUFnSUNCMGFHbHpMbWx1YVhScFlXeHBjMlZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdkR2hwY3k1bWNtOTZaVzRnUFNCbVlXeHpaVHRjYmlBZ2ZWeHVJQ0JJWldGa2NtOXZiUzV3Y205MGIzUjVjR1VnUFNCN1hHNGdJQ0FnWTI5dWMzUnlkV04wYjNJNklFaGxZV1J5YjI5dExGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVM1JoY25RZ2JHbHpkR1Z1YVc1bklIUnZJSE5qY205c2JHbHVaMXh1SUNBZ0lDQXFJRUJ3ZFdKc2FXTmNiaUFnSUNBZ0tpOWNiaUFnSUNCcGJtbDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUdsbUlDaElaV0ZrY205dmJTNWpkWFJ6VkdobFRYVnpkR0Z5WkNBbUppQWhkR2hwY3k1cGJtbDBhV0ZzYVhObFpDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtRmtaRU5zWVhOektGd2lhVzVwZEdsaGJGd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXBibWwwYVdGc2FYTmxaQ0E5SUhSeWRXVTdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z1pHVm1aWElnWlhabGJuUWdjbVZuYVhOMGNtRjBhVzl1SUhSdklHaGhibVJzWlNCaWNtOTNjMlZ5WEc0Z0lDQWdJQ0FnSUM4dklIQnZkR1Z1ZEdsaGJHeDVJSEpsYzNSdmNtbHVaeUJ3Y21WMmFXOTFjeUJ6WTNKdmJHd2djRzl6YVhScGIyNWNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2hjYmlBZ0lDQWdJQ0FnSUNCbWRXNWpkR2x2YmloelpXeG1LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpaV3htTG5OamNtOXNiRlJ5WVdOclpYSWdQU0IwY21GamExTmpjbTlzYkNoY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNXpZM0p2Ykd4bGNpeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2V5QnZabVp6WlhRNklITmxiR1l1YjJabWMyVjBMQ0IwYjJ4bGNtRnVZMlU2SUhObGJHWXVkRzlzWlhKaGJtTmxJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSE5sYkdZdWRYQmtZWFJsTG1KcGJtUW9jMlZzWmlsY2JpQWdJQ0FnSUNBZ0lDQWdJQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdJQ0F4TURBc1hHNGdJQ0FnSUNBZ0lDQWdkR2hwYzF4dUlDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjenRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUkdWemRISnZlU0IwYUdVZ2QybGtaMlYwTENCamJHVmhjbWx1WnlCMWNDQmhablJsY2lCcGRITmxiR1pjYmlBZ0lDQWdLaUJBY0hWaWJHbGpYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1pHVnpkSEp2ZVRvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG1sdWFYUnBZV3hwYzJWa0lEMGdabUZzYzJVN1hHNGdJQ0FnSUNCUFltcGxZM1F1YTJWNWN5aDBhR2x6TG1Oc1lYTnpaWE1wTG1admNrVmhZMmdvZEdocGN5NXlaVzF2ZG1WRGJHRnpjeXdnZEdocGN5azdYRzRnSUNBZ0lDQjBhR2x6TG5OamNtOXNiRlJ5WVdOclpYSXVaR1Z6ZEhKdmVTZ3BPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJWYm5CcGJpQjBhR1VnWld4bGJXVnVkRnh1SUNBZ0lDQXFJRUJ3ZFdKc2FXTmNiaUFnSUNBZ0tpOWNiaUFnSUNCMWJuQnBiam9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9kR2hwY3k1b1lYTkRiR0Z6Y3loY0luQnBibTVsWkZ3aUtTQjhmQ0FoZEdocGN5NW9ZWE5EYkdGemN5aGNJblZ1Y0dsdWJtVmtYQ0lwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1EyeGhjM01vWENKMWJuQnBibTVsWkZ3aUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpXMXZkbVZEYkdGemN5aGNJbkJwYm01bFpGd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJsVnVjR2x1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1dmJsVnVjR2x1TG1OaGJHd29kR2hwY3lrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOUxGeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVR2x1SUhSb1pTQmxiR1Z0Wlc1MFhHNGdJQ0FnSUNvZ1FIQjFZbXhwWTF4dUlDQWdJQ0FxTDF4dUlDQWdJSEJwYmpvZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NW9ZWE5EYkdGemN5aGNJblZ1Y0dsdWJtVmtYQ0lwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1EyeGhjM01vWENKd2FXNXVaV1JjSWlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y21WdGIzWmxRMnhoYzNNb1hDSjFibkJwYm01bFpGd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJsQnBiaWtnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11YjI1UWFXNHVZMkZzYkNoMGFHbHpLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBzWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCR2NtVmxlbVZ6SUhSb1pTQmpkWEp5Wlc1MElITjBZWFJsSUc5bUlIUm9aU0IzYVdSblpYUmNiaUFnSUNBZ0tpQkFjSFZpYkdsalhHNGdJQ0FnSUNvdlhHNGdJQ0FnWm5KbFpYcGxPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVabkp2ZW1WdUlEMGdkSEoxWlR0Y2JpQWdJQ0FnSUhSb2FYTXVZV1JrUTJ4aGMzTW9YQ0ptY205NlpXNWNJaWs3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZKbExXVnVZV0pzWlhNZ2RHaGxJR1JsWm1GMWJIUWdZbVZvWVhacGIzVnlJRzltSUhSb1pTQjNhV1JuWlhSY2JpQWdJQ0FnS2lCQWNIVmliR2xqWEc0Z0lDQWdJQ292WEc0Z0lDQWdkVzVtY21WbGVtVTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NW1jbTk2Wlc0Z1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKbWNtOTZaVzVjSWlrN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhSdmNEb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0JwWmlBb0lYUm9hWE11YUdGelEyeGhjM01vWENKMGIzQmNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW5SdmNGd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaVzF2ZG1WRGJHRnpjeWhjSW01dmRGUnZjRndpS1R0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXZibFJ2Y0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNVViM0F1WTJGc2JDaDBhR2x6S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCdWIzUlViM0E2SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0YwYUdsekxtaGhjME5zWVhOektGd2libTkwVkc5d1hDSXBLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZV1JrUTJ4aGMzTW9YQ0p1YjNSVWIzQmNJaWs3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFEyeGhjM01vWENKMGIzQmNJaWs3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWIyNU9iM1JVYjNBcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVUbTkwVkc5d0xtTmhiR3dvZEdocGN5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdZbTkwZEc5dE9pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGRHaHBjeTVvWVhORGJHRnpjeWhjSW1KdmRIUnZiVndpS1NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Ga1pFTnNZWE56S0Z3aVltOTBkRzl0WENJcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGJXOTJaVU5zWVhOektGd2libTkwUW05MGRHOXRYQ0lwTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxtOXVRbTkwZEc5dEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXZia0p2ZEhSdmJTNWpZV3hzS0hSb2FYTXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmx4dUlDQWdJRzV2ZEVKdmRIUnZiVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWFJvYVhNdWFHRnpRMnhoYzNNb1hDSnViM1JDYjNSMGIyMWNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW01dmRFSnZkSFJ2YlZ3aUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpXMXZkbVZEYkdGemN5aGNJbUp2ZEhSdmJWd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJrNXZkRUp2ZEhSdmJTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXViMjVPYjNSQ2IzUjBiMjB1WTJGc2JDaDBhR2x6S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCemFHOTFiR1JWYm5CcGJqb2dablZ1WTNScGIyNG9aR1YwWVdsc2N5a2dlMXh1SUNBZ0lDQWdkbUZ5SUhOamNtOXNiR2x1WjBSdmQyNGdQU0JrWlhSaGFXeHpMbVJwY21WamRHbHZiaUE5UFQwZ1hDSmtiM2R1WENJN1hHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCelkzSnZiR3hwYm1kRWIzZHVJQ1ltSUNGa1pYUmhhV3h6TG5SdmNDQW1KaUJrWlhSaGFXeHpMblJ2YkdWeVlXNWpaVVY0WTJWbFpHVmtPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQnphRzkxYkdSUWFXNDZJR1oxYm1OMGFXOXVLR1JsZEdGcGJITXBJSHRjYmlBZ0lDQWdJSFpoY2lCelkzSnZiR3hwYm1kVmNDQTlJR1JsZEdGcGJITXVaR2x5WldOMGFXOXVJRDA5UFNCY0luVndYQ0k3WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUFvYzJOeWIyeHNhVzVuVlhBZ0ppWWdaR1YwWVdsc2N5NTBiMnhsY21GdVkyVkZlR05sWldSbFpDa2dmSHdnWkdWMFlXbHNjeTUwYjNBN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdGa1pFTnNZWE56T2lCbWRXNWpkR2x2YmloamJHRnpjMDVoYldVcElIdGNiaUFnSUNBZ0lIUm9hWE11Wld4bGJTNWpiR0Z6YzB4cGMzUXVZV1JrTG1Gd2NHeDVLRnh1SUNBZ0lDQWdJQ0IwYUdsekxtVnNaVzB1WTJ4aGMzTk1hWE4wTEZ4dUlDQWdJQ0FnSUNCMGFHbHpMbU5zWVhOelpYTmJZMnhoYzNOT1lXMWxYUzV6Y0d4cGRDaGNJaUJjSWlsY2JpQWdJQ0FnSUNrN1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhKbGJXOTJaVU5zWVhOek9pQm1kVzVqZEdsdmJpaGpiR0Z6YzA1aGJXVXBJSHRjYmlBZ0lDQWdJSFJvYVhNdVpXeGxiUzVqYkdGemMweHBjM1F1Y21WdGIzWmxMbUZ3Y0d4NUtGeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Wc1pXMHVZMnhoYzNOTWFYTjBMRnh1SUNBZ0lDQWdJQ0IwYUdsekxtTnNZWE56WlhOYlkyeGhjM05PWVcxbFhTNXpjR3hwZENoY0lpQmNJaWxjYmlBZ0lDQWdJQ2s3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJR2hoYzBOc1lYTnpPaUJtZFc1amRHbHZiaWhqYkdGemMwNWhiV1VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtTnNZWE56WlhOYlkyeGhjM05PWVcxbFhTNXpjR3hwZENoY0lpQmNJaWt1WlhabGNua29ablZ1WTNScGIyNG9ZMnh6S1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbU5zWVhOelRHbHpkQzVqYjI1MFlXbHVjeWhqYkhNcE8xeHVJQ0FnSUNBZ2ZTd2dkR2hwY3k1bGJHVnRLVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdkWEJrWVhSbE9pQm1kVzVqZEdsdmJpaGtaWFJoYVd4ektTQjdYRzRnSUNBZ0lDQnBaaUFvWkdWMFlXbHNjeTVwYzA5MWRFOW1RbTkxYm1SektTQjdYRzRnSUNBZ0lDQWdJQzh2SUVsbmJtOXlaU0JpYjNWdVkza2djMk55YjJ4c2FXNW5JR2x1SUU5VFdGeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxtWnliM3BsYmlBOVBUMGdkSEoxWlNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHbG1JQ2hrWlhSaGFXeHpMblJ2Y0NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5SdmNDZ3BPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1dWIzUlViM0FvS1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLR1JsZEdGcGJITXVZbTkwZEc5dEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVltOTBkRzl0S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbTV2ZEVKdmRIUnZiU2dwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9kR2hwY3k1emFHOTFiR1JWYm5CcGJpaGtaWFJoYVd4ektTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuVnVjR2x1S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11YzJodmRXeGtVR2x1S0dSbGRHRnBiSE1wS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y0dsdUtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJQzhxS2x4dUlDQWdLaUJFWldaaGRXeDBJRzl3ZEdsdmJuTmNiaUFnSUNvZ1FIUjVjR1VnZTA5aWFtVmpkSDFjYmlBZ0lDb3ZYRzRnSUVobFlXUnliMjl0TG05d2RHbHZibk1nUFNCN1hHNGdJQ0FnZEc5c1pYSmhibU5sT2lCN1hHNGdJQ0FnSUNCMWNEb2dNQ3hjYmlBZ0lDQWdJR1J2ZDI0NklEQmNiaUFnSUNCOUxGeHVJQ0FnSUc5bVpuTmxkRG9nTUN4Y2JpQWdJQ0J6WTNKdmJHeGxjam9nYVhOQ2NtOTNjMlZ5S0NrZ1B5QjNhVzVrYjNjZ09pQnVkV3hzTEZ4dUlDQWdJR05zWVhOelpYTTZJSHRjYmlBZ0lDQWdJR1p5YjNwbGJqb2dYQ0pvWldGa2NtOXZiUzB0Wm5KdmVtVnVYQ0lzWEc0Z0lDQWdJQ0J3YVc1dVpXUTZJRndpYUdWaFpISnZiMjB0TFhCcGJtNWxaRndpTEZ4dUlDQWdJQ0FnZFc1d2FXNXVaV1E2SUZ3aWFHVmhaSEp2YjIwdExYVnVjR2x1Ym1Wa1hDSXNYRzRnSUNBZ0lDQjBiM0E2SUZ3aWFHVmhaSEp2YjIwdExYUnZjRndpTEZ4dUlDQWdJQ0FnYm05MFZHOXdPaUJjSW1obFlXUnliMjl0TFMxdWIzUXRkRzl3WENJc1hHNGdJQ0FnSUNCaWIzUjBiMjA2SUZ3aWFHVmhaSEp2YjIwdExXSnZkSFJ2YlZ3aUxGeHVJQ0FnSUNBZ2JtOTBRbTkwZEc5dE9pQmNJbWhsWVdSeWIyOXRMUzF1YjNRdFltOTBkRzl0WENJc1hHNGdJQ0FnSUNCcGJtbDBhV0ZzT2lCY0ltaGxZV1J5YjI5dFhDSmNiaUFnSUNCOVhHNGdJSDA3WEc1Y2JpQWdTR1ZoWkhKdmIyMHVZM1YwYzFSb1pVMTFjM1JoY21RZ1BTQnBjMU4xY0hCdmNuUmxaQ2dwTzF4dVhHNGdJSEpsZEhWeWJpQklaV0ZrY205dmJUdGNibHh1ZlNrcE8xeHVJaXdpYVcxd2IzSjBJRWhsWVdSeWIyOXRJR1p5YjIwZ0oyaGxZV1J5YjI5dExtcHpKenRjYmx4dVkyOXVjM1FnYUdWaFpHVnlJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25hR1ZoWkdWeUp5azdYRzVqYjI1emRDQm9aV0ZrY205dmJTQTlJRzVsZHlCSVpXRmtjbTl2YlNob1pXRmtaWElwTzF4dWFHVmhaSEp2YjIwdWFXNXBkQ2dwTzF4dWFHVmhaSEp2YjIwdWRHOXdLQ2s3SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSJ9
