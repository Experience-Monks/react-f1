var updateStyleAndProps = require('./lib/updateStyleAndProps');

module.exports = function anchor(style, props) {

  if(props.anchor) {
    
    var anchor = props.anchor;
    
    updateStyleAndProps(
      props, 
      style, 
      'anchor', 
      'transformOrigin', 
      Math.round( anchor[ 0 ] * 100 ) + '% ' + Math.round( anchor[ 1 ] * 100 ) + '%'
    ); 
  }
};