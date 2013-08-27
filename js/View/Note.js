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
