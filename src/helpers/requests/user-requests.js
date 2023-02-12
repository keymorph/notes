import axios from "axios";

export async function registerUser(data) {
  return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, data);
}
