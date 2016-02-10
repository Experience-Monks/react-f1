# react-f1

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

React UI animation components built on top of [`f1-dom`](https://www.npmjs.com/package/f1-dom) and [`f1`](https://www.npmjs.com/package/f1).

#### Features

- Create complex animations with custom delays, durations, eases
- Animate individual properties (scale, opacity, etc.) independently of each other eg. delay the opacity animation by 0.5 seconds but scale immediately
- Animations defined outside of application implementation (less Spaghetti code)
- Control animations from page transitions down to ui components
- Uses path finding to figure out how to animate from State A to State C (write less logic for complex animations)


#### Components

There are two components which are exposed in this module:
```
var ReactF1 = require('react-f1');
// and
var Chief = require('react-f1/Chief');
```

#### `ReactF1`
`ReactF1` can be used to create complete animated UI components such as buttons, toggles, accordians, etc.

#### `Chief`
`Chief` is used to control `ReactF1` components. For instance when a page animate in happens `Chief` can tell all button's on a page to animate in staggered/delayed from one another.

## Usage

[![NPM](https://nodei.co/npm/react-f1.png)](https://www.npmjs.com/package/react-f1)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/react-f1/blob/master/LICENSE.md) for details.
