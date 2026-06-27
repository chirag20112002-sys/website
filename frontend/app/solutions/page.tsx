'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, Globe, LayoutDashboard, ShoppingBag, TrendingUp, Palette } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { solutions, siteConfig } from '@/config/site'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const iconMap: Record<string, React.ElementType> = { Globe, LayoutDashboard, ShoppingBag, TrendingUp, Palette, Zap }

const serviceDetails: Record<string, string[]> = {
  'digital-presence': ['Custom Website Development', 'Landing Pages', 'Company Business Profiles', 'Portfolio Design', 'Corporate Websites', 'Blog & Content Sites', 'Multi-language Websites', 'PWA Development'],
  'business-software': ['ERP Modules', 'CRM Development', 'HRMS', 'Payroll System', 'Attendance Management', 'Purchase & Sales Management', 'Warehouse Management', 'Custom Business Tools'],
  'ecommerce': ['Shopify Store Development', 'WooCommerce', 'Custom Ecommerce', 'Inventory Management', 'Order Management', 'Payment Integration', 'Multi-vendor Marketplace', 'Subscription Commerce'],
  'marketing': ['Digital Marketing', 'SEO Optimization', 'Social Media Management', 'Email Campaigns', 'PPC Advertising', 'Content Marketing', 'Analytics & Reporting', 'Growth Hacking'],
  'design': ['Brand Identity & Logo', 'Graphic Design', 'UI/UX Design', 'Motion Design', 'Pitch Decks', 'Marketing Materials', 'Packaging Design', 'Social Media Creatives'],
  'automation': ['AI Automation', 'API Integration', 'Dashboard Development', 'SaaS Product Development', 'Cloud Deployment', 'DevOps & CI/CD', 'Chatbot Development', 'Workflow Automation'],
}

export default function SolutionsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />
        <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-5">Our Solutions</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Complete Digital Solutions <br className="hidden sm:block" />
              <span className="gradient-text">Under One Roof</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              From websites to enterprise software — we cover every aspect of your digital business so you can focus on growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary px-8 py-3.5">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/portfolio" className="btn-secondary px-8 py-3.5">See Our Work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      {solutions.map((s, i) => {
        const IconComp = iconMap[s.icon] ?? Zap
        const services = serviceDetails[s.id] || s.services
        const isEven = i % 2 === 0
        return (
          <section key={s.id} id={s.id} className={`py-20 ${isEven ? 'bg-white dark:bg-[#030712]' : 'bg-slate-50 dark:bg-slate-900/30'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                <FadeIn delay={0.1} className={!isEven ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${s.color} bg-opacity-10 mb-5`}>
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                      <IconComp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-white">{s.title}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-5">{s.description.replace('.', ' —')}</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-lg">{s.description}</p>
                  <Link href="/contact" className="btn-primary inline-flex">
                    Discuss Your Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </FadeIn>

                <FadeIn delay={0.2} className={!isEven ? 'lg:order-1' : ''}>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-6 text-lg">What's Included</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((sv) => (
                        <div key={sv} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{sv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white mb-5">Not Sure Which Solution You Need?</h2>
            <p className="text-xl text-white/70 mb-8">Talk to our experts. We'll analyse your business and recommend the right solution — for free.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
