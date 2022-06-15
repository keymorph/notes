import { Box, LinearProgress, Zoom } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import AppToolbar from "../components/Dashboard/AppToolbar/AppToolbar";
import FilterView from "../components/Dashboard/FilterView/FilterView";
import NotesTimeline from "../components/Dashboard/NotesTimeline/NotesTimeline";
import { getFilteredNotesCollection } from "../helpers/notes/getters";
import { getAllNotes } from "../helpers/requests/note-requests";

export default function Dashboard() {
  //#region Hooks
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  // Array of objects with all notes and categories respectively
  const [noteCollection, setNoteCollection] = useState([]);
  const [filteredNoteCollection, setFilteredNoteCollection] = useState([]);
  const [categoriesCollection, setCategoriesCollection] = useState([]);
  // These categories will be used to filter the notes
  const [filterCategories, setFilterCategories] = useState([]);

  // Search Bar
  const [searchValue, setSearchValue] = useState("");
  // Hide notes while the modal is open
  const [notesHidden, setNotesHidden] = useState(false);

  const [filterViewOpen, setFilterViewOpen] = useState(false);

  useEffect(() => {
    if (noteCollection.length !== 0) {
      setFilteredNoteCollection(
        getFilteredNotesCollection(
          noteCollection,
          categoriesCollection,
          searchValue,
          filterCategories
        )
      );
    }
  }, [noteCollection, filterCategories, searchValue, categoriesCollection]);

  // Query Handler
  const { status: noteStatus } = useQuery(["get_notes"], getAllNotes, {
    onSuccess: ({ data }) => {
      const noteItem = data.noteItem;
      // Update the state only if the user has a noteItem in the container
      // Note: new users will not have a noteItem, but it will be created when the user creates their first notes
      if (noteItem) {
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
        filterViewOpen={filterViewOpen}
        setNoteCollection={setNoteCollection}
        setCategoriesCollection={setCategoriesCollection}
        setSearchValue={setSearchValue}
        setNotesHidden={setNotesHidden}
        setFilterViewOpen={setFilterViewOpen}
      />
      <FilterView
        open={filterViewOpen}
        categoriesCollection={categoriesCollection}
      />
      <NotesTimeline
        noteCollection={noteCollection}
        filteredNoteCollection={filteredNoteCollection}
        categoriesCollection={categoriesCollection}
        notesHidden={notesHidden}
        searchValue={searchValue}
        noteStatus={noteStatus}
        setNoteCollection={setNoteCollection}
        setCategoriesCollection={setCategoriesCollection}
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
