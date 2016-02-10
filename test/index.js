// things to test
// set
// chief go
// merge states

// this will drop in some boiler plate to be able to test
// react without the dom
var jsDomBoiler = require('./jsDomBoiler');
var test = require('tape');

jsDomBoiler();

test('test f1 via go', require('./testF1Go'));
test('test chief via go', require('./testChiefGo'));