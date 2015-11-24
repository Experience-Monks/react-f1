var React = require('react');
var f1Chief = require('f1/chief');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'f1-target';

class Chief extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {};
    this.chiefTargets = {};
  }

  componentWillMount() {

    var chief = f1Chief({
      transitions: this.props.transitions,
      states: this.props.states,
      onUpdate: this.handleUpdate
    });

    this.setState({
      chief: chief
    });
  }

  handleUpdate(state) {
    this.setState({
      chiefState: state
    });
  }

  componentDidMount() {
    this.state.chief.targets(this.chiefTargets);

    this.setState({
      chief: this.state.chief
    });

    this.state.chief.init(this.props.state);
  }

  componentWillReceiveProps(nextProps) {

    this.state.chief.go(nextProps.state, nextProps.onComplete);  
  }

  getChildrenWithTargetName(chiefState) {
    return React.Children.map(this.props.children, function(child) {

      var f1Target = child.props[ TARGET_PROP_NAME ];
      var childProps = merge(
        {},
        child.props,
        {
          state: chiefState[ f1Target ]
        }
      );

      if(f1Target) {

        return React.cloneElement(
          child,
          childProps
        );
      } else {
        return child;
      }
    });
  }

  getChildrenFromFunction(chiefState) {
    var state = {};

    for(var i in chiefState) {
      state[ i ] = {
        state: chiefState[ i ]
      };
    }

    return this.props.children(state);
  }

  render() {

    var chiefState = this.state.chiefState;
    var children;

    if(chiefState) {

      if(typeof this.props.children === 'function') {
        children = this.getChildrenFromFunction(chiefState);
      } else {
        children = this.getChildrenWithTargetName(chiefState);
      }
    } else {
      children = this.props.children;
    }

    return <div>
      { children }
    </div>;
  }
};

module.exports = Chief;