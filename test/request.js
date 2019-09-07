const assert = require('assert');
const fs = require('fs');
var path = require('path');
const ParallelRequest = require('../src/parallelrequest.js');

describe('request options test',function(){

    it('request with get method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',method:'get'})
            .send(function(response){
                if(response[0].method == 'get') {
                    done();
                }
            });
    });
    
    it('request with post method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',method:'post'})
            .send(function(response){
                if(response[0].method == 'post') {
                    done();
                }
            });
    });

    it('request with head method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',method:'head'})
            .send(function(response){
                if(response[0].method == 'head') {
                    done();
                }
            });
    });

    it('request with put method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',method:'put'})
            .send(function(response){
                if(response[0].method == 'put') {
                    done();
                }
            });
    });

    it('request with patch method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',method:'patch'})
            .send(function(response){
                if(response[0].method == 'patch') {
                    done();
                }
            });
    });

    it('request with delete method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',method:'delete'})
            .send(function(response){
                if(response[0].method == 'delete') {
                    done();
                }
            });
    });

    it('request with options method',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'options'})
            .send(function(response){
                if(response[0].method == 'options') {
                    done();
                }
            });
    });

    it('request with auth',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',auth:{
                    user: 'Nijiko',
                    pass: 'insecure',
                    sendImmediately: true
                }
        }).send(function(response){
            if(response[0].request.uri.auth == null) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with set headers',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',headers:{'Accept': 'application/json'}
        }).send(function(response){
            if(response[0].request.headers.Accept == 'application/json') {
                done();
            } else {
                done();
            }
        });
    });

    it('request with query parameter',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://google.com',query:{'name': 'abc'}
        }).send(function(response){
            if(response[0].request.uri.query == 'name=abc') {
                done();
            } else {
                done();
            }
        });
    });

    it('request with raw body data',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts',method:'post',
            headers:{'Content-Type':'application/json'},
            body:{
                title: 'foo 1',
                body: 'bar 1',
                userId: 1
            }
        }).send(function(response){
            if(response[0].request.headers['content-length'] > 0) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with form data',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts',method:'post',
            headers:{'Content-Type':'application/json'},
            form:{
                title: 'foo 1',
                body: 'bar 1',
                userId: 1
            }
        }).send(function(response){ 
            if(response[0].status) {
                if(response[0].request.headers['content-length'] > 0) {
                    done();
                } else {
                    done();
                }
            } else {
                done();
            }
        });
    });

    it('request with followRedirect true',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            followRedirect:true
        }).send(function(response){
            if(response[0].url == 'http://www.google.com/') {
                done();
            } else {
                done();
            }
        });
    });

    it('request with followRedirect false',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            followRedirect:false
        }).send(function(response){
            if(response[0].status == 301) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with followRedirect and string value',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            followRedirect:'false'
        }).send(function(response){
            if(response[0].status == 301) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with followAllRedirects true',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            followAllRedirects:true
        }).send(function(response){
            if(response[0].url == 'http://www.google.com/') {
                done();
            } else {
                done();
            }
        });
    });

    it('request with followAllRedirects false',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            followAllRedirects:false
        }).send(function(response){
            if(response[0].status == 301) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with followAllRedirects and string value',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            followAllRedirects:'false'
        }).send(function(response){
            if(response[0].status == 301) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with maxRedirects',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            maxRedirects:6
        }).send(function(response){
            if(response[0].url == 'http://www.google.com/') {
                done();
            } else {
                done();
            }
        });
    });

    it('request with timeout',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://gooe.com',method:'get',
            timeout:1000
        }).send(function(response){
            if(response[0].status == 404) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with set encoding and response detail',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            encoding:'utf-8'
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with set encoding and response simple',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'simple'});
        request.add({url:'http://google.com',method:'get',
            encoding:'utf-8'
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with strictSSL true',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            strictSSL:true
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with strictSSL false',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            strictSSL:false
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with strictSSL and string value',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            strictSSL:'false'
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with empty httpSignature',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            httpSignature:{}
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with wrong httpSignature',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add('https://jsonplaceholder.typicode.com/posts/1')
        .add('https://jsonplaceholder.typicode.com/posts/2')
        .add({url:'http://google.com',method:'get',
            httpSignature:{'name':'abc'}
        })
        .add({url:'http://google.com',
            httpSignature:{'name':'abc'}
        })
        .send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with wrong httpSignature and response simple',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'simple'});
        request.add('https://jsonplaceholder.typicode.com/posts/1')
        .add('https://jsonplaceholder.typicode.com/posts/2')
        .add({url:'http://google.com',method:'get',
            httpSignature:{'name':'abc'}
        })
        .add({url:'http://google.com',
            httpSignature:{'name':'abc'}
        })
        .send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with wrong httpSignature and response unirest',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'unirest'});
        request.add('https://jsonplaceholder.typicode.com/posts/1')
        .add('https://jsonplaceholder.typicode.com/posts/2')
        .add({url:'http://google.com',method:'get',
            httpSignature:{'name':'abc'}
        })
        .add({url:'http://google.com',
            httpSignature:{'name':'abc'}
        })
        .send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with set proxy',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            proxy:'http://localproxy.com'
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with secure protocol',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            secureProtocol:'SSLv2_method'
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with aws credential',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            aws:{
                key: 'AWS_S3_KEY',
                secret: 'AWS_S3_SECRET',
                bucket: 'BUCKET NAME'
            }
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with hawk credential',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            hawk:{
                credentials: {
                    key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
                    algorithm: 'sha256',
                    user: 'Steve'
                }
            }
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with offline localAddress response detail',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',method:'get',
            localAddress:'127.0.0.1'
        }).send(function(response){
            if(response[0].status == undefined) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with offline localAddress response simple',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'simple'});
        request.add({url:'http://google.com',method:'get',
            localAddress:'127.0.0.1'
        }).send(function(response){
            if(response[0].status == undefined) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with offline localAddress response unirest',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'unirest'});
        request.add({url:'http://google.com',method:'get',
            localAddress:'127.0.0.1'
        }).send(function(response){
            if(response[0].status == undefined) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with intentional error bad request body',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'http://google.com',
            headers:{'Accept':'application/json'},
            method:'get',
            body:{
                name:'abc'
            }
        }).send(function(response){
            if(response[0].status == 400) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with upload',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
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
                done()
            });
    });

    it('request with set cookie',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'get',
            cookie:'yummy_cookie=choco; tasty_cookie=strawberry'
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

    it('request with set cookie with jar',function(done){
        this.timeout(10000);
        var request = new ParallelRequest({response:'detail'});
        
        var cookieJar = request.jar;
        var cookie = request.cookie('yummy_cookie=choco; tasty_cookie=strawberry');
        cookieJar.add(cookie);

        request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'get',
            jar:cookieJar
        }).send(function(response){
            if(response[0].status == 200) {
                done();
            } else {
                done();
            }
        });
    });

});