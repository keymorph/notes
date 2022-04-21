import axios from "axios";

// Get the note item with all the notes from the database
export async function getAllNotes() {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"), //the token is a variable which holds the token
    },
  });
}

// Delete a note from the database
export async function deleteNote(data) {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
    data: data,
  });
}

// Create a note on the database
export async function createNote(data) {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
}

// Update a note on the database
export async function updateNote(data) {
  return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data, {
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
}
