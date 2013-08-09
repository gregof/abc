//in
var async = require(tc.fixPath('../../lib/async.js'));
var arr = {
  one: function () {return 1}, 
  two: function () {return 2}, 
  three: function () {return 3}
};
async.forEach(
    arr,
    function (autoResults) {
        tc.out([results.one, results.two, results.three]);
        tc.finish();
    }
)
//out
1,2,3
