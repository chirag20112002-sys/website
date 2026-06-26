'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'
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

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  rating: number
  text: string
  project: string
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setTestimonials(data) : null)
      .finally(() => setLoading(false))
  }, [])

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-5">
              <Star className="w-3 h-3 fill-amber-500" /> 5.0 Average Rating
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Client Stories & <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Real results from real businesses. Here's what our clients say about working with AirX Solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rating summary */}
      <section className="py-12 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 justify-center text-center">
            <div>
              <p className="text-7xl font-bold gradient-text font-display">5.0</p>
              <div className="flex gap-1 justify-center my-2">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Average Rating</p>
            </div>
            <div className="hidden md:block w-px h-20 bg-slate-200 dark:bg-slate-700" />
            {[['80+', 'Happy Clients'], ['150+', 'Projects Completed'], ['100%', 'Recommendation Rate']].map(([v, l]) => (
              <div key={l}>
                <p className="text-4xl font-bold gradient-text font-display">{v}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading reviews…</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No testimonials yet.</div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((t, i) => (
                <FadeIn key={t.id} delay={i * 0.05} className="break-inside-avoid mb-6">
                  <div className="glass-card p-6 relative">
                    <Quote className="w-8 h-8 text-indigo-500/20 absolute top-5 right-5" />
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    {t.project && (
                      <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs mb-3">{t.project}</span>
                    )}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-sm italic">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {initials(t.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold font-display text-white mb-5">Join 80+ Happy Clients</h2>
            <p className="text-xl text-white/70 mb-8">Your success story starts here. Let's build something great together.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
