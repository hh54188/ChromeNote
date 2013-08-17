log = console.log.bind(console);


// (function () {
//     log = console.log.bind(console);
//     var $ = (function () {
//         /*
//             data-note-type: Note element type
//             data-note-uuid: Unique Identify: +new Date()
//         */

//         var getTargetId = function (elem) {
//             var id = elem.getAttribute("data-note-uuid");
//             return id? id: 0;
//         }

//         var getTargetType = function (elem) {
//             var type = elem.getAttribute("data-note-type");
//             return type? type: "node";
//         }


//         return {
//             getTargetId: getTargetId,
//             getTargetType: getTargetType
//         }

//     })();


//     // 配置文件
//     var Mediator = (function () {
//         /*
//             M1: 鼠标左键
//             M2: 鼠标右键

//             M1U: 鼠标左键抬起
//             M1D: 鼠标左键按下

//             M2U: 鼠标右键抬起
//             M2D: 鼠标右键按下

//             FLY: 鼠标移动中
//         */
//         var customEvent = {
//             "m1u": {
//                 btn: 0,
//                 eventType: "mouseup"
//             },
//             "m1d": {
//                 btn: 0,
//                 eventType: "mousedown"
//             },
//             "m2u": {
//                 btn: 2,
//                 eventType: "mouseup"
//             },
//             "m2d": {
//                 btn: 2,
//                 eventType: "mousedown"
//             },
//             "fly": {
//                 btn: -1,
//                 eventType: "mousemove"  
//             },
//             "click": {
//                 btn: 0,
//                 eventType: "click"
//             }
//         }

//         var gesture = {
//             create: {
//                 execQue: ["m2d", "fly", "m2u"],
//                 targetType: "paper"
//             },
//             cancel: {
//                 execQue: ["m2d", "fly", "m1d"],
//                 targetType: "paper"
//             },
//             resize: {
//                 execQue: ["m1d", "fly", "m1u"],
//                 targetType: "note"
//             },
//             "delete": {
//                 execQue: ["click"],
//                 targetType: "delBtn"
//             }
//         }

//         var getGestureType = function () {
            
//         }

//         var getEventType = function (eventType, btn) {
//             var item = null;
//             for (var key in customEvent) {
//                 item = customEvent[key];
//                 if (item.eventType == eventType && (item.btn === -1 || item.btn == btn)) {
//                     return key;
//                 }
//             }
//         }

//         var gestureQue = [];

//         return {
//             getEventType: getEventType,
//             gestureQue: gestureQue,
//             getGestureType: getGestureType
//         };
//     })();

//     var body = document.querySelector('body');

//     var stillFly = false;

//     var eventCallback = function (e) {

//         var eventType = e.type;
//         var btn = e.button;

//         // Find matched custom define mouse event
//         var customEvent = Mediator.getEventType(eventType, btn);
//         // log("Event------>", customEvent);

//         var targetId = $.getTargetId(e.target);
//         var targetType = $.getTargetType(e.target)

//         var item = {
//             eventType: customEvent,
//             targetType: targetType
//         }

//         if (customEvent !== "fly") {
//             Mediator.gestureQue.push(item);
//             stillFly = false;
//         } else if (!stillFly && customEvent === "fly") {
//             Mediator.gestureQue.push(item);
//             stillFly = true;
//         }

//         Mediator.getGestureType();
//     }

//     body.addEventListener('mousedown', function (e) {
//         eventCallback(e);
//     }, false);

//     body.addEventListener('mouseup', function (e) {
//         this.setAttribute("data-note-lastClickTime", e.timeStamp);
//         this.setAttribute("data-note-lastClickBtn", e.button);
//         eventCallback(e);
//     }, false);

//     body.addEventListener('click', function (e) {
//         this.setAttribute("data-note-lastClickTime", e.timeStamp);
//         this.setAttribute("data-note-lastClickBtn", e.button);
//         eventCallback(e);
//     }, false);

//     body.addEventListener('mousemove', function (e) {
//         var lastClickTimestamp = parseInt(this.getAttribute("data-note-lastClickTime"), 10);
//         var lastClickBtn = parseInt(this.getAttribute("data-note-lastClickBtn"), 10);
//         // Here is a mouse move bug in Chrome and IE
//         // Solution: http://stackoverflow.com/questions/14538743/what-to-do-if-mousemove-and-click-events-fire-simultaneously
//         // if the mouse up event triggered by the mouse right button, it need more react time
//         var dif = lastClickBtn === 0? 10: 1000;
//         if ( !lastClickTimestamp || e.timeStamp - lastClickTimestamp > dif) {
//             eventCallback(e);
//         }

//     }, false);

    
// })()