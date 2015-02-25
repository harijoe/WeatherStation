var express = require('express');
var router = express.Router();
var expressLayouts = require('express-ejs-layouts');
router.use(expressLayouts);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sensors', function(req, res, next) {
    res.render('sensors', { title: 'Sensors' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Dashboard', layout: 'layout' });
});

module.exports = router;
