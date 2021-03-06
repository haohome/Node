/*
 * @Author: Daniel Hfood 
 * @Date: 2018-04-22 22:31:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-01 15:06:04
 */
/**
 * fs.readFile()以异步方式读取
 * fs.readFileSync()以同步方式读取
 */
var fs = require('fs');
const path = require('path');
//当前绝对路径
console.log(path.resolve(__dirname));
//读取当前路径下的text.txt内容
console.log('====================================');
console.log(process.argv[1]);//当前文件的绝对路径
console.log('====================================');
fs.readFile(path.resolve(__dirname,'./test.txt'),function(err,txt){
    if(err)throw err;
    // console.log(txt);
    // console.log(txt.toString())
});
//创建文件并写入新数据(拷贝)
fs.writeFileSync(path.resolve(__dirname,'./test2.txt'),fs.readFileSync(path.resolve(__dirname,'./test.txt')),(err)=>{
    if (err) throw err;
  console.log('The file has been saved!');
})

/**
 * 大文件的拷贝
 */
fs.createReadStream(path.resolve(__dirname,'./test.txt')).pipe(fs.createWriteStream(path.resolve(__dirname,'./test3.txt')));

var content='hello world';
// fs.writeFile(__dirname+'/data2.txt',content,function(err) {
//   console.log('已完成写入')
// })

var readFileSync=fs.readFileSync(__dirname+'/data.txt',function(err,txt) {
    // console.log(txt.toString());
  })
  //3.将读取的文件写入到新文件中
  fs.writeFile(__dirname+'/data2.txt',readFileSync,function(err) {
    console.log('已完成写入')
  })