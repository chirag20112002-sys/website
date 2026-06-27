'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, Users, Package, UserCheck, BadgeDollarSign, Kanban, ShoppingCart, BarChart3, Settings } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { products, siteConfig } from '@/config/site'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const iconMap: Record<string, React.ElementType> = { Users, Package, UserCheck, BadgeDollarSign, Kanban, ShoppingCart, BarChart3, Settings, Zap }

const productFeatures: Record<string, string[]> = {
  crm: ['Lead & deal pipeline', 'Contact management', 'Follow-up reminders', 'Email integration', 'Sales reports', 'Team collaboration', 'Mobile access', 'Custom fields'],
  inventory: ['Real-time stock tracking', 'Multi-warehouse', 'Low stock alerts', 'Purchase orders', 'Barcode scanning', 'Reports & analytics', 'Supplier management', 'Batch tracking'],
  hrms: ['Employee database', 'Attendance tracking', 'Leave management', 'Performance reviews', 'Onboarding workflow', 'Document management', 'Org chart', 'Self-service portal'],
  payroll: ['Automatic calculations', 'Tax deductions', 'Payslip generation', 'Bank transfer', 'Compliance reports', 'Multi-currency', 'History & audit', 'Custom allowances'],
  projects: ['Kanban & Gantt', 'Task assignments', 'Time tracking', 'Milestones', 'File attachments', 'Comments & mentions', 'Budget tracking', 'Client portal'],
  pos: ['Fast checkout', 'Inventory sync', 'Multiple payment modes', 'Receipt printing', 'Shift management', 'Daily reports', 'Loyalty programs', 'Offline mode'],
  analytics: ['Custom dashboards', 'Real-time data', 'KPI tracking', 'Visual charts', 'Export to Excel', 'Scheduled reports', 'Data drill-down', 'Multi-source data'],
  operations: ['Unified dashboard', 'Process automation', 'Role-based access', 'Audit trails', 'Notifications', 'API access', 'Integration hub', 'SLA monitoring'],
}

export default function ProductsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />
        <div className="absolute top-20 -left-40 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-5">SaaS Products</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Powerful Business Software <br className="hidden sm:block" />
              <span className="gradient-text">Built for You</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Ready-to-deploy business management products — or fully customized to your exact workflow. No bloated SaaS. Just what you need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary px-8 py-3.5">Request a Demo <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/pricing" className="btn-secondary px-8 py-3.5">See Pricing</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p, i) => {
              const IconComp = iconMap[p.icon] ?? Zap
              const features = productFeatures[p.id] || []
              return (
                <FadeIn key={p.id} delay={i * 0.06}>
                  <div id={p.id} className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1">
                    {p.badge && (
                      <span className={`absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full ${p.badge === 'Popular' ? 'bg-indigo-500 text-white' : 'bg-emerald-500 text-white'}`}>{p.badge}</span>
                    )}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <IconComp className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400 font-medium">{p.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{p.description}</p>
                    {features.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    )}
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all">
                      Request a Demo <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why choose our products */}
      <section className="py-20 bg-white dark:bg-[#030712]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Our Products?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Fully Customizable', desc: 'Every product can be customized to match your exact business workflow — not the other way around.' },
              { title: 'Source Code Ownership', desc: 'Unlike SaaS subscriptions, you own the code. No vendor lock-in, ever.' },
              { title: 'Ongoing Support', desc: 'Dedicated support, training, and feature updates. We\'re your long-term tech partner.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center">
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
            <h2 className="text-4xl font-bold text-white mb-5">Ready to Modernize Your Business?</h2>
            <p className="text-xl text-white/70 mb-8">Book a free demo and see how our products can transform your operations in 30 minutes.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Book a Free Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
