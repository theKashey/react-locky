const LOCKY_GROUP = 'data-locky-group';
const LOCKY_TRANSPARENT = 'data-locky-transparent';

const toArray = (a) => {
  const ret = Array(a.length);
  for (let i = 0; i < a.length; ++i) {
    ret[i] = a[i];
  }
  return ret;
};

const getAllInGroup = (node) => {
  const group = node.getAttribute(LOCKY_GROUP);
  if (group) {
    return toArray(document.querySelectorAll(`[${LOCKY_GROUP}="${group}"]`));
  }
  return [node];
};

export const isInside = (ref, target) => {
  const all = getAllInGroup(ref);
  return !!all.find(node => node.contains(target));
};

export const isInsideCurrent = (ref, target) => ref.contains(target);

export const isLastInGroup = (ref) => {
  const refs = getAllInGroup(ref);
  return refs[refs.length - 1] === ref;
};

export const shouldIgnoreEvent = (eventNode) => {
  const freeNodes = toArray(document.querySelectorAll(`[${LOCKY_TRANSPARENT}="true"]`));
  return freeNodes.some(node => node.contains(eventNode));
};
