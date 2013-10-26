describe("Helper.isString", function() {

    it("Hello World is string", function() {
        expect($.isString("Hello World")).toBe(true);
    });

    it("Empty string is string", function() {
        expect($.isString("")).toBe(true);
    });

    it("Number is not string", function() {
        expect($.isString(1)).toBe(false);
    });

    it("Object is not string", function() {
        expect($.isString({})).toBe(false);
    });

    it("Boolen is not string", function() {
        expect($.isString(true)).toBe(false);
    });    

    it("null is not string", function() {
        expect($.isString(null)).toBe(false);
    });

    it("undefined is not string", function() {
        expect($.isString(undefined)).toBe(false);
    });

    it("Date is not string", function() {
        expect($.isString(new Date())).toBe(false);
    });    

    it("Node is not string", function() {
        expect($.isString(document.querySelector("body"))).toBe(false);
    });    

}); 

describe("Helper.isNumber", function() {

    it("Hello World is number", function() {
        expect($.isNumber("Hello World")).toBe(false);
    });

    it("Empty string is number", function() {
        expect($.isNumber("")).toBe(false);
    });

    it("Number is not number", function() {
        expect($.isNumber(1)).toBe(true);
    });

    it("Object is not number", function() {
        expect($.isNumber({})).toBe(false);
    });

    it("Boolen is not number", function() {
        expect($.isNumber(true)).toBe(false);
    });    

    it("null is not number", function() {
        expect($.isNumber(null)).toBe(false);
    });

    it("undefined is not number", function() {
        expect($.isNumber(undefined)).toBe(false);
    });

    it("Date is not number", function() {
        expect($.isNumber(new Date())).toBe(false);
    });    

    it("Node is not number", function() {
        expect($.isNumber(document.querySelector("body"))).toBe(false);
    });    

}); 