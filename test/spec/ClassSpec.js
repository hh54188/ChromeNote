describe("Class", function() {
    var single_div = $("#test_div");
    var multiple_divs = $("div.test_div");

    it("Single node do not has single Class", function() {
        expect(single_div.hasClass("id1")).toBe(false);
    }); 

    it("Single node do has single Class", function() {
        expect(single_div.hasClass("id")).toBe(true);
    }); 


    it("Multiple node do not has single Class", function() {
        expect(multiple_divs.hasClass("div")).toBe(false);
    }); 

    it("Multiple node do has single Class", function() {
        expect(multiple_divs.hasClass("test_div")).toBe(true);
    }); 

    it("Single node add single Class", function() {
        single_div.addClass("test");
        expect(single_div.hasClass("test")).toBe(true);
        single_div.removeClass("test")
    }); 

    it("Single node do has multiple Class", function() {
        single_div.addClass("test test1");

        expect(single_div.hasClass("test")).toBe(true);
        expect(single_div.hasClass("test1")).toBe(true);

        single_div.removeClass("test test1");
    }); 

    it("Multiple node add single Class", function() {
        multiple_divs.addClass("test");
        expect(multiple_divs.hasClass("test")).toBe(true);
        multiple_divs.removeClass("test")
    }); 

    it("Multiple node do has multiple Class", function() {
        single_div.addClass("test test1");

        expect(single_div.hasClass("test")).toBe(true);
        expect(single_div.hasClass("test1")).toBe(true);
        
        single_div.removeClass("test test1");
    }); 

});