# parallel-http-request
[![NPM](https://nodei.co/npm/parallel-http-request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/parallel-http-request/)  
  
[![npm version](https://img.shields.io/npm/v/parallel-http-request.svg?style=flat-square)](https://www.npmjs.org/package/parallel-http-request)
[![Build Status](https://travis-ci.org/aalfiann/parallel-http-request.svg?branch=master)](https://travis-ci.org/aalfiann/parallel-http-request)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/parallel-http-request/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/parallel-http-request?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/parallel-http-request/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/parallel-http-request?targetFile=package.json)
![NPM download/month](https://img.shields.io/npm/dm/parallel-http-request.svg)
![NPM download total](https://img.shields.io/npm/dt/parallel-http-request.svg)  
Simplicity to create multiple HTTP Request in Parallel for NodeJS.


## Install using NPM
```bash
$ npm install parallel-http-request
```

## Usage

### Set Config
```javascript
var ParallelRequest = require('parallel-http-request');

var config = {
    response: "simple"    // [optional] detail|simple, if empty then the response output is simple
};

var request = new ParallelRequest(config);
```

### Make Request
```javascript
request.add('https://jsonplaceholder.typicode.com/posts/1')
    .add('https://jsonplaceholder.typicode.com/posts/2')
    .send(function(response){
        console.log(response);
    });

// or
request.add({url:'https://jsonplaceholder.typicode.com/posts/1',method:'get'})
    .add({url:'https://jsonplaceholder.typicode.com/posts/2',method:'get'})
    .send(function(response){
        console.log(response);
    });

// or mixed it
request.add({
        url:'https://jsonplaceholder.typicode.com/posts/1',
        method:'get'
    })
    .add({
        url:'https://jsonplaceholder.typicode.com/posts/2',
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: {
            fullname:'value',
            address:'value'
        }
    })
    .add({
        url:'https://jsonplaceholder.typicode.com/posts/3',
        method:'delete',
        headers:{'Content-Type':'application/json'},
        body: {
            fullname:'value',
            address:'value'
        }
    })
    .send(function(response){
        console.log(response);
    });
```

## Documentation
This **Parallel HTTP Request** is created based on [unirest-nodejs](https://github.com/Kong/unirest-nodejs#readme) library.  
The **request.options** is almost similar with `unirest`.  

**Note:**
- This library is intended to create multiple request in parallel, so not all `unirest` feature is worked.
- The output response from request also different with `unirest`.

### request.add(options)
To make a multiple http request, you have to use **.add()** for each request.  
`request.add(string|object)` this will add your request into collection.  

- `request.add(string)` this request will use default method `GET`.
- `request.add(object)` this request will use `object options`.

### request.send(callback)
This will execute your multiple request.  
Return output is always `array object`.
```javascript
request.send(function(response){
        console.log(response)
    });
```

### Options object in request.add(options)
- `url: (String)` - Url to send the request.
- `method: (String)` - Default `GET`; HTTP Method.
- `headers: (Object)` - Default `{}`; HTTP Headers.
- `query: (Object)` - HTTP URI Parameter.
- `body: (String | Object)` - Entity body for certain requests.
- `form: (Object)` - Form Data.
- `field: (Object)` - Form fields.
- `attach: (Object)` - For handle files.
- `followRedirect: (Boolean)` - Default `true`; Follow HTTP `3xx` responses as redirects.
- `followAllRedirects: (Boolean)` - Default `false`; Follow **Non**-GET HTTP `3xx` responses as redirects.
- `maxRedirects: (Number)` - Default `10`; Maximum number of redirects before aborting.
- `timeout: (Number)` - Number of milliseconds to wait before aborting.
- `encoding: (String)` - Encoding to be used on `setEncoding` of response data.
- `strictSSL: (Boolean)` - Default `true`; Sets `strictSSL` flag to require that SSL certificates be valid.
- `httpSignature: (Object)` - HTTP Signature.
- `proxy: (String)` - HTTP Proxy.
- `secureProtocol: (Object)` - Sets the secure protocol to use.
- `localAddress: (Object)` - Sets `localAddress`, local interface to bind for network connections.
- `auth: (Object)` - Accepts either an Object containing `user`, `pass`, and optionally `sendImmediately`.
- `aws: (Object)` - Sets `aws`, AWS Signing Credentials.
- `hawk: (Object)` - Sets `hawk`, HAWK Signing Credentials.
- `cookie: (String)` - Creates a cookie.


### Example

#### Request with Method
You can just set method request by like this
```javascript
request.add({url:'https://www.google.com', method:'get'});
request.add({url:'https://www.google.com', method:'post'});
request.add({url:'https://www.google.com', method:'put'});
request.add({url:'https://www.google.com', method:'patch'});
request.add({url:'https://www.google.com', method:'delete'});
request.add({url:'https://www.google.com', method:'head'});
```

#### Request with Query / Body / Form
##### POST with Query Parameter
```javascript
request.add({
        url:'https://jsonplaceholder.typicode.com/posts/1', 
        method:'post', 
        query: {
            search:'value'
        }
    });
```

##### POST with Body
```javascript
request.add({
        url:'https://jsonplaceholder.typicode.com/posts/1', 
        method:'post',
        headers:{'Content-Type','application/json'}
        body: {
            fullname:'value',
            address:'value'
        }
    });
```

##### POST with Form Data Encoded
```javascript
request.add({
        url:'https://jsonplaceholder.typicode.com/posts/1', 
        method:'post',
        headers:{'Content-Type','application/x-www-form-urlencoded'}
        form: {
            fullname:'value',
            address:'value'
        }
    })
    .add({
        url:'https://jsonplaceholder.typicode.com/posts/2', 
        method:'post',
        headers:{'Content-Type','application/x-www-form-urlencoded'}
        body: JSON.stringify({
            fullname:'value',
            address:'value'
        })
    })
    .add({
        url:'https://jsonplaceholder.typicode.com/posts/3', 
        method:'post',
        headers:{'Content-Type','application/x-www-form-urlencoded'}
        body: 'name=nijiko&pet=turtle'
    });
```

##### POST with Body HTML / Other
```javascript
request.add({
        url:'https://jsonplaceholder.typicode.com/posts/1', 
        method:'post',
        headers:{'Content-Type','text/html'}
        body: '<strong>Hello World!</strong>'
    });
```

##### Request with Upload File
```javascript
request.add({
        url:'http://mockbin.com/request',
        method:'post',
        headers:{
            'Content-Type': 'multipart/form-data',
            'Content-Length': fs.statSync(path.resolve('favicon.ico')).size
        },
        attach:{
            file:fs.createReadStream(path.resolve('favicon.ico'))
        }
    });
```

##### Request with timeout
```javascript
request.add({
        url:'http://www.google.com',
        timeout:60000
    });
```

##### Request with encoding
```javascript
request.add({
        url:'http://www.google.com',
        encoding:'utf-8'
    });
```

##### Request with followRedirect
```javascript
request.add({
        url:'http://www.google.com',
        followRedirect:true
    });
```

##### Request with maxRedirects
```javascript
request.add({
        url:'http://www.google.com',
        maxRedirects:5
    });
```

##### Request with strictSSL
```javascript
request.add({
        url:'https://www.google.com',
        strictSSL:false
    });
```

##### Request with proxy
```javascript
request.add({
        url:'http://www.google.com',
        proxy:'http://localproxy.com'
    });
```

##### Request with secureProtocol
```javascript
request.add({
        url:'https://www.google.com',
        secureProtocol:'SSLv3_client_method'
    });
```

##### Request with localAddress
```javascript
request.add({
        url:'http://www.google.com',
        localAddress:'127.0.0.1'
    });
```

##### Request with auth
```javascript
request.add({
        url:'http://www.google.com',
        auth:{
            user: 'Nijiko',
            pass: 'insecure',
            sendImmediately: true
        }
    });
```

##### Request with aws
```javascript
request.add({
        url:'http://www.google.com',
        aws:{
            key: 'AWS_S3_KEY',
            secret: 'AWS_S3_SECRET',
            bucket: 'BUCKET NAME'
        }
    });
```

##### Request with hawk
```javascript
request.add({
        url:'http://www.google.com',
        hawk:{
            credentials: {
                key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
                algorithm: 'sha256',
                user: 'Steve'
            }
        }
    });
```

##### Request with cookie
Create request with `cookie`. Please see [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).
```javascript
request.add({
        url:'http://www.google.com',
        cookie:'yummy_cookie=choco; tasty_cookie=strawberry'
    });
```

## Unit Test
```bash
$ npm test
```