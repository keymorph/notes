const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const connection = require("../models/connection");
const noteControllers = require("../controllers/noteControllers");

// Create a note
router.post("/note", verifyToken, noteControllers.create);

// Show all of the user's notes
router.get("/note", verifyToken, noteControllers.show);

// Update a note
router.put("/note", verifyToken, noteControllers.edit);

// Delete a note
router.delete("/note", verifyToken, noteControllers.delete);

module.exports = router;