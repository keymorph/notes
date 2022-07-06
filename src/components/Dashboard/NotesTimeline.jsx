import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Box, Grow, LinearProgress, Typography, Zoom } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NOTES_ORDER_BY } from "../../helpers/models/note-order";
import {
  getCategoryColorName,
  getCategoryName,
} from "../../helpers/notes/category";
import { getFilteredNotesCollection } from "../../helpers/notes/filter";
import {
  getOrderedNotesCollection,
  swapOrderedNotesID,
} from "../../helpers/notes/order";
import { spring } from "../../styles/animations/definitions";
import SortableNote from "./NotesTimeline/SortableNote";

export default function NotesTimeline({
  noteCollection,
  categoriesCollection,
  notesOrder,
  filterCategories,
  searchValue,
  noteStatus,
  setNoteCollection,
  setCategoriesCollection,
  setNotesOrder,
}) {
  //#region Hooks
  const [noNotesDisplayed, setNoNotesDisplayed] = useState(false);

  const [activeId, setActiveId] = useState(null); // activeId used to track the active note being dragged
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2, // Distance, in pixels, that the note must be dragged before it is considered active
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5, // Distance, in pixels, of motion that is tolerated before the drag operation is aborted
      },
    })
  );
  //#endregion

  //#region Handlers
  // Sets the active note id when a note is being dragged
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Swap the note indexes when a note is dropped after being dragged
  const handleDragEnd = ({ active, over }) => {
    // over is null when the note is dropped onto itself
    // Therefore, if over is null nothing needs to be done
    if (over && active.id !== over.id) {
      setNotesOrder((prev) => {
        const oldIndex = active.data.current.sortable.index;
        const newIndex = over.data.current.sortable.index;

        const newOrderedNotesID = swapOrderedNotesID(
          orderedNotesCollection,
          prev.orderedNotesID,
          "custom",
          oldIndex,
          newIndex
        );

        return {
          orderedNotesID: newOrderedNotesID,
          orderBy: NOTES_ORDER_BY.CUSTOM,
        };
      });
    }
    setActiveId(null);
  };
  //#endregion

  const draggedNote = noteCollection.find((note) => note.id === activeId);
  const isFiltering = filterCategories.length !== categoriesCollection.length;

  // Order and filter notes
  const orderedNotesCollection = getOrderedNotesCollection(
    noteCollection,
    categoriesCollection,
    notesOrder.orderedNotesID,
    notesOrder.orderBy
  );
  const filteredNotesCollection = getFilteredNotesCollection(
    orderedNotesCollection,
    categoriesCollection,
    searchValue,
    filterCategories
  );

  // If there are no searched categories, delay the display of the no categories message to avoid flicker
  if (filteredNotesCollection.length === 0 && !noNotesDisplayed) {
    setTimeout(() => {
      setNoNotesDisplayed(true);
    }, 400);
  } else if (filteredNotesCollection.length > 0 && noNotesDisplayed) {
    setNoNotesDisplayed(false);
  }

  return noteStatus === "loading" ? (
    <Zoom in>
      <Box width={"100%"}>
        <LinearProgress />
      </Box>
    </Zoom>
  ) : noteCollection.length > 0 ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      autoScroll
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext
        items={filteredNotesCollection}
        strategy={rectSortingStrategy}
      >
        {/*<DragOverlay>*/}
        {/*  {activeId ? (*/}
        {/*    <NoteDragOverlay*/}
        {/*      title={draggedNote.title}*/}
        {/*      description={draggedNote.description}*/}
        {/*      tags={draggedNote.tags}*/}
        {/*      categoryName={draggedNote.category}*/}
        {/*      color={*/}
        {/*        categoriesCollection.find(*/}
        {/*          (category) => category.name === draggedNote.category*/}
        {/*        )?.color*/}
        {/*      }*/}
        {/*    />*/}
        {/*  ) : null}*/}
        {/*</DragOverlay>*/}
        <Box
          p="1rem"
          display="grid"
          gap="2rem"
          gridTemplateColumns="repeat(auto-fill, minmax(20rem, 1fr))"
          justifyItems="center"
        >
          {/* AnimatePresence allows Components to animate out when they're removed from the React tree */}
          <AnimatePresence>
            {filteredNotesCollection.map((note, index) => (
              <SortableNote
                key={note.id}
                noteID={note.id}
                isDraggingMode={!!activeId} // If activeId is set, a note is being dragged
                index={index}
                title={note.title}
                description={note.description}
                tags={note.tags}
                categoryName={getCategoryName(
                  note.category_id,
                  categoriesCollection
                )}
                categoryColor={getCategoryColorName(
                  note.category_id,
                  categoriesCollection
                )}
                searchValue={searchValue}
                noteCollection={noteCollection}
                categoriesCollection={categoriesCollection}
                setNoteCollection={setNoteCollection}
                setCategoriesCollection={setCategoriesCollection}
              />
            ))}
          </AnimatePresence>
        </Box>
        {/*  If filtered notes is 0, display no notes found message */}
        {noNotesDisplayed && (
          <motion.div layout transition={spring}>
            <Grow in>
              <Typography textAlign={"center"} variant="h5">
                No notes found...
              </Typography>
            </Grow>
          </motion.div>
        )}
      </SortableContext>
    </DndContext>
  ) : (
    // If no notes, display no notes message
    <motion.div layout transition={spring}>
      <Grow in>
        <Typography variant={"h5"} textAlign={"center"}>
          No notes yet.
        </Typography>
      </Grow>
    </motion.div>
  );
}
