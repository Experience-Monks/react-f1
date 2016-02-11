# react-f1

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

React UI animation components built on top of [`f1-dom`](https://www.npmjs.com/package/f1-dom) and [`f1`](https://www.npmjs.com/package/f1).

### Features

- Create complex animations with custom delays, durations, eases
- Animate individual properties (scale, opacity, etc.) independently of each other eg. delay the opacity animation by 0.5 seconds but scale immediately
- Special handling for properties such as css colors and transforms (translate, scale, rotate) to allow for easier animation
- True separation of concerns. Animations defined outside of application implementation (less Spaghetti code)
- Absolute control over animations from page transitions down to individual ui components
- Uses path finding to figure out how to animate from one state to another. For instance how to animate from a button from an out state to a pressed state (write less logic for complex animations)


### Components

There are two components which are exposed in this module:
```
var ReactF1 = require('react-f1');
// and
var Chief = require('react-f1/Chief');
```

#### `ReactF1`
`ReactF1` can be used to create complete animated UI components such as buttons, toggles, accordians, etc.

#### `Chief`
`Chief` is used to control `ReactF1` components. For instance when a page animate's in one `Chief` component can tell all button's (which are `ReactF1` components or other `Chief` components) on a page to animate in staggered/delayed from one another.

## Usage

[![NPM](https://nodei.co/npm/react-f1.png)](https://www.npmjs.com/package/react-f1)

#### Install
```bash
$ npm i react-f1 react react-dom --save
```

## Examples

There is an example folder distributed with this module. It contains two examples. One being a small example of how to use `ReactF1` and the other on how to use `Chief`.

Details on how to run these examples are noted below. Once running in your browser you can simply edit the js files listed below and see changes immediately in browser.

## Example ReactF1

![Example ReactF1](https://media.githubusercontent.com/media/Jam3/react-f1/dev/example/react-f1.gif)

This example builds and renders a small animated button that you can see in use above.

#### To run the ReactF1 example:
```bash
$ npm run example-f1
```

Below is a description of all example files that you might want to edit. All of these files have comments which explain each piece of the application:

**example/f1/ExampleButton.js:** Example Button Component built using ReactF1.

**example/f1/getStates.js:** a function which returns an Object which defines what the button should look like in each state.

**example/f1/getTransitions.js:** a function which returns an Array which defines how to animate between states.

## Example Chief

![Example Chief](https://media.githubusercontent.com/media/Jam3/react-f1/dev/example/react-f1-chief.gif)

The above example uses two components `SelectIndicator` (small line that moves up and down on the left) and `FancyButton` which is the buttons on the right. States and logic for selected buttons are handled by `Chief`.

**To run the Chief example:**
```bash
$ npm run example-chief
```

**example/chief/Menu/:** This folder contains all code including states and transitions used by `Chief` to create a Menu. (this is the menu in the above gif)

**example/chief/FancyButton/:** This folder contains all code including states and transitions used by the FancyButton. (buttons on the right side of the menu in the above gif)

**example/chief/SelectIndicator/:** This folder contains all code including states and transitions used by the SelectIndicator. (small line that moves up and down in the above gif) 

## Documentation

The following describes on a high level how ReactF1 and Chief components are used.

### `const ReactF1 = require('react-f1')`

```html
<ReactF1
  // state here is a String
  // it is the state that this ui component should
  // animate to using path finding
  go={state}

  // onComplete is a Function which will be called when 
  // we're in the state passed to `go`
  onComplete={onComplete}

  // states is an Object which defines what this state
  // ui should look like in each state
  // eg. in idle, mouse over, pressed, etc.
  states={states}

  // transitions is an Array which defines how ReactF1 should 
  // animate between states
  transitions={transitions}
>
  // the following defines components which will be animated
  // data-f1 associates these components with properties which
  // be defines in the states Object described above
  <div data-f1="targetName1" />
  <div data-f1="targetName2" />
</ReactF1>
```

#### ReactF1 `states`

```javascript
// this Object describes what this ui should look like in each state
var states = {

  // this is the name of a state for instance this could be idle
  stateName1: {

    // this describes what a piece of the ui should look like in this state
    // it links to an item above described through data-f1
    targetName1: {

      // the following will describe what css styles should look like
      // for targetName1 in this state
      style: {
        // it should be noted that in order to have predictable behaviour with
        // react-f1 you should define each css property in each state that
        // maybe animated at some point. 
        // eg. `left` css property in out is set to 0, idle `left` is 0 again, 
        // and finally in the over state `left` is 100xw
        cssProperty1: value,
        cssProperty2: value
      }
    },
    
    // this describes another piece of ui associted via the 
    // data-f1 attribute
    targetName2: {
      style: {
        cssProperty1: value,
        cssProperty2: value
      }
    }
  },
  
  // this is the name of a state for instance this could be mouseOver
  stateName2: {
    targetName1: {
      style: {
        cssProperty1: value,
        cssProperty2: value
      }
    },

    targetName2: {
      style: {
        cssProperty1: value,
        cssProperty2: value
      }
    }
  }
}
```

#### ReactF1 `transitions`

```javascript
var transitions = [
  // to define that it's possible to animate from one
  // state to another.
  // If no animation is defined then a default animation
  // will be used
  { from: 'stateName1', to: 'stateName2' },

  // Transitions are not bi-directional
  // which means we will need to do this also
  // { from: 'stateName2', to: 'stateName1' }
  // however as a short form you can do
  // { from: 'stateName1', to: 'stateName2', bi: true }
  {
    from: 'stateName2', to: 'stateName1',

    // the following will define the animation to go from
    // stateName2 to stateName1
    animation: {
      // the following would define that all parts of the ui
      // will animate in 0.5 seconds and be delayed by 0.1 seconds
      duration: 0.5,
      delay: 0.1,

      // this will define that all animations will use this easeFunction
      // typically this would be one of the ease functions from:
      // https://www.npmjs.com/eases
      ease: easeFunction1,

      // the following would override the duraration and delay
      // which were defined globally just for targetName1
      targetName1: {
        duration: 0.3,
        delay: 0
      },

      // you can also override animations all the way down to a
      // a property.
      // In this case everything for targetName2 would use the globally
      // defined animation settings:
      // duration 0.5 seconds and be delayed 0.1 and use easeFunction1
      // however you can override down to a single animatable property
      // in thise case cssProperty1 will have duration of 0.25, delay 0.2,
      // and use easeFunction2 for easing
      targetName2: {
        style: {
          cssProperty1: {
            duration: 0.25,
            delay: 0.2,
            ease: easeFunction2
          }
        }
      }
    }
  }
]
```
### `const Chief = require('react-f1/Chief')`

```html
// Chief from an API perspective looks very much the way that ReactF1 does
<Chief
  // state which we should animate to
  go={state}

  // callback when we reach that state
  onComplete={onComplete}

  // states for Chief define what state all ui should be in
  states={states}

  // transitions can define delays for triggering ui states
  transitions={transitions}
>
{
  // with React it's very hard to manipulate deeply nested (grand child) 
  // component's properties. 
  // This is why you need to pass in a function that will accept an Object
  (states) => {
    // this function needs to return a single root component
    return <div>

      // for simplicity this example does not defines states or transitions
      // for these ReactF1 ui components however states.target1 does
      // contain a variable called go and a function onComplete which
      // will be the state in which this ui Component should be
      <ReactF1
        // states.target1 might look like this
        // { go: 'idle', onComplete: callback }
        {...states.target1}
      />

      <ReactF1
        // states.target2 might look like this
        // { go: 'idle', onComplete: callback }
        {...states.target2}
      />

      // It should be Noted also that a Chief component can control other
      // Chief's
      <Chief
        // states.target3 might look like this
        // { go: 'idle', onComplete: callback }
        {...states.target3}
      />
    </div>;
  }
}
</Chief>
```

#### Chief `states`

```javascript
var states = {
  // this will define what state each of the ui components
  // should be in during the out state
  out: {
    target1: 'out',
    target2: 'out',
    target3: 'out'
  },
  
  // this will define what state each of the ui components
  // should be in during the idle state
  idle: {
    target1: 'idle',
    target2: 'idle',
    target3: 'idle'
  }
};
```

#### Chief `transitions`
```javascript
var transitions = [
  // this defines a path for Chief to go from out to idle
  // if no animations are passed then all ui's states will 
  // be set at the same time.
  // 
  // It should be noted you can also do this:
  // { from: 'out', to: 'idle', bi: true }
  // Which will create a bi-directional transition.
  { from: 'out', to: 'idle' },

  // you may want to "stagger" ui going to a state
  // this is how you'd do it
  { from: 'out', to: 'idle', animation: {
      target2: {
        delay: 0.25
      },

      target3: {
        delay: 0.5
      }
    } 
  } 
];
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/react-f1/blob/master/LICENSE.md) for details.
