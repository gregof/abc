//in
var async = require(tc.fixPath('../../lib/async.js'));
var result = [];
var arr = [
    function (callback) {
        setTimeout(function () {
            result.push(1);
            callback(2)
        }, 200);
    },
    function (callback, previousResult) {
        tc.out(previousResult);
        result.push(2);
        callback()
    }
];
async.sequence(
    arr,
    function (autoResults) {
        tc.out(result);
        tc.out(autoResults);
        tc.finish();
    }
)
//out
2
1,2
2,