const React = require('react');
const f1 = require('f1');
const init = require('./lib/init');
const update = require('./lib/update');

const TARGET_PROP_NAME = 'f1-target';

class F1React extends React.Component {

  constructor(props) {
    super(props);
  }

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

    let ui = f1({
      states: this.props.states,
      transitions: this.props.transitions,
      targets: targetProps,
      parsers: {
        update: [
          (target, state) => {
            for(var i in state) {
              target[ i ] = state[ i ];
            }

            this.setState({
              targetProps: targetProps
            });
          }
        ]
      }
    });

    this.setState({
      ui: ui
    });
  }

  componentDidMount() {
    this.state.ui.init(this.props.state);

    if(this.props.onF1) {
      this.props.onF1(this.state.ui);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.ui.go(nextProps.state);

    // this is not nice calling update here
    // but theres no nice way to know if states coming
    // in are new
    this.state.ui.update();
  }

  render() {

    let children = React.Children.map(this.props.children, (child) => {
      let targetName = child.props[ TARGET_PROP_NAME ];
      let targetProps;

      if(targetName && this.state.targetProps) {

        if(typeof targetName === 'string') {

          targetProps = this.state.targetProps[ child.props[ TARGET_PROP_NAME ] ];   
        } else if(Array.isArray(targetName)) {

          targetProps = {};

          targetName.forEach((name) => {
            targetProps[ name ] = this.state.targetProps[ name ];  
          });            
        }

        // add in states and targets from the parent
        // so the dom element can be reactive to them if needed
        targetProps.states = this.props.states;
        targetProps.transitions = this.props.transitions;

        return React.cloneElement(
          child,
          targetProps
        );
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