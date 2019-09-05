var assert = require('assert');
var ParallelRequest = require('../src/parallelrequest.js');

var config = {
    response: "simple"
};

describe('configuration test', function(){

    it('configuration must be object type',function(){
        var result = false;
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                result = true;
            }
        }
        assert.equal(result, true);
    });

    it('configuration must be hasOwnProperty',function(){
        const config = Object.create({name: 'inherited'})
        var pr = new ParallelRequest(config);
        assert.equal(pr.response,'simple');
    });

    it('configuration with array object will throw an error',function(){
        assert.throws(function(){new ParallelRequest([])},Error,'Error thrown');
    });

    it('complete configuration',function(){
        var pr = new ParallelRequest(config);
        assert.equal(pr.response,'simple');
    });

    it('configuration without response then response output will be as \'simple\'',function(){
        delete config.response;
        var pr = new ParallelRequest(config);
        assert.equal(pr.response,'simple');        
    });

});