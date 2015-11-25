module.exports = function(target, state) {
  if(state.style && Array.isArray(state.style.transformOrigin)) {
    var anchor = state.style.transformOrigin;

    target.style.transformOrigin = Math.round( anchor[ 0 ] * 100 ) + '% ' + Math.round( anchor[ 1 ] * 100 ) + '%';
  }
};