var React = require('react');
var f1Marshal = require('f1/Marshal');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'f1-target';

class Marshal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.marshalTargets = {};
  }

  componentWillMount() {

    var marshal = f1Marshal({
      transitions: this.props.transitions,
      states: this.props.states
    });

    var children = React.Children.map(this.props.children, (child) => {

      if(child.props[ TARGET_PROP_NAME ]) {
        return React.cloneElement(
          child,
          {
            onF1: this.handleChildRef.bind(this, child.props[ TARGET_PROP_NAME ])
          }
        );  
      } else {
        return child;
      }
    });

    this.setState({
      marshal: marshal,
      children: children
    });
  }

  handleChildRef(f1Target, f1) {

    this.marshalTargets[ f1Target ] = f1;
  }

  componentDidMount() {
    this.state.marshal.targets(this.marshalTargets);

    this.setState({
      marshal: this.state.marshal
    });

    this.state.marshal.init(this.props.state);
  }

  componentWillReceiveProps(nextProps) {

    this.state.marshal.go(nextProps.state, nextProps.onComplete);  
  }

  render() {
    return <div>
      { this.state.children }
    </div>
  }
};

module.exports = Marshal;