//in
var async = require(tc.fixPath('../../lib/async.js'));
var result = [];
var arr = [1,2,3];
async.sequence(
    arr,
    function (value, callback, previousResult) {
        tc.out(previousResult);
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
    function () {
        tc.out(arr);
        tc.out(result);
        tc.finish();
    }
)
//out

1
2
1,2,3
1,2,3