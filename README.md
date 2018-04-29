# react-locky
----

Loki - is God of Mischief, Madness and Evil!

Locky - is God of Locks, Event capturing and Stealing.

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
 </div>
```

# API
 Locky accepts a few props.
 - enabled[=true], controls Locky behavior.
 - noDefault[=false], disables all "default" events
 - component[=div], allows to replace HTML tag.
 - onEscape, will be triggered when someone will try escape lock
 - events - events to manage
 
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
 - https://codesandbox.io/s/l7nrkv1rnq - simple Locky
 - https://codesandbox.io/s/k55641yx6o - a bit more complex 
 
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