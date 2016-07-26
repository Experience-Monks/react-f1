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
    this.f1States = null;

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
    if(this.hasMounted && !this.f1 && props.go && props.states && props.transitions) {

      this.f1States = merge({}, props.states);

      var el = ReactDom.findDOMNode(this);
      var f1 = this.f1 = f1DOM({
        el: el,
        states: this.f1States,
        transitions: props.transitions,
        targets: props.targets,
        parsers: props.parsers
      });

      f1.on('state', this.handleState.bind(this));
      f1.on('update', this.handleUpdate.bind(this));
      this.updateListenersFromProps(props);

      f1.init(props.go);
    }
  }

  updateFromProps(props) {
    var states;

    if(this.f1) {
      // if we've received new states then just mege into current states
    if (props.states) {
        merge(this.f1States, props.states);
      }

      // if we've received targets then reset them
      if(props.targets) {
        this.f1.targets(props.targets);
      }

      // call update to ensure everything looks right and is in its calculated state
      if(props.states || props.targets) {
      this.f1.update();
    }

    if (props.go) {
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

  cleanProps(props) {
    delete props.go;
    delete props.transitions;
    delete props.states;
    delete props.onComplete;
    delete props.onUpdate;
    return props;
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

    var props = _extends({}, this.props, {
      style: style
    });

    return React.createElement(
      'div',
      this.cleanProps(props),
      this.props.children
    );
  }
}

module.exports = ReactF1;