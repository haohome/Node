var express=require('express');
var app=express();
var indexRouter=require('./router/index');
var productsRouter=require('./router/products');

app.use('/',indexRouter);
app.use('/products',productsRouter)
app.listen(3000);
console.log('监听3000端口');
