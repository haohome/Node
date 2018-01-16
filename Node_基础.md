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

### http第三方模块express

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
- 中间件

