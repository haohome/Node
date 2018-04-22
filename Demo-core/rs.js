/**
 * 文件系统fs;
 * 1.引入文件系统模块
 * 2.使用fs文件系统模块的方法读取文件
 *  fs.readFile()     //以异步方式读取文件
 * fs.readFileSync()  //以同步方式读取
 */
var fs=require('fs');

//读取数据流
var rs=fs.createReadStream('./data.txt');
var count=1;
var temp="";
rs.on('data',function(chunk){
  count++;
  temp+=chunk;
})
rs.on('end',function(){
  console.log(count);
  console.log(temp.toString());
})
