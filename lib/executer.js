/**
 * Pool of actions limited by action executed in parallel.
 * @class
 * @param {Number} limit
 */
module.exports = function (limit) {
    var actionsPool = [];
    var activeActionCount = 0;

    /**
     * Add action to pool.
     * @param {Function} func
     */
    this.add = function (action) {
        actionsPool.push(action);
        execute();
    };

    function execute () {
        if (activeActionCount < limit) {
            var func = actionsPool.shift();
            if (func) {
                activeActionCount++;
                func(function () {
                    activeActionCount--;
                    execute();
                });
            }
       }
    }

};
