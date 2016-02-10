'use strict';

var React = require('react');
var ReactF1 = require('./..');

var states = {
  out: {
    item: {
      style: {
        width: 100,
        height: 100
      }
    }
  },

  idle: {
    item: {
      style: {
        width: 200,
        height: 100
      }
    }
  },

  over: {
    item: {
      style: {
        width: 300,
        height: 100
      }
    }    
  }
};

var transitions = [
  { from: 'out', to: 'idle', bi: true },
  { from: 'idle', to: 'over', bi: true }
];

class UI extends React.Component {
  render() {
    return <ReactF1
      {...this.props}
      states={states}
      transitions={transitions}
    >
      <div 
        data-f1="item"
        style={{
          backgroundColor: '#00FF00'
        }}
      >SNAKES</div>
    </ReactF1>;
  }
}

module.exports = UI;