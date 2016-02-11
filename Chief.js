'use strict';

var React = require('react');
var f1Chief = require('f1/chief');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'data-f1';

class Chief extends React.Component {

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleTargetInState = this.handleTargetInState.bind(this);
    this.targetNames = [];

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

    this.props.onUpdate(state, this.props.go);
  }

  handleTargetInState(idx, name) {
    if(this.targetsIn) {
      var countComplete;

      this.targetsIn[ idx ] = true;
    
      countComplete = this.targetsIn.reduce(function(count, value) {
        return value ? count + 1 : count;
      }, 0);

      if(this.props.debug) {
        console.log({ 
          chief: this.props.debug, 
          uiComplete: name,
          countComplete: countComplete,
          itemsComplete: this.targetNames.reduce((rVal, name, i) => {
            rVal[ name ] = this.targetsIn[ i ];

            return rVal;
          }, {})
        });  
      }
      
      if(countComplete === this.countTargets) {
        this.props.onComplete(this.props.states[ this.props.go ], this.props.go);
      }
    }
  }

  componentDidMount() {
    this.state.chief.targets(this.chiefTargets);

    this.setState({
      chief: this.state.chief
    });

    this.state.chief.init(this.props.go);
  }

  componentWillReceiveProps(nextProps) {

    var goState = nextProps.go;

    if(
      goState &&
      (this.state.propsState !== goState || this.state.propsOnComplete !== nextProps.onComplete)
    ) {
      this.state.chief.go(goState, nextProps.onComplete);

      // if we're not trying to go to the same same state we should reset counts
      if(this.state.propsState !== goState) {
        this.targetsIn = [];  
      }
  
      this.countTargets = Object.keys(nextProps.states[goState]).length;

      this.setState({
        propsState: goState,
        propsOnComplete: nextProps.onComplete
      })
    }
  }

  getChildrenWithTargetName(chiefState) {
    if(!this.showedDepWarning) {
      this.showedDepWarning = true;
      
      console.warn(
        'Using data-f1 to define targets with chief is deprecated. ' +
        'Pass in a function instead as its child.'
      );
    }

    this.targetHandlers = [];
    this.targetNames = [];

    return React.Children.toArray(this.props.children).map((child, i) => {

      var f1Target = child.props[ TARGET_PROP_NAME ];

      this.targetNames[ i ] = f1Target;

      this.targetHandlers.push(() => {
        this.handleTargetInState(i, f1Target);
      });

      var childProps = merge(
        {},
        child.props,
        {
          go: chiefState[ f1Target ],
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
    this.targetNames = [];
  
    for(var i in chiefState) {
      this.targetNames[ this.targetHandlers.length ] = i;

      this.targetHandlers.push(function(idx, name) {
        this.handleTargetInState(idx, name);
      }.bind(this, this.targetHandlers.length, i));

      state[ i ] = {
        go: chiefState[ i ],
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
  onUpdate: function() {},
  onComplete: function() {}
};

module.exports = Chief;