/*
  /api/category endpoint for category operations
*/

import {getSession} from "next-auth/react";
import categoryService from "../../../api/services/category";

// Request handler function
export default async function handler(req, res) {
  const session = await getSession({ req });

  // If the user is authenticated, proceed with request
  if (session) {
    if (req.method === "PUT") {
      return await update(req, res);
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
  SharedComponents controllers
*/
async function update(req, res) {
  return await categoryService.update(req, res);
}
