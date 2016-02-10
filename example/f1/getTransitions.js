'use strict';
// the eases module contains ease functions to modify animation curves
var eases = require('eases');

module.exports = function getTransitions() {
  // transtions are arrays of how you can go between 
  // states.
  // 
  // in this case we have one transition between idle and over
  return [
    { 
      from: 'idle', 
      to: 'over', 
      // the following describes a very complex animation
      // there's no need to define such a crazy animation
      // but sometimes designers like to get craaaazy
      animation: {
        buttonBG: {
          style: {
            translate: {
              duration: 0.15,
              delay: 0.1,
              ease: eases.quadOut
            },

            rotate: {
              duration: 0.15,
              delay: 0.1,
              ease: eases.quadOut
            },

            width: {
              duration: 0.25,
              delay: 0.1,
              ease: eases.expoOut
            },

            height: {
              duration: 0.25,
              delay: 0.4,
              ease: eases.expoOut
            }
          }
        }
      } 
    },
    { 
      from: 'over', 
      to: 'idle',
      animation: {
        duration: 0.5,
        ease: eases.elasticOut
      }
    }  
  ];
};