var React = require('react');
var ReactDom = require('react-dom');
var UI = require('./UI');

var container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <div>
    <UI state="idle">Hello</UI>
    <UI state="idle">World</UI>
  </div>, 
  container
);
