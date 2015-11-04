const React = require('react');
const f1 = require('f1');
const init = require('./lib/init');
const update = require('./lib/update');
const merge = require('deep-extend');

const TARGET_PROP_NAME = 'f1-target';

class F1React extends React.Component {

  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  // in component will mount we'll need to create an f1 instance
  // create an object which will contain properties which will be passed
  // to children
  componentWillMount() {
    let targetProps = React.Children.toArray(this.props.children)
    .reduce((targetProps, child) => {

      let target = child.props[ TARGET_PROP_NAME ];

      // if this is a target we should effect
      if(target) {

        // if the target is a string we can just create one object
        if(typeof target === 'string') {
          targetProps[ child.props[ TARGET_PROP_NAME ] ] = {};

        // if the target is an array we'll need to create many objects
        } else if(Array.isArray(target)) {

          // settup target props for all
          target.forEach(function(targetName) {

            targetProps[ targetName ] = {};
          });
        }
      }

      return targetProps;
    }, {});

    let update = () => {
      this.setState({
        targetProps: targetProps
      });
    };

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
    if(this.props.parsers) {
      if(this.props.parsers.init) {
        let inits = this.props.parsers.init.map((parser) => {
          return (target, state) => {
            parser.call(this, target, state);

            update();
          };
        });

        parsers.init = parsers.init.concat(inits);
      }

      if(this.props.parsers.update) {
        let updates = this.props.parsers.update.map((parser) => {
          return (target, state) => {
            parser.call(this, target, state);

            update();
          };
        });

        parsers.update = parsers.update.concat(updates);
      }
    }

    let ui = f1({
      states: this.props.states,
      transitions: this.props.transitions,
      targets: targetProps,
      parsers: parsers
    });

    ui.on('state', this.handleState);
    ui.on('update', this.handleUpdate);

    this.setState({
      ui: ui
    });
  }

  // we'll initialize f1 with the current state passed in
  componentDidMount() {
    this.state.ui.init(this.props.state);

    if(this.props.onF1) {
      this.props.onF1(this.state.ui);
    }
  }

  // we'll need to update f1 based on the state we should go to
  // we'll also pass a callback function which will be called when 
  // f1 is done doing it's thing
  componentWillReceiveProps(nextProps) {
    this.state.ui.go(nextProps.state, nextProps.onComplete);

    // this is not nice calling update here
    // but theres no nice way to know if states coming
    // in are new
    this.state.ui.update();
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

  render() {

    // we'll want to loop through all children and pass the calculated target porperties
    // to the child
    let children = React.Children.map(this.props.children, (child) => {
      let targetName = child.props[ TARGET_PROP_NAME ];
      let targetProps;

      // if this child has a target name then we should handle it and
      // if we have calculated targetProps otherwise we'll just return the child
      // as is
      if(targetName && this.state.targetProps) {
        // we'll check if this targetName is a string if so we can simply just get the
        // object which is the currently calculated target properties
        if(typeof targetName === 'string') {

          targetProps = this.state.targetProps[ child.props[ TARGET_PROP_NAME ] ];   

          // add in states and targets from the parent
          // so the dom element can be reactive to them if needed
          targetProps.states = this.props.states;
          targetProps.transitions = this.props.transitions;

          // we'll return a child component with the new target properties
          return React.cloneElement(
            child,
            merge(
              {},
              child.props,
              targetProps  
            )
          );
        // if targetName is an array this child component will be handling many targets
        // therefore we need to create an object that contains all target properties
        } else if(Array.isArray(targetName)) {

          targetProps = {};

          targetName.forEach((name) => {
            targetProps[ name ] = this.state.targetProps[ name ];  
          });      

          // add in states and targets from the parent
          // so the dom element can be reactive to them if needed
          targetProps.states = this.props.states;
          targetProps.transitions = this.props.transitions;

          // we'll return a child component with the new target properties
          return React.cloneElement(
            child,
            targetProps
          );      
        } else {
          throw new Error(TARGET_PROP_NAME + ' cannot be of type ' + (typeof targetName));
        }
      } else {
        return child;
      }
    });

    return <div {...this.props}>
      { children }
    </div>;
  }
}

module.exports = F1React;