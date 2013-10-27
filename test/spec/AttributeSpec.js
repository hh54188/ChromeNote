describe("Get attribute", function() {
    var single_div = $("#test_div");
    var multiple_divs = $("div.test_div");

    it("Get single node attribute", function() {
        expect(single_div.attr("data-test")).toEqual("true");
    }); 

    it("Get multiple node attribute", function() {
        expect(multiple_divs.attr("data-test")).toEqual("true");
    });

});

describe("Set attribute", function() {
    var single_div = $("#test_div");
    var multiple_divs = $("div.test_div");

    beforeEach(function() {
        var divs = document.querySelectorAll("div");
        for (var i = 0; i < divs.length; i++) {
            divs[i].setAttribute("data-test", "true");
        }
    });

    it("Set single node attribute with string", function() {
        single_div.attr("data-test", "false")
        expect(single_div.attr("data-test")).toEqual("false");
    }); 

    it("Set multiple node attribute with string", function() {
        multiple_divs.attr("data-test", "false")
        expect(multiple_divs.attr("data-test")).toEqual("false");
    }); 

    it("Set single node attribute with Boolean", function() {
        single_div.attr("data-test", false)
        expect(single_div.attr("data-test")).toEqual("false");
    }); 

    it("Set multiple node attribute with Boolean", function() {
        multiple_divs.attr("data-test", false)
        expect(multiple_divs.attr("data-test")).toEqual("false");
    }); 

    it("Set single node attribute with Number", function() {
        single_div.attr("data-test", 0)
        expect(single_div.attr("data-test")).toEqual("0");
    }); 

    it("Set multiple node attribute with Number", function() {
        multiple_divs.attr("data-test", 0)
        expect(multiple_divs.attr("data-test")).toEqual("0");
    }); 

    it("Set single node attribute with Object", function() {
        single_div.attr({
            "data-test": "false",
            "data-test1": "0"
        })
        expect(single_div.attr("data-test")).toEqual("false");
        expect(single_div.attr("data-test1")).toEqual("0");
    }); 

    it("Set multiple node attribute with Object", function() {
        multiple_divs.attr({
            "data-test": "false",
            "data-test1": "0"
        })
        expect(multiple_divs.attr("data-test")).toEqual("false");
        expect(multiple_divs.attr("data-test1")).toEqual("0");
    });

});