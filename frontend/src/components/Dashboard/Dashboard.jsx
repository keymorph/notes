import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AppToolbar from "./AppToolbar";
import NotesTimeline from "./NotesTimeline";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  const [noteCollection, setNoteCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [isGettingNotes, setIsGettingNotes] = useState(true);
  // Search Bar
  const [searchValue, setSearchValue] = useState("");

  const url = "http://localhost:8000/api";

  useEffect(() => {
    async function loadDashboard() {
      const result = await verifyJWT();
      if (result) getAllNotes();
      console.log(result);
    }

    loadDashboard();
  }, []);

  const verifyJWT = async () => {
    console.log(token);

    return axios
      .get(`${url}/token`, {
        headers: {
          "auth-token": token, //the token is a variable which holds the token
        },
      })
      .then((result) => {
        console.log(result);
        console.log("VALID TOKEN AFTER RESULT");
        setShowPage(true);
        return true;
      })
      .catch(() => {
        console.log("GO BACK TO LOGIN");
        navigate("../auth", { replace: true });
        return false;
      });
  };

  const getAllNotes = () => {
    console.log("here");
    axios
      .get(`${url}/note`, {
        headers: {
          "auth-token": token, //the token is a variable which holds the token
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
    <>
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
    </>
  ) : null;
}
