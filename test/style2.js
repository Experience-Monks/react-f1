var React = require('react');
var ReactDom = require('react-dom');
var ReactF1 = require('./..');

var states = {
  out: {
    item: {
      style: {
        position: 'absolute',
        left: 0,
        custom: 10
      }
    }
  },

  idle: {
    item: {
      style: {
        position: 'absolute',
        left: 100,
        custom: 100
      }
    }
  }
};

var transitions = [
  { from: 'out', to: 'idle', animation: { duration: 3 } }
];

var parsers = {
  update: [
    function(target, data) {

      if(data.style && data.style.custom !== undefined) {
        if(target.style === undefined) {
          target.style = {};
        }

        target.style.top = data.style.custom;
      }
    }
  ]
};

var container = document.createElement('div');
document.body.appendChild(container);


ReactDom.render(<ReactF1 
  state="out" 
  states={states} 
  transitions={transitions}
  parsers={parsers}
  onF1={function(ui) {
    ui.go('idle');
  }}
>
  <div f1-target="item" style={{background: '#CAFE00'}}>HELLO</div>
</ReactF1>, container);