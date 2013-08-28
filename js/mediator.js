var Mediator = (function () {

    var topics = {
        dragStart: [
            {
                context: noteView,
                callback: noteView.startDrag
            }
        ],
        dragEnd: [
            {
                context: noteView,
                callback: noteView.endDrag
            }
        ],
        drag: [
            {
                context: noteView,
                callback: noteView.drag
            }
        ],
        showCommandMenu: [
            {
                context: CommandMenuView,
                callback: CommandMenuView.show
            }
        ],
        hideCommandMenu: [
            {
                context: CommandMenuView,
                callback: CommandMenuView.hide
            }  
        ]
    }

    var publish = function (name, args) {
        var callbackQueue = topics[name];
        if (!callbackQueue) return;
        // ES5
        callbackQueue.map(function (single) {
            /*
                注意：this 此时并非指向调用map的数组
            */
            var context = single.context? single.context: this;
            single.callback.apply(context, args);
        })

    }

    return {
        publish: publish
    }

})();