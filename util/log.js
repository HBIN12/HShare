var logger = require('morgan');
var path = require('path');
//var fs=require("fs");
var fsr=require('file-stream-rotator')
//log 
// 自定义token
logger.token('localDate',function getDate(req) {
    let date = new Date();
    return date.toLocaleString()
  })
   
  // 自定义format，其中包含自定义的token
  logger.format('mylogformat', ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length]');
   
  // 输出日志到目录
  // create a rotating write stream
  var logDirectory = path.join(__dirname, '../log')
  let accessLogStream = fsr.getStream({
    date_format: 'YYYY-MM-DD', // 日期格式
    filename: path.join(logDirectory, 'Log_%DATE%.log'), //日志文件名称
    frequency: 'daily', //
    verbose: false
  });
var mylog=logger('mylogformat', { stream: accessLogStream });
module.exports=mylog;
  