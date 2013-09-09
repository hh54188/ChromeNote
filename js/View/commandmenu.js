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

    function initAngle(elems) {
        var total = 360;
        var len = elems.length
        var eachAngle = total / len;

        for (var i = 0; i < elems.length; i++) {
            var el = elems[i];
            var innerEl = el.querySelector(".chromeNote-cmdMenu-menuItem-innerWrap");
            /*
                eachAngle - 90: 保证工整
            */
            var outerRotateDeg = (i * eachAngle) + (eachAngle - 90);

            var rotate = " rotate(" + outerRotateDeg + "deg) ";

            var outerSkewXDeg = 90 - eachAngle;
            var skewX = " skewX(" + outerSkewXDeg + "deg) ";

            el.setAttribute("data-rotate", outerRotateDeg);
            el.setAttribute("data-skewX", outerSkewXDeg);
            el.style.webkitTransform += rotate + skewX;

            var innerSkewXDeg = outerSkewXDeg * (-1);
            var innerRotateDeg = parseFloat(eachAngle) / 2;


            rotate = " rotate(" + innerRotateDeg + "deg) ";
            skewX = " skewX(" + innerSkewXDeg + "deg) ";

            innerEl.style.webkitTransform += skewX + rotate;

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

        doms.setting.board.animSub({
            open: [
                {
                    elem: doms.setting.board,
                    before: {
                        removedClass: ["chromeNote-board-setting-hide"],
                        addedClass: ["chromeNote-board-setting-show"]
                    }
                },
                {
                    elem: doms.widget.wrap,
                    before: {
                        addedClass: ["chromeNote-blur"]
                    }
                }
            ],
            close: [
                {
                    elem: doms.setting.board,
                    before: {
                        removedClass: ["chromeNote-board-setting-show"],
                        addedClass: ["chromeNote-board-setting-hide"]
                    }
                },
                {
                    elem: doms.widget.wrap,
                    before: {
                        removedClass: ["chromeNote-blur"]
                    }
                }
            ]
        })
        
        doms.widget.wrap.animSub({
            open: [
                {
                    elem: doms.world,
                    before: {
                        removedClass: ["chromeNote-hide"],
                    }
                },
                {
                    elem: doms.widget.wrap,
                    before: {
                        removedClass: ["chromeNote-transform-scale-point1", "animateScaleDown"],
                    },
                    animateClass: "animateScaleUp",
                    after: {
                        addedClass: ["chromeNote-transform-scale-one"]
                    }
                }
            ],
            close: [
                {
                    elem: doms.widget.wrap,
                    before: {
                        removedClass: ["chromeNote-transform-scale-one", "animateScaleUp"]
                    },
                    animateClass: "animateScaleDown",
                    after: {
                        addedClass: ["chromeNote-transform-scale-point1"],
                        callback: function () {
                            doms.world.addClass("chromeNote-hide");
                        }
                    }
                },
            ]
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