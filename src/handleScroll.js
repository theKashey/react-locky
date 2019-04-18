import { preventAll, preventDefault } from './utils';

export const getTouchY = event => event.changedTouches[0].clientY;

const elementCouldBeScrolled = node => (
  window.getComputedStyle(node).overflowY !== 'hidden'
);

export const handleScroll = (endTarget, event, sourceDelta, preventOnly = false) => {
  const delta = sourceDelta;
  // find scrollable target
  let { target } = event;

  let shouldCancelScroll = false;
  const isDeltaPositive = delta > 0;

  let availableScroll = 0;
  let availableScrollTop = 0;

  do {
    const { scrollTop, scrollHeight, clientHeight } = target;

    const elementScroll = scrollHeight - clientHeight - scrollTop;
    if (scrollTop || elementScroll) {
      if (elementCouldBeScrolled(target)) {
        availableScroll += elementScroll;
        availableScrollTop += scrollTop;
      }
    }
    target = target.parentNode;
  }
  while (endTarget.contains(target)) ;

  if (isDeltaPositive && delta > availableScroll) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && -delta > availableScrollTop) {
    shouldCancelScroll = true;
  }

  // cancel scroll
  if (shouldCancelScroll) {
    if (preventOnly) {
      preventDefault(event);
    } else {
      preventAll(event);
    }
  }
};
