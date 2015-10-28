var updateStyleAndState = require('./updateStyleAndState');

module.exports = function(propertyStyle, propertyData) {

  return function(item, data) {
    
    if(Array.isArray(data[ propertyData ])) {

      var rounded = data[ propertyData ].map(Math.round);
      var style;

      if(data[ propertyData ].length == 3) {
        style = 'rgb(' + rounded.join(',') + ')';
      } else if(data[ propertyData ].length == 4) {
        // we want alpha to be not rounded
        rounded[ 3 ] = data[ propertyData ][ 3 ];

        style = 'rgba(' + rounded.join(',') + ')';
      } else {
        throw new Error('unsupported ' + propertyData + ' of type', data[ propertyData ]);
      }

      updateStyleAndState.call(this, item, propertyStyle, style);
    }
  };
};