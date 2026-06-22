const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

let items = [
  { id: 1, name: 'Sarah Mitchell', role: 'CEO', company: 'StyleVault', rating: 5, status: 'published', text: 'AirX Solution transformed our online store.' },
]

router.get('/', (req, res) => res.json(items.filter(t => t.status === 'published')))
router.get('/all', auth, (req, res) => res.json(items))
router.post('/', auth, (req, res) => { const t = { id: Date.now(), ...req.body }; items.push(t); res.status(201).json(t) })
router.put('/:id', auth, (req, res) => { const idx = items.findIndex(t => t.id === Number(req.params.id)); if (idx === -1) return res.status(404).json({ message: 'Not found' }); items[idx] = { ...items[idx], ...req.body }; res.json(items[idx]) })
router.delete('/:id', auth, (req, res) => { items = items.filter(t => t.id !== Number(req.params.id)); res.json({ message: 'Deleted' }) })

module.exports = router
