var $ = (function () {

    // Helper:
    var Helper = {

        isEmptyObject: function (object) {
            for (var prop in object) {
                return false;
            }

            return true;
        },
        latestClick: {
            button: 0,
            timeStamp: -1
        },
        handlerChromeMousebug: function (e) {
            var _this = this;
            
            var lastTimeClicked = function () {
                if (_this.latestClick.timeStamp === -1) return false;
            }

            if (e.type === "mousemove") {
                // The different click button need different react time
                var dif = this.latestClick.button === 0? 10: 1000;

                if ( !lastTimeClicked() || e.timeStamp - this.latestClick.timeStamp > dif) return true;
            } else if (e.type === "click" || e.type === "mouseup") {
                this.latestClick.button = e.button;
                this.latestClick.timeStamp = e.timeStamp;
            }
        }
    }

    function _$(el) {
        this.el = el;
        this.fn_uuid = 0;
    }

    // event handler manage
    var _e = (function (el) {
        var cache = {},
            expando = +new Date();

        var getData = function (el) {
            var uuid = el[expando];

            if (!uuid) {
                uuid = el[expando] = +new Date();
                cache[uuid] = {};
            }

            return cache[uuid];
        }

        var removeData = function (el) {
            var uuid = el[expando];

            if (!uuid) return;

            delete cache[uuid];
            try {
                delete elem[expando];
            } catch (e) {
                if (elem.removeAttribute) {
                    elem.removeAttribute(expando);
                }
            }

        }

        return {
            getData: getData,
            removeData: removeData
        }

    })();

    _$.prototype = {
        constructor: this,

        getTargetId: function () {
            var el = this.el;
            var id = el.getAttribute("data-note-uuid");
            return id? id: 0;            
        },
        getTargetType: function () {
            var el = this.el;
            var type = el.getAttribute("data-note-type");
            return type? type: "node";            
        },
        on: function (eventType, fn) {
            var el = this.el;
            var data = _e.getData(el);
            if (!data.handlers) data.handlers = {};
            if (!data.handlers[eventType]) data.handlers[eventType] = [];

            if (!fn.uuid) fn.uuid = ++this.fn_uuid;
            data.handlers[eventType].push(fn);

            if (!data.dispatcher){
                // data.disabled =  false
                data.dispatcher = function (event) {
                    // if (data.disabled) return;
                    var handlers = data.handlers[event.type];
                    if (handlers) {
                        for (var i = 0; i < handlers.length; i++) {
                            handlers[i].call(el, event);
                        }
                    }
                }
            }

            if (data.handlers[eventType].length === 1) {
                el.addEventListener(eventType, data.dispatcher, false);
            }            
        },
        off: function (eventType, fn) {
            var el = this.el;
            var data = _e.getData(el);
            var _this = this;

            var removeType = function (t) {
                data.handlers[t] = [];
                _this.clear(t);
            }

            // Unbind all event handlers:
            // Usage: body.off();
            if (!eventType) {
                for (var type in data.handlers) {
                    removeType(type);
                    return;
                }
            }

            var handlers = data.handlers[eventType];
            if (!handlers) return;

            // Remove all handlers from one event type:
            // Usage: body.off("click")
            if (!fn) {
                removeType(eventType);
                return;
            }


            // Remove one specified handler
            // Usage: body.off("click", fn);
            if (fn.uuid) {
                for (var i = 0; i < handlers.length; i++) {
                    if (handlers[i].uuid === fn.uuid) {
                        handlers.splice(i--, 1);
                    }
                }                
            }
            this.clear(eventType);
        },
        clear: function (eventType) {
            var el = this.el
            var data = _e.getData(el);
            // if not equal to zero?
            if (data.handlers[eventType].length === 0) {
                delete data.handlers[eventType];
                el.removeEventListener(eventType, data.dispatcher, false);
            }

            if (Helper.isEmptyObject(data.handlers)) {
                delete data.handlers;
                delete data.dispatcher;
            }

            if (Helper.isEmptyObject(data)) {
                _e.removeData(data);
            }
        }
    }

    var module = function (selector) {
        var el;

        // if selector is event target
        if (selector.nodeType && selector.nodeType === 1) {
            el = selector
        // if selector is query string
        } else if (typeof selector === "string") {
            el = document.querySelector(selector);
        } else {
            return {};
        }

        return  new _$(el);
    }

    for (var prop in Helper) {
        module[prop] = Helper[prop];
    }

    return module;
})()