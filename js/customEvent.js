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
        recordStartPos: {
            execQue: ["m2d"],
            targetType: null,
            isSameTarget: null,
            keepQueue: true
        },
        create: {
            execQue: ["m2d", "fly", "m2u"],
            targetType: null,
            isSameTarget: null,
            keepQueue: false
        },
        cancel: {
            execQue: ["m2d", "fly", "m1d"],
            targetType: null,
            isSameTarget: null,
            keepQueue: false
        },
        resize: {
            execQue: ["m1d", "fly", "m1u"],
            targetType: "note",
            isSameTarget: null,
            keepQueue: false
        },
        test: {
            execQue: ["click"],
            targetType: null,
            isSameTarget: null,
            keepQueue: false
        },
        "delete": {
            execQue: ["click"],
            targetType: "delBtn",
            isSameTarget: null,
            keepQueue: false
        }
    };

    var gestureQue = [];

    /*
        最后一次手势缓存
        以防止出现触发mousemove引起的反复比较问题
    */
    var gestrueCache = {};

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
                if (!oneGesture.keepQueue) {
                    clearQueue();    
                }
                
                /*
                    根据鼠标事件队列找到匹配的手势
                */
                return name;
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
        });
        debug("[Gesture Que]------>", str);
    }
    var checkGestureQue = function (event) {

        if (!gestureQue.length || (gestureQue[gestureQue.length - 1].eventType !== event)) {
            return true;
        }

        return false;
    }

    var _addToGestureQue = function (item) {

        if (!checkGestureQue(item.eventType)) {
            /*
                如果队列没有改变，
                自动使用上一次缓存手势
            */            
        } else {

            gestureQue.push(item);
            showGestureQue();
            return getGestureType();            
        }
    }

    return {
        // Gesture queue method:
        push: _addToGestureQue,

        // method:
        getEventType: getEventType,
        getGestureType: getGestureType
    };
})();