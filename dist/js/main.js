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

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
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

/***/ "./src/js/cjs/helper.js":
/*!******************************!*\
  !*** ./src/js/cjs/helper.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const people = {
  name: 'people',
  age: 12,
}

module.exports = {
  people
}

/***/ }),

/***/ "./src/js/cjs/index.js":
/*!*****************************!*\
  !*** ./src/js/cjs/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {const helpers = __webpack_require__(/*! ./helper */ "./src/js/cjs/helper.js")
console.log(helpers)
console.log(module)
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/es/helpers.js":
/*!******************************!*\
  !*** ./src/js/es/helpers.js ***!
  \******************************/
/*! exports provided: cube, foo, graph, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _my_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./my-module */ "./src/js/es/my-module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cube", function() { return _my_module__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "foo", function() { return _my_module__WEBPACK_IMPORTED_MODULE_0__["foo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return _my_module__WEBPACK_IMPORTED_MODULE_0__["graph"]; });



const answers = 42;

const getTheAnswer = function () {
  return answers
}

/* harmony default export */ __webpack_exports__["default"] = (getTheAnswer);

/***/ }),

/***/ "./src/js/es/main.js":
/*!***************************!*\
  !*** ./src/js/es/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/js/es/helpers.js");



const answer = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])();
const wizard = 'Radagast';

console.log(`The answer is ${answer}, ${wizard}`);
console.log(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["default"])(2))
console.log(_helpers__WEBPACK_IMPORTED_MODULE_0__["foo"], _helpers__WEBPACK_IMPORTED_MODULE_0__["graph"])

/***/ }),

/***/ "./src/js/es/my-module.js":
/*!********************************!*\
  !*** ./src/js/es/my-module.js ***!
  \********************************/
/*! exports provided: default, foo, graph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cube; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foo", function() { return foo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return graph; });
function cube(x) {
  return x * x * x;
}

const foo = Math.PI + Math.SQRT2;

const graph = {
  options: {

    color: 'white',
    thickness: '2px'
  },
  draw() {
    console.log('From graph draw function')
  }
}




/***/ }),

/***/ "./src/js/lib/Bin.js":
/*!***************************!*\
  !*** ./src/js/lib/Bin.js ***!
  \***************************/
/*! exports provided: Bin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bin", function() { return Bin; });
/* harmony import */ var _utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/emitEvent */ "./src/js/lib/utils/emitEvent.js");


const Bin = (function () {
  const defaults = {
    type: 'localstorage'
  } 
  
  const Constructor = function(key, options = {}) {
    const settings = Object.assign({}, defaults, options);
    Object.freeze(settings);
    
    Object.defineProperties(this, {
      _key: { value: key },
      _settings: { value: settings }
    });
  };

  Constructor.prototype.set = function (value) {
    window[this._settings.type].setItem(this._key, JSON.stringify(value));

    Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('bin:set', {
      key: this._key,
      value: value
    })
  }

  Constructor.prototype.get = function () {
    const saved = JSON.parse(window[this._settings.type].getItem(this._key));
    Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('bin:get', {
      key: this._key,
      value: saved
    });

    return saved;
  }

  Constructor.prototype.remove = function () {
    window[this._settings.type].removeItem(this._key);
    Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('bin:remove', {
      key: this._key
    });
  }

  return Constructor;
})();

const log = function (event) {
  console.log(event.type, event.detail);
}

document.addEventListener('bin:get', log);
document.addEventListener('bin:set', log);
document.addEventListener('bin:remove', log);


const wizard = new Bin('wizard', {
  type: 'sessionStorage'
});

wizard.set({
  name: 'merlin',
  spells: ['Vanish', 'Talk to Animals', 'Dancing Teacups']
})

const merin = wizard.get();

/***/ }),

/***/ "./src/js/lib/DomManipulation.js":
/*!***************************************!*\
  !*** ./src/js/lib/DomManipulation.js ***!
  \***************************************/
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

(function() {
	// Get the element
	const init =  function() {
		let elem = document.querySelector('#egg');
		let scaled = false;
  
		// Create button
		let btn = document.createElement('button');
		btn.innerHTML = '🥚';
		btn.setAttribute('aria-label', 'click me');
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
	};
  
	return { init };
})();

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
	};

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

		return btn;
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
			toggleBtn(instance);
		}
		btn.addEventListener('click', toggle);

		return toggle;
	}

	function Constructor (selector, options = {}) {
		const elem = document.querySelector(selector);

		const settings = Object.assign({}, defaults, options);
		Object.freeze(settings);

		const btn = createBtn(elem, settings);
    
		// Create the event listener
		const listener = createEventListener(btn, this);

		Object.defineProperties(this, {
			_elem: { value: elem },
			_settings: {value: settings},
			_btn: { value: btn},
			_listener: { value: listener },
			_scaled: { value: false, writable: true }
		});
	}

	Constructor.prototype.toggle = function () {  
		toggleBtn(this);
	};

	/**
   * Destroy this instance
   */

	Constructor.prototype.destroy = function () {
		// Remove the event listener immediately
		this._btn.removeEventListener('click', this._listener);

		// Remove the button
		this._btn.remove();
	};

	return Constructor;
})();

const egg1 = new Egg('#egg');
egg1.toggle();
const party = new Egg('#party', {
	btnText: '🎉',
	label: 'It\'s party time',
	scale: '3'
});

party.destroy();

/***/ }),

/***/ "./src/js/lib/Egg.js":
/*!***************************!*\
  !*** ./src/js/lib/Egg.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/emitEvent */ "./src/js/lib/utils/emitEvent.js");


const Egg = (function () {
  let defaults = {
    label: 'click me',
    btnText: '🥚',
    transition: 'transform 300ms ease-in',
    scale: '2'
  };

  /**
   * Inject the button into the DOM 
   * @param {Node} elem 
   * @param {Object} settings 
   * @returns  {Node}
   */

  function createBtn (elem, settings) {
    const btn = document.createElement('button');
    btn.innerHTML = settings.btnText;
    if (settings.label) {
      btn.setAttribute('aria-label', settings.label);
    }

    if (settings.transition) {
      btn.style.transition = settings.transition;
    }

    // inject into the DOM
    elem.append(btn);

    return btn;
  }

  function toggleBtn (instance) {
    instance._btn.style.transform = instance._scaled ? '' : `scale(${instance._settings.scale})`;
    instance._scaled = !instance._scaled;
  }

  /**
   * 
   * @param {Node} btn The button to attach the listener to
   * @param {Constructor} instance  The current instantiation
   */

  function createEventListener(btn, instance) {
    function toggle() {
      toggleBtn(instance);
    }

    btn.addEventListener('click', toggle);

    return toggle;
  }

  /**
   * 
   * @param {String} selector The selector for the element to render into
   * @param {Object} options  User options and settings
   */

  function Constructor (selector, options = {}) {
    const elem = document.querySelector(selector);

    // Create and freeze the settings object
    let settings = Object.assign({}, defaults, options);
    Object.freeze(settings);

    // Inject a button into the DOM
    const btn = createBtn(elem, settings);

    // Create the event listener
    const listener = createEventListener(btn, this);

    Object.defineProperties(this, {
      _elem: { value: elem },
      _settings: { value: settings },
      _scaled: { value: false, writable: true },
      _btn: { value: btn },
      _listener: { value: listener }
    });
  }

  Constructor.prototype.toggle = function () {
    toggleBtn(this);
  }

  Constructor.prototype.destory = function () {
    this._btn.removeEventListener('click', this._listener);
    this._btn.remove();
  }

  return Constructor;
})();

const egg = new Egg('#egg');

const party = new Egg('#party', {
  btnText: '🎉',
  label: `It's party time`,
  scale: '3'
});

const Greeting = (function() {
  const defaults = {
    greeting: 'you',
    hiBefore: 'Hello',
    hiAfter: '',
    byeBefore: 'Goodbye',
    byeAfter: 'See ya soon',

    // Callback

    onHi: function () {},
    onBye: function () {}
  };

  function Constructor(name, options = {}) {
    const settings = Object.assign({}, defaults, options);
    name = name ? name : settings.greeting;
    Object.freeze(settings);

    Object.defineProperties(this, {
      _name: { value: name },
      _settings: { value: settings }
    })
  }

  Constructor.prototype.sayHi = function () {
    // Emit custom event
    let canceled = !Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:before-hi', {
      name: this._name,
      before: this._settings.hiBefore,
      after: this._settings.hiAfter
    });

    if (canceled) return;

    console.log(`${this._settings.hiBefore}, ${this._name} ${this._settings.hiAfter}`);
    this._settings.onHi(this._name, this._settings.hiBefore, this._settings.hiAfter);

    // Emit custom event
    Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:hi', {
      name: this._name,
      before: this._settings.hiBefore,
      after: this._settings.hiAfter
    })

    return this;
  };

  Constructor.prototype.sayGoodbye = function () {
    // Emit custom event
    let canceled = !Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:before-bye', {
      name: this._name,
      before: this._settings.byeBefore,
      after: this._settings.byeAfter
    });

    // If the event was canceled, end
    if (canceled) return;

    console.log(`${this._settings.byeBefore} ${this._settings.byeAfter}`);
    this._settings.onBye(this._name, this._settings.byeBefore, this._settings.byeAfter);

     // Emit custom event
    Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:bye', {
      name: this._name,
      before: this._settings.byeBefore,
      after: this._settings.byeAfter
    });

    return this;
  }

  return Constructor;
})();

const merlin = new Greeting('merlin', {
  onHi: function (name) {
    console.log(name);
    let app = document.querySelector('#app');
    app.textContent = `Welcome my home, ${name}`;
  },
  onBye(name, byeBefore) {
    console.log(byeBefore, name);
    let app = document.querySelector('#app');
    app.append(`\rSee you later, ${name}`)
  }
});

const berlin = new Greeting('berlin');
document.addEventListener('greeting:hi', function (event) {
  console.log(event)
});


document.addEventListener('greeting:bye', function (event) {
  let app = document.querySelector('#app');
  app.textContent = `😀 ${event.detail.name}`;
});

/***/ }),

/***/ "./src/js/lib/Greeting.js":
/*!********************************!*\
  !*** ./src/js/lib/Greeting.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/emitEvent */ "./src/js/lib/utils/emitEvent.js");


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
		// Emit custom event
		const canceled = !Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:before-hi', {
			name: this._name,
			before: this._settings.hiBefore,
			after: this._settings.hiAfter
		})

		// If the event was canceled, end
		if (canceled) return

		console.log(
			'%c%s', 
			'color: pink;font-size: 25px', 
			`${this._settings.hiBefore} ${this._name} ${this._settings.hiAfter}`
		)
    
		// Run callback
		this._settings.onHi(this._name, this._settings.hiBefore, this._settings.hiAfter)

		// Emit custom event
		Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:hi', {
			name: this._name,
			before: this._settings.hiBefore,
			after: this._settings.hiAfter
		})

		return this
	}

	Constructor.prototype.sayBye = function () {
		// Emit custom event
		const canceled = !Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:before-bye', {
			name: this._name,
			before: this._settings.byeBefore,
			after: this._settings.byeAfter
		})

		// If the event was canceled, end
		if (canceled) return

		console.log(
			'%c%s', 
			'color: pink;font-size: 25px', 
			`${this._settings.byeBefore} ${this._name} ${this._settings.byeAfter}`
		)
    
		this._settings.onBye(this._name, this._settings.byeBefore, this._settings.byeAfter)
    
		// Emit custom event
		Object(_utils_emitEvent__WEBPACK_IMPORTED_MODULE_0__["default"])('greeting:bye', {
			name: this._name,
			before: this._settings.byeBefore,
			after: this._settings.byeAfter
		})
    
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
})

// Listen a custom event
document.addEventListener('greeting:bye', function (event) {
	const app = document.querySelector('.bye-text')
	app.textContent = `👋 ${event.detail.name}`
})

let form = document.querySelector('form')
form.addEventListener('submit', function (event) {
	event.preventDefault()
	form.reset()

	// Emit a custom event
	merlin.sayBye()
})


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

/***/ "./src/js/lib/HeadRoom.js":
/*!********************************!*\
  !*** ./src/js/lib/HeadRoom.js ***!
  \********************************/
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

/***/ "./src/js/lib/Inherit.js":
/*!*******************************!*\
  !*** ./src/js/lib/Inherit.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// function SuperType() {
//   this.colors = ['red', 'blue', 'green'];
// }

// function SubType() {}
// SubType.prototype = new SuperType();

// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);

// let instance2 = new SubType();
// console.log(instance2.colors);

// 盗用构造函数
// 对象伪装 经典继承

/**
 *  优点 
 *  可以在子类构造函数中向父类构造函数传参
 * 
 * 缺点（使用构造函数模式自定义类型的问题）
 * 必须在构造函数中定义方法，因此函数不能重用,
 * 子类也不能访问父类原型上定义的方法
 */
// function SuperType() {
//   this.colors = ['red', 'blue', 'green'];
// }

// function SubType() {
//   SuperType.call(this);
// }

// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);

// let instance2 = new SubType();
// console.log(instance2.colors);

// function SuperType(name) {
//   this.name = name;
// }

// function SubType() {
//   SuperType.call(this, 'Nicholas');
//   this.age = 29;
// }

// let instance = new SubType();
// console.log(instance.name);
// console.log(instance.age);

// 组合继承,伪经典继承 - 综合原型链和盗用构造函数
// 使用原型链继承原型上的属性和方法，而通过盗用
// 构造函数继承实例属性
// 这样既可以把方法定义在原型上以实现重用，又可以
// 让每个实例都有自己的属性

// 组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中
// 使用最多的继承模式。
// 组合继承也保留了 instanceof 操作符和 isPrototypeOf()
// 方法识别合成对象的能力

// 缺点：
// 效率问题。父类构造函数会被调用两次，一次是在创建子类原型时调用
// 一次是在子类构造函数中调用。
// function SuperType(name) {
//   this.name = name;
//   this.colors = ['red', 'blue', 'green'];
// }

// SuperType.prototype.sayName = function () {
//   console.log(this.name);
// }

// function SubType(name, age) {
//   SuperType.call(this, name);

//   this.age = age;
// }

// SubType.prototype = new SuperType();
// SubType.prototype.sayAge = function () {
//   console.log(this.age);
// }

// let instance1 = new SubType('Nicholas', 29);
// instance1.colors.push('black');
// console.log(instance1.colors);
// instance1.sayName();
// instance1.sayAge();

// let instance2 = new SubType('Greg', 27);
// console.log(instance2.colors);
// instance2.sayName();
// instance2.sayAge();

// 原型式继承
// 不涉及严格意义上构造函数的继承方式
// 即使不定义类型也可以通过原型实现对象之间的信息共享

// 适用情况：
// 你有一个对象，想在它的基础上在创建一个新对象。
// 你需要把这个对象先传给 object()，然后再对返回的对象进行适当的修改。
// 这种方法实际上是克隆对象，本质上是对传入对象执行一次浅复制。

// ES5 新增方法 Object.create() 方法将原型式继承的概念规范化。
// 接受两个参数：作为新对象原型的对象，以及新对象定义额外属性的对象

// 原型式继承费非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。
// 但属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。
// function object (o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }

// let person = {
//   name: 'Nicholas',
//   friends: ['shelby', 'court', 'van']
// }

// let anotherPerson = object(person);
// console.log(anotherPerson.name);
// anotherPerson.name = 'Griea'
// anotherPerson.friends.push('rob');

// let yetAnotherPerson = object(person);
// yetAnotherPerson.name = "Linda";
// yetAnotherPerson.friends.push("Barbie");

// console.log(person.friends);
// console.log(anotherPerson)

// 寄生式继承 寄生构造函数和工厂模式
// 创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。
// 适合主要关注对象，而不关注类型和构造函数的创景
// Object() 函数不是必须的，任何返回新对象的函数都可以在这里使用
// 通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式蕾西
// function createAnother(original) {
//   let clone = Object(original); // 调用函数创建一个新对象
//   clone.sayHi = function () {   // 以某种方式增强这个对象
//     console.log('hi');
//   }

//   return clone;
// }

// let person = {
//   name: 'Nicholas',
//   friends: ['shelby', 'court', 'van']
// }

// let anotherPerson = createAnother(person);
// anotherPerson.sayHi();

// 寄生式组合继承
function inheritPrototype(subType, superType) {
  let prototype = Object(superType.prototype);
  prototype.constructor = SubType;
  subType.prototype = prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType (name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
}

/***/ }),

/***/ "./src/js/lib/Prototype.js":
/*!*********************************!*\
  !*** ./src/js/lib/Prototype.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const App = function(name) {
  this.name = name
}

App.prototype.sayHi = function (){
  console.log(this.name)
}

const app = new App('byodian')
app.sayHi()

App.prototype.sayBye = function () {
  console.log('good bye', this.name)
}

app.sayBye()

/***/ }),

/***/ "./src/js/lib/utils/emitEvent.js":
/*!***************************************!*\
  !*** ./src/js/lib/utils/emitEvent.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return emitEvent; });
/**
 * Emit a custom event
 * @param {String} type The event type
 * @param {Object} detail Any details to pass along with the event
 * @param {Node} elem The element to attach the event to
 */

 function emitEvent(type, detail = {}, elem = document) {
  // Make sure there's an event type
  if (!type) return;

  // Create a new event
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail
  });

  // Dispatch the event
  return elem.dispatchEvent(event);
}

/***/ }),

/***/ "./src/js/vue-plugin/use.js":
/*!**********************************!*\
  !*** ./src/js/vue-plugin/use.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const toArray = function (list, start) {
  start = start || 0;
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
};

function initUse (Vue) {
  // * Vue 构造器静态方法
  Vue.use = function (plugin) {
    // this._installedPlugins = this._installedPlugins || []
    // const installPlugin = this._installedPlugins
    const installPlugins = this._installedPlugins || (this._installedPlugins = []);

    // * 确保插件只会被安装一次
    if (installPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // * Vue.use(plugin, options)
    // arguments <Arguments> => [plugin, options]
    // args <Array> => [options]
    const args = toArray(arguments, 1);
    console.log(arguments);
    console.log(args);

    // * args <Array> => [Vue, options]
    args.unshift(this);
    console.log(args);

    // * 1. plugin 作为对象且有 install 方法，调用 install 方法
    // * 2. plugin 作为函数，直接调用该函数
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }

    // * 缓存已经安装的插件
    installPlugins.push(plugin);
    return this;
  };
}

module.exports = {
  initUse
}

/***/ }),

