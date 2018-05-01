
var fs=require('fs');
fs.unlink('data_bak.txt',function() {
    console.log('删除了');
})

fs.mkdirSync('stuff',function() {
    console.log('已经创建新目录');
})