const assert = require('assert');
const ParallelRequest = require('../src/parallelrequest.js');

describe('condition option type test', function(){

    var request  = new ParallelRequest();

    function isNotEmptyAndIsString(value) {
        if(!request.isEmpty(value) && request.isString(value)) {
            return true;
        }
        return false;
    }
    
    function isNotEmptyAndIsObject(value) {
        if(!request.isEmpty(value) && request.isObject(value) && !request.isEmptyObject(value)) {
            return true;
        }
        return false;
    }

    function isNotEmptyAndIsStringOrIsObject(value) {
        if(!request.isEmpty(value) && ( request.isString(value) || (request.isObject(value) && !request.isEmptyObject(value)))) {
            return true;
        }
        return false;
    }

    function isNotEmptyAndIsStringOrIsInteger(value) {
        if(!request.isEmpty(value) && (request.isString(value) || request.isInteger(value))) {
            return true;
        }
        return false;
    }

    function isNotEmptyAndIsStringOrIsBoolean(value) {
        if(!request.isEmpty(value) && (request.isString(value) || request.isBoolean(value))) {
            return true;
        }
        return false;
    }

    it('value is not empty and is string', function() {
        assert.equal(isNotEmptyAndIsString('abc'),true);
        assert.equal(isNotEmptyAndIsString({name:'abc'}),false);
        assert.equal(isNotEmptyAndIsString(''),false);
        assert.equal(isNotEmptyAndIsString(1),false);
        assert.equal(isNotEmptyAndIsString([]),false);
        assert.equal(isNotEmptyAndIsString({}),false);
        assert.equal(isNotEmptyAndIsString(undefined),false);
        assert.equal(isNotEmptyAndIsString(null),false);
        assert.equal(isNotEmptyAndIsString(true),false);
    });

    it('value is not empty and is object and object is not empty', function() {
        assert.equal(isNotEmptyAndIsObject({name:'abc'}),true);
        assert.equal(isNotEmptyAndIsObject('abc'),false);
        assert.equal(isNotEmptyAndIsObject(''),false);
        assert.equal(isNotEmptyAndIsObject(1),false);
        assert.equal(isNotEmptyAndIsObject([]),false);
        assert.equal(isNotEmptyAndIsObject({}),false);
        assert.equal(isNotEmptyAndIsObject(undefined),false);
        assert.equal(isNotEmptyAndIsObject(null),false);
        assert.equal(isNotEmptyAndIsObject(true),false);
    });

    it('value is not empty and is string or is object and object is not empty', function() {
        assert.equal(isNotEmptyAndIsStringOrIsObject('abc'),true);
        assert.equal(isNotEmptyAndIsStringOrIsObject({name:'abc'}),true);
        assert.equal(isNotEmptyAndIsStringOrIsObject(''),false);
        assert.equal(isNotEmptyAndIsStringOrIsObject(1),false);
        assert.equal(isNotEmptyAndIsStringOrIsObject([]),false);
        assert.equal(isNotEmptyAndIsStringOrIsObject({}),false);
        assert.equal(isNotEmptyAndIsStringOrIsObject(undefined),false);
        assert.equal(isNotEmptyAndIsStringOrIsObject(null),false);
        assert.equal(isNotEmptyAndIsStringOrIsObject(true),false);
    });

    it('value is not empty and is string or is boolean', function() {
        assert.equal(isNotEmptyAndIsStringOrIsBoolean('abc'),true);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean('true'),true);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean('false'),true);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean(true),true);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean(false),true);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean({name:'abc'}),false);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean(''),false);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean(1),false);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean([]),false);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean({}),false);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean(undefined),false);
        assert.equal(isNotEmptyAndIsStringOrIsBoolean(null),false);
    });

    it('value is not empty and is string or is integer', function() {
        assert.equal(isNotEmptyAndIsStringOrIsInteger('abc'),true);
        assert.equal(isNotEmptyAndIsStringOrIsInteger('1'),true);
        assert.equal(isNotEmptyAndIsStringOrIsInteger(1),true);
        assert.equal(isNotEmptyAndIsStringOrIsInteger(true),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger(false),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger({name:'abc'}),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger(''),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger([]),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger({}),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger(undefined),false);
        assert.equal(isNotEmptyAndIsStringOrIsInteger(null),false);
    });

});