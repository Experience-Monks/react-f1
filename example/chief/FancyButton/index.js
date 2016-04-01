'use strict';

var React = require('react');
var ReactF1 = require('../../../src');
var states = require('./states');
var transitions = require('./transitions');

class FancyButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.state = {
      go: 'out'
    };
  }

  handleMouseOver() {
    if(this.state.go === 'idle') {
      this.setState({
        go: 'over',
        onComplete: null
      });
    }
  }

  handleMouseOut() {
    if(this.state.go === 'over') {
      this.setState({
        go: 'idle',
        onComplete: null
      });
    }
  }

  updateStateFromProps(props) {
    if(this.state.go !== props.go) {
      this.setState({
        go: props.go,
        onComplete: props.onComplete
      });
    }
  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps)
  }

  render() {
    var style = Object.assign(
      {},
      this.props.style,
      {
        width: this.props.width,
        height: this.props.height
      }
    );

    return <ReactF1
      go={this.state.go}
      onComplete={this.state.onComplete}
      states={states(this.props)}
      transitions={transitions}
      onMouseOver={this.handleMouseOver}
      onMouseOut={this.handleMouseOut}
      onClick={this.props.onClick}
      style={style}
    >
      <div 
        data-f1="container"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: this.props.width,
          height: this.props.height
        }}
      >
        <div 
          data-f1="bg1" 
          style={{
            backgroundColor: '#F00',
            width: this.props.width,
            height: this.props.height,
            position: 'absolute',
            left: 0,
            top: 0
          }}
        />
        <div 
          data-f1="bg2" 
          style={{
            backgroundColor: '#00F',
            width: this.props.width,
            height: this.props.height,
            position: 'absolute',
            left: 0,
            top: 0
          }}
        />
      </div>
    </ReactF1>;   
  }
}

FancyButton.defaultProps = {
  width: 200,
  height: 50,
  onSelect: function() {}
};

module.exports = FancyButton;