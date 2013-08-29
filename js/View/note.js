var noteView = Class.extend({
    staticProperty: {
        /*
            Drag
        */
        allowDrag: false,
        dragTarget: 0,
        dragOffsetX: 0,
        dragOffsetY: 0
    },
    staticMethods: {
        startDrag: function (event) {
            this.allowDrag = true;
            this.dragTarget = event.target;

            $('body').addClass("is_drag");
            this.dragOffsetX = event.clientX - parseInt(event.target.style.left);
            this.dragOffsetY = event.clientY - parseInt(event.target.style.top);
        },
        endDrag: function (event) {
            $('body').removeClass("is_drag");
            this.allowDrag = false;
            this.dragTarget = null;
            
            this.dragOffsetX = 0;
            this.dragOffsetY = 0;            
        },
        drag: function (event) {
            if (!this.allowDrag || !this.dragTarget) return;


            this.dragTarget.style.left = event.clientX - this.dragOffsetX + "px";
            this.dragTarget.style.top = event.clientY - this.dragOffsetY + "px";
        }
    }
})