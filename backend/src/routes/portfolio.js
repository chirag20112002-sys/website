const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

let projects = [
  { id: 1, title: 'LuxeCommerce Fashion Store', category: 'Shopify', client: 'LuxeStyle Inc.', status: 'published' },
  { id: 2, title: 'FinTrack Analytics Dashboard', category: 'Admin Panel', client: 'FinEdge Corp.', status: 'published' },
]

router.get('/', (req, res) => res.json(projects.filter(p => p.status === 'published')))
router.get('/all', auth, (req, res) => res.json(projects))
router.post('/', auth, (req, res) => { const p = { id: Date.now(), ...req.body }; projects.push(p); res.status(201).json(p) })
router.put('/:id', auth, (req, res) => { const idx = projects.findIndex(p => p.id === Number(req.params.id)); if (idx === -1) return res.status(404).json({ message: 'Not found' }); projects[idx] = { ...projects[idx], ...req.body }; res.json(projects[idx]) })
router.delete('/:id', auth, (req, res) => { projects = projects.filter(p => p.id !== Number(req.params.id)); res.json({ message: 'Deleted' }) })

module.exports = router
