(function () {
    var cfg = {
        leftBtnPressed: false,
        rightBtnPressed: false,
        moved: false
    };


    var action = [ {
            create: {
                condition: {
                    leftBtnPressed: false,
                    rightBtnPressed: true,
                    moved: true
                }
            }        
        }
    ];

    function selectAction() {
        action.forEach(function (item, index) {
            var condition = item.condition;
            for (var key in condition) {
                if (condition[key] !== cfg[key]) {
                    continue;
                }
            }
        })
    }

    return {
        selectAction: selectAction
    }
})()