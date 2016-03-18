var React = require('react');
var ReactDom = require('react-dom');
var domSelect = require('dom-select');
var ReactF1 = require('./../src/');
var async = require('async');

var container;

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
        width: 10,
        height: 10
      }
    }
  }
};

var transitions = [
  { from: 'out', to: 'idle', bi: true }
];

module.exports = function(t) {

  // each one of these objects will be applied to the `react-f1` component
  // a callback will be passed to the onComplete function if no onComplete
  // is passed then it is automatically
  async.eachSeries(
    [
      function() { return { go: 'out', states: states, transitions: transitions } },
      function() { 
        return { 
          go: 'idle', states: getState('idle', 400, 333), transitions: transitions,
          onComplete: function(callback, state, stateName) {
            var el = domSelect('[data-f1]');

            t.equal(el.style.width, '400px', 'modified state width was correct');
            t.equal(el.style.height, '333px', 'modified state height was correct');

            callback(null);
          }
        }
      },

      // just to test that out didn't get effected in anyway
      function() {
        return { 
          go: 'out', states: states, transitions: transitions,
          onComplete: function(callback, state, stateName) {
            var el = domSelect('[data-f1]');

            t.equal(el.style.width, '100px', 'unchanged state width is correct');
            t.equal(el.style.height, '50px', 'unchanged state height is correct');

            callback(null);
          }
        };
      },

      // the following is to test setting states when we're already on that state and not animating
      function() {
        return { 
          go: 'out', states: getState('out', 33, 44), transitions: transitions
        };
      }
    ],
    render,
    function() {
      var el = domSelect('[data-f1]');

      t.equal(el.style.width, '33px', 'width correct after set state on static state');
      t.equal(el.style.height, '44px', 'height correct after set state on static state');

      container.parentNode.removeChild(container);

      t.end();
    }
  );
};

function getState(stateName, width, height) {
  Object.assign(
    states[ stateName ].item.style,
    {
      width: width,
      height: height
    }
  );

  return states;
}

function render(settings, callback) {

  settings = settings();

  container = container || document.body.appendChild(document.createElement('div'));
  settings.onComplete = settings.onComplete && settings.onComplete.bind(null, callback);

  var component = <ReactF1
    {...settings}
  >
    <div 
      data-f1="item" 
      style={{
        backgroundColor: '#F00'
      }}
    >Test</div>
  </ReactF1>;

  // TestUtils.renderIntoDocument(component);
  ReactDom.render(component, container);

  if(!settings.onComplete) {
    process.nextTick(function() {
      callback(null);
    });
  }
}