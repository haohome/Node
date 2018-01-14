const http=require('http');
const express=require('express');
var app=express();
let server=http.createServer(app);
server.listen(3000);

app.get('/user/register',function(req,res){
  res.sendFile(__dirname+'/public/register.html')
})

app.get('/users',function(req,res){
  //向客户端输出json字符串
  let arr=[
    {uid:101,uname:'tom',birthday:new Date()},
    {uid:101,uname:'mary',birthday:new Date()},
    {uid:101,uname:'joe',birthday:new Date()},
    {uid:101,uname:'John',birthday:new Date()}
  ];
  // res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500");//允许127.0.0.1访问
  res.json(arr);   //把服务器端数组转换为Json字符串并输出给客户端
})