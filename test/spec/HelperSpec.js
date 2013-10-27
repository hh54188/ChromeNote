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

    it("Array is not string", function() {
        expect($.isString([1, 2, 3])).toBe(false);
    });    

}); 

describe("Helper.isNumber", function() {

    it("Hello World is number", function() {
        expect($.isNumber("Hello World")).toBe(false);
    });

    it("Empty string is number", function() {
        expect($.isNumber("")).toBe(false);
    });

    it("Number is number", function() {
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

    it("Array is not number", function() {
        expect($.isNumber([1, 2, 3])).toBe(false);
    });    

});

describe("Helper.isArray", function() {

    it("Hello World is no array", function() {
        expect($.isArray("Hello World")).toBe(false);
    });

    it("Empty string is not array", function() {
        expect($.isArray("")).toBe(false);
    });

    it("Number is not array", function() {
        expect($.isArray(1)).toBe(false);
    });

    it("Object is not array", function() {
        expect($.isArray({})).toBe(false);
    });

    it("Boolen is not array", function() {
        expect($.isArray(true)).toBe(false);
    });    

    it("null is not array", function() {
        expect($.isArray(null)).toBe(false);
    });

    it("undefined is not array", function() {
        expect($.isArray(undefined)).toBe(false);
    });

    it("Date is not array", function() {
        expect($.isArray(new Date())).toBe(false);
    });    

    it("Node is not array", function() {
        expect($.isArray(document.querySelector("body"))).toBe(false);
    });    

    it("Array is array", function() {
        expect($.isArray([1, 2, 3])).toBe(true);
    });    

}); 

describe("Helper.isObject", function() {

    it("Hello World is object", function() {
        expect($.isObject("Hello World")).toBe(false);
    });

    it("Empty string is object", function() {
        expect($.isObject("")).toBe(false);
    });

    it("Number is not object", function() {
        expect($.isObject(1)).toBe(false);
    });

    it("Object is object", function() {
        expect($.isObject({})).toBe(true);
    });

    it("Boolen is not object", function() {
        expect($.isObject(true)).toBe(false);
    });    

    it("null is not object", function() {
        expect($.isObject(null)).toBe(false);
    });

    it("undefined is not object", function() {
        expect($.isObject(undefined)).toBe(false);
    });

    it("Date is not object", function() {
        expect($.isObject(new Date())).toBe(false);
    });    

    it("Node is not object", function() {
        expect($.isObject(document.querySelector("body"))).toBe(false);
    });    

    it("Array is not object", function() {
        expect($.isObject([1, 2, 3])).toBe(false);
    });    

}); 

describe("Helper.isBoolean", function() {

    it("Hello World is not Boolen", function() {
        expect($.isBoolean("Hello World")).toBe(false);
    });

    it("Empty string is not Boolen", function() {
        expect($.isBoolean("")).toBe(false);
    });

    it("Number is not Boolen", function() {
        expect($.isBoolean(1)).toBe(false);
    });

    it("Object is not Boolen", function() {
        expect($.isBoolean({})).toBe(false);
    });

    it("Boolen is not Boolen", function() {
        expect($.isBoolean(true)).toBe(true);
    });    

    it("null is not Boolen", function() {
        expect($.isBoolean(null)).toBe(false);
    });

    it("undefined is not Boolen", function() {
        expect($.isBoolean(undefined)).toBe(false);
    });

    it("Date is not Boolen", function() {
        expect($.isBoolean(new Date())).toBe(false);
    });    

    it("Node is not Boolen", function() {
        expect($.isBoolean(document.querySelector("body"))).toBe(false);
    });    

    it("Array is not Boolen", function() {
        expect($.isBoolean([1, 2, 3])).toBe(false);
    });

});

describe("Helper.isEmptyObject", function() {

    it("Hello World is not empty object", function() {
        expect($.isEmptyObject("Hello World")).toBe(false);
    });

    it("Empty string is not empty object", function() {
        expect($.isEmptyObject("")).toBe(false);
    });

    it("Number is  not empty object", function() {
        expect($.isEmptyObject(1)).toBe(false);
    });

    it("Object is  not empty object", function() {
        expect($.isEmptyObject({})).toBe(true);
    });

    it("Boolen is not empty object", function() {
        expect($.isEmptyObject(true)).toBe(false);
    });    

    it("null is not empty object", function() {
        expect($.isEmptyObject(null)).toBe(false);
    });

    it("undefined is not empty object", function() {
        expect($.isEmptyObject(undefined)).toBe(false);
    });

    it("Date is not empty object", function() {
        expect($.isEmptyObject(new Date())).toBe(false);
    });    

    it("Node is not empty object", function() {
        expect($.isEmptyObject(document.querySelector("body"))).toBe(false);
    });    

    it("Array is not empty object", function() {
        expect($.isEmptyObject([1, 2, 3])).toBe(false);
    });

    it("Empty object is empty object", function() {
        expect($.isEmptyObject({})).toBe(true);
    });


}); 