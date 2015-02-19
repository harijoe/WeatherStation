var routes = require('./routes/routes');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serial port
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyACM0", {
    parser: serialport.parsers.readline("\n")
});

app.use('/', routes);

// IO
io.on('connection', function(socket){
    console.log('IO - Connection established');
});

// serial port
sp.on("data", function (data) {
    try{
        console.log("Receiving data ...");
        io.emit('dataSending', JSON.parse(data));
    } catch (error) {}
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

