(function() {
  "use strict";

  var hub = Hub;

  module("hub", {
    setup: function() {
      hub.reset();
    },

    teardown: function() {

    }
  });

  asyncTest("on/fire", function() {
    var id = hub.on("message", function() {
      ok(typeof id !== "undefined", "on gives back an id");
      start();
    });

    hub.fire("message");
  });

  asyncTest("multiple listeners/reset", function() {
    var firstTriggered = false;

    var id1 = hub.on("message", function() {
      ok(typeof id1 !== "undefined", "on gives back an id");
      firstTriggered = true;
    });

    var id2 = hub.on("message", function() {
      ok(typeof id2 !== "undefined", "on gives back an id");
      ok(id1 !== id2, "different ids are given for each registration");
      ok(firstTriggered, "both listeners are called");
      start();
    });

    hub.fire("message");
  });

  asyncTest("different messages", function() {
    var firstTriggered = false;
    var secondTriggered = false;
    var totalMessages = 0;

    hub.all(function() {
      totalMessages++;
    });

    hub.on("message1", function() {
      equal(secondTriggered, false, "listener for second message has not been triggered");
      firstTriggered = true;
    });

    hub.on("message2", function() {
      equal(firstTriggered, true, "listener for first message has now been triggered");
      secondTriggered = true;
      start();
    });

    hub.fire("message1");
    hub.fire("message2");

    equal(totalMessages, 2, ".all() handlers receive all messages");
  });

  asyncTest("off unregisters listener", function() {
    var firstTriggered = false;
    var secondTriggered = false;


    var id0 = hub.all(function() {
      ok(false, "this should never be triggered");
      firstTriggered = true;
    });

    var id1 = hub.on("message", function() {
      ok(false, "this should never be triggered");
      secondTriggered = true;
    });

    var id2 = hub.on("message", function() {
      equal(firstTriggered, false, "first listener was not triggered");
      equal(secondTriggered, false, "second listener was not triggered");
      start();
    });

    hub.off(id0);
    hub.off(id1);
    hub.fire("message");
  });

  asyncTest("fire with arguments", function() {
    var id = hub.on("message", function(arg1, arg2) {
      equal(arg1, "arg1", "first argument passed correctly");
      equal(arg2, "arg2", "second argument passed correctly");
      start();
    });

    hub.all(function(name, arg1, arg2) {
      equal(name, "message", "message name to .all passed correctly");
      equal(arg1, "arg1", "first argument to .all passed correctly");
      equal(arg2, "arg2", "second argument to .all passed correctly");
      start();
    });

    hub.fire("message", "arg1", "arg2");
  });
}());

