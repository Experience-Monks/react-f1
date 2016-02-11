'use strict';

var React = require('react');
var ReactF1 = require('../../..');
var Chief = require('../../../Chief');
var states = require('./states');
var transitions = require('./transitions');
var FancyButton = require('../FancyButton');
var SelectIndicator = require('../SelectIndicator');

/****************************************************************************/
/***** You should probably just to the `render` function because that's *****/
/***********************w here all the MAGIC happens ************************/
/****************************************************************************/
class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  updateStateFromProps(props) {

    if(this.state.propsGo !== props.go) {
      this.setState({
        go: props.go,
        propsGo: props.go
      });
    }
  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps);
  }

  handleClick(state) {
    this.setState({
      go: state
    });
  }

  render() {
    return <Chief
      // state which we should animate to
      go={this.state.go}

      // states for Chief define what state all ui should be in
      states={states}

      // transitions can define delays for triggering ui states
      transitions={transitions}
    >
    {
      // with React it's very hard to manipulate deeply nested (grand child) 
      // component's properties. 
      // This is why you need to pass in a function that will accept an Object
      (states) => {

        var buttonSize = {
          width: 200,
          height: 50
        };

        var paddingBetween = 1;

        return <div>
          <SelectIndicator
            // pass in `go` and `onComplete` which are specific to indicator
            {...states.indicator}
            style={{
              position: 'relative'
            }}
          />
          <FancyButton
            // pass in `go` and `onComplete` which are specific to button1
            {...states.button1}
            {...buttonSize}
            onClick={this.handleClick.bind(this, 'selected1')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height
            }}
          />
          <FancyButton
            // pass in `go` and `onComplete` which are specific to button2
            {...states.button2}
            {...buttonSize}
            onClick={this.handleClick.bind(this, 'selected2')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height,
              marginTop: 1
            }}
          />
          <FancyButton
            // pass in `go` and `onComplete` which are specific to button3
            {...states.button3}
            {...buttonSize}
            onClick={this.handleClick.bind(this, 'selected3')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height,
              marginTop: 1
            }}
          />
        </div>
      } 
    }
    </Chief>;
  }
}

module.exports = Menu;