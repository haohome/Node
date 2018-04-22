//1.引入模块
var express=require('express');
//2.初始化express
var app=express();
//3.设置路由条目
app.get("/index",function(req,res){
  console.log(req.query);
  let pno=req.query.pno || "1";
  res.send("GET /newslist"+ pno);
})

app.get('/newsdetail',function(req,res){
  let nid=req.query.nid;
  if(nid){
    //Todo:根据新闻编号查询
    res.json({ })
  }else{
    res.json({nid:0,title:'未指定的新闻',pubTime:0,content:"未指定的新闻内容"})
  }
})


app.listen(8888,function(){
  console.log("success");
})