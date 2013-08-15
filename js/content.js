(function () {
    log = console.log.bind(console);
    var $ = (function () {
        /*
            data-note-type: Note element type
            data-note-uuid: Unique Identify: +new Date()
        */

        var getTarget = function (elem) {
            var id = elem.getAttribute("data-note-id");
            return id? id: 0;
        }

        var getType = function () {

        }


        return {
            getTarget: getTarget
        }

    })();


    // 配置文件
    var Mediator = (function () {
        /*
            M1: 鼠标左键
            M2: 鼠标右键

            M1U: 鼠标左键抬起
            M1D: 鼠标左键按下

            M2U: 鼠标右键抬起
            M2D: 鼠标右键按下

            FLY: 鼠标移动中
        */
        var customEvent = {
            "m1u": {
                btn: 0,
                eventType: "mouseup"
            },
            "m1d": {
                btn: 0,
                eventType: "mousedown"
            },
            "m2u": {
                btn: 2,
                eventType: "mouseup"
            },
            "m2d": {
                btn: 2,
                eventType: "mousedown"
            },
            "fly": {
                btn: 0,
                eventType: "mousemove"  
            }
        }

        var gesture = {
            create: ["m2d", "fly", "m2u"],
            cancel: ["m2d", "fly", "m1d"],
            resize: ["m1d", "fly", "m1u"]
        }
        var getEventType = function (eventType, btn) {
            var item = null;
            for (var key in customEvent) {
                item = customEvent[key];
                if (item.eventType == eventType && item.btn == btn) {
                    return key;
                }
            }
        }

        var gestureQue = [];

        return {
            getEventType: getEventType
        };
    })();

    var body = document.querySelector('body');

    var eventCallback = function (e) {

        var eventType = e.type;
        var btn = e.button;

        // Find matched custom define mouse event
        var customEvent = Mediator.getEventType(eventType, btn);
        var target = $.getTarget(e.target);
    }

    body.addEventListener('mousedown', eventCallback, false);

    body.addEventListener('mouseup', function (e) {
        this.setAttribute("data-note-lastClick", e.timeStamp);
        eventCallback(e);
    }, false);

    body.addEventListener('click', function (e) {
        this.setAttribute("data-note-lastClick", e.timeStamp);
        eventCallback(e);
    }, false);

    body.addEventListener('mousemove', function (e) {

        var lastClickTimestamp = parseInt(this.getAttribute("data-note-lastClick"), 10);

        // Here is a move bug in Chrome and IE
        // Solution: http://stackoverflow.com/questions/14538743/what-to-do-if-mousemove-and-click-events-fire-simultaneously
        if (!lastClickTimestamp || e.timeStamp - lastClickTimestamp > 20) {
            // log("call mousemove");
        }

    }, false);

    
})()