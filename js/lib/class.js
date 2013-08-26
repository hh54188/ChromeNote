var Class = (function () {

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

        function Class() {}
        Class.prototype = prototype;
        Class.prototype.constructor = Class;

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