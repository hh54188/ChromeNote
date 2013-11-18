var GlobalEvent = (function () {

    var eventSet = {

    }

    var on = function (evt, fn) {
        console.log(evt);
        var channel = evt.split(":")[0];
        var event = evt.split(":")[1];

        if (!eventSet[channel]) eventSet[channel] = {};
        eventSet[channel][event] = fn;
    }

    var fire = function (evt, data) {
        var channel = evt.split(":")[0];
        var event = evt.split(":")[1];

        if (!eventSet[channel] || (eventSet[channel] && !eventSet[channel][event])) 
            return null;

        eventSet[channel][event].call({
            channel: channel,
            event: event
        }, data);
    }

    return {
        on: on,
        fire: fire
    }

})()