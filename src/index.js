import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addEvent, getHandler, removeEvent } from './utils';
import { getTouchY, handleScroll } from './handleScroll';
import { EVENTS } from './defaultEvents';
import { isInside, isInsideCurrent, isLastInGroup, shouldIgnoreEvent } from './isInside';


const groupTracker = {};

class EventLock extends Component {
  static propTypes = {
    noDefault: PropTypes.bool,
    children: PropTypes.node,
    enabled: PropTypes.bool,
    group: PropTypes.string,
    leaded: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onEscape: PropTypes.func,
    events: PropTypes.objectOf(PropTypes.oneOf([true, false, 'no-default', 'report', 'report-only'])),
    className: PropTypes.string,
    preventOnly: PropTypes.bool,
    headless: PropTypes.bool,
  };

  static defaultProps = {
    enabled: true,
    preventOnly: false,
  };

  componentDidMount() {
    const { group = '' } = this.props;
    if (!groupTracker[group]) {
      groupTracker[group] = [];
    }

    groupTracker[group].unshift(this);

    if (this.props.headless) {
      // eslint-disable-next-line
      this.setRef(ReactDOM.findDOMNode(this));
    }
    if (this.props.enabled) {
      this.enable();
    }
  }

  componentWillUnmount() {
    if (this.props.enabled) {
      this.disable();
    }
    const { group } = this.props;
    if (group) {
      groupTracker[group] = groupTracker[group].filter(x => x !== this);
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
      this.nodeEvents.push(...[
        addEvent(this.ref, 'wheel', this.scrollWheel, true),
        addEvent(this.ref, 'touchstart', this.scrollTouchStart, true),
        addEvent(this.ref, 'touchmove', this.scrollTouchMove, true),
      ]);
    }
  }

  disable() {
    this.documentEvents.forEach(removeEvent);
    this.nodeEvents.forEach(removeEvent);
  }

  setRef = (ref) => {
    this.ref = ref;
    if (ref) {
      if (!('scrollTop' in ref)) {
        // eslint-disable-next-line
        console.error('Locky: would not work for ', ref);
      }
    }
  };

  scrollWheel = event => handleScroll(this.ref, event, event.deltaY, this.props.preventOnly);
  scrollTouchStart = (event) => {
    this.touchStart = getTouchY(event);
  };
  scrollTouchMove = event => handleScroll(this.ref, event, this.touchStart - getTouchY(event), this.props.preventOnly);

  isEventInLock = event => this.ref && isInside(this.ref, event.target)

  getEventHandlers() {
    const { noDefault, events } = this.props;
    return Object.assign({}, noDefault ? {} : EVENTS, events || {});
  }

  getHandler(eventName, option) {
    const handler = getHandler(eventName, option, this.props.onEscape);
    if (handler) {
      return (event) => {
        if (shouldIgnoreEvent(event.target)) {
          return;
        }
        const { leaded, group = '' } = this.props;
        if (!isInsideCurrent(this.ref, event.target)) {
          if (
            (leaded && group && (isLastInGroup(this.ref) || groupTracker[group][0] === this)) ||
            !this.isEventInLock(event)
          ) {
            handler(event);
          }
        }
      };
    }
    return null;
  }

  render() {
    const { component, group, className } = this.props;
    const Node = component || (<div />).type;

    return this.props.headless
      ? this.props.children
      : (
        <Node ref={this.setRef} data-locky-group={group} className={className}>
          {this.props.children}
        </Node>
      );
  }
}

export const LockyTransparent = ({ children, enabled = true }) => (
  <div data-locky-transparent={enabled}>{children}</div>
);

LockyTransparent.propTypes = process.env.NODE_ENV !== 'production' ? {
  children: PropTypes.node,
  enabled: PropTypes.bool,
} : {};

LockyTransparent.defaultProps = {
  enabled: true,
};

export default EventLock;
