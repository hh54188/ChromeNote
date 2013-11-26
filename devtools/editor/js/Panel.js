var Panel = (function () {
    var doms = {
        body: $("body")
    };

    var isOpen = true;

    var bindEvent = function () {

        doms.body.on("dblclick", function (e) {
            var top = e.clientY;

            if (!doms.wrap) {
                Editor.init();

                doms.wrap = $(".editor-panel"),
                doms.btn = {
                    "submit": $("#panel-btn-submit"),
                    "close": $("#panel-btn-close"),
                    "return": $("#panel-btn-return"),
                    "showAll": $("#panel-btn-showAll"),
                    "hideAll": $("#panel-btn-hideAll")
                }

                Editor.on("change", function () {
                    if (this.composer.getTextContent().trim()) {
                        Panel.enableSubmit();
                    } else {
                        Panel.disableSubmit();
                    }
                });

                Editor.on("submit", function () {
                    var html = this.getValue();
                    hidePanel();
                    Tip.generate(html, top);
                });                

                doms.btn.submit.on("click", function () {
                    Editor.fire("submit");
                });

                doms.btn.close.on("click", function () {
                    hidePanel();
                })                
            }

            // 无需重置高度
            if (!isOpen) {
                isOpen = true;
                Editor.reset();
                doms.wrap.show();
            }

            Editor.focus();
            doms.wrap.css("top", top + "px");
        })

    }
    
    bindEvent();

    var moveTo = function (top) {
        doms.wrap.css("top", top + "px");
        doms.wrap.show();
    }

    var hidePanel = function () {
        isOpen = false;
        doms.wrap.hide();
    }

    var enableSubmit = function () {
        doms.btn.submit.show();
    }

    var disableSubmit = function () {
        doms.btn.submit.hide();
    }

    return {
        moveTo: moveTo,
        enableSubmit: enableSubmit,
        disableSubmit: disableSubmit
    }
})()