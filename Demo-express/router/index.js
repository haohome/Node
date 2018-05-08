const express = require('express');
var router= express.Router();

router.get('/',function(req,res,next) {
  res.send('首页')
})

router.get('/login',function(req,res,next) {
  res.send('登录')
})

module.exports=router;