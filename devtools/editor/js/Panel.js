var Panel = (function () {
    var doms = {
        wrap: $(".editor-panel"),
        btn: {
            "submit": $("#panel-btn-submit"),
            "close": $("#panel-btn-close"),
            "return": $("#panel-btn-return"),
            "showAll": $("#panel-btn-showAll"),
            "hideAll": $("#panel-btn-hideAll")
        }
    }

    doms.btn.submit.on("click", function () {
        Editor.fire("submit");
    });

    var enableSubmit = function () {
        doms.btn.submit.show();
    }

    var disableSubmit = function () {
        doms.btn.submit.hide();
    }

    return {
        enableSubmit: enableSubmit,
        disableSubmit: disableSubmit
    }
})()