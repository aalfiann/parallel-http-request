const assert = require('assert');
const ParallelRequest = require('../src/parallelrequest.js');

describe('collection test',function(){
    
    const request = new ParallelRequest({response:'lite'});
    
    it('add with wrong parameter value will not add any data',function(){
        assert.deepEqual(request.add([]).getCollection(),[]);
    });

    it('add simple request',function(){
        request.add('https://google.com')
            .add('https://facebook.com').add('https://twitter.com');
        assert.deepEqual(request.getCollection(),[ { url: 'https://google.com' },
        { url: 'https://facebook.com' },
        { url: 'https://twitter.com' } ]);
    });

    it('remove with parameter except string will not removing any data',function(){
        assert.deepEqual(request.remove([]).getCollection(),[ { url: 'https://google.com' },
        { url: 'https://facebook.com' },
        { url: 'https://twitter.com' } ]);
    });

    it('remove one request in collection',function(){
        request.remove('https://google.com');
        assert.deepEqual(request.getCollection(),[{ url: 'https://facebook.com' },
        { url: 'https://twitter.com' } ]);
    });

    it('cleanup collection',function(){
        request.clean();
        assert.deepEqual(request.getCollection(),[]);
    });

})