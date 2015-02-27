/**
 * Created by Julien on 27/02/2015.
 */
var debug = require('debug')('serial-port');

exports = module.exports = function (serialport) {
    var SerialPort = serialport.SerialPort;
    var sp = new SerialPort("/dev/ttyACM0", {
        parser: serialport.parsers.readline("\n")
    });
// Serial port
    sp.on("data", function (rawData) {
        try {
            debug("Receiving data ...");
            data = JSON.parse(rawData);
            // Emit data to user through io
            io.emit('dataSending', data);
            // Feed the database
            var collection = db.get('sensorsCollection');
            collection.insert({
                "t": data.t,
                "lumi": data.lumi,
                "h": data.h,
                "f": data.f,
                "hi": data.hi,
                "date": new Date()
            });
        } catch (error) {
        }
    });
};
