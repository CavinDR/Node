var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '10000 0', name:'xiaoyu'}); //传到路由（routes）里，进行分配
});

module.exports = router;
