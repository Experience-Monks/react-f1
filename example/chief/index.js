'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Chief = require('../../Chief');
var FancyButton = require('../chief/FancyButton');
var SelectIndicator = require('./SelectIndicator');
var states = require('./states');
var transitions = require('./transitions');


// boilerplate since react doesn't allow rendering to body
var container = document.body.appendChild(document.createElement('div'));

// this function will render to the dom the react-f1 ui component
render('out');
render('idle');

function render(state) {
  ReactDom.render(
    <Chief
      go={state}
      states={states}
      transitions={transitions}
    >
    {
      (states) => {
        var buttonSize = {
          width: 200,
          height: 50
        };

        var paddingBetween = 1;

        var handleClick = function(state) {
          render(state);
        };

        return <div>
          <SelectIndicator
            {...states.indicator}
            style={{
              position: 'relative'
            }}
          />
          <FancyButton
            {...states.button1}
            {...buttonSize}
            onClick={handleClick.bind(null, 'selected1')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height
            }}
          />
          <FancyButton
            {...states.button2}
            {...buttonSize}
            onClick={handleClick.bind(null, 'selected2')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height,
              marginTop: 1
            }}
          />
          <FancyButton
            {...states.button3}
            {...buttonSize}
            onClick={handleClick.bind(null, 'selected3')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height,
              marginTop: 1
            }}
          />
        </div>
      } 
    }
    </Chief>,
    container
  );
}