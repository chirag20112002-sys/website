'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, MessageCircle } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { pricingPlans, faqs, siteConfig } from '@/config/site'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-5">Transparent Pricing</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Simple, Honest <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              No hidden fees. No recurring subscriptions. Pay once, own forever. Every project is scoped clearly before we start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.1}>
                <div className={`relative h-full rounded-2xl border-2 ${plan.badge ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105' : 'border-slate-200 dark:border-slate-800'} bg-white dark:bg-slate-900 p-8 flex flex-col`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg">{plan.badge}</span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{plan.description}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-slate-400 text-sm mb-1">/ {plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={plan.badge ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Note */}
          <FadeIn className="mt-10 text-center">
            <p className="text-slate-400 text-sm">
              All prices are project-based estimates. Final pricing depends on scope and requirements. <Link href="/contact" className="text-indigo-500 hover:underline">Get a custom quote →</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What's always included */}
      <section className="py-20 bg-white dark:bg-[#030712]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Included in Every Project</h2>
            <p className="text-slate-500 dark:text-slate-400">No matter the plan, these are always part of what we deliver.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🎨', title: 'Premium Design', desc: 'Custom UI/UX crafted for your brand' },
              { icon: '📱', title: 'Mobile-First', desc: 'Perfect on every screen size' },
              { icon: '⚡', title: 'Performance Optimized', desc: 'Core Web Vitals & fast loading' },
              { icon: '🔒', title: 'Secure Code', desc: 'Security best practices throughout' },
              { icon: '📄', title: 'Full Documentation', desc: 'Code docs and user guides included' },
              { icon: '🧪', title: 'QA Testing', desc: 'Cross-browser and device testing' },
              { icon: '🚀', title: 'Deployment', desc: 'Live on your preferred host' },
              { icon: '📞', title: 'Post-Launch Support', desc: '30 days of free support' },
            ].map((item) => (
              <FadeIn key={item.title}>
                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Pricing FAQs</h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.slice(6).concat(faqs.slice(0, 2)).map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-slate-800 dark:text-white text-sm">{faq.q}</span>
                    <span className={`ml-4 w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-45 border-indigo-500' : ''}`}>
                      <span className="text-slate-400 dark:text-slate-500 text-sm leading-none">+</span>
                    </span>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <MessageCircle className="w-12 h-12 text-white/50 mx-auto mb-5" />
            <h2 className="text-4xl font-bold text-white mb-5">Still Have Questions?</h2>
            <p className="text-xl text-white/70 mb-8">Chat with us directly. We'll scope your project and send a detailed quote within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
                Get a Custom Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all">
                WhatsApp Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
