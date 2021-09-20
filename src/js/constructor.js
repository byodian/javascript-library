export function emitEvent(type, detail = {}, elem = document) {
	// Make sure there's an event type
	if (!type) return

	// Create a new event
	const customEvent = new CustomEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: detail
	})

	// Dispatch the event
	return elem.dispatchEvent(customEvent)
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
		if (!type) return
  
		// Create a new event
		const customEvent = new CustomEvent(type, {
			bubbles: true,
			cancelable: true,
			detail: detail
		})
  
		// Dispatch the event
		return elem.dispatchEvent(customEvent)
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
		emitEvent('greeting:bye', {
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

