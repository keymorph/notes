import { Box } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { useRef } from "react";
import {
  isColliding,
  mergePointIntoPosition,
  movePosition,
} from "../../../helpers/sortable";
import SortableNote from "./SortableNote";

export default function SortableNotesContainer({
  noteCollection,
  setNoteCollection,
  categories,
}) {
  //#region Hooks

  const dragConstraintRef = useRef(null);
  const positions = useRef([]);

  //#endregion

  //#region Functions

  /*
   * Store the sortable note position in the positions array.
   *
   * @param {number} index - The index of the note in the note collection
   * @param {number} position - The x and y position of the note element
   */
  const setPosition = (index, position) => {
    positions.current[index] = position;
  };

  /*
   * Handle the note movement when it is being dragged.
   * If a collision is detected, the colliding note is displaced to make room for the dragged note.
   *
   * @param {number} currentIndex - The index of the note in the positions array
   * @param {number} currentPoint - The current x and y coordinates of the note element
   */
  const moveNote = (currentIndex, currentPoint) => {
    const currentPosition = mergePointIntoPosition(
      positions.current[currentIndex],
      currentPoint
    );

    const collidingIndices = [];
    for (
      let positionIndex = 0;
      positionIndex < positions.current.length;
      positionIndex++
    ) {
      if (currentIndex === positionIndex) {
        continue;
      }
      if (isColliding(currentPosition, positions.current[positionIndex])) {
        collidingIndices.push(positionIndex);
      }
    }

    if (collidingIndices.length > 0) {
      positions.current = movePosition(
        positions.current,
        currentIndex,
        collidingIndices[0]
      );
      setNoteCollection(
        movePosition(noteCollection, currentIndex, collidingIndices[0])
      );
    }
  };

  //#endregion

  return (
    <Box
      p="1.5em"
      display="grid"
      gap="2em"
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      justifyItems="center"
    >
      <LayoutGroup>
        {noteCollection.map((note, index) => (
          <SortableNote
            key={note.id}
            note={note}
            noteIdx={index}
            dragConstraintRef={dragConstraintRef}
            moveNote={moveNote}
            setPosition={setPosition}
            noteCollection={noteCollection}
            setNoteCollection={setNoteCollection}
            categories={categories}
          />
        ))}
      </LayoutGroup>
    </Box>
  );
}
