var crypto = require('crypto');
var util = require('util');
var Stream = require('stream').Stream

function CryptoStream(opts, cipher) {
  this._key = opts.key;
  this._cipher = cipher;
  this.inputEncoding = opts.inputEncoding;
  this.outputEncoding = opts.outputEncoding;
  this.readable = this.writable = true
}

util.inherits(CryptoStream, Stream);
exports.CryptoStream = CryptoStream;

CryptoStream.prototype.write = function(data) {
  this.emit("data", this._cipher.update(data, this.inputEncoding, this.outputEncoding));
  return true
}

CryptoStream.prototype.end = function(data) {
  if (data) this.write(data)
  this.emit("data", this._cipher.final(this.outputEncoding))
  this.emit("end");
}

function coearseOpts (opts) {
  return 'string' == typeof opts ? {key: opts, algorithm: 'aes-256-cbc'} : opts
}
var EncryptStream = function(opts) {
  opts = coearseOpts(opts)
  EncryptStream.super_.call(this, opts, crypto.createCipher(opts.algorithm, opts.key));
}

util.inherits(EncryptStream, CryptoStream);
exports.EncryptStream = EncryptStream;

var DecryptStream = function(opts) {
  opts = coearseOpts(opts)
  DecryptStream.super_.call(this, opts, crypto.createDecipher(opts.algorithm, opts.key));
}

util.inherits(DecryptStream, CryptoStream);
exports.DecryptStream = DecryptStream;
