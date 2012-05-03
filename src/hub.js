Hub = (function() {
  "use strict";

  var globalListeners = [],
      listeners = {},
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

  function all(callback, context) {
    globalListeners.push({
      id: currID,
      callback: context ? callback.bind(context) : callback
    });

    return currID++;
  }

  function fire(message) {
    var messageListeners = listeners[message];

    if(messageListeners) {
      // arguments to specific message listeners don't include the
      // message name as the first argument, it's implied
      var args = [].slice.call(arguments, 1);

      for(var i = 0, listener; listener = messageListeners[i]; ++i) {
        listener.callback.apply(null, args);
      }
    }

    for(var j = 0, glistener; glistener = globalListeners[j]; ++j) {
      // global listeners get the message name as the first argument
      glistener.callback.apply(null, arguments);
    }
  }

  function off(id) {
    for(var key in listeners) {
      var messageListeners = listeners[key];
      for(var i = 0, listener; listener = messageListeners[i]; ++i) {
        if(listener.id === id) {
          messageListeners.splice(i, 1);
          break;
        }
      }
    }

    for(var j = 0, glistener; glistener = globalListeners[j]; ++j) {
      if(glistener.id === id) {
        globalListeners.splice(j, 1);
        break;
      }
    }
  }

  function reset() {
    listeners = {};
    globalListeners = [];
    currID = 0;
  }

  return {
    all: all,
    on: on,
    fire: fire,
    reset: reset,
    off: off
  };
}());
