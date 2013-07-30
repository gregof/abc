var fs = require('fs');

/**
 * Create dir, if it does not exist.
 * @param {String} dirName
 * @param {Function} callback
 */
module.exports = function (dirName, callback) {
    fs.exists(dirName, function (exists) {
        if (!exists) {
            fs.mkdir(dirName, 0777, callback);
        } else {
            callback();
        }
    })
};
