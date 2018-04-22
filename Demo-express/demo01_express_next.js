var express=require('express');
var app=express();
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();//放行,可以增加if判断决定是否放行
});
app.use(function(req,res,next){
  console.log("这是一个中间件2");
  next();
})
app.get("/newslist",function(req,res,next){
  console.log("获取newslist");
  res.send('获得newslist');
  next();
})

app.get('/newsdetail',function(req,res,next){
  console.log("获取newsdetail");
  res.send('获得newsdetail');
  next();
})

app.use(function(req,res,next){
  console.log("这是一个中间件3");
  next();
})






app.listen(8888,function(){
  console.log("success");
})