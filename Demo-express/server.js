var express=require('express');
var app=express();
var bodyParser = require('body-parser');
const fs=require('fs');
const multer=require('multer');

var createFolder=function(folder) {
  try{
    fs.accessSync(folder);
  }catch(e) {
    fs.mkdirSync(folder);
  }
}
var uploadFolder='./upload/';
createFolder(uploadFolder);
var storage=multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null, uploadFolder);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.get('/',function(req,res){
  var respJson={
    name:'校门'
  }
  res.send(respJson)
})
app.post('/',function(req,res){
  console.dir(req.body);
  res.send(req.body);
})
app.get('/form',function(req,res) {
  // var form=fs.readFileSync('./form.html',{encoding:'utf8'})
  // res.send(form);
  res.sendFile(__dirname+'/form.html')
})
var upload=multer({ storage:storage})
app.post('/upload',upload.single('logo'),function(req,res){
  res.send({'ret_code':0})
})
app.listen(3000);
console.log('监听3000端口');
