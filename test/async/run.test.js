var abc = require('abc');

var options = process.argv.slice(2)
var fileNames = options.length ? options : null; 

findCaseFiles(__dirname + '/case', fileNames, function (caseFiles) {
    var tests = [];
    abc.async.forEach(
        caseFiles,
        function (caseFile, callback) {
            loadTest(caseFile.file, caseFile.path, function (test) {
                tests.push(test);
                callback();
            })
        },
        function () {
            runAllTests(tests);
        }
    );
})

function findCaseFiles (dirPath, fileNames, callback) {
    var caseFiles = [];
    abc.find(
        dirPath, 
        function check (file, path) {
            if (fileNames ? fileNames.indexOf(file) !== -1 : /\.case\./.test(file)) {
                caseFiles.push({file: file, path: path})
            }
        },
        function () {
            callback(caseFiles);
        }
    );

}

function loadTest (file, path, callback) {
    abc.file.read(path + '/' + file, function (text) {
        var inIndex = text.indexOf('//in');
        var outIndex = text.indexOf('//out');

        var inText = text.substring(inIndex + 5, outIndex - 1);
        var outText = text.substring(outIndex + 6);
       
        callback({
            file: file, 
            inText: inText, 
            outText: outText
        })
    })
}

function runAllTests (tests) {
    abc.async.sequence(
        tests, 
        function (test, callback) {
            runTest(test.file, test.inText, test.outText, callback);
        },
        function () {}
    );
}

function runTest (file, inText, outText, callback) {
    
    var finish = function (result) {
        result = JSON.stringify(result);
        if (result !== outText) {
            console.log(file + ' - ERROR')
            console.log('result:')
            console.log(result)
            console.log('expectedResult:')
            console.log(outText)
        } else {
            console.log(file + ' - OK')
        }

        callback();
    }

    try {
        eval(inText);
    } catch(e) {
        console.log(file + ' - ERROR');
        console.log('eval:', e);
        callback();
    }

}