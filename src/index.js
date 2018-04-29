import React, {Component} from 'react';
import PropTypes from 'prop-types';

const EVENTS = {
  click: 'report',
  mousemove: true,
  mousedown: 'report',
  touchmove: true,
  touchstart: 'report',
  keydown: true,
  change: false,
  scroll: true,
  wheel: true,
};

const preventAll = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const preventDefault = (event) => {
  event.preventDefault();
};

const preventPropagation = (event) => {
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const report = callback => (event) => {
  preventAll(event);
  if (callback) {
    callback(event);
  }
};

const getHandler = (event, option, callback) => {
  if (!option) {
    return null;
  }

  if (option === 'no-default') {
    return preventDefault;
  }

  if (option === 'report') {
    return report(callback);
  }

  return preventAll;
};

const getTouchY = event => event.changedTouches[0].clientY;

const handleScroll = (endTarget, event, sourceDelta) => {
  const delta = sourceDelta;
  // find scrollable target
  let target = event.target;

  let shouldCancelScroll = false;
  const isDeltaPositive = delta > 0;

  let availableScroll = 0;
  let availableScrollTop = 0;

  do {
    const {scrollTop, scrollHeight, clientHeight} = target;

    availableScroll += scrollHeight - clientHeight - scrollTop;
    availableScrollTop += scrollTop;

    target = target.parentNode;
  } while (endTarget.contains(target));

  if (isDeltaPositive && delta > availableScroll) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && -delta > availableScrollTop) {
    shouldCancelScroll = true;
  }

  // cancel scroll
  if (shouldCancelScroll) {
    preventAll(event);
  }
};

const addEvent = (target, event, handler, capture) =>
  handler && ({event, handler: target.addEventListener(event, handler, capture)});

class EventLock extends Component {
  static propTypes = {
    noDefault: PropTypes.bool,
    children: PropTypes.node,
    enabled: PropTypes.bool,
    component: PropTypes.func,
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
      .map((event) => addEvent(document, event, this.getHandler(event, handlers[event])))
      .filter(x => x);

    this.nodeEvents = [];
    if (handlers.scroll) {
      this.nodeEvents.push(
        ...[
          addEvent(this.ref, 'wheel', this.scrollWheel, true),
          addEvent(this.ref, 'touchstart', this.scrollTouchStart, true),
          addEvent(this.ref, 'touchmove', this.scrollTouchMove, true),
        ]
      );
    }
  }

  disable() {
    this.documentEvents.forEach(({event, handler}) => document.removeEventListener(event, handler, true));
    this.nodeEvents.forEach(({event, handler}) => this.ref.removeEventListener(event, handler));
  }

  setRef = (ref) => {
    this.ref = ref;
  };

  scrollWheel = event => handleScroll(this.ref, event, event.deltaY);
  scrollTouchStart = (event) => {
    this.touchStart = getTouchY(event);
  }
  scrollTouchMove = event => handleScroll(this.ref, event, this.touchStart - getTouchY(event));

  isEventInLock = event => this.ref === event.target || this.ref.contains(event.target);

  getEventHandlers() {
    const {noDefault, events} = this.props;
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
    const Node = this.props.component || (<div/>).type;
    return (
      <Node ref={this.setRef}>
        {this.props.children}
      </Node>
    );
  }
}

export default EventLock;
