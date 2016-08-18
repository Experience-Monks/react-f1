'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    try{
      var stateName = Object.keys(states)[0];
    }
    catch(err){
      throw new Error("States not defined or invalid in a Chief parent element.")
    }
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

  cleanProps(props) {
    delete props.go;
    delete props.transitions;
    delete props.states;
    delete props.onComplete;
    delete props.onUpdate;
    return props;
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

    var props = _extends({}, this.props);

    return React.createElement(
      'div',
      this.cleanProps(props),
      children
    );
  }
};

Chief.defaultProps = {
  onUpdate: function () {}, // this.props.onUpdate(state, this.props.go);
  onComplete: function () {}
};

module.exports = Chief;