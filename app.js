//http的报错模块
var createError = require('http-errors');
//引入express
var express = require('express');
//引入path
var path = require('path');
//引入处理Cookie的模块 token cookie一般都是后端直接存进去 前端给后端发请求都会带上cookie
var cookieParser = require('cookie-parser');
//引入日志模块
var logger = require('morgan');

//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//创建一个express的实例
var app = express();

// view engine setup 使用模板引擎 ; 前端请求视图文件就会自动查找views目录
app.set('views', path.join(__dirname, 'views'));
//模板引擎使用ejs
app.set('view engine', 'ejs');

//中间件 请求到响应之间都会经过这些中间件
//记录请求日志
app.use(logger('dev'));
//返回json格式数据  在请求与响应之间时，就自动转换为json格式的数据
app.use(express.json());
//对URL进行编码，防止乱码
app.use(express.urlencoded({ extended: false }));
//处理来自前端请求时携带的cookie，以及需要时可以给前端种cookie 自动做好
app.use(cookieParser());

//分配路由
//前端请求根路径，路由分配到routes.js,然后处理来自根目录的请求，最后在views目录下的index.ejs中渲染到可视页面上
app.use('/', indexRouter);
app.use('/users', usersRouter);

//处理静态文件，前端处理静态文件，默认就去public目录中去找
//静态文件就是后端不认识的, 如：（图片，js，css等）
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler  找不到服务器 处理404错误
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler  服务器错误 处理500相关的错误
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//导出app
module.exports = app;
