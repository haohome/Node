const express =require('express');
const bodyParser=require('body-parser');
const fs=require('fs');
const multer = require('multer'); 

//创建一个 Express 应用
var app=express();

// 解析json格式数据
app.use(bodyParser.json());
// 解析表单数据
app.use(bodyParser.urlencoded({extended:true}));
// 解析multipart/form-data 类型的表单数据，它主要用于上传文件
// app.use(bodyParser.multer()); 

app.get('/', function (req, res) {
 res.sendFile(__dirname+'/form.html');
})

// 创建文件夹方法
var createFolder=function(folder) {
  try{
    fs.accessSync(folder);
  }catch(e) {
    fs.mkdirSync(folder);
  }
}
//文件上传路径
var uploadFolder='./upload/';
createFolder(uploadFolder);
// 文件磁盘存储
var storage=multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null, uploadFolder);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload=multer({ storage:storage})
app.post('/upload',upload.single('logo'),function(req,res) {
  console.log(req.body);
  res.send({'ret_code':0})
})
app.listen(3000);
console.log('监听3000端口');