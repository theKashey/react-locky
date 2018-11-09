# react-locky 
[![CircleCI status](https://img.shields.io/circleci/project/github/theKashey/react-locky/master.svg?style=flat-square)](https://circleci.com/gh/theKashey/react-locky/tree/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/theKashey/react-locky.svg)](https://greenkeeper.io/)

----

[![NPM](https://nodei.co/npm/react-locky.png?downloads=true&stars=true)](https://nodei.co/npm/react-locky/) 

Loki  - is God of Mischief, Madness and Evil!

Locky - is God of Locks, Event capturing and Stealing. Small and very slender brother - just __1.7kb__.

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
 - group[=null], focus group id. Locks with the same group will not block each other. You may setup groups manually by adding
 `data-locky-group={name}` attribute anywhere.
 - component[=div], allows to replace HTML tag.
 - className[=null], Locky will forward className to component.
 - headless[=false], Locky will not create `component`, but will use the first node inside it (groups will probably not work).
 - leaded[=false], Locky will work only with "group" leader - mounted last instance for the provided group.
 
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
 
# Tip

Probably you __don't need to hook a keyboard__. It will also block page refresh events.
```js
<Locky events={{keydown:false}} />
```

__important__ tip for __Mobile Safary__ - while normal "touch move" will
scroll "scrollable" container, touch+move started on inputs will start
__drag-n-drop__ and cause whole layer(modal/page) scroll. 
(it will just scroll as a 💩, or not scroll at all).

To disable this behavior - apply ` -webkit-overflow-scrolling: touch;` on the page.
 
Locky in non-headless mode will produce a div. That div could be something you dont want to have.
Feel free to set a `className` prop, with class holding `display:inline` - as a result parasite div will
shrink to 1 pixel. 
 
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
 
 - [dom-locky](https://github.com/thearnica/dom-locky) - Vanilla DOM API implimentation of Locky.
 
 - [react-stroller](https://github.com/theKashey/react-stroller) - React scrollbar manager. To hide or replace.
 
 - [react-scroll-locky](https://github.com/theKashey/react-scroll-locky) - to scope scroll(via locky) and remove scroll bars.
 
 `<Locky noDefault events={{scroll:true}} />` will do almost the same, but differently.
 As long `react-scroll-captor` manage "scroll" for `children`, locky could manage scroll for any `target` inside.
 Ie - if you have scrollable, inside scrollable, or scrollable is not a top-most node - react-scroll-captor will __not__ 
 work, while Locky will. 
 

# Licence
 MIT
