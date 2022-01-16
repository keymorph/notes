import React from "react";
import Note from "./Note";

export default function NoteTimeline(props: any) {
  const displayNotes = (props: any) => {
    const { notes } = props;

    if (notes.length > 0) {
      return notes.map((note: any) => {
        console.log(note);
        return (
          <div className="note" key={note._noteID}>
            <h3 className="note__title">{note.title}</h3>
            <p className="note__body">{note.content}</p>
          </div>
        );
      });
    } else {
      return <h3>No notes yet.</h3>;
    }
  };
  return <>{displayNotes(props)}</>;
}
