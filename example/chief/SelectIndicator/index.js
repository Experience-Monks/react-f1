'use strict';

var React = require('react');
var ReactF1 = require('../../../src/');
var states = require('./states');
var transitions = require('./transitions');

class SelectIndicator extends React.Component {
  render() {
    return <ReactF1
      {...this.props}
      go={this.props.go}
      onComplete={this.props.onComplete}
      states={states(this.props)}
      transitions={transitions}
    >
      <div
        data-f1="indicator"
      />
    </ReactF1>
  }
}

SelectIndicator.defaultProps = {
  width: 20,
  height: 50,
  marginTop: 1
};

module.exports = SelectIndicator;