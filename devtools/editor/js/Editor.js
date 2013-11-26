var Editor = (function () {


    var editorTpl = [
        '<div class="editor-panel transition">',
            '<div class="editor-container">',
                '<div id="wysihtml5-toolbar" class="editor-toolbar" style="display: none;">',
                    '<div class="btn-group editor-group">',
                        '<button data-wysihtml5-command="bold" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-bold"></i>',
                        '</button>',
                        '<button data-wysihtml5-command="italic" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-italic"></i>',
                        '</button>',
                        '<button data-wysihtml5-command="underline" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-underline"></i>',
                        '</button>',
                    '</div>',
                    '<div class="btn-group editor-group ">',
                        '<button data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="pre" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-code"></i>',
                        '</button>',
                        '<button data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="blockquote" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-quote-left"></i>',
                        '</button>',
                    '</div>',
                    '<div class="btn-group editor-group ">',
                        '<button data-wysihtml5-command="insertOrderedList" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-list-ol"></i>',
                        '</button>',
                        '<button data-wysihtml5-command="insertUnorderedList" class="btn btn-default btn-sm" >',
                            '<i class="fa fa-list-ul"></i>',
                        '</button>',
                    '</div>',
                '</div>',
                '<textarea id="wysihtml5-textarea" style="height: 50px; width: 100%; margin-bottom: 5px;" placeholder="Enter your text ..."></textarea>',
                '<div id="editor-toolbar">',
                    '<button id="btn-show-editor" class="btn btn-default btn-xs pull-left">Show Rich Editor</button>',
                    '<button id="btn-hide-editor" style="display:none;" class="btn btn-default btn-xs pull-left">hide Rich Editor</button>',
                    '<button class="btn btn-default btn-xs pull-right toolbar-editor-btn">',
                        '<i class="fa fa-keyboard-o"></i>',
                    '</button>',
                    '<div class="clearfix"></div>',
                '</div>',
                '<div id="editor-expand-handle"></div>',
            '</div>',
            '<div class="panel-btn-group">',
                '<button id="panel-btn-return" class="panel-btn" style="display:none;"><i class="fa fa-chevron-up"></i></button>',
                '<button id="panel-btn-close" class="panel-btn"><i class="fa fa-times"></i></button>',
                '<button id="panel-btn-submit" class="panel-btn" style="display:none;"><i class="fa fa-check"></i></button>',
                '<button id="panel-btn-showAll" style="display:none;" class="panel-btn"><i class="fa fa-eye"></i></button>',
                '<button id="panel-btn-hideAll" class="panel-btn"><i class="fa fa-eye-slash"></i></button>',
            '</div>',
        '</div>'
    ].join("");

    var editor = null;
    var id = "wysihtml5";
    var pressedKey = [];
    var richModeOnHeight = 100;
    var richModeOffHeight = 50;
    var doms = {};

    var eventMap = {
        "focus": "focus:composer",
        "blur": "blur:composer",
        "change": [],
        "submit": []
    }

    var richModeOn = function () {
        editor.toolbar.show();

        $("#btn-show-editor").hide();
        $("#btn-hide-editor").show();
    }

    var richModeOff = function () {
        editor.toolbar.hide();

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
    
    var delegateOnBody = function () {

        var pressed = false;
        var originHeight = 0;
        var originTop =  0;
        var min = 50, max = 300;

        var minHeight = parseInt(doms.textarea.css("height"));

        // 输入框可拖拽伸展
        doms.body.on("mousedown", function (e) {

            var target = $(e.target);

            if (target.attr("id") != "editor-expand-handle") return;

            if (doms.textarea.length == 0) 
                doms.textarea = $(".editor-container iframe");

            pressed = true;

            originTop = target[0].getBoundingClientRect().top;
            originHeight = parseInt(doms.textarea.css("height")) + 6;

            doms.body.addClass("user-select-none");

        }).on("mouseup", function (e) {

            pressed = false;
            doms.body.removeClass("user-select-none");

        }).on("mousemove", function (e) {

            if (!pressed) return;

            var height = e.clientY - originTop + originHeight;

            if (height >= min && height <= max) {
                doms.textarea.css('height', height + "px");
            }

        });
    }

    var reset = function () {
        editor.clear();
        $(editor.composer.iframe).removeAttr("style");
    }

    var focus = function () {
        editor.focus();
    }

    var content = function (html) {
        editor.setValue(html);
    }

    var init = function () {
        $("body").append($(editorTpl));

        editor = new wysihtml5.Editor(id + "-textarea", {
            style: false,
            toolbar: id + "-toolbar", 
            composerClassName: "editor-area",
            parserRules: myrules,
            stylesheets: ["css/lib/bootstrap.min.css"]
        });

        console.log(editor);

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
            });

            doms = {
                expand: $("#editor-expand-handle"),
                body: $("body"),
                textarea: $(".editor-container iframe")
            }

            delegateOnBody();   
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
        focus: focus,
        // API
        reset: reset,
        content: content,
        // Event
        on: bindEvent,
        fire: triggerEvent
    }

})()