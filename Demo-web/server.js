const http=require('http');

function startServer(route,handle){
  var onRequest=function(req,resp){
    route(handle,req.url,resp);
  }
  var server= http.createServer(onRequest)
  server.listen(3000,'127.0.0.1');
  console.log('运行在3000端口');
}

module.exports.startServer = startServer;

