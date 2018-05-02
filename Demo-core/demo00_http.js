const http=require('http');
const fs=require('fs');
let server=http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
  if(req.url=='/index'){
    res.write('<h1>这是首页</h1>')
  }else if(req.url=='/user/login'){
    res.write('<h1>这是登录页</h1>')
  }else if(req.url=='/user/register'){
    res.write('<h1>这是注册页</h1>')
  }
  res.end('欢迎来到NodeJs');
})
server.listen(3000);
console.log('开始监听3000端口')
//监听3000端口
/*
fs.stat('data.txt', (err, stats) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(stats);
});

fs.realpath('./data.txt',function(err,path){
  //如果转换失败,则err中有值,否则为null
  if(err){
    console.error(err);
  }else{
    console.log(path);
  }
})


fs.readFile('data.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});


fs.writeFile('data.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
*/

// var rs=fs.createReadStream('./data.txt');
// var temp="";
// rs.on('data',function(chunk){ //每读取64kb执行data方法
//   console.log(chunk);
//   //看字符串
//   // console.log(chunk.toString());
//   temp+=chunk;//拼接所有的数据
// })
// //读取流完毕后执行end
// rs.on('end',function(){
//   console.log(temp);
// })

// var rs=fs.createReadStream('./data.txt');
// var ws=fs.createWriteStream('./data_bak.txt');

// rs.on('data',function(chunk){
//   ws.write(chunk);
// })
// rs.pipe(ws)