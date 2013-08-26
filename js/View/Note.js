var NoteView = Class.extend({
    /*
        Property:
    */
    initialization: false,
    drawBox: $("#note-draw_box"),
    startPos: {
        x: 0,
        y:0
    },
    /*
        Methods:
    */
    init: function (args) {
        var cfg = {};

    },
    recordStartPos: function (e) {
        this.startPos = {
            x: e.clientX,
            y: e.clientY
        }
        
        this.drawBox.left = this.startPos.x;
        this.drawBox.top = this.startPos.y;
    },
    create: function () {
        console.log("create");
    },
    destory: function () {
        console.log("destory");
    }
})