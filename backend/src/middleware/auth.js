const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'airx-dev-secret-change-in-production'

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'No token provided' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
