/**
 * Created by Julien on 27/02/2015.
 */
var debug = require('debug')('serial-port');
var _ = require("underscore");

exports = module.exports = function (sp, db, io) {
// Serial port
    debug("Serial port imported");
    var throttled = _.throttle(insertDB(data), 10000); // Throttle to limit the data flow
    sp.on("data", function (rawData) {
        try {
            debug("Data from sensors has been received");
            data = JSON.parse(rawData);
            // Emit data to user through io
            io.emit('dataSending', data);
            // Feed the database (no more than once per x seconds)
            throttled();
        } catch (error) {
            debug(error);
        }
    });

    function insertDB(data) {
        debug("Inserting sensors data in DB");
        var collection = db.get('sensorsCollection');
        collection.insert({
            "t": data.t,
            "lumi": data.lumi,
            "h": data.h,
            "f": data.f,
            "hi": data.hi,
            "date": new Date()
        });
    }
}
;
