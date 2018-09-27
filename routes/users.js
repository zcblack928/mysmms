var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection=require('./conn');
// 调用连接方法
connection.connect(()=>{
  console.log('数据库连接成功！')
});



// 接收前端 添加用户的ajax请求
router.post('/userAdd',(req,res)=>{
  // 接收前端用户数据
  let {username,password,groups} = req.body;
  // 构造sql语句
  const sqlStr = 'insert into users (username , password , groups) values (?,?,?)';
  // 接收到的数据参数
  const sqlParams = [username , password , groups];
  // 执行sql语句
  connection.query(sqlStr,sqlParams,(err,data)=>{
    // 如果有错 抛出错误
    if (err) {
      throw err;
    } else {
      // 判断 如果受行数的影响
      if (data.affectedRows>0) {
        // 响应成功数据回去
        res.send({"errcode":1,"msg":"添加成功！"})
      } else {
        // 否则 响应失败数据回去
        res.send({"errcode":0,"msg":"添加失败！"})
        
      }
    }
  })
});


/* 接收显示用户账号数据的get请求*/
router.get('/userList', (req,res)=>{
  // 构造sql(查询所有用户账号数据)
  const sqlStr = 'select * from users order by ctime desc';
  // 执行sql语句
  connection.query(sqlStr,(err,data)=>{
    // 如果有错  抛出错误
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
});


/* 接收单条删除数据请求*/
router.get('/handleDeleteOne',(req,res)=>{
  // 接收id  并用id查找对应的数据  删除
  let {id} = req.query;
  // 根据id删除指定数据的sql语句
  const sqlStr = `delete from users where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err,data)=>{
    // 如果有错  抛出错误
    if (err) {
      throw err;
    } else {
      // 判断  受影响行数
      if (data.affectedRows>0) {
        res.send({"errcode":1,"msg":"数据删除成功！"})
      } else {
        res.send({"errcode":0,"msg":"数据删除失败！"})        
      }
    }
  })
});




/* 接收账号列表的  修改数据get请求*/
router.get('/changePwd',(req,res)=>{
  // res.send("1");
  // 接收id  并用id找到对应的数据进行修改
  let {id} = req.query;
  // 根据id修改 指定的数据的sql语句
  const  sqlStr = `select * from users where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err,data)=>{
     // 如果有错  抛出错误
     if (err) {
      throw err;
    } else {
      // console.log(data);
      // 正确  将数据跳转到 编辑页面
      res.send(data);
    }
 
  })
})





/*  接收密码修改的 post请求*/
router.post('/userEdit',(req,res)=>{
  // 接收前端用户数据
  let {username,password,groups,id} = req.body;
  // 构造sql语句  根据id修改数据
  const sqlStr = `update users set password="${password}", groups="${groups}" where id=${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err,data)=>{
    // 如果有错 抛出错误
    if (err) {
      throw err;
    } else {
      console.log(data);
      // 判断 如果受行数的影响
      if (data.affectedRows > 0) {
        // 响应成功数据回去
        res.send({"errcode":1,"msg":"修改成功！"})
      } else {
        // 否则 响应失败数据回去
        res.send({"errcode":0,"msg":"修改失败！"})
        
      }
    }
  })
});




module.exports = router;
