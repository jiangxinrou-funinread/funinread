const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // 本地数据库地址
  user: 'root',      // 数据库用户名
  password: 'your_password', // 数据库密码
  database: 'funinread', // 数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); 