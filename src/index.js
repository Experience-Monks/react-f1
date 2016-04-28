'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDom = require('react-dom');
var f1DOM = require('f1-dom');
var merge = require('deep-extend');

class ReactF1 extends React.Component {

  constructor(props) {
    super(props);

    this.hasMounted = false;
    this.f1 = null;

    this.state = {};
  }

  setupFromProps(props) {
    if (!this.f1) {
      this.initFromProps(props);
    } else {
      this.updateFromProps(props);
    }
  }

  initFromProps(props) {
    if (this.hasMounted && props.go && props.states && props.transitions) {

      var el = ReactDom.findDOMNode(this);
      var f1 = this.f1 = f1DOM({
        el: el,
        states: props.states,
        transitions: props.transitions,
        targets: props.targets,
        parsers: props.parsers
      });

      f1.on('state', this.handleState.bind(this));
      f1.on('update', this.handleUpdate.bind(this));
      this.updateListenersFromProps(props);

      this.setState({
        states: props.states
      });

      f1.init(props.go);
    }
  }

  updateFromProps(props) {
    var states;

    if (props.states) {
      merge(this.state.states, props.states);

      this.setState({
        states: this.state.states
      });
    }

    if(props.targets) {
      this.f1.targets(props.targets);
    }

    if(props.states || props.targets) {
      this.f1.update();
    }

    if (props.go) {
      if (this.f1) {
        this.f1.go(props.go, props.onComplete);
      }
    }

    this.updateListenersFromProps(props);
  }

  updateListenersFromProps(props) {
    this.setState({
      onUpdate: props.onUpdate,
      onState: props.onState
    });
  }

  handleUpdate() {
    if (this.state.onUpdate) {
      this.state.onUpdate.apply(undefined, arguments);
    }
  }

  handleState() {
    if (this.state.onState) {
      this.state.onState.apply(undefined, arguments);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setupFromProps(nextProps);
  }

  componentDidMount() {
    this.hasMounted = true;
    this.setupFromProps(this.props);
  }

  componentWillUnmount() {
    if (this.f1) {
      this.f1.destroy();
    }
  }

  render() {
    var style = merge(
      {
        perspective: '1000px'
      },
      this.props.style
    );

    if (!this.f1) {
      style = merge({}, this.props.style, {
        display: 'none'
      });
    }

    return React.createElement(
      'div',
      _extends({}, this.props, {
        style: style
      }),
      this.props.children
    );
  }
}

function findTargets(children, targets) {
  targets = targets || {};

  React.Children.forEach(children, function (child) {
    if (child.props) {
      var targetName = child.props['f1-target'];

      if (targetName) {
        targets[targetName] = child;
      }

      if (child.props.children) {
        findTargets(child.props.children, targets);
      }
    }
  });

  return targets;
}

module.exports = ReactF1;