/**
 * Выполняет указанное асинхронное действие над массивом.
 */
exports.forEach = function (array, action, callback) {
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
    var value = array.shift();
    if (value) {
        action(value, function () {
            sequence(array, action, callback);
        })
    } else {
        callback();
    }
};

exports.sequence = sequence;

exports.all = function (list, callback) {
    if (!list.length) {
        callback();
    } else {
        var counter = list.length;
        function listCallback () {
            counter--;
            if (!counter) {
                callback();
            }
        }
        for (var i = 0; i < list.length; i++) {
            list[i](listCallback);
        }
    }
};