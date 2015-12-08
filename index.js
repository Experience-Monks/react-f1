var React = require('react');
var ReactDom = require('react-dom');
var f1DOM = require('f1-dom');
var merge = require('deep-extend');

class ReactF1 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      f1: null,
      f1State: null
    };
  }

  setupListenersFromProps(props) {
    this.setState({
      onUpdate: props.onUpdate,
      onState: props.onState
    });
  }

  handleUpdate() {
    if(this.state.onUpdate) {
      this.state.onUpdate.apply(undefined, arguments);
    }
  }

  handleState() {
    if(this.state.onState) {
      this.state.onState.apply(undefined, arguments);
    }
  }

  componentWillReceiveProps(nextProps) {
    var states;

    if(nextProps.states) {

      merge(
        this.state.states,
        nextProps.states
      );

      this.setState({
        states: this.state.states
      });

      // force an update to f1 since we received new props
      if(this.state.f1) {
        this.state.f1.update();
      } 
    }

    if(nextProps.state !== this.state.f1State) {
      if(this.state.f1) {
        this.state.f1.go(nextProps.state, nextProps.onComplete);

        this.setState({
          f1State: nextProps.state
        });
      }
    }

    this.setupListenersFromProps(nextProps);
  }

  componentDidMount() {
    var el = ReactDom.findDOMNode(this);
    var f1 = f1DOM({
      el: el,
      states: this.props.states,
      transitions: this.props.transitions
    });

    f1.on('state', this.handleState.bind(this));
    f1.on('update', this.handleUpdate.bind(this));
    this.setupListenersFromProps(this.props);

    this.setState({
      f1: f1,
      f1State: this.props.state,
      states: this.props.states
    });

    f1.init(this.props.state);
  }

  componentWillUnmount() {
    if(this.state.f1) {
      this.state.f1.destroy();
    } 
  }

  render() {
    var style = this.props.style;

    if(!this.state.f1) {
      style = merge(
        {},
        this.props.style,
        {
          display: 'none'
        }
      );  
    }
    
    return <div 
      {...this.props}
      style={style}
    >
      { this.props.children }
    </div>;
  }
}

function findTargets(children, targets) {
  targets = targets || {};

  React.Children.forEach(children, function(child) {
    if(child.props) {
      var targetName = child.props['f1-target'];

      if(targetName) {
        targets[ targetName ] = child;
      }

      if(child.props.children) {
        findTargets(child.props.children, targets);
      }
    }
  });

  return targets;
}

module.exports = ReactF1;