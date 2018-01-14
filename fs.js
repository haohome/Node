/**
 * 文件系统fs;
 * 1.引入文件系统模块
 * 2.使用fs文件系统模块的方法读取文件
 *  fs.readFile()     //以异步方式读取文件
 * fs.readFileSync()  //以同步方式读取
 */
var fs=require('fs');
fs.readFile('./data.txt',function(err,txt){
  console.log(txt.toString())
});
