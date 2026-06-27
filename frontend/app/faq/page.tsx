'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Plus, Minus, MessageCircle } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { faqs, siteConfig } from '@/config/site'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const categories = [
  { label: 'All', filter: null },
  { label: 'Timeline', filter: 0 },
  { label: 'Ownership', filter: 3 },
  { label: 'Payment', filter: 6 },
  { label: 'Support', filter: 4 },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-5">FAQ</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to know before starting your project. Can't find your answer? Chat with us directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open === i ? 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 shadow-lg shadow-indigo-500/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'}`}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <span className={`font-semibold text-sm leading-snug transition-colors ${open === i ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-white'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${open === i ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 dark:border-slate-700'}`}>
                      {open === i ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-white dark:bg-[#030712]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-10 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Still Have Questions?</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                Our team typically responds within 2 hours. Reach out via the form, WhatsApp, or email — whichever works best for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary px-8 py-3.5">
                  Send a Message <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary px-8 py-3.5">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
