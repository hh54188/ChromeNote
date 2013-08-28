var body = $("body");

var eventHandler = function (event) {
    var target = event.target,
        eventType = event.type;

    var selfEvent = {
        action: eventType,
        /*
            data-note-type
        */
        target: $(target).getTargetType()
    }

    var eventName = CustomEvent.getEventType(selfEvent);

    if (eventName) {
        Mediator.publish(eventName);
    }
}

body.on('dblclick', function (e) {
    eventHandler(e);
});

body.on('click', function (e) {
    eventHandler(e);
});

body.on("mousemove", function (e) {
    eventHandler(e);
})