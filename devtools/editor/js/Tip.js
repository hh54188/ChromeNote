var Tip = (function () {

    var tpl = [
        '<div class="tip-item-wrap">',
            '<div class="tip-item arrow_box"></div>',
            '<div class="tip-btn-group">',
                '<button class="tip-btn-del tip-btn"><i class="fa fa-trash-o"></i></button>',
                '<button class="tip-btn-share tip-btn"><i class="fa fa-share"></i></button>',
                '<button class="tip-btn-share-item tip-btn-share-twit tip-btn margin-left-30" ><i class="fa fa-twitter"></i></button>',
                '<button class="tip-btn-share-item tip-btn-share-face tip-btn"><i class="fa fa-facebook"></i></button>',
                '<button class="tip-btn-share-item tip-btn-share-goog tip-btn"><i class="fa fa-google-plus"></i></button>',
            '</div>',
            '<div class="tip-item-handle"></div>',
        '</div>'
    ].join("");

    var doms = {
        body: $("body"),
        track: $('<div class="tip-track"></div>')
    }

    var delegateOnBody = function () {
        var curTarget = null;
        var dis = 0;

        doms.body.on("mousedown", function (e) {

            var target = $(e.target);
            if (!target.hasClass("tip-item-handle")) return;

            curTarget = target.parents(".tip-item-wrap");
            dis = e.clientY - parseInt(curTarget.css("top"));
            doms.body.append(doms.track);
            doms.body.addClass("cursor-move user-select-none");

        }).on("mouseup", function (e) {

            if (!curTarget) return;

            curTarget = null;
            doms.track.remove();
            doms.body.removeClass("cursor-move user-select-none");

        }).on("mousemove", function (e) {
            if (!curTarget) return;

            curTarget.css({
                top: e.clientY - dis + "px"
            })
        })
    }();

    var hide = function (item) {
        item.animHide().animNone();
    }

    var bindEvent = function (item) {
        var btnGroup = item.find(".tip-btn-group");
        var shareBtn = item.find(".tip-btn-share");
        var removeBtn = item.find(".tip-btn-del");

        var shareItem = item.find(".tip-btn-share-item");
        var sharetwit = item.find(".tip-btn-share-twit");
        var shareface = item.find(".tip-btn-share-face");
        var sharegoog = item.find(".tip-btn-share-goog");

        removeBtn.on("click", function () {
            hide(item);
        });

        item.on("click", function () {
            var top = item[0].getBoundingClientRect().top;
            // hide(this);
            Panel.moveTo(top);
        })
    }

    var generate = function (innerHTML, top) {
        var item = $(tpl);
        item.css({
            top: top + "px"
        })

        item.anim("flipX");
        var content = item.find(".tip-item");
        content.html(innerHTML);

        doms.body.append(item);
        bindEvent(item);
        item.animShow();
    }

    return {
        generate: generate
    }
})()