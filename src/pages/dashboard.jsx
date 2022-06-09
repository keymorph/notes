import { Box, LinearProgress, Zoom } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import AppToolbar from "../components/Dashboard/AppToolbar/AppToolbar";
import NotesTimeline from "../components/Dashboard/NotesTimeline/NotesTimeline";
import { getAllNotes } from "../helpers/requests/note-requests";

export default function Dashboard() {
  //#region Hooks
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  console.log("session", session);

  const [noteCollection, setNoteCollection] = useState([]);
  const [categoriesCollection, setCategoriesCollection] = useState([]);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");
  const [notesHidden, setNotesHidden] = useState(false);

  // Query Handler
  const { status: noteStatus } = useQuery(["get_notes"], getAllNotes, {
    onSuccess: ({ data }) => {
      const noteItem = data.noteItem;
      // Update the state only if the user has a noteItem in the container
      // Note: new users will not have a noteItem, but it will be created when the user creates their first note
      if (noteItem) {
        setNoteCollection(noteItem.notes.reverse()); // Reverse the note order, to show the newest first.
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

  console.info("Note Collection: ", noteCollection);
  console.info("Categories: ", categoriesCollection);

  return sessionStatus === "authenticated" ? (
    <Box>
      <AppToolbar
        noteCollection={noteCollection}
        setNoteCollection={setNoteCollection}
        categoriesCollection={categoriesCollection}
        setCategoriesCollection={setCategoriesCollection}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setNotesHidden={setNotesHidden}
        noteStatus={noteStatus}
      />
      <NotesTimeline
        noteCollection={noteCollection}
        setNoteCollection={setNoteCollection}
        categoriesCollection={categoriesCollection}
        setCategoriesCollection={setCategoriesCollection}
        notesHidden={notesHidden}
        setNotesHidden={setNotesHidden}
        searchValue={searchValue}
        noteStatus={noteStatus}
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
