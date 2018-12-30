import * as React from 'react';

type LockyEventHandler = (true | false | 'no-default' | 'report' | 'report-only');

interface Props {
  noDefault?: boolean,
  children: React.ReactNode,
  enabled: boolean,
  group?: string,
  component?: React.ComponentType,
  className?: string,
  onEscape?: (Event: UIEvent) => void,
  headless?: boolean,
  leaded?: boolean,
  events?: {
    click?: LockyEventHandler,
    mousemove?: LockyEventHandler,
    mousedown?: LockyEventHandler,
    mouseup?: LockyEventHandler,
    touchmove?: LockyEventHandler,
    touchstart?: LockyEventHandler,
    touchend?: LockyEventHandler,
    keydown?: LockyEventHandler,
    keyup?: LockyEventHandler,
    keypress?: LockyEventHandler,
    change?: LockyEventHandler,
    scroll?: LockyEventHandler,
    wheel?: LockyEventHandler,
    focusin?: LockyEventHandler,
    focusout?: LockyEventHandler,
  }
}

export default class Locky extends React.Component<Props> {
}
