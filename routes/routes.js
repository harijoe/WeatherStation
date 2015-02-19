/**
 * Created by Julien on 19/02/2015.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
    res.sendFile('index.html', { root : path.join(__dirname, '../views')});
});

module.exports = router;