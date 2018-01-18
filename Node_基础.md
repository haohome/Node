### 1.HTTP模块
- http模块是创建HTTP协议的服务器端应用(代替Apache和php)——接受客户端请求,解析并处理请求,返回响应消息.
- http模块还用于创建HTTP协议的客户端应用(模拟浏览器功能)——向其他的服务器发起请求，等待返回响应消息.

Node.js中使用http模块创建服务器端应用：

```JavaScript
  const http=require('http');
  let server=http.createServer(function(req,res){
    //客户端请求消息 req.method/url/headers
    //服务器响应消息 res.write()/writeHead()/end
  })
  server.listen(3000);//监听3000端口
```

eg:http模块请求不同url,响应不同消息主体
```JavaScript
  const http=require('http');
  let server=http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
    if(req.url=='/index'){
      res.write('<h1>这是首页</h1>')
    }else if(req.url=='/user/login'){
      res.write('<h1>这是登录页</h1>')
    }else if(req.url=='/user/register'){
      res.write('<h1>这是注册页</h1>')
    }
    res.end('欢迎来到NodeJs');
  })
  server.listen(3000);//监听3000端口
```

### 2.fs模块
- fs模块提供了文件的读写、更名、删除、遍历目录等操作。
- fs模块中大多方法都带有同步和异步两种操作模式

> 1)异步方法的最后一个参数都是一个回调函数
> 2)传给回调函数的参数取决于具体方法,但回调函数的第一个参数是error异常,如果有异常,会静默失败,需要手动处理;
> 3)同步方法中任何异常都会被立即抛出,可以使用 try/catch 来处理异常，或让异常向上冒泡。

```JavaScript
//异步方法
const fs = require('fs');
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;//有异常则抛出异常
  console.log('成功删除 /tmp/hello');
});
```

```JavaScript
//同步方法  方法名后+Sync
const fs = require('fs');
fs.unlinkSync('/tmp/hello');
console.log('成功删除 /tmp/hello');
```

2.1 判断文件是否存在
fs.stat方法:fs.stat(path, callback(err,stats))
第一个参数是path(路径),第二个参数是回调函数(第一个参数是异常error,第二个是统计信息描述对象)
```JavaScript
fs.stat('data.txt', (err, stats) => {
  if (err) {
    console.log(err.code);
    throw err;
  }
  console.log(stats);
});
```

2.2 文件路径转换
fs.realpath方法:fs.realpath(path[, options], callback(err,realpath)),将相对路径转为绝对路径
> 在express中提供文件路径时用到
```JavaScript
fs.realpath('./data.txt',function(err,resolvedPath){
  //如果转换失败,则err中有值,否则为null
  if(err){
    console.error(err);
  }else{
    console.log(resolvedPath);// e:\Github\Node\data.txt
  }
})
```

2.3 文件重命名
fs.rename方法:fs.rename(oldPath, newPath, callback(err))

2.4 文件读写
fs.readFile方法:fs.readFile(path[, options], callback(err,data))
fs.writeFile方法:fs.writeFile(file, data[, options], callback(err))
- options
> - encoding <string> | <null> 默认 = 'utf8'
如果 data 是一个 buffer，则忽略 encoding 选项。它默认为 'utf8'.
> - mode <integer> 默认 = 0o666
> - flag <string> 默认 = 'w',表示"写",flag=="a",则为追加append

```JavaScript
fs.writeFile('data.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```
> 多次对同一文件使用 fs.writeFile 且不等待回调，是不安全的。 对于这种情况，强烈推荐使用 fs.createWriteStream。

2.5 读写流

- 读取流
```JavaScript
var rs=fs.createReadStream('./data.txt');
var temp="";
rs.on('data',function(chunk){ //每读取64kb执行data方法
  console.log(chunk);
  //看字符串
  // console.log(chunk.toString());
  temp+=chunk;//拼接所有的数据
})
//读取流完毕后执行end
rs.on('end',function(){
  console.log(temp);
})
```

- 写入流
```JavaScript
var rs=fs.createReadStream('./data.txt');
var ws=fs.createWriteStream('./data_bak.txt');

rs.on('data',function(chunk){
  ws.write(chunk);
})
```
> pipe方法写入数据时,会等当前读出的数据全部写入后,才进行下一次的读取操作,内存利用充分,当时读取时间比较长

