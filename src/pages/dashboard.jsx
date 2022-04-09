import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppToolbar from "../components/Dashboard/AppToolbar/AppToolbar";
import NotesTimeline from "../components/Dashboard/NotesTimeline/NotesTimeline";
import axios from "axios";
import { Box, LinearProgress, Zoom } from "@mui/material";

export default function Dashboard({ token }) {
  const router = useRouter();

  const [noteCollection, setNoteCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [isGettingNotes, setIsGettingNotes] = useState(true);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");

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

  // Get the note item from the database
  const getAllNotes = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"), //the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        // Update the state only if the user has a noteItem in the container
        // Note: new users will not have a noteItem, but it will be created when the user creates their first note
        if (data.noteItem !== undefined) {
          setNoteCollection(data.noteItem.notes.reverse()); // Reverse the note order, to show the newest first.
          setCategories(data.noteItem.categories);
        }
        setIsGettingNotes(false);
        console.log("NoteITEM: ", data.noteItem);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

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
        isGettingNotes={isGettingNotes}
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
