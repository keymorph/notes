function getBoundsWithoutTransform(element) {
  const transform = element.style.transform;
  element.style.transform = "";
  const bounds = element.getBoundingClientRect();
  element.style.transform = transform;
  return bounds;
}

export function getBox(node) {
  const bounds = getBoundsWithoutTransform(node);
  return {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
  };
}

// Has source.x, source.y, source.width, source.height, target.x, target.y, target.width, target.height
export function isColliding(source, sample) {
  return (
    source.x < sample.x + sample.width &&
    source.x + source.width > sample.x &&
    source.y < sample.y + sample.height &&
    source.height + source.y > sample.y
  );
}

export function mergePointIntoPosition(position, point) {
  return {
    ...position,
    x: position.x + point.x,
    y: position.y + point.y,
  };
}

export function swapPosition(array, indexA, indexB) {
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
  return array;
}
