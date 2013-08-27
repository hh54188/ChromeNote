var Class = (function () {
    // helper:
    var isEmptyObject = function (obj) {
        for (var key in obj) {
            return false;
        }

        return true;
    }

    var mergeObj = function () {
        var obj = {};
        var agrs = Array.prototype.slice.call(arguments);
        agrs.forEach(function (props, index) {
            for (var key in props) {
                obj[key] = props[key];
            }
        })

        return obj;
    }

    function Class() {}

    Class.extend = function (props) {

        var prototype = new this();

        var _super = Class.prototype;

        if (_super.init) {
            var tmp = prototype.__callSuper;
            if (_super.__callSuper) {
                prototype.__callSuper = _super.__callSuper;
            }
            _super.init.apply(this, arguments);
            prototype.__callSuper = tmp;
        }

        var staticMethods = props.staticMethods || {},
            staticProperty = props.staticProperty || {},
            property = props.property || {},
            methods = props.methods || {};

        props = mergeObj(staticMethods, property, methods);

        for (var name in props) {

            if (typeof props[name] == "function" && typeof _super[name] == "function") {

                prototype[name] = (function (super_fn, fn) {
                    return function () {
                        var tmp = this.callSuper;

                        this.callSuper = super_fn;

                        var ret = fn.apply(this, arguments);

                        this.callSuper = tmp;

                        if (!this.callSuper) {
                            delete this.callSuper;
                        }
                        return ret;
                    }
                })(_super[name], props[name]);
            } else {
                prototype[name] = props[name];    
            }
        }

        for (var name in props) {
            prototype[name] = props[name];
        }

        function Class() {}
        Class.prototype = prototype;
        Class.prototype.constructor = Class;

        
        if (!isEmptyObject(staticMethods) || !isEmptyObject(staticProperty)) {
            var mergeResult = mergeObj(staticProperty, staticMethods)
            for (var fn in mergeResult) {
                Class[fn] = mergeResult[fn];
            }
        }

        Class.create = function () {
            var instance = new this();

            if (arguments.callSuper && instance.__callSuper) {
                instance.__callSuper();
            }

            if (instance.init) {
                instance.init.apply(instance, arguments);
            }

            return instance;
        }

        return Class;
    }

    return Class;

})();