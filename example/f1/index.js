'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var ExampleButton = require('./ExampleButton');

// boilerplate since react doesn't allow rendering to body
var container = document.body.appendChild(document.createElement('div'));

// this function will render to the dom the react-f1 ui component
render('idle');

function render(state) {
  ReactDom.render(
    <ExampleButton
      // the state which the ExampleButton should be in
      go={state}

      // will be called when we're in the target state
      onComplete={() => {
        console.log('ExampleButton is in', state);
      }}

      // The following is to add mouse events
      // on mouse over go to the over state
      // on mouse out go back to the idle state
      onMouseOver={render.bind(null, 'over')}
      onMouseOut={render.bind(null, 'idle')}
    />,
    container
  );
}