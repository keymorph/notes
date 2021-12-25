import express from 'express'
const router = express.Router()
import verifyToken from '../middleware/verifyToken.js'
import { register, login, deleteUser } from '../controllers/userControllers.js'

// Create a user
router.post("/user", register)

// User login
router.get("/user", login)

// Delete a user
router.delete("/user", verifyToken, deleteUser)

export default router