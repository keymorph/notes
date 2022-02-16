import React from "react";
import Note from "./Note";
import { Masonry } from "@mui/lab"
import { useEffect } from "react";

export default function NoteTimeline({ noteCollection, setNoteCollection, searchValue }) {

  const NoteComponents = noteCollection
    // Filter the user's note from the given search input.
    .filter((note) => {
      if (searchValue === '') {
        return true;
      } else {
        if (
          note.title.includes(`${searchValue}`) ||
          note.description.includes(`${searchValue}`) ||
          note.tags.includes(`${searchValue}`) ||

          // This has to be some form of sorting, based off of the categoryID and the categoryArray
          note.category.includes(`${searchValue}`)
        ) {
          return true;
        } else {
          return false;
        }
      }
    })
    // Reverse the note order, to show the newest first.
    .reverse()
    // Show the desired note components.
    .map((note, index) => {
      return (
        <Note
          key={note.noteID}
          index={index}
          noteID={note.noteID}
          title={note.title}
          description={note.description}
          category={note.category}
          noteCollection={noteCollection}
          setNoteCollection={setNoteCollection}
        />
      )
    });

  return (
    <Masonry columns={6} spacing={1.2}>
      {
        (noteCollection.length > 0) ? NoteComponents : <h3>No notes yet.</h3>
      }
    </Masonry>
  )
}