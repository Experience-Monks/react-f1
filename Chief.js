var React = require('react');
var f1Chief = require('f1/chief');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'f1-target';

class Chief extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.chiefTargets = {};
  }

  componentWillMount() {

    var chief = f1Chief({
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
      chief: chief,
      children: children
    });
  }

  handleChildRef(f1Target, f1) {

    this.chiefTargets[ f1Target ] = f1;
  }

  componentDidMount() {
    this.state.chief.targets(this.chiefTargets);

    this.setState({
      chief: this.state.chief
    });

    console.log(this.props.state);
    this.state.chief.init(this.props.state);
  }

  componentWillReceiveProps(nextProps) {

    console.log(nextProps.state);

    this.state.chief.go(nextProps.state, nextProps.onComplete);  
  }

  render() {
    return <div>
      { this.state.children }
    </div>
  }
};

module.exports = Chief;