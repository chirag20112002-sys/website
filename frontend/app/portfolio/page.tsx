'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Code2, ShoppingBag, LayoutDashboard, ShoppingCart, Globe, Bot, X } from 'lucide-react'
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

const categories = ['All', 'Web Dev', 'Shopify', 'Admin Panel', 'E-Commerce', 'Web App', 'Automation']

const projects = [
  {
    title: 'LuxeCommerce Fashion Store',
    category: 'Shopify',
    icon: ShoppingBag,
    color: 'from-indigo-600 to-purple-700',
    desc: 'A premium fashion brand Shopify store with 50k+ products, custom checkout flow, subscription features, and a fully custom theme.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'Custom Theme'],
    results: ['340% increase in conversions', 'Sub-2s page load', '50k+ products'],
    client: 'LuxeStyle Inc.',
    duration: '6 weeks',
  },
  {
    title: 'FinTrack Analytics Dashboard',
    category: 'Admin Panel',
    icon: LayoutDashboard,
    color: 'from-emerald-600 to-teal-700',
    desc: 'Real-time financial analytics dashboard processing $2M+ in monthly transactions with multi-currency support and automated reporting.',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    results: ['$2M+ monthly volume', '99.9% uptime', '15hrs/week saved'],
    client: 'FinEdge Corp.',
    duration: '10 weeks',
  },
  {
    title: 'MediCare Patient Portal',
    category: 'Web App',
    icon: Globe,
    color: 'from-blue-600 to-cyan-700',
    desc: 'HIPAA-compliant patient management system serving 5,000+ users with appointment scheduling, medical records, and telehealth features.',
    tech: ['Next.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    results: ['5,000+ active users', 'HIPAA compliant', '4.9★ app rating'],
    client: 'MediCare Group',
    duration: '14 weeks',
  },
  {
    title: 'SwiftDeliver Marketplace',
    category: 'E-Commerce',
    icon: ShoppingCart,
    color: 'from-orange-600 to-amber-700',
    desc: 'Multi-vendor marketplace with real-time order tracking, integrated logistics API, and a native mobile app companion.',
    tech: ['React', 'Node.js', 'MySQL', 'Stripe'],
    results: ['200+ vendors', 'Real-time tracking', '10k+ orders/month'],
    client: 'SwiftDeliver Ltd.',
    duration: '18 weeks',
  },
  {
    title: 'AutoPilot Sales CRM',
    category: 'Automation',
    icon: Bot,
    color: 'from-violet-600 to-purple-700',
    desc: 'AI-powered sales CRM that automated 70% of the client\'s follow-up process, integrated with HubSpot, Slack, and email platforms.',
    tech: ['React', 'Python', 'OpenAI', 'HubSpot API'],
    results: ['70% tasks automated', '3x sales pipeline', '40hrs/week saved'],
    client: 'GrowthMax Agency',
    duration: '8 weeks',
  },
  {
    title: 'EduLearn Academy Platform',
    category: 'Web Dev',
    icon: Code2,
    color: 'from-rose-600 to-pink-700',
    desc: 'E-learning platform with 10,000+ enrolled students, interactive video courses, quizzes, certificates, and a live tutoring module.',
    tech: ['Next.js', 'MongoDB', 'Stripe', 'VideoJS'],
    results: ['10k+ students', '500+ courses', '95% completion rate'],
    client: 'EduLearn Inc.',
    duration: '16 weeks',
  },
  {
    title: 'GreenLeaf Organic Shop',
    category: 'Shopify',
    icon: ShoppingBag,
    color: 'from-green-600 to-emerald-700',
    desc: 'A sustainable organic products Shopify store with subscription boxes, custom product bundles, and an eco-conscious theme.',
    tech: ['Shopify Plus', 'Liquid', 'ReCharge', 'Klaviyo'],
    results: ['$500k revenue/month', '12k subscribers', '60% repeat purchase'],
    client: 'GreenLeaf Co.',
    duration: '5 weeks',
  },
  {
    title: 'TechNova SaaS Dashboard',
    category: 'Admin Panel',
    icon: LayoutDashboard,
    color: 'from-cyan-600 to-blue-700',
    desc: 'Feature-rich SaaS admin panel for a B2B software company, with user management, billing, analytics, and white-labeling.',
    tech: ['React', 'Express', 'PostgreSQL', 'Stripe'],
    results: ['500+ B2B clients', 'White-label ready', '$100k MRR tracked'],
    client: 'TechNova Labs',
    duration: '12 weeks',
  },
  {
    title: 'StyleVault Brand Site',
    category: 'Web Dev',
    icon: Code2,
    color: 'from-fuchsia-600 to-purple-700',
    desc: 'A premium fashion brand website with immersive animations, a lookbook gallery, and an integrated wholesale inquiry system.',
    tech: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Tailwind'],
    results: ['98/100 Lighthouse score', '250% traffic increase', 'Featured in Awwwards'],
    client: 'StyleVault Fashion',
    duration: '7 weeks',
  },
]

type Project = typeof projects[0]

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">Our Work</span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Projects We're <span className="gradient-text">Proud Of</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              150+ projects delivered across industries. Here are some highlights that showcase the breadth and quality of our work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-slate-50 dark:bg-[#0d1423] sticky top-16 z-30 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div
                    className="glass-card overflow-hidden card-hover cursor-pointer group"
                    onClick={() => setSelected(p)}
                  >
                    <div className={`h-52 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                      <p.icon className="w-32 h-32 text-white/10 absolute -bottom-4 -right-4" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <span className="badge bg-white/20 text-white self-start">{p.category}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white font-display">{p.title}</h3>
                          <p className="text-sm text-white/70 mt-1">{p.client}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 flex items-center justify-center shadow-lg">
                          <ExternalLink className="w-5 h-5 text-slate-800" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 3).map(t => (
                          <span key={t} className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className={`h-56 bg-gradient-to-br ${selected.color} relative`}>
                <selected.icon className="w-40 h-40 text-white/10 absolute -bottom-6 -right-6" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="badge bg-white/20 text-white">{selected.category}</span>
                    <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">{selected.title}</h3>
                    <p className="text-white/70 mt-1">{selected.client} · {selected.duration}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{selected.desc}</p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-white mb-3 font-display">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map(t => (
                        <span key={t} className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-white mb-3 font-display">Key Results</h5>
                    <ul className="space-y-1.5">
                      {selected.results.map(r => (
                        <li key={r} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Start a Similar Project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold font-display text-white mb-5">Like What You See?</h2>
            <p className="text-xl text-white/70 mb-8">Let's add your project to our portfolio. Get a free quote today.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
