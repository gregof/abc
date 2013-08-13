//in
var async = require(tc.fixPath('../../lib/async.js'));
var arr = {
    one: function (callback) {callback(1);},
    two: function (callback) {
        setTimeout(function () {
            callback(2);
        }, 200);
    },
    three: function (callback) {callback(3);}
};
async.forEach(
    arr,
    function (autoResults) {
        tc.out([autoResults.one, autoResults.two, autoResults.three]);
        tc.finish();
    }
);
//out
1,2,3