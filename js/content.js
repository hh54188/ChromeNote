var body = $("body");

var eventHandler = function (event) {
    var target = event.target,
        eventType = event.type;

    if (event.button === 0) {
        if (eventType === "mousedown") {
            eventType = "leftmousedown";
        } else if (eventType === "mouseup") {
            eventType = "leftmouseup";
        }
    }

    var selfEvent = {
        action: eventType,
        /*
            data-note-type
        */
        targetType: $(target).getTargetType()
    }

    var eventName = CustomEvent.getEventType(selfEvent);

    if (eventName) {
        log("[eventName]------>", eventName);
        Mediator.publish(eventName, [event]);
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

body.on("mouseup", function (e) {
    eventHandler(e);
})

body.on("mousedown", function (e) {
    eventHandler(e);
})