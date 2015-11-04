var React = require('react');
var ReactDom = require('react-dom');
var ReactF1 = require('./..');

var states = {
  out: {
    item: {
      style: {
        position: 'absolute',
        left: 0
      }
    }
  },

  idle: {
    item: {
      style: {
        position: 'absolute',
        left: 100
      }
    }
  }
};

var transitions = [
  { from: 'out', to: 'idle' }
];

var container = document.createElement('div');
document.body.appendChild(container);


ReactDom.render(<ReactF1 
  state="out" 
  states={states} 
  transitions={transitions}
  onF1={function(ui) {
    ui.go('idle');
  }}
>
  <div f1-target="item">HELLO</div>
</ReactF1>, container);