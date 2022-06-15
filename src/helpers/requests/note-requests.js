import axios from "axios";
import { getSession } from "next-auth/react";

const session = await getSession();

// Get the notes item with all the notes from the database
export async function getAllNotes() {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    headers: {
      user_id: session.user.id,
    },
  });
}

// Delete a notes from the database
export async function deleteNote(data) {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
    headers: {
      user_id: session.user.id,
    },
    data,
  });
}

// Create a notes on the database
export async function createNote(data) {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data, {
    headers: {
      user_id: session.user.id,
    },
  });
}

// Update a notes on the database
export async function updateNote(data) {
  return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, data, {
    headers: {
      user_id: session.user.id,
    },
  });
}
