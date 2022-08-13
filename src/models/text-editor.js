export const EDITOR_NODES = {
  HEADING: "heading",
};
export const EDITOR_MARKS = {
  BOLD: "bold",
  ITALIC: "italic",
  CODE: "codeBlock",
};
const DISABLED_EDITOR_MARKS = {
  CODE: [EDITOR_MARKS.BOLD, EDITOR_MARKS.ITALIC],
};

/**
 * Returns a list of active marks from the editor state based on the defined marks in model
 *
 * @param editor - The editor state
 * @return {(string)[]} - list of active marks
 */
export function getActiveEditorMarks(editor) {
  // Editor marks is an object, iterate through it
  // and return an array of active marks
  return Object.entries(EDITOR_MARKS)
    .filter(([key, mark]) => editor.isActive(mark))
    .map(([key, mark]) => mark);
}

/**
 * Returns a list of active nodes from the editor state based on the defined nodes in model
 *
 * @param editor - The editor state
 * @return {(string)[]} - list of active nodes
 */
export function getActiveEditorNodes(editor) {
  //TODO
  return [];
}

/**
 * Returns a list of disabled marks based on the active marks in the editor state
 *
 * @param editor - The editor state
 * @return {(string)[]} - list of disabled marks
 */
export function getDisabledEditorMarks(editor) {
  // TODO
  return [];
}
