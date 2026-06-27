'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap, Globe, Factory, Heart, Truck, GraduationCap, Rocket, Building2, Store, ShoppingCart } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { industries, siteConfig } from '@/config/site'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const iconMap: Record<string, React.ElementType> = { Factory, Heart, Truck, GraduationCap, Rocket, Building2, Store, Globe, ShoppingCart, Zap }

const industryDetails: Record<string, { solutions: string[]; description: string }> = {
  Manufacturing: { description: 'Streamline production, inventory, and supply chain with custom ERP and automation tools.', solutions: ['Production Management', 'Inventory Control', 'Quality Management', 'Supply Chain', 'HRMS & Payroll', 'Analytics Dashboard'] },
  Retail: { description: 'Modern POS, inventory management, and ecommerce solutions for retail businesses.', solutions: ['POS System', 'Inventory Management', 'Ecommerce Store', 'Customer Loyalty', 'Sales Analytics', 'Multi-store Management'] },
  Healthcare: { description: 'HIPAA-aware patient management, appointment scheduling, and billing systems.', solutions: ['Patient Management', 'Appointment Booking', 'Medical Records', 'Billing & Insurance', 'Staff Management', 'Telemedicine Integration'] },
  Logistics: { description: 'Fleet management, route optimization, and real-time tracking platforms.', solutions: ['Fleet Management', 'Route Optimization', 'Order Tracking', 'Warehouse Management', 'Driver App', 'Customer Portal'] },
  Restaurants: { description: 'Digital menus, online ordering, kitchen management, and POS for restaurants.', solutions: ['Online Ordering', 'Table Management', 'Kitchen Display', 'POS System', 'Delivery Integration', 'Loyalty Programs'] },
  Education: { description: 'LMS, student management, fee collection, and online classroom solutions.', solutions: ['Student Management', 'Online Classes', 'Fee Management', 'Attendance System', 'Exam Management', 'Parent Portal'] },
  Startups: { description: 'MVP development, SaaS products, and scalable tech infrastructure for startups.', solutions: ['MVP Development', 'SaaS Products', 'Landing Pages', 'CRM & Sales', 'Marketing Tools', 'Cloud Deployment'] },
  'Real Estate': { description: 'Property listing, CRM, and client management platforms for real estate agencies.', solutions: ['Property Listings', 'CRM for Agents', 'Client Portal', 'Lead Management', 'Document Management', 'Analytics'] },
  Wholesale: { description: 'B2B ordering portals, price list management, and distributor networks.', solutions: ['B2B Portal', 'Price List Management', 'Order Management', 'Distributor Network', 'Inventory Control', 'Invoice Automation'] },
  Ecommerce: { description: 'Full-stack ecommerce — from Shopify to custom marketplaces with AI-powered features.', solutions: ['Shopify Development', 'Custom Marketplace', 'Product Management', 'Payment Gateway', 'SEO Optimization', 'Analytics'] },
}

export default function IndustriesPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-100" />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-5">Industries We Serve</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Deep Expertise Across <span className="gradient-text">Every Sector</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              We understand that every industry has unique challenges. Our solutions are tailored to your specific sector — not generic templates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind, i) => {
              const detail = industryDetails[ind.title]
              const IconComp = iconMap[ind.icon] ?? Zap
              return (
                <FadeIn key={ind.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-5 mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${ind.bg} flex items-center justify-center flex-shrink-0`}>
                        <IconComp className={`w-7 h-7 ${ind.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{ind.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{detail?.description}</p>
                      </div>
                    </div>
                    {detail && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {detail.solutions.map(sol => (
                          <div key={sol} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                            <div className={`w-1.5 h-1.5 rounded-full ${ind.color.replace('text-', 'bg-')} flex-shrink-0`} />
                            {sol}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white mb-5">Don't See Your Industry?</h2>
            <p className="text-xl text-white/70 mb-8">We've worked with companies across 20+ sectors. Tell us about your business and we'll build the perfect solution.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Talk to Our Experts <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
