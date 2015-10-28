var updateStyleAndState = require('./lib/updateStyleAndState');

module.exports = function initPosition(states, targets, transitions) {
  var isUsed;
  var properyNames;

  for(var uiName in targets) {
    isUsed = false;

    for(var stateName in states) {
      properyNames = Object.keys(states[ stateName ][ uiName ]);

      if(properyNames.indexOf('position') > -1) {
        isUsed = true;
        break;
      }
    }

    // is position is used
    if(isUsed) {
      setupForPosition.call(this, targets[ uiName ]);
    }
  }
}

function setupForPosition(item) {

  updateStyleAndState.call(this, item, 'position', 'absolute');
  updateStyleAndState.call(this, item, 'left', 0);
  updateStyleAndState.call(this, item, 'top', 0);
}