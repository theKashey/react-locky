# react-locky [![CircleCI status](https://img.shields.io/circleci/project/github/theKashey/react-locky/master.svg?style=flat-square)](https://circleci.com/gh/theKashey/react-locky/tree/master)
----

[![NPM](https://nodei.co/npm/react-locky.png?downloads=true&stars=true)](https://nodei.co/npm/react-locky/)

Loki  - is God of Mischief, Madness and Evil!

Locky - is God of Locks, Event capturing and Stealing. Small and very slender brother - just 2kb.

Locky will never let event escape the target node, will prevent scrolls outside, will do the HTML5 `inert` job.
Locky will completely disable any user iterations outside of nested children.

```js
 <div>
     <Button>You will be unable to press</Button>
     <Scrollable>You will be unable to scroll</Scrollable
     
     <Locky>
        <Button>You will be ABLE to press</Button>
        <Scrollable>You will be able to scroll</Scrollable
     </Locky>
     
     // you can tune behavior
     <Locky events={{keydown: false}}>
       // Locky got everything, expect keydown        
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
 
# Article
 - https://medium.com/p/how-to-train-a-your-scroll-c9edcf28dbfa
 
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
