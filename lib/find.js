var fs = require('fs');
/**
 * Рекурсивено обходит все дирректории, для каждого файла вызывает fileCallback,
 * после обхода всех дирректорий вызывает completeCallback
 */
module.exports = function (dirPath, fileCallback, completeCallback) {
    // счетчик входов в асинхронные операции чтения,
    // если обнулился значит мы уже ничего не ждем, а значит конец
    var seek = 0;

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

        var filePath = dirPath + '/' + file;
        fs.stat(filePath, function (err, stat) {
            if (err) {
                throw err;
            }

            if (file[0] !== '.') { // отсекаем служебные файлы - они начинаются с точки
                if (stat.isDirectory()) {
                    processDir(filePath, fileCallback);
                } else {
                    fileCallback(file, dirPath);
                }
            }

            checkComplete();
        })
    }

    processDir(dirPath, fileCallback);
}