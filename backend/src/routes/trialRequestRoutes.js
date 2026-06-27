import express from 'express'
import { createTrialRequest } from '../controllers/trialRequestController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createTrialRequest)

export default router
