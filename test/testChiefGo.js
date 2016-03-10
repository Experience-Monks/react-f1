var React = require('react');
var ReactDom = require('react-dom');
var domSelect = require('dom-select');
var Chief = require('../Chief');
var UI = require('./UI');
var async = require('async');

var states = {
  out: {
    item1: 'out',
    item2: 'out'
  },

  idle: {
    item1: 'idle',
    item2: 'idle'
  },

  idle2: {
    item1: 'idle',
    item2: 'out'
  }
};

var transitions = [
  { 
    from: 'out', to: 'idle', bi: true, animation: {
      item1: {
        delay: 0.5
      }
    }
  },
  {
    from: 'idle', to: 'idle2', bi: true
  }
];

module.exports = function(t) {

  var statesVisited = [];
  var updateItem1WasDelayed = false;
  var updateItemsWereInSameState = false;
  
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
        onUpdate: function(state, stateName) {
          updateItem1WasDelayed = updateItem1WasDelayed || (state.item1 === 'out' && state.item2 === 'idle');
          updateItemsWereInSameState = state.item1 === 'idle' && state.item2 === 'idle';
        },
        onComplete: function(callback, state, stateName) {

          t.deepEqual(stateName, 'idle', 'idle: state name was correct');
          t.deepEqual(state, states.idle, 'idle: state was correct for complete');
          statesVisited.push(stateName);

          callback(null);
        }
      },
      {
        go: 'idle2', states: states, transitions: transitions,
        style: {
          backgroundColor: '#00FFFF'
        },
        onComplete: function(callback, state, stateName) {

          t.deepEqual(stateName, 'idle2', 'idle2: state name was correct');
          t.deepEqual(state, states.idle2, 'idle2: state was correct for complete');
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
          
          t.deepEqual(stateName, 'out', 'out: state name was correct');
          t.deepEqual(state, states.out, 'out: state was correct for complete');
          statesVisited.push(stateName);

          callback(null);
        }
      }
    ],
    render,
    function() {
      t.deepEqual(statesVisited, ['idle', 'idle2', 'out'], 'visited all states');
      t.ok(updateItem1WasDelayed, 'item 1 was delayed from item 2');
      t.ok(updateItemsWereInSameState, 'final call to update had item1 and item2 in idle');

      t.end();
    }
  );
};


function render(settings, callback) {

  this.container = this.container || document.body.appendChild(document.createElement('div'));
  settings.onComplete = settings.onComplete && settings.onComplete.bind(null, callback);

  var component = <Chief
    {...settings}
    style={undefined}
  >
    {
      (states) => {
        return <div>
          <UI {...states.item1} />
          <UI {...states.item2} />
        </div>;
      }
    }
  </Chief>;

  // TestUtils.renderIntoDocument(component);
  ReactDom.render(component, this.container);

  if(!settings.onComplete) {
    callback(null);
  }
}