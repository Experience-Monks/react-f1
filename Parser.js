var React = require('react');
var init = require('./lib/init');
var update = require('./lib/update');
var merge = require('deep-extend');

const TARGET_PROP_NAME = 'f1-target';

class Parser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      initStyle: {}
    };
  }

  componentWillMount() {
    var initStyle = {};

    var targets = React.Children.toArray(this.props.children)
    .filter(function(child) {
      return child.props[ TARGET_PROP_NAME ] !== undefined;
    })
    .reduce(function(targets, child) {
      targets[ child.props[ TARGET_PROP_NAME ] ] = child.props[ TARGET_PROP_NAME ];

      return targets;
    }, {});

    init.forEach((func) => {

      func(initStyle, this.props.states, targets, this.props.transitions);
    });

    this.setState({
      initStyle: initStyle
    });
  }

  render() {
    var children = React.Children.map(this.props.children, (child) => {
      var targetName = child.props[ TARGET_PROP_NAME ];
      var targetProps;
      var targetStyle;

      // if this child has a f1 target prop
      if(targetName) {
        targetProps = merge({}, child.props, this.props[ targetName ]);
        targetStyle = merge({}, this.state.initStyle, targetProps.style || {});

        update.forEach(function(func) {
          func(targetStyle, targetProps);
        });

        targetProps.style = targetStyle;

        return React.cloneElement(
          child,
          targetProps
        );
      } else {
        return child;
      }
    });
    
    return <div>
      { children }
    </div>;
  }
}

module.exports = Parser;