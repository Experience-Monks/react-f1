var React = require('react');
var ReactDom = require('react-dom');
var f1DOM = require('f1-dom');

class ReactF1 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      f1: null,
      f1State: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.state !== this.state.f1State) {
      if(this.state.f1) {
        this.state.f1.go(nextProps.state);

        this.setState({
          f1State: nextProps.state
        });
      }
    }
  }

  componentDidMount() {
    var el = ReactDom.findDOMNode(this);
    var f1 = f1DOM({
      el: el,
      states: this.props.states,
      transitions: this.props.transitions
    })
    .init(this.props.state);

    this.setState({
      f1: f1,
      f1State: this.props.state
    });
  }

  componentWillUnmount() {
    if(this.state.f1) {
      this.state.f1.destroy();
    } 
  }

  render() {
    return <div {...this.props}>
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