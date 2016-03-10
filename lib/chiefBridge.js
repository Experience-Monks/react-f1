module.exports = function(target, onUpdate) {

  target.state = null;
  target.onComplete = null;

  return {
    isInitialized: false,

    init: function(state) {
      this.isInitialized = true;
      target.go = state;
      onUpdate();
    },

    go: function(state, onComplete) {
      target.go = state;
      target.onComplete = onComplete;
      onUpdate();
    }
  };
};