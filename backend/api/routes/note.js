import express from 'express'
const router = express.Router()
import authenticateToken from '../middleware/authenticateToken.js'
import noteController from '../controllers/noteController.js'

router.post('/note', authenticateToken, noteController.create)

router.get('/note', authenticateToken, noteController.show)

router.put('/note', authenticateToken, noteController.edit)

router.delete('/note', authenticateToken, noteController.remove)

export default router