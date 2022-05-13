var db = {};
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 100,
  host: '43.154.33.229',
  user: 'root',
  password: '1135911642',
  database: 'HBIN'
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