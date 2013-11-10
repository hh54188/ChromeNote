var Select = (function () {

    var curRange = null;

    var getSelection = function () {

        var selection = window.getSelection();

        // 如果没有选中任何内容
        if (selection.isCollapsed) {
            return null
        }

        // 在按住ctrl下可以选中多个？
        // 但是在window中貌似不行，默认选中第一个
        var selectRange = selection.getRangeAt(0);
        if (selectRange.collapsed) {
            return null
        }

        curRange = selectRange;
        return {
            selection: selection,
            range: curRange
        }

    }

    var highlight = function () {
        var surround = document.createElement("em");
        curRange.surroundContents(surround);
    }

    return {
        getSelection: getSelection,
        highlight: highlight
    }

})()