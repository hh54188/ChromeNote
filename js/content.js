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
        }

        if (customEvent !== "fly") {
            CustomEvent.push(item);
            stillFly = false;
        } else if (!stillFly && customEvent === "fly") {
            CustomEvent.push(item);
            stillFly = true;
        }

        // CustomEvent.getGestureType();
    }

    var stillFly = false;

    body.on('mousedown', function (e) {
        eventHandler(e);
    });

    body.on('mouseup', function (e) {
        this.setAttribute("data-note-lastClickTime", e.timeStamp);
        this.setAttribute("data-note-lastClickBtn", e.button);
        eventHandler(e);
    });

    body.on('click', function (e) {
        this.setAttribute("data-note-lastClickTime", e.timeStamp);
        this.setAttribute("data-note-lastClickBtn", e.button);
        eventHandler(e);
    });

    body.on('mousemove', function (e) {
        var lastClickTimestamp = parseInt(this.getAttribute("data-note-lastClickTime"), 10);
        var lastClickBtn = parseInt(this.getAttribute("data-note-lastClickBtn"), 10);
        // Here is a mouse move bug in Chrome and IE
        // Solution: http://stackoverflow.com/questions/14538743/what-to-do-if-mousemove-and-click-events-fire-simultaneously
        // if the mouse up event triggered by the mouse right button, it need more react time
        var dif = lastClickBtn === 0? 10: 1000;
        if ( !lastClickTimestamp || e.timeStamp - lastClickTimestamp > dif) {
            eventHandler(e);
        }
    });