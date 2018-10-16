/**
 * @Author: zerlous
 * @Date: 2018/10/16
 * @Description:
 */

var assert = require('assert');
var glob = require('glob');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');

var problems = glob.sync(path.resolve(__dirname, '../problems/*'));

problems.forEach(function (dirPath) {
    var dirName = path.relative(path.resolve(dirPath, '..'), dirPath);
    var testcasesPath = path.join(dirPath, 'test.js');
    var programPath = path.join(dirPath, 'index.js');
    var program = require(programPath);
    var testcases = require(testcasesPath);
    describe(dirName, function () {
        it('testcases should passed', function () {
            testcases.forEach(function (testcase) {
                assert.deepEqual(program.apply(null, testcase.input), testcase.output);
            });
        });
    });
});