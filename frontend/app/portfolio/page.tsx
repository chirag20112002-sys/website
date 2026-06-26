'use client'

import { useState, useRef, useEffect } from 'react'
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

const categoryConfig: Record<string, { color: string; icon: React.ElementType }> = {
  'Shopify':     { color: 'from-indigo-600 to-purple-700',  icon: ShoppingBag },
  'Admin Panel': { color: 'from-emerald-600 to-teal-700',   icon: LayoutDashboard },
  'Web App':     { color: 'from-blue-600 to-cyan-700',      icon: Globe },
  'E-Commerce':  { color: 'from-orange-600 to-amber-700',   icon: ShoppingCart },
  'Automation':  { color: 'from-violet-600 to-purple-700',  icon: Bot },
  'Web Dev':     { color: 'from-rose-600 to-pink-700',      icon: Code2 },
}
const defaultConfig = { color: 'from-slate-600 to-slate-700', icon: Globe }

const categories = ['All', 'Web Dev', 'Shopify', 'Admin Panel', 'E-Commerce', 'Web App', 'Automation']

type Project = {
  id: string
  title: string
  category: string
  client: string
  description: string
  tech: string[]
  results: string[]
  status: string
}

type SelectedProject = Project & { color: string; icon: React.ElementType }

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<SelectedProject | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setProjects(data) : null)
      .finally(() => setLoading(false))
  }, [])

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
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading projects…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No projects found in this category.</div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((p, i) => {
                  const cfg = categoryConfig[p.category] ?? defaultConfig
                  const IconComp = cfg.icon
                  const proj: SelectedProject = { ...p, color: cfg.color, icon: cfg.icon }
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <div className="glass-card overflow-hidden card-hover cursor-pointer group" onClick={() => setSelected(proj)}>
                        <div className={`h-52 bg-gradient-to-br ${cfg.color} relative overflow-hidden`}>
                          <IconComp className="w-32 h-32 text-white/10 absolute -bottom-4 -right-4" />
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
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {(p.tech ?? []).slice(0, 3).map(t => (
                              <span key={t} className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
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
                    <p className="text-white/70 mt-1">{selected.client}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{selected.description}</p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {(selected.tech ?? []).length > 0 && (
                    <div>
                      <h5 className="font-semibold text-slate-800 dark:text-white mb-3 font-display">Tech Stack</h5>
                      <div className="flex flex-wrap gap-2">
                        {selected.tech.map(t => (
                          <span key={t} className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(selected.results ?? []).length > 0 && (
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
                  )}
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
