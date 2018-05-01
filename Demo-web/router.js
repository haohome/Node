const fs=require('fs');

function route(handle,url,resp){
  if(typeof handle[url] ==='function'){
    resp.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
    handle[url](resp);
  }else{
    resp.writeHead(404, {'Content-Type':'text/html;charset=UTF-8'});
    fs.createReadStream(__dirname+'/404.html','utf8').pipe(resp);
  }
}

module.exports.route=route;


    