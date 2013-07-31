//in
var async = require(tc.fixPath('../../lib/async.js'));
var result = [];
var arr = [1,2,3];
async.forEach(
    arr,
    function (value, callback) {
        if (value == 1) {
            setTimeout(function () {
                result.push(value);
                callback(value);
            }, 200)
        } else {
            result.push(value);
            callback(value);
        }
    },
    function (autoResults) {
        tc.out(result);
        tc.out(autoResults);
        tc.finish();
    }
)
//out
2,3,1
1,2,3