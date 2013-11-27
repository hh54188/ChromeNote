var Marker = (function () {

    var markerTpl = [
    '<div class="marker">',
        '<div class="marker-inner">',
            '<i class="fa fa-info"></i>',
        '</div>',
    '</div>'
    ].join("");

    var data = [];

    var cfg = {
        min: 0,
        max: 0,
        count: {
            above: 0,
            below: 0
        }
    }

    var doms = {
        body: $(document.body)
    }

    var insert = function (queue, item) {
        var seq = parseInt(queue.length / 2);
        if (queue[seq].pageY > item.pageY ) {

        }
    }

    var syncStatus = function (el, status) {
        if (el.status.to == status) return;

        el.status.from = el.status.to;
        el.status.to = status;
    }

    var generate = function (top) {
        var item = $(markerTpl);
        item.css("top", top + "px");
        doms.body.append(item);
    }

    var bindEvent = function () {

        $(document).on("scroll", function () {
            cfg.min = doms.body.scrollTop;
            cfg.max = doms.body + window.innerHeight;

            data.forEach(function (el) {
                el.node.css("top", el.pageY - doms.body.scrollTop + "px");

                if (el.pageY > cfg.min && el.pageY < cfg.max) {

                    syncStatus("middle");

                    if (el.status.from == "above") {
                        cfg.count.above--;
                    } else if (el.status.from == "below") {
                        cfg.count.below--;
                    }

                } else if (el.pageY <= cfg.min) {

                    syncStatus("above");
                    cfg.count.above++;

                } else if (el.pageY >= cfg.max) {

                    syncStatus("below");
                    cfg.count.below++;
                }
                
            });
        });
    }
    
    // bindEvent();

})();