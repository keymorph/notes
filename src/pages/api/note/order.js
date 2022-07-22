/*
  /api/note/order endpoint for note collection ordering operations
*/

import {unstable_getServerSession} from "next-auth";
import notesOrderService from "../../../api/services/notes-order"; // Handle incoming requests

// Handle incoming requests
export default async function handler(req, res) {
  // As per the Next-Auth docs, unstable_getServerSession must be used for performance reasons
  // https://next-auth.js.org/getting-started/client#getsession
  const session = await unstable_getServerSession(req);

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
