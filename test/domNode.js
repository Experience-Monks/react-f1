var React = require('react');
var ReactDom = require('react-dom');
var ReactF1 = require('./..');

var container = document.createElement('div');
document.body.appendChild(container);

render('out');
render('idle');

function render(state) {
  state = state || 'idle';

  var events = {
    onState: function() {
      // console.log('state', arguments);
    },

    onUpdate: function() {
      // console.log('update', arguments);
    }
  };

  ReactDom.render(
    <ReactF1
      state={state}
      states={{
        out: {
          item1: {
            style: {
              position: 'absolute',
              top: 0,
              translate: [ 100, 0, 0 ],
              scale: [ 0.5, 0.5 ],
              color: [ 0, 0, 0 ]
            }
          }
        },

        idle: {
          item1: {
            style: {
              position: 'absolute',
              top: 100,
              translate: [ 0, 0, 0 ],
              scale: [ 1, 1 ],
              color: [ 255, 0, 0 ]
            }
          }
        }
      }}
      transitions={[
        { from: 'out', to: 'idle', bi: true }
      ]}
      {...events}
    >
      <div data-f1="item1">something</div>
    </ReactF1>,
    container
  );
}
