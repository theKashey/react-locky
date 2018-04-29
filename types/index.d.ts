import * as React from 'react';

interface Props {
  noDefault?: boolean,
  children: React.ReactNode,
  enabled: boolean,
  component?: React.ComponentType,
  onEscape?: () => void,
  events?: (true | false | 'no-default' | 'report')[],
}

export default class Locky extends React.Component<Props> {}
