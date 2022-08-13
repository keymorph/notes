import axios from "axios";

// Get the note item with all the notes from the database
export async function updateCategories(data) {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
    data
  );
}
