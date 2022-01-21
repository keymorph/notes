import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import NoteTimeline from "./Note/NoteTimeline";
import Note from "./Note/Note";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");

  const [notes, getNotes] = useState("");
  const [showPage, setShowPage] = useState(false);

  const url = "http://localhost:8000/api";

  useEffect( () => {
    async function loadDashboard() {
      const result = await verifyJWT();
      if (result) getAllNotes();
      console.log(result)
    }
    loadDashboard();
    
  }, []);

  const verifyJWT = async () => {
    console.log(token)

    return axios
      .get(`${url}/token`, {
         headers: {
           'auth-token': token //the token is a variable which holds the token
         }
        })
      .then((result) => {
        console.log(result)
        console.log("VALID TOKEN AFTER RESULT")
        setShowPage(true)
        return true;

      })
      .catch((err) => {
        console.log("GO BACK TO LOGIN")
        navigate("../auth", { replace: true });
        return false;
        // navigate('/auth');
      });
  };

  const getAllNotes = () => {
    console.log("here")
    axios
      .get(`${url}/note`, {
        headers: {
          'auth-token': token //the token is a variable which holds the token
        }
       })
      .then((response) => {
        
        const allNotes = response.data;
        getNotes(allNotes);
        console.log(notes)
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

// remove the token from the local storage and redirect user to login page
  const removeToken = () => {
    localStorage.removeItem("auth-token")
    navigate("../auth", { replace: true });
  }

  if (!showPage)
    return null
  else 
    return (
      <>
      <Navbar />
      <button
        onClick={removeToken}
      >
        Logout
      </button>
      <NoteTimeline notes={notes} />
      </>
    );
}