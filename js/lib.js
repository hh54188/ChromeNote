var $ = (function () {

    function _$(el) {

        this.getTargetId = function () {
            var id = el.getAttribute("data-note-uuid");
            return id? id: 0;
        }

        this.getTargetType = function () {
            var type = el.getAttribute("data-note-type");
            return type? type: "node";
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

        })()

        this.on = function (eventType, fn) {
            var data = _e.getData(el);
        }
    }

    return function (selector) {
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
})()