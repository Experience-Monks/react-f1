var React = require('react');
var f1Chief = require('f1/chief');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'data-f1';

class Chief extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleTargetInState = this.handleTargetInState.bind(this);

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

  handleTargetInState() {
    this.countTargetsIn++;

    if(this.countTargetsIn === this.countTargets) {
      this.props.onComplete();
    }
  }

  componentDidMount() {
    this.state.chief.targets(this.chiefTargets);

    this.setState({
      chief: this.state.chief
    });

    this.state.chief.init(this.props.state);
  }

  componentWillReceiveProps(nextProps) {

    if(this.state.propsState !== nextProps.state || this.state.propsOnComplete !== nextProps.onComplete) {
      this.state.chief.go(nextProps.state, nextProps.onComplete);

      this.countTargetsIn = 0;
      this.countTargets = Object.keys(nextProps.states[nextProps.state]).length;

      this.setState({
        propsState: nextProps.state,
        propsOnComplete: nextProps.onComplete
      })
    }
  }

  getChildrenWithTargetName(chiefState) {
    return React.Children.map(this.props.children, (child) => {

      var f1Target = child.props[ TARGET_PROP_NAME ];
      var childProps = merge(
        {},
        child.props,
        {
          state: chiefState[ f1Target ],
          onComplete: this.handleTargetInState
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
        state: chiefState[ i ],
        onComplete: this.handleTargetInState
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

    return <div
      {...this.props}
    >
      { children }
    </div>;
  }
};

Chief.defaultProps = {
  onComplete: function() {}
};

module.exports = Chief;