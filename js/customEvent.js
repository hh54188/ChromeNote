// 配置文件
var CustomEvent = (function () {
    /*
        m1: left mouse button
        m2: right mouse button

        u: mouseup
        d: mousedown
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
            btn: -1,
            eventType: "mousemove"
        },
        "click": {
            btn: 0,
            eventType: "click"
        }
    };

    var gesture = {
        create: {
            execQue: ["m2d", "fly", "m2u"],
            targetType: null,
            isSameTarget: null
        },
        cancel: {
            execQue: ["m2d", "fly", "m1d"],
            targetType: null,
            isSameTarget: null
        },
        resize: {
            execQue: ["m1d", "fly", "m1u"],
            targetType: "note",
            isSameTarget: null
        },
        test: {
            execQue: ["click"],
            targetType: null,
            isSameTarget: null
        },
        "delete": {
            execQue: ["click"],
            targetType: "delBtn",
            isSameTarget: null
        }
    };

    var gestureQue = [];

    var getGestureType = function () {
        var exit = false;

        for (var name in gesture) {
            var oneGesture = gesture[name];

            var execQue = oneGesture.execQue,
                targetType = oneGesture.targetType,
                isSameTarget = oneGesture.isSameTarget;

            var queIndex = gestureQue.length - 1;

            for (var i = execQue.length - 1; i >= 0; i--) {
                var default_event_eventType = execQue[i];

                // If gestrue queue have not enough custom event
                if (!queIndex) {
                    exit = false;
                    break;
                }

                var self_event = gestureQue[queIndex--],
                    self_event_eventType = self_event.eventType,
                    self_event_targetType = self_event.targetType,
                    self_event_targetId = self_event.targetId;

                // Compare begin

                // Event type: 
                if (self_event_eventType !== default_event_eventType) {
                    exit = false;
                    break;
                }

                // Target type: 
                if (targetType && (targetType !== self_event_eventType)) {
                    exit = false;
                    break;
                }

                // Target Id:
                if (isSameTarget && (self_event_targetId !== gestureQue[queIndex - 1].targetId)) {
                    exit = false;
                    break;
                }

                // Find the matched gesture;
                exit = true;
            }

            if (exit) {
                clearQueue();
                // Find one gesture, then restart, clear the gesture queue;
                console.log(name);
                return oneGesture;
            }
        }

        return null;
    };

    var clearQueue = function () {
        gestureQue.length = 0;
    }

    var getEventType = function (eventType, btn) {
        var item = null;
        for (var key in customEvent) {
            item = customEvent[key];
            if (item.eventType == eventType && (item.btn === -1 || item.btn == btn)) {
                return key;
            }
        }
    }

    var showGestureQue = function () {
        var str = "";
        gestureQue.forEach(function (el, index) {
            str += el.eventType + ", ";
        })
        console.log(str);
    }
    var checkGestureQue = function (event) {
        // console.log(gestureQue.length);
        // console.log(gestureQue[gestureQue.length - 1]);
        // console.log(item);

        if (!gestureQue.length || (gestureQue[gestureQue.length - 1].eventType !== event)) {
            return true;
        }

        return false;
    }

    var _addToGestureQue = function (item) {
        if (!checkGestureQue(item.eventType)) return;
        // console.log("passed");
        gestureQue.push(item);
        showGestureQue();
        getGestureType();
    }

    return {
        // Gesture queue method:
        push: _addToGestureQue,

        // method:
        getEventType: getEventType,
        getGestureType: getGestureType
    };
})();