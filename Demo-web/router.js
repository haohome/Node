const fs=require('fs');

function route(handle,pathName,resp,params){
  if(typeof handle[pathName] ==='function'){
    handle[pathName](resp,params);
  }else{
    resp.writeHead(404, {'Content-Type':'text/html;charset=UTF-8'});
    fs.createReadStream(__dirname+'/404.html','utf8').pipe(resp);
  }
}

module.exports.route=route;


    