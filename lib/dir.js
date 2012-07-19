var fs = require('fs');
var path = require('path');

module.exports = function (dirName, callback) {
    path.exists(dirName, function (exists) {
        if (!exists) {
            fs.mkdir(dirName, 0777, callback);
        } else {
            callback();
        }
    })
};
