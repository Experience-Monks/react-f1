var dirtyCounter = 0;

module.exports = function(props, style, propName, styleName, value) {

  if(typeof propName === 'string') {
    delete props[ propName ];
  } else {
    propName.forEach(function(propName) {
      delete props[ propName ];
    });
  }
  
  style[ styleName ] = value;
};