var updateStyleAndState = require('./lib/updateStyleAndState');

module.exports = function alpha(item, data) {
  if(data.alpha !== undefined) {

    updateStyleAndState.call(this, item, 'opacity', data.alpha);
  }
};