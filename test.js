fs = require('fs')

var DecryptStream = require('./lib/cryptostream.js').DecryptStream;
var EncryptStream = require('./lib/cryptostream.js').EncryptStream;

var key = 'nodecryptostream';

var e = new EncryptStream(key);
var d = new DecryptStream(key);

fs.createReadStream(__filename, {encoding: 'binary'}).pipe(e).pipe(d).pipe(process.stdout, {end: false})
