
// mysql连接方法
// 引入MySQL模块
const mysql = require('mysql');
// 创建连接  （连接数据库）
const connection = mysql.createConnection({
  host : 'localhost',// 主机名
  user : 'root', //用户名
  password : 'root',  // 密码
  database :'smmsusers'  //数据库名字
})

// 暴露
module.exports = connection;
