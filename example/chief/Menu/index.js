'use strict';

var React = require('react');
var ReactF1 = require('../../..');
var Chief = require('../../../Chief');
var states = require('./states');
var transitions = require('./transitions');
var FancyButton = require('../FancyButton');
var SelectIndicator = require('../SelectIndicator');

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
      go={this.state.go}
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
            onClick={this.handleClick.bind(this, 'selected1')}
            style={{
              position: 'relative',
              marginLeft: buttonSize.height
            }}
          />
          <FancyButton
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