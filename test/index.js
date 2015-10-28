var React = require('react');
var ReactDom = require('react-dom');
var f1React = require('./..');

var definition = {
  state: 'out',

  states: {
    out: {
      bg: {
        alpha: 0,
        scale: [ 0.5, 0.5 ],
        rotation: [ Math.PI * 0.3, 0, 0 ],
        anchor: [ 0.5, 0.5 ],
        backgroundColor: [ 255, 0, 0 ],
        position: [ 10, 0 ]
      },

      fg: {
        alpha: 0.1,
        color: [ 255, 0, 255 ],
        position: [ 40, 0 ]
      }
    },

    idle: {
      bg: {
        alpha: 1,
        scale: [ 1, 1 ],
        rotation: [ 0, 0, 0 ],
        anchor: [ 0.5, 0.5 ],
        backgroundColor: [ 255, 255, 0 ],
        position: [ 0, 0 ]
      },

      fg: {
        alpha: 1,
        color: [ 0, 0, 0 ],
        position: [ 0, 0 ]
      }
    }
  },

  transitions: [
    { from: 'out', to: 'idle', animation: { duration: 0.5 } },
    { from: 'idle', to: 'out', animation: { duration: 0.1 } }
  ]
};

var UI = f1React(definition);
var state = 'idle';
var f1;

var container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <UI 
    onF1={function(f1Inst) { 
      f1 = f1Inst; 
      f1.go('idle'); 
    }}

    onClick={function() {

      if(state === 'idle') {
        state = 'out';
      } else {
        state = 'idle';
      }

      f1.go(state);
    }}
  >
    <div style={{ width: 100, height: 50, background: '#333' }} f1-target="bg"></div>
    <div style={{ width: 100, height: 50 }} f1-target="fg">HELLO WORLD</div>
  </UI>, 
  container
);