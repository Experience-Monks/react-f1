'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Menu = require('./Menu');

// boilerplate since react doesn't allow rendering to body
var container = document.body.appendChild(document.createElement('div'));

// this function will render to the dom the react-f1 ui component
render('out');
render('idle');

function render(state) {
  ReactDom.render(
    <Menu
      go={state}
    />,
    container
  );
}