import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppToolbar from "../components/Dashboard/AppToolbar";
import NotesTimeline from "../components/Dashboard/NotesTimeline";
import OrderFilterDropdown from "../components/Dashboard/OrderFilterDropdown";
import { NOTES_ORDER_BY } from "../helpers/models/note-order";
import {
  getNoteItem,
  updateNotesOrder,
} from "../helpers/requests/note-requests";

export default function Dashboard() {
  //#region Hooks
  const router = useRouter();

  // Array of objects with all notes and categories respectively
  const [noteCollection, setNoteCollection] = useState([]);
  const [categoriesCollection, setCategoriesCollection] = useState([]);
  const [notesOrder, setNotesOrder] = useState({
    orderedNotesID: [],
    orderBy: NOTES_ORDER_BY.DEFAULT,
  });
  // These categories will be used to filter the notes. If empty, no category filter will be applied
  const [filterCategories, setFilterCategories] = useState([]);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");

  const [orderFilterDropdownOpen, setOrderFilterDropdownOpen] = useState(false);

  useEffect(() => {
    mutateOrder({ notesOrder });
  }, [notesOrder]);

  //#region Query Handling Hooks
  const { status: noteStatus } = useQuery(["get_note_item"], getNoteItem, {
    onSuccess: ({ data }) => {
      const noteItem = data.noteItem;
      // Update the state only if the user has a noteItem in the container
      // Note: new users will not have a noteItem, but it will be created when the user creates their first notes
      if (noteItem) {
        setNotesOrder({
          orderedNotesID: noteItem.notes_order?.ordered_notes_id || [],
          orderBy: noteItem.notes_order?.order_by || NOTES_ORDER_BY.DEFAULT,
        });
        setNoteCollection(noteItem.notes.reverse()); // Reverse the notes order, to show the newest first.
        setCategoriesCollection(noteItem.categories);
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
    staleTime: 5 * 60 * 1000, // Stale after 5 minutes, keeps the data fresh by fetching from the server
  });

  // Changes and gets the order of notes in the database
  const { mutate: mutateOrder, status: orderStatus } = useMutation(
    updateNotesOrder,
    {
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
  //#endregion
  //#endregion

  console.info("Notes Collection: ", noteCollection);
  console.info("Categories Collection: ", categoriesCollection);

  return (
    <Box>
      <AppToolbar
        noteCollection={noteCollection}
        categoriesCollection={categoriesCollection}
        filterCategories={filterCategories}
        searchValue={searchValue}
        noteStatus={noteStatus}
        orderFilterDropdownOpen={orderFilterDropdownOpen}
        setNoteCollection={setNoteCollection}
        setCategoriesCollection={setCategoriesCollection}
        setSearchValue={setSearchValue}
        setOrderFilterViewOpen={setOrderFilterDropdownOpen}
      />
      {orderFilterDropdownOpen && (
        <OrderFilterDropdown
          notesOrder={notesOrder}
          categoriesCollection={categoriesCollection}
          filterCategories={filterCategories}
          setNotesOrder={setNotesOrder}
          setFilterCategories={setFilterCategories}
        />
      )}
      <NotesTimeline
        noteCollection={noteCollection}
        categoriesCollection={categoriesCollection}
        notesOrder={notesOrder}
        filterCategories={filterCategories}
        searchValue={searchValue}
        noteStatus={noteStatus}
        setNoteCollection={setNoteCollection}
        setCategoriesCollection={setCategoriesCollection}
        setNotesOrder={setNotesOrder}
      />
    </Box>
  );
}
