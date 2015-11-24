var React = require('react');
var ReactDom = require('react-dom');
var UI = require('./UI');
var Chief = require('../Chief');

var container = document.createElement('div');
document.body.appendChild(container);

var states = {
  out: {
    ui1: 'out',
    ui2: 'out'
  },

  idle: {
    ui1: 'idle',
    ui2: 'idle'
  }
};

var transitions = [
  { 
    from: 'out', to: 'idle', animation: {
      ui2: {
        delay: 0.5
      }
    } 
  },
  {
    from: 'idle', to: 'out'
  }
];

render('out', function() {
  console.log('in out');
});

render('idle', function() {
  console.log('in idle');
});

function render(state, onComplete) {

  ReactDom.render(
    <Chief
      state={state}
      states={states}
      transitions={transitions}
      onComplete={onComplete}
    >
      <UI f1-target="ui1">HELLO</UI>
      <UI f1-target="ui2">WORLD</UI>
    </Chief>
  , container);  
}