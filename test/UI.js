var React = require('react');
var F1React = require('./..');

var definition = {
  states: {
    out: {
      bg: {
        style: {
          translate: [ 0, 10, 0 ],
          opacity: 0
        }
      },

      text: {
        style: {
          translate: [ 30, 10, 0 ],
          opacity: 0
        }
      }
    },

    idle: {
      bg: {
        style: {
          translate: [ 0, 0, 0 ],
          opacity: 1
        }
      },

      text: {
        style: {
          translate: [ 0, 0, 0 ],
          opacity: 1
        }
      }
    },

    over: {
      bg: {
        style: {
          translate: [ 0, 0, 0 ],
          opacity: 1
        }
      },

      text: {
        style: {
          translate: [ 10, 0, 0 ],
          opacity: 1
        }
      }
    }
  },

  transitions: [
    { from: 'out', to: 'idle', animation: { 
        duration: 0.5, // overall ui will have a duration of 0.5 seconds
        text: {
          delay: 0.3, // text animating will be delayed by 0.3 seconds
          translate: {
            1: { delay: 0 }  // however the y property or index 1 of the translate array will have a delay of 0
          }
        }
      } 
    },
    { from: 'idle', to: 'out', animation: { duration: 0.5 } },
    { from: 'idle', to: 'over', animation: { duration: 0.1 } },
    { from: 'over', to: 'idle', animation: { duration: 0.1 } }
  ]
};



class UI extends React.Component {

  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.state = {
      uiState: 'out',
      onComplete: () => {
        this.props.onComplete();
      }
    };
  }

  handleMouseOver() {
    this.setState({
      uiState: 'over',
      onComplete: () => {
        console.log('in over', arguments);

        this.props.onComplete();
      }
    });
  }

  handleMouseOut() {
    this.setState({
      uiState: 'idle',
      onComplete: () => {
        console.log('in idle', arguments);

        this.props.onComplete();
      }
    }); 
  }

  componentDidMount() {
    this.setState({
      uiState: this.props.state
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      uiState: nextProps.state
    });
  }

  render() {
    var styleButton = {
      position: 'relative',
      cursor: 'pointer',
      width: 200,
      height: 40,
      margin: 10
    };

    var styleBG = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: styleButton.width,
      height: styleButton.height,
      background: '#00CAFE'
    };

    var styleText = {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: 20,
      paddingTop: (styleButton.height - 20) * 0.5,
      width: styleButton.width,
      textAlign: 'center'
    };
  
    return <F1React 
      {...definition}
      onF1={this.props.onF1}
      go={this.state.uiState} 
      onComplete={this.state.onComplete}
      onMouseOver={this.handleMouseOver} 
      onMouseOut={this.handleMouseOut}
      style={styleButton}
    >
      <div data-f1='bg' style={styleBG}></div>
      <div data-f1='text' style={styleText}>{this.props.children}</div>
    </F1React>
  }
}

UI.defaultProps = {
  onComplete: function() {}
};

module.exports = UI;