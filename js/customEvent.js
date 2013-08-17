// 配置文件
var Mediator = (function () {
    /*
        M1: left mouse button
        M2: right mouse button

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
            targetType: "paper"
        },
        cancel: {
            execQue: ["m2d", "fly", "m1d"],
            targetType: "paper"
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

    var getGestureType = function () {
        
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

    var gestureQue = [];

    return {
        // variable
        gestureQue: gestureQue,

        // method:
        getEventType: getEventType,
        getGestureType: getGestureType
    };
})();