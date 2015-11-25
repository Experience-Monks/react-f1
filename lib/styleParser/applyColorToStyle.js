module.exports = function(property) {

  return function(target, state) {

    if(state.style && Array.isArray(state.style[ property ])) {

      var rounded = state.style[ property ].map(Math.round);
      var styleValue;

      if(state.style[ property ].length === 3) {
        styleValue = 'rgb(' + rounded.join(',') + ')';
      } else if(state.style[ property ].length === 4) {
        // we want alpha to be not rounded
        rounded[ 3 ] = state.style[ property ][ 3 ];

        styleValue = 'rgba(' + rounded.join(',') + ')';
      } else {
        throw new Error('unsupported ' + property + ' of type', state.style[ property ]);
      }

      target.style[ property ] = styleValue;
    }
  };
};