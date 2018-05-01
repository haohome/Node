const fs=require('fs');
function favicon(resp){
  fs.createReadStream(__dirname +'/favicon.ico').pipe(resp);
}
function index(resp){
  fs.createReadStream(__dirname +'/index.html','utf8').pipe(resp);
}
function products(resp){
  fs.createReadStream(__dirname +'/products.html','utf8').pipe(resp);
}
function detail(resp){
  fs.createReadStream(__dirname +'/detail.html','utf8').pipe(resp);
}

module.exports={
  index:index,
  products:products,
  detail:detail,
  favicon:favicon
}