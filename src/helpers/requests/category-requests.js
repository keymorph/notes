import axios from "axios";
import { getSession } from "next-auth/react";

const session = await getSession();

// Get the note item with all the notes from the database
export async function updateCategories(data) {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
    data,
    {
      headers: {
        user_id: session.user.id,
      },
    }
  );
}
