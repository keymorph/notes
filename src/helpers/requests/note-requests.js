import axios from "axios";

// Get the note item with all the notes from the database
export async function getNoteItem() {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/note`);
}

// Delete a note from the database
export async function deleteNote(data) {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    data,
  });
}

// Create a note on the database
export async function createNote(data) {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data);
}

// Update a note on the database
export async function updateNote(data) {
  return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data);
}

// Put the new notes order in the database
export async function updateNotesOrder(data) {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/note/order`,
    data
  );
}
