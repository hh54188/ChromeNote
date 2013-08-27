var Mediator = (function () {
    
    topics = {
        recordStartPos: [
            {
                context: NoteView,
                callback: NoteView.recordStartPos
            }
        ],
        expandBox: [
            {
                context: NoteView,
                callback: NoteView.expandBox                
            }
        ]
    }

    var publish = function (name, eventObj) {
        var callBacks = topics[name];
        if (callBacks) {
            callBacks.forEach(function (item, index) {
                if (item.context) {
                    item.callback.call(item.context, eventObj);    
                } else {
                    item.callback(eventObj);    
                }
            })                
        }
    }

    return {
        publish: publish
    }
})();