import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addEvent, getHandler, removeEvent } from './utils';
import { getTouchY, handleScroll } from './handleScroll';
import { EVENTS } from './defaultEvents';
import { isInside, shouldIgnoreEvent } from './isInside';

class EventLock extends Component {
  static propTypes = {
    noDefault: PropTypes.bool,
    children: PropTypes.node,
    enabled: PropTypes.bool,
    group: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onEscape: PropTypes.func,
    events: PropTypes.objectOf(PropTypes.oneOf([true, false, 'no-default', 'report', 'report-only'])),
    className: PropTypes.string,
  };

  static defaultProps = {
    enabled: true,
    noPreventDefault: false,
  };

  componentDidMount() {
    if (this.props.enabled) {
      this.enable();
    }
  }

  componentWillUnmount() {
    if (this.props.enabled) {
      this.disable();
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.enabled !== this.props.enabled) {
      if (this.props.enabled) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }

  enable() {
    const handlers = this.getEventHandlers();
    this.documentEvents = Object
      .keys(handlers)
      .map(event => addEvent(document, event, this.getHandler(event, handlers[event]), true))
      .filter(x => x);

    this.nodeEvents = [];
    if (handlers.scroll) {
      this.nodeEvents.push(
        ...[
          addEvent(this.ref, 'wheel', this.scrollWheel, true),
          addEvent(this.ref, 'touchstart', this.scrollTouchStart, true),
          addEvent(this.ref, 'touchmove', this.scrollTouchMove, true),
        ],
      );
    }
  }

  disable() {
    this.documentEvents.forEach(removeEvent);
    this.nodeEvents.forEach(removeEvent);
  }

  setRef = (ref) => {
    this.ref = ref;
  };

  scrollWheel = event => handleScroll(this.ref, event, event.deltaY);
  scrollTouchStart = (event) => {
    this.touchStart = getTouchY(event);
  };
  scrollTouchMove = event => handleScroll(this.ref, event, this.touchStart - getTouchY(event));

  isEventInLock = event => this.ref && isInside(this.ref, event.target)

  getEventHandlers() {
    const { noDefault, events } = this.props;
    return Object.assign({}, noDefault ? {} : EVENTS, events || {});
  }

  getHandler(eventName, option) {
    const handler = getHandler(eventName, option, this.props.onEscape);
    if (handler) {
      return (event) => {
        if (!this.isEventInLock(event) && !shouldIgnoreEvent(event.target)) {
          handler(event);
        }
      };
    }
    return null;
  }

  render() {
    const { component, group, className } = this.props;
    const Node = component || (<div />).type;
    return (
      <Node ref={this.setRef} data-locky-group={group} className={className}>
        {this.props.children}
      </Node>
    );
  }
}

export const LockyTransparent = ({ children, enabled = true }) => (
  <div data-locky-transparent={enabled}>{children}</div>
);

LockyTransparent.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool,
};

LockyTransparent.defaultProps = {
  enabled: true,
};

export default EventLock;
