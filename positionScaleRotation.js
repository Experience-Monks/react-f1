var getTransformMatrix = require('./lib/getTransformMatrix');
var updateStyleAndState = require('./lib/updateStyleAndState');

module.exports = function positionScaleRotation(item, data) {
  var transform = getTransformMatrix(data);
  var transformString;
  var perspective;

  if( transform ) {

    perspective = -1 / transform[ 11 ];
    transformString = 'perspective(' + perspective + 'px) matrix3d(' + Array.prototype.join.call( transform, ',' ) + ')';

    updateStyleAndState.call(this, item, 'transform', transformString);
  }
};