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
    response: "simple"    // [optional] detail|simple|unirest, if empty then the response output is simple
};

var request = new ParallelRequest(config);

//or without config
var request = new ParallelRequest();
```
The `config.response` options value is :
- `simple` : minimalist output response.
- `detail` : output response very detail.
- `unirest` : output response with unirest format.

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
- The output response from request also slightly different with `unirest`.
- This library is intended to create multiple request in parallel, so not all `unirest` feature is worked.  Please see [Limitation](#Limitation).

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

### request.remove(name)
This will remove url in collection.  
- `name` is the url of the request.
```javascript
request.remove('http://google.com');
```

### request.clean()
This will cleanup all request in collection.  
```javascript
request.clean();
```

### request.getCollection()
This will return all request in collection.
```javascript
request.getCollection();
```

### request.unirest
If you want to use `unirest` (the underlying layer of parallel-http-request) directly.
```javascript
request.unirest.get('http://google.com')
    .end(function(response){
        console.log(response)
    });
```

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

#### Request with Upload File
```javascript
request.add({
        url:'http://mockbin.com/request',
        method:'post',
        headers:{
            'Content-Type': 'multipart/form-data',
            'Content-Length': fs.statSync(path.resolve('favicon.ico')).size
        },
        attach:{
            'file':fs.createReadStream(path.resolve('favicon.ico')),
            'remote file':request.unirest.request('http://google.com/favicon.ico')
        }
    });
```

#### Request with timeout
```javascript
request.add({
        url:'http://www.google.com',
        timeout:60000
    });
```

#### Request with encoding
```javascript
request.add({
        url:'http://www.google.com',
        encoding:'utf-8'
    });
```

#### Request with followRedirect
```javascript
request.add({
        url:'http://www.google.com',
        followRedirect:true
    });
```

#### Request with maxRedirects
```javascript
request.add({
        url:'http://www.google.com',
        maxRedirects:5
    });
```

#### Request with strictSSL
```javascript
request.add({
        url:'https://www.google.com',
        strictSSL:false
    });
```

#### Request with proxy
```javascript
request.add({
        url:'http://www.google.com',
        proxy:'http://localproxy.com'
    });
```

#### Request with secureProtocol
```javascript
request.add({
        url:'https://www.google.com',
        secureProtocol:'SSLv3_client_method'
    });
```

#### Request with localAddress
```javascript
request.add({
        url:'http://www.google.com',
        localAddress:'127.0.0.1'
    });
```

#### Request with auth
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

#### Request with aws
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

#### Request with hawk
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

#### Request with cookie
Create request with `cookie`. Please see [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).
```javascript
request.add({
        url:'http://www.google.com',
        cookie:'yummy_cookie=choco; tasty_cookie=strawberry'
    });
```

## Limitation
There is several feature which is not posible to do with multiple request.

- `oAuth` - Sets oauth, list of oauth credentials, on Request.options based on given object.
- `jar`: (Object) - Creates a container to store multiple cookies, i.e. a cookie jar.
- `part` - Still `Experimental`; Similiar to request multipart.
- `then` - promise function.
- `pool` - Single request; for socket connection which is use for single connection.
- `forever` - Keeps socket connections alive between keep-alive in requests.

The solution about this limitation is you have to directly use `unirest` libary.

### Example to use Unirest directly
Note: 
- This example below is for single http request with `unirest` library.

#### Request with oAuth
```javascript
request.unirest
  .get('https://api.twitter.com/oauth/request_token')
  .oauth({
    callback: 'http://mysite.com/callback/',
    consumer_key: 'CONSUMER_KEY',
    consumer_secret: 'CONSUMER_SECRET'
  })
  .then(response => {
    let access_token = response.body
 
    return request.unirest
      .post('https://api.twitter.com/oauth/access_token')
      .oauth({
        consumer_key: 'CONSUMER_KEY',
        consumer_secret: 'CONSUMER_SECRET',
        token: access_token.oauth_token,
        verifier: token: access_token.oauth_verifier
      })
  })
  .then((response) => {
    var token = response.body
 
    return request.unirest
      .get('https://api.twitter.com/1/users/show.json')
      .oauth({
        consumer_key: 'CONSUMER_KEY',
        consumer_secret: 'CONSUMER_SECRET',
        token: token.oauth_token,
        token_secret: token.oauth_token_secret
      })
      .query({
        screen_name: token.screen_name,
        user_id: token.user_id
      })
  })
  .then((response) => {
    console.log(response.body)
  });
```

#### Request with Jar
```javascript
var cookieJar = request.unirest.jar();
cookieJar.add(request.unirest.cookie('another cookie=23'));

request.unirest
    .get('http://google.com')
    .jar(CookieJar)
    .end(function (response) {
        // Except google trims the value passed :/
        console.log(response.cookie('another cookie'));
});
```


## Unit Test
```bash
$ npm test
```