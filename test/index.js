// things to test
// 1. regular animation between two states
// 2. set + go
// 3. adding styles on top
// 4. chief
// 5. merge

// this will drop in some boiler plate to be able to test
// react without the dom
var jsDomBoiler = require('./jsDomBoiler');
var test = require('tape');

jsDomBoiler();

test('testing regular usage via go', require('./testGo'));

// console.log(TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div'));