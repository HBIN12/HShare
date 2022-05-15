var db = {};
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 100,
  host: '',
  user: 'root',
  password: '',
  database: 'HBIN',
  dateStrings : true, //解决时间格式
});
db.query = function () {
  var sql, para;
  if (arguments.length == 1) {
    sql = arguments[0];
  } else {
    sql = arguments[0];
    para = arguments[1];
  }
  if (!sql) {
    return;
  }
  if (!para) {
    para = [];
  }
  return new Promise((resolve, reject) => {
    pool.query(sql, para, function (err, result) {
      if (err) {
        return reject(err);
      };
        return resolve(result);
    });
  }
  );
}


module.exports = db;
