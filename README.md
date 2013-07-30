## abc

#### abc.async.forEach
```javascript
abc.async(array, action, [callback]);
```
```javascript
abc.async.forEach(
    [1,2,3],
    function (value, callback) {
        if (value === 1) {
            setTimeout(function () {
                callback(value * value);
            }, 200)
        } else {
            callback(value * value);
        }
    },
    function (results) {
        results; // [1, 4, 9]
        // finish
    }
);
```
```javascript
abc.async.forEach(
    [func1, func2, func3],
    function (results) {
        // finish
    }
);
function func1 (callback) {
    // ...
    callback();
}
// func2, func3
```
#### abc.async.sequence
```javascript
abc.sequence(array, action, [callback]);
```
```javascript
abc.async.sequence(
    [1,2,3],
    function (value, callback, previousResult) {
        value; // 1, 2, 3
        previousResult; // null, 1, 4
        
        if (value === 1) {
            setTimeout(function () {
                callback(value * value);
            }, 200)
        } else {
            callback(value * value);
        }
    },
    function (results) {
        results; // [1, 4, 9]
        // finish
    }
);
```
```javascript
abc.async.sequence(
    [func1, func2, func3],
    function (results) {
        // finish
    }
);
function func1 (callback, previousResult) {
    // ...
    callback();
}
// func2, func3
```

####abc.dir
Create dir, if it does not exist.
```javascript
abc.dir(dirPath, callback)
```

#### abc.file.read
```javascript
abc.file.read(filename, callback)
```
#### abc.file.write
```javascript
abc.file.write(filename, text, callback)
```
#### abc.file.copy
```javascript
abc.file.copy(sourceFileName, destinationFileName, callback)
```
#### abc.file.binRead
```javascript
abc.file.binRead(filename, callback)
```
#### abc.file.binWrite
```javascript
abc.file.binWrite(filename, data, callback)
```
#### abc.file.binCopy
```javascript
abc.file.binCopy(sourceFileName, destinationFileName, callback)
```

#### abc.extend
```javascript
abc.extend(origin, patch1 /*, ..., patchN */, recursive)
```

#### abc.find
Recursive find in dir. Calls fileCallback for each file, and completeCallback at end.
```javascript
abc.find(dirPath, fileCallback, completeCallback, {recursive: true, excludedDirs: ['node_modules']})

function fileCallback (file, dirPath) {
    file; // code.js
    dirPath; // src/
    return /.*\.js/.test(file); // find all js files
}
```

#### abc.Executer
Pool of actions limited by action executed in parallel.
```javascript
var executer = new abc.Executer(30); // No more then 30 actions in parallel.
executer.add(function (callback) {
    // do something async
    calllback();
});
```
