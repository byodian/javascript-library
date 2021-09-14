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
