'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const contactInfo = [
  { icon: Mail, title: 'Email Us', value: 'info@suprimohub.in', desc: 'We reply within 2-4 hours', href: 'mailto:info@suprimohub.in' },
  { icon: Phone, title: 'Call Us', value: '+91 93105 93035', desc: 'Mon–Sat, 10AM – 7PM IST', href: 'tel:+919310593035' },
  { icon: MessageCircle, title: 'WhatsApp', value: '+91 93105 93035', desc: 'Chat with us instantly', href: 'https://wa.me/919310593035' },
  { icon: MapPin, title: 'Location', value: 'New Delhi, India', desc: 'Serving clients nationwide', href: '#map' },
]

const services = ['Website Development', 'Shopify Store Development', 'Shopify Customization', 'Admin Panel Development', 'E-Commerce Solutions', 'Web Application', 'UI/UX Design', 'Business Automation', 'Maintenance & Support', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">
              <Clock className="w-3 h-3" /> We respond within 4 hours
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Have a project in mind? Reach out and let's have a conversation. Free consultation, no obligations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.1}>
                <a href={c.href} className="glass-card p-5 flex flex-col items-center text-center card-hover block">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                    <c.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-1 text-sm">{c.title}</h4>
                  <p className="font-medium text-indigo-600 dark:text-indigo-400 text-sm mb-1">{c.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.desc}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Form */}
            <FadeIn className="flex-1 w-full">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-6">Send Us a Message</h2>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 font-display">Message Sent!</h3>
                    <p className="text-slate-500 dark:text-slate-400">Thank you for reaching out. We'll get back to you within 4 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required className="input-field" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your Company" className="input-field" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service Needed *</label>
                        <select name="service" value={form.service} onChange={handleChange} required className="input-field">
                          <option value="">Select a service</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Budget</label>
                        <select name="budget" value={form.budget} onChange={handleChange} className="input-field">
                          <option value="">Select range</option>
                          <option value="<1000">Under $1,000</option>
                          <option value="1000-5000">$1,000 – $5,000</option>
                          <option value="5000-15000">$5,000 – $15,000</option>
                          <option value="15000-50000">$15,000 – $50,000</option>
                          <option value=">50000">$50,000+</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Details *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project — what are you building, what are your goals, do you have a timeline?" required className="input-field resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
                      {loading ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.2} className="lg:w-80 w-full space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-bold text-slate-800 dark:text-white font-display mb-4">Why Work With Us</h3>
                <ul className="space-y-3">
                  {['Free initial consultation', 'Detailed project proposal within 48hrs', 'Fixed price, no hidden costs', 'Milestone-based payments', '30-day post-launch support', 'Source code ownership'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-bold text-slate-800 dark:text-white font-display mb-4">Our Process</h3>
                <ol className="space-y-4">
                  {[['Discovery Call', 'We understand your goals and requirements'], ['Proposal', 'You receive a detailed quote within 48 hours'], ['Development', 'We build with regular updates and reviews'], ['Launch', 'Deployment + post-launch support included']].map(([step, desc], i) => (
                    <li key={step} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{step}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="glass-card p-6 text-center">
                <h3 className="font-bold text-slate-800 dark:text-white font-display mb-2">Prefer to Chat?</h3>
                <p className="text-sm text-slate-500 mb-4">Jump on a quick WhatsApp call with our team</p>
                <a
                  href="https://wa.me/919310593035?text=Hello%20SARAL%20MIS!%20I%20have%20a%20project%20I%27d%20like%20to%20discuss."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us Now
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section id="map" className="h-80 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-indigo-500 mx-auto mb-2" />
            <p className="text-slate-600 dark:text-slate-400 font-medium">123 Digital Avenue, Tech City, TC 10001</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-sm hover:underline mt-1 inline-flex items-center gap-1">
              Open in Google Maps <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-50" />
      </section>
    </SiteLayout>
  )
}
