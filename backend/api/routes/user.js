import express from 'express'
const router = express.Router()
import authenticateToken from '../middleware/authenticateToken.js'
import userController from '../controllers/userController.js'

router.post('/user', userController.register)

router.get('/user', userController.login)

router.delete('/user', authenticateToken, userController.remove)

export default router