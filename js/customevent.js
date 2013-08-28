var CustomEvent = (function () {

    var customEvent = {
        test: {
            action: "click",
            targetType: null
        },
        showCommandMenu: {
            action: "dblclick",
            targetType: null
        },
        deleteNote: {
            action: "click",
            /*
                target type 命名规则：
                插件名-组件名-组件功能
            */
            targetType: "note-btn-delete"
        }
    }

    var getEventType = function (selfEvent) {

        for (var eventName in customEvent) {
            var defEvent = customEvent[eventName];
            if (defEvent.action === selfEvent.action) {
                /*  
                    1.如果不需要匹配触发对象
                    2.如果需要匹配触发对象，并且匹配成功
                */
                if (!defEvent.targetType || (defEvent.targetType && defEvent.targetType === selfEvent.targetType))  {
                    return eventName;
                }
            }
        }

        return;
    }

    return {
        getEventType: getEventType
    }

})()