//in
async = require('../../lib/async.js');
var result = [];
var arr = [
    function (callback) {
        setTimeout(function () {
            result.push(1);
            callback()
        }, 200);
    },
    function (callback) {
        result.push(2);
        callback()
    }
];
async.sequence(
    arr,
    function () {
        finish(result);
    }
)
//out
[1,2]