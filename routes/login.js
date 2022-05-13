var express = require('express');
var encryption = require('../util/encryption');
const { PRIVATEKEY_CONSTANT } = require('../util/constant');
const db = require('../util/mysql');
var router = express.Router();

//登录功能
router.post("/login",async function (req, res) {
    try {
        var decrypted = encryption.rsadecipher(PRIVATEKEY_CONSTANT, req.body.encrypted);
        var nameandpassword = decrypted.toString().split("$");
        var name = nameandpassword[0];
        var password = nameandpassword[1];
        var data=await db.query("select * from user where name=?", [name]);
        if (data[0].password != password) {
            throw "密码错误";
        }
        var id = data[0].id;
        var taken = encryption.md5cipher(new Date() + name + password);
        await db.query("update user set taken = ? where name=?", [taken, name]);
        res.cookie("id", id);
        res.cookie("taken", taken);
        res.cookie("name",name);
        res.json({ "code": 1, "msg": "登录成功" });
    }
    catch (e) {
        res.json({ "code": 0, "msg": "登录失败" });
    }
});

module.exports = router;