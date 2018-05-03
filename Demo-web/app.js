var server=require('./server');
var router=require('./router')
var handler = require('./handler');

//1.匹配url地址
var handle = {};
handle["/"] = handler.index;
handle['/index'] = handler.index;
handle['/products'] = handler.products;
handle['/detail'] = handler.detail;
handle['/favicon.ico'] = handler.favicon;
handle['/api'] = handler.api;

//2.启动服务器
server.startServer(router.route,handle)