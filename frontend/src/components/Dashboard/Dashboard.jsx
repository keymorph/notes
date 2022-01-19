import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NoteTimeline from "./Note/NoteTimeline";
import Note from "./Note/Note";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [notes, getNotes] = useState("");
  const [showPage, setShowPage] = useState(false);

  const url = "http://localhost:8000/api";

  useEffect(() => {
    verifyJWT();
    // getAllNotes();
  }, []);

  const verifyJWT = () => {

    const token = localStorage.getItem("auth-token")
    console.log(token)

//     axios.get('https://example.com/getSomething', {
//  headers: {
//    Authorization: 'Bearer ' + token //the token is a variable which holds the token
//  }
// })

    axios
      .get(`${url}/token`, {
         headers: {
           'auth-token': token //the token is a variable which holds the token
         }
        })
      .then((result) => {
        console.log(result)
        console.log("VALID TOKEN AFTER RESULT")
        setShowPage(true)
      })
      .catch((err) => {
        console.log("GO BACK TO LOGIN")
        navigate("../auth", { replace: true });
        // navigate('/auth');
      });
  };

  // const getAllNotes = () => {
  //   axios
  //     .get(`${url}/note`)
  //     .then((response) => {
  //       const allNotes = response.data.notes.allNotes;
  //       getNotes(allNotes);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };
  const removeToken = () => {
    localStorage.removeItem("auth-token")
    navigate("../auth", { replace: true });
  }

  // remove the token from the local storage
  // REFRESH/"PUSH" -> go to /auth

  if (!showPage)
    return null
  else 
    return (
      <>
        <button
          onClick={removeToken}
        >
          Logout
        </button>
        <NoteTimeline notes={notes} />
      </>
    );
}
