const React = require('react');
const f1 = require('f1');
const init = require('./init');
const update = require('./update');

module.exports = function(definition) {

  class F1React extends React.Component {

    constructor(props) {
      super(props);

      this.f1Styles = {};
    }

    componentWillMount() {
      let targets = React.Children.toArray(this.props.children)
      .reduce((targets, child) => {
        if(child.props[ 'f1-target' ]) {
          targets[ child.props[ 'f1-target' ] ] = child.props[ 'f1-target' ]
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
        // let style = Object.assign(
        //   {},
        //   child.props.style,
        //   this.f1Styles[ child.props[ 'f1-target' ] ]
        // );

        // return React.cloneElement(
        //   child,
        //   {
        //     style: style
        //   }
        // );
        

        var style = Object.assign(
          {},
          child.props.style,
          this.f1Styles[ child.props[ 'f1-target' ] ]
        );

        return React.cloneElement(
          child,
          {
            style: style
          }
        );
      });

      return <div {...this.props}>
        { children }
      </div>;
    }
  }

  F1React.defaultProps = definition;

  return F1React;
};