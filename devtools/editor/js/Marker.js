var Marker = (function () {

    var markerTpl = [

    ]

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

    var bindEvent = function () {

        $(document).on("scroll", function () {
            cfg.min = doms.body.scrollTop;
            cfg.max = doms.body + window.innerHeight;

            data.forEach(function (el) {
                el.node.css("top", el.pageY - doms.body.scrollTop + "px");

                if (el.pageY > cfg.min && el.pageY < cfg.max) {

                    if (el.status.to == "middle") return;

                    el.status.from = el.status.to;
                    el.status.to = "middle";

                    if (el.status.from == "above") {
                        cfg.count.above--;
                    } else if (el.status.from == "below") {
                        cfg.count.below--;
                    }

                } else if (el.pageY <= cfg.min) {

                    if (el.status.to == "above") return;

                    el.status.from = el.status.to;
                    el.status.to = "above";
                    
                    cfg.count.above++;

                } else if (el.pageY <= cfg.max) {

                    if (el.status.to == "below") return;

                    el.status.from = el.status.to;
                    el.status.to = "below";

                    cfg.count.below++;
                }
                
            });
        });
    }

})();