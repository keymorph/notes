import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AppToolbar from "../AppToolbar";
import NoteTimeline from "./Note/NoteTimeline";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  const [noteCollection, setNoteCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPage, setShowPage] = useState(false);

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
      .catch((err) => {
        console.log("GO BACK TO LOGIN");
        navigate("../auth", { replace: true });
        return false;
        // navigate('/auth');
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
      .then((response) => {
        console.log("RESPONSE", response);
        console.log("DATA NOTEITEM", response.data.noteItem);
        console.log("NOTEITEM", response.data.noteItem);
        const noteItem = response.data.noteItem;
        const notes = noteItem.notes;
        const categories = noteItem.categories;
        setNoteCollection(notes);
        setCategories(categories);
        console.log("NOTECOLLECTION", noteCollection);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  if (!showPage) return null;
  else
    return (
      <>
        <AppToolbar
          noteCollection={noteCollection}
          setNoteCollection={setNoteCollection}
          categories={categories}
          setCategories={setCategories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <NoteTimeline
          noteCollection={noteCollection}
          setNoteCollection={setNoteCollection}
          categories={categories}
          setCategories={setCategories}
          searchValue={searchValue}
        />
      </>
    );
}
