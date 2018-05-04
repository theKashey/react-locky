const LOCKY_GROUP = 'data-locky-group';

const getAllInGroup = (node) => {
  const group = node.getAttribute(LOCKY_GROUP);
  if (group) {
    return [...document.querySelectorAll(`[${LOCKY_GROUP}="${group}"]`)];
  }
  return [node];
};

export const isInside = (ref, target) => {
  const all = getAllInGroup(ref);
  return !!all.find(node => node.contains(target));
};
