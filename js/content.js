    log = console.log.bind(console);

    var body = $('body');

    log(body);

    var eventHandler = function (e) {
        var target = $(e.target);

        var eventType = e.type;
        var btn = e.button;

        // Find matched custom define mouse event
        var customEvent = CustomEvent.getEventType(eventType, btn);

        var targetId = target.getTargetId();
        var targetType = target.getTargetType();

        var item = {
            eventType: customEvent,
            targetType: targetType,
            targetId: targetId
        };

        return CustomEvent.push(item);
    };

    var hasContextMenu = true;

    body.on('mousedown', function (e) {
        eventHandler(e);
    });

    body.on('mouseup', function (e) {
        $.handlerChromeMousebug(e);

        var gesture = eventHandler(e);
        if (gesture === "create") hasContextMenu = false;
    });

    body.on('click', function (e) {
        $.handlerChromeMousebug(e);

        eventHandler(e);
    });

    body.on('mousemove', function (e) {
        // Here is a mouse move bug in Chrome and IE
        // Solution: http://stackoverflow.com/questions/14538743/what-to-do-if-mousemove-and-click-events-fire-simultaneously
        // if the mouse up event triggered by the mouse right button, it need more react time

        if ( $.handlerChromeMousebug(e) ) {
            eventHandler(e);
        }
    });

    body.on("contextmenu", function (e) {
        if (!hasContextMenu) {
            e.preventDefault();
            hasContextMenu = true;
        };
    })