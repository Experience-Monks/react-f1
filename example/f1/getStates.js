'use strict';

module.exports = function getStates() {
  return {
    // this is defines the idle state for the button
    idle: {
      exampleButton: {
        style: {
          // regular old width, height, and fontSize
          width: 100,
          height: 100,
          fontSize: 14,

          // the following are special properties
          // 
          // color's can be represented by arrays that are
          // [ red, green, blue, alpha ]
          color: [ 0, 0, 0 ],

          // the following are passed to css transform
          // by recomposing a transformation matrix
          // 
          // translate: [ x, y, z ]
          // rotate: [ x, y, z ]
          translate: [ 0, 0, 0 ],
          rotate: [ 0, 0, 0 ]
        }
      }
    },

    // this is defines the over state for the button
    over: {
      exampleButton: {
        style: {
          // regular old width and height animation
          width: 200,
          height: 200,
          fontSize: 30,

          // fancy properties
          color: [ 255, 255, 255 ],
          translate: [ -40, 0, -200 ],
          rotate: [ -20, -45, 0 ]
        }
      }
    }
  };
};