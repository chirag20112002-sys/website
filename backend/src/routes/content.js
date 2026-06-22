const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

let siteContent = {
  hero: { title: 'We Build Digital Experiences That Convert', subtitle: 'From stunning websites and Shopify stores to powerful admin panels and business automation.', cta: 'Start Your Project' },
  about: { title: 'We\'re a Team of Digital Craftsmen', story: 'AirX Solution was born in 2019...' },
  contact: { email: 'hello@airxsolution.com', phone: '+1 (234) 567-8900', address: '123 Digital Avenue, Tech City, TC 10001', whatsapp: '1234567890' },
  seo: { title: 'AirX Solution – Premium Web Development & Digital Agency', description: 'AirX Solution delivers premium web development, Shopify store development, and business automation.' },
}

router.get('/', (req, res) => res.json(siteContent))
router.get('/:section', (req, res) => {
  const section = siteContent[req.params.section]
  if (!section) return res.status(404).json({ message: 'Section not found' })
  res.json(section)
})
router.put('/:section', auth, (req, res) => {
  if (!siteContent[req.params.section]) return res.status(404).json({ message: 'Section not found' })
  siteContent[req.params.section] = { ...siteContent[req.params.section], ...req.body }
  res.json(siteContent[req.params.section])
})

module.exports = router
