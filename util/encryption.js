
var NodeRSA = require('node-rsa')
var crypto = require("crypto");

//rsa加密
exports.rsacipher = function(pubkey,str) {
    var ecrypt = new NodeRSA(pubkey,'pkcs8-public-pem');
    ecrypt.setOptions({ encryptionScheme: 'pkcs1' });
    var ecrypted=ecrypt.encrypt(str,"base64");
    return ecrypted;
};

//rsa解密
exports.rsadecipher = function(prikey, encrypted) {
    var decrypt = new NodeRSA(prikey,'pkcs8-private-pem');
    decrypt.setOptions({ encryptionScheme: 'pkcs1' });
    var decrypted=decrypt.decrypt(encrypted,"utf-8");
    return decrypted;
};

//md5加密
exports.md5cipher = function(str){
    return crypto.createHash('md5').update(str).digest('hex');
}