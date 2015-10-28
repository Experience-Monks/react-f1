var React = require('react');
var f1 = require('f1');
var init = require('./init');
var update = require('./update');

class F1React extends React.Component {

  constructor(props) {
    super(props);

    this.f1Styles = {};
  }

  componentWillMount() {
    let targets = React.Children.toArray(this.props.children)
    .reduce((targets, child) => {
      if(child.props.target) {
        targets[ child.props.target ] = child.props.target
      }

      return targets;
    }, {});
    let ui = f1({
      states: this.props.states,
      transitions: this.props.transitions,
      targets: targets,
      parsers: {
        init: init.map((func) => { return func.bind(this); }),
        update: update.map((func) => { return func.bind(this); })
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

  render() {

    let children = React.Children.map(this.props.children, (child) => {
      var style = Object.assign(
        {},
        child.props.style,
        this.f1Styles[ child.props.target ]
      );

      return React.cloneElement(
        child,
        {
          style: style
        }
      );
    });

    return <div>
      { children }
    </div>;
  }
}

module.exports = F1React;