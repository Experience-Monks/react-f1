'use strict';

var merge = require('deep-extend');

module.exports = function(props) {
  var width = props.width;
  var height = props.height;

  var idle = {
    bg1: {
      style: {
        transformOrigin: [ 1, 0.5 ],
        scale: [ 0, 1 ]
      }
    },

    bg2: {
      style: {
        transformOrigin: [ 0, 0.5 ],
        scale: [ 1, 1 ]
      }
    },

    container: {
      style: {
        rotate: [ 0, 0, 0 ]
      }
    }
  };

  var out = merge(
    {},
    idle,
    {
      container: {
        style: {
          rotate: [ 90, 0, 0 ] 
        }
      }
    }
  );

  var over = merge(
    {},
    idle,
    {
      bg1: {
        style: {
          scale: [ 0.15, 1 ]  
        }
      },

      bg2: {
        style: {
          scale: [ 0.85, 1 ]
        }
      }
    }
  );

  var preSelected = merge(
    {},
    over,
    {
      container: {
        style: {
          rotate: [ 90, 0, 0 ]
        }
      }
    }
  );

  var swapSelected = merge(
    {},
    preSelected,
    {
      bg1: {
        style: {
          scale: [ 1, 1 ]
        }
      },

      bg2: {
        style: {
          scale: [ 0, 1 ]
        }
      }
    }
  );

  var selected = merge(
    {},
    swapSelected,
    {
      container: {
        style: {
          rotate: [ 180, 0, 0 ]
        }
      }
    }
  );

  return {
    idle: idle,
    over: over,
    out: out,
    preSelected: preSelected,
    swapSelected: swapSelected,
    selected: selected
  };
};