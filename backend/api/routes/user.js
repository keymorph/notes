const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const userControllers = require("../controllers/userControllers");

// Create a user
router.post("/user", userControllers.register);

// User login
router.get("/user", userControllers.login);

// Delete a user
router.delete("/user", verifyToken, userControllers.delete)

module.exports = router;