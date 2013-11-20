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

    var Queue = function () {
        this._queue = [];
        this.step = null;
    };

    Queue.prototype = {
        constructor: this,
        push: function (step) {
            this._queue.push(step);
            if (!this.step) {
                this.exec();
            }
        },
        exec: function () {
            var _this = this;
            this.step = this._queue.shift();

            if (!this.step) {
                return;
            }           

            var el = this.step.el, fn = this.step.fn, trigger = false;

            // 考虑一种情况，比如target.animShow().animShow().animHide();
            // 第二个animShow()肯定不会执行动画，因为加的是相同的class
            // 这就导致第二个以后的永远也不会执行
            // 为了避免这种情况，需要setTimeout来执行帮忙执行
            setTimeout(function () {
                if (!trigger) {
                    _this.exec();
                }
            }, 1000);

            el.on("webkitAnimationEnd", function () {

                trigger = true;
                el.off("webkitAnimationEnd");
                _this.exec();
            });

            fn();
        }        
    }

    var Data = {}, que_seed = 0;

    var SetData = function (id, step) {
        if (!Data[id]) {
            Data[id] = new Queue();  
        } 
        Data[id].push(step);
    }

    $.fn.anim = function (name) {

        name = name || "bounce";
        this.attr("data-anim-id", ++que_seed);
        this.attr("data-anim-name", name);

        this.addClass(animation[name].init)
            .addClass("animated");

        return this;
    }

    $.fn.animShow = function (el) {
        
        var target = el || this;

        var name = this.attr("data-anim-name");
        if (!name || !animation[name]) {
            this.anim("bounce");
            name = "bounce";
        }
        /*
            此id为执行动画的队列id，比如
            div1.animShow().animShow(div2)
            id始终以div1为准，队列作为div1的队列
        */
        var id = this.attr("data-anim-id");

        var fn = function () {
            
            var name = target.attr("data-anim-name");
            if (!name || !animation[name]) {
                target.anim("bounce");
                name = "bounce";
            }

            target.removeClass(animation[name].init)
                .removeClass(animation[name].hide)
                .addClass(animation[name].show);
        }

        SetData(id, {
            el: target,
            fn: fn
        });

        return this;
    }

    $.fn.animHide = function (el) {
        
        var target = el || this;

        var name = this.attr("data-anim-name");
        if (!name || !animation[name]) {
            this.anim("bounce");
            name = "bounce";
        }
        var id = this.attr("data-anim-id");

        var fn = function () {        

            var name = target.attr("data-anim-name");
            if (!name || !animation[name]) {
                target.anim("bounce");
                name = "bounce";
            }

            target.removeClass(animation[name].init)
                .removeClass(animation[name].show)
                .addClass(animation[name].hide);
        }

        SetData(id, {
            el: target,
            fn: fn
        });

        return this;            
    }

})(jQuery, window, document);