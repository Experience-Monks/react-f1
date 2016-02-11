'use strict';

var merge = require('deep-extend');

module.exports = function(props) {
  var width = props.width;
  var height = props.height;
  var marginTop = props.marginTop;

  var selected1 = {
    indicator: {
      style: {
        position: 'absolute',
        left: 29,
        top: 0,
        width: width,
        height: height,
        opacity: 1,
        backgroundColor: [ 255, 0, 0 ]
      }
    }
  };

  var selected2 = merge(
    {},
    selected1,
    {
      indicator: {
        style: {
          top: height + marginTop
        }
      }
    }
  );

  var selected3 = merge(
    {},
    selected1,
    {
      indicator: {
        style: {
          top: (height + marginTop) * 2
        }
      }
    }
  );

  var out = merge(
    {},
    selected2,
    {
      indicator: {
        style: {
          left: 0,
          opacity: 0
        }
      }
    }
  );

  var idle = merge(
    {},
    out,
    {
      indicator: {
        style: {
          left: 29,
          opacity: 0.1
        }
      }
    }
  );

  return {
    out: out,
    idle: idle,
    selected1: selected1,
    selected2: selected2,
    selected3: selected3
  };
};