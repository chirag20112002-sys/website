require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const authRoutes = require('./routes/auth')
const contentRoutes = require('./routes/content')
const contactRoutes = require('./routes/contact')
const blogRoutes = require('./routes/blog')
const portfolioRoutes = require('./routes/portfolio')
const testimonialRoutes = require('./routes/testimonials')

const app = express()
const PORT = process.env.PORT || 5000

/* ── Middleware ─────────────────────────────────────────── */
app.use(helmet())
app.use(morgan('dev'))
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests' })
app.use('/api/', limiter)

/* ── Routes ─────────────────────────────────────────────── */
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/testimonials', testimonialRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

/* ── Error handler ──────────────────────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
})

/* ── Database & Start ───────────────────────────────────── */
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/airx-solution'

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`))
  })
  .catch(err => {
    console.warn('⚠️  MongoDB not available — running in demo mode without DB')
    console.warn('   Install MongoDB or set MONGO_URI in backend/.env to enable persistence')
    app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT} (no DB)`))
  })

module.exports = app
