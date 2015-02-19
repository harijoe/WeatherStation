
// Application setup
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes/routes');

// MongoDB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/weatherstation');

// Serial port
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyACM0", {
    parser: serialport.parsers.readline("\n")
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);

// IO
io.on('connection', function(socket){
    console.log('IO - Connection established');
});

// serial port
sp.on("data", function (rawData) {
    try{
        console.log("Receiving data ...");
        data = JSON.parse(rawData);
        // Emit data to user through io
        io.emit('dataSending', data);
        // Feed the database
        var collection = db.get('sensorsCollection');
        collection.insert({
            "t" : data.t,
            "lumi" : data.lumi,
            "h" : data.h
        });
    } catch (error) {}
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

