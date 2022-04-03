import "dotenv/config";
import cors from "cors";
import express from "express";

import note from "./api/routes/note.js";
import user from "./api/routes/user.js";

const app = express();

const port = 8000;
const host = "localhost";
app.listen(port, host, () =>
  console.log(`✓ Back-end server running at 'http://${host}:${port}'`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow requests originating from the front-end server
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/api/", user);
app.use("/api/", note);
