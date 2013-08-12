(function () {
    log = console.log.bind(console);

    var cfg = (function () {
        var cfg = {
            leftBtnPressed: false,
            rightBtnPressed: false,
            moved: false,

            startPos: {
                x: 0,
                y: 0,
            },
            endPos: {
                x: 0,
                y: 0
            }
        };

        var action = {
            // 创建便签
            create: {
                condition: {
                    leftBtnPressed: false,
                    rightBtnPressed: true,
                    moved: true
                }
            },
            // 储存起始位置
            startPos: {
                condition: {
                    leftBtnPressed: false,
                    rightBtnPressed: true,
                    moved: false
                }
            },
            test: {
                condition: {
                    leftBtnPressed: false,
                    rightBtnPressed: false,
                    moved: true                        
                }
            }                     
        }

        function selectAction() {
            log(cfg);
            // var findIt = true;
            // var choosen;
            // for (var name in action) {
            //     var item = action[name];
            //     var condition = item.condition;
            //     for (var key in condition) {
            //         if (condition[key] !== cfg[key]) {
            //             findIt = false;
            //             break;
            //         }
            //     }
            //     if (!findIt) continue;
            //     else {
            //         choosen = name;
            //         break;
            //     }
            // }

            // log(name);

        }

        return {
            selectAction: selectAction,
            leftBtnPressed: cfg.leftBtnPressed,
            rightBtnPressed: cfg.rightBtnPressed
        }
    })()

    var body = document.querySelector('body');

    body.addEventListener('mousedown', function (e) {
        cfg.selectAction();
        var key = e.button;

        switch(key) {
            case 2: cfg.rightBtnPressed = true; break;
            case 0: cfg.leftBtnPressed = true; break;
        }
        cfg.moved = false;
        cfg.selectAction();
    }, false);

    body.addEventListener('mouseup', function (e) {
        cfg.selectAction();
        var key = e.button;
        
        switch(key) {
            case 2: cfg.rightBtnPressed = false; break;
            case 0: cfg.leftBtnPressed = false; break;
        }
        cfg.moved = false;
        cfg.selectAction();
    }, false);

    body.addEventListener('mousemove', function (e) {
        cfg.moved = true;
    }, false);

    
})()