//in
var async = require(tc.fixPath('../../lib/async.js'));
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
        tc.out(arr);
        tc.out(result);
        tc.finish();
    }
)
//out
1,2,3
1,2,3