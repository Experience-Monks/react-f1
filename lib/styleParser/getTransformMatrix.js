var matCreate = require( 'gl-mat4/create' );
var matTranslate = require( 'gl-mat4/translate' );
var matScale = require( 'gl-mat4/scale' );
var matRotateX = require( 'gl-mat4/rotateX' );
var matRotateY = require( 'gl-mat4/rotateY' );
var matRotateZ = require( 'gl-mat4/rotateZ' );

module.exports = function getTransformMatrix(data) {
  if(data.translate || data.scale || data.rotation || data.perspective !== undefined) {
    
    var translation = data.translate || [ 0, 0, 0 ];
    var scale = data.scale || [ 1, 1, 1 ];
    var rotation = data.rotation || [ 0, 0, 0 ];
    var perspective = data.perspective || 1000;
    var transform = matCreate();

    while( translation.length < 3 ) {

      translation.push( 0 );
    }

    while( rotation.length < 3 ) {

      rotation.push( 0 );
    }

    while( scale.length < 3 ) {

      scale.push( 1 );
    }

    matTranslate( transform, transform, translation );
    matScale( transform, transform, scale );
    matRotateX( transform, transform, rotation[ 0 ] );
    matRotateY( transform, transform, rotation[ 1 ] );
    matRotateZ( transform, transform, rotation[ 2 ] );

    // add in css perspective
    transform[ 11 ] = -1 / perspective;

    return transform;
  } else {
    
    return null;
  }
};