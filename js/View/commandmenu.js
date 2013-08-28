var CommandMenuView = Class.extend({
    staticProperty: {
        isOpen: false
    },
    staticMethods: {
        show: function () {
            if (this.isOpen) {
                this.hide();
            }
            this.isOpen = true
            log("show menu");
        },
        hide: function () {
            if (!this.isOpen) return;
            this.isOpen = false;
            log("hide menu");
        }
    }
})