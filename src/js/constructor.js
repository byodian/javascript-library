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