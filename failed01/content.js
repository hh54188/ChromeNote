    var body = $("body");

    var NoteView = Class.extend({
        init: function () {

        },
        create: function () {

        },
        destory: function () {

        }
    });

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

        var gesture_name = CustomEvent.push(item);
        if (gesture_name) {
            log("[Gesture name]------>", gesture_name);
            Mediator.publish(gesture_name, e);
        }

        // 如果手势是create，则阻止右键菜单事件
        return gesture_name; 
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
        /*        
            在IE和Chrome有一个严重的关于mousemove事件的bug
            Solution: http://stackoverflow.com/questions/14538743/what-to-do-if-mousemove-and-click-events-fire-simultaneously
            if the mouse up event triggered by the mouse right button, it need more react time
        */

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