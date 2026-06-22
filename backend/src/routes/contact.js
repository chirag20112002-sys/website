const express = require('express')
const router = express.Router()

let messages = []

router.post('/', (req, res) => {
  const { name, email, phone, company, service, budget, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' })

  const entry = { id: Date.now(), name, email, phone, company, service, budget, message, status: 'new', createdAt: new Date() }
  messages.push(entry)
  console.log('📩 New contact inquiry from:', name, email)
  res.status(201).json({ message: 'Message received! We\'ll get back to you within 4 hours.', id: entry.id })
})

router.get('/', (req, res) => res.json(messages))
router.patch('/:id', (req, res) => {
  const msg = messages.find(m => m.id === Number(req.params.id))
  if (!msg) return res.status(404).json({ message: 'Not found' })
  Object.assign(msg, req.body)
  res.json(msg)
})

module.exports = router
