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

  handleTargetInState(idx, name) {
    
    var countIn;

    this.targetsIn[ idx ] = true;
  
    countIn = this.targetsIn.reduce(function(count, value) {
      return value ? count + 1 : count;
    }, 0);

    if(this.props.debug) {
      console.log({ chief: this.props.debug, uiComplete: name, countInState: countIn, countTargets: this.countTargets});  
    }
    
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

      // if we're not trying to go to the same same state we should reset counts
      if(this.state.propsState !== nextProps.state) {
        this.targetsIn = [];  
      }
  
      this.countTargets = Object.keys(nextProps.states[nextProps.state]).length;

      this.setState({
        propsState: nextProps.state,
        propsOnComplete: nextProps.onComplete
      })
    }
  }

  getChildrenWithTargetName(chiefState) {
    this.targetHandlers = [];

    return React.Children.toArray(this.props.children).map((child, i) => {

      var f1Target = child.props[ TARGET_PROP_NAME ];

      this.targetHandlers.push(() => {
        this.handleTargetInState(i, f1Target);
      });

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
    this.targetHandlers = [];
  
    for(var i in chiefState) {
      this.targetHandlers.push(function(idx, name) {
        this.handleTargetInState(idx, name);
      }.bind(this, this.targetHandlers.length, i));

      state[ i ] = {
        state: chiefState[ i ],
        onComplete: this.targetHandlers[ this.targetHandlers.length - 1 ]
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