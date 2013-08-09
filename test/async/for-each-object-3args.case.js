//in
var async = require(tc.fixPath('../../lib/async.js'));
var arr = {one:1, two:2, three:3};
async.forEach(
    arr,
    function (value, callback) {
        callback(value * 2);
    },
    function (autoResults) {
        tc.out([results.one, results.two, results.three]);
        tc.finish();
    }
)
//out
2,4,6
