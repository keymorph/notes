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

export function isColliding(source, sample, threshold = 0.5) {
  return (
    source.x < sample.x + sample.width - threshold * sample.width && // left side
    source.x + source.width > sample.x + threshold * sample.width && // right side
    source.y < sample.y + sample.height - threshold * sample.height && // top side
    source.y + source.height > sample.y + threshold * sample.height // bottom side
  );
}

export function mergePointIntoPosition(position, point) {
  return {
    ...position,
    x: point.x - position.width / 2,
    y: point.y - position.height / 2,
  };
}

// Array move logic for dragging a note
export function movePosition(array, indexA, indexB) {
  const displaced = array.splice(indexA, 1);
  array.splice(indexB, 0, ...displaced);
  return array;
}
