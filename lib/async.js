exports.forEach = function (array, action, callback) {
    if (!callback) {
        callback = action;
        action = function (item, callback) {
            item(callback);
        };
    }
    if (!array.length) {
        callback();
    } else {
        var loadCounter = 0;
        array.forEach(function (item) {
            action(item, function () {
                if (++loadCounter === array.length) {
                    callback(array)
                }
            });
        });
    }
};

function sequence (array, action, callback) {
    if (!array.length) {
        callback();
    } else {
        var item = array.shift();
        action(item, function () {
            sequence(array, action, callback);
        })
    }
};

exports.sequence = function (array, action, callback) {
    if (!callback) {
        callback = action;
        action = function (item, callback) {
            item(callback);
        };
    }
    sequence(array, action, callback);
};