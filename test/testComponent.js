var React = require('react');
var ReactDom = require('react-dom');
var f1React = require('./..');
var Parser = require('../Parser');



var UIAnimation = f1React( {
  states: {
    out: {
      bg: {
        position: [ 0, 10, 0 ],
        alpha: 0
      },

      text: {
        position: [ 30, 10, 0 ],
        alpha: 0
      }
    },

    idle: {
      bg: {
        position: [ 0, 0, 0 ],
        alpha: 1
      },

      text: {
        position: [ 0, 0, 0 ],
        alpha: 1
      }
    },

    over: {
      bg: {
        position: [ 0, 0, 0 ],
        alpha: 1
      },

      text: {
        position: [ 10, 0, 0 ],
        alpha: 1
      }
    }
  },

  transitions: [
    { from: 'out', to: 'idle', animation: { 
        duration: 0.5, // overall ui will have a duration of 0.5 seconds
        text: {
          delay: 0.3, // text animating will be delayed by 0.3 seconds
          position: {
            1: { delay: 0 }  // however the y property or index 1 of the position array will have a delay of 0
          }
        }
      } 
    },
    { from: 'idle', to: 'out', animation: { duration: 0.5 } },
    { from: 'idle', to: 'over', animation: { duration: 0.1 } },
    { from: 'over', to: 'idle', animation: { duration: 0.1 } }
  ]
});



class UI extends React.Component {

  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.state = {
      uiState: 'out'
    };
  }

  componentDidMount() {
    this.setState({
      uiState: 'idle'
    }); 
  }

  handleMouseOver() {
    this.setState({
      uiState: 'over'
    });
  }

  handleMouseOut() {
    this.setState({
      uiState: 'idle'
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
      width: styleButton.width,
      height: styleButton.height,
      background: '#00CAFE'
    };

    var styleText = {
      fontSize: 20,
      paddingTop: (styleButton.height - 20) * 0.5,
      width: styleButton.width,
      textAlign: 'center'
    };

    return <UIAnimation 
      state={this.state.uiState} 
      onMouseOver={this.handleMouseOver} 
      onMouseOut={this.handleMouseOut}
      style={styleButton}
    >
      <Parser f1-target={['bg', 'text']}>
        <div f1-target='bg' style={styleBG}></div>
        <div f1-target='text' style={styleText}>{this.props.children}</div>
      </Parser>
    </UIAnimation>
  }
}



var container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <div>
    <UI>Hello</UI>
    <UI>World</UI>
  </div>, 
  container
);
