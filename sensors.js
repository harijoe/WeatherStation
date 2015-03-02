/**
 * Created by Julien on 27/02/2015.
 */
var debug = require('debug')('serial-port');

exports = module.exports = function (sp, db, io) {
// Serial port
    debug("Serial port imported");
    var timer = Date.now();
    sp.on("data", function (rawData) {
        try {
            debug("Receiving data from sensors");
            data = JSON.parse(rawData);
            // Emit data to user through io
            io.emit('dataSending', data);
            if((Date.now() - timer) > 500*1000) {
                insertIntoDB(data, db);
                timer = Date.now();
            }
        } catch (error) {
            debug(error);
        }
    });
};

function insertIntoDB(data, db) {
    debug("Storing data in database");
    var collection = db.get('sensorsCollection');
    collection.insert({
        "t": data.t,
        "lumi": data.lumi/40, // /40 to scale with other values
        "h": data.h,
        "f": data.f,
        "hi": data.hi,
        "date": new Date()
    });
}