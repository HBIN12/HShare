var express = require('express');
var router = express.Router();
var db = require("../util/mysql")
router.use(async function (req, res, next) {
    try {
        if (req.originalUrl != "/login" && req.originalUrl != "/login.html"&&req.originalUrl != "/register") {
            var taken = req.cookies.taken;
            var id = req.cookies.id;
            var data = await db.query("select taken from user where id=?", [id]);
            if (taken != data[0].taken) {
                throw "taken错误";
            }
        }
        return next();
    } catch (e) {
        return res.redirect("/login.html");
    }
});

module.exports = router