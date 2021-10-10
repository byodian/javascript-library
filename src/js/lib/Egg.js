import emitEvent from './utils/emitEvent';

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
    let canceled = !emitEvent('greeting:before-hi', {
      name: this._name,
      before: this._settings.hiBefore,
      after: this._settings.hiAfter
    });

    if (canceled) return;

    console.log(`${this._settings.hiBefore}, ${this._name} ${this._settings.hiAfter}`);
    this._settings.onHi(this._name, this._settings.hiBefore, this._settings.hiAfter);

    // Emit custom event
    emitEvent('greeting:hi', {
      name: this._name,
      before: this._settings.hiBefore,
      after: this._settings.hiAfter
    })

    return this;
  };

  Constructor.prototype.sayGoodbye = function () {
    // Emit custom event
    let canceled = !emitEvent('greeting:before-bye', {
      name: this._name,
      before: this._settings.byeBefore,
      after: this._settings.byeAfter
    });

    // If the event was canceled, end
    if (canceled) return;

    console.log(`${this._settings.byeBefore} ${this._settings.byeAfter}`);
    this._settings.onBye(this._name, this._settings.byeBefore, this._settings.byeAfter);

     // Emit custom event
    emitEvent('greeting:bye', {
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