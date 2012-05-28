Stream object for crypto.

Example Usage:

    var DecryptStream = require('./lib/cryptostream.js').DecryptStream;
    var EncryptStream = require('./lib/cryptostream.js').EncryptStream;
    
    var key = 'nodecryptostream';
    
    var e = new EncryptStream(key);
    var d = new DecryptStream(key);
    
    fs.createReadStream(__filename).pipe(e).pipe(d).pipe(process.stdout, {end: false})

EncryptStream/DecryptStream (opts)

`opts` may be a the key (string) or a object. If `opts` is an object it _must_
have properties for `key` and `algorithm`, and _may_ have properties
`inputEncoding` and `outputEncoding`

also see [crypto.createCypher][createCypher]

[createCypher]: http://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password
