var updateStyleAndState = require('./lib/updateStyleAndState');

module.exports = function anchor(item, data) {

  if( data.anchor ) {
    
    var anchor = data.anchor;
    
    updateStyleAndState.call(
      this,
      item, 
      'transformOrigin', 
      Math.round( anchor[ 0 ] * 100 ) + '% ' + Math.round( anchor[ 1 ] * 100 ) + '%'
    );
  }
};