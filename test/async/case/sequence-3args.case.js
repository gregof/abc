//in
async = require('../../lib/async.js');
var result = [];
var arr = [1,2,3];
async.sequence(
    arr,
    function (value, callback) {
        if (value == 1) {
            setTimeout(function () {
                result.push(value);
                callback();
            }, 200)
        } else {
            result.push(value);
            callback();
        }
    },
    function () {
        finish(result);
    }
)
//out
[1,2,3]