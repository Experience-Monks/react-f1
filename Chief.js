var React = require('react');
var f1Chief = require('f1/chief');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'data-f1';

class Chief extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.targetHandlers = [];
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

  componentWillUnMount() {
    if(this.state.chief) {
      this.state.chief.destroy();
    }
  }

  handleUpdate(state) {
    this.setState({
      chiefState: state
    });  
  }

  handleTargetInState(idx) {
    
    var countIn;

    this.targetsIn[ idx ] = true;

    countIn = this.targetsIn.reduce(function(count, value) {
      return value ? count + 1 : count;
    }, 0);

    if(countIn === this.countTargets) {
      this.props.onComplete(this.props.state);
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

    if(
      nextProps.state &&
      (this.state.propsState !== nextProps.state || this.state.propsOnComplete !== nextProps.onComplete)
    ) {
      this.state.chief.go(nextProps.state, nextProps.onComplete);

      this.targetsIn = []
      this.countTargets = Object.keys(nextProps.states[nextProps.state]).length;

      this.setState({
        propsState: nextProps.state,
        propsOnComplete: nextProps.onComplete
      })
    }
  }

  getChildrenWithTargetName(chiefState) {
    return React.Children.map(this.props.children, (child, i) => {

      this.targetHandlers.push(() => {
        this.handleTargetInState(i);
      });

      var f1Target = child.props[ TARGET_PROP_NAME ];
      var childProps = merge(
        {},
        child.props,
        {
          state: chiefState[ f1Target ],
          onComplete: this.targetHandlers[ i ]
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
      this.targetHandlers.push(function(idx) {
        this.handleTargetInState(idx);
      }.bind(this, this.targetHandlers.length));

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