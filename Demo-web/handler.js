const fs=require('fs');
function favicon(resp,params){
  resp.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
  fs.createReadStream(__dirname +'/favicon.ico').pipe(resp);
}
function index(resp,params){
  resp.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
  fs.createReadStream(__dirname +'/index.html','utf8').pipe(resp);
}
function products(resp,params){
  resp.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
  fs.createReadStream(__dirname +'/products.html','utf8').pipe(resp);
}
function detail(resp,params){
  resp.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
  fs.createReadStream(__dirname +'/detail.html','utf8').pipe(resp);
}
function api(resp,params){
  resp.writeHead(200, {'Content-Type':'application/json'});
  var obj=JSON.stringify(params);
  resp.end(obj)
}
module.exports={
  index:index,
  products:products,
  detail:detail,
  api:api,
  favicon:favicon
}