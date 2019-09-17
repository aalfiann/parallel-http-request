const assert = require('assert');
const ParallelRequest = require('../src/parallelrequest.js');

describe('helper function test', function(){

    var request  = new ParallelRequest();

    it('is string', function() {
        assert.equal(request.isString('abc'),true);
        assert.equal(request.isString(''),true);
        assert.equal(request.isString(1),false);
        assert.equal(request.isString([]),false);
        assert.equal(request.isString({}),false);
    });

    it('is integer', function() {
        assert.equal(request.isInteger(1),true);
        assert.equal(request.isInteger(0),true);
        assert.equal(request.isInteger(-1),true);
        assert.equal(request.isInteger(-1.56),false);
        assert.equal(request.isInteger(1.56),false);
        assert.equal(request.isInteger('2'),false);
        assert.equal(request.isInteger('-2'),false);
        assert.equal(request.isInteger('02'),false);
        assert.equal(request.isInteger('2.56'),false);
        assert.equal(request.isInteger('-2.56'),false);
        assert.equal(request.isInteger([1,2,3]),false);
        assert.equal(request.isInteger([]),false);
        assert.equal(request.isInteger({}),false);
        assert.equal(request.isInteger(''),false);
    });

    it('is boolean', function() {
        assert.equal(request.isBoolean(true),true);
        assert.equal(request.isBoolean(false),true);
        assert.equal(request.isBoolean(new Boolean(true)),true);
        assert.equal(request.isBoolean(new Boolean(false)),true);
        assert.equal(request.isBoolean(1),false);
        assert.equal(request.isBoolean(0),false);
        assert.equal(request.isBoolean('true'),false);
        assert.equal(request.isBoolean('false'),false);
    });

    it('is array', function() {
        assert.equal(request.isArray([1,2,3]),true);
        assert.equal(request.isArray([]),true);
        assert.equal(request.isArray({}),false);
        assert.equal(request.isArray(''),false);
        assert.equal(request.isArray(1),false);
    });

    it('is object', function() {
        assert.equal(request.isObject({id:1,name:'abc'}),true);
        assert.equal(request.isObject({}),true);
        assert.equal(request.isObject([]),false);
        assert.equal(request.isObject(''),false);
        assert.equal(request.isObject(1),false);
    });

    it('is empty string', function() {
        assert.equal(request.isEmpty(undefined),true);
        assert.equal(request.isEmpty(null),true);
        assert.equal(request.isEmpty(''),true);
        assert.equal(request.isEmpty('abc'),false);
        assert.equal(request.isEmpty(1),false);
        assert.equal(request.isEmpty([]),false);
        assert.equal(request.isEmpty({}),false);
    });

    it('is empty array', function() {
        assert.equal(request.isEmptyArray(undefined),true);
        assert.equal(request.isEmptyArray(null),true);
        assert.equal(request.isEmptyArray([]),true);
        assert.equal(request.isEmptyArray({}),false);
        assert.equal(request.isEmptyArray({id:1}),false);
        assert.equal(request.isEmptyArray('1'),false);
        assert.equal(request.isEmptyArray(1),false);
        assert.equal(request.isEmptyArray([1,2,3]),false);
    });

    it('is empty object', function() {
        assert.equal(request.isEmptyObject(undefined),true);
        assert.equal(request.isEmptyObject(null),true);
        assert.equal(request.isEmptyObject({}),true);
        assert.equal(request.isEmptyObject([]),false);
        assert.equal(request.isEmptyObject(1),false);
        assert.equal(request.isEmptyObject({id:1}),false);
        assert.equal(request.isEmptyObject('1'),false);
        assert.equal(request.isEmptyObject([1,2,3]),false);
    });

    it('is empty object parameter value must hasOwnProperty',function(){
        const obj = Object.create({name: 'inherited'})
        assert.equal(true,request.isEmptyObject(obj));
    });

    it('safeStringify success to avoid type error converting circular',function(){
        var o = {};
        o.o = o;
        var result = JSON.parse(request.safeStringify(o));
        assert.equal(true,request.isObject(result));
    });

    it('object circular is not empty and is object',function(){
        var o = {};
        o.o = o;
        assert.equal(true,(!request.isEmpty(o) && request.isObject(o)));
    });
    
});