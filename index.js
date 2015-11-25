const React = require('react');
const f1 = require('f1');
const init = require('./lib/init');
const update = require('./lib/update');
const merge = require('deep-extend');
const arrayUnion = require('array-union');

const TARGET_PROP_NAME = 'f1-target';

class F1React extends React.Component {

  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {};
  }

  // in component will mount we'll need to create an f1 instance
  // create an object which will contain properties which will be passed
  // to children
  componentWillMount() {
    this.initWithProps(this.props);
  }

  // we'll need to update f1 based on the state we should go to
  // we'll also pass a callback function which will be called when 
  // f1 is done doing it's thing
  componentWillReceiveProps(nextProps) {

    if(!this.state.isF1Initialized) {
      this.initWithProps(nextProps);
    } else {
      if(nextProps.state) {
        this.state.ui.go(nextProps.state, nextProps.onComplete);  
      }
        
      // this is not nice calling update here
      // but theres no nice way to know if states coming
      // in are new
      this.state.ui.update();
    }
  }

  componentWillUnmount() {

    // if the f1 ui instance exists we want to destroy it before its unmounted
    if(this.state.ui) {
      this.state.ui.destroy();
    }
  }

  checkWeCanInit(props) {

    if(!props.states) {
      console.warn('you should pass in states to react-f1');
    } else if(!props.transitions) {
      console.warn('you should pass in transitions to react-f1');
    } else if(!props.state) {
      console.warn('you should pass in a state to react-f1');
    } else {
      return true;
    }

    return false;
  }

  initWithProps(props) {
    let targets;

    if(this.checkWeCanInit(props)) {
      if(typeof props.children === 'function') {
        targets = this.getTargetsFromStates(props);
      } else if(React.Children.count(props.children) > 0) {
        targets = this.getTargetsFromTargetNames(props);
      } else {
        throw new Error('react-f1 components must contain children');
      }

      // the update function will be called whenever f1 updates
      // one of the ui elements which in turn will call setState
      // it would be nice to call setState only once for when all ui
      // have been updated but it's ok for now
      let update = () => {
        this.setState({
          targets: targets
        });
      };

      // create parsers we'll mainly need one parser which will be able to simple
      // move the calculated state to the target object
      let parsers = {
        init: [],
        update: [
          (target, state) => {

            for(var i in state) {
              target[ i ] = state[ i ];

              update();
            }
          }
        ]
      };

      // now we want to add parser functions if any are defined
      // these parser functions which are passed should be scoped to 
      // the scope of this component also the update function which will
      // update the state of the application should be called immediately
      // after
      if(props.parsers) {
        if(props.parsers.init) {
          let inits = props.parsers.init.map((parser) => {
            return (target, state) => {
              parser.call(this, target, state);

              update();
            };
          });

          parsers.init = parsers.init.concat(inits);
        }

        if(props.parsers.update) {
          let updates = props.parsers.update.map((parser) => {
            return (target, state) => {
              parser.call(this, target, state);

              update();
            };
          });

          parsers.update = parsers.update.concat(updates);
        }
      }

      // create the f1 instance
      let ui = f1({
        states: props.states,
        transitions: props.transitions,
        targets: targets,
        parsers: parsers
      });

      ui.on('state', this.handleState);
      ui.on('update', this.handleUpdate);

      this.setState({
        ui: ui
      }, function() {
        this.initF1(props);  
      });
    }
  }

  initF1(props) {
    if(props.state) {
      this.state.ui.init(props.state);

      this.setState({
        isF1Initialized: true
      });
    }
  }

  getTargetsFromStates(props) {
    let targets = {};
    let states = props.states;
    let keys = [];

    for(var state in states) {
      keys.push(Object.keys(states[ state ]));
    }

    arrayUnion.apply(undefined, keys).forEach(function(ui) {
      targets[ ui ] = {};
    });

    return targets;
  }

  getTargetsFromTargetNames(props) {
    return React.Children.toArray(props.children)
    .reduce((targets, child) => {

      let target = child.props[ TARGET_PROP_NAME ];

      // if this is a target we should effect
      if(target) {

        // if the target is a string we can just create one object
        if(typeof target === 'string') {
          targets[ child.props[ TARGET_PROP_NAME ] ] = {};

        // if the target is an array we'll need to create many objects
        } else if(Array.isArray(target)) {

          // settup target props for all
          target.forEach(function(targetName) {

            targets[ targetName ] = {};
          });
        }
      }

      return targets;
    }, {});
  }

  // this function will be called each time f1 enters a state
  handleState() {
    if(this.props.onState) {
      this.props.onState.apply(undefined, arguments);
    }
  }

  // this function will be called each time f1 simply updates going between states
  handleUpdate() {
    if(this.props.onUpdate) {
      this.props.onUpdate.apply(undefined, arguments);
    }
  }

  getChildrenWithTargetName() {
    return React.Children.map(this.props.children, (child) => {
      let targetName = child.props[ TARGET_PROP_NAME ];
      let targets;

      // if this child has a target name then we should handle it and
      // if we have calculated targets otherwise we'll just return the child
      // as is
      if(targetName && this.state.targets) {
        // we'll check if this targetName is a string if so we can simply just get the
        // object which is the currently calculated target properties
        if(typeof targetName === 'string') {

          // we'll get the caculated states/props for this component and we'll need
          // to merge in baseStates
          targets = merge(
            {},
            this.props.baseStates && this.props.baseStates[ TARGET_PROP_NAME ],
            this.state.targets[ child.props[ TARGET_PROP_NAME ] ]
          );

          // add in states and targets from the parent
          // so the dom element can be reactive to them if needed
          targets.states = this.props.states;
          targets.transitions = this.props.transitions;

          // we'll return a child component with the new target properties
          return React.cloneElement(
            child,
            merge(
              {},
              child.props,
              targets  
            )
          );
        // if targetName is an array this child component will be handling many targets
        // therefore we need to create an object that contains all target properties
        } else if(Array.isArray(targetName)) {

          targets = {};

          targetName.forEach((name) => {
            targets[ name ] = this.state.targets[ name ];  
          });      

          // add in states and targets from the parent
          // so the dom element can be reactive to them if needed
          targets.states = this.props.states;
          targets.transitions = this.props.transitions;

          // we'll return a child component with the new target properties
          return React.cloneElement(
            child,
            targets
          );      
        } else {
          throw new Error(TARGET_PROP_NAME + ' cannot be of type ' + (typeof targetName));
        }
      } else {
        return child;
      }
    });
  }

  getChildrenFromFunction() {
    if(this.state.targets) {
      let states = merge(
        this.props.baseStates,
        this.state.targets  
      );

      return this.props.children(states);  
    } else {
      return [];
    }
  }

  render() {
    // we'll want to loop through all children and pass the calculated target porperties
    // to the child
    let children;

    // if f1 is initialized then we'll render children otherwise render nothing
    if(this.state.isF1Initialized) {
      if(typeof this.props.children === 'function') {
        children = this.getChildrenFromFunction();
      } else if(React.Children.count(this.props.children) > 0) {
        children = this.getChildrenWithTargetName();
      }
    }
    
    return <div {...this.props}>
      { children }
    </div>;
  }
}

module.exports = F1React;