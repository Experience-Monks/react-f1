var getTransformMatrix = require('../getTransformMatrix');
var updateStyleAndProps = require('../updateStyleAndProps');

module.exports = function positionScaleRotation(style, props) {
  var transform = getTransformMatrix(props);
  var transformString;
  var perspective;

  if(transform) {

    perspective = -1 / transform[ 11 ];
    transformString = 'perspective(' + perspective + 'px) matrix3d(' + Array.prototype.join.call( transform, ',' ) + ')';

    updateStyleAndProps(props, style, ['position', 'scale', 'rotation'], 'transform', transformString);
  }
};