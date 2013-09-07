/*
    现有方法：
    $.: 
        isArray
        isEmptyObject
    $():.
        // Basic
        getTargetId        
        getTargetType
        addClass
        removeClass

        // event:
        on
        off() | off("click") | off("click", fn)

        // Animate:
        animSub(topics)
        animPub(topic)

*/

var $ = (function () {

    // Helper:
    var Helper = {
        isArray: function (param) {
            if (Object.prototype.toString.call(param) == "[object Array]") {
                return true;
            }
            return false;
        },
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
    var fn_uuid = 0, el_uuid = 0;

    function _$(el) {
        for (var i = 0; i < el.length; i++) {
            this[i] = el[i];
        }
        this.el = el;
        this.length = el.length;
    }

    // event handler manage
    var _e = (function (el) {
        var cache = {},
            expando = "event_" + (+new Date());

        var getData = function (el) {
            var uuid = el[expando];

            if (!uuid) {
                uuid = el[expando] = ++el_uuid;
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
            removeData: removeData,
            cache: cache
        }

    })();

    _$.prototype = {
        constructor: this,

        getTargetId: function () {
            var el = this[0];
            var id = el.getAttribute("data-note-uuid");
            return id? id: 0;            
        },
        getTargetType: function () {
            var el = this[0];
            var type = el.getAttribute("data-note-type");
            return type? type: "node";            
        },
        addClass: function (name) {
            var el = this[0];
            if (el.classList) {
                el.classList.add(name);
            } else {
                el.className += " " + name;
            }
        },
        removeClass: function (name) {
            var el =this[0];
            if (el.classList) {
                el.classList.remove(name);
            } else {
                var newClassName = "";
                var i;
                var classes = el.className.split(" ");
                for(i = 0; i < classes.length; i++) {
                    if(classes[i] !== name) {
                        newClassName += classes[i] + " ";
                    }
                }
                el.className = newClassName;
            }
        },
        /*
            Animate:
            animSub();
            animPub();
        */

        animSub: function (topics) {

            var el = this.el;
            // log(el);
            var data = _e.getData(el);
            if (!data.animate) data.animate = {};

            data.animate = topics;
            // log(_e.cache);
        },
        getData: function () {
            var el = this.el;
            log(_e.cache);
            return _e.getData(el);
        },
        _execAnim: function (step) {
            var execInnerStep = function (phase) {
                if (phase.removedClass && phase.removedClass.length) {
                    phase.removedClass.forEach(function (cls) {
                        el.removeClass(cls);
                    })
                }

                if (phase.addedClass && phase.addedClass.length) {
                    phase.addedClass.forEach(function (cls) {
                        el.addClass(cls);
                    })
                }

                if (phase.callback) {
                    phase.callback.call(el);
                }
            }

            var el = step.elem,
                before = step.before,
                animateClass = step.animateClass,
                after =  step.after;

            if (!Helper.isEmptyObject(before)) {
                execInnerStep(before);
            }

            el.off("webkitAnimationStart");
            el.off("webkitAnimationEnd");

            el.on("webkitAnimationEnd", function (e) {
                if (!Helper.isEmptyObject(after)) {
                    execInnerStep(after);
                }
            });

            if (animateClass) el.addClass(animateClass);
        },
        animPub: function (topic) {
            var el = this.el;
            var data = _e.getData(el);
            var _this = this;
            if (!data || !data.animate) return;
            var queue = data.animate[topic];
            queue.forEach(function (step, index) {
                _this._execAnim(step);
            })
        },
        /*
            Event: 
            on()
            off()
        */
        on: function (eventType, fn) {
            var el = this.el;
            var data = _e.getData(el);
            if (!data.handlers) data.handlers = {};
            if (!data.handlers[eventType]) data.handlers[eventType] = [];

            if (!fn.uuid) fn.uuid = ++fn_uuid;
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
                for (var i = 0; i < el.length; i++) {
                    el[i].addEventListener(eventType, data.dispatcher, false);
                }
            }            
        },
        off: function (eventType, fn) {
            var el = this.el;
            var data = _e.getData(el);
            var _this = this;

            if (!data.handlers) return;

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
                for (var i = 0; i < el.length; i++) {
                    el[i].removeEventListener(eventType, data.dispatcher, false);    
                }
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
            el = [selector];
        // if selector is query string
        } else if (typeof selector === "string") {
            el = document.querySelectorAll(selector);
        } else {
            return {};
        }

        return  new _$(el);
    }

    for (var prop in Helper) {
        module[prop] = Helper[prop];
    }

    return module;
})();

log = console.log.bind(console);
debug = console.debug.bind(console);