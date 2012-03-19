var crypto = require('crypto');
var util = require('util');
var EventEmitter = require('events').EventEmitter

function CryptoStream(key, cipher) {
  this._key = key;
  this._cipher = cipher;
}

util.inherits(CryptoStream, EventEmitter);
exports.CryptoStream = CryptoStream;

CryptoStream.prototype.write = function(data) {
  this.emit("data", this._cipher.update(data));
}

CryptoStream.prototype.end = function(data) {
  if (data) {
    this.emit("data", this._cipher.update(data))
  }
  this.emit("data", this._cipher.final())
  this.emit("end");
}

CryptoStream.prototype.pipe = function(dest) {
  var that = this;
  this.on("data", function(data) {
    dest.write(data)
  });
  this.on("end", function(data) {
    dest.end(data)
  });
}

var EncryptStream = function(key) {
  EncryptStream.super_.call(this, key, crypto.createCipher('aes-256-cbc', key));
}

util.inherits(EncryptStream, CryptoStream);
exports.EncryptStream = EncryptStream;

var DecryptStream = function(key) {
  DecryptStream.super_.call(this, key, crypto.createDecipher('aes-256-cbc', key));
}

util.inherits(DecryptStream, CryptoStream);
exports.DecryptStream = DecryptStream;
