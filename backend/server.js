import "dotenv/config";
import express from "express";
import cors from "cors";

import note from "./api/routes/note.js";
import user from "./api/routes/user.js";

const app = express();

// Send CORS headers to the front-end
app.use(cors({ origin: process.env.FRONTEND_URL, optionsSuccessStatus: 200 }));

// Parse incoming front-end requests as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/", user);
app.use("/api/", note);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`✓ Back-end server running on port ${port}`)
);
