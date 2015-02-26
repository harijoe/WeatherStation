/**
 * Created by Julien on 25/02/2015.
 */
var debug = require('debug')('generated-express-app');

exports = module.exports = function (io, db) {
    io.sockets.on('connection', function (socket) {
        debug('IO Connection established');
        var pseudo;
        socket.on('chat message', function (msg) {
            if (pseudo == null) {
                pseudo = msg;
                debug('User '+pseudo+' identified');
                socket.emit('pseudo accepted', {pseudo: pseudo});
            }
            else {
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
    });
};