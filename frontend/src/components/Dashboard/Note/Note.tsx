import { useState } from "react";
import "../../../styles/note.scss";
import editIcon from "../../../images/edit-icon.svg";
import axios from "axios";

function Note() {
  const getNotes = async () => {
    axios
      .get("http://localhost:5000/api/showNotes")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [hover, setHover] = useState(false);

  return (
    <div
      className="NoteCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="priority"></div>
      <h3 className="title">Note Title</h3>
      <div className="noteText">
        <p>
          LLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
          facilisis lectus, ut egestas lorem facilisis sed. Sed sed magna nec
          orci euismod imperdiet utnec arcu. Cras consequat, est non molestie
          exlac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          auctor facilisis lectus, ut egestas lorem facilisis sed. Sed sed magna
          nec orci euismod imperdiet utnec arcu. Cras consequat, est non
          molestie exlac. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Donec auctor facilisis lectus, ut egestas lorem facilisis sed.
          Sed sed magna nec orci euismod imperdiet utnec arcu. Cras consequat,
          est non molestie exlac.
        </p>
      </div>
      <div>
        <img
          className="editNote"
          src={editIcon}
          style={{ opacity: hover ? 1 : 0.5 }}
        />
      </div>
    </div>
  );
}

export default Note;
