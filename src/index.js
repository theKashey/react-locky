import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addEvent, getHandler } from './utils';
import { getTouchY, handleScroll } from './handleScroll';
import { EVENTS } from './defaultEvents';

class EventLock extends Component {
  static propTypes = {
    noDefault: PropTypes.bool,
    children: PropTypes.node,
    enabled: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onEscape: PropTypes.func,
    events: PropTypes.objectOf(PropTypes.oneOf([true, false, 'no-default', 'report'])),
  };

  static defaultProps = {
    enabled: true,
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
      .map(event => addEvent(document, event, this.getHandler(event, handlers[event])))
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
    this.documentEvents.forEach(({ event, handler }) => document.removeEventListener(event, handler, true));
    this.nodeEvents.forEach(({ event, handler }) => this.ref.removeEventListener(event, handler));
  }

  setRef = (ref) => {
    this.ref = ref;
  };

  scrollWheel = event => handleScroll(this.ref, event, event.deltaY);
  scrollTouchStart = (event) => {
    this.touchStart = getTouchY(event);
  };
  scrollTouchMove = event => handleScroll(this.ref, event, this.touchStart - getTouchY(event));

  isEventInLock = event => this.ref === event.target || this.ref.contains(event.target);

  getEventHandlers() {
    const { noDefault, events } = this.props;
    return Object.assign({}, noDefault ? {} : EVENTS, events || {});
  }

  getHandler(eventName, option) {
    const handler = getHandler(eventName, option, this.props.onEscape);
    if (handler) {
      return (event) => {
        if (!this.isEventInLock(event)) {
          handler(event);
        }
      };
    }
    return null;
  }

  render() {
    const Node = this.props.component || (<div />).type;
    return (
      <Node ref={this.setRef}>
        {this.props.children}
      </Node>
    );
  }
}

export default EventLock;