/***/ 0:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/js/cjs/helper.js ./src/js/cjs/index.js ./src/js/es/helpers.js ./src/js/es/main.js ./src/js/es/my-module.js ./src/js/lib/Bin.js ./src/js/lib/DomManipulation.js ./src/js/lib/Egg.js ./src/js/lib/Greeting.js ./src/js/lib/HeadRoom.js ./src/js/lib/Inherit.js ./src/js/lib/Prototype.js ./src/js/vue-plugin/use.js ./src/js/lib/utils/emitEvent.js ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/cjs/helper.js */"./src/js/cjs/helper.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/cjs/index.js */"./src/js/cjs/index.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/es/helpers.js */"./src/js/es/helpers.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/es/main.js */"./src/js/es/main.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/es/my-module.js */"./src/js/es/my-module.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/Bin.js */"./src/js/lib/Bin.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/DomManipulation.js */"./src/js/lib/DomManipulation.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/Egg.js */"./src/js/lib/Egg.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/Greeting.js */"./src/js/lib/Greeting.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/HeadRoom.js */"./src/js/lib/HeadRoom.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/Inherit.js */"./src/js/lib/Inherit.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/Prototype.js */"./src/js/lib/Prototype.js");
__webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/vue-plugin/use.js */"./src/js/vue-plugin/use.js");
module.exports = __webpack_require__(/*! /Users/byodian/Documents/front-end/js-projects/javascript-library/src/js/lib/utils/emitEvent.js */"./src/js/lib/utils/emitEvent.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hlYWRyb29tLmpzL2Rpc3QvaGVhZHJvb20uanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2pzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9lcy9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9lcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9lcy9teS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9CaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9Eb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9FZ2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9HcmVldGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL0hlYWRSb29tLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvSW5oZXJpdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL1Byb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL3V0aWxzL2VtaXRFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdnVlLXBsdWdpbi91c2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtR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RUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNwYkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQkE7QUFD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ZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qIVxuICogaGVhZHJvb20uanMgdjAuMTIuMCAtIEdpdmUgeW91ciBwYWdlIHNvbWUgaGVhZHJvb20uIEhpZGUgeW91ciBoZWFkZXIgdW50aWwgeW91IG5lZWQgaXRcbiAqIENvcHlyaWdodCAoYykgMjAyMCBOaWNrIFdpbGxpYW1zIC0gaHR0cDovL3dpY2t5Lm5pbGxpYS5tcy9oZWFkcm9vbS5qc1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5IZWFkcm9vbSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGlzQnJvd3NlcigpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBicm93c2VyIHN1cHBvcnQgZm9yIGFkZGluZyBhbiBldmVudCBsaXN0ZW5lciB3aXRoIG9wdGlvbnNcbiAgICogQ3JlZGl0OiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQvYWRkRXZlbnRMaXN0ZW5lclxuICAgKi9cbiAgZnVuY3Rpb24gcGFzc2l2ZUV2ZW50c1N1cHBvcnRlZCgpIHtcbiAgICB2YXIgc3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnZXR0ZXItcmV0dXJuXG4gICAgICAgIGdldCBwYXNzaXZlKCkge1xuICAgICAgICAgIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwcG9ydGVkO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgaXNCcm93c2VyKCkgJiZcbiAgICAgIGZ1bmN0aW9uKCkge30uYmluZCAmJlxuICAgICAgXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgICAgIE9iamVjdC5hc3NpZ24gJiZcbiAgICAgIE9iamVjdC5rZXlzICYmXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEb2N1bWVudChvYmopIHtcbiAgICByZXR1cm4gb2JqLm5vZGVUeXBlID09PSA5OyAvLyBOb2RlLkRPQ1VNRU5UX05PREUgPT09IDlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV2luZG93KG9iaikge1xuICAgIC8vIGBvYmogPT09IHdpbmRvd2Agb3IgYG9iaiBpbnN0YW5jZW9mIFdpbmRvd2AgaXMgbm90IHN1ZmZpY2llbnQsXG4gICAgLy8gYXMgdGhlIG9iaiBtYXkgYmUgdGhlIHdpbmRvdyBvZiBhbiBpZnJhbWUuXG4gICAgcmV0dXJuIG9iaiAmJiBvYmouZG9jdW1lbnQgJiYgaXNEb2N1bWVudChvYmouZG9jdW1lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2luZG93U2Nyb2xsZXIod2luKSB7XG4gICAgdmFyIGRvYyA9IHdpbi5kb2N1bWVudDtcbiAgICB2YXIgYm9keSA9IGRvYy5ib2R5O1xuICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuICAgIHJldHVybiB7XG4gICAgICAvKipcbiAgICAgICAqIEBzZWUgaHR0cDovL2phbWVzLnBhZG9sc2V5LmNvbS9qYXZhc2NyaXB0L2dldC1kb2N1bWVudC1oZWlnaHQtY3Jvc3MtYnJvd3Nlci9cbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIHNjcm9sbCBoZWlnaHQgb2YgdGhlIGRvY3VtZW50IGluIHBpeGVsc1xuICAgICAgICovXG4gICAgICBzY3JvbGxIZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgICAgYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgaHRtbC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgaHRtbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgYm9keS5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgaHRtbC5jbGllbnRIZWlnaHRcbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQHNlZSBodHRwOi8vYW5keWxhbmd0b24uY28udWsvYmxvZy9kZXZlbG9wbWVudC9nZXQtdmlld3BvcnQtc2l6ZS13aWR0aC1hbmQtaGVpZ2h0LWphdmFzY3JpcHRcbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIGhlaWdodCBvZiB0aGUgdmlld3BvcnQgaW4gcGl4ZWxzXG4gICAgICAgKi9cbiAgICAgIGhlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB3aW4uaW5uZXJIZWlnaHQgfHwgaHRtbC5jbGllbnRIZWlnaHQgfHwgYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEdldHMgdGhlIFkgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHBpeGVscyB0aGUgcGFnZSBoYXMgc2Nyb2xsZWQgYWxvbmcgdGhlIFktYXhpc1xuICAgICAgICovXG4gICAgICBzY3JvbGxZOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbi5wYWdlWU9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbi5wYWdlWU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoaHRtbCB8fCBib2R5LnBhcmVudE5vZGUgfHwgYm9keSkuc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBlbGVtZW50U2Nyb2xsZXIoZWxlbWVudCkge1xuICAgIHJldHVybiB7XG4gICAgICAvKipcbiAgICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIHNjcm9sbCBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgaW4gcGl4ZWxzXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbEhlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgICBlbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgICAgICAgICBlbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICBlbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgaW4gcGl4ZWxzXG4gICAgICAgKi9cbiAgICAgIGhlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChlbGVtZW50Lm9mZnNldEhlaWdodCwgZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXRzIHRoZSBZIHNjcm9sbCBwb3NpdGlvblxuICAgICAgICogQHJldHVybiB7TnVtYmVyfSBwaXhlbHMgdGhlIGVsZW1lbnQgaGFzIHNjcm9sbGVkIGFsb25nIHRoZSBZLWF4aXNcbiAgICAgICAqL1xuICAgICAgc2Nyb2xsWTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2Nyb2xsZXIoZWxlbWVudCkge1xuICAgIHJldHVybiBpc1dpbmRvdyhlbGVtZW50KSA/IHdpbmRvd1Njcm9sbGVyKGVsZW1lbnQpIDogZWxlbWVudFNjcm9sbGVyKGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBlbGVtZW50IEV2ZW50VGFyZ2V0XG4gICAqL1xuICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBpc1Bhc3NpdmVTdXBwb3J0ZWQgPSBwYXNzaXZlRXZlbnRzU3VwcG9ydGVkKCk7XG4gICAgdmFyIHJhZklkO1xuICAgIHZhciBzY3JvbGxlZCA9IGZhbHNlO1xuICAgIHZhciBzY3JvbGxlciA9IGNyZWF0ZVNjcm9sbGVyKGVsZW1lbnQpO1xuICAgIHZhciBsYXN0U2Nyb2xsWSA9IHNjcm9sbGVyLnNjcm9sbFkoKTtcbiAgICB2YXIgZGV0YWlscyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdmFyIHNjcm9sbFkgPSBNYXRoLnJvdW5kKHNjcm9sbGVyLnNjcm9sbFkoKSk7XG4gICAgICB2YXIgaGVpZ2h0ID0gc2Nyb2xsZXIuaGVpZ2h0KCk7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgIC8vIHJldXNlIG9iamVjdCBmb3IgbGVzcyBtZW1vcnkgY2h1cm5cbiAgICAgIGRldGFpbHMuc2Nyb2xsWSA9IHNjcm9sbFk7XG4gICAgICBkZXRhaWxzLmxhc3RTY3JvbGxZID0gbGFzdFNjcm9sbFk7XG4gICAgICBkZXRhaWxzLmRpcmVjdGlvbiA9IHNjcm9sbFkgPiBsYXN0U2Nyb2xsWSA/IFwiZG93blwiIDogXCJ1cFwiO1xuICAgICAgZGV0YWlscy5kaXN0YW5jZSA9IE1hdGguYWJzKHNjcm9sbFkgLSBsYXN0U2Nyb2xsWSk7XG4gICAgICBkZXRhaWxzLmlzT3V0T2ZCb3VuZHMgPSBzY3JvbGxZIDwgMCB8fCBzY3JvbGxZICsgaGVpZ2h0ID4gc2Nyb2xsSGVpZ2h0O1xuICAgICAgZGV0YWlscy50b3AgPSBzY3JvbGxZIDw9IG9wdGlvbnMub2Zmc2V0W2RldGFpbHMuZGlyZWN0aW9uXTtcbiAgICAgIGRldGFpbHMuYm90dG9tID0gc2Nyb2xsWSArIGhlaWdodCA+PSBzY3JvbGxIZWlnaHQ7XG4gICAgICBkZXRhaWxzLnRvbGVyYW5jZUV4Y2VlZGVkID1cbiAgICAgICAgZGV0YWlscy5kaXN0YW5jZSA+IG9wdGlvbnMudG9sZXJhbmNlW2RldGFpbHMuZGlyZWN0aW9uXTtcblxuICAgICAgY2FsbGJhY2soZGV0YWlscyk7XG5cbiAgICAgIGxhc3RTY3JvbGxZID0gc2Nyb2xsWTtcbiAgICAgIHNjcm9sbGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsKCkge1xuICAgICAgaWYgKCFzY3JvbGxlZCkge1xuICAgICAgICBzY3JvbGxlZCA9IHRydWU7XG4gICAgICAgIHJhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50T3B0aW9ucyA9IGlzUGFzc2l2ZVN1cHBvcnRlZFxuICAgICAgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH1cbiAgICAgIDogZmFsc2U7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlU2Nyb2xsLCBldmVudE9wdGlvbnMpO1xuICAgIHVwZGF0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWZJZCk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVTY3JvbGwsIGV2ZW50T3B0aW9ucyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVVwRG93bih0KSB7XG4gICAgcmV0dXJuIHQgPT09IE9iamVjdCh0KSA/IHQgOiB7IGRvd246IHQsIHVwOiB0IH07XG4gIH1cblxuICAvKipcbiAgICogVUkgZW5oYW5jZW1lbnQgZm9yIGZpeGVkIGhlYWRlcnMuXG4gICAqIEhpZGVzIGhlYWRlciB3aGVuIHNjcm9sbGluZyBkb3duXG4gICAqIFNob3dzIGhlYWRlciB3aGVuIHNjcm9sbGluZyB1cFxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtIHRoZSBoZWFkZXIgZWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgd2lkZ2V0XG4gICAqL1xuICBmdW5jdGlvbiBIZWFkcm9vbShlbGVtLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBIZWFkcm9vbS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzZXMgPSBPYmplY3QuYXNzaWduKHt9LCBIZWFkcm9vbS5vcHRpb25zLmNsYXNzZXMsIG9wdGlvbnMuY2xhc3Nlcyk7XG5cbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICAgIHRoaXMudG9sZXJhbmNlID0gbm9ybWFsaXplVXBEb3duKHRoaXMudG9sZXJhbmNlKTtcbiAgICB0aGlzLm9mZnNldCA9IG5vcm1hbGl6ZVVwRG93bih0aGlzLm9mZnNldCk7XG4gICAgdGhpcy5pbml0aWFsaXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuZnJvemVuID0gZmFsc2U7XG4gIH1cbiAgSGVhZHJvb20ucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBIZWFkcm9vbSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGxpc3RlbmluZyB0byBzY3JvbGxpbmdcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoSGVhZHJvb20uY3V0c1RoZU11c3RhcmQgJiYgIXRoaXMuaW5pdGlhbGlzZWQpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcImluaXRpYWxcIik7XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIGRlZmVyIGV2ZW50IHJlZ2lzdHJhdGlvbiB0byBoYW5kbGUgYnJvd3NlclxuICAgICAgICAvLyBwb3RlbnRpYWxseSByZXN0b3JpbmcgcHJldmlvdXMgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgZnVuY3Rpb24oc2VsZikge1xuICAgICAgICAgICAgc2VsZi5zY3JvbGxUcmFja2VyID0gdHJhY2tTY3JvbGwoXG4gICAgICAgICAgICAgIHNlbGYuc2Nyb2xsZXIsXG4gICAgICAgICAgICAgIHsgb2Zmc2V0OiBzZWxmLm9mZnNldCwgdG9sZXJhbmNlOiBzZWxmLnRvbGVyYW5jZSB9LFxuICAgICAgICAgICAgICBzZWxmLnVwZGF0ZS5iaW5kKHNlbGYpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgMTAwLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIHdpZGdldCwgY2xlYXJpbmcgdXAgYWZ0ZXIgaXRzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0aWFsaXNlZCA9IGZhbHNlO1xuICAgICAgT2JqZWN0LmtleXModGhpcy5jbGFzc2VzKS5mb3JFYWNoKHRoaXMucmVtb3ZlQ2xhc3MsIHRoaXMpO1xuICAgICAgdGhpcy5zY3JvbGxUcmFja2VyLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5waW4gdGhlIGVsZW1lbnRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5waW46IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoXCJwaW5uZWRcIikgfHwgIXRoaXMuaGFzQ2xhc3MoXCJ1bnBpbm5lZFwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwidW5waW5uZWRcIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJwaW5uZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25VbnBpbikge1xuICAgICAgICAgIHRoaXMub25VbnBpbi5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBpbiB0aGUgZWxlbWVudFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwaW46IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoXCJ1bnBpbm5lZFwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwicGlubmVkXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwidW5waW5uZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25QaW4pIHtcbiAgICAgICAgICB0aGlzLm9uUGluLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRnJlZXplcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgd2lkZ2V0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGZyZWV6ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZyb3plbiA9IHRydWU7XG4gICAgICB0aGlzLmFkZENsYXNzKFwiZnJvemVuXCIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZS1lbmFibGVzIHRoZSBkZWZhdWx0IGJlaGF2aW91ciBvZiB0aGUgd2lkZ2V0XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVuZnJlZXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZnJvemVuID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKFwiZnJvemVuXCIpO1xuICAgIH0sXG5cbiAgICB0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKFwidG9wXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJ0b3BcIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJub3RUb3BcIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25Ub3ApIHtcbiAgICAgICAgICB0aGlzLm9uVG9wLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbm90VG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDbGFzcyhcIm5vdFRvcFwiKSkge1xuICAgICAgICB0aGlzLmFkZENsYXNzKFwibm90VG9wXCIpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKFwidG9wXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uTm90VG9wKSB7XG4gICAgICAgICAgdGhpcy5vbk5vdFRvcC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGJvdHRvbTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoXCJib3R0b21cIikpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcImJvdHRvbVwiKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhcIm5vdEJvdHRvbVwiKTtcblxuICAgICAgICBpZiAodGhpcy5vbkJvdHRvbSkge1xuICAgICAgICAgIHRoaXMub25Cb3R0b20uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBub3RCb3R0b206IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NsYXNzKFwibm90Qm90dG9tXCIpKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJub3RCb3R0b21cIik7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJib3R0b21cIik7XG5cbiAgICAgICAgaWYgKHRoaXMub25Ob3RCb3R0b20pIHtcbiAgICAgICAgICB0aGlzLm9uTm90Qm90dG9tLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdWxkVW5waW46IGZ1bmN0aW9uKGRldGFpbHMpIHtcbiAgICAgIHZhciBzY3JvbGxpbmdEb3duID0gZGV0YWlscy5kaXJlY3Rpb24gPT09IFwiZG93blwiO1xuXG4gICAgICByZXR1cm4gc2Nyb2xsaW5nRG93biAmJiAhZGV0YWlscy50b3AgJiYgZGV0YWlscy50b2xlcmFuY2VFeGNlZWRlZDtcbiAgICB9LFxuXG4gICAgc2hvdWxkUGluOiBmdW5jdGlvbihkZXRhaWxzKSB7XG4gICAgICB2YXIgc2Nyb2xsaW5nVXAgPSBkZXRhaWxzLmRpcmVjdGlvbiA9PT0gXCJ1cFwiO1xuXG4gICAgICByZXR1cm4gKHNjcm9sbGluZ1VwICYmIGRldGFpbHMudG9sZXJhbmNlRXhjZWVkZWQpIHx8IGRldGFpbHMudG9wO1xuICAgIH0sXG5cbiAgICBhZGRDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZC5hcHBseShcbiAgICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdCxcbiAgICAgICAgdGhpcy5jbGFzc2VzW2NsYXNzTmFtZV0uc3BsaXQoXCIgXCIpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZS5hcHBseShcbiAgICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdCxcbiAgICAgICAgdGhpcy5jbGFzc2VzW2NsYXNzTmFtZV0uc3BsaXQoXCIgXCIpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5jbGFzc2VzW2NsYXNzTmFtZV0uc3BsaXQoXCIgXCIpLmV2ZXJ5KGZ1bmN0aW9uKGNscykge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTtcbiAgICAgIH0sIHRoaXMuZWxlbSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24oZGV0YWlscykge1xuICAgICAgaWYgKGRldGFpbHMuaXNPdXRPZkJvdW5kcykge1xuICAgICAgICAvLyBJZ25vcmUgYm91bmN5IHNjcm9sbGluZyBpbiBPU1hcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mcm96ZW4gPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGV0YWlscy50b3ApIHtcbiAgICAgICAgdGhpcy50b3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90VG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZXRhaWxzLmJvdHRvbSkge1xuICAgICAgICB0aGlzLmJvdHRvbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub3RCb3R0b20oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2hvdWxkVW5waW4oZGV0YWlscykpIHtcbiAgICAgICAgdGhpcy51bnBpbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNob3VsZFBpbihkZXRhaWxzKSkge1xuICAgICAgICB0aGlzLnBpbigpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGVmYXVsdCBvcHRpb25zXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBIZWFkcm9vbS5vcHRpb25zID0ge1xuICAgIHRvbGVyYW5jZToge1xuICAgICAgdXA6IDAsXG4gICAgICBkb3duOiAwXG4gICAgfSxcbiAgICBvZmZzZXQ6IDAsXG4gICAgc2Nyb2xsZXI6IGlzQnJvd3NlcigpID8gd2luZG93IDogbnVsbCxcbiAgICBjbGFzc2VzOiB7XG4gICAgICBmcm96ZW46IFwiaGVhZHJvb20tLWZyb3plblwiLFxuICAgICAgcGlubmVkOiBcImhlYWRyb29tLS1waW5uZWRcIixcbiAgICAgIHVucGlubmVkOiBcImhlYWRyb29tLS11bnBpbm5lZFwiLFxuICAgICAgdG9wOiBcImhlYWRyb29tLS10b3BcIixcbiAgICAgIG5vdFRvcDogXCJoZWFkcm9vbS0tbm90LXRvcFwiLFxuICAgICAgYm90dG9tOiBcImhlYWRyb29tLS1ib3R0b21cIixcbiAgICAgIG5vdEJvdHRvbTogXCJoZWFkcm9vbS0tbm90LWJvdHRvbVwiLFxuICAgICAgaW5pdGlhbDogXCJoZWFkcm9vbVwiXG4gICAgfVxuICB9O1xuXG4gIEhlYWRyb29tLmN1dHNUaGVNdXN0YXJkID0gaXNTdXBwb3J0ZWQoKTtcblxuICByZXR1cm4gSGVhZHJvb207XG5cbn0pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImNvbnN0IHBlb3BsZSA9IHtcbiAgbmFtZTogJ3Blb3BsZScsXG4gIGFnZTogMTIsXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwZW9wbGVcbn0iLCJjb25zdCBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXInKVxuY29uc29sZS5sb2coaGVscGVycylcbmNvbnNvbGUubG9nKG1vZHVsZSkiLCJleHBvcnQgeyBkZWZhdWx0IGFzIGN1YmUsIGZvbywgZ3JhcGggfSBmcm9tICcuL215LW1vZHVsZSc7XG5cbmNvbnN0IGFuc3dlcnMgPSA0MjtcblxuY29uc3QgZ2V0VGhlQW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYW5zd2Vyc1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUaGVBbnN3ZXI7IiwiaW1wb3J0IGdldFRoZUFuc3dlciBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgY3ViZSwgeyBmb28sIGdyYXBoIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG5jb25zdCBhbnN3ZXIgPSBnZXRUaGVBbnN3ZXIoKTtcbmNvbnN0IHdpemFyZCA9ICdSYWRhZ2FzdCc7XG5cbmNvbnNvbGUubG9nKGBUaGUgYW5zd2VyIGlzICR7YW5zd2VyfSwgJHt3aXphcmR9YCk7XG5jb25zb2xlLmxvZyhjdWJlKDIpKVxuY29uc29sZS5sb2coZm9vLCBncmFwaCkiLCJmdW5jdGlvbiBjdWJlKHgpIHtcbiAgcmV0dXJuIHggKiB4ICogeDtcbn1cblxuY29uc3QgZm9vID0gTWF0aC5QSSArIE1hdGguU1FSVDI7XG5cbmNvbnN0IGdyYXBoID0ge1xuICBvcHRpb25zOiB7XG5cbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICB0aGlja25lc3M6ICcycHgnXG4gIH0sXG4gIGRyYXcoKSB7XG4gICAgY29uc29sZS5sb2coJ0Zyb20gZ3JhcGggZHJhdyBmdW5jdGlvbicpXG4gIH1cbn1cblxuXG5leHBvcnQgeyBjdWJlIGFzIGRlZmF1bHQsIGZvbywgZ3JhcGggfSIsImltcG9ydCBlbWl0RXZlbnQgZnJvbSAnLi91dGlscy9lbWl0RXZlbnQnXG5cbmV4cG9ydCBjb25zdCBCaW4gPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0eXBlOiAnbG9jYWxzdG9yYWdlJ1xuICB9IFxuICBcbiAgY29uc3QgQ29uc3RydWN0b3IgPSBmdW5jdGlvbihrZXksIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIE9iamVjdC5mcmVlemUoc2V0dGluZ3MpO1xuICAgIFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIF9rZXk6IHsgdmFsdWU6IGtleSB9LFxuICAgICAgX3NldHRpbmdzOiB7IHZhbHVlOiBzZXR0aW5ncyB9XG4gICAgfSk7XG4gIH07XG5cbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHdpbmRvd1t0aGlzLl9zZXR0aW5ncy50eXBlXS5zZXRJdGVtKHRoaXMuX2tleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcblxuICAgIGVtaXRFdmVudCgnYmluOnNldCcsIHtcbiAgICAgIGtleTogdGhpcy5fa2V5LFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSlcbiAgfVxuXG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc2F2ZWQgPSBKU09OLnBhcnNlKHdpbmRvd1t0aGlzLl9zZXR0aW5ncy50eXBlXS5nZXRJdGVtKHRoaXMuX2tleSkpO1xuICAgIGVtaXRFdmVudCgnYmluOmdldCcsIHtcbiAgICAgIGtleTogdGhpcy5fa2V5LFxuICAgICAgdmFsdWU6IHNhdmVkXG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2F2ZWQ7XG4gIH1cblxuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvd1t0aGlzLl9zZXR0aW5ncy50eXBlXS5yZW1vdmVJdGVtKHRoaXMuX2tleSk7XG4gICAgZW1pdEV2ZW50KCdiaW46cmVtb3ZlJywge1xuICAgICAga2V5OiB0aGlzLl9rZXlcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0pKCk7XG5cbmNvbnN0IGxvZyA9IGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zb2xlLmxvZyhldmVudC50eXBlLCBldmVudC5kZXRhaWwpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdiaW46Z2V0JywgbG9nKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JpbjpzZXQnLCBsb2cpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmluOnJlbW92ZScsIGxvZyk7XG5cblxuY29uc3Qgd2l6YXJkID0gbmV3IEJpbignd2l6YXJkJywge1xuICB0eXBlOiAnc2Vzc2lvblN0b3JhZ2UnXG59KTtcblxud2l6YXJkLnNldCh7XG4gIG5hbWU6ICdtZXJsaW4nLFxuICBzcGVsbHM6IFsnVmFuaXNoJywgJ1RhbGsgdG8gQW5pbWFscycsICdEYW5jaW5nIFRlYWN1cHMnXVxufSlcblxuY29uc3QgbWVyaW4gPSB3aXphcmQuZ2V0KCk7IiwiLyoqXG4qICogRE9NIE1hbmlwdWxhdGlvbiBMSWJyYXJpZXNcbiogMS4gaHR0cHM6Ly9zY3JvbGxyZXZlYWxqcy5vcmcvXG4qIDIuIGh0dHBzOi8vcGhvdG9zd2lwZS5jb20vXG4qICogRE9NIG1hbmlwdWxhdGlvbiBsaWJyYXJpZXMgaGF2ZSBzb21lIHVuaXF1ZSBjb25zaWRlcmF0aW9ucyBjb21wYXJlZCB0byB1dGlsaXR5IGxpYnJhcmllcy5cbiogKiBIb3cgY2FuIHdlIGNvbnZlcnQgdGhpcyBpbnRvIGEgbGlicmFyeVxuKiAxLiBJbmplY3RpbmcgY29udGVudCBpbnRvIHRoZSBET01cbiogMi4gTGlzdGVuaW5nIGZvciBldmVudHNcbiogMy4gQWRkaW5nIG9wdGlvbnMgYW5kIHNldHRpbmdzXG4qIDQuIEV4cG9zaW5nIHB1YmxpYyBtZXRob2RzXG4qIDUuIERlc3Ryb3lpbmcgdGhlIGluc3RhbnRpYXRpb25cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG5cdC8vIEdldCB0aGUgZWxlbWVudFxuXHRjb25zdCBpbml0ID0gIGZ1bmN0aW9uKCkge1xuXHRcdGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VnZycpO1xuXHRcdGxldCBzY2FsZWQgPSBmYWxzZTtcbiAgXG5cdFx0Ly8gQ3JlYXRlIGJ1dHRvblxuXHRcdGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRidG4uaW5uZXJIVE1MID0gJ/CfpZonO1xuXHRcdGJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnY2xpY2sgbWUnKTtcblx0XHRidG4uc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMzAwbXMgZWFzZS1pbic7XG4gIFxuXHRcdC8vIEluamVjdCBpbnRvIHRoZSBET01cblx0XHRlbGVtLmFwcGVuZChidG4pO1xuICBcblx0XHQvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgZXZlbnRzXG4gICAgICovXG5cdFx0ZnVuY3Rpb24gdG9nZ2xlICgpIHtcblx0XHRcdC8vIElmIHRoZSBidXR0b24gaXMgc2NhbGVkLCBzaHJpbmsgaXRcblx0XHRcdC8vIE90aGVyd2lzZSwgZ3JvdyBpdFxuXHRcdFx0YnRuLnN0eWxlLnRyYW5zZm9ybSA9IHNjYWxlZCA/ICcnIDogJ3NjYWxlKDIpJztcbiAgXG5cdFx0XHQvLyBGbGlwIHRoZSBzY2FsZWQgc3RhdGVcblx0XHRcdHNjYWxlZCA9ICFzY2FsZWQ7XG5cdFx0fVxuICBcblx0XHQvLyBMaXN0ZW4gZm9yIGNsaWNrcyBvbiB0aGUgYnV0dG9uXG5cdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlKTtcblx0fTtcbiAgXG5cdHJldHVybiB7IGluaXQgfTtcbn0pKCk7XG5cbi8vIGVnZy5pbml0KClcblxuLy8gKiBET00gbWFuaXB1bGF0aW9uIGxpYnJhcmllcyB0aGF0IGFkZCBjb250ZW50IHRvIHRoZSBVSVxuLy8gdXN1YWxseSB0YWtlIG9uZSBvZiB0d28gYXBwcm9hY2hlczpcbi8vIDEuIEluamVjdCBpdCBvbiBpbnN0YW50aWF0aW9uXG4vLyAyLiBIYXZlIGFuIGV4cGxpY2l0IGluaXQoKSBtZXRob2RcblxuLy8gKiBPbmUgb2YgdGhlIHVuaXF1ZSBjaGFsbGVuZ2VzIHdpdGggdGhlIGNvbnN0cnVjdG9yIHBhdHRlcm4gYW5kIERPTVxuLy8gKiBtYW5pcHVsYXRpb24gbGlicmFyaWVzIGlzIHRoYXQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGluIHRoZSBcbi8vICogZXZlbnQgbGlzdGVuZXIgbmVlZHMgdG8ga25vdyBzb21lIHVuaXF1ZSBwcm9wZXJ0aWVzIGZyb20gZWFjaCBcbi8vICogc3BlY2lmaWMgaW5zdGFuY2VcblxuLy8gKiBBZGQgYSBwdWJsaWMgdG9nZ2xlKCkgbWV0aG9kXG5cbi8vICogRGVzdHJveWluZyBhbiBpbnN0YW50aWF0aW9uXG4vLyAxLiBUaGlzIHR5cGljYWxseSBpbnZvbHZlcyByZW1vdmluZyBhbnkgYWRkZWQgRE9NXG4vLyAgICBlbGVtZW50cyBhbmQgc3RvcHBpbmcgYW55IGV2ZW50IGxpc3RlbmVycy4gXG4vLyAyLiBBIGNvbW1vbiBjb252ZW50aW9uIGlzIHRvIGV4cG9zZSBhIGRlc3Ryb3koKSBtZXRob2QgdG8gZG8gdGhhdC5cbi8vIDMuIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciBjYWxsYmFjayBpbW1lZGlhdGVseVxuXG5sZXQgRWdnID0gKGZ1bmN0aW9uICgpIHtcblxuXHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRsYWJlbDogJ2NsaWNrIG1lJyxcblx0XHRidG5UZXh0OiAn8J+lmicsXG5cdFx0dHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAzMDBtcyBlYXNlLWluJyxcblx0XHRzY2FsZTogJzInXG5cdH07XG5cblx0ZnVuY3Rpb24gY3JlYXRlQnRuIChlbGVtLCBzZXR0aW5ncykge1xuXHRcdGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRidG4uaW5uZXJIVE1MID0gc2V0dGluZ3MuYnRuVGV4dDtcblxuXHRcdGlmIChzZXR0aW5ncy5sYWJlbCkge1xuXHRcdFx0YnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHNldHRpbmdzLmxhYmVsKTtcblx0XHR9XG5cdFx0aWYgKHNldHRpbmdzLnRyYW5zaXRpb24pIHtcblx0XHRcdGJ0bi5zdHlsZS50cmFuc2l0aW9uID0gc2V0dGluZ3MudHJhbnNpdGlvbjtcblx0XHR9XG5cblx0XHRlbGVtLmFwcGVuZChidG4pO1xuXG5cdFx0cmV0dXJuIGJ0bjtcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZUJ0biAoaW5zdGFuY2UpIHtcblx0XHQvLyBJZiB0aGUgYnV0dG9uIGlzIHNjYWxlZCwgc2hyaW5rIGl0XG5cdFx0Ly8gT3RoZXJ3aXNlLCBncm93IGl0XG5cdFx0aW5zdGFuY2UuX2J0bi5zdHlsZS50cmFuc2Zvcm0gPSBpbnN0YW5jZS5fc2NhbGVkID8gJycgOiBgc2NhbGUoJHtpbnN0YW5jZS5fc2V0dGluZ3Muc2NhbGV9KWA7XG5cblx0XHQvLyBGbGlwIHRoZSBzY2FsZWQgc3RhdGVcblx0XHRpbnN0YW5jZS5fc2NhbGVkID0gIWluc3RhbmNlLl9zY2FsZWQ7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVFdmVudExpc3RlbmVyKGJ0biwgaW5zdGFuY2UpIHtcblx0XHRmdW5jdGlvbiB0b2dnbGUoKSB7XG5cdFx0XHR0b2dnbGVCdG4oaW5zdGFuY2UpO1xuXHRcdH1cblx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGUpO1xuXG5cdFx0cmV0dXJuIHRvZ2dsZTtcblx0fVxuXG5cdGZ1bmN0aW9uIENvbnN0cnVjdG9yIChzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0Y29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cdFx0T2JqZWN0LmZyZWV6ZShzZXR0aW5ncyk7XG5cblx0XHRjb25zdCBidG4gPSBjcmVhdGVCdG4oZWxlbSwgc2V0dGluZ3MpO1xuICAgIFxuXHRcdC8vIENyZWF0ZSB0aGUgZXZlbnQgbGlzdGVuZXJcblx0XHRjb25zdCBsaXN0ZW5lciA9IGNyZWF0ZUV2ZW50TGlzdGVuZXIoYnRuLCB0aGlzKTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRcdF9lbGVtOiB7IHZhbHVlOiBlbGVtIH0sXG5cdFx0XHRfc2V0dGluZ3M6IHt2YWx1ZTogc2V0dGluZ3N9LFxuXHRcdFx0X2J0bjogeyB2YWx1ZTogYnRufSxcblx0XHRcdF9saXN0ZW5lcjogeyB2YWx1ZTogbGlzdGVuZXIgfSxcblx0XHRcdF9zY2FsZWQ6IHsgdmFsdWU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSB9XG5cdFx0fSk7XG5cdH1cblxuXHRDb25zdHJ1Y3Rvci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkgeyAgXG5cdFx0dG9nZ2xlQnRuKHRoaXMpO1xuXHR9O1xuXG5cdC8qKlxuICAgKiBEZXN0cm95IHRoaXMgaW5zdGFuY2VcbiAgICovXG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciBpbW1lZGlhdGVseVxuXHRcdHRoaXMuX2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2xpc3RlbmVyKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgYnV0dG9uXG5cdFx0dGhpcy5fYnRuLnJlbW92ZSgpO1xuXHR9O1xuXG5cdHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0pKCk7XG5cbmNvbnN0IGVnZzEgPSBuZXcgRWdnKCcjZWdnJyk7XG5lZ2cxLnRvZ2dsZSgpO1xuY29uc3QgcGFydHkgPSBuZXcgRWdnKCcjcGFydHknLCB7XG5cdGJ0blRleHQ6ICfwn46JJyxcblx0bGFiZWw6ICdJdFxcJ3MgcGFydHkgdGltZScsXG5cdHNjYWxlOiAnMydcbn0pO1xuXG5wYXJ0eS5kZXN0cm95KCk7IiwiaW1wb3J0IGVtaXRFdmVudCBmcm9tICcuL3V0aWxzL2VtaXRFdmVudCc7XG5cbmNvbnN0IEVnZyA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICBsYWJlbDogJ2NsaWNrIG1lJyxcbiAgICBidG5UZXh0OiAn8J+lmicsXG4gICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAzMDBtcyBlYXNlLWluJyxcbiAgICBzY2FsZTogJzInXG4gIH07XG5cbiAgLyoqXG4gICAqIEluamVjdCB0aGUgYnV0dG9uIGludG8gdGhlIERPTSBcbiAgICogQHBhcmFtIHtOb2RlfSBlbGVtIFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3MgXG4gICAqIEByZXR1cm5zICB7Tm9kZX1cbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlQnRuIChlbGVtLCBzZXR0aW5ncykge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBzZXR0aW5ncy5idG5UZXh0O1xuICAgIGlmIChzZXR0aW5ncy5sYWJlbCkge1xuICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHNldHRpbmdzLmxhYmVsKTtcbiAgICB9XG5cbiAgICBpZiAoc2V0dGluZ3MudHJhbnNpdGlvbikge1xuICAgICAgYnRuLnN0eWxlLnRyYW5zaXRpb24gPSBzZXR0aW5ncy50cmFuc2l0aW9uO1xuICAgIH1cblxuICAgIC8vIGluamVjdCBpbnRvIHRoZSBET01cbiAgICBlbGVtLmFwcGVuZChidG4pO1xuXG4gICAgcmV0dXJuIGJ0bjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUJ0biAoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZS5fYnRuLnN0eWxlLnRyYW5zZm9ybSA9IGluc3RhbmNlLl9zY2FsZWQgPyAnJyA6IGBzY2FsZSgke2luc3RhbmNlLl9zZXR0aW5ncy5zY2FsZX0pYDtcbiAgICBpbnN0YW5jZS5fc2NhbGVkID0gIWluc3RhbmNlLl9zY2FsZWQ7XG4gIH1cblxuICAvKipcbiAgICogXG4gICAqIEBwYXJhbSB7Tm9kZX0gYnRuIFRoZSBidXR0b24gdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0b1xuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yfSBpbnN0YW5jZSAgVGhlIGN1cnJlbnQgaW5zdGFudGlhdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGVFdmVudExpc3RlbmVyKGJ0biwgaW5zdGFuY2UpIHtcbiAgICBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICB0b2dnbGVCdG4oaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZSk7XG5cbiAgICByZXR1cm4gdG9nZ2xlO1xuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgZWxlbWVudCB0byByZW5kZXIgaW50b1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgVXNlciBvcHRpb25zIGFuZCBzZXR0aW5nc1xuICAgKi9cblxuICBmdW5jdGlvbiBDb25zdHJ1Y3RvciAoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIC8vIENyZWF0ZSBhbmQgZnJlZXplIHRoZSBzZXR0aW5ncyBvYmplY3RcbiAgICBsZXQgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgT2JqZWN0LmZyZWV6ZShzZXR0aW5ncyk7XG5cbiAgICAvLyBJbmplY3QgYSBidXR0b24gaW50byB0aGUgRE9NXG4gICAgY29uc3QgYnRuID0gY3JlYXRlQnRuKGVsZW0sIHNldHRpbmdzKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICBjb25zdCBsaXN0ZW5lciA9IGNyZWF0ZUV2ZW50TGlzdGVuZXIoYnRuLCB0aGlzKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIF9lbGVtOiB7IHZhbHVlOiBlbGVtIH0sXG4gICAgICBfc2V0dGluZ3M6IHsgdmFsdWU6IHNldHRpbmdzIH0sXG4gICAgICBfc2NhbGVkOiB7IHZhbHVlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICAgIF9idG46IHsgdmFsdWU6IGJ0biB9LFxuICAgICAgX2xpc3RlbmVyOiB7IHZhbHVlOiBsaXN0ZW5lciB9XG4gICAgfSk7XG4gIH1cblxuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHRvZ2dsZUJ0bih0aGlzKTtcbiAgfVxuXG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZS5kZXN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2xpc3RlbmVyKTtcbiAgICB0aGlzLl9idG4ucmVtb3ZlKCk7XG4gIH1cblxuICByZXR1cm4gQ29uc3RydWN0b3I7XG59KSgpO1xuXG5jb25zdCBlZ2cgPSBuZXcgRWdnKCcjZWdnJyk7XG5cbmNvbnN0IHBhcnR5ID0gbmV3IEVnZygnI3BhcnR5Jywge1xuICBidG5UZXh0OiAn8J+OiScsXG4gIGxhYmVsOiBgSXQncyBwYXJ0eSB0aW1lYCxcbiAgc2NhbGU6ICczJ1xufSk7XG5cbmNvbnN0IEdyZWV0aW5nID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBncmVldGluZzogJ3lvdScsXG4gICAgaGlCZWZvcmU6ICdIZWxsbycsXG4gICAgaGlBZnRlcjogJycsXG4gICAgYnllQmVmb3JlOiAnR29vZGJ5ZScsXG4gICAgYnllQWZ0ZXI6ICdTZWUgeWEgc29vbicsXG5cbiAgICAvLyBDYWxsYmFja1xuXG4gICAgb25IaTogZnVuY3Rpb24gKCkge30sXG4gICAgb25CeWU6IGZ1bmN0aW9uICgpIHt9XG4gIH07XG5cbiAgZnVuY3Rpb24gQ29uc3RydWN0b3IobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgbmFtZSA9IG5hbWUgPyBuYW1lIDogc2V0dGluZ3MuZ3JlZXRpbmc7XG4gICAgT2JqZWN0LmZyZWV6ZShzZXR0aW5ncyk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBfbmFtZTogeyB2YWx1ZTogbmFtZSB9LFxuICAgICAgX3NldHRpbmdzOiB7IHZhbHVlOiBzZXR0aW5ncyB9XG4gICAgfSlcbiAgfVxuXG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZS5zYXlIaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBFbWl0IGN1c3RvbSBldmVudFxuICAgIGxldCBjYW5jZWxlZCA9ICFlbWl0RXZlbnQoJ2dyZWV0aW5nOmJlZm9yZS1oaScsIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICBiZWZvcmU6IHRoaXMuX3NldHRpbmdzLmhpQmVmb3JlLFxuICAgICAgYWZ0ZXI6IHRoaXMuX3NldHRpbmdzLmhpQWZ0ZXJcbiAgICB9KTtcblxuICAgIGlmIChjYW5jZWxlZCkgcmV0dXJuO1xuXG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5fc2V0dGluZ3MuaGlCZWZvcmV9LCAke3RoaXMuX25hbWV9ICR7dGhpcy5fc2V0dGluZ3MuaGlBZnRlcn1gKTtcbiAgICB0aGlzLl9zZXR0aW5ncy5vbkhpKHRoaXMuX25hbWUsIHRoaXMuX3NldHRpbmdzLmhpQmVmb3JlLCB0aGlzLl9zZXR0aW5ncy5oaUFmdGVyKTtcblxuICAgIC8vIEVtaXQgY3VzdG9tIGV2ZW50XG4gICAgZW1pdEV2ZW50KCdncmVldGluZzpoaScsIHtcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICBiZWZvcmU6IHRoaXMuX3NldHRpbmdzLmhpQmVmb3JlLFxuICAgICAgYWZ0ZXI6IHRoaXMuX3NldHRpbmdzLmhpQWZ0ZXJcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ29uc3RydWN0b3IucHJvdG90eXBlLnNheUdvb2RieWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gRW1pdCBjdXN0b20gZXZlbnRcbiAgICBsZXQgY2FuY2VsZWQgPSAhZW1pdEV2ZW50KCdncmVldGluZzpiZWZvcmUtYnllJywge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIGJlZm9yZTogdGhpcy5fc2V0dGluZ3MuYnllQmVmb3JlLFxuICAgICAgYWZ0ZXI6IHRoaXMuX3NldHRpbmdzLmJ5ZUFmdGVyXG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGUgZXZlbnQgd2FzIGNhbmNlbGVkLCBlbmRcbiAgICBpZiAoY2FuY2VsZWQpIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKGAke3RoaXMuX3NldHRpbmdzLmJ5ZUJlZm9yZX0gJHt0aGlzLl9zZXR0aW5ncy5ieWVBZnRlcn1gKTtcbiAgICB0aGlzLl9zZXR0aW5ncy5vbkJ5ZSh0aGlzLl9uYW1lLCB0aGlzLl9zZXR0aW5ncy5ieWVCZWZvcmUsIHRoaXMuX3NldHRpbmdzLmJ5ZUFmdGVyKTtcblxuICAgICAvLyBFbWl0IGN1c3RvbSBldmVudFxuICAgIGVtaXRFdmVudCgnZ3JlZXRpbmc6YnllJywge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZSxcbiAgICAgIGJlZm9yZTogdGhpcy5fc2V0dGluZ3MuYnllQmVmb3JlLFxuICAgICAgYWZ0ZXI6IHRoaXMuX3NldHRpbmdzLmJ5ZUFmdGVyXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0pKCk7XG5cbmNvbnN0IG1lcmxpbiA9IG5ldyBHcmVldGluZygnbWVybGluJywge1xuICBvbkhpOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIGNvbnNvbGUubG9nKG5hbWUpO1xuICAgIGxldCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJyk7XG4gICAgYXBwLnRleHRDb250ZW50ID0gYFdlbGNvbWUgbXkgaG9tZSwgJHtuYW1lfWA7XG4gIH0sXG4gIG9uQnllKG5hbWUsIGJ5ZUJlZm9yZSkge1xuICAgIGNvbnNvbGUubG9nKGJ5ZUJlZm9yZSwgbmFtZSk7XG4gICAgbGV0IGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKTtcbiAgICBhcHAuYXBwZW5kKGBcXHJTZWUgeW91IGxhdGVyLCAke25hbWV9YClcbiAgfVxufSk7XG5cbmNvbnN0IGJlcmxpbiA9IG5ldyBHcmVldGluZygnYmVybGluJyk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdncmVldGluZzpoaScsIGZ1bmN0aW9uIChldmVudCkge1xuICBjb25zb2xlLmxvZyhldmVudClcbn0pO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dyZWV0aW5nOmJ5ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICBsZXQgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpO1xuICBhcHAudGV4dENvbnRlbnQgPSBg8J+YgCAke2V2ZW50LmRldGFpbC5uYW1lfWA7XG59KTsiLCJpbXBvcnQgZW1pdEV2ZW50IGZyb20gJy4vdXRpbHMvZW1pdEV2ZW50JztcblxubGV0IGdyZWV0aW5ncyA9IChmdW5jdGlvbiAoKSB7XG5cdGxldCBzZXR0aW5ncyA9IHtcblx0XHRncmVldGluZzogJ3lvdScsXG5cdFx0aGlCZWZvcmU6ICdIZXlvJyxcblx0XHRoaUFmdGVyOiAnJyxcblx0XHRieWVCZWZvcmU6ICdTZWUgeWEgbGF0ZXInLFxuXHRcdGJ5ZUFmdGVyOiAnVGFrZSBpdCBlYXN5LicgIFxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3MgKG9wdGlvbnMgPSB7fSkge1xuXHRcdE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMpXG5cdH1cblxuXHRmdW5jdGlvbiBzYXlIaSAobmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0JyVjJXMnLCBcblx0XHRcdCdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcblx0XHRcdGAke3NldHRpbmdzLmhpQmVmb3JlfSAke25hbWUgPyBuYW1lIDogc2V0dGluZ3MuZ3JlZXRpbmd9ICR7c2V0dGluZ3MuaGlBZnRlcn1gXG5cdFx0KVxuXHRcdHJldHVybiBcblx0fVxuXG5cdGZ1bmN0aW9uIHNheUJ5ZSAobmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0JyVjJXMnLCBcblx0XHRcdCdjb2xvcjogcGluaztmb250LXNpemU6IDI1cHgnLCBcblx0XHRcdGAke3NldHRpbmdzLmJ5ZUJlZm9yZX0gJHtuYW1lID8gbmFtZSA6IHNldHRpbmdzLmdyZWV0aW5nfSAke3NldHRpbmdzLmJ5ZUFmdGVyfWBcblx0XHQpXG5cblx0XHRyZXR1cm4gXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHVwZGF0ZVNldHRpbmdzLFxuXHRcdHNheUhpLFxuXHRcdHNheUJ5ZSAgICBcblx0fVxufSkoKVxuXG4vLyBncmVldGluZ3MudXBkYXRlU2V0dGluZ3Moe1xuLy8gICBncmVldGluZ3M6ICd3b3JsZCdcbi8vIH0pXG5cbi8vIGdyZWV0aW5ncy5zYXlIaSgnbWVybGluJyk7XG4vLyBncmVldGluZ3Muc2F5QnllKCdtb3JnYW4nKTtcblxubGV0IEdyZWV0aW5nID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgZGVmYXVsdHMgPSB7XG5cdFx0Z3JlZXRpbmc6ICd5b3UnLFxuXHRcdGhpQmVmb3JlOiAnSGV5bycsXG5cdFx0aGlBZnRlcjogJycsXG5cdFx0YnllQmVmb3JlOiAnU2VlIHlhIGxhdGVyJyxcblx0XHRieWVBZnRlcjogJ1Rha2UgaXQgZWFzeS4nLFxuXG5cdFx0Ly8gY2FsbGJhY2tzXG5cdFx0b25IaTogZnVuY3Rpb24gKCkge30sXG5cdFx0b25CeWU6IGZ1bmN0aW9uICgpIHt9XG5cdH1cblxuXHRjb25zdCBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpXG5cblx0XHRPYmplY3QuZnJlZXplKHNldHRpbmdzKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0X25hbWU6IHsgdmFsdWU6IG5hbWUgfSxcblx0XHRcdF9zZXR0aW5nczogeyB2YWx1ZTogc2V0dGluZ3MgfVxuXHRcdH0pXG5cdH0gXG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlLnNheUhpID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIEVtaXQgY3VzdG9tIGV2ZW50XG5cdFx0Y29uc3QgY2FuY2VsZWQgPSAhZW1pdEV2ZW50KCdncmVldGluZzpiZWZvcmUtaGknLCB7XG5cdFx0XHRuYW1lOiB0aGlzLl9uYW1lLFxuXHRcdFx0YmVmb3JlOiB0aGlzLl9zZXR0aW5ncy5oaUJlZm9yZSxcblx0XHRcdGFmdGVyOiB0aGlzLl9zZXR0aW5ncy5oaUFmdGVyXG5cdFx0fSlcblxuXHRcdC8vIElmIHRoZSBldmVudCB3YXMgY2FuY2VsZWQsIGVuZFxuXHRcdGlmIChjYW5jZWxlZCkgcmV0dXJuXG5cblx0XHRjb25zb2xlLmxvZyhcblx0XHRcdCclYyVzJywgXG5cdFx0XHQnY29sb3I6IHBpbms7Zm9udC1zaXplOiAyNXB4JywgXG5cdFx0XHRgJHt0aGlzLl9zZXR0aW5ncy5oaUJlZm9yZX0gJHt0aGlzLl9uYW1lfSAke3RoaXMuX3NldHRpbmdzLmhpQWZ0ZXJ9YFxuXHRcdClcbiAgICBcblx0XHQvLyBSdW4gY2FsbGJhY2tcblx0XHR0aGlzLl9zZXR0aW5ncy5vbkhpKHRoaXMuX25hbWUsIHRoaXMuX3NldHRpbmdzLmhpQmVmb3JlLCB0aGlzLl9zZXR0aW5ncy5oaUFmdGVyKVxuXG5cdFx0Ly8gRW1pdCBjdXN0b20gZXZlbnRcblx0XHRlbWl0RXZlbnQoJ2dyZWV0aW5nOmhpJywge1xuXHRcdFx0bmFtZTogdGhpcy5fbmFtZSxcblx0XHRcdGJlZm9yZTogdGhpcy5fc2V0dGluZ3MuaGlCZWZvcmUsXG5cdFx0XHRhZnRlcjogdGhpcy5fc2V0dGluZ3MuaGlBZnRlclxuXHRcdH0pXG5cblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlLnNheUJ5ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBFbWl0IGN1c3RvbSBldmVudFxuXHRcdGNvbnN0IGNhbmNlbGVkID0gIWVtaXRFdmVudCgnZ3JlZXRpbmc6YmVmb3JlLWJ5ZScsIHtcblx0XHRcdG5hbWU6IHRoaXMuX25hbWUsXG5cdFx0XHRiZWZvcmU6IHRoaXMuX3NldHRpbmdzLmJ5ZUJlZm9yZSxcblx0XHRcdGFmdGVyOiB0aGlzLl9zZXR0aW5ncy5ieWVBZnRlclxuXHRcdH0pXG5cblx0XHQvLyBJZiB0aGUgZXZlbnQgd2FzIGNhbmNlbGVkLCBlbmRcblx0XHRpZiAoY2FuY2VsZWQpIHJldHVyblxuXG5cdFx0Y29uc29sZS5sb2coXG5cdFx0XHQnJWMlcycsIFxuXHRcdFx0J2NvbG9yOiBwaW5rO2ZvbnQtc2l6ZTogMjVweCcsIFxuXHRcdFx0YCR7dGhpcy5fc2V0dGluZ3MuYnllQmVmb3JlfSAke3RoaXMuX25hbWV9ICR7dGhpcy5fc2V0dGluZ3MuYnllQWZ0ZXJ9YFxuXHRcdClcbiAgICBcblx0XHR0aGlzLl9zZXR0aW5ncy5vbkJ5ZSh0aGlzLl9uYW1lLCB0aGlzLl9zZXR0aW5ncy5ieWVCZWZvcmUsIHRoaXMuX3NldHRpbmdzLmJ5ZUFmdGVyKVxuICAgIFxuXHRcdC8vIEVtaXQgY3VzdG9tIGV2ZW50XG5cdFx0ZW1pdEV2ZW50KCdncmVldGluZzpieWUnLCB7XG5cdFx0XHRuYW1lOiB0aGlzLl9uYW1lLFxuXHRcdFx0YmVmb3JlOiB0aGlzLl9zZXR0aW5ncy5ieWVCZWZvcmUsXG5cdFx0XHRhZnRlcjogdGhpcy5fc2V0dGluZ3MuYnllQWZ0ZXJcblx0XHR9KVxuICAgIFxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRyZXR1cm4gQ29uc3RydWN0b3Jcbn0pKClcblxuY29uc3QgbWVybGluID0gbmV3IEdyZWV0aW5nKCdNZXJsaW4nLCB7XG5cdGhpQWZ0ZXI6ICcuJyxcblx0Ly8gb25CeWU6IGZ1bmN0aW9uKG5hbWUpIHtcblx0Ly8gICBjb25zdCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnllLXRleHQnKVxuXHQvLyAgIGFwcC50ZXh0Q29udGVudCA9IGDwn5GLICR7bmFtZX1gO1xuXHQvLyB9XG59KVxuXG4vLyBMaXN0ZW4gYSBjdXN0b20gZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dyZWV0aW5nOmJ5ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zdCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnllLXRleHQnKVxuXHRhcHAudGV4dENvbnRlbnQgPSBg8J+RiyAke2V2ZW50LmRldGFpbC5uYW1lfWBcbn0pXG5cbmxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdGZvcm0ucmVzZXQoKVxuXG5cdC8vIEVtaXQgYSBjdXN0b20gZXZlbnRcblx0bWVybGluLnNheUJ5ZSgpXG59KVxuXG5cbi8qKlxuICogRW1pdCBhIGN1c3RvbSBldmVudFxuICovXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdteS1jdXN0b20tZXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuLy8gICBjb25zb2xlLmxvZygxMjMpXG4vLyAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUpXG4vLyAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbi8vIH0pXG5cbi8vIGxldCBteUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdteS1jdXN0b20tZXZlbnQnLCB7XG4vLyAgIGJ1YmJsZXM6IHRydWUsXG4vLyAgIGNhbmNlbGFibGU6IHRydWVcbi8vIH0pXG5cbi8vIC8vIEVtaXQgdGhlIGV2ZW50XG4vLyBjb25zdCBjYW5jZWxlZCA9IGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobXlFdmVudCk7XG4vLyBjb25zb2xlLmxvZyhteUV2ZW50KVxuLy8gY29uc29sZS5sb2coY2FuY2VsZWQpXG5cbiIsImltcG9ydCBIZWFkcm9vbSBmcm9tICdoZWFkcm9vbS5qcyc7XG5cbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuY29uc3QgaGVhZHJvb20gPSBuZXcgSGVhZHJvb20oaGVhZGVyKTtcbmhlYWRyb29tLmluaXQoKTtcbmhlYWRyb29tLnRvcCgpOyIsIi8vIGZ1bmN0aW9uIFN1cGVyVHlwZSgpIHtcbi8vICAgdGhpcy5jb2xvcnMgPSBbJ3JlZCcsICdibHVlJywgJ2dyZWVuJ107XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIFN1YlR5cGUoKSB7fVxuLy8gU3ViVHlwZS5wcm90b3R5cGUgPSBuZXcgU3VwZXJUeXBlKCk7XG5cbi8vIGxldCBpbnN0YW5jZTEgPSBuZXcgU3ViVHlwZSgpO1xuLy8gaW5zdGFuY2UxLmNvbG9ycy5wdXNoKCdibGFjaycpO1xuLy8gY29uc29sZS5sb2coaW5zdGFuY2UxLmNvbG9ycyk7XG5cbi8vIGxldCBpbnN0YW5jZTIgPSBuZXcgU3ViVHlwZSgpO1xuLy8gY29uc29sZS5sb2coaW5zdGFuY2UyLmNvbG9ycyk7XG5cbi8vIFxi55uX55So5p6E6YCg5Ye95pWwXG4vLyDlr7nosaHkvKroo4Ug57uP5YW457un5om/XG5cbi8qKlxuICogIOS8mOeCuSBcbiAqICDlj6/ku6XlnKjlrZDnsbvmnoTpgKDlh73mlbDkuK3lkJHniLbnsbvmnoTpgKDlh73mlbDkvKDlj4JcbiAqIFxuICog57y654K577yI5L2/55So5p6E6YCg5Ye95pWw5qih5byP6Ieq5a6a5LmJ57G75Z6L55qE6Zeu6aKY77yJXG4gKiDlv4XpobvlnKjmnoTpgKDlh73mlbDkuK3lrprkuYnmlrnms5XvvIzlm6DmraTlh73mlbDkuI3og73ph43nlKgsXG4gKiDlrZDnsbvkuZ/kuI3og73orr/pl67niLbnsbvljp/lnovkuIrlrprkuYnnmoTmlrnms5VcbiAqL1xuLy8gZnVuY3Rpb24gU3VwZXJUeXBlKCkge1xuLy8gICB0aGlzLmNvbG9ycyA9IFsncmVkJywgJ2JsdWUnLCAnZ3JlZW4nXTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gU3ViVHlwZSgpIHtcbi8vICAgU3VwZXJUeXBlLmNhbGwodGhpcyk7XG4vLyB9XG5cbi8vIGxldCBpbnN0YW5jZTEgPSBuZXcgU3ViVHlwZSgpO1xuLy8gaW5zdGFuY2UxLmNvbG9ycy5wdXNoKCdibGFjaycpO1xuLy8gY29uc29sZS5sb2coaW5zdGFuY2UxLmNvbG9ycyk7XG5cbi8vIGxldCBpbnN0YW5jZTIgPSBuZXcgU3ViVHlwZSgpO1xuLy8gY29uc29sZS5sb2coaW5zdGFuY2UyLmNvbG9ycyk7XG5cbi8vIGZ1bmN0aW9uIFN1cGVyVHlwZShuYW1lKSB7XG4vLyAgIHRoaXMubmFtZSA9IG5hbWU7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIFN1YlR5cGUoKSB7XG4vLyAgIFN1cGVyVHlwZS5jYWxsKHRoaXMsICdOaWNob2xhcycpO1xuLy8gICB0aGlzLmFnZSA9IDI5O1xuLy8gfVxuXG4vLyBsZXQgaW5zdGFuY2UgPSBuZXcgU3ViVHlwZSgpO1xuLy8gY29uc29sZS5sb2coaW5zdGFuY2UubmFtZSk7XG4vLyBjb25zb2xlLmxvZyhpbnN0YW5jZS5hZ2UpO1xuXG4vLyDnu4TlkIjnu6fmib8s5Lyq57uP5YW457un5om/IC0g57u85ZCI5Y6f5Z6L6ZO+5ZKM55uX55So5p6E6YCg5Ye95pWwXG4vLyDkvb/nlKjljp/lnovpk77nu6fmib/ljp/lnovkuIrnmoTlsZ7mgKflkozmlrnms5XvvIzogIzpgJrov4fnm5fnlKhcbi8vIOaehOmAoOWHveaVsOe7p+aJv+WunuS+i+WxnuaAp1xuLy8g6L+Z5qC35pei5Y+v5Lul5oqK5pa55rOV5a6a5LmJ5Zyo5Y6f5Z6L5LiK5Lul5a6e546w6YeN55So77yM5Y+I5Y+v5LulXG4vLyDorqnmr4/kuKrlrp7kvovpg73mnInoh6rlt7HnmoTlsZ7mgKdcblxuLy8g57uE5ZCI57un5om/5byl6KGl5LqG5Y6f5Z6L6ZO+5ZKM55uX55So5p6E6YCg5Ye95pWw55qE5LiN6Laz77yM5pivIEphdmFTY3JpcHQg5LitXG4vLyDkvb/nlKjmnIDlpJrnmoTnu6fmib/mqKHlvI/jgIJcbi8vIOe7hOWQiOe7p+aJv+S5n+S/neeVmeS6hiBpbnN0YW5jZW9mIOaTjeS9nOespuWSjCBpc1Byb3RvdHlwZU9mKClcbi8vIOaWueazleivhuWIq+WQiOaIkOWvueixoeeahOiDveWKm1xuXG4vLyDnvLrngrnvvJpcbi8vIOaViOeOh+mXrumimOOAgueItuexu+aehOmAoOWHveaVsOS8muiiq+iwg+eUqOS4pOasoe+8jOS4gOasoeaYr+WcqOWIm+W7uuWtkOexu+WOn+Wei+aXtuiwg+eUqFxuLy8g5LiA5qyh5piv5Zyo5a2Q57G75p6E6YCg5Ye95pWw5Lit6LCD55So44CCXG4vLyBmdW5jdGlvbiBTdXBlclR5cGUobmFtZSkge1xuLy8gICB0aGlzLm5hbWUgPSBuYW1lO1xuLy8gICB0aGlzLmNvbG9ycyA9IFsncmVkJywgJ2JsdWUnLCAnZ3JlZW4nXTtcbi8vIH1cblxuLy8gU3VwZXJUeXBlLnByb3RvdHlwZS5zYXlOYW1lID0gZnVuY3Rpb24gKCkge1xuLy8gICBjb25zb2xlLmxvZyh0aGlzLm5hbWUpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBTdWJUeXBlKG5hbWUsIGFnZSkge1xuLy8gICBTdXBlclR5cGUuY2FsbCh0aGlzLCBuYW1lKTtcblxuLy8gICB0aGlzLmFnZSA9IGFnZTtcbi8vIH1cblxuLy8gU3ViVHlwZS5wcm90b3R5cGUgPSBuZXcgU3VwZXJUeXBlKCk7XG4vLyBTdWJUeXBlLnByb3RvdHlwZS5zYXlBZ2UgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIGNvbnNvbGUubG9nKHRoaXMuYWdlKTtcbi8vIH1cblxuLy8gbGV0IGluc3RhbmNlMSA9IG5ldyBTdWJUeXBlKCdOaWNob2xhcycsIDI5KTtcbi8vIGluc3RhbmNlMS5jb2xvcnMucHVzaCgnYmxhY2snKTtcbi8vIGNvbnNvbGUubG9nKGluc3RhbmNlMS5jb2xvcnMpO1xuLy8gaW5zdGFuY2UxLnNheU5hbWUoKTtcbi8vIGluc3RhbmNlMS5zYXlBZ2UoKTtcblxuLy8gbGV0IGluc3RhbmNlMiA9IG5ldyBTdWJUeXBlKCdHcmVnJywgMjcpO1xuLy8gY29uc29sZS5sb2coaW5zdGFuY2UyLmNvbG9ycyk7XG4vLyBpbnN0YW5jZTIuc2F5TmFtZSgpO1xuLy8gaW5zdGFuY2UyLnNheUFnZSgpO1xuXG4vLyDljp/lnovlvI/nu6fmib9cbi8vIOS4jea2ieWPiuS4peagvOaEj+S5ieS4iuaehOmAoOWHveaVsOeahOe7p+aJv+aWueW8j1xuLy8g5Y2z5L2/5LiN5a6a5LmJ57G75Z6L5Lmf5Y+v5Lul6YCa6L+H5Y6f5Z6L5a6e546w5a+56LGh5LmL6Ze055qE5L+h5oGv5YWx5LqrXG5cbi8vIOmAgueUqOaDheWGte+8mlxuLy8g5L2g5pyJ5LiA5Liq5a+56LGh77yM5oOz5Zyo5a6D55qE5Z+656GA5LiK5Zyo5Yib5bu65LiA5Liq5paw5a+56LGh44CCXG4vLyDkvaDpnIDopoHmiorov5nkuKrlr7nosaHlhYjkvKDnu5kgb2JqZWN0KCnvvIznhLblkI7lho3lr7nov5Tlm57nmoTlr7nosaHov5vooYzpgILlvZPnmoTkv67mlLnjgIJcbi8vIOi/meenjeaWueazleWunumZheS4iuaYr+WFi+mahuWvueixoe+8jOacrOi0qOS4iuaYr+WvueS8oOWFpeWvueixoeaJp+ihjOS4gOasoea1heWkjeWItuOAglxuXG4vLyBFUzUg5paw5aKe5pa55rOVIE9iamVjdC5jcmVhdGUoKSDmlrnms5XlsIbljp/lnovlvI/nu6fmib/nmoTmpoLlv7Xop4TojIPljJbjgIJcbi8vIOaOpeWPl+S4pOS4quWPguaVsO+8muS9nOS4uuaWsOWvueixoeWOn+Wei+eahOWvueixoe+8jOS7peWPiuaWsOWvueixoeWumuS5iemineWkluWxnuaAp+eahOWvueixoVxuXG4vLyDljp/lnovlvI/nu6fmib/otLnpnZ7luLjpgILlkIjkuI3pnIDopoHljZXni6zliJvlu7rmnoTpgKDlh73mlbDvvIzkvYbku43nhLbpnIDopoHlnKjlr7nosaHpl7TlhbHkuqvkv6Hmga/nmoTlnLrlkIjjgIJcbi8vIOS9huWxnuaAp+S4reWMheWQq+eahOW8leeUqOWAvOWni+e7iOS8muWcqOebuOWFs+WvueixoemXtOWFseS6q++8jOi3n+S9v+eUqOWOn+Wei+aooeW8j+aYr+S4gOagt+eahOOAglxuLy8gZnVuY3Rpb24gb2JqZWN0IChvKSB7XG4vLyAgIGZ1bmN0aW9uIEYoKSB7fVxuLy8gICBGLnByb3RvdHlwZSA9IG87XG4vLyAgIHJldHVybiBuZXcgRigpO1xuLy8gfVxuXG4vLyBsZXQgcGVyc29uID0ge1xuLy8gICBuYW1lOiAnTmljaG9sYXMnLFxuLy8gICBmcmllbmRzOiBbJ3NoZWxieScsICdjb3VydCcsICd2YW4nXVxuLy8gfVxuXG4vLyBsZXQgYW5vdGhlclBlcnNvbiA9IG9iamVjdChwZXJzb24pO1xuLy8gY29uc29sZS5sb2coYW5vdGhlclBlcnNvbi5uYW1lKTtcbi8vIGFub3RoZXJQZXJzb24ubmFtZSA9ICdHcmllYSdcbi8vIGFub3RoZXJQZXJzb24uZnJpZW5kcy5wdXNoKCdyb2InKTtcblxuLy8gbGV0IHlldEFub3RoZXJQZXJzb24gPSBvYmplY3QocGVyc29uKTtcbi8vIHlldEFub3RoZXJQZXJzb24ubmFtZSA9IFwiTGluZGFcIjtcbi8vIHlldEFub3RoZXJQZXJzb24uZnJpZW5kcy5wdXNoKFwiQmFyYmllXCIpO1xuXG4vLyBjb25zb2xlLmxvZyhwZXJzb24uZnJpZW5kcyk7XG4vLyBjb25zb2xlLmxvZyhhbm90aGVyUGVyc29uKVxuXG4vLyDlr4TnlJ/lvI/nu6fmib8g5a+E55Sf5p6E6YCg5Ye95pWw5ZKM5bel5Y6C5qih5byPXG4vLyDliJvlu7rkuIDkuKrlrp7njrDnu6fmib/nmoTlh73mlbDvvIzku6Xmn5Dnp43mlrnlvI/lop7lvLrlr7nosaHvvIznhLblkI7ov5Tlm57ov5nkuKrlr7nosaHjgIJcbi8vIOmAguWQiOS4u+imgeWFs+azqOWvueixoe+8jOiAjOS4jeWFs+azqOexu+Wei+WSjOaehOmAoOWHveaVsOeahOWIm+aZr1xuLy8gT2JqZWN0KCkg5Ye95pWw5LiN5piv5b+F6aG755qE77yM5Lu75L2V6L+U5Zue5paw5a+56LGh55qE5Ye95pWw6YO95Y+v5Lul5Zyo6L+Z6YeM5L2/55SoXG4vLyDpgJrov4flr4TnlJ/lvI/nu6fmib/nu5nlr7nosaHmt7vliqDlh73mlbDkvJrlr7zoh7Tlh73mlbDpmr7ku6Xph43nlKjvvIzkuI7mnoTpgKDlh73mlbDmqKHlvI/olb7opb9cbi8vIGZ1bmN0aW9uIGNyZWF0ZUFub3RoZXIob3JpZ2luYWwpIHtcbi8vICAgbGV0IGNsb25lID0gT2JqZWN0KG9yaWdpbmFsKTsgLy8g6LCD55So5Ye95pWw5Yib5bu65LiA5Liq5paw5a+56LGhXG4vLyAgIGNsb25lLnNheUhpID0gZnVuY3Rpb24gKCkgeyAgIC8vIOS7peafkOenjeaWueW8j+WinuW8uui/meS4quWvueixoVxuLy8gICAgIGNvbnNvbGUubG9nKCdoaScpO1xuLy8gICB9XG5cbi8vICAgcmV0dXJuIGNsb25lO1xuLy8gfVxuXG4vLyBsZXQgcGVyc29uID0ge1xuLy8gICBuYW1lOiAnTmljaG9sYXMnLFxuLy8gICBmcmllbmRzOiBbJ3NoZWxieScsICdjb3VydCcsICd2YW4nXVxuLy8gfVxuXG4vLyBsZXQgYW5vdGhlclBlcnNvbiA9IGNyZWF0ZUFub3RoZXIocGVyc29uKTtcbi8vIGFub3RoZXJQZXJzb24uc2F5SGkoKTtcblxuLy8g5a+E55Sf5byP57uE5ZCI57un5om/XG5mdW5jdGlvbiBpbmhlcml0UHJvdG90eXBlKHN1YlR5cGUsIHN1cGVyVHlwZSkge1xuICBsZXQgcHJvdG90eXBlID0gT2JqZWN0KHN1cGVyVHlwZS5wcm90b3R5cGUpO1xuICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdWJUeXBlO1xuICBzdWJUeXBlLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbn1cblxuZnVuY3Rpb24gU3VwZXJUeXBlKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5jb2xvcnMgPSBbJ3JlZCcsICdibHVlJywgJ2dyZWVuJ107XG59XG5cblN1cGVyVHlwZS5wcm90b3R5cGUuc2F5TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2codGhpcy5uYW1lKTtcbn1cblxuZnVuY3Rpb24gU3ViVHlwZSAobmFtZSwgYWdlKSB7XG4gIFN1cGVyVHlwZS5jYWxsKHRoaXMsIG5hbWUpO1xuICB0aGlzLmFnZSA9IGFnZTtcbn1cblxuaW5oZXJpdFByb3RvdHlwZShTdWJUeXBlLCBTdXBlclR5cGUpO1xuXG5TdWJUeXBlLnByb3RvdHlwZS5zYXlBZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKHRoaXMuYWdlKTtcbn0iLCJjb25zdCBBcHAgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWVcbn1cblxuQXBwLnByb3RvdHlwZS5zYXlIaSA9IGZ1bmN0aW9uICgpe1xuICBjb25zb2xlLmxvZyh0aGlzLm5hbWUpXG59XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoJ2J5b2RpYW4nKVxuYXBwLnNheUhpKClcblxuQXBwLnByb3RvdHlwZS5zYXlCeWUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKCdnb29kIGJ5ZScsIHRoaXMubmFtZSlcbn1cblxuYXBwLnNheUJ5ZSgpIiwiLyoqXG4gKiBFbWl0IGEgY3VzdG9tIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXZlbnQgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGRldGFpbCBBbnkgZGV0YWlscyB0byBwYXNzIGFsb25nIHdpdGggdGhlIGV2ZW50XG4gKiBAcGFyYW0ge05vZGV9IGVsZW0gVGhlIGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBldmVudCB0b1xuICovXG5cbiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbWl0RXZlbnQodHlwZSwgZGV0YWlsID0ge30sIGVsZW0gPSBkb2N1bWVudCkge1xuICAvLyBNYWtlIHN1cmUgdGhlcmUncyBhbiBldmVudCB0eXBlXG4gIGlmICghdHlwZSkgcmV0dXJuO1xuXG4gIC8vIENyZWF0ZSBhIG5ldyBldmVudFxuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogZGV0YWlsXG4gIH0pO1xuXG4gIC8vIERpc3BhdGNoIHRoZSBldmVudFxuICByZXR1cm4gZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn0iLCJjb25zdCB0b0FycmF5ID0gZnVuY3Rpb24gKGxpc3QsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgbGV0IGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICBjb25zdCByZXQgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0pIHtcbiAgICByZXRbaV0gPSBsaXN0W2kgKyBzdGFydF07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGluaXRVc2UgKFZ1ZSkge1xuICAvLyAqIFZ1ZSDmnoTpgKDlmajpnZnmgIHmlrnms5VcbiAgVnVlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAvLyB0aGlzLl9pbnN0YWxsZWRQbHVnaW5zID0gdGhpcy5faW5zdGFsbGVkUGx1Z2lucyB8fCBbXVxuICAgIC8vIGNvbnN0IGluc3RhbGxQbHVnaW4gPSB0aGlzLl9pbnN0YWxsZWRQbHVnaW5zXG4gICAgY29uc3QgaW5zdGFsbFBsdWdpbnMgPSB0aGlzLl9pbnN0YWxsZWRQbHVnaW5zIHx8ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zID0gW10pO1xuXG4gICAgLy8gKiDnoa7kv53mj5Lku7blj6rkvJrooqvlronoo4XkuIDmrKFcbiAgICBpZiAoaW5zdGFsbFBsdWdpbnMuaW5kZXhPZihwbHVnaW4pID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vICogVnVlLnVzZShwbHVnaW4sIG9wdGlvbnMpXG4gICAgLy8gYXJndW1lbnRzIDxBcmd1bWVudHM+ID0+IFtwbHVnaW4sIG9wdGlvbnNdXG4gICAgLy8gYXJncyA8QXJyYXk+ID0+IFtvcHRpb25zXVxuICAgIGNvbnN0IGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICBjb25zb2xlLmxvZyhhcmdzKTtcblxuICAgIC8vICogYXJncyA8QXJyYXk+ID0+IFtWdWUsIG9wdGlvbnNdXG4gICAgYXJncy51bnNoaWZ0KHRoaXMpO1xuICAgIGNvbnNvbGUubG9nKGFyZ3MpO1xuXG4gICAgLy8gKiAxLiBwbHVnaW4g5L2c5Li65a+56LGh5LiU5pyJIGluc3RhbGwg5pa55rOV77yM6LCD55SoIGluc3RhbGwg5pa55rOVXG4gICAgLy8gKiAyLiBwbHVnaW4g5L2c5Li65Ye95pWw77yM55u05o6l6LCD55So6K+l5Ye95pWwXG4gICAgaWYgKHR5cGVvZiBwbHVnaW4uaW5zdGFsbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBwbHVnaW4uaW5zdGFsbC5hcHBseShwbHVnaW4sIGFyZ3MpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBwbHVnaW4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuXG4gICAgLy8gKiDnvJPlrZjlt7Lnu4/lronoo4XnmoTmj5Lku7ZcbiAgICBpbnN0YWxsUGx1Z2lucy5wdXNoKHBsdWdpbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0VXNlXG59Il0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMmhsWVdSeWIyOXRMbXB6TDJScGMzUXZhR1ZoWkhKdmIyMHVhbk1pTENKM1pXSndZV05yT2k4dkx5aDNaV0p3WVdOcktTOWlkV2xzWkdsdUwyMXZaSFZzWlM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12WTJwekwyaGxiSEJsY2k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12WTJwekwybHVaR1Y0TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDNOeVl5OXFjeTlsY3k5b1pXeHdaWEp6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDNOeVl5OXFjeTlsY3k5dFlXbHVMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OWxjeTl0ZVMxdGIyUjFiR1V1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMnhwWWk5Q2FXNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyeHBZaTlFYjIxTllXNXBjSFZzWVhScGIyNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyeHBZaTlGWjJjdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMMnB6TDJ4cFlpOUhjbVZsZEdsdVp5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmJHbGlMMGhsWVdSU2IyOXRMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OXNhV0l2U1c1b1pYSnBkQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZiR2xpTDFCeWIzUnZkSGx3WlM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12YkdsaUwzVjBhV3h6TDJWdGFYUkZkbVZ1ZEM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12ZG5WbExYQnNkV2RwYmk5MWMyVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRSUVVGQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHM3VVVGRlFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CT3pzN1VVRkhRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk8xRkJRMEVzTUVOQlFUQkRMR2REUVVGblF6dFJRVU14UlR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTEhkRVFVRjNSQ3hyUWtGQmEwSTdVVUZETVVVN1VVRkRRU3hwUkVGQmFVUXNZMEZCWXp0UlFVTXZSRHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRXNlVU5CUVhsRExHbERRVUZwUXp0UlFVTXhSU3huU0VGQlowZ3NiVUpCUVcxQ0xFVkJRVVU3VVVGRGNrazdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTd3lRa0ZCTWtJc01FSkJRVEJDTEVWQlFVVTdVVUZEZGtRc2FVTkJRV2xETEdWQlFXVTdVVUZEYUVRN1VVRkRRVHRSUVVOQk96dFJRVVZCTzFGQlEwRXNjMFJCUVhORUxDdEVRVUVyUkRzN1VVRkZja2c3VVVGRFFUczdPMUZCUjBFN1VVRkRRVHM3T3pzN096czdPenM3TzBGRGJFWkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RlFVRkZMRXRCUVRSRU8wRkJRemxFTEVWQlFVVXNVMEZEYzBRN1FVRkRlRVFzUTBGQlF5eHZRa0ZCYjBJN08wRkJSWEpDTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHRRa0ZCYlVJN1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzT0VKQlFUaENPMEZCUXpsQ096dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYTBKQlFXdENMRTlCUVU4N1FVRkRla0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQT3p0QlFVVlFPMEZCUTBFN1FVRkRRU3hyUWtGQmEwSXNUMEZCVHp0QlFVTjZRanRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQT3p0QlFVVlFPMEZCUTBFN1FVRkRRU3hyUWtGQmEwSXNUMEZCVHp0QlFVTjZRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMR3RDUVVGclFpeFBRVUZQTzBGQlEzcENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVRHRCUVVOQkxHdENRVUZyUWl4UFFVRlBPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdPMEZCUlZBN1FVRkRRVHRCUVVOQkxHdENRVUZyUWl4UFFVRlBPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2EwTkJRV3RETzBGQlEyeERPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4aFFVRmhMRmRCUVZjN1FVRkRlRUlzWVVGQllTeFBRVUZQTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYlVOQlFXMURPenRCUVVWdVF6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzWlVGQlpTeHBSRUZCYVVRN1FVRkRhRVU3UVVGRFFUdEJRVU5CTEZkQlFWYzdRVUZEV0R0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMT3p0QlFVVk1PMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHM3UVVGRlFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHM3UVVGRlFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeFpRVUZaTzBGQlExbzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUczdRVUZGUVN4RFFVRkRPenM3T3pzN096czdPenM3UVVOd1lrUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdRVU55UWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRU03T3pzN096czdPenM3TzBGRFVFRXNPRVJCUVdkQ0xHMUNRVUZQTEVOQlFVTXNkME5CUVZVN1FVRkRiRU03UVVGRFFTeHRRanM3T3pzN096czdPenM3T3p0QlEwWkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCTUVRN08wRkJSVEZFT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlpTd3lSVUZCV1N4Rk96czdPenM3T3pzN096czdRVU5TTTBJN1FVRkJRVHRCUVVGeFF6dEJRVU5QT3p0QlFVVTFReXhsUVVGbExIZEVRVUZaTzBGQlF6TkNPenRCUVVWQkxEWkNRVUUyUWl4UFFVRlBMRWxCUVVrc1QwRkJUenRCUVVNdlF5eFpRVUZaTEhkRVFVRkpPMEZCUTJoQ0xGbEJRVmtzTkVOQlFVY3NSVUZCUlN3NFEwRkJTeXhET3pzN096czdPenM3T3pzN1FVTlNkRUk3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3T3pzN1FVTm1RVHRCUVVGQk8wRkJRVUU3UVVGQmVVTTdPMEZCUld4RE8wRkJRMUE3UVVGRFFUdEJRVU5CTEVjN08wRkJSVUVzWjBSQlFXZEVPMEZCUTJoRUxIRkRRVUZ4UXp0QlFVTnlRenM3UVVGRlFUdEJRVU5CTEdGQlFXRXNZVUZCWVR0QlFVTXhRaXhyUWtGQmEwSTdRVUZEYkVJc1MwRkJTenRCUVVOTU96dEJRVVZCTzBGQlEwRTdPMEZCUlVFc1NVRkJTU3huUlVGQlV6dEJRVU5pTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N08wRkJSVUU3UVVGRFFUdEJRVU5CTEVsQlFVa3NaMFZCUVZNN1FVRkRZanRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeEpRVUZKTEdkRlFVRlRPMEZCUTJJN1FVRkRRU3hMUVVGTE8wRkJRMHc3TzBGQlJVRTdRVUZEUVN4RFFVRkRPenRCUVVWRU8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdRVUZEUVN4RFFVRkRPenRCUVVWRU8wRkJRMEU3UVVGRFFUdEJRVU5CTEVOQlFVTTdPMEZCUlVRc01rSTdPenM3T3pzN096czdPMEZEYUVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMRk5CUVZNN1FVRkRWQ3hEUVVGRE96dEJRVVZFT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h0UlVGQmJVVXNlVUpCUVhsQ096dEJRVVUxUmp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTERaRFFVRTJRenRCUVVNM1F6czdRVUZGUVN4dFEwRkJiVU03UVVGRGJrTTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRmRCUVZjc1kwRkJZenRCUVVONlFpeGxRVUZsTEdkQ1FVRm5RanRCUVVNdlFpeFZRVUZWTEZsQlFWazdRVUZEZEVJc1pVRkJaU3hyUWtGQmEwSTdRVUZEYWtNc1lVRkJZVHRCUVVOaUxFZEJRVWM3UVVGRFNEczdRVUZGUVN3MlF6dEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RFFVRkRPenRCUVVWRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRU5CUVVNN08wRkJSVVFzWjBJN096czdPenM3T3pzN096dEJRemRLUVR0QlFVRkJPMEZCUVRCRE96dEJRVVV4UXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1lVRkJZU3hMUVVGTE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRaXhuUWtGQlowSTdRVUZEYUVJN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4eFJVRkJjVVVzZVVKQlFYbENPMEZCUXpsR08wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMR0ZCUVdFc1MwRkJTenRCUVVOc1FpeGhRVUZoTEZsQlFWazdRVUZEZWtJN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1lVRkJZU3hQUVVGUE8wRkJRM0JDTEdGQlFXRXNUMEZCVHp0QlFVTndRanM3UVVGRlFTdzRRMEZCT0VNN1FVRkRPVU03TzBGQlJVRTdRVUZEUVN4dFEwRkJiVU03UVVGRGJrTTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc1kwRkJZeXhqUVVGak8wRkJRelZDTEd0Q1FVRnJRaXhyUWtGQmEwSTdRVUZEY0VNc1owSkJRV2RDTEN0Q1FVRXJRanRCUVVNdlF5eGhRVUZoTEdGQlFXRTdRVUZETVVJc2EwSkJRV3RDTzBGQlEyeENMRXRCUVVzN1FVRkRURHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RFFVRkRPenRCUVVWRU96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1EwRkJRenM3UVVGRlJEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVN4M1FrRkJkMEk3UVVGRGVFSTdRVUZEUVRzN1FVRkZRU3g1UTBGQmVVTTdRVUZEZWtNc2NVTkJRWEZETzBGQlEzSkRPMEZCUTBFN08wRkJSVUU3UVVGRFFTeGpRVUZqTEdOQlFXTTdRVUZETlVJc2EwSkJRV3RDTzBGQlEyeENMRXRCUVVzN1FVRkRURHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNiMEpCUVc5Q0xHZEZRVUZUTzBGQlF6ZENPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdPMEZCUlVFc2JVSkJRVzFDTEhkQ1FVRjNRaXhKUVVGSkxGZEJRVmNzUjBGQlJ5eDFRa0ZCZFVJN1FVRkRjRVk3TzBGQlJVRTdRVUZEUVN4SlFVRkpMR2RGUVVGVE8wRkJRMkk3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4dlFrRkJiMElzWjBWQlFWTTdRVUZETjBJN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPenRCUVVWQkxHMUNRVUZ0UWl4NVFrRkJlVUlzUjBGQlJ5eDNRa0ZCZDBJN1FVRkRka1U3TzBGQlJVRTdRVUZEUVN4SlFVRkpMR2RGUVVGVE8wRkJRMkk3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk96dEJRVVZCTzBGQlEwRXNRMEZCUXpzN1FVRkZSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTERCRFFVRXdReXhMUVVGTE8wRkJReTlETEVkQlFVYzdRVUZEU0R0QlFVTkJPMEZCUTBFN1FVRkRRU3h0UTBGQmJVTXNTMEZCU3p0QlFVTjRRenRCUVVOQkxFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1EwRkJRenM3TzBGQlIwUTdRVUZEUVR0QlFVTkJMREJDUVVFd1FpeHJRa0ZCYTBJN1FVRkROVU1zUTBGQlF5eEZPenM3T3pzN096czdPenM3UVVONFRVUTdRVUZCUVR0QlFVRXdRenM3UVVGRk1VTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVN4elEwRkJjME03UVVGRGRFTTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeG5Ra0ZCWjBJN1FVRkRhRUlzVFVGQlRTeHJRa0ZCYTBJc1IwRkJSeXhuUTBGQlowTXNSMEZCUnl4cFFrRkJhVUk3UVVGREwwVTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdkQ1FVRm5RanRCUVVOb1FpeE5RVUZOTEcxQ1FVRnRRaXhIUVVGSExHZERRVUZuUXl4SFFVRkhMR3RDUVVGclFqdEJRVU5xUmpzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hEUVVGRE96dEJRVVZFTzBGQlEwRTdRVUZEUVN4SlFVRkpPenRCUVVWS08wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4elFrRkJjMEk3UVVGRGRFSTdRVUZEUVRzN1FVRkZRU3huUkVGQlowUTdRVUZEYUVRc2JVTkJRVzFET3p0QlFVVnVRenM3UVVGRlFUdEJRVU5CTEZkQlFWY3NZMEZCWXp0QlFVTjZRaXhsUVVGbE8wRkJRMllzUjBGQlJ6dEJRVU5JTEVVN08wRkJSVUU3UVVGRFFUdEJRVU5CTEc5Q1FVRnZRaXhuUlVGQlV6dEJRVU0zUWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxHZENRVUZuUWp0QlFVTm9RaXhOUVVGTkxIZENRVUYzUWl4SFFVRkhMRmRCUVZjc1IwRkJSeXgxUWtGQmRVSTdRVUZEZEVVN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVVc1owVkJRVk03UVVGRFdEdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRzlDUVVGdlFpeG5SVUZCVXp0QlFVTTNRanRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEdkQ1FVRm5RanRCUVVOb1FpeE5RVUZOTEhsQ1FVRjVRaXhIUVVGSExGZEJRVmNzUjBGQlJ5eDNRa0ZCZDBJN1FVRkRlRVU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRU3hGUVVGRkxHZEZRVUZUTzBGQlExZzdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFc1EwRkJRenM3UVVGRlJEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRGhDUVVFNFFpeExRVUZMTzBGQlEyNURPMEZCUTBFc1EwRkJRenM3UVVGRlJEdEJRVU5CTzBGQlEwRTdRVUZEUVN4NVFrRkJlVUlzYTBKQlFXdENPMEZCUXpORExFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEVOQlFVTTdPenRCUVVkRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1NVRkJTVHM3UVVGRlNqdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkpPenRCUVVWS08wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN096dEJReTlMUVR0QlFVRkJPMEZCUVVFN1FVRkJiVU03TzBGQlJXNURPMEZCUTBFc2NVSkJRWEZDTEd0RVFVRlJPMEZCUXpkQ08wRkJRMEVzWlRzN096czdPenM3T3pzN1FVTk1RVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2EwTkJRV3RETzBGQlEyeERMR2REUVVGblF6dEJRVU5vUXp0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hET3pzN096czdPenM3T3p0QlEzUk1RVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQkxGazdPenM3T3pzN096czdPenRCUTJaQk8wRkJRVUU3UVVGQlFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRXRCUVVzN1FVRkRhRUk3TzBGQlJVRXNRMEZCWjBJc2IwTkJRVzlETzBGQlEzQkVPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTEVNN096czdPenM3T3pzN08wRkRjRUpCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRU1pTENKbWFXeGxJam9pT1Rsak9HTTBPVFU1TWpKa1l6TmpORE0yTXpndWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlnWEhRdkx5QlVhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFIyWVhJZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3lBOUlIdDlPMXh1WEc0Z1hIUXZMeUJVYUdVZ2NtVnhkV2x5WlNCbWRXNWpkR2x2Ymx4dUlGeDBablZ1WTNScGIyNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWh0YjJSMWJHVkpaQ2tnZTF4dVhHNGdYSFJjZEM4dklFTm9aV05ySUdsbUlHMXZaSFZzWlNCcGN5QnBiaUJqWVdOb1pWeHVJRngwWEhScFppaHBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTa2dlMXh1SUZ4MFhIUmNkSEpsZEhWeWJpQnBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTNWxlSEJ2Y25Sek8xeHVJRngwWEhSOVhHNGdYSFJjZEM4dklFTnlaV0YwWlNCaElHNWxkeUJ0YjJSMWJHVWdLR0Z1WkNCd2RYUWdhWFFnYVc1MGJ5QjBhR1VnWTJGamFHVXBYRzRnWEhSY2RIWmhjaUJ0YjJSMWJHVWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU0E5SUh0Y2JpQmNkRngwWEhScE9pQnRiMlIxYkdWSlpDeGNiaUJjZEZ4MFhIUnNPaUJtWVd4elpTeGNiaUJjZEZ4MFhIUmxlSEJ2Y25Sek9pQjdmVnh1SUZ4MFhIUjlPMXh1WEc0Z1hIUmNkQzh2SUVWNFpXTjFkR1VnZEdobElHMXZaSFZzWlNCbWRXNWpkR2x2Ymx4dUlGeDBYSFJ0YjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVqWVd4c0tHMXZaSFZzWlM1bGVIQnZjblJ6TENCdGIyUjFiR1VzSUcxdlpIVnNaUzVsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS1R0Y2JseHVJRngwWEhRdkx5QkdiR0ZuSUhSb1pTQnRiMlIxYkdVZ1lYTWdiRzloWkdWa1hHNGdYSFJjZEcxdlpIVnNaUzVzSUQwZ2RISjFaVHRjYmx4dUlGeDBYSFF2THlCU1pYUjFjbTRnZEdobElHVjRjRzl5ZEhNZ2IyWWdkR2hsSUcxdlpIVnNaVnh1SUZ4MFhIUnlaWFIxY200Z2JXOWtkV3hsTG1WNGNHOXlkSE03WEc0Z1hIUjlYRzVjYmx4dUlGeDBMeThnWlhod2IzTmxJSFJvWlNCdGIyUjFiR1Z6SUc5aWFtVmpkQ0FvWDE5M1pXSndZV05yWDIxdlpIVnNaWE5mWHlsY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YlNBOUlHMXZaSFZzWlhNN1hHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbU1nUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCa1pXWnBibVVnWjJWMGRHVnlJR1oxYm1OMGFXOXVJR1p2Y2lCb1lYSnRiMjU1SUdWNGNHOXlkSE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ0E5SUdaMWJtTjBhVzl1S0dWNGNHOXlkSE1zSUc1aGJXVXNJR2RsZEhSbGNpa2dlMXh1SUZ4MFhIUnBaaWdoWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dktHVjRjRzl5ZEhNc0lHNWhiV1VwS1NCN1hHNGdYSFJjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRzVoYldVc0lIc2daVzUxYldWeVlXSnNaVG9nZEhKMVpTd2daMlYwT2lCblpYUjBaWElnZlNrN1hHNGdYSFJjZEgxY2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdSbFptbHVaU0JmWDJWelRXOWtkV3hsSUc5dUlHVjRjRzl5ZEhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y2lBOUlHWjFibU4wYVc5dUtHVjRjRzl5ZEhNcElIdGNiaUJjZEZ4MGFXWW9kSGx3Wlc5bUlGTjViV0p2YkNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ1UzbHRZbTlzTG5SdlUzUnlhVzVuVkdGbktTQjdYRzRnWEhSY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUZONWJXSnZiQzUwYjFOMGNtbHVaMVJoWnl3Z2V5QjJZV3gxWlRvZ0owMXZaSFZzWlNjZ2ZTazdYRzRnWEhSY2RIMWNiaUJjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJQ2RmWDJWelRXOWtkV3hsSnl3Z2V5QjJZV3gxWlRvZ2RISjFaU0I5S1R0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdOeVpXRjBaU0JoSUdaaGEyVWdibUZ0WlhOd1lXTmxJRzlpYW1WamRGeHVJRngwTHk4Z2JXOWtaU0FtSURFNklIWmhiSFZsSUdseklHRWdiVzlrZFd4bElHbGtMQ0J5WlhGMWFYSmxJR2wwWEc0Z1hIUXZMeUJ0YjJSbElDWWdNam9nYldWeVoyVWdZV3hzSUhCeWIzQmxjblJwWlhNZ2IyWWdkbUZzZFdVZ2FXNTBieUIwYUdVZ2JuTmNiaUJjZEM4dklHMXZaR1VnSmlBME9pQnlaWFIxY200Z2RtRnNkV1VnZDJobGJpQmhiSEpsWVdSNUlHNXpJRzlpYW1WamRGeHVJRngwTHk4Z2JXOWtaU0FtSURoOE1Ub2dZbVZvWVhabElHeHBhMlVnY21WeGRXbHlaVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NTBJRDBnWm5WdVkzUnBiMjRvZG1Gc2RXVXNJRzF2WkdVcElIdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlERXBJSFpoYkhWbElEMGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWgyWVd4MVpTazdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQTRLU0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdYSFJjZEdsbUtDaHRiMlJsSUNZZ05Da2dKaVlnZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYjJKcVpXTjBKeUFtSmlCMllXeDFaU0FtSmlCMllXeDFaUzVmWDJWelRXOWtkV3hsS1NCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnWEhSY2RIWmhjaUJ1Y3lBOUlFOWlhbVZqZEM1amNtVmhkR1VvYm5Wc2JDazdYRzRnWEhSY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjaWh1Y3lrN1hHNGdYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaHVjeXdnSjJSbFptRjFiSFFuTENCN0lHVnVkVzFsY21GaWJHVTZJSFJ5ZFdVc0lIWmhiSFZsT2lCMllXeDFaU0I5S1R0Y2JpQmNkRngwYVdZb2JXOWtaU0FtSURJZ0ppWWdkSGx3Wlc5bUlIWmhiSFZsSUNFOUlDZHpkSEpwYm1jbktTQm1iM0lvZG1GeUlHdGxlU0JwYmlCMllXeDFaU2tnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1a0tHNXpMQ0JyWlhrc0lHWjFibU4wYVc5dUtHdGxlU2tnZXlCeVpYUjFjbTRnZG1Gc2RXVmJhMlY1WFRzZ2ZTNWlhVzVrS0c1MWJHd3NJR3RsZVNrcE8xeHVJRngwWEhSeVpYUjFjbTRnYm5NN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCblpYUkVaV1poZFd4MFJYaHdiM0owSUdaMWJtTjBhVzl1SUdadmNpQmpiMjF3WVhScFltbHNhWFI1SUhkcGRHZ2dibTl1TFdoaGNtMXZibmtnYlc5a2RXeGxjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXVJRDBnWm5WdVkzUnBiMjRvYlc5a2RXeGxLU0I3WEc0Z1hIUmNkSFpoY2lCblpYUjBaWElnUFNCdGIyUjFiR1VnSmlZZ2JXOWtkV3hsTGw5ZlpYTk5iMlIxYkdVZ1AxeHVJRngwWEhSY2RHWjFibU4wYVc5dUlHZGxkRVJsWm1GMWJIUW9LU0I3SUhKbGRIVnliaUJ0YjJSMWJHVmJKMlJsWm1GMWJIUW5YVHNnZlNBNlhHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBUVzlrZFd4bFJYaHdiM0owY3lncElIc2djbVYwZFhKdUlHMXZaSFZzWlRzZ2ZUdGNiaUJjZEZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtLR2RsZEhSbGNpd2dKMkVuTENCblpYUjBaWElwTzF4dUlGeDBYSFJ5WlhSMWNtNGdaMlYwZEdWeU8xeHVJRngwZlR0Y2JseHVJRngwTHk4Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c1hHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04Z1BTQm1kVzVqZEdsdmJpaHZZbXBsWTNRc0lIQnliM0JsY25SNUtTQjdJSEpsZEhWeWJpQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29iMkpxWldOMExDQndjbTl3WlhKMGVTazdJSDA3WEc1Y2JpQmNkQzh2SUY5ZmQyVmljR0ZqYTE5d2RXSnNhV05mY0dGMGFGOWZYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuQWdQU0JjSWx3aU8xeHVYRzVjYmlCY2RDOHZJRXh2WVdRZ1pXNTBjbmtnYlc5a2RXeGxJR0Z1WkNCeVpYUjFjbTRnWlhod2IzSjBjMXh1SUZ4MGNtVjBkWEp1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXpJRDBnTUNrN1hHNGlMQ0l2S2lGY2JpQXFJR2hsWVdSeWIyOXRMbXB6SUhZd0xqRXlMakFnTFNCSGFYWmxJSGx2ZFhJZ2NHRm5aU0J6YjIxbElHaGxZV1J5YjI5dExpQklhV1JsSUhsdmRYSWdhR1ZoWkdWeUlIVnVkR2xzSUhsdmRTQnVaV1ZrSUdsMFhHNGdLaUJEYjNCNWNtbG5hSFFnS0dNcElESXdNakFnVG1samF5QlhhV3hzYVdGdGN5QXRJR2gwZEhBNkx5OTNhV05yZVM1dWFXeHNhV0V1YlhNdmFHVmhaSEp2YjIwdWFuTmNiaUFxSUV4cFkyVnVjMlU2SUUxSlZGeHVJQ292WEc1Y2JpaG1kVzVqZEdsdmJpQW9aMnh2WW1Gc0xDQm1ZV04wYjNKNUtTQjdYRzRnSUhSNWNHVnZaaUJsZUhCdmNuUnpJRDA5UFNBbmIySnFaV04wSnlBbUppQjBlWEJsYjJZZ2JXOWtkV3hsSUNFOVBTQW5kVzVrWldacGJtVmtKeUEvSUcxdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm1GamRHOXllU2dwSURwY2JpQWdkSGx3Wlc5bUlHUmxabWx1WlNBOVBUMGdKMloxYm1OMGFXOXVKeUFtSmlCa1pXWnBibVV1WVcxa0lEOGdaR1ZtYVc1bEtHWmhZM1J2Y25rcElEcGNiaUFnS0dkc2IySmhiQ0E5SUdkc2IySmhiQ0I4ZkNCelpXeG1MQ0JuYkc5aVlXd3VTR1ZoWkhKdmIyMGdQU0JtWVdOMGIzSjVLQ2twTzF4dWZTaDBhR2x6TENCbWRXNWpkR2x2YmlBb0tTQjdJQ2QxYzJVZ2MzUnlhV04wSnp0Y2JseHVJQ0JtZFc1amRHbHZiaUJwYzBKeWIzZHpaWElvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJRndpZFc1a1pXWnBibVZrWENJN1hHNGdJSDFjYmx4dUlDQXZLaXBjYmlBZ0lDb2dWWE5sWkNCMGJ5QmtaWFJsWTNRZ1luSnZkM05sY2lCemRYQndiM0owSUdadmNpQmhaR1JwYm1jZ1lXNGdaWFpsYm5RZ2JHbHpkR1Z1WlhJZ2QybDBhQ0J2Y0hScGIyNXpYRzRnSUNBcUlFTnlaV1JwZERvZ2FIUjBjSE02THk5a1pYWmxiRzl3WlhJdWJXOTZhV3hzWVM1dmNtY3ZaVzR0VlZNdlpHOWpjeTlYWldJdlFWQkpMMFYyWlc1MFZHRnlaMlYwTDJGa1pFVjJaVzUwVEdsemRHVnVaWEpjYmlBZ0lDb3ZYRzRnSUdaMWJtTjBhVzl1SUhCaGMzTnBkbVZGZG1WdWRITlRkWEJ3YjNKMFpXUW9LU0I3WEc0Z0lDQWdkbUZ5SUhOMWNIQnZjblJsWkNBOUlHWmhiSE5sTzF4dVhHNGdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lIWmhjaUJ2Y0hScGIyNXpJRDBnZTF4dUlDQWdJQ0FnSUNBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxdVpYaDBMV3hwYm1VZ1oyVjBkR1Z5TFhKbGRIVnlibHh1SUNBZ0lDQWdJQ0JuWlhRZ2NHRnpjMmwyWlNncElIdGNiaUFnSUNBZ0lDQWdJQ0J6ZFhCd2IzSjBaV1FnUFNCMGNuVmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0owWlhOMFhDSXNJRzl3ZEdsdmJuTXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lDQWdkMmx1Wkc5M0xuSmxiVzkyWlVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0owWlhOMFhDSXNJRzl3ZEdsdmJuTXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJQ0FnYzNWd2NHOXlkR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlITjFjSEJ2Y25SbFpEdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR2x6VTNWd2NHOXlkR1ZrS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUFoSVNoY2JpQWdJQ0FnSUdselFuSnZkM05sY2lncElDWW1YRzRnSUNBZ0lDQm1kVzVqZEdsdmJpZ3BJSHQ5TG1KcGJtUWdKaVpjYmlBZ0lDQWdJRndpWTJ4aGMzTk1hWE4wWENJZ2FXNGdaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MElDWW1YRzRnSUNBZ0lDQlBZbXBsWTNRdVlYTnphV2R1SUNZbVhHNGdJQ0FnSUNCUFltcGxZM1F1YTJWNWN5QW1KbHh1SUNBZ0lDQWdjbVZ4ZFdWemRFRnVhVzFoZEdsdmJrWnlZVzFsWEc0Z0lDQWdLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdselJHOWpkVzFsYm5Rb2IySnFLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHOWlhaTV1YjJSbFZIbHdaU0E5UFQwZ09Uc2dMeThnVG05a1pTNUVUME5WVFVWT1ZGOU9UMFJGSUQwOVBTQTVYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJwYzFkcGJtUnZkeWh2WW1vcElIdGNiaUFnSUNBdkx5QmdiMkpxSUQwOVBTQjNhVzVrYjNkZ0lHOXlJR0J2WW1vZ2FXNXpkR0Z1WTJWdlppQlhhVzVrYjNkZ0lHbHpJRzV2ZENCemRXWm1hV05wWlc1MExGeHVJQ0FnSUM4dklHRnpJSFJvWlNCdlltb2diV0Y1SUdKbElIUm9aU0IzYVc1a2IzY2diMllnWVc0Z2FXWnlZVzFsTGx4dUlDQWdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbVJ2WTNWdFpXNTBJQ1ltSUdselJHOWpkVzFsYm5Rb2IySnFMbVJ2WTNWdFpXNTBLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkcGJtUnZkMU5qY205c2JHVnlLSGRwYmlrZ2UxeHVJQ0FnSUhaaGNpQmtiMk1nUFNCM2FXNHVaRzlqZFcxbGJuUTdYRzRnSUNBZ2RtRnlJR0p2WkhrZ1BTQmtiMk11WW05a2VUdGNiaUFnSUNCMllYSWdhSFJ0YkNBOUlHUnZZeTVrYjJOMWJXVnVkRVZzWlcxbGJuUTdYRzVjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdLaUJBYzJWbElHaDBkSEE2THk5cVlXMWxjeTV3WVdSdmJITmxlUzVqYjIwdmFtRjJZWE5qY21sd2RDOW5aWFF0Wkc5amRXMWxiblF0YUdWcFoyaDBMV055YjNOekxXSnliM2R6WlhJdlhHNGdJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlIUm9aU0J6WTNKdmJHd2dhR1ZwWjJoMElHOW1JSFJvWlNCa2IyTjFiV1Z1ZENCcGJpQndhWGhsYkhOY2JpQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ2MyTnliMnhzU0dWcFoyaDBPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUUxaGRHZ3ViV0Y0S0Z4dUlDQWdJQ0FnSUNBZ0lHSnZaSGt1YzJOeWIyeHNTR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQWdJR2gwYld3dWMyTnliMnhzU0dWcFoyaDBMRnh1SUNBZ0lDQWdJQ0FnSUdKdlpIa3ViMlptYzJWMFNHVnBaMmgwTEZ4dUlDQWdJQ0FnSUNBZ0lHaDBiV3d1YjJabWMyVjBTR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQWdJR0p2WkhrdVkyeHBaVzUwU0dWcFoyaDBMRnh1SUNBZ0lDQWdJQ0FnSUdoMGJXd3VZMnhwWlc1MFNHVnBaMmgwWEc0Z0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNCOUxGeHVYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUVCelpXVWdhSFIwY0RvdkwyRnVaSGxzWVc1bmRHOXVMbU52TG5WckwySnNiMmN2WkdWMlpXeHZjRzFsYm5RdloyVjBMWFpwWlhkd2IzSjBMWE5wZW1VdGQybGtkR2d0WVc1a0xXaGxhV2RvZEMxcVlYWmhjMk55YVhCMFhHNGdJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlIUm9aU0JvWldsbmFIUWdiMllnZEdobElIWnBaWGR3YjNKMElHbHVJSEJwZUdWc2MxeHVJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQm9aV2xuYUhRNklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkMmx1TG1sdWJtVnlTR1ZwWjJoMElIeDhJR2gwYld3dVkyeHBaVzUwU0dWcFoyaDBJSHg4SUdKdlpIa3VZMnhwWlc1MFNHVnBaMmgwTzF4dUlDQWdJQ0FnZlN4Y2JseHVJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdLaUJIWlhSeklIUm9aU0JaSUhOamNtOXNiQ0J3YjNOcGRHbHZibHh1SUNBZ0lDQWdJQ29nUUhKbGRIVnliaUI3VG5WdFltVnlmU0J3YVhobGJITWdkR2hsSUhCaFoyVWdhR0Z6SUhOamNtOXNiR1ZrSUdGc2IyNW5JSFJvWlNCWkxXRjRhWE5jYmlBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnYzJOeWIyeHNXVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gzYVc0dWNHRm5aVmxQWm1aelpYUWdJVDA5SUhWdVpHVm1hVzVsWkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjNhVzR1Y0dGblpWbFBabVp6WlhRN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdLR2gwYld3Z2ZId2dZbTlrZVM1d1lYSmxiblJPYjJSbElIeDhJR0p2WkhrcExuTmpjbTlzYkZSdmNEdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaV3hsYldWdWRGTmpjbTlzYkdWeUtHVnNaVzFsYm5RcElIdGNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlIUm9aU0J6WTNKdmJHd2dhR1ZwWjJoMElHOW1JSFJvWlNCbGJHVnRaVzUwSUdsdUlIQnBlR1ZzYzF4dUlDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNCelkzSnZiR3hJWldsbmFIUTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnVFdGMGFDNXRZWGdvWEc0Z0lDQWdJQ0FnSUNBZ1pXeGxiV1Z1ZEM1elkzSnZiR3hJWldsbmFIUXNYRzRnSUNBZ0lDQWdJQ0FnWld4bGJXVnVkQzV2Wm1aelpYUklaV2xuYUhRc1hHNGdJQ0FnSUNBZ0lDQWdaV3hsYldWdWRDNWpiR2xsYm5SSVpXbG5hSFJjYmlBZ0lDQWdJQ0FnS1R0Y2JpQWdJQ0FnSUgwc1hHNWNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nUUhKbGRIVnliaUI3VG5WdFltVnlmU0IwYUdVZ2FHVnBaMmgwSUc5bUlIUm9aU0JsYkdWdFpXNTBJR2x1SUhCcGVHVnNjMXh1SUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0JvWldsbmFIUTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnVFdGMGFDNXRZWGdvWld4bGJXVnVkQzV2Wm1aelpYUklaV2xuYUhRc0lHVnNaVzFsYm5RdVkyeHBaVzUwU0dWcFoyaDBLVHRjYmlBZ0lDQWdJSDBzWEc1Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dSMlYwY3lCMGFHVWdXU0J6WTNKdmJHd2djRzl6YVhScGIyNWNiaUFnSUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMDUxYldKbGNuMGdjR2w0Wld4eklIUm9aU0JsYkdWdFpXNTBJR2hoY3lCelkzSnZiR3hsWkNCaGJHOXVaeUIwYUdVZ1dTMWhlR2x6WEc0Z0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUhOamNtOXNiRms2SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1pXeGxiV1Z1ZEM1elkzSnZiR3hVYjNBN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHTnlaV0YwWlZOamNtOXNiR1Z5S0dWc1pXMWxiblFwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdhWE5YYVc1a2IzY29aV3hsYldWdWRDa2dQeUIzYVc1a2IzZFRZM0p2Ykd4bGNpaGxiR1Z0Wlc1MEtTQTZJR1ZzWlcxbGJuUlRZM0p2Ykd4bGNpaGxiR1Z0Wlc1MEtUdGNiaUFnZlZ4dVhHNGdJQzhxS2x4dUlDQWdLaUJBY0dGeVlXMGdaV3hsYldWdWRDQkZkbVZ1ZEZSaGNtZGxkRnh1SUNBZ0tpOWNiaUFnWm5WdVkzUnBiMjRnZEhKaFkydFRZM0p2Ykd3b1pXeGxiV1Z1ZEN3Z2IzQjBhVzl1Y3l3Z1kyRnNiR0poWTJzcElIdGNiaUFnSUNCMllYSWdhWE5RWVhOemFYWmxVM1Z3Y0c5eWRHVmtJRDBnY0dGemMybDJaVVYyWlc1MGMxTjFjSEJ2Y25SbFpDZ3BPMXh1SUNBZ0lIWmhjaUJ5WVdaSlpEdGNiaUFnSUNCMllYSWdjMk55YjJ4c1pXUWdQU0JtWVd4elpUdGNiaUFnSUNCMllYSWdjMk55YjJ4c1pYSWdQU0JqY21WaGRHVlRZM0p2Ykd4bGNpaGxiR1Z0Wlc1MEtUdGNiaUFnSUNCMllYSWdiR0Z6ZEZOamNtOXNiRmtnUFNCelkzSnZiR3hsY2k1elkzSnZiR3haS0NrN1hHNGdJQ0FnZG1GeUlHUmxkR0ZwYkhNZ1BTQjdmVHRjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSFZ3WkdGMFpTZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCelkzSnZiR3haSUQwZ1RXRjBhQzV5YjNWdVpDaHpZM0p2Ykd4bGNpNXpZM0p2Ykd4WktDa3BPMXh1SUNBZ0lDQWdkbUZ5SUdobGFXZG9kQ0E5SUhOamNtOXNiR1Z5TG1obGFXZG9kQ2dwTzF4dUlDQWdJQ0FnZG1GeUlITmpjbTlzYkVobGFXZG9kQ0E5SUhOamNtOXNiR1Z5TG5OamNtOXNiRWhsYVdkb2RDZ3BPMXh1WEc0Z0lDQWdJQ0F2THlCeVpYVnpaU0J2WW1wbFkzUWdabTl5SUd4bGMzTWdiV1Z0YjNKNUlHTm9kWEp1WEc0Z0lDQWdJQ0JrWlhSaGFXeHpMbk5qY205c2JGa2dQU0J6WTNKdmJHeFpPMXh1SUNBZ0lDQWdaR1YwWVdsc2N5NXNZWE4wVTJOeWIyeHNXU0E5SUd4aGMzUlRZM0p2Ykd4Wk8xeHVJQ0FnSUNBZ1pHVjBZV2xzY3k1a2FYSmxZM1JwYjI0Z1BTQnpZM0p2Ykd4WklENGdiR0Z6ZEZOamNtOXNiRmtnUHlCY0ltUnZkMjVjSWlBNklGd2lkWEJjSWp0Y2JpQWdJQ0FnSUdSbGRHRnBiSE11WkdsemRHRnVZMlVnUFNCTllYUm9MbUZpY3loelkzSnZiR3haSUMwZ2JHRnpkRk5qY205c2JGa3BPMXh1SUNBZ0lDQWdaR1YwWVdsc2N5NXBjMDkxZEU5bVFtOTFibVJ6SUQwZ2MyTnliMnhzV1NBOElEQWdmSHdnYzJOeWIyeHNXU0FySUdobGFXZG9kQ0ErSUhOamNtOXNiRWhsYVdkb2REdGNiaUFnSUNBZ0lHUmxkR0ZwYkhNdWRHOXdJRDBnYzJOeWIyeHNXU0E4UFNCdmNIUnBiMjV6TG05bVpuTmxkRnRrWlhSaGFXeHpMbVJwY21WamRHbHZibDA3WEc0Z0lDQWdJQ0JrWlhSaGFXeHpMbUp2ZEhSdmJTQTlJSE5qY205c2JGa2dLeUJvWldsbmFIUWdQajBnYzJOeWIyeHNTR1ZwWjJoME8xeHVJQ0FnSUNBZ1pHVjBZV2xzY3k1MGIyeGxjbUZ1WTJWRmVHTmxaV1JsWkNBOVhHNGdJQ0FnSUNBZ0lHUmxkR0ZwYkhNdVpHbHpkR0Z1WTJVZ1BpQnZjSFJwYjI1ekxuUnZiR1Z5WVc1alpWdGtaWFJoYVd4ekxtUnBjbVZqZEdsdmJsMDdYRzVjYmlBZ0lDQWdJR05oYkd4aVlXTnJLR1JsZEdGcGJITXBPMXh1WEc0Z0lDQWdJQ0JzWVhOMFUyTnliMnhzV1NBOUlITmpjbTlzYkZrN1hHNGdJQ0FnSUNCelkzSnZiR3hsWkNBOUlHWmhiSE5sTzF4dUlDQWdJSDFjYmx4dUlDQWdJR1oxYm1OMGFXOXVJR2hoYm1Sc1pWTmpjbTlzYkNncElIdGNiaUFnSUNBZ0lHbG1JQ2doYzJOeWIyeHNaV1FwSUh0Y2JpQWdJQ0FnSUNBZ2MyTnliMnhzWldRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNCeVlXWkpaQ0E5SUhKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTaDFjR1JoZEdVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUhaaGNpQmxkbVZ1ZEU5d2RHbHZibk1nUFNCcGMxQmhjM05wZG1WVGRYQndiM0owWldSY2JpQWdJQ0FnSUQ4Z2V5QndZWE56YVhabE9pQjBjblZsTENCallYQjBkWEpsT2lCbVlXeHpaU0I5WEc0Z0lDQWdJQ0E2SUdaaGJITmxPMXh1WEc0Z0lDQWdaV3hsYldWdWRDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2ljMk55YjJ4c1hDSXNJR2hoYm1Sc1pWTmpjbTlzYkN3Z1pYWmxiblJQY0hScGIyNXpLVHRjYmlBZ0lDQjFjR1JoZEdVb0tUdGNibHh1SUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNCa1pYTjBjbTk1T2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdZMkZ1WTJWc1FXNXBiV0YwYVc5dVJuSmhiV1VvY21GbVNXUXBPMXh1SUNBZ0lDQWdJQ0JsYkdWdFpXNTBMbkpsYlc5MlpVVjJaVzUwVEdsemRHVnVaWElvWENKelkzSnZiR3hjSWl3Z2FHRnVaR3hsVTJOeWIyeHNMQ0JsZG1WdWRFOXdkR2x2Ym5NcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnViM0p0WVd4cGVtVlZjRVJ2ZDI0b2RDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMElEMDlQU0JQWW1wbFkzUW9kQ2tnUHlCMElEb2dleUJrYjNkdU9pQjBMQ0IxY0RvZ2RDQjlPMXh1SUNCOVhHNWNiaUFnTHlvcVhHNGdJQ0FxSUZWSklHVnVhR0Z1WTJWdFpXNTBJR1p2Y2lCbWFYaGxaQ0JvWldGa1pYSnpMbHh1SUNBZ0tpQklhV1JsY3lCb1pXRmtaWElnZDJobGJpQnpZM0p2Ykd4cGJtY2daRzkzYmx4dUlDQWdLaUJUYUc5M2N5Qm9aV0ZrWlhJZ2QyaGxiaUJ6WTNKdmJHeHBibWNnZFhCY2JpQWdJQ29nUUdOdmJuTjBjblZqZEc5eVhHNGdJQ0FxSUVCd1lYSmhiU0I3UkU5TlJXeGxiV1Z1ZEgwZ1pXeGxiU0IwYUdVZ2FHVmhaR1Z5SUdWc1pXMWxiblJjYmlBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOXdkR2x2Ym5NZ2IzQjBhVzl1Y3lCbWIzSWdkR2hsSUhkcFpHZGxkRnh1SUNBZ0tpOWNiaUFnWm5WdVkzUnBiMjRnU0dWaFpISnZiMjBvWld4bGJTd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lHOXdkR2x2Ym5NZ1BTQnZjSFJwYjI1eklIeDhJSHQ5TzF4dUlDQWdJRTlpYW1WamRDNWhjM05wWjI0b2RHaHBjeXdnU0dWaFpISnZiMjB1YjNCMGFXOXVjeXdnYjNCMGFXOXVjeWs3WEc0Z0lDQWdkR2hwY3k1amJHRnpjMlZ6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1NHVmhaSEp2YjIwdWIzQjBhVzl1Y3k1amJHRnpjMlZ6TENCdmNIUnBiMjV6TG1Oc1lYTnpaWE1wTzF4dVhHNGdJQ0FnZEdocGN5NWxiR1Z0SUQwZ1pXeGxiVHRjYmlBZ0lDQjBhR2x6TG5SdmJHVnlZVzVqWlNBOUlHNXZjbTFoYkdsNlpWVndSRzkzYmloMGFHbHpMblJ2YkdWeVlXNWpaU2s3WEc0Z0lDQWdkR2hwY3k1dlptWnpaWFFnUFNCdWIzSnRZV3hwZW1WVmNFUnZkMjRvZEdocGN5NXZabVp6WlhRcE8xeHVJQ0FnSUhSb2FYTXVhVzVwZEdsaGJHbHpaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQjBhR2x6TG1aeWIzcGxiaUE5SUdaaGJITmxPMXh1SUNCOVhHNGdJRWhsWVdSeWIyOXRMbkJ5YjNSdmRIbHdaU0E5SUh0Y2JpQWdJQ0JqYjI1emRISjFZM1J2Y2pvZ1NHVmhaSEp2YjIwc1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlRkR0Z5ZENCc2FYTjBaVzVwYm1jZ2RHOGdjMk55YjJ4c2FXNW5YRzRnSUNBZ0lDb2dRSEIxWW14cFkxeHVJQ0FnSUNBcUwxeHVJQ0FnSUdsdWFYUTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tFaGxZV1J5YjI5dExtTjFkSE5VYUdWTmRYTjBZWEprSUNZbUlDRjBhR2x6TG1sdWFYUnBZV3hwYzJWa0tTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVlXUmtRMnhoYzNNb1hDSnBibWwwYVdGc1hDSXBPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtbHVhWFJwWVd4cGMyVmtJRDBnZEhKMVpUdGNibHh1SUNBZ0lDQWdJQ0F2THlCa1pXWmxjaUJsZG1WdWRDQnlaV2RwYzNSeVlYUnBiMjRnZEc4Z2FHRnVaR3hsSUdKeWIzZHpaWEpjYmlBZ0lDQWdJQ0FnTHk4Z2NHOTBaVzUwYVdGc2JIa2djbVZ6ZEc5eWFXNW5JSEJ5WlhacGIzVnpJSE5qY205c2JDQndiM05wZEdsdmJseHVJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLRnh1SUNBZ0lDQWdJQ0FnSUdaMWJtTjBhVzl1S0hObGJHWXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YzJOeWIyeHNWSEpoWTJ0bGNpQTlJSFJ5WVdOclUyTnliMnhzS0Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J6Wld4bUxuTmpjbTlzYkdWeUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCN0lHOW1abk5sZERvZ2MyVnNaaTV2Wm1aelpYUXNJSFJ2YkdWeVlXNWpaVG9nYzJWc1ppNTBiMnhsY21GdVkyVWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWmk1MWNHUmhkR1V1WW1sdVpDaHpaV3htS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJREV3TUN4Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6WEc0Z0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJFWlhOMGNtOTVJSFJvWlNCM2FXUm5aWFFzSUdOc1pXRnlhVzVuSUhWd0lHRm1kR1Z5SUdsMGMyVnNabHh1SUNBZ0lDQXFJRUJ3ZFdKc2FXTmNiaUFnSUNBZ0tpOWNiaUFnSUNCa1pYTjBjbTk1T2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lIUm9hWE11YVc1cGRHbGhiR2x6WldRZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUU5aWFtVmpkQzVyWlhsektIUm9hWE11WTJ4aGMzTmxjeWt1Wm05eVJXRmphQ2gwYUdsekxuSmxiVzkyWlVOc1lYTnpMQ0IwYUdsektUdGNiaUFnSUNBZ0lIUm9hWE11YzJOeWIyeHNWSEpoWTJ0bGNpNWtaWE4wY205NUtDazdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRlZ1Y0dsdUlIUm9aU0JsYkdWdFpXNTBYRzRnSUNBZ0lDb2dRSEIxWW14cFkxeHVJQ0FnSUNBcUwxeHVJQ0FnSUhWdWNHbHVPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TG1oaGMwTnNZWE56S0Z3aWNHbHVibVZrWENJcElIeDhJQ0YwYUdsekxtaGhjME5zWVhOektGd2lkVzV3YVc1dVpXUmNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW5WdWNHbHVibVZrWENJcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGJXOTJaVU5zWVhOektGd2ljR2x1Ym1Wa1hDSXBPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG05dVZXNXdhVzRwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG05dVZXNXdhVzR1WTJGc2JDaDBhR2x6S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlFhVzRnZEdobElHVnNaVzFsYm5SY2JpQWdJQ0FnS2lCQWNIVmliR2xqWEc0Z0lDQWdJQ292WEc0Z0lDQWdjR2x1T2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxtaGhjME5zWVhOektGd2lkVzV3YVc1dVpXUmNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVoWkdSRGJHRnpjeWhjSW5CcGJtNWxaRndpS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WlcxdmRtVkRiR0Z6Y3loY0luVnVjR2x1Ym1Wa1hDSXBPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG05dVVHbHVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTV2YmxCcGJpNWpZV3hzS0hSb2FYTXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVaeVpXVjZaWE1nZEdobElHTjFjbkpsYm5RZ2MzUmhkR1VnYjJZZ2RHaGxJSGRwWkdkbGRGeHVJQ0FnSUNBcUlFQndkV0pzYVdOY2JpQWdJQ0FnS2k5Y2JpQWdJQ0JtY21WbGVtVTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NW1jbTk2Wlc0Z1BTQjBjblZsTzF4dUlDQWdJQ0FnZEdocGN5NWhaR1JEYkdGemN5aGNJbVp5YjNwbGJsd2lLVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVW1VdFpXNWhZbXhsY3lCMGFHVWdaR1ZtWVhWc2RDQmlaV2hoZG1sdmRYSWdiMllnZEdobElIZHBaR2RsZEZ4dUlDQWdJQ0FxSUVCd2RXSnNhV05jYmlBZ0lDQWdLaTljYmlBZ0lDQjFibVp5WldWNlpUb2dablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0IwYUdsekxtWnliM3BsYmlBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnZEdocGN5NXlaVzF2ZG1WRGJHRnpjeWhjSW1aeWIzcGxibHdpS1R0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnZEc5d09pQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGRHaHBjeTVvWVhORGJHRnpjeWhjSW5SdmNGd2lLU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbUZrWkVOc1lYTnpLRndpZEc5d1hDSXBPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuSmxiVzkyWlVOc1lYTnpLRndpYm05MFZHOXdYQ0lwTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxtOXVWRzl3S1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1dmJsUnZjQzVqWVd4c0tIUm9hWE1wTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JseHVJQ0FnSUc1dmRGUnZjRG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWFJvYVhNdWFHRnpRMnhoYzNNb1hDSnViM1JVYjNCY0lpa3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWhaR1JEYkdGemN5aGNJbTV2ZEZSdmNGd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaVzF2ZG1WRGJHRnpjeWhjSW5SdmNGd2lLVHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dmJrNXZkRlJ2Y0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWIyNU9iM1JVYjNBdVkyRnNiQ2gwYUdsektUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNYRzVjYmlBZ0lDQmliM1IwYjIwNklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdhV1lnS0NGMGFHbHpMbWhoYzBOc1lYTnpLRndpWW05MGRHOXRYQ0lwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WVdSa1EyeGhjM01vWENKaWIzUjBiMjFjSWlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y21WdGIzWmxRMnhoYzNNb1hDSnViM1JDYjNSMGIyMWNJaWs3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWIyNUNiM1IwYjIwcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtOXVRbTkwZEc5dExtTmhiR3dvZEdocGN5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdibTkwUW05MGRHOXRPaUJtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUdsbUlDZ2hkR2hwY3k1b1lYTkRiR0Z6Y3loY0ltNXZkRUp2ZEhSdmJWd2lLU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbUZrWkVOc1lYTnpLRndpYm05MFFtOTBkRzl0WENJcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGJXOTJaVU5zWVhOektGd2lZbTkwZEc5dFhDSXBPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG05dVRtOTBRbTkwZEc5dEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXZiazV2ZEVKdmRIUnZiUzVqWVd4c0tIUm9hWE1wTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhOb2IzVnNaRlZ1Y0dsdU9pQm1kVzVqZEdsdmJpaGtaWFJoYVd4ektTQjdYRzRnSUNBZ0lDQjJZWElnYzJOeWIyeHNhVzVuUkc5M2JpQTlJR1JsZEdGcGJITXVaR2x5WldOMGFXOXVJRDA5UFNCY0ltUnZkMjVjSWp0Y2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUhOamNtOXNiR2x1WjBSdmQyNGdKaVlnSVdSbGRHRnBiSE11ZEc5d0lDWW1JR1JsZEdGcGJITXVkRzlzWlhKaGJtTmxSWGhqWldWa1pXUTdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lITm9iM1ZzWkZCcGJqb2dablZ1WTNScGIyNG9aR1YwWVdsc2N5a2dlMXh1SUNBZ0lDQWdkbUZ5SUhOamNtOXNiR2x1WjFWd0lEMGdaR1YwWVdsc2N5NWthWEpsWTNScGIyNGdQVDA5SUZ3aWRYQmNJanRjYmx4dUlDQWdJQ0FnY21WMGRYSnVJQ2h6WTNKdmJHeHBibWRWY0NBbUppQmtaWFJoYVd4ekxuUnZiR1Z5WVc1alpVVjRZMlZsWkdWa0tTQjhmQ0JrWlhSaGFXeHpMblJ2Y0R0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnWVdSa1EyeGhjM002SUdaMWJtTjBhVzl1S0dOc1lYTnpUbUZ0WlNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVsYkdWdExtTnNZWE56VEdsemRDNWhaR1F1WVhCd2JIa29YRzRnSUNBZ0lDQWdJSFJvYVhNdVpXeGxiUzVqYkdGemMweHBjM1FzWEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMnhoYzNObGMxdGpiR0Z6YzA1aGJXVmRMbk53YkdsMEtGd2lJRndpS1Z4dUlDQWdJQ0FnS1R0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnY21WdGIzWmxRMnhoYzNNNklHWjFibU4wYVc5dUtHTnNZWE56VG1GdFpTa2dlMXh1SUNBZ0lDQWdkR2hwY3k1bGJHVnRMbU5zWVhOelRHbHpkQzV5WlcxdmRtVXVZWEJ3Ykhrb1hHNGdJQ0FnSUNBZ0lIUm9hWE11Wld4bGJTNWpiR0Z6YzB4cGMzUXNYRzRnSUNBZ0lDQWdJSFJvYVhNdVkyeGhjM05sYzF0amJHRnpjMDVoYldWZExuTndiR2wwS0Z3aUlGd2lLVnh1SUNBZ0lDQWdLVHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdhR0Z6UTJ4aGMzTTZJR1oxYm1OMGFXOXVLR05zWVhOelRtRnRaU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVkyeGhjM05sYzF0amJHRnpjMDVoYldWZExuTndiR2wwS0Z3aUlGd2lLUzVsZG1WeWVTaG1kVzVqZEdsdmJpaGpiSE1wSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVZMnhoYzNOTWFYTjBMbU52Ym5SaGFXNXpLR05zY3lrN1hHNGdJQ0FnSUNCOUxDQjBhR2x6TG1Wc1pXMHBPMXh1SUNBZ0lIMHNYRzVjYmlBZ0lDQjFjR1JoZEdVNklHWjFibU4wYVc5dUtHUmxkR0ZwYkhNcElIdGNiaUFnSUNBZ0lHbG1JQ2hrWlhSaGFXeHpMbWx6VDNWMFQyWkNiM1Z1WkhNcElIdGNiaUFnSUNBZ0lDQWdMeThnU1dkdWIzSmxJR0p2ZFc1amVTQnpZM0p2Ykd4cGJtY2dhVzRnVDFOWVhHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLSFJvYVhNdVpuSnZlbVZ1SUQwOVBTQjBjblZsS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLR1JsZEdGcGJITXVkRzl3S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11ZEc5d0tDazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG01dmRGUnZjQ2dwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9aR1YwWVdsc2N5NWliM1IwYjIwcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1aWIzUjBiMjBvS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVibTkwUW05MGRHOXRLQ2s3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TG5Ob2IzVnNaRlZ1Y0dsdUtHUmxkR0ZwYkhNcEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWRXNXdhVzRvS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RHaHBjeTV6YUc5MWJHUlFhVzRvWkdWMFlXbHNjeWtwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV3YVc0b0tUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDA3WEc1Y2JpQWdMeW9xWEc0Z0lDQXFJRVJsWm1GMWJIUWdiM0IwYVc5dWMxeHVJQ0FnS2lCQWRIbHdaU0I3VDJKcVpXTjBmVnh1SUNBZ0tpOWNiaUFnU0dWaFpISnZiMjB1YjNCMGFXOXVjeUE5SUh0Y2JpQWdJQ0IwYjJ4bGNtRnVZMlU2SUh0Y2JpQWdJQ0FnSUhWd09pQXdMRnh1SUNBZ0lDQWdaRzkzYmpvZ01GeHVJQ0FnSUgwc1hHNGdJQ0FnYjJabWMyVjBPaUF3TEZ4dUlDQWdJSE5qY205c2JHVnlPaUJwYzBKeWIzZHpaWElvS1NBL0lIZHBibVJ2ZHlBNklHNTFiR3dzWEc0Z0lDQWdZMnhoYzNObGN6b2dlMXh1SUNBZ0lDQWdabkp2ZW1WdU9pQmNJbWhsWVdSeWIyOXRMUzFtY205NlpXNWNJaXhjYmlBZ0lDQWdJSEJwYm01bFpEb2dYQ0pvWldGa2NtOXZiUzB0Y0dsdWJtVmtYQ0lzWEc0Z0lDQWdJQ0IxYm5CcGJtNWxaRG9nWENKb1pXRmtjbTl2YlMwdGRXNXdhVzV1WldSY0lpeGNiaUFnSUNBZ0lIUnZjRG9nWENKb1pXRmtjbTl2YlMwdGRHOXdYQ0lzWEc0Z0lDQWdJQ0J1YjNSVWIzQTZJRndpYUdWaFpISnZiMjB0TFc1dmRDMTBiM0JjSWl4Y2JpQWdJQ0FnSUdKdmRIUnZiVG9nWENKb1pXRmtjbTl2YlMwdFltOTBkRzl0WENJc1hHNGdJQ0FnSUNCdWIzUkNiM1IwYjIwNklGd2lhR1ZoWkhKdmIyMHRMVzV2ZEMxaWIzUjBiMjFjSWl4Y2JpQWdJQ0FnSUdsdWFYUnBZV3c2SUZ3aWFHVmhaSEp2YjIxY0lseHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQklaV0ZrY205dmJTNWpkWFJ6VkdobFRYVnpkR0Z5WkNBOUlHbHpVM1Z3Y0c5eWRHVmtLQ2s3WEc1Y2JpQWdjbVYwZFhKdUlFaGxZV1J5YjI5dE8xeHVYRzU5S1NrN1hHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVLRzF2WkhWc1pTa2dlMXh1WEhScFppQW9JVzF2WkhWc1pTNTNaV0p3WVdOclVHOXNlV1pwYkd3cElIdGNibHgwWEhSdGIyUjFiR1V1WkdWd2NtVmpZWFJsSUQwZ1puVnVZM1JwYjI0b0tTQjdmVHRjYmx4MFhIUnRiMlIxYkdVdWNHRjBhSE1nUFNCYlhUdGNibHgwWEhRdkx5QnRiMlIxYkdVdWNHRnlaVzUwSUQwZ2RXNWtaV1pwYm1Wa0lHSjVJR1JsWm1GMWJIUmNibHgwWEhScFppQW9JVzF2WkhWc1pTNWphR2xzWkhKbGJpa2diVzlrZFd4bExtTm9hV3hrY21WdUlEMGdXMTA3WEc1Y2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0cxdlpIVnNaU3dnWENKc2IyRmtaV1JjSWl3Z2UxeHVYSFJjZEZ4MFpXNTFiV1Z5WVdKc1pUb2dkSEoxWlN4Y2JseDBYSFJjZEdkbGREb2dablZ1WTNScGIyNG9LU0I3WEc1Y2RGeDBYSFJjZEhKbGRIVnliaUJ0YjJSMWJHVXViRHRjYmx4MFhIUmNkSDFjYmx4MFhIUjlLVHRjYmx4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvYlc5a2RXeGxMQ0JjSW1sa1hDSXNJSHRjYmx4MFhIUmNkR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNYRzVjZEZ4MFhIUm5aWFE2SUdaMWJtTjBhVzl1S0NrZ2UxeHVYSFJjZEZ4MFhIUnlaWFIxY200Z2JXOWtkV3hsTG1rN1hHNWNkRngwWEhSOVhHNWNkRngwZlNrN1hHNWNkRngwYlc5a2RXeGxMbmRsWW5CaFkydFFiMng1Wm1sc2JDQTlJREU3WEc1Y2RIMWNibHgwY21WMGRYSnVJRzF2WkhWc1pUdGNibjA3WEc0aUxDSmpiMjV6ZENCd1pXOXdiR1VnUFNCN1hHNGdJRzVoYldVNklDZHdaVzl3YkdVbkxGeHVJQ0JoWjJVNklERXlMRnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdGNiaUFnY0dWdmNHeGxYRzU5SWl3aVkyOXVjM1FnYUdWc2NHVnljeUE5SUhKbGNYVnBjbVVvSnk0dmFHVnNjR1Z5SnlsY2JtTnZibk52YkdVdWJHOW5LR2hsYkhCbGNuTXBYRzVqYjI1emIyeGxMbXh2WnlodGIyUjFiR1VwSWl3aVpYaHdiM0owSUhzZ1pHVm1ZWFZzZENCaGN5QmpkV0psTENCbWIyOHNJR2R5WVhCb0lIMGdabkp2YlNBbkxpOXRlUzF0YjJSMWJHVW5PMXh1WEc1amIyNXpkQ0JoYm5OM1pYSnpJRDBnTkRJN1hHNWNibU52Ym5OMElHZGxkRlJvWlVGdWMzZGxjaUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnY21WMGRYSnVJR0Z1YzNkbGNuTmNibjFjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWjJWMFZHaGxRVzV6ZDJWeU95SXNJbWx0Y0c5eWRDQm5aWFJVYUdWQmJuTjNaWElnWm5KdmJTQmNJaTR2YUdWc2NHVnljMXdpTzF4dWFXMXdiM0owSUdOMVltVXNJSHNnWm05dkxDQm5jbUZ3YUNCOUlHWnliMjBnSnk0dmFHVnNjR1Z5Y3lkY2JseHVZMjl1YzNRZ1lXNXpkMlZ5SUQwZ1oyVjBWR2hsUVc1emQyVnlLQ2s3WEc1amIyNXpkQ0IzYVhwaGNtUWdQU0FuVW1Ga1lXZGhjM1FuTzF4dVhHNWpiMjV6YjJ4bExteHZaeWhnVkdobElHRnVjM2RsY2lCcGN5QWtlMkZ1YzNkbGNuMHNJQ1I3ZDJsNllYSmtmV0FwTzF4dVkyOXVjMjlzWlM1c2IyY29ZM1ZpWlNneUtTbGNibU52Ym5OdmJHVXViRzluS0dadmJ5d2daM0poY0dncElpd2lablZ1WTNScGIyNGdZM1ZpWlNoNEtTQjdYRzRnSUhKbGRIVnliaUI0SUNvZ2VDQXFJSGc3WEc1OVhHNWNibU52Ym5OMElHWnZieUE5SUUxaGRHZ3VVRWtnS3lCTllYUm9MbE5SVWxReU8xeHVYRzVqYjI1emRDQm5jbUZ3YUNBOUlIdGNiaUFnYjNCMGFXOXVjem9nZTF4dVhHNGdJQ0FnWTI5c2IzSTZJQ2QzYUdsMFpTY3NYRzRnSUNBZ2RHaHBZMnR1WlhOek9pQW5NbkI0SjF4dUlDQjlMRnh1SUNCa2NtRjNLQ2tnZTF4dUlDQWdJR052Ym5OdmJHVXViRzluS0NkR2NtOXRJR2R5WVhCb0lHUnlZWGNnWm5WdVkzUnBiMjRuS1Z4dUlDQjlYRzU5WEc1Y2JseHVaWGh3YjNKMElIc2dZM1ZpWlNCaGN5QmtaV1poZFd4MExDQm1iMjhzSUdkeVlYQm9JSDBpTENKcGJYQnZjblFnWlcxcGRFVjJaVzUwSUdaeWIyMGdKeTR2ZFhScGJITXZaVzFwZEVWMlpXNTBKMXh1WEc1bGVIQnZjblFnWTI5dWMzUWdRbWx1SUQwZ0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ1kyOXVjM1FnWkdWbVlYVnNkSE1nUFNCN1hHNGdJQ0FnZEhsd1pUb2dKMnh2WTJGc2MzUnZjbUZuWlNkY2JpQWdmU0JjYmlBZ1hHNGdJR052Ym5OMElFTnZibk4wY25WamRHOXlJRDBnWm5WdVkzUnBiMjRvYTJWNUxDQnZjSFJwYjI1eklEMGdlMzBwSUh0Y2JpQWdJQ0JqYjI1emRDQnpaWFIwYVc1bmN5QTlJRTlpYW1WamRDNWhjM05wWjI0b2UzMHNJR1JsWm1GMWJIUnpMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQlBZbXBsWTNRdVpuSmxaWHBsS0hObGRIUnBibWR6S1R0Y2JpQWdJQ0JjYmlBZ0lDQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkR2xsY3loMGFHbHpMQ0I3WEc0Z0lDQWdJQ0JmYTJWNU9pQjdJSFpoYkhWbE9pQnJaWGtnZlN4Y2JpQWdJQ0FnSUY5elpYUjBhVzVuY3pvZ2V5QjJZV3gxWlRvZ2MyVjBkR2x1WjNNZ2ZWeHVJQ0FnSUgwcE8xeHVJQ0I5TzF4dVhHNGdJRU52Ym5OMGNuVmpkRzl5TG5CeWIzUnZkSGx3WlM1elpYUWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHRjYmlBZ0lDQjNhVzVrYjNkYmRHaHBjeTVmYzJWMGRHbHVaM011ZEhsd1pWMHVjMlYwU1hSbGJTaDBhR2x6TGw5clpYa3NJRXBUVDA0dWMzUnlhVzVuYVdaNUtIWmhiSFZsS1NrN1hHNWNiaUFnSUNCbGJXbDBSWFpsYm5Rb0oySnBianB6WlhRbkxDQjdYRzRnSUNBZ0lDQnJaWGs2SUhSb2FYTXVYMnRsZVN4Y2JpQWdJQ0FnSUhaaGJIVmxPaUIyWVd4MVpWeHVJQ0FnSUgwcFhHNGdJSDFjYmx4dUlDQkRiMjV6ZEhKMVkzUnZjaTV3Y205MGIzUjVjR1V1WjJWMElEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJR052Ym5OMElITmhkbVZrSUQwZ1NsTlBUaTV3WVhKelpTaDNhVzVrYjNkYmRHaHBjeTVmYzJWMGRHbHVaM011ZEhsd1pWMHVaMlYwU1hSbGJTaDBhR2x6TGw5clpYa3BLVHRjYmlBZ0lDQmxiV2wwUlhabGJuUW9KMkpwYmpwblpYUW5MQ0I3WEc0Z0lDQWdJQ0JyWlhrNklIUm9hWE11WDJ0bGVTeGNiaUFnSUNBZ0lIWmhiSFZsT2lCellYWmxaRnh1SUNBZ0lIMHBPMXh1WEc0Z0lDQWdjbVYwZFhKdUlITmhkbVZrTzF4dUlDQjlYRzVjYmlBZ1EyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxMbkpsYlc5MlpTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0IzYVc1a2IzZGJkR2hwY3k1ZmMyVjBkR2x1WjNNdWRIbHdaVjB1Y21WdGIzWmxTWFJsYlNoMGFHbHpMbDlyWlhrcE8xeHVJQ0FnSUdWdGFYUkZkbVZ1ZENnblltbHVPbkpsYlc5MlpTY3NJSHRjYmlBZ0lDQWdJR3RsZVRvZ2RHaHBjeTVmYTJWNVhHNGdJQ0FnZlNrN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z1EyOXVjM1J5ZFdOMGIzSTdYRzU5S1NncE8xeHVYRzVqYjI1emRDQnNiMmNnUFNCbWRXNWpkR2x2YmlBb1pYWmxiblFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvWlhabGJuUXVkSGx3WlN3Z1pYWmxiblF1WkdWMFlXbHNLVHRjYm4xY2JseHVaRzlqZFcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZbWx1T21kbGRDY3NJR3h2WnlrN1hHNWtiMk4xYldWdWRDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGlhVzQ2YzJWMEp5d2diRzluS1R0Y2JtUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oySnBianB5WlcxdmRtVW5MQ0JzYjJjcE8xeHVYRzVjYm1OdmJuTjBJSGRwZW1GeVpDQTlJRzVsZHlCQ2FXNG9KM2RwZW1GeVpDY3NJSHRjYmlBZ2RIbHdaVG9nSjNObGMzTnBiMjVUZEc5eVlXZGxKMXh1ZlNrN1hHNWNibmRwZW1GeVpDNXpaWFFvZTF4dUlDQnVZVzFsT2lBbmJXVnliR2x1Snl4Y2JpQWdjM0JsYkd4ek9pQmJKMVpoYm1semFDY3NJQ2RVWVd4cklIUnZJRUZ1YVcxaGJITW5MQ0FuUkdGdVkybHVaeUJVWldGamRYQnpKMTFjYm4wcFhHNWNibU52Ym5OMElHMWxjbWx1SUQwZ2QybDZZWEprTG1kbGRDZ3BPeUlzSWk4cUtseHVLaUFxSUVSUFRTQk5ZVzVwY0hWc1lYUnBiMjRnVEVsaWNtRnlhV1Z6WEc0cUlERXVJR2gwZEhCek9pOHZjMk55YjJ4c2NtVjJaV0ZzYW5NdWIzSm5MMXh1S2lBeUxpQm9kSFJ3Y3pvdkwzQm9iM1J2YzNkcGNHVXVZMjl0TDF4dUtpQXFJRVJQVFNCdFlXNXBjSFZzWVhScGIyNGdiR2xpY21GeWFXVnpJR2hoZG1VZ2MyOXRaU0IxYm1seGRXVWdZMjl1YzJsa1pYSmhkR2x2Ym5NZ1kyOXRjR0Z5WldRZ2RHOGdkWFJwYkdsMGVTQnNhV0p5WVhKcFpYTXVYRzRxSUNvZ1NHOTNJR05oYmlCM1pTQmpiMjUyWlhKMElIUm9hWE1nYVc1MGJ5QmhJR3hwWW5KaGNubGNiaW9nTVM0Z1NXNXFaV04wYVc1bklHTnZiblJsYm5RZ2FXNTBieUIwYUdVZ1JFOU5YRzRxSURJdUlFeHBjM1JsYm1sdVp5Qm1iM0lnWlhabGJuUnpYRzRxSURNdUlFRmtaR2x1WnlCdmNIUnBiMjV6SUdGdVpDQnpaWFIwYVc1bmMxeHVLaUEwTGlCRmVIQnZjMmx1WnlCd2RXSnNhV01nYldWMGFHOWtjMXh1S2lBMUxpQkVaWE4wY205NWFXNW5JSFJvWlNCcGJuTjBZVzUwYVdGMGFXOXVYRzRnS2k5Y2JseHVLR1oxYm1OMGFXOXVLQ2tnZTF4dVhIUXZMeUJIWlhRZ2RHaGxJR1ZzWlcxbGJuUmNibHgwWTI5dWMzUWdhVzVwZENBOUlDQm1kVzVqZEdsdmJpZ3BJSHRjYmx4MFhIUnNaWFFnWld4bGJTQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5TmxaMmNuS1R0Y2JseDBYSFJzWlhRZ2MyTmhiR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lGeHVYSFJjZEM4dklFTnlaV0YwWlNCaWRYUjBiMjVjYmx4MFhIUnNaWFFnWW5SdUlEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENnblluVjBkRzl1SnlrN1hHNWNkRngwWW5SdUxtbHVibVZ5U0ZSTlRDQTlJQ2Z3bjZXYUp6dGNibHgwWEhSaWRHNHVjMlYwUVhSMGNtbGlkWFJsS0NkaGNtbGhMV3hoWW1Wc0p5d2dKMk5zYVdOcklHMWxKeWs3WEc1Y2RGeDBZblJ1TG5OMGVXeGxMblJ5WVc1emFYUnBiMjRnUFNBbmRISmhibk5tYjNKdElETXdNRzF6SUdWaGMyVXRhVzRuTzF4dUlDQmNibHgwWEhRdkx5QkpibXBsWTNRZ2FXNTBieUIwYUdVZ1JFOU5YRzVjZEZ4MFpXeGxiUzVoY0hCbGJtUW9ZblJ1S1R0Y2JpQWdYRzVjZEZ4MEx5b3FYRzRnSUNBZ0lDb2dTR0Z1Wkd4bElHTnNhV05ySUdWMlpXNTBjMXh1SUNBZ0lDQXFMMXh1WEhSY2RHWjFibU4wYVc5dUlIUnZaMmRzWlNBb0tTQjdYRzVjZEZ4MFhIUXZMeUJKWmlCMGFHVWdZblYwZEc5dUlHbHpJSE5qWVd4bFpDd2djMmh5YVc1cklHbDBYRzVjZEZ4MFhIUXZMeUJQZEdobGNuZHBjMlVzSUdkeWIzY2dhWFJjYmx4MFhIUmNkR0owYmk1emRIbHNaUzUwY21GdWMyWnZjbTBnUFNCelkyRnNaV1FnUHlBbkp5QTZJQ2R6WTJGc1pTZ3lLU2M3WEc0Z0lGeHVYSFJjZEZ4MEx5OGdSbXhwY0NCMGFHVWdjMk5oYkdWa0lITjBZWFJsWEc1Y2RGeDBYSFJ6WTJGc1pXUWdQU0FoYzJOaGJHVmtPMXh1WEhSY2RIMWNiaUFnWEc1Y2RGeDBMeThnVEdsemRHVnVJR1p2Y2lCamJHbGphM01nYjI0Z2RHaGxJR0oxZEhSdmJseHVYSFJjZEdKMGJpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lIUnZaMmRzWlNrN1hHNWNkSDA3WEc0Z0lGeHVYSFJ5WlhSMWNtNGdleUJwYm1sMElIMDdYRzU5S1NncE8xeHVYRzR2THlCbFoyY3VhVzVwZENncFhHNWNiaTh2SUNvZ1JFOU5JRzFoYm1sd2RXeGhkR2x2YmlCc2FXSnlZWEpwWlhNZ2RHaGhkQ0JoWkdRZ1kyOXVkR1Z1ZENCMGJ5QjBhR1VnVlVsY2JpOHZJSFZ6ZFdGc2JIa2dkR0ZyWlNCdmJtVWdiMllnZEhkdklHRndjSEp2WVdOb1pYTTZYRzR2THlBeExpQkpibXBsWTNRZ2FYUWdiMjRnYVc1emRHRnVkR2xoZEdsdmJseHVMeThnTWk0Z1NHRjJaU0JoYmlCbGVIQnNhV05wZENCcGJtbDBLQ2tnYldWMGFHOWtYRzVjYmk4dklDb2dUMjVsSUc5bUlIUm9aU0IxYm1seGRXVWdZMmhoYkd4bGJtZGxjeUIzYVhSb0lIUm9aU0JqYjI1emRISjFZM1J2Y2lCd1lYUjBaWEp1SUdGdVpDQkVUMDFjYmk4dklDb2diV0Z1YVhCMWJHRjBhVzl1SUd4cFluSmhjbWxsY3lCcGN5QjBhR0YwSUhSb1pTQmpZV3hzWW1GamF5Qm1kVzVqZEdsdmJpQnBiaUIwYUdVZ1hHNHZMeUFxSUdWMlpXNTBJR3hwYzNSbGJtVnlJRzVsWldSeklIUnZJR3R1YjNjZ2MyOXRaU0IxYm1seGRXVWdjSEp2Y0dWeWRHbGxjeUJtY205dElHVmhZMmdnWEc0dkx5QXFJSE53WldOcFptbGpJR2x1YzNSaGJtTmxYRzVjYmk4dklDb2dRV1JrSUdFZ2NIVmliR2xqSUhSdloyZHNaU2dwSUcxbGRHaHZaRnh1WEc0dkx5QXFJRVJsYzNSeWIzbHBibWNnWVc0Z2FXNXpkR0Z1ZEdsaGRHbHZibHh1THk4Z01TNGdWR2hwY3lCMGVYQnBZMkZzYkhrZ2FXNTJiMngyWlhNZ2NtVnRiM1pwYm1jZ1lXNTVJR0ZrWkdWa0lFUlBUVnh1THk4Z0lDQWdaV3hsYldWdWRITWdZVzVrSUhOMGIzQndhVzVuSUdGdWVTQmxkbVZ1ZENCc2FYTjBaVzVsY25NdUlGeHVMeThnTWk0Z1FTQmpiMjF0YjI0Z1kyOXVkbVZ1ZEdsdmJpQnBjeUIwYnlCbGVIQnZjMlVnWVNCa1pYTjBjbTk1S0NrZ2JXVjBhRzlrSUhSdklHUnZJSFJvWVhRdVhHNHZMeUF6TGlCU1pXMXZkbVVnWVc0Z1pYWmxiblFnYkdsemRHVnVaWElnWTJGc2JHSmhZMnNnYVcxdFpXUnBZWFJsYkhsY2JseHViR1YwSUVWblp5QTlJQ2htZFc1amRHbHZiaUFvS1NCN1hHNWNibHgwWTI5dWMzUWdaR1ZtWVhWc2RITWdQU0I3WEc1Y2RGeDBiR0ZpWld3NklDZGpiR2xqYXlCdFpTY3NYRzVjZEZ4MFluUnVWR1Y0ZERvZ0ovQ2ZwWm9uTEZ4dVhIUmNkSFJ5WVc1emFYUnBiMjQ2SUNkMGNtRnVjMlp2Y20wZ016QXdiWE1nWldGelpTMXBiaWNzWEc1Y2RGeDBjMk5oYkdVNklDY3lKMXh1WEhSOU8xeHVYRzVjZEdaMWJtTjBhVzl1SUdOeVpXRjBaVUowYmlBb1pXeGxiU3dnYzJWMGRHbHVaM01wSUh0Y2JseDBYSFJzWlhRZ1luUnVJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25ZblYwZEc5dUp5azdYRzVjZEZ4MFluUnVMbWx1Ym1WeVNGUk5UQ0E5SUhObGRIUnBibWR6TG1KMGJsUmxlSFE3WEc1Y2JseDBYSFJwWmlBb2MyVjBkR2x1WjNNdWJHRmlaV3dwSUh0Y2JseDBYSFJjZEdKMGJpNXpaWFJCZEhSeWFXSjFkR1VvSjJGeWFXRXRiR0ZpWld3bkxDQnpaWFIwYVc1bmN5NXNZV0psYkNrN1hHNWNkRngwZlZ4dVhIUmNkR2xtSUNoelpYUjBhVzVuY3k1MGNtRnVjMmwwYVc5dUtTQjdYRzVjZEZ4MFhIUmlkRzR1YzNSNWJHVXVkSEpoYm5OcGRHbHZiaUE5SUhObGRIUnBibWR6TG5SeVlXNXphWFJwYjI0N1hHNWNkRngwZlZ4dVhHNWNkRngwWld4bGJTNWhjSEJsYm1Rb1luUnVLVHRjYmx4dVhIUmNkSEpsZEhWeWJpQmlkRzQ3WEc1Y2RIMWNibHh1WEhSbWRXNWpkR2x2YmlCMGIyZG5iR1ZDZEc0Z0tHbHVjM1JoYm1ObEtTQjdYRzVjZEZ4MEx5OGdTV1lnZEdobElHSjFkSFJ2YmlCcGN5QnpZMkZzWldRc0lITm9jbWx1YXlCcGRGeHVYSFJjZEM4dklFOTBhR1Z5ZDJselpTd2daM0p2ZHlCcGRGeHVYSFJjZEdsdWMzUmhibU5sTGw5aWRHNHVjM1I1YkdVdWRISmhibk5tYjNKdElEMGdhVzV6ZEdGdVkyVXVYM05qWVd4bFpDQS9JQ2NuSURvZ1lITmpZV3hsS0NSN2FXNXpkR0Z1WTJVdVgzTmxkSFJwYm1kekxuTmpZV3hsZlNsZ08xeHVYRzVjZEZ4MEx5OGdSbXhwY0NCMGFHVWdjMk5oYkdWa0lITjBZWFJsWEc1Y2RGeDBhVzV6ZEdGdVkyVXVYM05qWVd4bFpDQTlJQ0ZwYm5OMFlXNWpaUzVmYzJOaGJHVmtPMXh1WEhSOVhHNWNibHgwWm5WdVkzUnBiMjRnWTNKbFlYUmxSWFpsYm5STWFYTjBaVzVsY2loaWRHNHNJR2x1YzNSaGJtTmxLU0I3WEc1Y2RGeDBablZ1WTNScGIyNGdkRzluWjJ4bEtDa2dlMXh1WEhSY2RGeDBkRzluWjJ4bFFuUnVLR2x1YzNSaGJtTmxLVHRjYmx4MFhIUjlYRzVjZEZ4MFluUnVMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2dkRzluWjJ4bEtUdGNibHh1WEhSY2RISmxkSFZ5YmlCMGIyZG5iR1U3WEc1Y2RIMWNibHh1WEhSbWRXNWpkR2x2YmlCRGIyNXpkSEoxWTNSdmNpQW9jMlZzWldOMGIzSXNJRzl3ZEdsdmJuTWdQU0I3ZlNrZ2UxeHVYSFJjZEdOdmJuTjBJR1ZzWlcwZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0hObGJHVmpkRzl5S1R0Y2JseHVYSFJjZEdOdmJuTjBJSE5sZEhScGJtZHpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnWkdWbVlYVnNkSE1zSUc5d2RHbHZibk1wTzF4dVhIUmNkRTlpYW1WamRDNW1jbVZsZW1Vb2MyVjBkR2x1WjNNcE8xeHVYRzVjZEZ4MFkyOXVjM1FnWW5SdUlEMGdZM0psWVhSbFFuUnVLR1ZzWlcwc0lITmxkSFJwYm1kektUdGNiaUFnSUNCY2JseDBYSFF2THlCRGNtVmhkR1VnZEdobElHVjJaVzUwSUd4cGMzUmxibVZ5WEc1Y2RGeDBZMjl1YzNRZ2JHbHpkR1Z1WlhJZ1BTQmpjbVZoZEdWRmRtVnVkRXhwYzNSbGJtVnlLR0owYml3Z2RHaHBjeWs3WEc1Y2JseDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEdsbGN5aDBhR2x6TENCN1hHNWNkRngwWEhSZlpXeGxiVG9nZXlCMllXeDFaVG9nWld4bGJTQjlMRnh1WEhSY2RGeDBYM05sZEhScGJtZHpPaUI3ZG1Gc2RXVTZJSE5sZEhScGJtZHpmU3hjYmx4MFhIUmNkRjlpZEc0NklIc2dkbUZzZFdVNklHSjBibjBzWEc1Y2RGeDBYSFJmYkdsemRHVnVaWEk2SUhzZ2RtRnNkV1U2SUd4cGMzUmxibVZ5SUgwc1hHNWNkRngwWEhSZmMyTmhiR1ZrT2lCN0lIWmhiSFZsT2lCbVlXeHpaU3dnZDNKcGRHRmliR1U2SUhSeWRXVWdmVnh1WEhSY2RIMHBPMXh1WEhSOVhHNWNibHgwUTI5dWMzUnlkV04wYjNJdWNISnZkRzkwZVhCbExuUnZaMmRzWlNBOUlHWjFibU4wYVc5dUlDZ3BJSHNnSUZ4dVhIUmNkSFJ2WjJkc1pVSjBiaWgwYUdsektUdGNibHgwZlR0Y2JseHVYSFF2S2lwY2JpQWdJQ29nUkdWemRISnZlU0IwYUdseklHbHVjM1JoYm1ObFhHNGdJQ0FxTDF4dVhHNWNkRU52Ym5OMGNuVmpkRzl5TG5CeWIzUnZkSGx3WlM1a1pYTjBjbTk1SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1WEhSY2RDOHZJRkpsYlc5MlpTQjBhR1VnWlhabGJuUWdiR2x6ZEdWdVpYSWdhVzF0WldScFlYUmxiSGxjYmx4MFhIUjBhR2x6TGw5aWRHNHVjbVZ0YjNabFJYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0IwYUdsekxsOXNhWE4wWlc1bGNpazdYRzVjYmx4MFhIUXZMeUJTWlcxdmRtVWdkR2hsSUdKMWRIUnZibHh1WEhSY2RIUm9hWE11WDJKMGJpNXlaVzF2ZG1Vb0tUdGNibHgwZlR0Y2JseHVYSFJ5WlhSMWNtNGdRMjl1YzNSeWRXTjBiM0k3WEc1OUtTZ3BPMXh1WEc1amIyNXpkQ0JsWjJjeElEMGdibVYzSUVWblp5Z25JMlZuWnljcE8xeHVaV2RuTVM1MGIyZG5iR1VvS1R0Y2JtTnZibk4wSUhCaGNuUjVJRDBnYm1WM0lFVm5aeWduSTNCaGNuUjVKeXdnZTF4dVhIUmlkRzVVWlhoME9pQW44SitPaVNjc1hHNWNkR3hoWW1Wc09pQW5TWFJjWENkeklIQmhjblI1SUhScGJXVW5MRnh1WEhSelkyRnNaVG9nSnpNblhHNTlLVHRjYmx4dWNHRnlkSGt1WkdWemRISnZlU2dwT3lJc0ltbHRjRzl5ZENCbGJXbDBSWFpsYm5RZ1puSnZiU0FuTGk5MWRHbHNjeTlsYldsMFJYWmxiblFuTzF4dVhHNWpiMjV6ZENCRloyY2dQU0FvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0JzWlhRZ1pHVm1ZWFZzZEhNZ1BTQjdYRzRnSUNBZ2JHRmlaV3c2SUNkamJHbGpheUJ0WlNjc1hHNGdJQ0FnWW5SdVZHVjRkRG9nSi9DZnBab25MRnh1SUNBZ0lIUnlZVzV6YVhScGIyNDZJQ2QwY21GdWMyWnZjbTBnTXpBd2JYTWdaV0Z6WlMxcGJpY3NYRzRnSUNBZ2MyTmhiR1U2SUNjeUoxeHVJQ0I5TzF4dVhHNGdJQzhxS2x4dUlDQWdLaUJKYm1wbFkzUWdkR2hsSUdKMWRIUnZiaUJwYm5SdklIUm9aU0JFVDAwZ1hHNGdJQ0FxSUVCd1lYSmhiU0I3VG05a1pYMGdaV3hsYlNCY2JpQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE5sZEhScGJtZHpJRnh1SUNBZ0tpQkFjbVYwZFhKdWN5QWdlMDV2WkdWOVhHNGdJQ0FxTDF4dVhHNGdJR1oxYm1OMGFXOXVJR055WldGMFpVSjBiaUFvWld4bGJTd2djMlYwZEdsdVozTXBJSHRjYmlBZ0lDQmpiMjV6ZENCaWRHNGdQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZGlkWFIwYjI0bktUdGNiaUFnSUNCaWRHNHVhVzV1WlhKSVZFMU1JRDBnYzJWMGRHbHVaM011WW5SdVZHVjRkRHRjYmlBZ0lDQnBaaUFvYzJWMGRHbHVaM011YkdGaVpXd3BJSHRjYmlBZ0lDQWdJR0owYmk1elpYUkJkSFJ5YVdKMWRHVW9KMkZ5YVdFdGJHRmlaV3duTENCelpYUjBhVzVuY3k1c1lXSmxiQ2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0hObGRIUnBibWR6TG5SeVlXNXphWFJwYjI0cElIdGNiaUFnSUNBZ0lHSjBiaTV6ZEhsc1pTNTBjbUZ1YzJsMGFXOXVJRDBnYzJWMGRHbHVaM011ZEhKaGJuTnBkR2x2Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCcGJtcGxZM1FnYVc1MGJ5QjBhR1VnUkU5TlhHNGdJQ0FnWld4bGJTNWhjSEJsYm1Rb1luUnVLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQmlkRzQ3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCMGIyZG5iR1ZDZEc0Z0tHbHVjM1JoYm1ObEtTQjdYRzRnSUNBZ2FXNXpkR0Z1WTJVdVgySjBiaTV6ZEhsc1pTNTBjbUZ1YzJadmNtMGdQU0JwYm5OMFlXNWpaUzVmYzJOaGJHVmtJRDhnSnljZ09pQmdjMk5oYkdVb0pIdHBibk4wWVc1alpTNWZjMlYwZEdsdVozTXVjMk5oYkdWOUtXQTdYRzRnSUNBZ2FXNXpkR0Z1WTJVdVgzTmpZV3hsWkNBOUlDRnBibk4wWVc1alpTNWZjMk5oYkdWa08xeHVJQ0I5WEc1Y2JpQWdMeW9xWEc0Z0lDQXFJRnh1SUNBZ0tpQkFjR0Z5WVcwZ2UwNXZaR1Y5SUdKMGJpQlVhR1VnWW5WMGRHOXVJSFJ2SUdGMGRHRmphQ0IwYUdVZ2JHbHpkR1Z1WlhJZ2RHOWNiaUFnSUNvZ1FIQmhjbUZ0SUh0RGIyNXpkSEoxWTNSdmNuMGdhVzV6ZEdGdVkyVWdJRlJvWlNCamRYSnlaVzUwSUdsdWMzUmhiblJwWVhScGIyNWNiaUFnSUNvdlhHNWNiaUFnWm5WdVkzUnBiMjRnWTNKbFlYUmxSWFpsYm5STWFYTjBaVzVsY2loaWRHNHNJR2x1YzNSaGJtTmxLU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdkRzluWjJ4bEtDa2dlMXh1SUNBZ0lDQWdkRzluWjJ4bFFuUnVLR2x1YzNSaGJtTmxLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQmlkRzR1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0IwYjJkbmJHVXBPMXh1WEc0Z0lDQWdjbVYwZFhKdUlIUnZaMmRzWlR0Y2JpQWdmVnh1WEc0Z0lDOHFLbHh1SUNBZ0tpQmNiaUFnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhObGJHVmpkRzl5SUZSb1pTQnpaV3hsWTNSdmNpQm1iM0lnZEdobElHVnNaVzFsYm5RZ2RHOGdjbVZ1WkdWeUlHbHVkRzljYmlBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOXdkR2x2Ym5NZ0lGVnpaWElnYjNCMGFXOXVjeUJoYm1RZ2MyVjBkR2x1WjNOY2JpQWdJQ292WEc1Y2JpQWdablZ1WTNScGIyNGdRMjl1YzNSeWRXTjBiM0lnS0hObGJHVmpkRzl5TENCdmNIUnBiMjV6SUQwZ2UzMHBJSHRjYmlBZ0lDQmpiMjV6ZENCbGJHVnRJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaHpaV3hsWTNSdmNpazdYRzVjYmlBZ0lDQXZMeUJEY21WaGRHVWdZVzVrSUdaeVpXVjZaU0IwYUdVZ2MyVjBkR2x1WjNNZ2IySnFaV04wWEc0Z0lDQWdiR1YwSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcE8xeHVJQ0FnSUU5aWFtVmpkQzVtY21WbGVtVW9jMlYwZEdsdVozTXBPMXh1WEc0Z0lDQWdMeThnU1c1cVpXTjBJR0VnWW5WMGRHOXVJR2x1ZEc4Z2RHaGxJRVJQVFZ4dUlDQWdJR052Ym5OMElHSjBiaUE5SUdOeVpXRjBaVUowYmlobGJHVnRMQ0J6WlhSMGFXNW5jeWs3WEc1Y2JpQWdJQ0F2THlCRGNtVmhkR1VnZEdobElHVjJaVzUwSUd4cGMzUmxibVZ5WEc0Z0lDQWdZMjl1YzNRZ2JHbHpkR1Z1WlhJZ1BTQmpjbVZoZEdWRmRtVnVkRXhwYzNSbGJtVnlLR0owYml3Z2RHaHBjeWs3WEc1Y2JpQWdJQ0JQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEdsbGN5aDBhR2x6TENCN1hHNGdJQ0FnSUNCZlpXeGxiVG9nZXlCMllXeDFaVG9nWld4bGJTQjlMRnh1SUNBZ0lDQWdYM05sZEhScGJtZHpPaUI3SUhaaGJIVmxPaUJ6WlhSMGFXNW5jeUI5TEZ4dUlDQWdJQ0FnWDNOallXeGxaRG9nZXlCMllXeDFaVG9nWm1Gc2MyVXNJSGR5YVhSaFlteGxPaUIwY25WbElIMHNYRzRnSUNBZ0lDQmZZblJ1T2lCN0lIWmhiSFZsT2lCaWRHNGdmU3hjYmlBZ0lDQWdJRjlzYVhOMFpXNWxjam9nZXlCMllXeDFaVG9nYkdsemRHVnVaWElnZlZ4dUlDQWdJSDBwTzF4dUlDQjlYRzVjYmlBZ1EyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxMblJ2WjJkc1pTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0IwYjJkbmJHVkNkRzRvZEdocGN5azdYRzRnSUgxY2JseHVJQ0JEYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVdVpHVnpkRzl5ZVNBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQjBhR2x6TGw5aWRHNHVjbVZ0YjNabFJYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0IwYUdsekxsOXNhWE4wWlc1bGNpazdYRzRnSUNBZ2RHaHBjeTVmWW5SdUxuSmxiVzkyWlNncE8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlFTnZibk4wY25WamRHOXlPMXh1ZlNrb0tUdGNibHh1WTI5dWMzUWdaV2RuSUQwZ2JtVjNJRVZuWnlnbkkyVm5aeWNwTzF4dVhHNWpiMjV6ZENCd1lYSjBlU0E5SUc1bGR5QkZaMmNvSnlOd1lYSjBlU2NzSUh0Y2JpQWdZblJ1VkdWNGREb2dKL0Nmam9rbkxGeHVJQ0JzWVdKbGJEb2dZRWwwSjNNZ2NHRnlkSGtnZEdsdFpXQXNYRzRnSUhOallXeGxPaUFuTXlkY2JuMHBPMXh1WEc1amIyNXpkQ0JIY21WbGRHbHVaeUE5SUNobWRXNWpkR2x2YmlncElIdGNiaUFnWTI5dWMzUWdaR1ZtWVhWc2RITWdQU0I3WEc0Z0lDQWdaM0psWlhScGJtYzZJQ2Q1YjNVbkxGeHVJQ0FnSUdocFFtVm1iM0psT2lBblNHVnNiRzhuTEZ4dUlDQWdJR2hwUVdaMFpYSTZJQ2NuTEZ4dUlDQWdJR0o1WlVKbFptOXlaVG9nSjBkdmIyUmllV1VuTEZ4dUlDQWdJR0o1WlVGbWRHVnlPaUFuVTJWbElIbGhJSE52YjI0bkxGeHVYRzRnSUNBZ0x5OGdRMkZzYkdKaFkydGNibHh1SUNBZ0lHOXVTR2s2SUdaMWJtTjBhVzl1SUNncElIdDlMRnh1SUNBZ0lHOXVRbmxsT2lCbWRXNWpkR2x2YmlBb0tTQjdmVnh1SUNCOU8xeHVYRzRnSUdaMWJtTjBhVzl1SUVOdmJuTjBjblZqZEc5eUtHNWhiV1VzSUc5d2RHbHZibk1nUFNCN2ZTa2dlMXh1SUNBZ0lHTnZibk4wSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcE8xeHVJQ0FnSUc1aGJXVWdQU0J1WVcxbElEOGdibUZ0WlNBNklITmxkSFJwYm1kekxtZHlaV1YwYVc1bk8xeHVJQ0FnSUU5aWFtVmpkQzVtY21WbGVtVW9jMlYwZEdsdVozTXBPMXh1WEc0Z0lDQWdUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblJwWlhNb2RHaHBjeXdnZTF4dUlDQWdJQ0FnWDI1aGJXVTZJSHNnZG1Gc2RXVTZJRzVoYldVZ2ZTeGNiaUFnSUNBZ0lGOXpaWFIwYVc1bmN6b2dleUIyWVd4MVpUb2djMlYwZEdsdVozTWdmVnh1SUNBZ0lIMHBYRzRnSUgxY2JseHVJQ0JEYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVdWMyRjVTR2tnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0x5OGdSVzFwZENCamRYTjBiMjBnWlhabGJuUmNiaUFnSUNCc1pYUWdZMkZ1WTJWc1pXUWdQU0FoWlcxcGRFVjJaVzUwS0NkbmNtVmxkR2x1WnpwaVpXWnZjbVV0YUdrbkxDQjdYRzRnSUNBZ0lDQnVZVzFsT2lCMGFHbHpMbDl1WVcxbExGeHVJQ0FnSUNBZ1ltVm1iM0psT2lCMGFHbHpMbDl6WlhSMGFXNW5jeTVvYVVKbFptOXlaU3hjYmlBZ0lDQWdJR0ZtZEdWeU9pQjBhR2x6TGw5elpYUjBhVzVuY3k1b2FVRm1kR1Z5WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0JwWmlBb1kyRnVZMlZzWldRcElISmxkSFZ5Ymp0Y2JseHVJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHQWtlM1JvYVhNdVgzTmxkSFJwYm1kekxtaHBRbVZtYjNKbGZTd2dKSHQwYUdsekxsOXVZVzFsZlNBa2UzUm9hWE11WDNObGRIUnBibWR6TG1ocFFXWjBaWEo5WUNrN1hHNGdJQ0FnZEdocGN5NWZjMlYwZEdsdVozTXViMjVJYVNoMGFHbHpMbDl1WVcxbExDQjBhR2x6TGw5elpYUjBhVzVuY3k1b2FVSmxabTl5WlN3Z2RHaHBjeTVmYzJWMGRHbHVaM011YUdsQlpuUmxjaWs3WEc1Y2JpQWdJQ0F2THlCRmJXbDBJR04xYzNSdmJTQmxkbVZ1ZEZ4dUlDQWdJR1Z0YVhSRmRtVnVkQ2duWjNKbFpYUnBibWM2YUdrbkxDQjdYRzRnSUNBZ0lDQnVZVzFsT2lCMGFHbHpMbDl1WVcxbExGeHVJQ0FnSUNBZ1ltVm1iM0psT2lCMGFHbHpMbDl6WlhSMGFXNW5jeTVvYVVKbFptOXlaU3hjYmlBZ0lDQWdJR0ZtZEdWeU9pQjBhR2x6TGw5elpYUjBhVzVuY3k1b2FVRm1kR1Z5WEc0Z0lDQWdmU2xjYmx4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQjlPMXh1WEc0Z0lFTnZibk4wY25WamRHOXlMbkJ5YjNSdmRIbHdaUzV6WVhsSGIyOWtZbmxsSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDOHZJRVZ0YVhRZ1kzVnpkRzl0SUdWMlpXNTBYRzRnSUNBZ2JHVjBJR05oYm1ObGJHVmtJRDBnSVdWdGFYUkZkbVZ1ZENnblozSmxaWFJwYm1jNlltVm1iM0psTFdKNVpTY3NJSHRjYmlBZ0lDQWdJRzVoYldVNklIUm9hWE11WDI1aGJXVXNYRzRnSUNBZ0lDQmlaV1p2Y21VNklIUm9hWE11WDNObGRIUnBibWR6TG1KNVpVSmxabTl5WlN4Y2JpQWdJQ0FnSUdGbWRHVnlPaUIwYUdsekxsOXpaWFIwYVc1bmN5NWllV1ZCWm5SbGNseHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ0x5OGdTV1lnZEdobElHVjJaVzUwSUhkaGN5QmpZVzVqWld4bFpDd2daVzVrWEc0Z0lDQWdhV1lnS0dOaGJtTmxiR1ZrS1NCeVpYUjFjbTQ3WEc1Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloZ0pIdDBhR2x6TGw5elpYUjBhVzVuY3k1aWVXVkNaV1p2Y21WOUlDUjdkR2hwY3k1ZmMyVjBkR2x1WjNNdVlubGxRV1owWlhKOVlDazdYRzRnSUNBZ2RHaHBjeTVmYzJWMGRHbHVaM011YjI1Q2VXVW9kR2hwY3k1ZmJtRnRaU3dnZEdocGN5NWZjMlYwZEdsdVozTXVZbmxsUW1WbWIzSmxMQ0IwYUdsekxsOXpaWFIwYVc1bmN5NWllV1ZCWm5SbGNpazdYRzVjYmlBZ0lDQWdMeThnUlcxcGRDQmpkWE4wYjIwZ1pYWmxiblJjYmlBZ0lDQmxiV2wwUlhabGJuUW9KMmR5WldWMGFXNW5PbUo1WlNjc0lIdGNiaUFnSUNBZ0lHNWhiV1U2SUhSb2FYTXVYMjVoYldVc1hHNGdJQ0FnSUNCaVpXWnZjbVU2SUhSb2FYTXVYM05sZEhScGJtZHpMbUo1WlVKbFptOXlaU3hjYmlBZ0lDQWdJR0ZtZEdWeU9pQjBhR2x6TGw5elpYUjBhVzVuY3k1aWVXVkJablJsY2x4dUlDQWdJSDBwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z1EyOXVjM1J5ZFdOMGIzSTdYRzU5S1NncE8xeHVYRzVqYjI1emRDQnRaWEpzYVc0Z1BTQnVaWGNnUjNKbFpYUnBibWNvSjIxbGNteHBiaWNzSUh0Y2JpQWdiMjVJYVRvZ1puVnVZM1JwYjI0Z0tHNWhiV1VwSUh0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnlodVlXMWxLVHRjYmlBZ0lDQnNaWFFnWVhCd0lEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbkkyRndjQ2NwTzF4dUlDQWdJR0Z3Y0M1MFpYaDBRMjl1ZEdWdWRDQTlJR0JYWld4amIyMWxJRzE1SUdodmJXVXNJQ1I3Ym1GdFpYMWdPMXh1SUNCOUxGeHVJQ0J2YmtKNVpTaHVZVzFsTENCaWVXVkNaV1p2Y21VcElIdGNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGllV1ZDWldadmNtVXNJRzVoYldVcE8xeHVJQ0FnSUd4bGRDQmhjSEFnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2NqWVhCd0p5azdYRzRnSUNBZ1lYQndMbUZ3Y0dWdVpDaGdYRnh5VTJWbElIbHZkU0JzWVhSbGNpd2dKSHR1WVcxbGZXQXBYRzRnSUgxY2JuMHBPMXh1WEc1amIyNXpkQ0JpWlhKc2FXNGdQU0J1WlhjZ1IzSmxaWFJwYm1jb0oySmxjbXhwYmljcE8xeHVaRzlqZFcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25aM0psWlhScGJtYzZhR2tuTENCbWRXNWpkR2x2YmlBb1pYWmxiblFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvWlhabGJuUXBYRzU5S1R0Y2JseHVYRzVrYjJOMWJXVnVkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RuY21WbGRHbHVaenBpZVdVbkxDQm1kVzVqZEdsdmJpQW9aWFpsYm5RcElIdGNiaUFnYkdWMElHRndjQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeU5oY0hBbktUdGNiaUFnWVhCd0xuUmxlSFJEYjI1MFpXNTBJRDBnWVBDZm1JQWdKSHRsZG1WdWRDNWtaWFJoYVd3dWJtRnRaWDFnTzF4dWZTazdJaXdpYVcxd2IzSjBJR1Z0YVhSRmRtVnVkQ0JtY205dElDY3VMM1YwYVd4ekwyVnRhWFJGZG1WdWRDYzdYRzVjYm14bGRDQm5jbVZsZEdsdVozTWdQU0FvWm5WdVkzUnBiMjRnS0NrZ2UxeHVYSFJzWlhRZ2MyVjBkR2x1WjNNZ1BTQjdYRzVjZEZ4MFozSmxaWFJwYm1jNklDZDViM1VuTEZ4dVhIUmNkR2hwUW1WbWIzSmxPaUFuU0dWNWJ5Y3NYRzVjZEZ4MGFHbEJablJsY2pvZ0p5Y3NYRzVjZEZ4MFlubGxRbVZtYjNKbE9pQW5VMlZsSUhsaElHeGhkR1Z5Snl4Y2JseDBYSFJpZVdWQlpuUmxjam9nSjFSaGEyVWdhWFFnWldGemVTNG5JQ0JjYmx4MGZWeHVYRzVjZEdaMWJtTjBhVzl1SUhWd1pHRjBaVk5sZEhScGJtZHpJQ2h2Y0hScGIyNXpJRDBnZTMwcElIdGNibHgwWEhSUFltcGxZM1F1WVhOemFXZHVLSE5sZEhScGJtZHpMQ0J2Y0hScGIyNXpLVnh1WEhSOVhHNWNibHgwWm5WdVkzUnBiMjRnYzJGNVNHa2dLRzVoYldVcElIdGNibHgwWEhSamIyNXpiMnhsTG14dlp5aGNibHgwWEhSY2RDY2xZeVZ6Snl3Z1hHNWNkRngwWEhRblkyOXNiM0k2SUhCcGJtczdabTl1ZEMxemFYcGxPaUF5TlhCNEp5d2dYRzVjZEZ4MFhIUmdKSHR6WlhSMGFXNW5jeTVvYVVKbFptOXlaWDBnSkh0dVlXMWxJRDhnYm1GdFpTQTZJSE5sZEhScGJtZHpMbWR5WldWMGFXNW5mU0FrZTNObGRIUnBibWR6TG1ocFFXWjBaWEo5WUZ4dVhIUmNkQ2xjYmx4MFhIUnlaWFIxY200Z1hHNWNkSDFjYmx4dVhIUm1kVzVqZEdsdmJpQnpZWGxDZVdVZ0tHNWhiV1VwSUh0Y2JseDBYSFJqYjI1emIyeGxMbXh2WnloY2JseDBYSFJjZENjbFl5VnpKeXdnWEc1Y2RGeDBYSFFuWTI5c2IzSTZJSEJwYm1zN1ptOXVkQzF6YVhwbE9pQXlOWEI0Snl3Z1hHNWNkRngwWEhSZ0pIdHpaWFIwYVc1bmN5NWllV1ZDWldadmNtVjlJQ1I3Ym1GdFpTQS9JRzVoYldVZ09pQnpaWFIwYVc1bmN5NW5jbVZsZEdsdVozMGdKSHR6WlhSMGFXNW5jeTVpZVdWQlpuUmxjbjFnWEc1Y2RGeDBLVnh1WEc1Y2RGeDBjbVYwZFhKdUlGeHVYSFI5WEc1Y2JseDBjbVYwZFhKdUlIdGNibHgwWEhSMWNHUmhkR1ZUWlhSMGFXNW5jeXhjYmx4MFhIUnpZWGxJYVN4Y2JseDBYSFJ6WVhsQ2VXVWdJQ0FnWEc1Y2RIMWNibjBwS0NsY2JseHVMeThnWjNKbFpYUnBibWR6TG5Wd1pHRjBaVk5sZEhScGJtZHpLSHRjYmk4dklDQWdaM0psWlhScGJtZHpPaUFuZDI5eWJHUW5YRzR2THlCOUtWeHVYRzR2THlCbmNtVmxkR2x1WjNNdWMyRjVTR2tvSjIxbGNteHBiaWNwTzF4dUx5OGdaM0psWlhScGJtZHpMbk5oZVVKNVpTZ25iVzl5WjJGdUp5azdYRzVjYm14bGRDQkhjbVZsZEdsdVp5QTlJQ2htZFc1amRHbHZiaUFvS1NCN1hHNWNkR052Ym5OMElHUmxabUYxYkhSeklEMGdlMXh1WEhSY2RHZHlaV1YwYVc1bk9pQW5lVzkxSnl4Y2JseDBYSFJvYVVKbFptOXlaVG9nSjBobGVXOG5MRnh1WEhSY2RHaHBRV1owWlhJNklDY25MRnh1WEhSY2RHSjVaVUpsWm05eVpUb2dKMU5sWlNCNVlTQnNZWFJsY2ljc1hHNWNkRngwWW5sbFFXWjBaWEk2SUNkVVlXdGxJR2wwSUdWaGMza3VKeXhjYmx4dVhIUmNkQzh2SUdOaGJHeGlZV05yYzF4dVhIUmNkRzl1U0drNklHWjFibU4wYVc5dUlDZ3BJSHQ5TEZ4dVhIUmNkRzl1UW5sbE9pQm1kVzVqZEdsdmJpQW9LU0I3ZlZ4dVhIUjlYRzVjYmx4MFkyOXVjM1FnUTI5dWMzUnlkV04wYjNJZ1BTQm1kVzVqZEdsdmJpaHVZVzFsTENCdmNIUnBiMjV6SUQwZ2UzMHBJSHRjYmx4MFhIUmpiMjV6ZENCelpYUjBhVzVuY3lBOUlFOWlhbVZqZEM1aGMzTnBaMjRvZTMwc0lHUmxabUYxYkhSekxDQnZjSFJwYjI1ektWeHVYRzVjZEZ4MFQySnFaV04wTG1aeVpXVjZaU2h6WlhSMGFXNW5jeWxjYmx4dVhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowYVdWektIUm9hWE1zSUh0Y2JseDBYSFJjZEY5dVlXMWxPaUI3SUhaaGJIVmxPaUJ1WVcxbElIMHNYRzVjZEZ4MFhIUmZjMlYwZEdsdVozTTZJSHNnZG1Gc2RXVTZJSE5sZEhScGJtZHpJSDFjYmx4MFhIUjlLVnh1WEhSOUlGeHVYRzVjZEVOdmJuTjBjblZqZEc5eUxuQnliM1J2ZEhsd1pTNXpZWGxJYVNBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MFhIUXZMeUJGYldsMElHTjFjM1J2YlNCbGRtVnVkRnh1WEhSY2RHTnZibk4wSUdOaGJtTmxiR1ZrSUQwZ0lXVnRhWFJGZG1WdWRDZ25aM0psWlhScGJtYzZZbVZtYjNKbExXaHBKeXdnZTF4dVhIUmNkRngwYm1GdFpUb2dkR2hwY3k1ZmJtRnRaU3hjYmx4MFhIUmNkR0psWm05eVpUb2dkR2hwY3k1ZmMyVjBkR2x1WjNNdWFHbENaV1p2Y21Vc1hHNWNkRngwWEhSaFpuUmxjam9nZEdocGN5NWZjMlYwZEdsdVozTXVhR2xCWm5SbGNseHVYSFJjZEgwcFhHNWNibHgwWEhRdkx5QkpaaUIwYUdVZ1pYWmxiblFnZDJGeklHTmhibU5sYkdWa0xDQmxibVJjYmx4MFhIUnBaaUFvWTJGdVkyVnNaV1FwSUhKbGRIVnlibHh1WEc1Y2RGeDBZMjl1YzI5c1pTNXNiMmNvWEc1Y2RGeDBYSFFuSldNbGN5Y3NJRnh1WEhSY2RGeDBKMk52Ykc5eU9pQndhVzVyTzJadmJuUXRjMmw2WlRvZ01qVndlQ2NzSUZ4dVhIUmNkRngwWUNSN2RHaHBjeTVmYzJWMGRHbHVaM011YUdsQ1pXWnZjbVY5SUNSN2RHaHBjeTVmYm1GdFpYMGdKSHQwYUdsekxsOXpaWFIwYVc1bmN5NW9hVUZtZEdWeWZXQmNibHgwWEhRcFhHNGdJQ0FnWEc1Y2RGeDBMeThnVW5WdUlHTmhiR3hpWVdOclhHNWNkRngwZEdocGN5NWZjMlYwZEdsdVozTXViMjVJYVNoMGFHbHpMbDl1WVcxbExDQjBhR2x6TGw5elpYUjBhVzVuY3k1b2FVSmxabTl5WlN3Z2RHaHBjeTVmYzJWMGRHbHVaM011YUdsQlpuUmxjaWxjYmx4dVhIUmNkQzh2SUVWdGFYUWdZM1Z6ZEc5dElHVjJaVzUwWEc1Y2RGeDBaVzFwZEVWMlpXNTBLQ2RuY21WbGRHbHVaenBvYVNjc0lIdGNibHgwWEhSY2RHNWhiV1U2SUhSb2FYTXVYMjVoYldVc1hHNWNkRngwWEhSaVpXWnZjbVU2SUhSb2FYTXVYM05sZEhScGJtZHpMbWhwUW1WbWIzSmxMRnh1WEhSY2RGeDBZV1owWlhJNklIUm9hWE11WDNObGRIUnBibWR6TG1ocFFXWjBaWEpjYmx4MFhIUjlLVnh1WEc1Y2RGeDBjbVYwZFhKdUlIUm9hWE5jYmx4MGZWeHVYRzVjZEVOdmJuTjBjblZqZEc5eUxuQnliM1J2ZEhsd1pTNXpZWGxDZVdVZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc1Y2RGeDBMeThnUlcxcGRDQmpkWE4wYjIwZ1pYWmxiblJjYmx4MFhIUmpiMjV6ZENCallXNWpaV3hsWkNBOUlDRmxiV2wwUlhabGJuUW9KMmR5WldWMGFXNW5PbUpsWm05eVpTMWllV1VuTENCN1hHNWNkRngwWEhSdVlXMWxPaUIwYUdsekxsOXVZVzFsTEZ4dVhIUmNkRngwWW1WbWIzSmxPaUIwYUdsekxsOXpaWFIwYVc1bmN5NWllV1ZDWldadmNtVXNYRzVjZEZ4MFhIUmhablJsY2pvZ2RHaHBjeTVmYzJWMGRHbHVaM011WW5sbFFXWjBaWEpjYmx4MFhIUjlLVnh1WEc1Y2RGeDBMeThnU1dZZ2RHaGxJR1YyWlc1MElIZGhjeUJqWVc1alpXeGxaQ3dnWlc1a1hHNWNkRngwYVdZZ0tHTmhibU5sYkdWa0tTQnlaWFIxY201Y2JseHVYSFJjZEdOdmJuTnZiR1V1Ykc5bktGeHVYSFJjZEZ4MEp5VmpKWE1uTENCY2JseDBYSFJjZENkamIyeHZjam9nY0dsdWF6dG1iMjUwTFhOcGVtVTZJREkxY0hnbkxDQmNibHgwWEhSY2RHQWtlM1JvYVhNdVgzTmxkSFJwYm1kekxtSjVaVUpsWm05eVpYMGdKSHQwYUdsekxsOXVZVzFsZlNBa2UzUm9hWE11WDNObGRIUnBibWR6TG1KNVpVRm1kR1Z5ZldCY2JseDBYSFFwWEc0Z0lDQWdYRzVjZEZ4MGRHaHBjeTVmYzJWMGRHbHVaM011YjI1Q2VXVW9kR2hwY3k1ZmJtRnRaU3dnZEdocGN5NWZjMlYwZEdsdVozTXVZbmxsUW1WbWIzSmxMQ0IwYUdsekxsOXpaWFIwYVc1bmN5NWllV1ZCWm5SbGNpbGNiaUFnSUNCY2JseDBYSFF2THlCRmJXbDBJR04xYzNSdmJTQmxkbVZ1ZEZ4dVhIUmNkR1Z0YVhSRmRtVnVkQ2duWjNKbFpYUnBibWM2WW5sbEp5d2dlMXh1WEhSY2RGeDBibUZ0WlRvZ2RHaHBjeTVmYm1GdFpTeGNibHgwWEhSY2RHSmxabTl5WlRvZ2RHaHBjeTVmYzJWMGRHbHVaM011WW5sbFFtVm1iM0psTEZ4dVhIUmNkRngwWVdaMFpYSTZJSFJvYVhNdVgzTmxkSFJwYm1kekxtSjVaVUZtZEdWeVhHNWNkRngwZlNsY2JpQWdJQ0JjYmx4MFhIUnlaWFIxY200Z2RHaHBjMXh1WEhSOVhHNWNibHgwY21WMGRYSnVJRU52Ym5OMGNuVmpkRzl5WEc1OUtTZ3BYRzVjYm1OdmJuTjBJRzFsY214cGJpQTlJRzVsZHlCSGNtVmxkR2x1WnlnblRXVnliR2x1Snl3Z2UxeHVYSFJvYVVGbWRHVnlPaUFuTGljc1hHNWNkQzh2SUc5dVFubGxPaUJtZFc1amRHbHZiaWh1WVcxbEtTQjdYRzVjZEM4dklDQWdZMjl1YzNRZ1lYQndJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbUo1WlMxMFpYaDBKeWxjYmx4MEx5OGdJQ0JoY0hBdWRHVjRkRU52Ym5SbGJuUWdQU0JnOEorUml5QWtlMjVoYldWOVlEdGNibHgwTHk4Z2ZWeHVmU2xjYmx4dUx5OGdUR2x6ZEdWdUlHRWdZM1Z6ZEc5dElHVjJaVzUwWEc1a2IyTjFiV1Z1ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkbmNtVmxkR2x1WnpwaWVXVW5MQ0JtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjYmx4MFkyOXVjM1FnWVhCd0lEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbkxtSjVaUzEwWlhoMEp5bGNibHgwWVhCd0xuUmxlSFJEYjI1MFpXNTBJRDBnWVBDZmtZc2dKSHRsZG1WdWRDNWtaWFJoYVd3dWJtRnRaWDFnWEc1OUtWeHVYRzVzWlhRZ1ptOXliU0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KMlp2Y20wbktWeHVabTl5YlM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkemRXSnRhWFFuTENCbWRXNWpkR2x2YmlBb1pYWmxiblFwSUh0Y2JseDBaWFpsYm5RdWNISmxkbVZ1ZEVSbFptRjFiSFFvS1Z4dVhIUm1iM0p0TG5KbGMyVjBLQ2xjYmx4dVhIUXZMeUJGYldsMElHRWdZM1Z6ZEc5dElHVjJaVzUwWEc1Y2RHMWxjbXhwYmk1ellYbENlV1VvS1Z4dWZTbGNibHh1WEc0dktpcGNiaUFxSUVWdGFYUWdZU0JqZFhOMGIyMGdaWFpsYm5SY2JpQXFMMXh1THk4Z1pHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmJYa3RZM1Z6ZEc5dExXVjJaVzUwSnl3Z1puVnVZM1JwYjI0b1pYWmxiblFwSUh0Y2JpOHZJQ0FnWTI5dWMyOXNaUzVzYjJjb01USXpLVnh1THk4Z0lDQmpiMjV6YjJ4bExteHZaeWhsZG1WdWRDNTBlWEJsS1Z4dUx5OGdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncFhHNHZMeUI5S1Z4dVhHNHZMeUJzWlhRZ2JYbEZkbVZ1ZENBOUlHNWxkeUJEZFhOMGIyMUZkbVZ1ZENnbmJYa3RZM1Z6ZEc5dExXVjJaVzUwSnl3Z2UxeHVMeThnSUNCaWRXSmliR1Z6T2lCMGNuVmxMRnh1THk4Z0lDQmpZVzVqWld4aFlteGxPaUIwY25WbFhHNHZMeUI5S1Z4dVhHNHZMeUF2THlCRmJXbDBJSFJvWlNCbGRtVnVkRnh1THk4Z1kyOXVjM1FnWTJGdVkyVnNaV1FnUFNCa2IyTjFiV1Z1ZEM1a2FYTndZWFJqYUVWMlpXNTBLRzE1UlhabGJuUXBPMXh1THk4Z1kyOXVjMjlzWlM1c2IyY29iWGxGZG1WdWRDbGNiaTh2SUdOdmJuTnZiR1V1Ykc5bktHTmhibU5sYkdWa0tWeHVYRzRpTENKcGJYQnZjblFnU0dWaFpISnZiMjBnWm5KdmJTQW5hR1ZoWkhKdmIyMHVhbk1uTzF4dVhHNWpiMjV6ZENCb1pXRmtaWElnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2RvWldGa1pYSW5LVHRjYm1OdmJuTjBJR2hsWVdSeWIyOXRJRDBnYm1WM0lFaGxZV1J5YjI5dEtHaGxZV1JsY2lrN1hHNW9aV0ZrY205dmJTNXBibWwwS0NrN1hHNW9aV0ZrY205dmJTNTBiM0FvS1RzaUxDSXZMeUJtZFc1amRHbHZiaUJUZFhCbGNsUjVjR1VvS1NCN1hHNHZMeUFnSUhSb2FYTXVZMjlzYjNKeklEMGdXeWR5WldRbkxDQW5ZbXgxWlNjc0lDZG5jbVZsYmlkZE8xeHVMeThnZlZ4dVhHNHZMeUJtZFc1amRHbHZiaUJUZFdKVWVYQmxLQ2tnZTMxY2JpOHZJRk4xWWxSNWNHVXVjSEp2ZEc5MGVYQmxJRDBnYm1WM0lGTjFjR1Z5Vkhsd1pTZ3BPMXh1WEc0dkx5QnNaWFFnYVc1emRHRnVZMlV4SUQwZ2JtVjNJRk4xWWxSNWNHVW9LVHRjYmk4dklHbHVjM1JoYm1ObE1TNWpiMnh2Y25NdWNIVnphQ2duWW14aFkyc25LVHRjYmk4dklHTnZibk52YkdVdWJHOW5LR2x1YzNSaGJtTmxNUzVqYjJ4dmNuTXBPMXh1WEc0dkx5QnNaWFFnYVc1emRHRnVZMlV5SUQwZ2JtVjNJRk4xWWxSNWNHVW9LVHRjYmk4dklHTnZibk52YkdVdWJHOW5LR2x1YzNSaGJtTmxNaTVqYjJ4dmNuTXBPMXh1WEc0dkx5QmNZdWVibCtlVXFPYWVoT21Bb09XSHZlYVZzRnh1THk4ZzVhKzU2TEdoNUx5cTZLT0ZJT2U3aitXRnVPZTdwK2FKdjF4dVhHNHZLaXBjYmlBcUlDRGt2SmpuZ3JrZ1hHNGdLaUFnNVkrdjVMdWw1WnlvNWEyUTU3Rzc1cDZFNllDZzVZZTk1cFd3NUxpdDVaQ1I1NGkyNTdHNzVwNkU2WUNnNVllOTVwV3c1THlnNVkrQ1hHNGdLaUJjYmlBcUlPZTh1dWVDdWUrOGlPUzl2K2VVcU9hZWhPbUFvT1dIdmVhVnNPYW9vZVc4aitpSHF1V3VtdVM1aWVleHUrV2VpK2VhaE9tWHJ1bWltTys4aVZ4dUlDb2c1YitGNmFHNzVaeW81cDZFNllDZzVZZTk1cFd3NUxpdDVhNmE1TG1KNXBhNTVyT1Y3N3lNNVp1ZzVxMms1WWU5NXBXdzVMaU42SU85NlllTjU1U29MRnh1SUNvZzVhMlE1N0c3NUxtZjVMaU42SU85Nks2LzZaZXU1NGkyNTdHNzVZNmY1WjZMNUxpSzVhNmE1TG1KNTVxRTVwYTU1ck9WWEc0Z0tpOWNiaTh2SUdaMWJtTjBhVzl1SUZOMWNHVnlWSGx3WlNncElIdGNiaTh2SUNBZ2RHaHBjeTVqYjJ4dmNuTWdQU0JiSjNKbFpDY3NJQ2RpYkhWbEp5d2dKMmR5WldWdUoxMDdYRzR2THlCOVhHNWNiaTh2SUdaMWJtTjBhVzl1SUZOMVlsUjVjR1VvS1NCN1hHNHZMeUFnSUZOMWNHVnlWSGx3WlM1allXeHNLSFJvYVhNcE8xeHVMeThnZlZ4dVhHNHZMeUJzWlhRZ2FXNXpkR0Z1WTJVeElEMGdibVYzSUZOMVlsUjVjR1VvS1R0Y2JpOHZJR2x1YzNSaGJtTmxNUzVqYjJ4dmNuTXVjSFZ6YUNnbllteGhZMnNuS1R0Y2JpOHZJR052Ym5OdmJHVXViRzluS0dsdWMzUmhibU5sTVM1amIyeHZjbk1wTzF4dVhHNHZMeUJzWlhRZ2FXNXpkR0Z1WTJVeUlEMGdibVYzSUZOMVlsUjVjR1VvS1R0Y2JpOHZJR052Ym5OdmJHVXViRzluS0dsdWMzUmhibU5sTWk1amIyeHZjbk1wTzF4dVhHNHZMeUJtZFc1amRHbHZiaUJUZFhCbGNsUjVjR1VvYm1GdFpTa2dlMXh1THk4Z0lDQjBhR2x6TG01aGJXVWdQU0J1WVcxbE8xeHVMeThnZlZ4dVhHNHZMeUJtZFc1amRHbHZiaUJUZFdKVWVYQmxLQ2tnZTF4dUx5OGdJQ0JUZFhCbGNsUjVjR1V1WTJGc2JDaDBhR2x6TENBblRtbGphRzlzWVhNbktUdGNiaTh2SUNBZ2RHaHBjeTVoWjJVZ1BTQXlPVHRjYmk4dklIMWNibHh1THk4Z2JHVjBJR2x1YzNSaGJtTmxJRDBnYm1WM0lGTjFZbFI1Y0dVb0tUdGNiaTh2SUdOdmJuTnZiR1V1Ykc5bktHbHVjM1JoYm1ObExtNWhiV1VwTzF4dUx5OGdZMjl1YzI5c1pTNXNiMmNvYVc1emRHRnVZMlV1WVdkbEtUdGNibHh1THk4ZzU3dUU1WkNJNTd1bjVvbS9MT1M4cXVlN2orV0Z1T2U3cCthSnZ5QXRJT2U3dk9XUWlPV09uK1dlaSttVHZ1V1NqT2VibCtlVXFPYWVoT21Bb09XSHZlYVZzRnh1THk4ZzVMMi81NVNvNVk2ZjVaNkw2Wk8rNTd1bjVvbS81WTZmNVo2TDVMaUs1NXFFNWJHZTVvQ241WktNNXBhNTVyT1Y3N3lNNklDTTZZQ2E2TCtINTV1WDU1U29YRzR2THlEbW5vVHBnS0RsaDczbWxiRG51NmZtaWIvbHJwN2t2b3Zsc1o3bWdLZGNiaTh2SU9pL21lYWd0K2FYb3VXUHIrUzdwZWFLaXVhV3VlYXpsZVd1bXVTNWllV2NxT1dPbitXZWkrUzRpdVM3cGVXdW51ZU9zT21IamVlVXFPKzhqT1dQaU9XUHIrUzdwVnh1THk4ZzZLNnA1cStQNUxpcTVhNmU1TDZMNllPOTVweUo2SWVxNWJleDU1cUU1YkdlNW9DblhHNWNiaTh2SU9lN2hPV1FpT2U3cCthSnYrVzhwZWlocGVTNmh1V09uK1dlaSttVHZ1V1NqT2VibCtlVXFPYWVoT21Bb09XSHZlYVZzT2VhaE9TNGplaTJzKys4ak9hWXJ5QktZWFpoVTJOeWFYQjBJT1M0clZ4dUx5OGc1TDIvNTVTbzVweUE1YVNhNTVxRTU3dW41b20vNXFpaDVieVA0NENDWEc0dkx5RG51NFRsa0lqbnU2Zm1pYi9rdVova3Y1M25sWm5rdW9ZZ2FXNXpkR0Z1WTJWdlppRG1rNDNrdlp6bnJLYmxrb3dnYVhOUWNtOTBiM1I1Y0dWUFppZ3BYRzR2THlEbWxybm1zNVhvcjRibGlLdmxrSWptaUpEbHI3bm9zYUhubW9Ub2c3M2xpcHRjYmx4dUx5OGc1N3k2NTRLNTc3eWFYRzR2THlEbWxZam5qb2ZwbDY3cG9wampnSUxuaUxibnNidm1ub1RwZ0tEbGg3M21sYkRrdkpyb29xdm9zSVBubEtqa3VLVG1yS0h2dkl6a3VJRG1yS0htbUsvbG5LamxpSnZsdTdybHJaRG5zYnZsanAvbG5vdm1sN2Jvc0lQbmxLaGNiaTh2SU9TNGdPYXNvZWFZcitXY3FPV3RrT2V4dSthZWhPbUFvT1dIdmVhVnNPUzRyZWl3ZytlVXFPT0FnbHh1THk4Z1puVnVZM1JwYjI0Z1UzVndaWEpVZVhCbEtHNWhiV1VwSUh0Y2JpOHZJQ0FnZEdocGN5NXVZVzFsSUQwZ2JtRnRaVHRjYmk4dklDQWdkR2hwY3k1amIyeHZjbk1nUFNCYkozSmxaQ2NzSUNkaWJIVmxKeXdnSjJkeVpXVnVKMTA3WEc0dkx5QjlYRzVjYmk4dklGTjFjR1Z5Vkhsd1pTNXdjbTkwYjNSNWNHVXVjMkY1VG1GdFpTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpOHZJQ0FnWTI5dWMyOXNaUzVzYjJjb2RHaHBjeTV1WVcxbEtUdGNiaTh2SUgxY2JseHVMeThnWm5WdVkzUnBiMjRnVTNWaVZIbHdaU2h1WVcxbExDQmhaMlVwSUh0Y2JpOHZJQ0FnVTNWd1pYSlVlWEJsTG1OaGJHd29kR2hwY3l3Z2JtRnRaU2s3WEc1Y2JpOHZJQ0FnZEdocGN5NWhaMlVnUFNCaFoyVTdYRzR2THlCOVhHNWNiaTh2SUZOMVlsUjVjR1V1Y0hKdmRHOTBlWEJsSUQwZ2JtVjNJRk4xY0dWeVZIbHdaU2dwTzF4dUx5OGdVM1ZpVkhsd1pTNXdjbTkwYjNSNWNHVXVjMkY1UVdkbElEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUx5OGdJQ0JqYjI1emIyeGxMbXh2WnloMGFHbHpMbUZuWlNrN1hHNHZMeUI5WEc1Y2JpOHZJR3hsZENCcGJuTjBZVzVqWlRFZ1BTQnVaWGNnVTNWaVZIbHdaU2duVG1samFHOXNZWE1uTENBeU9TazdYRzR2THlCcGJuTjBZVzVqWlRFdVkyOXNiM0p6TG5CMWMyZ29KMkpzWVdOckp5azdYRzR2THlCamIyNXpiMnhsTG14dlp5aHBibk4wWVc1alpURXVZMjlzYjNKektUdGNiaTh2SUdsdWMzUmhibU5sTVM1ellYbE9ZVzFsS0NrN1hHNHZMeUJwYm5OMFlXNWpaVEV1YzJGNVFXZGxLQ2s3WEc1Y2JpOHZJR3hsZENCcGJuTjBZVzVqWlRJZ1BTQnVaWGNnVTNWaVZIbHdaU2duUjNKbFp5Y3NJREkzS1R0Y2JpOHZJR052Ym5OdmJHVXViRzluS0dsdWMzUmhibU5sTWk1amIyeHZjbk1wTzF4dUx5OGdhVzV6ZEdGdVkyVXlMbk5oZVU1aGJXVW9LVHRjYmk4dklHbHVjM1JoYm1ObE1pNXpZWGxCWjJVb0tUdGNibHh1THk4ZzVZNmY1WjZMNWJ5UDU3dW41b20vWEc0dkx5RGt1STNtdG9ubGo0cmt1S1htb0x6bWhJL2t1WW5rdUlybW5vVHBnS0RsaDczbWxiRG5tb1RudTZmbWliL21scm5sdkk5Y2JpOHZJT1dOcytTOXYrUzRqZVd1bXVTNWllZXh1K1dlaStTNW4rV1ByK1M3cGVtQW11aS9oK1dPbitXZWkrV3VudWVPc09XdnVlaXhvZVM1aSttWHRPZWFoT1Mvb2VhQnIrV0ZzZVM2cTF4dVhHNHZMeURwZ0lMbmxLam1nNFhsaHJYdnZKcGNiaTh2SU9TOW9PYWNpZVM0Z09TNHF1V3Z1ZWl4b2UrOGpPYURzK1djcU9XdWcrZWFoT1dmdXVlaGdPUzRpdVdjcU9XSW0rVzd1dVM0Z09TNHF1YVdzT1d2dWVpeG9lT0FnbHh1THk4ZzVMMmc2WnlBNkthQjVvcUs2TCtaNUxpcTVhKzU2TEdoNVlXSTVMeWc1N3VaSUc5aWFtVmpkQ2dwNzd5TTU0UzI1WkNPNVlhTjVhKzU2TCtVNVp1ZTU1cUU1YSs1NkxHaDZMK2I2S0dNNllDQzViMlQ1NXFFNUwrdTVwUzU0NENDWEc0dkx5RG92NW5ucDQzbWxybm1zNVhscnA3cG1ZWGt1SXJtbUsvbGhZdnBtb2Jscjdub3NhSHZ2SXptbkt6b3RLamt1SXJtbUsvbHI3bmt2S0RsaGFYbHI3bm9zYUhtaWFmb29Zemt1SURtcktIbXRZWGxwSTNsaUxiamdJSmNibHh1THk4Z1JWTTFJT2FXc09XaW51YVd1ZWF6bFNCUFltcGxZM1F1WTNKbFlYUmxLQ2tnNXBhNTVyT1Y1YkNHNVk2ZjVaNkw1YnlQNTd1bjVvbS81NXFFNXFhQzViKzE2S2VFNkl5RDVZeVc0NENDWEc0dkx5RG1qcVhsajVma3VLVGt1S3JsajRMbWxiRHZ2SnJrdlp6a3VMcm1sckRscjdub3NhSGxqcC9sbm92bm1vVGxyN25vc2FIdnZJemt1NlhsajRybWxyRGxyN25vc2FIbHJwcmt1WW5wb3AzbHBKYmxzWjdtZ0tmbm1vVGxyN25vc2FGY2JseHVMeThnNVk2ZjVaNkw1YnlQNTd1bjVvbS82TFM1NloyZTViaTQ2WUNDNVpDSTVMaU42WnlBNkthQjVZMlY1NHVzNVlpYjVidTY1cDZFNllDZzVZZTk1cFd3Nzd5TTVMMkc1THVONTRTMjZaeUE2S2FCNVp5bzVhKzU2TEdoNlplMDVZV3g1THFyNUwraDVvR3Y1NXFFNVp5NjVaQ0k0NENDWEc0dkx5RGt2WWJsc1o3bWdLZmt1SzNsaklYbGtLdm5tb1RsdkpYbmxLamxnTHpscDR2bnU0amt2SnJsbktqbm03amxoYlBscjdub3NhSHBsN1RsaGJIa3VxdnZ2SXpvdDUva3ZiL25sS2psanAvbG5vdm1xS0hsdkkvbW1LL2t1SURtb0xmbm1vVGpnSUpjYmk4dklHWjFibU4wYVc5dUlHOWlhbVZqZENBb2J5a2dlMXh1THk4Z0lDQm1kVzVqZEdsdmJpQkdLQ2tnZTMxY2JpOHZJQ0FnUmk1d2NtOTBiM1I1Y0dVZ1BTQnZPMXh1THk4Z0lDQnlaWFIxY200Z2JtVjNJRVlvS1R0Y2JpOHZJSDFjYmx4dUx5OGdiR1YwSUhCbGNuTnZiaUE5SUh0Y2JpOHZJQ0FnYm1GdFpUb2dKMDVwWTJodmJHRnpKeXhjYmk4dklDQWdabkpwWlc1a2N6b2dXeWR6YUdWc1lua25MQ0FuWTI5MWNuUW5MQ0FuZG1GdUoxMWNiaTh2SUgxY2JseHVMeThnYkdWMElHRnViM1JvWlhKUVpYSnpiMjRnUFNCdlltcGxZM1FvY0dWeWMyOXVLVHRjYmk4dklHTnZibk52YkdVdWJHOW5LR0Z1YjNSb1pYSlFaWEp6YjI0dWJtRnRaU2s3WEc0dkx5QmhibTkwYUdWeVVHVnljMjl1TG01aGJXVWdQU0FuUjNKcFpXRW5YRzR2THlCaGJtOTBhR1Z5VUdWeWMyOXVMbVp5YVdWdVpITXVjSFZ6YUNnbmNtOWlKeWs3WEc1Y2JpOHZJR3hsZENCNVpYUkJibTkwYUdWeVVHVnljMjl1SUQwZ2IySnFaV04wS0hCbGNuTnZiaWs3WEc0dkx5QjVaWFJCYm05MGFHVnlVR1Z5YzI5dUxtNWhiV1VnUFNCY0lreHBibVJoWENJN1hHNHZMeUI1WlhSQmJtOTBhR1Z5VUdWeWMyOXVMbVp5YVdWdVpITXVjSFZ6YUNoY0lrSmhjbUpwWlZ3aUtUdGNibHh1THk4Z1kyOXVjMjlzWlM1c2IyY29jR1Z5YzI5dUxtWnlhV1Z1WkhNcE8xeHVMeThnWTI5dWMyOXNaUzVzYjJjb1lXNXZkR2hsY2xCbGNuTnZiaWxjYmx4dUx5OGc1YStFNTVTZjVieVA1N3VuNW9tL0lPV3ZoT2VVbithZWhPbUFvT1dIdmVhVnNPV1NqT1czcGVXT2d1YW9vZVc4ajF4dUx5OGc1WWliNWJ1NjVMaUE1TGlxNWE2ZTU0Nnc1N3VuNW9tLzU1cUU1WWU5NXBXdzc3eU01THVsNXArUTU2ZU41cGE1NWJ5UDVhS2U1Ynk2NWErNTZMR2g3N3lNNTRTMjVaQ082TCtVNVp1ZTZMK1o1TGlxNWErNTZMR2g0NENDWEc0dkx5RHBnSUxsa0lqa3VMdm9wb0hsaGJQbXM2amxyN25vc2FIdnZJem9nSXprdUkzbGhiUG1zNmpuc2J2bG5vdmxrb3ptbm9UcGdLRGxoNzNtbGJEbm1vVGxpSnZtbWE5Y2JpOHZJRTlpYW1WamRDZ3BJT1dIdmVhVnNPUzRqZWFZcitXL2hlbWh1K2VhaE8rOGpPUzd1K1M5bGVpL2xPV2JudWFXc09XdnVlaXhvZWVhaE9XSHZlYVZzT21EdmVXUHIrUzdwZVdjcU9pL21lbUhqT1M5ditlVXFGeHVMeThnNllDYTZMK0g1YStFNTVTZjVieVA1N3VuNW9tLzU3dVo1YSs1NkxHaDVyZTc1WXFnNVllOTVwV3c1THlhNWErODZJZTA1WWU5NXBXdzZacSs1THVsNlllTjU1U283N3lNNUxpTzVwNkU2WUNnNVllOTVwV3c1cWloNWJ5UDZKVys2S1cvWEc0dkx5Qm1kVzVqZEdsdmJpQmpjbVZoZEdWQmJtOTBhR1Z5S0c5eWFXZHBibUZzS1NCN1hHNHZMeUFnSUd4bGRDQmpiRzl1WlNBOUlFOWlhbVZqZENodmNtbG5hVzVoYkNrN0lDOHZJT2l3ZytlVXFPV0h2ZWFWc09XSW0rVzd1dVM0Z09TNHF1YVdzT1d2dWVpeG9WeHVMeThnSUNCamJHOXVaUzV6WVhsSWFTQTlJR1oxYm1OMGFXOXVJQ2dwSUhzZ0lDQXZMeURrdTZYbW41RG5wNDNtbHJubHZJL2xvcDdsdkxyb3Y1bmt1S3Jscjdub3NhRmNiaTh2SUNBZ0lDQmpiMjV6YjJ4bExteHZaeWduYUdrbktUdGNiaTh2SUNBZ2ZWeHVYRzR2THlBZ0lISmxkSFZ5YmlCamJHOXVaVHRjYmk4dklIMWNibHh1THk4Z2JHVjBJSEJsY25OdmJpQTlJSHRjYmk4dklDQWdibUZ0WlRvZ0owNXBZMmh2YkdGekp5eGNiaTh2SUNBZ1puSnBaVzVrY3pvZ1d5ZHphR1ZzWW5rbkxDQW5ZMjkxY25RbkxDQW5kbUZ1SjExY2JpOHZJSDFjYmx4dUx5OGdiR1YwSUdGdWIzUm9aWEpRWlhKemIyNGdQU0JqY21WaGRHVkJibTkwYUdWeUtIQmxjbk52YmlrN1hHNHZMeUJoYm05MGFHVnlVR1Z5YzI5dUxuTmhlVWhwS0NrN1hHNWNiaTh2SU9XdmhPZVVuK1c4aitlN2hPV1FpT2U3cCthSnYxeHVablZ1WTNScGIyNGdhVzVvWlhKcGRGQnliM1J2ZEhsd1pTaHpkV0pVZVhCbExDQnpkWEJsY2xSNWNHVXBJSHRjYmlBZ2JHVjBJSEJ5YjNSdmRIbHdaU0E5SUU5aWFtVmpkQ2h6ZFhCbGNsUjVjR1V1Y0hKdmRHOTBlWEJsS1R0Y2JpQWdjSEp2ZEc5MGVYQmxMbU52Ym5OMGNuVmpkRzl5SUQwZ1UzVmlWSGx3WlR0Y2JpQWdjM1ZpVkhsd1pTNXdjbTkwYjNSNWNHVWdQU0J3Y205MGIzUjVjR1U3WEc1OVhHNWNibVoxYm1OMGFXOXVJRk4xY0dWeVZIbHdaU2h1WVcxbEtTQjdYRzRnSUhSb2FYTXVibUZ0WlNBOUlHNWhiV1U3WEc0Z0lIUm9hWE11WTI5c2IzSnpJRDBnV3lkeVpXUW5MQ0FuWW14MVpTY3NJQ2RuY21WbGJpZGRPMXh1ZlZ4dVhHNVRkWEJsY2xSNWNHVXVjSEp2ZEc5MGVYQmxMbk5oZVU1aGJXVWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJR052Ym5OdmJHVXViRzluS0hSb2FYTXVibUZ0WlNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUZOMVlsUjVjR1VnS0c1aGJXVXNJR0ZuWlNrZ2UxeHVJQ0JUZFhCbGNsUjVjR1V1WTJGc2JDaDBhR2x6TENCdVlXMWxLVHRjYmlBZ2RHaHBjeTVoWjJVZ1BTQmhaMlU3WEc1OVhHNWNibWx1YUdWeWFYUlFjbTkwYjNSNWNHVW9VM1ZpVkhsd1pTd2dVM1Z3WlhKVWVYQmxLVHRjYmx4dVUzVmlWSGx3WlM1d2NtOTBiM1I1Y0dVdWMyRjVRV2RsSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCamIyNXpiMnhsTG14dlp5aDBhR2x6TG1GblpTazdYRzU5SWl3aVkyOXVjM1FnUVhCd0lEMGdablZ1WTNScGIyNG9ibUZ0WlNrZ2UxeHVJQ0IwYUdsekxtNWhiV1VnUFNCdVlXMWxYRzU5WEc1Y2JrRndjQzV3Y205MGIzUjVjR1V1YzJGNVNHa2dQU0JtZFc1amRHbHZiaUFvS1h0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvZEdocGN5NXVZVzFsS1Z4dWZWeHVYRzVqYjI1emRDQmhjSEFnUFNCdVpYY2dRWEJ3S0NkaWVXOWthV0Z1SnlsY2JtRndjQzV6WVhsSWFTZ3BYRzVjYmtGd2NDNXdjbTkwYjNSNWNHVXVjMkY1UW5sbElEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQmpiMjV6YjJ4bExteHZaeWduWjI5dlpDQmllV1VuTENCMGFHbHpMbTVoYldVcFhHNTlYRzVjYm1Gd2NDNXpZWGxDZVdVb0tTSXNJaThxS2x4dUlDb2dSVzFwZENCaElHTjFjM1J2YlNCbGRtVnVkRnh1SUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhSNWNHVWdWR2hsSUdWMlpXNTBJSFI1Y0dWY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmtaWFJoYVd3Z1FXNTVJR1JsZEdGcGJITWdkRzhnY0dGemN5QmhiRzl1WnlCM2FYUm9JSFJvWlNCbGRtVnVkRnh1SUNvZ1FIQmhjbUZ0SUh0T2IyUmxmU0JsYkdWdElGUm9aU0JsYkdWdFpXNTBJSFJ2SUdGMGRHRmphQ0IwYUdVZ1pYWmxiblFnZEc5Y2JpQXFMMXh1WEc0Z1pYaHdiM0owSUdSbFptRjFiSFFnWm5WdVkzUnBiMjRnWlcxcGRFVjJaVzUwS0hSNWNHVXNJR1JsZEdGcGJDQTlJSHQ5TENCbGJHVnRJRDBnWkc5amRXMWxiblFwSUh0Y2JpQWdMeThnVFdGclpTQnpkWEpsSUhSb1pYSmxKM01nWVc0Z1pYWmxiblFnZEhsd1pWeHVJQ0JwWmlBb0lYUjVjR1VwSUhKbGRIVnlianRjYmx4dUlDQXZMeUJEY21WaGRHVWdZU0J1WlhjZ1pYWmxiblJjYmlBZ1kyOXVjM1FnWlhabGJuUWdQU0J1WlhjZ1EzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2UxeHVJQ0FnSUdKMVltSnNaWE02SUhSeWRXVXNYRzRnSUNBZ1kyRnVZMlZzWVdKc1pUb2dkSEoxWlN4Y2JpQWdJQ0JrWlhSaGFXdzZJR1JsZEdGcGJGeHVJQ0I5S1R0Y2JseHVJQ0F2THlCRWFYTndZWFJqYUNCMGFHVWdaWFpsYm5SY2JpQWdjbVYwZFhKdUlHVnNaVzB1WkdsemNHRjBZMmhGZG1WdWRDaGxkbVZ1ZENrN1hHNTlJaXdpWTI5dWMzUWdkRzlCY25KaGVTQTlJR1oxYm1OMGFXOXVJQ2hzYVhOMExDQnpkR0Z5ZENrZ2UxeHVJQ0J6ZEdGeWRDQTlJSE4wWVhKMElIeDhJREE3WEc0Z0lHeGxkQ0JwSUQwZ2JHbHpkQzVzWlc1bmRHZ2dMU0J6ZEdGeWREdGNiaUFnWTI5dWMzUWdjbVYwSUQwZ2JtVjNJRUZ5Y21GNUtHa3BPMXh1SUNCM2FHbHNaU0FvYVMwdEtTQjdYRzRnSUNBZ2NtVjBXMmxkSUQwZ2JHbHpkRnRwSUNzZ2MzUmhjblJkTzF4dUlDQjlYRzRnSUhKbGRIVnliaUJ5WlhRN1hHNTlPMXh1WEc1bWRXNWpkR2x2YmlCcGJtbDBWWE5sSUNoV2RXVXBJSHRjYmlBZ0x5OGdLaUJXZFdVZzVwNkU2WUNnNVptbzZaMlo1b0NCNXBhNTVyT1ZYRzRnSUZaMVpTNTFjMlVnUFNCbWRXNWpkR2x2YmlBb2NHeDFaMmx1S1NCN1hHNGdJQ0FnTHk4Z2RHaHBjeTVmYVc1emRHRnNiR1ZrVUd4MVoybHVjeUE5SUhSb2FYTXVYMmx1YzNSaGJHeGxaRkJzZFdkcGJuTWdmSHdnVzExY2JpQWdJQ0F2THlCamIyNXpkQ0JwYm5OMFlXeHNVR3gxWjJsdUlEMGdkR2hwY3k1ZmFXNXpkR0ZzYkdWa1VHeDFaMmx1YzF4dUlDQWdJR052Ym5OMElHbHVjM1JoYkd4UWJIVm5hVzV6SUQwZ2RHaHBjeTVmYVc1emRHRnNiR1ZrVUd4MVoybHVjeUI4ZkNBb2RHaHBjeTVmYVc1emRHRnNiR1ZrVUd4MVoybHVjeUE5SUZ0ZEtUdGNibHh1SUNBZ0lDOHZJQ29nNTZHdTVMK2Q1bytTNUx1MjVZK3E1THlhNktLcjVhNko2S09GNUxpQTVxeWhYRzRnSUNBZ2FXWWdLR2x1YzNSaGJHeFFiSFZuYVc1ekxtbHVaR1Y0VDJZb2NHeDFaMmx1S1NBK0lDMHhLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3p0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlBcUlGWjFaUzUxYzJVb2NHeDFaMmx1TENCdmNIUnBiMjV6S1Z4dUlDQWdJQzh2SUdGeVozVnRaVzUwY3lBOFFYSm5kVzFsYm5SelBpQTlQaUJiY0d4MVoybHVMQ0J2Y0hScGIyNXpYVnh1SUNBZ0lDOHZJR0Z5WjNNZ1BFRnljbUY1UGlBOVBpQmJiM0IwYVc5dWMxMWNiaUFnSUNCamIyNXpkQ0JoY21keklEMGdkRzlCY25KaGVTaGhjbWQxYldWdWRITXNJREVwTzF4dUlDQWdJR052Ym5OdmJHVXViRzluS0dGeVozVnRaVzUwY3lrN1hHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb1lYSm5jeWs3WEc1Y2JpQWdJQ0F2THlBcUlHRnlaM01nUEVGeWNtRjVQaUE5UGlCYlZuVmxMQ0J2Y0hScGIyNXpYVnh1SUNBZ0lHRnlaM011ZFc1emFHbG1kQ2gwYUdsektUdGNiaUFnSUNCamIyNXpiMnhsTG14dlp5aGhjbWR6S1R0Y2JseHVJQ0FnSUM4dklDb2dNUzRnY0d4MVoybHVJT1M5bk9TNHV1V3Z1ZWl4b2VTNGxPYWNpU0JwYm5OMFlXeHNJT2FXdWVhemxlKzhqT2l3ZytlVXFDQnBibk4wWVd4c0lPYVd1ZWF6bFZ4dUlDQWdJQzh2SUNvZ01pNGdjR3gxWjJsdUlPUzluT1M0dXVXSHZlYVZzTys4ak9lYnRPYU9wZWl3ZytlVXFPaXZwZVdIdmVhVnNGeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ2NHeDFaMmx1TG1sdWMzUmhiR3dnUFQwOUlGd2lablZ1WTNScGIyNWNJaWtnZTF4dUlDQWdJQ0FnY0d4MVoybHVMbWx1YzNSaGJHd3VZWEJ3Ykhrb2NHeDFaMmx1TENCaGNtZHpLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dWdlppQndiSFZuYVc0Z1BUMDlJRndpWm5WdVkzUnBiMjVjSWlrZ2UxeHVJQ0FnSUNBZ2NHeDFaMmx1TG1Gd2NHeDVLRzUxYkd3c0lHRnlaM01wTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUNvZzU3eVQ1YTJZNWJleTU3dVA1YTZKNktPRjU1cUU1bytTNUx1MlhHNGdJQ0FnYVc1emRHRnNiRkJzZFdkcGJuTXVjSFZ6YUNod2JIVm5hVzRwTzF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQjlPMXh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdGNiaUFnYVc1cGRGVnpaVnh1ZlNKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPSJ9
