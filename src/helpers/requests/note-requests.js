import axios from "axios";
import { getSession } from "next-auth/react";

const session = await getSession();

// Get the note item with all the notes from the database
export async function getAllNotes() {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    headers: {
      user_id: session.user.id,
    },
  });
}

// Delete a note from the database
export async function deleteNote(data) {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    headers: {
      user_id: session.user.id,
    },
    data,
  });
}

// Create a note on the database
export async function createNote(data) {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data, {
    headers: {
      user_id: session.user.id,
    },
  });
}

// Update a note on the database
export async function updateNote(data) {
  return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data, {
    headers: {
      user_id: session.user.id,
    },
  });
}
