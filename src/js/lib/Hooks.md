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
// Instead of padding in a callback function, you can
// alternatively emit a custom event that developers 
// can listen for with the `Element.addEventListener()` method.

// The `CustomEvent()` object provides a way to create and emit
// custom events, as well as pass in custom event details.

