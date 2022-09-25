/*
  /api/category endpoint for category operations
*/

import { unstable_getServerSession } from "next-auth";
import categoryService from "../../../api/services/category";
import { authOptions } from "../auth/[...nextauth]";

// Request handler function
export default async function handler(req, res) {
  // As per the Next-Auth docs, unstable_getServerSession must be used for performance reasons
  // https://next-auth.js.org/getting-started/client#getsession
  const session = await unstable_getServerSession(req, res, authOptions);

  // If the user is authenticated, proceed with request
  if (session) {
    req.headers.user_id = session.user.id;

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
