import React from "react";
import Note from "./Note";
import { Masonry } from "@mui/lab"

export default function NoteTimeline(props) {
  const { noteCollection } = props;
  
  const NoteComponents = noteCollection.map((note) => {
    return (
      <Note 
        key = { note._noteID }
        title = { note.title }
        description = { note.description }
        category = {note.category}
      />
    )
  })

  return (
    <Masonry columns={6} spacing={1.2}>
      {
        (noteCollection.length > 0) ? NoteComponents : <h3>No notes yet.</h3>
      }
    </Masonry>
  )
}