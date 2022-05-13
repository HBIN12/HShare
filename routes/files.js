var express = require('express');
const db = require('../util/mysql');
var fs = require('fs')
var router = express.Router();
//引入multer模块  
var multer = require('multer');
var path = require('path');
//设置上传的目录，  
var uploadpath = path.join(__dirname, '../uploadfiles/')
var upload = multer({ dest: uploadpath });

//获取文件
router.post("/getfiles", async function (req, res) {
    try {
        var searchtext = "%%";
        if (!!req.body.searchtext) {
            searchtext = "%" + req.body.searchtext + "%";
        }
        if (req.body.ispub == 1) {
            var filesnum = (await db.query("select count(*) as filesnum from files where ispub=? and fname LiKE ?", [req.body.ispub, searchtext]))[0].filesnum;
            var datas = await db.query("select * from files where ispub=? and fname LiKE ? ORDER BY uploadtime DESC LIMIT ? OFFSET ? ;", [req.body.ispub, searchtext, req.body.pagesize, req.body.pagesize * (req.body.page - 1)]);
        }
        else {
            var filesnum = (await db.query("select count(*) as filesnum from files where ispub=? and uid=? and fname LiKE ?", [req.body.ispub, req.cookies.id, searchtext]))[0].filesnum;
            var datas = await db.query("select * from files where ispub=? and uid=? and fname LiKE ? ORDER BY uploadtime DESC LIMIT ? OFFSET ? ;", [req.body.ispub, req.cookies.id, searchtext, req.body.pagesize, req.body.pagesize * (req.body.page - 1)]);
        }
        res.json({ "datas": datas, "filesnum": filesnum });
    } catch (error) {
        console.log(error);
        res.json({ "code": "0", "msg": "获取文件信息失败" });
    }

});

//上传文件
router.post("/uploadfiles", upload.array("files"), async function (req, res) {
    try {
        var files = req.files;
        var filesuploadpath = uploadpath + req.cookies.id + "/";
        if (!fs.existsSync(filesuploadpath)) {
            fs.mkdirSync(filesuploadpath);
        }
        for (i = 0; i < files.length; i++) {
            var file = files[i];
            var filename = file.originalname;

            //将重复的文件名修改成filename(1)的格式
            while ((await db.query("select count(*) as num from files where fname=? and uid=?", [filename, req.cookies.id]))[0].num != 0) {
                filename = filename.substring(0, filename.lastIndexOf(".")) + "(1)" + filename.substring(filename.lastIndexOf("."));
            }

            //修改文件名
            fs.renameSync(uploadpath + file.filename, filesuploadpath + filename);

            //将文件信息写入数据库
            await db.query("insert into files(fname,fpath,uid,ispub,uploadtime,size) values(?,?,?,?,?,?)", [filename, filesuploadpath + filename, req.cookies.id, 0, new Date(), file.size]);
        }
        res.json({ "code": 1, "msg": "上传成功" })
    }
    catch (e) {
        console.log(e);
        res.json({ "code": 0, "msg": "上传失败" })
    }

});

//共享文件
router.get("/shared", async function (req, res) {
    try {
        var file=(await db.query("select * from files where ispub=0 and fid=? and uid=?", [req.query.fid, req.cookies.id]))[0];
        await db.query("insert into files(fname,fpath,uid,ispub,uploadtime,size) values(?,?,?,?,?,?)", [file.fname, file.fpath, req.cookies.id, 1, new Date(), file.size]);
        res.json({ "code": "1", "msg": "共享成功" });
    } catch (error) {
        res.json({ "code": "0", "msg": "共享失败" });
    }

});

//删除文件
router.get("/deletefile", async function (req, res) {
    try {
        await db.query("delete from  files where ispub=0 and fid=? and uid=?", [req.query.fid, req.cookies.id]);
        res.json({ "code": "1", "msg": "删除成功" });
    } catch (error) {
        res.json({ "code": "0", "msg": "删除失败" });
    }

});

//下载文件
router.get("/download", async function (req, res) {
    try {
        var file = (await db.query("select * from files where fid=?",[req.query.fid]))[0];
        var ispub = file.ispub;
        var uid = file.uid;
        var fpath=file.fpath;
        if(ispub==1 || uid==req.cookies.id){
            res.download(fpath);
        }
        else{
            res.json({ "code": "0", "msg": "下载失败" });
        }
    } catch (error) {
        console.log(error);
        res.json({ "code": "0", "msg": "下载失败" });
    }
});

//举报文件
router.get("/report",async function(req,res){
    try {
    var reportuids=(await db.query("select reportuids from files where  ispub=1 and fid=?",[req.query.fid]))[0].reportuids;
    if(!!reportuids){
    var reportuidsarr=reportuids.split(",");
    if (reportuidsarr.indexOf(req.cookies.id)==-1){
        if(reportuidsarr.push(req.cookies.id)>5){
            await db.query("delete from files where ispub=1 and fid=?",[req.query.fid]);
        }
        else{
            reportuids=reportuidsarr.join(",");
        }
    }}
    else{
        reportuids=req.cookies.id;
    }
    await db.query("update files set reportuids=? where ispub=1 and fid=?",[reportuids,req.query.fid]);
    res.json({"code":"1","msg":"举报成功"})
    } catch (error) {
        console.log(error);
    res.json({"code":"0","msg":"举报失败"});
    }
    

});


module.exports = router;