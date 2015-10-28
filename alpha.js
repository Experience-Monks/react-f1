var updateStyleAndProps = require('./lib/updateStyleAndProps');

module.exports = function alpha(style, props) {
  if(props.alpha !== undefined) {

    updateStyleAndProps(props, style, 'alpha', 'opacity', props.alpha);
  }
};