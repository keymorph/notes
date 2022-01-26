import express from 'express'
const router = express.Router()
import authenticateToken from '../middleware/authenticateToken.js'
import userController from '../controllers/userController.js'

router.post('/user', userController.register)

router.put('/user', userController.login)

router.delete('/user', authenticateToken, userController.remove)

router.get('/token', authenticateToken, (req, res) =>  res.send("VALID AUTH TOKEN").status(200))

export default router