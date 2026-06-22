const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

let posts = [
  { id: 1, title: 'Next.js vs React: Which Should You Choose in 2025?', category: 'Web Development', status: 'published', date: '2025-06-01', views: 1240 },
  { id: 2, title: '12 Shopify Store Optimization Tips That Doubled Our Client\'s Revenue', category: 'Shopify', status: 'published', date: '2025-05-22', views: 2850 },
]

router.get('/', (req, res) => res.json(posts.filter(p => p.status === 'published')))
router.get('/all', auth, (req, res) => res.json(posts))
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id))
  if (!post) return res.status(404).json({ message: 'Not found' })
  res.json(post)
})
router.post('/', auth, (req, res) => {
  const post = { id: Date.now(), ...req.body, date: new Date().toISOString().split('T')[0], views: 0 }
  posts.push(post)
  res.status(201).json(post)
})
router.put('/:id', auth, (req, res) => {
  const idx = posts.findIndex(p => p.id === Number(req.params.id))
  if (idx === -1) return res.status(404).json({ message: 'Not found' })
  posts[idx] = { ...posts[idx], ...req.body }
  res.json(posts[idx])
})
router.delete('/:id', auth, (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id))
  res.json({ message: 'Deleted' })
})

module.exports = router
