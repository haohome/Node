var fs = require('fs');
// var dst='./test.txt';
// var src='./src.txt';
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}
function main(argv) {
    copy(argv[0], argv[1]);
  console.log(argv[0],argv[1]);
}

main(process.argv.slice(2));