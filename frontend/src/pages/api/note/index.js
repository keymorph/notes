/*
  /api/note endpoint for anything note related
*/

import noteService from "../../../utils/services/note";
import authenticateToken from "../../../utils/middleware/authenticate-token";

// Handle incoming requests
export default async function handler(req, res) {
  authenticateToken(req, res);

  // If token authentication failed, return
  if (res.statusCode !== 200) return;

  switch (req.method) {
    case "GET":
      await show(req, res);
      break;
    case "POST":
      await create(req, res);
      break;
    case "PUT":
      await edit(req, res);
      break;
    case "DELETE":
      await remove(req, res);
      break;
    default:
      res.status(405).json({ error: `Method ${req.method} not allowed` });
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
