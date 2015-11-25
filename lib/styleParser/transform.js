var getTransformMatrix = require('./getTransformMatrix');

module.exports = function positionScaleRotation(target, state) {
  if(state.style) {
    var transform = getTransformMatrix(state.style);
    var transformString;
    var perspective;

    if(transform) {

      perspective = -1 / transform[ 11 ];
      transformString = 'perspective(' + perspective + 'px) matrix3d(' + Array.prototype.join.call( transform, ',' ) + ')';

      target.style.transform = transformString;
    }
  }
};