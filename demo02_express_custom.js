// 向服务端返回所有静态文件
/**
 * 使用静态资源中间件
 */
const http=require("http");
const express=require("express");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
var app=express();
let server=http.createServer(app);
server.listen(3000);

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
/*定义路由*/
app.post('/register',function(req,res){
  console.log("POST /register");
  console.log(req.query);
  console.log(req.body);
  console.log(req.body.uname);
  console.log(req.cookies);
  console.log("结束了")

  res.send('ok');
})