const Helper = require('./helper.js');
const unirest = require('unirest');

'use strict';
/**
 * Parallel Request class
 */
class ParallelRequest extends Helper {
    
    /**
     * Constructor
     * @param {object} options 
     * 
     * Note:
     * Example required options
     * {
     *      response: ""            >> [optional] detail|simple|unirest, if empty then the response output is simple
     * }
     */
    constructor(options='') {
        super();
        this.collection = [];
        this.response = 'simple';
        if(options !== undefined && options !== null && options !== '') {
            if(typeof options === 'object' && options.constructor === Object){
                for(var key in options) {
                    if(options.hasOwnProperty(key)) {
                        this[key] = options[key];
                    }
                }
            } else {
                throw new Error('Options must be an object type!');
            }
        }
        this._unirest = unirest;
    }

    /**
     * Get unirest
     */
    get unirest() {
        return this._unirest;
    }

    /**
     * Add request into collection
     * @param {object} request
     * @return this; 
     */
    add(request) {
        if(this.isString(request) && !this.isEmpty(request)) {
            this.collection.push({url:request});
        } else {
            if(this.isObject(request) && !this.isEmptyObject(request)) {
                this.collection.push(request);
            }
        }
        return this;
    }

    /**
     * Remove request by url
     * @param {*} request 
     * @return {this}
     */
    remove(request) {
        if(this.isString(request)) {
            this.collection = this.collection.reduce((p,c) => (c.url !== request && p.push(c),p),[]);
        }
        return this;
    }

    /**
     * Cleanup collection
     * @return {this}
     */
    clean() {
        this.collection = [];
        return this;
    }

