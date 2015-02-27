/**
 * Created by Julien on 25/02/2015.
 */
var debug = require('debug')('generated-express-app');

exports = module.exports = function (io, db) {
    var connectCounter = 0;
    io.sockets.on('connection', function (socket) {
        // Connection counter
        connectCounter ++;
        console.log('conn');
        io.sockets.emit('update connectCounter', {connectCounter: connectCounter}); // emit to everybody
        debug('IO Connection established');

        // Chat events
        var pseudo;
        socket.on('chat message', function (msg) {
            if (pseudo == null) { // Set the pseudo
                pseudo = msg;
                debug('User '+pseudo+' identified');
                socket.emit('pseudo accepted', {pseudo: pseudo}); // emit to triggering user
            }
            else { // Sends a message
                io.sockets.emit('append message',{pseudo: pseudo, message: msg});
                try{
                    var collection = db.get('chatMessages');
                    collection.insert({
                        "pseudo" : pseudo,
                        "message" : msg,
                        "date" : new Date()
                    });
                } catch (error) {

                }

            }
        });

        socket.on('disconnect', function() {
            console.log('disc');
            connectCounter--;
            io.sockets.emit('update connectCounter', {connectCounter: connectCounter}); // emit to everybody
        });
    });
};