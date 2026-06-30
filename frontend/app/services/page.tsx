'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { DynamicIcon } from '@/lib/icon-map'

type Service = {
  id: number
  title: string
  tagline: string
  description: string
  icon: string
  color: string
  features: string[]
  timeline: string
  tag: string
  image: string
  active: boolean
  order: number
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (Array.isArray(data)) setServices(data) })
      .catch(() => {})
  }, [])

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">Our Services</span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Everything Your Business <span className="gradient-text">Needs Online</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive digital services delivered with precision, passion, and a relentless focus on results. We don't just complete projects — we build lasting digital assets.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {services.map(s => (
                <a key={s.id} href={`#service-${s.id}`} className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((s, i) => (
            <FadeIn key={s.id} delay={0.1}>
              <div id={`service-${s.id}`} className="scroll-mt-24">
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <DynamicIcon name={s.icon} className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-3xl font-bold font-display text-slate-800 dark:text-white">{s.title}</h2>
                      {s.tag && <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{s.tag}</span>}
                    </div>
                    {s.tagline && <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4 italic">"{s.tagline}"</p>}
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{s.description}</p>
                    {s.timeline && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                        <Zap className="w-4 h-4 text-indigo-500" />
                        Typical timeline: <strong className="text-slate-700 dark:text-slate-300">{s.timeline}</strong>
                      </div>
                    )}
                    <Link href="/contact" className="btn-primary">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {/* Features */}
                  <div className="flex-1 w-full">
                    <div className="glass-card p-7">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-5 font-display text-lg">What's Included</h4>
                      <ul className="space-y-3">
                        {s.features.map(f => (
                          <li key={f} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600 dark:text-slate-400 text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold font-display text-white mb-5">Not Sure What You Need?</h2>
            <p className="text-xl text-white/70 mb-8">Let's have a free 30-minute strategy call. We'll assess your needs and recommend the best approach.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Book a Free Call <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
