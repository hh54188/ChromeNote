var Panel = (function () {
    var doms = {
        btn: {
            "submit": $("#panel-btn-submit"),
            "close": $("#panel-btn-close"),
            "return": $("#panel-btn-return"),
            "config": $("#panel-btn-config")
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