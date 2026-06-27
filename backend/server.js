import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import newsletterRoutes from './src/routes/newsletterRoutes.js'
import trialRequestRoutes from './src/routes/trialRequestRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Devansh API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/trial-requests', trialRequestRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
