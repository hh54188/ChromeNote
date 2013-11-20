;(function ( $, window, document) {


    var clear = function (el) {
        var className = [
            "flipInXStart",
            "flipOutXStart",
            "flipInYStart",
            "flipOutYStart",
            "bounceInStart",
            "bounceOutStart",
            "animated",
            "flip",
            "flipInX",
            "flipOutX",
            "flipInY",
            "flipOutY",
            "bounceIn",
            "bounceInUp",
            "bounceOut"
        ]

        className.forEach(function (name) {
            el.removeClass(name);
            el.removeAttr("data-anim-name");
        });
    }

    var animation = {
        flipX: {
            init: "flipInXStart",
            show: "flipInX",
            hide: "flipOutX"
        },
        flipY: {
            init: "flipInYStart",
            show: "flipInY",
            hide: "flipOutY"
        },
        bounce: {
            init: "bounceInStart",
            show: "bounceIn",
            hide: "bounceOut"
        }
    }

    var Queue = {
        queue: [],
        step: null,
        push: function (step) {
            this.queue.push(step);
            if (!this.step) {
                this.exec();
            }
        },
        pop: function () {
            if (this.queue.length) {
                return this.queue.pop();
            }

            return false;
        },
        exec: function () {
            var _this = this;
            this.step = this.queue.pop();
            // 若队列已空，则停止执行
            if (!this.step) {
                return;
            }           

            var el = this.step.el, fn = this.step.fn, trigger = false;

            setTimeout(function () {
                if (!trigger) {
                    _this.exec();
                }
            }, 300);

            el.on("webkitAnimationEnd", function () {
                trigger = true;
                el.off("webkitAnimationEnd");
                _this.exec();
            });

            fn();
        }
    }

    $.fn.anim = function (name) {
        name = name || "bounce";
        this.attr("data-anim-name", name);

        this.addClass(animation[name].init)
            .addClass("animated");

        return this;
    }

    $.fn.animShow = function (el) {
        var target = el || this;
        var fn = function () {
            var name = target.attr("data-anim-name");
            if (!name || !animation[name]) {
                target.anim("bounce");
            }

            target.removeClass(animation[name].init)
                .removeClass(animation[name].hide)
                .addClass(animation[name].show);
        }

        Queue.push({
            el: target,
            fn: fn
        });

        return this;
    }

    $.fn.animHide = function (el) {
        var target = el || this;
        var fn = function () {
            var name = target.attr("data-anim-name");
            if (!name || !animation[name]) {
                target.anim("bounce");
            }

            target.removeClass(animation[name].init)
                .removeClass(animation[name].show)
                .addClass(animation[name].hide);
        }

        Queue.push({
            el: target,
            fn: fn
        })

        return this;            
    }

})(jQuery, window, document);