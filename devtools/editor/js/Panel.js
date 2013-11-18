var Panel = (function () {
    var doms = {
        btn: {
            "submit": $("#panel-btn-submit"),
            "close": $("#panel-btn-close"),
            "return": $("#panel-btn-return"),
            "config": $("#panel-btn-config")
        }
    }

    GlobalEvent.on("editor:focus", function (data) {
        console.log("FOCUS", doms.btn.submit);
        doms.btn.submit.show();
        doms.btn.config.hide();
    });

    GlobalEvent.on("editor:blur", function (data) {
        console.log("BLUR", doms.btn.submit);
        doms.btn.submit.hide();
        doms.btn.config.show();
    });

})()