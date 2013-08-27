var NoteView = Class.extend({
    staticProperty: {
        drawBox: $("#note-draw_box"),
        startPos: {
            x:0,
            y:0
        }        
    },
    staticMethods: {
        init: function (args) {
            console.log(this.startPos);
        },
        expandBox: function (e) {
            var div = this.drawBox[0];
            
            var setPosition = function (x, y) {
                div.style.left = x + "px";
                div.style.top = y + "px";
            }

            var start = this.startPos;

            end = {
                x: e.clientX,
                y: e.clientY
            }

            var width = Math.abs(start.x - end.x);
            var height = Math.abs(start.y - end.y);

            div.style.width = width + "px";
            div.style.height = height + "px";

            // 左上
            if (end.y < start.y && end.x < start.x) {
                setPosition(end.x, end.y);
            // 右上角
            } else if (end.y < start.y && end.x > start.x) {
                setPosition(start.x, end.y);
            // 左下
            } else if (end.y > start.y && end.x < start.x) {
                setPosition(end.x, start.y);
            // 右上
            } else if (end.y > start.y && end.x > start.x) {
                setPosition(start.x, start.y);
            }
        },
        recordStartPos: function (e) {
            this.startPos = {
                x: e.clientX,
                y: e.clientY
            }

            this.drawBox[0].style.left = this.startPos.x + "px";
            this.drawBox[0].style.top = this.startPos.y + "px";
        }
    },

    methods: {
        create: function () {
            console.log("create");
        },
        destory: function () {
            console.log("destory");
        }
    }
})
