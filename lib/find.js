var fs = require('fs');
var path = require('path');
var extend = require('./extend.js');

/**
 * Recursive find in dir. Calls fileCallback for each file, and completeCallback at end.
 * @param {String} dirPath
 * @param {Function} fileCallback
 * @param {Function} completeCallback
 * @param {Object} [options]
 * @param {Boolean} [options.recursive = true]
 * @param {Array} [options.excludedDirs] Directories started from '.' ignored automatically.
 */
module.exports = function (dirPath, fileCallback, completeCallback, options) {
    // счетчик входов в асинхронные операции чтения,
    // если обнулился значит мы уже ничего не ждем, а значит конец
    var seek = 0;

    options = extend({
        recursive: true,
        excludedDirs: []
    }, options);

    function excludedDir(dir) {
        return options.excludedDirs
            .some(function (excludedDir) {
                return path.resolve(excludedDir) === path.resolve(dir);
            });
    }

    function checkComplete () {
        if (!--seek) {
            completeCallback();
        }
    }

    function processDir (dirPath, fileCallback) {
        seek++;

        fs.readdir(dirPath, function (err, files) {
            if (err) {
                throw err;
            }

            files.forEach(function (file) {
                processFile(dirPath, file, fileCallback);
            });

            checkComplete();
        });
    }

    function processFile (dirPath, file, fileCallback) {
        seek++;

        var filePath = path.join(dirPath, file);
        fs.stat(filePath, function (err, stat) {
            if (err) {
                throw err;
            }

            if (file[0] !== '.') { // отсекаем служебные файлы - они начинаются с точки
                if (stat.isDirectory()) {
                    if (options.recursive && !excludedDir(filePath)) {
                        processDir(filePath, fileCallback);
                    }
                } else {
                    fileCallback(file, dirPath);
                }
            }

            checkComplete();
        })
    }

    processDir(dirPath, fileCallback);
};
