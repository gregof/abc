/**
 * @param {Object|Array} array
 * @param {Function} action
 * @param {Function} [callback]
 * @example
 * abc.async([url1, url2], function (url, callback) { ... }, function () {})
 * abc.async([func1, func2], function () {});
 * abc.async({one: url1, two: url2}, function (url, callback) { ... }, function () {})
 * abc.async({one: func1, two: func2}, function () {});
 */
exports.forEach = function (array, action, callback) {
    if (!callback) {
        callback = action;
        action = function (item, callback) {
            item(callback);
        };
    }

    var counter;
    var results;
    var each;

    if (Array.isArray(array)) {
        counter = array.length;
        results = [];
        each = arrEach;
    } else {
        counter = Object.keys(array).length;
        results = {};
        each = objEach;
    }

    if (!counter) {
        callback(results);
    } else {
        each(array, function (item, k) {
            action(item, function (result) {
                results[k] = result;
                if (!--counter) {
                    callback(results);
                }
            });
        });
    }
};

function arrEach(arr, iter) {
    arr.forEach(iter);
}

function objEach (arr, iter) {
    for (var k in arr) {
        iter(arr[k], k)
    }
}

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
        action = function (item, callback, previousResult) {
            item(callback, previousResult);
        };
    }
    sequence(array.slice(), action, callback, [], null);
};

function sequence (array, action, callback, results, previousResult) {
    if (!array.length) {
        callback(results);
    } else {
        var item = array.shift();
        action(item, function (result) {
            results.push(result);
            sequence(array, action, callback, results, result);
        }, previousResult);
    }
}
