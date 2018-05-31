export const preventAll = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const preventDefault = (event) => {
  event.preventDefault();
};

const report = callback => (event) => {
  preventAll(event);
  if (callback) {
    callback(event);
  }
};

const reportOnly = callback => (event) => {
  if (callback) {
    callback(event);
  }
};

export const getHandler = (event, option, callback) => {
  if (!option) {
    return null;
  }

  if (option === 'no-default') {
    return preventDefault;
  }

  if (option === 'report') {
    return report(callback);
  }

  if (option === 'report-only') {
    return reportOnly(callback);
  }

  return preventAll;
};


export const addEvent = (target, event, handler, capture) =>
  handler && ({
    target,
    event,
    handler: (target.addEventListener(event, handler, capture), handler),
    capture,
  });


export const removeEvent = ({ target, event, handler, capture }) => target.removeEventListener(event, handler, capture);
