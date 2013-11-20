var Editor = (function () {
    var editor = null;
    var id = "wysihtml5";
    var pressedKey = [];
    var richModeOnHeight = 100;
    var richModeOffHeight = 50;

    var eventMap = {
        "focus": "focus:composer",
        "blur": "blur:composer",
        "change": [],
        "submit": []
    }

    var richModeOn = function () {
        editor.toolbar.show();
        editor.composer.iframe.style.height = richModeOnHeight + "px";

        $("#btn-show-editor").hide();
        $("#btn-hide-editor").show();
    }

    var richModeOff = function () {
        editor.toolbar.hide();
        editor.composer.iframe.style.height = richModeOffHeight + "px";

        $("#btn-hide-editor").hide();
        $("#btn-show-editor").show();            
    }

    var shortCut = function (keys) {
        var map = {
            submit: [17, 13]
        }
        var matched = true;
        for (var act in map) {
            matched = true;
            var actKey = map[act];

            if (actKey.length == keys.length) {
                for (var i = 0; i < actKey.length; i++) {
                    if (keys.indexOf(actKey[i]) <= -1) {
                        matched = false;
                        break;
                    }
                }
                if (matched) {
                    return act;    
                }
            }
        }
        return false;
    }

    var init = function () {
        editor = new wysihtml5.Editor(id + "-textarea", {
            style: false,
            toolbar: id + "-toolbar", 
            composerClassName: "editor-area",
            parserRules: myrules,
            stylesheets: ["css/lib/bootstrap.min.css"]
        });

        editor.on("load", function () {
            // 默认隐藏工具栏
            this.toolbar.hide();

            // 设置编辑区域字体大小
            editor.composer.doc.body.style.fontSize = "12px";

            // 注册快捷键
            $(editor.composer.doc.body).on("keydown", function (e) {

                pressedKey.push(e.keyCode);
                var act = shortCut(pressedKey);
                if (act == "submit") {
                    triggerEvent(act);
                    // 阻止输入字符
                    return false;    
                }
                
            }).on("keyup", function (e) {

                for (var i = 0; i < pressedKey.length; i++) {
                    var el = pressedKey[i];
                    if (el == e.keyCode) {
                        pressedKey.splice(i--, 1);
                    }        
                }

                triggerEvent("change");
            });

            // 富文本编辑切换
            $("#btn-show-editor").on("click", function () {
                richModeOn();
            })

            $("#btn-hide-editor").on("click", function () {
                richModeOff();
            })            
        });        
    }

    var bindEvent = function (evt, handler) {
        if (!eventMap[evt]) return false;

        if (Object.prototype.toString.call(eventMap[evt]) == "[object Array]") {
            eventMap[evt].push(handler.bind(editor));
        } else {
            editor.on(eventMap[evt], handler);    
        }
    }

    var triggerEvent = function (evt) {
        if (!eventMap[evt]) return false;

        if (Object.prototype.toString.call(eventMap[evt]) == "[object Array]") {

            eventMap[evt].forEach(function (fn) {
                fn();
            });
        }
    }

    return {
        init: init,
        on: bindEvent,
        fire: triggerEvent
    }

})()