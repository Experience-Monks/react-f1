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


render('out');
render('idle');

function render(state, onComplete) {

  ReactDom.render(
    <Chief
      state={state}
      states={states}
      transitions={transitions}
      onComplete={onComplete}
    >
      {
        function(state) {
          return <div>
            <UI {...state.ui1}>HELLO</UI>
            <UI {...state.ui2}>WORLD</UI>
          </div>;
        }
      }
    </Chief>
  , container);  
}