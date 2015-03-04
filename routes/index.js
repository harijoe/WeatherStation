var express = require('express');
var router = express.Router();
var expressLayouts = require('express-ejs-layouts');
router.use(expressLayouts);

/* GET home page. */

router.get('/sensors', function(req, res, next) {
    res.render('sensors', { title: 'Sensors' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Dashboard', layout: 'layout' });
});

router.get('/darwin', function(req, res, next) {
    res.render('darwin', { title: 'Darwin', layout: 'layout' });
});

// Chat
router.get('/chat/get-messages', function(req, res) {
    var db = req.db;
    var collection = db.get('chatMessages');
    collection.find({}, {sort: {date: -1}, limit: 8}, function(e, docs){
        if (e) return next(e);
        res.send(docs.reverse());
    });
});

// Sensors
router.get('/sensors/get-sensors-data', function(req, res) {
    var db = req.db;
    var collection = db.get('sensorsCollection');
    collection.find({}, {sort: {date: -1}, limit: 580}, function(e, docs){
        if (e) return next(e);
        res.send(docs);
    });
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
