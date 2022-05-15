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

router.post("/register",async function(req,res){
    try {
        var name=req.body.name;
        var password=req.body.password;
        var regex=/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/;
        
        if(name.length<=4||name.length>=20){
            return res.json({"code":0,"msg":"账号长度应大于4位字符小于20位字符"});
        }
        if(regex.test(password)==false){
            return res.json({"code":0,"msg":"密码应为6到20为数字英文组合"});
        }
        if((await db.query("select count(*) as num from user where name=?",[name]))[0].num==1){
            return res.json({"code":0,"msg":"该用户名已存在"});
        }
        await db.query("insert into user (name,password) values (?,?)",[name,password]);
        res.json({"code":1,"msg":"用户 "+name+" 注册成功"})


    } catch (error) {
        res.json({"code":0,"msg":"注册异常"});
    }


});

module.exports = router;