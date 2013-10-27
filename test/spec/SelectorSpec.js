describe("Selector", function() {
    var isFromSelector = function(obj) {
        console.log(obj);
        if (obj && obj.el && (obj.length === 0 || obj.length !== 0) && obj.version) {
            return true;
        } else {
            return false;    
        }
        
    }

    it("Empty parameter is correct", function() {
        expect(isFromSelector($())).toBe(true);
    }); 

    it("Null is correct", function() {
        expect(isFromSelector($(null))).toBe(true);
    }); 

    it("Undefined is correct", function() {
        expect(isFromSelector($(undefined))).toBe(true);
    }); 

    it("Invalid selector is correct", function() {
        expect(isFromSelector($("xyz||"))).toBe(true);
    }); 

    it("Valid selector is correct", function() {
        expect(isFromSelector($("body"))).toBe(true);
    }); 

    it("Single Node selector is correct", function() {
        expect(isFromSelector($(document.querySelector("body")))).toBe(true);
    });     

    it("NodeList selector is correct", function() {
        expect(isFromSelector($(document.querySelectorAll("div")))).toBe(true);
    });

    it("Nest selector is correct", function() {
        expect(isFromSelector($($()))).toBe(true);
    });

});