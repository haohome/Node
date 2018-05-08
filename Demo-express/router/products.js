const express = require('express');
var router= express.Router();

router.get('/',function(req,res,next) {
  res.send('ok')
})

router.get('/pro',function(req,res,next) {
  res.send('ok2')
})

module.exports=router;