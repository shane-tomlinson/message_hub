Hub = (function() {
  "use strict";

  var listeners = {},
      currID = 0;

  function on(message, callback, context) {
    var messageListeners = listeners[message] = listeners[message] || [],
        id = currID;

    messageListeners.push({
      id: currID,
      callback: context ? callback.bind(context) : callback
    });

    currID++;
    return id;
  }

  function fire(message) {
    var messageListeners = listeners[message];

    if(messageListeners) {
      var args = [].slice.call(arguments, 1);

      for(var i = 0, listener; listener = messageListeners[i]; ++i) {
        listener.callback.apply(null, args);
      }
    }
  }

  function off(id) {
    for(var key in listeners) {
      var messageListeners = listeners[key];
      for(var i = 0, listener; listener = messageListeners[i]; ++i) {
        if(listener.id === id) {
          messageListeners.splice(i, 1);
        }
      }
    }
  }

  function reset() {
    listeners = {};
    currID = 0;
  }

  return {
    on: on,
    fire: fire,
    reset: reset,
    off: off
  };
}());

