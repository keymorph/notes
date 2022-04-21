import { Box, LinearProgress, Zoom } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import AppToolbar from "../components/Dashboard/AppToolbar/AppToolbar";
import NotesTimeline from "../components/Dashboard/NotesTimeline/NotesTimeline";
import { getAllNotes } from "../helpers/note-requests";

export default function Dashboard({ token }) {
  const router = useRouter();

  const [noteCollection, setNoteCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPage, setShowPage] = useState(false);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");

  const { data: noteData, status: noteStatus } = useQuery(
    "get_notes",
    getAllNotes,
    {
      onSuccess: ({ data }) => {
        const noteItem = data.noteItem;
        // Update the state only if the user has a noteItem in the container
        // Note: new users will not have a noteItem, but it will be created when the user creates their first note
        setNoteCollection(noteItem.notes.reverse()); // Reverse the note order, to show the newest first.
        setCategories(noteItem.categories);
      },
      onError: (error) => {
        console.error(error.message);
      },
      staleTime: 5 * 60 * 1000, // Stale after 5 minutes, keeps the data fresh by querying the server
    }
  );

  // Verify JWT token when component mounts
  useEffect(() => {
    const verifyToken = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          headers: {
            "auth-token": localStorage.getItem("auth-token"), // the token is a variable which holds the token
          },
        })
        .then((result) => {
          console.log(result);
          console.log("VALID TOKEN AFTER RESULT");
          setShowPage(true);
          getAllNotes();
        })
        .catch(() => {
          console.log("GO BACK TO LOGIN");
          router.replace("/auth");
        });
    };
    verifyToken();
  }, []);

  return showPage ? (
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
