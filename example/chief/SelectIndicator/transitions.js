'use strict';
var eases = require('eases');

module.exports = [
  { 
    from: 'out', to: 'idle', bi: true, animation: {
      duration: 0.1
    } 
  },
  { 
    from: 'idle', to: 'selected2', bi: true, animation: {
      duration: 0.25,
      ease: eases.expoOut
    } 
  },

  { 
    from: 'selected2', to: 'selected1', animation: {
      duration: 0.25,
      ease: eases.bounceOut
    } 
  },
  { 
    from: 'selected1', to: 'selected2', animation: {
      duration: 0.25,
      ease: eases.backOut
    } 
  },

  { 
    from: 'selected2', to: 'selected3', animation: {
      duration: 0.25,
      ease: eases.bounceOut
    } 
  },
  { 
    from: 'selected3', to: 'selected2', animation: {
      duration: 0.25,
      ease: eases.backOut
    } 
  },


  { 
    from: 'selected3', to: 'selected1', bi: true, animation: {
      duration: 0.5,
      ease: eases.bounceOut
    } 
  }
];