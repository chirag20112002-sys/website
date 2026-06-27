'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Search, FileText, Palette, Code2, CheckCircle, Rocket, Headphones } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { processSteps, siteConfig } from '@/config/site'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const iconMap: Record<string, React.ElementType> = { Search, FileText, Palette, Code2, CheckCircle, Rocket, HeadphonesIcon: Headphones }

export default function ProcessPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-5">Our Process</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              How We Turn Your Vision <br className="hidden sm:block" />
              <span className="gradient-text">Into Reality</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              A transparent, collaborative 7-step process built for clarity, quality, and on-time delivery. No surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 opacity-20 hidden sm:block" />

            <div className="space-y-6">
              {processSteps.map((step, i) => {
                const IconComp = iconMap[step.icon] ?? Search
                return (
                  <FadeIn key={step.step} delay={i * 0.1}>
                    <div className="relative flex gap-6 sm:gap-10">
                      {/* Step number + icon */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/20 z-10">
                          <IconComp className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 mt-2">{step.step}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-7 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{step.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why this process */}
      <section className="py-20 bg-white dark:bg-[#030712]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Our Process Works</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: '🔍', title: 'Full Transparency', desc: 'You have visibility at every stage. Weekly updates, milestone reviews, and open communication throughout.' },
              { emoji: '⚡', title: 'Fast Iterations', desc: 'We use agile sprints so you see real progress every week and can give feedback early — not just at the end.' },
              { emoji: '✅', title: 'Zero Surprise Launches', desc: 'Our QA process catches issues before you do. Every project goes through rigorous testing before going live.' },
            ].map((item) => (
              <FadeIn key={item.title}>
                <div className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
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
            <h2 className="text-4xl font-bold text-white mb-5">Ready to Start the Discovery Call?</h2>
            <p className="text-xl text-white/70 mb-8">Step 1 is free. Book a 30-minute discovery call and let's map out your project together.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Book a Discovery Call <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
