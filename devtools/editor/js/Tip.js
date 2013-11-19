var Tip = (function () {

    var tpl = [
        '<div class="tip-item-wrap">',
            '<div class="tip-item arrow_box"></div>',
            '<div class="tip-btn-group">',
                '<button class="tip-btn-del tip-btn"><i class="fa fa-trash-o"></i></button>',
                '<button class="tip-btn-share tip-btn"><i class="fa fa-share"></i></button>',
                '<button class="tip-btn-share-item tip-btn margin-left-30" ><i class="fa fa-twitter"></i></button>',
                '<button class="tip-btn-share-item tip-btn"><i class="fa fa-facebook"></i></button>',
                '<button class="tip-btn-share-item tip-btn"><i class="fa fa-google-plus"></i></button>',
            '</div>',
        '</div>'
    ].join("");

    var doms = {
        body: $("body")
    }

    var bindEvent = function (item) {
        var btnGroup = item.find(".tip-btn-group");
        var shareItem = item.find(".tip-btn-share-item");
        var shareBtn = item.find(".tip-btn-share");

        item.on("mouseover", function () {
            btnGroup.show();
        }).on("mouseout", function () {
            btnGroup.hide();
        });

        shareBtn.on("mouseover", function () {
            
        })
    }

    var generate = function (innerHTML) {
        var item = $(tpl);
        var content = item.find(".tip-item");
        content.html(innerHTML);

        doms.body.append(item);
        bindEvent(item);
    }

    return {
        generate: generate
    }
})()