# Message Hub
This is a little message hub/mediator that is useful to perform global
"PubSub".

## Use
Include src/hub.js into your project.

### Listen for a specific message.

    // callback is invoked any time `message` is fired.
    // handle is used to turn off the listener.
    var handle = Hub.on(`message`, `callback`, [`context`]);

### Listen for *any* message.

    // callback is invoked any time any message is fired.
    // handle is used to turn off the listener.
    var handle = Hub.all(`callback`, [`context`]);

### Fire a message.

    Hub.fire(`message`, [`arg1`], [`arg2`], ..., [`argN`]);

### Remove a listener.

    Hub.off(`handle`);

### Resetting the entire hub.

    Hub.reset();

## License
Available under the Mozilla "Tri-License" - MPL 1.1, GPL 2.0, or LGPL 2.1.

## Original Code
Original code found at https://github.com/stomlinson/message_hub

## Author Info
* Shane Tomlinson
* set117@yahoo.com
* @shane_tomlinson
* http://www.shanetomlinson.com


