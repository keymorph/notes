// Get the dimensions of the item without taking into account transforms
function getBoundsWithoutTransform(element) {
  const transform = element.style.transform;
  element.style.transform = "";
  const bounds = element.getBoundingClientRect();
  element.style.transform = transform;
  return bounds;
}

// Get the item's dimensions
export function getBox(node) {
  const bounds = getBoundsWithoutTransform(node);
  return {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
  };
}

// Detect if the item is colliding
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

// Array displacement logic for dragging an item
// Displaces all the items at or above the colliding item's index by 1 to make room and move the dragged item
export function movePosition(array, indexA, indexB) {
  const displaced = array.splice(indexA, 1);
  array.splice(indexB, 0, ...displaced);
  return array;
}
