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
        isObject: function (obj) {
            if (Object.prototype.toString.call(obj) == "[object Object]") {
                return true;
            }

            return false;
        },
        isString: function (obj) {
            if (Object.prototype.toString.call(obj) == "[object String]") {
                return true;
            }

            return false;
        },
        isNumber: function (obj) {
            if (Object.prototype.toString.call(obj) == "[object Number]") {
                return true;
            }

            return false;
        },
        isBoolean: function (obj) {
            if (Object.prototype.toString.call(obj) == "[object Boolean]") {
                return true;
            }

            return false;
        },
        isEmptyObject: function (object) {
            if (this.isObject(object)) {
                for (var prop in object) {
                    return false;
                }

                return true;

            } else {
                return false;
            }
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
        }
    }

    var fn_uuid = 0;

    var Data = (function () {
        var el_uuid = 0;

        var cache = {},
            expando = "event_" + (+new Date());

        var getData = function (el) {
            // el大部分情况下会是一个数组
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
            removeData: removeData
        }
    })();

    function _$(el) {
        // el一定为数组
        for (var i = 0; i < el.length; i++) {
            this[i] = el[i];
        }
        this.el = el;
        this.length = el.length;
        this.version = 1.0;
    }

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
        css: function () {
            var setStyle = function (el, name, val) {
                if (!Helper.isString(name)) {
                    return;
                }
                el.style[name] = val;
            }

            var getStyle = function (el, name) {

                if (!Helper.isString(name)) {
                    return;
                }

                var val = el.style[name];
                if (!val) {
                    val = window.getComputedStyle(el)[name];
                }

                return val;
            }

            // 情况一：传入一个对象
            if (arguments.length === 1 && Helper.isObject(arguments[0])) {
                var obj = arguments[0];
                for (var prop in obj) {
                    this.el.forEach(function (el) {
                        setStyle(el, prop, obj[prop]);
                    })                      
                }
            }  

            // 情况二：只传入一个参数，返回指定属性
            if (arguments.length == 1 && Helper.isString(arguments[0])) {
                return getStyle(this.el[0], arguments[0]);
            }  
            
            // 情况三： 传入两个以上参数
            var args = arguments;
            if (arguments.length >= 2) {
                this.el.forEach(function (el) {
                    setStyle(el, args[0], args[1]);
                });
            }                                
        },
        attr: function () {
            var getAttr = function (el, key) {
                if (Helper.isString(key)) {
                    return el.getAttribute(key);
                }

                return false;
            }

            var setAttr = function (el, key, value) {
                if (!Helper.isString(key)) {
                    return;
                }

                if (!Helper.isString(value) && !Helper.isNumber(value) && !Helper.isBoolean(value)) {
                    return;
                }

                el.setAttribute(key, value);
            }   

            // 情况一：传入一个对象
            if (arguments.length === 1 && Helper.isObject(arguments[0])) {
                var obj = arguments[0];
                for (var prop in obj) {
                    this.el.forEach(function (el) {
                        setAttr(el, prop, obj[prop]);
                    })                      
                }
            }

            // 情况二：只传入一个参数，返回指定属性
            if (arguments.length == 1 && Helper.isString(arguments[0])) {
                return getAttr(this.el[0], arguments[0]);
            }

            var args = arguments;
            // 情况三： 传入两个以上参数
            if (arguments.length >= 2) {
                this.el.forEach(function (el) {
                    setAttr(el, args[0], args[1]);
                });
            }
        },
        hasClass: function (clsName) {
            var res = true;
            this.el.forEach(function (el, index) {
                if (el.classList) {
                    // 如果有多个元素，如有有一个没有则视为失败
                    if (!el.classList.contains(clsName))
                        res = false;
                } else {
                    var newClassName = "";
                    var i;
                    var classes = el.className.split(" ");
                    for(i = 0; i < classes.length; i++) {
                        if(classes[i] === name) {
                            break;
                        }
                    }
                    res = false;
                }
            });

            return res;
        },
        addClass: function () {
            var _addClass = function (el, name) {
                if (el.classList) {
                    el.classList.add(name);
                } else {
                    el.className += " " + name;
                }                
            }

            var names = arguments[0].split(" ");
            this.el.forEach(function (el, index) {
                names.forEach(function (name) {
                    _addClass(el, name);
                })
            });
        },
        removeClass: function () {
            var names = arguments[0].split(" ");
            var _removeClass = function (el, name) {
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
            }

            this.el.forEach(function (el, index) {
                names.forEach(function (name) {
                    _removeClass(el, name);
                })
            })
        },
        on: function (eventType, fn) {
            var el = this.el;
            var data = Data.getData(el);
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
            var data = Data.getData(el);
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
            var data = Data.getData(el);
            
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
                Data.removeData(data);
            }
        },
        animSub: function (topics) {

            var el = this.el;
            var data = Data.getData(el);
            if (!data.animate) data.animate = {};

            data.animate = topics;
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
            var data = Data.getData(el);
            var _this = this;
            if (!data || !data.animate) return;
            var queue = data.animate[topic];
            queue.forEach(function (step, index) {
                _this._execAnim(step);
            })
        },        
    }

    var module = function (selector) {
        var el;
        
        if (!selector) {
            el = [];
        // 如果传入参数是单个node节点/target
        } else if (selector && selector.nodeType && selector.nodeType === 1) {
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
        // 如果传入的是一个包装过的对象
        } else if (selector.version) {
            el = selector.el;
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