```JavaScript
var rs=fs.createReadStream('./data.txt');
var ws=fs.createWriteStream('./data_bak.txt');
rs.pipe(ws)
```

### 3.http第三方模块express

- 使用步骤：
 1.安装
 2.使用http模块创建Web服务器，运行express，让其承担请求监听器的任务
```JavaScript
	var app = express();
	http.createServer( app ).listen(80);
```
3.为app对象添加特定URL的请求处理
```JavaScript
app.get('/user', function(req, res){     
		//接收请求消息中的数据
		req.query   //获取查询字符串中的数据{ }
		req.params  //获取请求参数(手册自学)
		req.on('data', function(buf){})  //获取请求主体中的数据
		//发送响应消息
		res.send(HTML文本);
		res.sendFile(任意类型的文件);
		res.json(对象/数组数据);
	})

```
- 3.1 路由
路由，针对客户端的某个请求方法所请求的特定URL，如何给出响应消息的过程，称为“路由”
路由 = 请求方法 + 请求URL + 处理函数
一个典型的路由形如：
```JavaScript
app.get('/user', function(req, res){     
		//接收请求消息中的数据
		req.query   //获取查询字符串中的数据{ }
		req.params  //获取请求参数(手册自学)
		req.on('data', function(buf){})  //获取请求主体中的数据

		//发送响应消息
		res.send(HTML文本);
		res.sendFile(任意类型的文件);
		res.json(对象/数组数据);
	})
```
**express.Router**
 > 在 app 目录下创建名为 birds.js 的文件，内容如下：
 ```JavaScript
 var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});
module.exports = router;
```
然后在应用中加载路由模块：
```JavaScript
var birds = require('./birds');
...
app.use('/birds', birds);
```
应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。



- 3.2 中间件
中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。
功能:
	(1)执行任何代码。
	(2)修改请求和响应对象。
	(3)终结请求-响应循环。
	(4)调用堆栈中的下一个中间件。
  ![中间件](http://ojis8rp6f.bkt.clouddn.com/18-1-18/39090586.jpg)

> 如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

- 应用级中间件
应用级中间件绑定到app对象使用app.use()和app.METHOD(),其中，METHOD是需要处理的HTTP请求的方法，例如GET,PUT,POST等等全部小写。
```JavaScript
var app = express();
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```
3.2.1 在一个挂载点装载一组中间件
```JavaScript
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```
3.2.2 下例为指向 /user/:id 的 GET 请求定义了两个路由,但第一个路由终止了请求-响应循环,第二个路由不会被执行
```JavaScript
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});
// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

3.2.3 如果需要在中间件栈中跳过剩余中间件，调用next('route')方法将控制权交给下一个路由
> 注意：next('route')只对使用app.VERB()或router.VERB()加载的中间件有效。
```JavaScript
  // 一个中间件栈，处理指向 /user/:id 的 GET 请求
  app.get('/user/:id', function (req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id == 0) next('route');
    // 否则将控制权交给栈中下一个中间件
    else next(); //
  }, function (req, res, next) {
    // 渲染常规页面
    res.render('regular');
  });

  // 处理 /user/:id， 渲染一个特殊页面
  app.get('/user/:id', function (req, res, next) {
    res.render('special');
  });
```

 - 路由级中间件 使用方法与应用级中间件类似
 > var router = express.Router();
 - 错误处理中间件
 错误处理中间件有4个参数，定义错误处理中间件时必须使用这4个参数。即使不需要next对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
```JavaScript
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
```

 - 项目中常用的中间件
  (1)向客户端返回指定目录下的所有静态资源文件
	app.use(express.static('./public'));
  (2)将客户端POST请求主体中的数据封装到req.body中
	npm  i  body-parser
	const bodyParser = require('body-parser');
	app.use( bodyParser.urlencoded({extended: false}));
  (3)将请求头部中的Cookie数据封装到req.cookies中
	npm   i   cookie-parser
	const cookieParser = require('cookie-parser');
	app.use(cookieParser());   

