var React = require('react');
var ReactDom = require('react-dom');
var domSelect = require('dom-select');
var ReactF1 = require('./..');
var async = require('async');

var states = {
  out: {
    item: {
      style: {
        width: 100,
        height: 50
      }
    }
  },

  idle: {
    item: {
      style: {
        width: 200,
        height: 300
      }
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
        style: {
          backgroundColor: '#00FFFF'
        },
        onComplete: function(callback, state, stateName) {
          var el = domSelect('[data-f1]');

          t.equal(stateName, 'idle', 'stateName is idle');
          t.equal(typeof state, 'object', 'state is an object');
          t.equal(el.style.width, '200px', 'width is 200px');
          t.equal(el.style.height, '300px', 'height is 300px');
          t.equal(el.style.backgroundColor, 'rgb(0, 255, 255)', 'backgroundColor style was mixed in');

          statesVisited.push(stateName);

          callback(null);
        }
      },
      { 
        go: 'out', states: states, transitions: transitions,
        style: {
          backgroundColor: '#00FFFF'
        },
        onComplete: function(callback, state, stateName) {
          var el = domSelect('[data-f1]');

          t.equal(stateName, 'out', 'stateName is out');
          t.equal(typeof state, 'object', 'state is an object');
          t.equal(el.style.width, '100px', 'width is 100px');
          t.equal(el.style.height, '50px', 'height is 50px');
          t.equal(el.style.backgroundColor, 'rgb(0, 255, 255)', 'backgroundColor style was mixed in');

          statesVisited.push(stateName);

          callback(null);
        }
      }
    ],
    render.bind(render),
    function() {
      t.deepEqual(statesVisited, ['idle', 'out'], 'visited all states');

      t.end();
    }
  );
};


function render(settings, callback) {

  this.container = this.container || document.body.appendChild(document.createElement('div'));
  settings.onComplete = settings.onComplete && settings.onComplete.bind(null, callback);

  var component = <ReactF1
    {...settings}
    style={undefined}
  >
    <div data-f1="item" style={settings.style}>Test</div>
  </ReactF1>;

  // TestUtils.renderIntoDocument(component);
  ReactDom.render(component, this.container);

  if(!settings.onComplete) {
    callback(null);
  }
}