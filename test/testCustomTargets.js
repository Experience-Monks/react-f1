	var React = require('react');
var ReactDom = require('react-dom');
var domSelect = require('dom-select');
var ReactF1 = require(process.env.PATH_F1);
var async = require('async');

var container;


var target;


var states = {
  out: {
    item: {
    	value: "out"
    }
  },

  idle: {
    item: {
    	value: "idle"
    }
   
  }
};

var transitions = [
  { from: 'out', to: 'idle', bi: true }
];


module.exports = function(t) {

  var statesVisited = [];
  
  // each one of these objects will be applied to the `react-f1` component
  // a callback will be passed to the onComplete function if no onComplete
  // is passed then it is automatically
  async.eachSeries(
    [
      { go: 'out', states: states, transitions: transitions },
      { 
        go: 'idle', states: states, transitions: transitions,
        onComplete: function(callback, state, stateName) {
          var el = domSelect('#target');
          t.equal(stateName, 'idle', 'stateName is idle');
          t.equal(typeof state, 'object', 'state is an object');
          t.equal(el.value, 'idle', 'target input value is set to idle');

          statesVisited.push(stateName);

          callback(null);
        }
      },
      { 
        go: 'out', states: states, transitions: transitions,
        onComplete: function(callback, state, stateName) {
          var el = domSelect('#target');
          t.equal(stateName, 'out', 'stateName is out');
          t.equal(typeof state, 'object', 'state is an object');
        	t.equal(el.value, 'out', 'target input value is set to out');

          statesVisited.push(stateName);

          callback(null);
        }
      }
    ],
    render,
    function() {
      t.deepEqual(statesVisited, ['idle', 'out'], 'visited all states');

      container.parentNode.removeChild(container);
      target.parentNode.removeChild(target);

      t.end();
    }
  );
};


function render(settings, callback) {

  container = container || document.body.appendChild(document.createElement('div'));
  
  target = target || document.body.appendChild(document.createElement('input')); 
  target.id = 'target';
  
  settings.onComplete = settings.onComplete && settings.onComplete.bind(null, callback);

  settings.targets = {
  	item: target  	
  };

  var component = <ReactF1
    {...settings}
    style={undefined}
  >
  </ReactF1>;

  ReactDom.render(component, container);

  if(!settings.onComplete) {
    callback(null);
  }
}