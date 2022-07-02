import { Box, LinearProgress, Zoom } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import AppToolbar from "../components/Dashboard/AppToolbar";
import NotesTimeline from "../components/Dashboard/NotesTimeline";
import OrderFilterView from "../components/Dashboard/OrderFilterView";
import { NOTES_ORDER_BY } from "../helpers/models/note-order";
import {
  getNoteItem,
  updateNotesOrder,
} from "../helpers/requests/note-requests";

export default function Dashboard() {
  //#region Hooks
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  // Array of objects with all notes and categories respectively
  const [noteCollection, setNoteCollection] = useState([]);
  const [categoriesCollection, setCategoriesCollection] = useState([]);
  const [notesOrder, setNotesOrder] = useState({
    orderedNotesID: [],
    orderBy: NOTES_ORDER_BY.DEFAULT,
  });
  // These categories will be used to filter the notes
  const [filterCategories, setFilterCategories] = useState([]);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");
  // Hide notes while the modal is open
  const [notesHidden, setNotesHidden] = useState(false);

  const [orderFilterViewOpen, setOrderFilterViewOpen] = useState(false);

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
    enabled: sessionStatus === "authenticated", // Disable unless the user is logged in
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

  // If the user is not logged in, redirect to the login page
  if (sessionStatus === "unauthenticated") {
    router.replace("/auth");
  }

  console.info("Notes Collection: ", noteCollection);
  console.info("Categories Collection: ", categoriesCollection);

  return sessionStatus === "authenticated" ? (
    <Box>
      <AppToolbar
        noteCollection={noteCollection}
        categoriesCollection={categoriesCollection}
        searchValue={searchValue}
        noteStatus={noteStatus}
        orderFilterViewOpen={orderFilterViewOpen}
        setNoteCollection={setNoteCollection}
        setCategoriesCollection={setCategoriesCollection}
        setSearchValue={setSearchValue}
        setNotesHidden={setNotesHidden}
        setOrderFilterViewOpen={setOrderFilterViewOpen}
      />
      {orderFilterViewOpen && (
        <OrderFilterView
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
        notesHidden={notesHidden}
        searchValue={searchValue}
        noteStatus={noteStatus}
        setNoteCollection={setNoteCollection}
        setCategoriesCollection={setCategoriesCollection}
        setNotesOrder={setNotesOrder}
        setNotesHidden={setNotesHidden}
      />
    </Box>
  ) : (
    // While the user is being authenticated, show a loading indicator
    <Zoom in>
      <Box width={"100%"}>
        <LinearProgress />
      </Box>
    </Zoom>
  );
}

// Get user session from the server-side
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { session } };
}
