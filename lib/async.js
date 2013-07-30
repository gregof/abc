/**
 * @param {Array} array
 * @param {Function} action
 * @param {Function} [callback]
 * @example
 * abc.async([url1, url2], function (url, callback) { ... }, function () {})
 * abc.async([func1, func2], function () {});
 */
exports.forEach = function (array, action, callback) {
    var results = [];
    if (!callback) {
        callback = action;
        action = function (item, callback) {
            item(callback);
        };
    }
    if (!array.length) {
        callback(results);
    } else {
        var loadCounter = 0;
        array.forEach(function (item) {
            action(item, function (result) {
                results.push(result);
                if (++loadCounter === array.length) {
                    callback(results)
                }
            });
        });
    }
};

/**
 * @param {Array} array
 * @param {Function} action
 * @param {Function} [callback]
 * @example
 * abc.sequence([url1, url2], function (url, callback) { ... }, function () {})
 * abc.sequence([func1, func2], function () {});
 */
exports.sequence = function (array, action, callback) {
    if (!callback) {
        callback = action;
        action = function (item, callback) {
            item(callback);
        };
    }
    sequence(array.slice(), action, callback, []);
};

function sequence (array, action, callback, results) {
    if (!array.length) {
        callback(results);
    } else {
        var item = array.shift();
        action(item, function (result) {
            results.push(result);
            sequence(array, action, callback, results);
        })
    }
}
