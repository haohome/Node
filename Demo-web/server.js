const http=require('http');
const url=require('url');
const queryString=require('querystring');
function startServer(route,handle){
  var onRequest=function(req,resp){
    //url路径
    var pathName=url.parse(req.url).pathname;
    //请求为GET时,解析路由query
    if(req.method=='GET'){
      var params=url.parse(req.url,true).query;
      route(handle,pathName,resp,params);
    }
    //请求为POST时,监听数据流
    else if(req.method=="POST"){
      var data="";
      req.on('error',function(err){
        console.log(err);
      }).on('data',function(chunk){
        data+=chunk;
      }).on('end',function(){
      var params=queryString.parse(data);
      route(handle,pathName,resp,params);
      })
    }
  }
  var server= http.createServer(onRequest)
  server.listen(3000,'127.0.0.1');
  console.log('运行在3000端口');
}
module.exports.startServer = startServer;

