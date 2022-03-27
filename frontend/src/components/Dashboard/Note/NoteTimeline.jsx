import React from "react";
import Note from "./Note";
import { Masonry } from "@mui/lab";

export default function NoteTimeline({
  noteCollection,
  setNoteCollection,
  categories,
  searchValue,
}) {
  console.log(searchValue)
  const NoteComponents = noteCollection
    // Filter the user's note from the given search input.
    .filter((note) => {
      if (searchValue === "") {
        return true;
      } else {
        return note.title.toLowerCase().includes(searchValue) ||
          note.description.toLowerCase().includes(searchValue) ||
          note.tags.includes(searchValue) ||
          // This has to be some form of sorting, based off of the categoryID and the categoryArray
          note.category.toLowerCase().includes(searchValue)


        
       }
    })
    // Show the desired note components.
    .map((note, index) => {
      return (
       
        <Note
          key={note.id}
          index={index}
          noteID={note.id}
          title={note.title}
          description={note.description}
          tags={note.tags}
          categoryName={note.category}
          color={
            categories.find((category) => category.name === note.category)
              ?.color
          }
          noteCollection={noteCollection}
          setNoteCollection={setNoteCollection}
        />
        
      );
    })
    // Reverse the note order, to show the newest first.
    .reverse();

  return (
    <Masonry columns={6} spacing={1.2}>
      {noteCollection.length > 0 ? NoteComponents : <h3>No notes yet.</h3>}
    </Masonry>
  );
}
