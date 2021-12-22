<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import NoteTimeline from "../../Components/Note/NoteTimeline";
=======
import React, {useEffect, useState} from "react";
>>>>>>> 33a9569933147e272db2ee8b84f75eb25aeec2f9
import Note from "../../Components/Note/Note";
import axios from 'axios';

<<<<<<< HEAD
export default function Dashboard() {
  const [notes, getNotes] = useState('');

  const url = 'http://localhost:5000/';

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = () => {
    axios.get(`${url}showNotes`)
    .then((response) => {
      const allNotes = response.data.notes.allNotes;
      getNotes(allNotes);
    })
    .catch(error => console.error(`Error: ${error}`));
  }
  return(
    <NoteTimeline notes={notes}/>
  )
}
=======
function Dashboard () {
    
      
  
    useEffect(()=>{
        axios.get(
            "http://localhost:5000/api/showNotes"
          ).then((res) => {
              console.log(res)
          }).catch((error) => {
            console.log(error);
          }); 
    }, [])
      
    
    
    return(
        <div>
            
            <Note/>
        </div>
    )
}

export default Dashboard;
>>>>>>> 33a9569933147e272db2ee8b84f75eb25aeec2f9
