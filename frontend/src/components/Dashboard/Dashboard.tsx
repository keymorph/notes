/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import NoteTimeline from "./Note/NoteTimeline";
// import Note from "./Note/Note";
import axios from "axios";

export default function Dashboard() {
  const [notes, getNotes] = useState("");

  const url = "http://localhost:5000";

  useEffect(() => {
    verifyJWT();
    getAllNotes();
  }, []);

  const verifyJWT = () => {
    axios
      .post(`${url}/token`)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((_result) => {})
      .catch((_err) => {
        // history.push("/login");
      });
  };

  const getAllNotes = () => {
    axios
      .get(`${url}showNotes`)
      .then((response) => {
        const allNotes = response.data.notes.allNotes;
        getNotes(allNotes);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  return <NoteTimeline notes={notes} />;
}
