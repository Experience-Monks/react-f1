'use strict';

module.exports = function getStates() {
  return {
    // this is defines the idle state for the button
    idle: {
      // this is what the bg should look like in the idle state
      buttonBG: {
        style: {
          // regular old width, height, and fontSize
          width: 120,
          height: 120,
          fontSize: 14,

          // the following are passed to css transform
          // by recomposing a transformation matrix
          // 
          // translate: [ x, y, z ]
          // rotate: [ x, y, z ]
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, 0 ]
        }
      },

      // this is what the text should look like in the idle state
      buttonText: {
        style: {
          // color's can be represented by arrays that are
          // [ red, green, blue, alpha ]
          color: [0, 0, 0, 1],
          marginTop: 0
        }
      }
    },

    // this is defines the over state for the button
    over: {
      // this is what the bg should look like in the over state
      buttonBG: {
        style: {
          // regular old width and height animation
          width: 220,
          height: 220,
          fontSize: 30,

          // fancy properties
          translate: [ -40, 0, -200 ],
          rotate: [ -20, -45, 0 ]
        }
      },

      // this is what the text should look like in the over state
      buttonText: {
        style: {
          // color's can be represented by arrays that are
          // [ red, green, blue, alpha ]
          color: [255, 255, 255, 0.2],
          marginTop: -40
        }
      }
    }
  };
};