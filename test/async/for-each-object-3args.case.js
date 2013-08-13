//in
var async = require(tc.fixPath('../../lib/async.js'));
var arr = {one: 1, two: 2, three: 3};
async.forEach(
    arr,
    function (value, callback) {
        if (value === 1) {
            setTimeout(function () {
                callback(value * 2);
            }, 200)
        } else {
            callback(value * 2);
        }
    },
    function (autoResults) {
        tc.out([autoResults.one, autoResults.two, autoResults.three]);
        tc.finish();
    }
);
//out
2,4,6