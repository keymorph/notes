/*
  /api/note/order endpoint for note collection ordering operations
*/

import {getSession} from "next-auth/react";
import notesOrderService from "../../../api/services/notes-order"; // Handle incoming requests

// Handle incoming requests
export default async function handler(req, res) {
  const session = await getSession({ req });

  // If the user is authenticated, proceed with request
  if (session) {
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
