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
        // http://www.quirksmode.org/js/findpos.html
        findOffset: function (obj) {
            var curleft = curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);

                return [curleft, curtop];
            }
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
        // el一定为数组
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
        getAppropriatePos: function (clientPos) {

            var el = this[0];
            var el_width = parseInt(window.getComputedStyle(el).getPropertyValue("width")),
                el_height = parseInt(window.getComputedStyle(el).getPropertyValue("height"));

            var top = clientPos.top - el_height / 2 >= 0? clientPos.top - el_height / 2: 0,
                left = clientPos.left - el_width / 2 >= 0? clientPos.left - el_width / 2: 0;

            top = clientPos.top + el_height / 2 <= window.innerHeight? top: window.innerHeight - el_height,
            left = clientPos.left + el_width / 2 <= window.innerWidth? left: window.innerWidth - el_width;

            return [top, left];

        },
        attr: function (key, value) {
            if (value) {
                this.el.forEach(function (el, index) {
                    el.setAttribute(key, value);
                })       
            } else {
                return this[0].getAttribute(key);
            }
        },
        addClass: function (name) {
            this.el.forEach(function (el, index) {
                if (el.classList) {
                    el.classList.add(name);
                } else {
                    el.className += " " + name;
                }
            });
        },
        removeClass: function (name) {
            this.el.forEach(function (el, index) {
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
            })
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
                data.dispatcher = function (event) {
                    var handlers = data.handlers[event.type];
                    if (handlers) {
                        handlers.forEach(function (handler) {
                            el.forEach(function (el) {
                                handler.call(el, event);
                            })
                        })
                    }
                }
            }

            // 第一次绑定函数时，就把该事件的dispatcher绑定到元素上
            // 一种event对应一个dispatcher
            if (data.handlers[eventType].length === 1) {
                el.forEach(function (el) {
                    el.addEventListener(eventType, data.dispatcher, false);
                });
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

            // 任何一个参数都没有
            // 解绑所有事件
            if (!eventType) {
                for (var type in data.handlers) {
                    removeType(type);
                    return;
                }
            }

            var handlers = data.handlers[eventType];
            if (!handlers) return;

            // 解绑某个事件下的所有回调
            // Usage: body.off("click")
            if (!fn) {
                removeType(eventType);
                return;
            }


            // 解绑某个事件的指定回调
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
            
            // 如果该元素的某种事件的回调函数已经为空，那么删除该元素的dispatcher的handler
            if (data.handlers[eventType].length === 0) {
                delete data.handlers[eventType];
                el.forEach(function (el) {
                    el.removeEventListener(eventType, data.dispatcher, false);
                })
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

        // 如果传入参数是单个node节点/target
        if (selector.nodeType && selector.nodeType === 1) {
            el = [selector];
        // 如果传入参数是字符串
        } else if (typeof selector === "string") {
            // 如果是无效选择器 querySelectorAll 会返回报错或者undefined
            try {
                el = Array.prototype.slice.call(document.querySelectorAll(selector));    
            } catch (e) {
                el = [];
            }

        // 如果传入参数是NodeList
        } else if (Object.prototype.toString.call(selector) === '[object HTMLCollection]' || Object.prototype.toString.call(selector) === '[object NodeList]' ) {
            el = Array.prototype.slice.call(selector);
        } else {
            // 如果无参数传入
            return [];
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