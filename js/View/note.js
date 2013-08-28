var noteView = Class.extend({
    staticProperty: {
        allowDrag: false
    },
    staticMethods: {
        startDrag: function () {
            this.allowDrag = true;
        },
        endDrag: function () {
            this.allowDrag = false;
        },
        drag: function (event) {
            if (!this.allowDrag) return;
            var target = event.target;

            var difX = event.clientX - parseInt(target.style.left),
                difY = event.clientY - parseInt(target.style.top);

            target.style.left = event.clientX - difX + "px";
            target.style.top = event.clientY - difY + "px";
        }
    }
})