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