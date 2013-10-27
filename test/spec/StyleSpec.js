describe("Get style", function() {
    var single_div = $("#test_div");
    var multiple_divs = $("div.test_div");

    beforeEach(function () {
        multiple_divs.css("backgroundColor", "white");
    })

    it("Get single node inline style", function() {
        expect(single_div.css("backgroundColor")).toEqual("black");
    }); 

    it("Get single node computed style", function() {
        expect(single_div.css("display")).toEqual("none");
    }); 

    it("Set multiple node inline single style", function() {
        multiple_divs.css("backgroundColor", "black");
        expect(multiple_divs.css("backgroundColor")).toEqual("black");
    }); 

    it("Set multiple node inline object style", function() {
        multiple_divs.css({
            "backgroundColor": "black",
            "fontSize": "12px"
        });
        expect(multiple_divs.css("backgroundColor")).toEqual("black");
        expect(multiple_divs.css("fontSize")).toEqual("12px");
    }); 

});