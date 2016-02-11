'use strict';
var eases = require('eases');

module.exports = [
  { from: 'out', to: 'idle', animation: {
      duration: 0.5,
      ease: eases.backOut
    } 
  },
  { from: 'idle', to: 'out', animation: {
      duration: 0.5,
      ease: eases.expoIn
    } 
  },

  { from: 'idle', to: 'over', animation: {
      duration: 0.25,
      ease: eases.backOut
    } 
  },
  { from: 'over', to: 'idle', animation: {
      duration: 0.25,
      ease: eases.expoOut
    } 
  },

  { from: 'over', to: 'preSelected', animation: {
      duration: 0.25,
      ease: eases.expoIn
    } 
  },
  { from: 'preSelected', to: 'over', animation: {
      duration: 0.5,
      ease: eases.backOut
    } 
  },


  { from: 'preSelected', to: 'swapSelected', bi: true, animation: {
      duration: 0
    } 
  },

  { from: 'swapSelected', to: 'selected', animation: {
      duration: 0.5,
      ease: eases.backOut
    } 
  },
  { from: 'selected', to: 'swapSelected', animation: {
      duration: 0.5,
      ease: eases.expoIn
    } 
  }
];