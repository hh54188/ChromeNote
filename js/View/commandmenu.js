var CommandMenuView = (function () {
    var tpl = [
        '<div id="chromeNote-tip-note" class="chromeNote-tip chromeNote-transform-transition chromeNote-setup-3d-style chromeNote-board-arrow-left chromeNote-hide">',
            '<p>Write a sticky note on this page:)</p>',
        '</div>',
        '<div id="chromeNote-tip-mark" class="chromeNote-tip chromeNote-transform-transition chromeNote-setup-3d-style chromeNote-board-arrow-left chromeNote-hide">',
            '<p>Mark where I have read on this page:)</p>',
        '</div>',
        '<div id="chromeNote-board-setting" class="chromeNote-board chromeNote-transform-transition-point8-easeOutQuint chromeNote-setup-3d-style chromeNote-board-setting-hide">',
            '<i id="chromeNote-board-btn-close" class="icon-remove"></i>',
            '<p class="chromeNote-board-row chromeNote-transform-transition">',
                '<strong class="chromeNote-board-item">Theme:</strong>',
                '<select class="chromeNote-board-item">',
                    '<option>White</option>',
                    '<option>Black</option>',
                '</select>',
            '</p>',
            '<p class="chromeNote-board-row chromeNote-transform-transition">',
                '<input type="checkbox" class="chromeNote-board-item">',            
                '<strong class="chromeNote-board-item">Follow Mousemove</strong>',
            '</p>',            
        '</div>',
        '<div id="chromeNote-cmdMenu-mask" class="chromeNote-decorate-circle chromeNote-setup-3d-style chromeNote-transform-scale-point1 chromeNote-transform-transition">',
            '<div id="chromeNote-cmdMenu-wrap" class="chromeNote-decorate-circle chromeNote-setup-3d-style">',
                '<div id="chromeNote-cmdMenu-btnClose" class="chromeNote-decorate-circle chromeNote-setup-3d-style chromeNote-transform-translateZ">',
                    '<i class="chromeNote-cmdMenu-menuItem-text icon-off"></i>',
                '</div>',
                '<ul>',
                    '<li id="chromeNote-cmdMenu-note" class="chromeNote-cmdMenu-menuItem-outerWrap chromeNote-setup-3d-style chromeNote-transform-origin-100and100 chromeNote-transform-transition">',
                        '<a id="chromeNote-cmdMenu-menuItem-write" class="chromeNote-cmdMenu-menuItem-innerWrap chromeNote-decorate-circle chromeNote-transform-transition chromeNote-transform-origin-x67y21" href="javascript:void(0)">',
                            // '<div class="chromeNote-cmdMenu-subMenuItem chromeNote-decorate-circle chromeNote-transform-transition chromeNote-transform-origin-100and100"></div>',
                            '<i class="chromeNote-cmdMenu-menuItem-text icon-pencil"></i>',
                        '</a>',
                    '</li>',
                    '<li id="chromeNote-cmdMenu-setting" class="chromeNote-cmdMenu-menuItem-outerWrap chromeNote-setup-3d-style chromeNote-transform-origin-100and100 chromeNote-transform-transition">',
                        '<a id="chromeNote-cmdMenu-menuItem-setting" class="chromeNote-cmdMenu-menuItem-innerWrap chromeNote-decorate-circle chromeNote-transform-transition chromeNote-transform-origin-x67y21" href="javascript:void(0)">',
                            '<i class="chromeNote-cmdMenu-menuItem-text icon-gear"></i>',
                        '</a>',
                    '</li>',
                    '<li id="chromeNote-cmdMenu-mark" class="chromeNote-cmdMenu-menuItem-outerWrap chromeNote-setup-3d-style chromeNote-transform-origin-100and100 chromeNote-transform-transition">',
                        '<a id="chromeNote-cmdMenu-menuItem-mark" class="chromeNote-cmdMenu-menuItem-innerWrap chromeNote-decorate-circle chromeNote-transform-transition chromeNote-transform-origin-x67y21" href="javascript:void(0)">',
                            '<i class="chromeNote-cmdMenu-menuItem-text icon-bookmark"></i>',
                        '</a>',
                    '</li>',
                '</ul>',
            '</div>',
        '</div>'
    ].join("");

    var config = {
        theme: "white",
        showTip: true,
        threeD: false
    };

    var initialize = false;

    var isOpen = false;
    var doms = {};

    function initSubAngle(elem) {
        var total = 360;
        var elems = elem.querySelectorAll(".chromeNote-cmdMenu-subMenuItem");
        if (!elems) return;
        var len = elems.length;

        var eachAngle = total / len;
        for (var i = 0; i < elems.length; i++) {
            var el = elems[i];

            var outerRotateDeg = (i * eachAngle) + (eachAngle - 90);
            var rotate = " rotate(" + outerRotateDeg + "deg) ";            

            el.style.webkitTransform += rotate;
        }
    }

    function initAngle(elems) {
        var total = 360;
        var len = elems.length
        var eachAngle = total / len;

        for (var i = 0; i < elems.length; i++) {
            var el = elems[i];
            var innerEl = el.querySelector(".chromeNote-cmdMenu-menuItem-innerWrap");
            /*
                outer element
            */

            // eachAngle - 90: 保证工整
            var outerRotateDeg = (i * eachAngle) + (eachAngle - 90);
            // 如果只有两个菜单项，则公式不管用了
            if (len == 2) {
                outerRotateDeg = outerRotateDeg + 45;
            }

            var rotate = " rotate(" + outerRotateDeg + "deg) ";

            var outerSkewXDeg = 90 - eachAngle;
            if (len == 2) {
                outerSkewXDeg = 0;
            }
            var skewX = " skewX(" + outerSkewXDeg + "deg) ";

            el.style.webkitTransform += rotate + skewX;

            /*
                inner element
            */
            var innerSkewXDeg = outerSkewXDeg * (-1);
            var innerRotateDeg = parseFloat(eachAngle) / 2;
            if (len == 2) {
                innerRotateDeg = 45;
            }

            rotate = " rotate(" + innerRotateDeg + "deg) ";
            skewX = " skewX(" + innerSkewXDeg + "deg) ";

            innerEl.style.webkitTransform += skewX + rotate;
            // initSubAngle(innerEl);

            /*
                text element
            */
            var text = innerEl.querySelector(".chromeNote-cmdMenu-menuItem-text");

            var textRotateDeg = (-1) * outerRotateDeg + (-1) * innerRotateDeg;
            var textRotate = " rotate(" + textRotateDeg + "deg) ";
            text.style.webkitTransform += textRotate;
        }
    }

    function eventBind() {
        doms.widget.btnSetting.on("click", function () {
            doms.setting.board.animPub("open");
        });

        doms.setting.btnClose.on("click", function () {
            doms.setting.board.animPub("close");  
        });

        doms.widget.btnClose.on("click", function () {
            close();
        })

        // doms.widget.
    }

    var init = function () {
        var body = document.querySelector("body");
        var world = document.createElement("div");

        world.className = ["chromeNote-setup-3d-perspective", "chromeNote-transform-transition-point8-easeOutQuint", "chromeNote-hide"].join(" ");
        world.setAttribute("id", "chromeNote-threeDWorld");
        world.innerHTML = tpl;

        body.className += " theme-white ";
        body.appendChild(world);

        initAngle(document.querySelectorAll(".chromeNote-cmdMenu-menuItem-outerWrap"));

        doms = {
            world: $(world),
            body: $(body),
            menuItems: $(".chromeNote-cmdMenu-menuItem-outerWrap"),
            widget: {
                wrap: $("#chromeNote-cmdMenu-mask"),
                btnSetting: $("#chromeNote-cmdMenu-menuItem-setting"),
                btnNote: $("#chromeNote-cmdMenu-menuItem-note"),
                btnMark: $("#chromeNote-cmdMenu-menuItem-mark"),
                btnClose: $("#chromeNote-cmdMenu-btnClose"),
            },
            setting: {
                board: $("#chromeNote-board-setting"),
                btnClose: $("#chromeNote-board-btn-close")
            },
            tips: {
                note: $("#chromeNote-tip-note"),
                mark: $("#chromeNote-tip-mark")
            }
        };


        eventBind();

        doms.setting.board.animSub("open")
            .queue(function () {
                doms.setting.board.removeClass("chromeNote-board-setting-hide");
                doms.setting.board.addClass("chromeNote-board-setting-show");
            })
            .queue(function () {
                doms.widget.wrap.addClass("chromeNote-blur");
            })

        doms.setting.board.animSub("close")
            .queue(function () {
                doms.setting.board.removeClass("chromeNote-board-setting-show");
                doms.setting.board.addClass("chromeNote-board-setting-hide");
            })
            .queue(function () {
                doms.widget.wrap.removeClass("chromeNote-blur");
            })

        doms.widget.wrap.animSub("open")
            .queue(function () {
                doms.world.removeClass("chromeNote-hide")
            })
            .queue(function () {
                doms.widget.wrap.removeClass("chromeNote-transform-scale-point1 animateScaleDown");
            })
            .anim(function () {
                doms.widget.wrap.addClass("animateScaleUp");
            })
            .queue(function () {
                doms.widget.wrap.addClass("chromeNote-transform-scale-one")
            })

        doms.widget.wrap.animSub("close")
            .queue(function () {
                doms.widget.wrap.removeClass("chromeNote-transform-scale-one animateScaleUp");
            })
            .anim(function () {
                doms.widget.wrap.addClass("animateScaleDown");
            })
            .queue(function () {
                doms.widget.wrap.addClass("chromeNote-transform-scale-point1");
            })
            .queue(function () {
                doms.world.addClass("chromeNote-hide");
            })

        initialize = true;
    };

    var open = function (event) {
        // 单例模式
        if (!initialize) init();
        var pos = doms.world.getAppropriatePos({
            top: event.clientY,
            left: event.clientX
        })

        setPos(pos);

        if (isOpen) return;

        isOpen = true;

        doms.widget.wrap.animPub("open");
    };

    var close = function (pos) {
        isOpen = false;
        doms.widget.wrap.animPub("close");
    };

    var setPos = function (pos) {
        doms.world[0].style.top = pos[0] + "px";
        doms.world[0].style.left = pos[1] + "px";
    }

    var getData = function () {
        return doms.widget.wrap.getData();
    }

    return {
        open: open,
        close: close,
        getData: getData
    };
})();