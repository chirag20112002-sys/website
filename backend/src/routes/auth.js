const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'airx-dev-secret-change-in-production'

// In-memory admin for demo (use MongoDB User model in production)
const adminUser = {
  email: 'admin@airxsolution.com',
  passwordHash: bcrypt.hashSync('admin123', 10),
  name: 'Admin User',
  role: 'super_admin',
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

    if (email !== adminUser.email) return res.status(401).json({ message: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, adminUser.passwordHash)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ email: adminUser.email, name: adminUser.name, role: adminUser.role }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { email: adminUser.email, name: adminUser.name, role: adminUser.role } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/logout', (req, res) => res.json({ message: 'Logged out' }))

module.exports = router
