const assert = require('assert');
const fs = require('fs');
var path = require('path');
const ParallelRequest = require('../src/parallelrequest.js');

function hasKey(data,name){
    name = name instanceof Array ? name : [name];
	return name.every(key => Object.keys(data).includes(key));
}

describe('format response test',function(){

    it('with simple response',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'simple'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'get'})
            .send(function(response){
                assert.notEqual(response[0].url,undefined);
                assert.notEqual(response[0].method,undefined);
                assert.notEqual(response[0].status,undefined);
                assert.notEqual(response[0].body,undefined);
                done();
            });
    });

    it('with detail response',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'get'})
            .send(function(response){
                assert.notEqual(response[0].url,undefined);
                assert.notEqual(response[0].method,undefined);
                assert.notEqual(response[0].status,undefined);
                assert.notEqual(response[0].headers,undefined);
                assert.notEqual(response[0].body,undefined);
                done();
            });
    });

    it('with unirest response',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'unirest'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'get'})
            .send(function(response){
                assert.notEqual(response[0].url,undefined);
                assert.notEqual(response[0].method,undefined);
                assert.notEqual(response[0].unirest,undefined);
                done();
            });
    });

    it('with unirest layer response',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'unirest'});
        request.unirest.get('https://jsonplaceholder.typicode.com/posts/1')
            .end(function(response){
                assert.equal(request.isObject(response.body),true);
                done();
        });
    });

    it('with upload unirest response',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'unirest'});
        request.add({url:'http://mockbin.com/request',
                headers:{'Content-Type': 'multipart/form-data', 'Content-Length': fs.statSync(path.resolve('favicon.ico')).size},
                method:'post',
                field:{
                    'name':'value'
                },
                attach:{
                    file:fs.createReadStream(path.resolve('favicon.ico'))
                },
                timeout:60000
            }).send(function(response){
                assert.notEqual(response[0].url,undefined);
                assert.notEqual(response[0].method,undefined);
                assert.notEqual(response[0].unirest,undefined);
                done()
            });
    });

});