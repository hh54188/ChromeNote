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
    }

    var gesture = {
        create: {
            execQue: ["m2d", "fly", "m2u"],
            targetType: null
        },
        cancel: {
            execQue: ["m2d", "fly", "m1d"],
            targetType: null
        },
        resize: {
            execQue: ["m1d", "fly", "m1u"],
            targetType: "note"
        },
        "delete": {
            execQue: ["click"],
            targetType: "delBtn"
        }
    }

    var gestureQue = [];

    var getGestureType = function () {
        // var findGesture = false;
        // for (var name in gesture) {
        //     var act = gesture[name];

        //     var execQue = act.execQue;
        //     var targetType = act.targetType;

        //     for (var i = execQue.length - 1; i >= 0; i--) {
        //         var event = execQue[i];
        //         var queIndex = execQue,length - i;

        //         var self_event = gestureQue[queIndex].eventType;
        //         var self_targetType = gestureQue[queIndex].targetType;

        //         if (event !== self_event) break;

        //         if (targetType && (targetType != self_targetType)) {
        //             break;
        //         }

        //     }
        // }
        // console.log(gestureQue.length);
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

    var _addToGestureQue = function (item) {
        gestureQue.push(item);
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