var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
console.log(bin[0],bin.length);
bin[0] = 0x48;
console.log(bin.toString('utf-8'));

var bin = new Buffer('hello', 'utf-8'); 
console.log(bin);

//slice截取
var bin1=new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin1.slice(2);
sub[0]=0x65;
console.log(sub.toString('utf-8'));

//拷贝
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>