    /**
     * Send request in parallel
     * @param {callback} callback       callback with one param response
     * @return {callback} 
     */
    send(callback) {
        var self=this;
        var content = [];
        // Wrap all request inside promise
        var body = this.collection.map(function(request) {
            return new Promise(function(resolve, reject) {
                // set method request
                if(!self.isEmpty(request.method)) {
                    switch(true) {
                        case (request.method.toLowerCase() == 'post'):
                            var req = unirest.post(request.url);
                        break;
                        case (request.method.toLowerCase() == 'head'):
                            var req = unirest.head(request.url);
                        break;
                        case (request.method.toLowerCase() == 'put'):
                            var req = unirest.put(request.url);
                        break;
                        case (request.method.toLowerCase() == 'patch'):
                            var req = unirest.patch(request.url);
                        break;
                        case (request.method.toLowerCase() == 'delete'):
                            var req = unirest.delete(request.url);
                        break;
                        default:
                            var req = unirest.get(request.url);
                    }
                } else {
                    var req = unirest.get(request.url);
                }

                try {
                    // add auth
                    if(!self.isEmpty(request.auth) && self.isObject(request.auth) && !self.isEmptyObject(request.auth)) {
                        req.auth(request.auth);
                    }

                    // add headers
                    if(!self.isEmpty(request.headers) && self.isObject(request.headers) && !self.isEmptyObject(request.headers)) {
                        req.headers(request.headers);
                    }

                    // add query parameter
                    if(!self.isEmpty(request.query) && self.isObject(request.query) && !self.isEmptyObject(request.query)) {
                        req.query(request.query);
                    }

                    // add body
                    if(!self.isEmpty(request.body) && ( self.isString(request.body) || (self.isObject(request.body) && !self.isEmptyObject(request.body)))) {
                        req.send(request.body);
                    }

                    // add form
                    if(!self.isEmpty(request.form) && self.isObject(request.form) && !self.isEmptyObject(request.form)) {
                        req.form(request.form);
                    }

                    // add field
                    if(!self.isEmpty(request.field) && self.isObject(request.field) && !self.isEmptyObject(request.field)) {
                        req.field(request.field);
                    }

                    // add attach
                    if(!self.isEmpty(request.attach) && self.isObject(request.attach) && !self.isEmptyObject(request.attach)) {
                        req.attach(request.attach);
                    }

                    // set followRedirect
                    if(!self.isEmpty(request.followRedirect) && (self.isString(request.followRedirect) || self.isBoolean(request.followRedirect))) {
                        if(self.isBoolean(request.followRedirect)) {
                            req.followRedirect(request.followRedirect);
                        } else {
                            req.followRedirect(JSON.parse(request.followRedirect));
                        }
                    }

                    // set followAllRedirects
                    if(!self.isEmpty(request.followAllRedirects) && (self.isString(request.followAllRedirects) || self.isBoolean(request.followAllRedirects))) {
                        if(self.isBoolean(request.followAllRedirects)) {
                            req.followAllRedirects(request.followAllRedirects);
                        } else {
                            req.followAllRedirects(JSON.parse(request.followAllRedirects));
                        }
                    }

                    // set maxRedirects
                    if(!self.isEmpty(request.maxRedirects) && (self.isString(request.maxRedirects) || self.isInteger(request.maxRedirects))) {
                        req.maxRedirects(parseInt(request.maxRedirects));
                    }

                    // set timeout
                    if(!self.isEmpty(request.timeout) && (self.isString(request.timeout) || self.isInteger(request.timeout))) {
                        req.timeout(parseInt(request.timeout));
                    }

                    // set encoding
                    if(!self.isEmpty(request.encoding) && self.isString(request.encoding)) {
                        req.encoding(request.encoding);
                    }

                    // set strictSSL
                    if(!self.isEmpty(request.strictSSL) && (self.isString(request.strictSSL) || self.isBoolean(request.strictSSL))) {
                        if(self.isBoolean(request.strictSSL)) {
                            req.strictSSL(request.strictSSL);
                        } else {
                            req.strictSSL(JSON.parse(request.strictSSL));
                        }
                    }

                    // set httpSignature
                    if(!self.isEmpty(request.httpSignature) && self.isObject(request.httpSignature) && !self.isEmptyObject(request.httpSignature)) {
                        req.httpSignature(request.httpSignature);
                    }

                    // set proxy
                    if(!self.isEmpty(request.proxy) && self.isString(request.proxy)) {
                        req.proxy(request.proxy);
                    }

                    // set secureProtocol
                    if(!self.isEmpty(request.secureProtocol) && self.isString(request.secureProtocol)) {
                        req.secureProtocol(request.secureProtocol);
                    }

                    // set aws credential
                    if(!self.isEmpty(request.aws) && self.isObject(request.aws) && !self.isEmptyObject(request.aws)) {
                        req.aws(request.aws);
                    }

                    // set hawk credential
                    if(!self.isEmpty(request.hawk) && self.isObject(request.hawk) && !self.isEmptyObject(request.hawk)) {
                        req.hawk(request.hawk);
                    }

                    // set localAddress
                    if(!self.isEmpty(request.localAddress) && self.isString(request.localAddress)) {
                        req.localAddress(request.localAddress);
                    }

                    // set cookie
                    if(!self.isEmpty(request.cookie) && self.isString(request.cookie)) {
                        req.cookie(request.cookie);
                    }

                    return req.end(function(response){
                        switch(true) {
                            case (self.response.toLowerCase() == 'unirest') :
                                resolve({
                                    url:request.url,
                                    method:self.isEmpty(request.method)?'get':request.method,
                                    unirest:JSON.parse(self.safeStringify(response))
                                });
                                break;
                            default :
                                resolve({
                                    url:request.url,
                                    method:self.isEmpty(request.method)?'get':request.method,
                                    unirest:response
                                });
                        }
                    });
                } catch (err) {
                    switch(true) {
                        case (self.response.toLowerCase() == 'unirest') :
                            reject({
                                url:request.url,
                                method:self.isEmpty(request.method)?'get':request.method,
                                unirest:JSON.parse(self.safeStringify(err))
                            });
                            break;
                        default :
                            reject({
                                url:request.url,
                                method:self.isEmpty(request.method)?'get':request.method,
                                unirest:{
                                    statusCode:500,
                                    error:{
                                        Error:err,
                                        status:500
                                    }
                                }
                            });
                    }
                }
            });
        });
        
        // Handle error in promises
        const toResultObject = (promise) => {
            return promise
            .then(result => ({ success: true, result }))
            .catch(error => ({ success: false, error }));
        };

        // Execute Promises
        Promise.all(body.map(toResultObject)).then(function(result) {
            for (let i = 0; i < result.length; ++i) {
                // case promise error
                if (!result[i].success) {
                    switch(true) {
                        case (self.response.toLowerCase() == 'detail') :
                            content.push({
                                url:result[i].error.url,
                                method:result[i].error.method,
                                status:result[i].error.unirest.error.status,
                                headers:{},
                                body:{},
                                request:{},
                                error:result[i].error.unirest.error
                            });
                            break;
                        case  (self.response.toLowerCase() == 'unirest') :
                            content.push(result[i].error);
                            break;
                        default :
                            content.push({
                                url:result[i].error.url,
                                method:result[i].error.method,
                                status:result[i].error.unirest.error.status,
                                body:{}
                            });
                    }
                } else {
                    // case promise success
                    if(!result[i].result.unirest.error){ // case response success
                        switch(true) {
                            case (self.response.toLowerCase() == 'detail') :
                                var datares = {
                                    url:result[i].result.url,
                                    method:result[i].result.method,
                                    status:result[i].result.unirest.statusCode,
                                    headers:result[i].result.unirest.headers,
                                    body:result[i].result.unirest.body
                                };
                                if(!self.isEmptyObject(result[i].result.unirest.request) && !self.isEmptyObject(result[i].result.unirest.request)) {
                                    datares.request = result[i].result.unirest.request;
                                }
                                content.push(datares);
                                break;
                            case (self.response.toLowerCase() == 'unirest') :
                                content.push(result[i].result);
                                break;
                            default :
                                content.push({
                                    url:result[i].result.url,
                                    method:result[i].result.method,
                                    status:result[i].result.unirest.statusCode,
                                    body:result[i].result.unirest.body
                                });

                        }
                    } else { // case response error
                        switch(true) {
                            case (self.response.toLowerCase() == 'detail') :
                                content.push({
                                    url:result[i].result.url,
                                    method:result[i].result.method,
                                    status:result[i].result.unirest.error.status,
                                    headers:{},
                                    body:{},
                                    request:{},
                                    error:result[i].result.unirest.error
                                });
                                break;
                            case (self.response.toLowerCase() == 'unirest') :
                                content.push(result[i].result);
                                break;
                            default:
                                content.push({
                                    url:result[i].result.url,
                                    method:result[i].result.method,
                                    status:result[i].result.unirest.error.status,
                                    body:{}
                                });
                        }
                    }
                }
            }
            callback(content);
        });
    }

    /**
     * Get collection
     * @return {object}
     */
    getCollection() {
        return this.collection;
    }
}

module.exports = ParallelRequest;