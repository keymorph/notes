import axios from "axios";

export async function registerUser(data) {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, data);
}

export async function loginUser(data) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback/credentials`,
    data
  );
}
