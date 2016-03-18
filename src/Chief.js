'use strict';

var React = require('react');
var f1Chief = require('f1/chief');
var merge = require('deep-extend');
var chiefBridge = function (target, onUpdate) {

  target.state = null;
  target.onComplete = null;

  return {
    isInitialized: false,

    init: function (state) {
      this.isInitialized = true;
      target.go = state;
      onUpdate();
    },

    go: function (state, onComplete) {
      target.go = state;
      target.onComplete = onComplete;
      onUpdate();
    }
  };
};

class Chief extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);

    this.chief = null;
    this.chiefStates = null;
    this.state = {};
  }

  componentWillMount() {
    this.chief = f1Chief({
      transitions: this.props.transitions,
      states: this.props.states,
      targets: this.getTargetsFromStates(this.props.states),
      onUpdate: function () {
        this.props.onUpdate.apply(undefined, arguments);
      }.bind(this)
    });
  }

  componentWillUnMount() {
    if (this.chief) {
      this.chief.destroy();
    }
  }

  componentDidMount() {
    this.chief.init(this.props.go);
  }

  componentWillReceiveProps(nextProps) {

    var goState = nextProps.go;

    if (goState && (this.state.propsState !== goState || this.state.propsOnComplete !== nextProps.onComplete)) {
      this.chief.go(goState, nextProps.onComplete);

      this.setState({
        propsState: goState,
        propsOnComplete: nextProps.onComplete
      });
    }
  }

  handleUpdate() {
    this.setState({
      chiefStates: this.chiefStates
    });
  }

  getTargetsFromStates(states) {
    var stateName = Object.keys(states)[0];
    var targets = {};
    var chiefState;

    this.chiefStates = {};

    for (var targetName in states[stateName]) {
      chiefState = {};
      this.chiefStates[targetName] = chiefState;

      targets[targetName] = chiefBridge(chiefState, this.handleUpdate);
    }

    return targets;
  }

  getChildrenFromFunction(chiefState) {
    return this.props.children(chiefState);
  }

  render() {

    var chiefState = this.state.chiefStates;
    var children;

    if (chiefState) {

      if (typeof this.props.children === 'function') {
        children = this.getChildrenFromFunction(chiefState);
      } else {
        throw new Error('props.children should be a function that accepts chief states');
      }
    } else {
      children = this.props.children;
    }

    return React.createElement(
      'div',
      this.props,
      children
    );
  }
};

Chief.defaultProps = {
  onUpdate: function () {}, // this.props.onUpdate(state, this.props.go);
  onComplete: function () {}
};

module.exports = Chief;