var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sensors', function(req, res, next) {
    res.render('sensors', { title: 'Sensors' });
});

module.exports = router;
