var jsDomBoiler = require('./jsDomBoiler');
var test = require('tape');

// this will drop in some boiler plate to be able to test
// react without the dom if we're not in the dom
jsDomBoiler();

test('test f1 via go', require('./testF1Go'));
test('test merging states', require('./testMergeStates'));
test('test chief via go', require('./testChiefGo'));
test('test custom targets', require('./testCustomTargets'));
test('test custom parsers', require('./testCustomParsers'));