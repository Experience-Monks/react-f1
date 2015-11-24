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

render('out');
render('idle');

function render(state) {
  ReactDom.render(<ReactF1 
    state={state}
    states={states} 
    transitions={transitions}
  >
    {
      (state) => {
        return <div>
          <div {...state.item}>HELLO</div>
        </div>;
      }
    }
  </ReactF1>, container);
}

