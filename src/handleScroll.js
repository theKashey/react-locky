import { preventAll } from './utils';

export const getTouchY = event => event.changedTouches[0].clientY;

export const handleScroll = (endTarget, event, sourceDelta) => {
  const delta = sourceDelta;
  // find scrollable target
  let target = event.target;

  let shouldCancelScroll = false;
  const isDeltaPositive = delta > 0;

  let availableScroll = 0;
  let availableScrollTop = 0;

  do {
    const { scrollTop, scrollHeight, clientHeight } = target;

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
