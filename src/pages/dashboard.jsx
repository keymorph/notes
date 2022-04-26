import { Box, LinearProgress, Zoom } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import AppToolbar from "../components/Dashboard/AppToolbar/AppToolbar";
import NotesTimeline from "../components/Dashboard/NotesTimeline/NotesTimeline";
import { getAllNotes } from "../helpers/requests/note-requests";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  // If the user is not logged in, redirect to the login page
  if (!session && sessionStatus !== "loading") {
    router.replace("/auth");
  }

  console.log(session);

  const [noteCollection, setNoteCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");

  // Query Handler
  const { data: noteData, status: noteStatus } = useQuery(
    ["get_notes"],
    getAllNotes,
    {
      onSuccess: ({ data }) => {
        const noteItem = data.noteItem;
        // Update the state only if the user has a noteItem in the container
        // Note: new users will not have a noteItem, but it will be created when the user creates their first note
        if (noteItem) {
          setNoteCollection(noteItem.notes.reverse()); // Reverse the note order, to show the newest first.
          setCategories(noteItem.categories);
        }
      },
      onError: (error) => {
        console.error(error.message);
      },
      staleTime: 5 * 60 * 1000, // Stale after 5 minutes, keeps the data fresh by fetching from the server
    }
  );

  return sessionStatus === "authenticated" ? (
    <Box>
      <AppToolbar
        noteCollection={noteCollection}
        setNoteCollection={setNoteCollection}
        categories={categories}
        setCategories={setCategories}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <NotesTimeline
        noteCollection={noteCollection}
        setNoteCollection={setNoteCollection}
        categories={categories}
        setCategories={setCategories}
        searchValue={searchValue}
        noteStatus={noteStatus}
      />
    </Box>
  ) : (
    // While the user is being authenticated, show a loading indicator
    <Zoom in>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </Zoom>
  );
}
