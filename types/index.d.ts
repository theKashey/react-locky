import * as React from 'react';

type LockyEventHandler = (true | false | 'no-default' | 'report' | 'report-only');

interface Props {
  noDefault?: boolean,
  children: React.ReactNode,
  enabled: boolean,
  group?: string,
  component?: React.ComponentType,
  className?: string,
  onEscape?: () => void,
  headless?: boolean,
  events?: {
    click?: LockyEventHandler,
    mousemove?: LockyEventHandler,
    mousedown?: LockyEventHandler,
    touchmove?: LockyEventHandler,
    touchstart?: LockyEventHandler,
    keydown?: LockyEventHandler,
    change?: LockyEventHandler,
    scroll?: LockyEventHandler,
    wheel?: LockyEventHandler,
  }
}

export default class Locky extends React.Component<Props> {
}
