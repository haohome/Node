var fs = require('fs');
const path = require('path');
var rs = fs.createReadStream(path.resolve(__dirname,'test.txt'));
var str='';
var i=1;
rs.on('data', function (chunk) {
    str+=chunk;
    i++;
    // console.log(i);
    
});

rs.on('end', function () {
    // console.log(str.toString('utf-8'));
});

var rs = fs.createReadStream(path.resolve(__dirname,'test.txt'));
var ws = fs.createWriteStream(path.resolve(__dirname,'ws.txt'));
rs.on('data', function (chunk) {
    ws.write(chunk);
});
rs.on('end', function () {
    ws.end();
    console.log("这里",ws.toString());
});