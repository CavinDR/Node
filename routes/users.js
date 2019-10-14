var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//在users.js里再加一个get监听，返回的信息就可以有所不同，转到了另外一个html
router.get('/login', function(req, res, next) {
  res.send('respond with a login');
});
module.exports = router;
