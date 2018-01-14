/**
 * 文件系统fs;
 * 1.引入文件系统模块
 * 2.使用fs文件系统模块的方法读取文件
 *  fs.readFile()     //以异步方式读取文件
 * fs.readFileSync()  //以同步方式读取
 */
var fs=require('fs');
var rs=fs.createReadStream('./data.txt');
var ws=fs.createWriteStream('./data.txt');
ws.write('头几时续与穿游中懂尽疑男？醒声结环迹家！');
