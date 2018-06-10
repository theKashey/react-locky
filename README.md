# react-locky [![CircleCI status](https://img.shields.io/circleci/project/github/theKashey/react-locky/master.svg?style=flat-square)](https://circleci.com/gh/theKashey/react-locky/tree/master)
----

[![NPM](https://nodei.co/npm/react-locky.png?downloads=true&stars=true)](https://nodei.co/npm/react-locky/) [![Greenkeeper badge](https://badges.greenkeeper.io/theKashey/react-locky.svg)](https://greenkeeper.io/)

Loki  - is God of Mischief, Madness and Evil!

Locky - is God of Locks, Event capturing and Stealing. Small and very slender brother - just 2kb.

Locky will never let event escape the target node, will prevent scrolls outside, will do the HTML5 `inert` job.
Locky will completely disable any user iterations outside of nested children.

```js
import Locky from 'react-locky';

 <div>
     <Button>You will be unable to press</Button>
     <Scrollable>You will be unable to scroll</Scrollable
     
     <Locky>
        <Button>You will be ABLE to press</Button>
        <Scrollable>You will be able to scroll</Scrollable
     </Locky>
     
     // you can tune behavior
     <Locky events={{keydown: false}}>
       // Locky got everything, except keydown        
     </Locky>
 </div>
```

In case you need to lock only scroll

```js
 <Locky noDefault events={{scroll: true}}> .... </Locky>
```

# API
 Locky accepts a few props.
 - enabled[=true], controls Locky behavior. 
 - onEscape, will be triggered when someone will try "escape" the lock. See "report" events below
 - noDefault[=false], disables all "default" events
 - events[=defaultEvents], DOM events to manage
 - group[=null], focus group id. Locks with the same group will not block each other.
 - component[=div], allows to replace HTML tag.
 - className[=null], Locky will forward className to component.
 
# Default events
 - click: 'report' (will call `onEscape`)
 - mousemove: true,
 - mousedown: 'report' (will call `onEscape`)
 - touchmove: true,
 - touchstart: 'report' (will call `onEscape`)
 - keydown: true,
 - focus: false, (focus is unblockable)
 - change: false,
 - scroll: true, (scroll is handled separately)
 - wheel: true, 
 
# Example
 - https://codesandbox.io/s/0ok0pz7vml - "Scroll" locky
 - https://codesandbox.io/s/l7nrkv1rnq - simple Locky
 - https://codesandbox.io/s/k55641yx6o - a bit more complex 
 
# Other usages

Just track clicks outside your element
```js
<Locky noDefault events={{click:'report-only'}} onEscape={onOuterElementClick}>
  ...your content
</Locky>
``` 

# More tools
Locky also exposes `LockyTransparent` component, which makes everything inside invisible to Locky
```js
import {LockyTransparent} from 'react-locky';

<LockyTransparent>this content will be "locky"-free</LockyTransparent>
```

# ScrollBars
Locks will __not hide your scroll bars__! And there is no way to prevent scrolling using the scroll bars.
You have to use [react-scrolllock](https://github.com/jossmac/react-scrolllock) to complitely disable scroll, or _Strollable_ from [react-stroller](https://github.com/theKashey/React-stroller) to hide scroll bars.

# Article
 - [How to train your scroll](https://hackernoon.com/how-to-train-a-your-scroll-c9edcf28dbfa) - a medium article.
 
# Related
 - [react-focus-lock](react-focus-lock) - to scope focus
  
 
 Locky __could not__ manage focus itself, as long there is no way to "preventDefault" it.
 Once you will "tab-out", you will not be able to "tab-in", as long key events are blocked. 
 
 - [react-scroll-captor](https://github.com/jossmac/react-scroll-captor) - to scope scroll.
 
 `<Locky noDefault events={{scroll:true}} />` will do almost the same, but differently.
 As long `react-scroll-captor` manage "scroll" for `children`, locky could manage scroll for any `target` inside.
 Ie - if you have scrollable, inside scrollable, or scrollable is not a top-most node - react-scroll-captor will __not__ 
 work, while Locky will. 
 

# Licence
 MIT
