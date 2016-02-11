# react-f1

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

React UI animation components built on top of [`f1-dom`](https://www.npmjs.com/package/f1-dom) and [`f1`](https://www.npmjs.com/package/f1).

#### Features

- Create complex animations with custom delays, durations, eases
- Animate individual properties (scale, opacity, etc.) independently of each other eg. delay the opacity animation by 0.5 seconds but scale immediately
- True separation of concerns. Animations defined outside of application implementation (less Spaghetti code)
- Absolute control over animations from page transitions down to individual ui components
- Uses path finding to figure out how to animate from one state to another. For instance how to animate from a button from an out state to a pressed state (write less logic for complex animations)


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

#### Install
```bash
$ npm i react-f1 react react-dom --save
```

There is an example folder distributed with this module. It contains two examples. One being a small example of how to use `ReactF1` and the other on how to use `Chief`.

Details on how to run these examples are noted below. Once running in your browser you can simply edit the js files listed before and see changes immediately in browser.

#### Example ReactF1

![Example ReactF1](https://media.githubusercontent.com/media/Jam3/react-f1/dev/example/react-f1.gif)

This example builds and renders a small animated button that you can see in use above.

**To run the ReactF1 example:**
```bash
$ npm run example-f1
```

Below is a description of all example files that you might want to edit. All of these files have comments which explain each piece of the application:

**example/f1/ExampleButton.js:** Example Button Component built using ReactF1.

**example/f1/getStates.js:** a function which returns an Object which defines what the button should look like in each state.

**example/f1/getTransitions.js:** a function which returns an Array which defines how to animate between states.


## License

MIT, see [LICENSE.md](http://github.com/Jam3/react-f1/blob/master/LICENSE.md) for details.
