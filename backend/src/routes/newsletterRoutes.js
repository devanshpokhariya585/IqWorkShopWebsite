import express from 'express'
import { saveNewsletterEmail } from '../controllers/newsletterController.js'

const router = express.Router()

router.post('/', saveNewsletterEmail)

export default router
