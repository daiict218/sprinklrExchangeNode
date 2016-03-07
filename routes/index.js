var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sprinklrExchange' });
});

router.get('/ask', function(req, res, next) {
  res.render('index2', { title: 'sprinklrExchange' });
});

router.get('/tags', function(req, res, next) {
  res.render('tags', { title: 'sprinklrExchange' });
});


module.exports = router;
