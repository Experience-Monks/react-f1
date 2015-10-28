var updateStyleAndProps = require('./updateStyleAndProps');

module.exports = function(propertyStyle, propertyData) {

  return function(style, props) {
    
    if(Array.isArray(props[ propertyData ])) {

      var rounded = props[ propertyData ].map(Math.round);
      var styleValue;

      if(props[ propertyData ].length == 3) {
        styleValue = 'rgb(' + rounded.join(',') + ')';
      } else if(props[ propertyData ].length == 4) {
        // we want alpha to be not rounded
        rounded[ 3 ] = props[ propertyData ][ 3 ];

        styleValue = 'rgba(' + rounded.join(',') + ')';
      } else {
        throw new Error('unsupported ' + propertyData + ' of type', props[ propertyData ]);
      }

      updateStyleAndProps(props, style, propertyData, propertyStyle, styleValue);
    }
  };
};