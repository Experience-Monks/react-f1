var dirtyCounter = 0;

module.exports = function(item, styleName, value) {
  this.f1Styles[ item ] = this.f1Styles[ item ] || {};
  this.f1Styles[ item ][ styleName ] = value;

  // the dirty counter is just a cheap trick to force 
  // a state update
  // since setState does not do deep merging having style object
  // set through setState will be an issue
  this.setState({
    dirty: ++dirtyCounter % 10
  });
};