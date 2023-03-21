/*
  /server/note/order endpoint for note collection ordering operations
*/
import { getServerSession } from "next-auth"; // Handle incoming requests

import notesOrderService from "../../../server/services/notes-order";
import { authOptions } from "../auth/[...nextauth]"; // Handle incoming requests

// Handle incoming requests
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // If the user is authenticated, proceed with request
  if (session) {
    req.headers.user_id = session.user.id;

    if (req.method === "PUT") {
      return await replace(req, res);
    } else {
      return res
        .status(405)
        .json({ error: `Method ${req.method} not allowed` });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

/*
  Order controllers
*/
async function replace(req, res) {
  return await notesOrderService.replace(req, res);
}
