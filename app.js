// Express.js + socket.io

//TODO: Include dashboard

// Dependencies setup
var express = require('express');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('generated-express-app');
var routes = require('./routes/index');
var users = require('./routes/users');

// MongoDB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/weatherstation');

// Server setup
var app = express();
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Set layout
app.set('layout', '');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Set routes
app.use('/', routes);
app.use('/', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Socket.io
var io = require('socket.io').listen(server);

// Chat
var chat = require('./chat')(io, db);

// Serial port
//var sp = require('./serial-port');

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;