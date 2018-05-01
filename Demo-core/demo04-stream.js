var fs = require('fs');
const path = require('path');
//创建一个读取流
var rs = fs.createReadStream(path.resolve(__dirname,'test.txt'),'utf8');
var str='';
var i=1;
rs.on('data', function (chunk) {
    str+=chunk;
    i++;
    // console.log(chunk);
});
rs.on('end', function () {
    console.log('接收完毕');
});
//创建一个写入流,并利用管道复制
var ws = fs.createWriteStream(path.resolve(__dirname,'test1.txt'));
rs.pipe(ws)

var writeData='hello World';
var test2=fs.createWriteStream(__dirname+'/test2.txt');
test2.write(writeData,'utf8');
test2.end();
test2.on('finish', function() {
    console.log('写入完成');
})