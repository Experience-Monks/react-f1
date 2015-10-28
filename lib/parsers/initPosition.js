module.exports = function initPosition(style, states, targets, transitions) {
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
      setupForPosition(style);
    }
  }
}

function setupForPosition(style) {

  style.position = 'absolute';
  style.left = style.top = 0;
}