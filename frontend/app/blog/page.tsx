'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
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

const categoryColors: Record<string, string> = {
  'Web Development': 'from-indigo-500 to-purple-600',
  'Shopify':         'from-emerald-500 to-teal-600',
  'UI/UX Design':    'from-blue-500 to-cyan-600',
  'SEO':             'from-rose-500 to-pink-600',
  'Backend':         'from-green-500 to-emerald-600',
  'Automation':      'from-orange-500 to-amber-600',
}
const defaultColor = 'from-violet-500 to-purple-600'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  status: string
  views: number
  created_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setPosts(data) : null)
      .finally(() => setLoading(false))
  }, [])

  const featured = posts.slice(0, 2)
  const rest = posts.slice(2)

  return (
    <SiteLayout>
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">Our Blog</span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Insights & <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Expert articles on business software, ERP, CRM, HRMS, and digital strategy from the SARAL MIS team.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-24 text-slate-400">Loading articles…</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 text-slate-400">No articles published yet. Check back soon!</div>
      ) : (
        <>
          {/* Featured Posts */}
          {featured.length > 0 && (
            <section className="py-12 bg-slate-50 dark:bg-[#0d1423]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-8">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featured.map((post, i) => (
                    <FadeIn key={post.id} delay={i * 0.1}>
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <div className="glass-card overflow-hidden card-hover">
                          <div className={`h-48 bg-gradient-to-br ${categoryColors[post.category] ?? defaultColor} relative flex items-end p-6`}>
                            <span className="badge bg-white/20 text-white">{post.category}</span>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">{post.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
                                {post.views > 0 && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.views} views</span>}
                              </div>
                              <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Posts */}
          {rest.length > 0 && (
            <section className="py-16 bg-white dark:bg-[#0a0f1e]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-8">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <FadeIn key={post.id} delay={i * 0.08}>
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <div className="glass-card overflow-hidden card-hover">
                          <div className={`h-36 bg-gradient-to-br ${categoryColors[post.category] ?? defaultColor}`} />
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs">{post.category}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 dark:text-white mb-2 font-display text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </SiteLayout>
  )
}
