import React from "react";
import Note from "./Note";
import { Masonry } from "@mui/lab";
import { Typography } from "@mui/material";

export default function NoteTimeline({
  noteCollection,
  setNoteCollection,
  categories,
  searchValue,
}) {
  console.log(searchValue);
  const NoteComponents = noteCollection
    // Filter the user's note from the given search input.
    .filter((note) => {
      if (searchValue.trim() === "") {
        return true;
      } else {
        return (
          note.title.toLowerCase().includes(searchValue) ||
          note.description.toLowerCase().includes(searchValue) ||
          note.tags.includes(searchValue) ||
          // This has to be some form of sorting, based off of the categoryID and the categoryArray
          note.category.toLowerCase().includes(searchValue)
        );
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
    <Masonry
      columns={{ xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
      spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
    >
      {noteCollection.length > 0 ? (
        NoteComponents
      ) : (
        // If there are no notes, show a message. translate X
        <Typography
          variant={"h3"}
          color={"primary"}
          sx={{
            position: "relative",
            mx: "auto",
            top: "10vh",
            width: "100vw",
            textAlign: "center",
            textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            fontSize: "1.5rem",
            "@media (min-width:600px)": {
              fontSize: "2.0rem",
            },
          }}
        >
          No notes yet.
        </Typography>
      )}
    </Masonry>
  );
}
