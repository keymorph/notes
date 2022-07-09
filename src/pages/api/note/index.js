/*
  /api/note endpoint for anything note related
*/

import {getSession} from "next-auth/react";
import noteService from "../../../api/services/note"; // Handle incoming requests

// Handle incoming requests
export default async function handler(req, res) {
  const session = await getSession({ req });

  // If the user is authenticated, proceed with request
  if (session) {
    if (req.method === "GET") {
      return await show(req, res);
    } else if (req.method === "POST") {
      return await create(req, res);
    } else if (req.method === "PUT") {
      return await edit(req, res);
    } else if (req.method === "DELETE") {
      return await remove(req, res);
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
  Note controllers
*/
async function create(req, res) {
  return await noteService.create(req, res);
}

async function show(req, res) {
  return await noteService.show(req, res);
}

async function edit(req, res) {
  return await noteService.edit(req, res);
}

async function remove(req, res) {
  return await noteService.remove(req, res);
}
