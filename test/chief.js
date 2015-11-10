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
        delay: 3
      }
    } 
  }
];

ReactDom.render(
  <Chief
    state="out"
    states={states}
    transitions={transitions}
  >
    <UI f1-target="ui1">HELLO</UI>
    <UI f1-target="ui2">WORLD</UI>
  </Chief>
, container);

window.onclick = function() {
  ReactDom.render(
    <Chief
      state="idle"
      onComplete={function() {
        console.log('in idle');
      }}
      states={states}
      transitions={transitions}
    >
      <UI f1-target="ui1">HELLO</UI>
      <UI f1-target="ui2">WORLD</UI>
    </Chief>
  , container);
};