import emitEvent from './utils/emitEvent'

export const Bin = (function () {
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

    emitEvent('bin:set', {
      key: this._key,
      value: value
    })
  }

  Constructor.prototype.get = function () {
    const saved = JSON.parse(window[this._settings.type].getItem(this._key));
    emitEvent('bin:get', {
      key: this._key,
      value: saved
    });

    return saved;
  }

  Constructor.prototype.remove = function () {
    window[this._settings.type].removeItem(this._key);
    emitEvent('bin:remove', {
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