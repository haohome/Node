const fs=require('fs');

function route(handle,url,resp){
  if(typeof handle[url] ==='function'){
    resp.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
    handle[url](resp);
  }else{
    console.log('没有该页面');
  }
}

module.exports.route=route;


    