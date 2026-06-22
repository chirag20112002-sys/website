'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
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

const posts = [
  {
    slug: 'nextjs-vs-react-2024',
    title: 'Next.js vs React: Which Should You Choose in 2025?',
    excerpt: 'A comprehensive comparison of Next.js and React for building modern web applications, including performance benchmarks and use-case analysis.',
    category: 'Web Development',
    date: '2025-06-01',
    readTime: '8 min',
    color: 'from-indigo-500 to-purple-600',
    featured: true,
  },
  {
    slug: 'shopify-conversion-tips',
    title: '12 Shopify Store Optimization Tips That Doubled Our Client\'s Revenue',
    excerpt: 'Proven strategies we\'ve implemented across 50+ Shopify stores that consistently drive conversion rate improvements.',
    category: 'Shopify',
    date: '2025-05-22',
    readTime: '12 min',
    color: 'from-emerald-500 to-teal-600',
    featured: true,
  },
  {
    slug: 'admin-panel-design-principles',
    title: 'The 7 Design Principles Behind Great Admin Dashboards',
    excerpt: 'What separates a good admin panel from a great one? We break down the principles that make dashboards intuitive and powerful.',
    category: 'UI/UX Design',
    date: '2025-05-10',
    readTime: '6 min',
    color: 'from-blue-500 to-cyan-600',
    featured: false,
  },
  {
    slug: 'ecommerce-seo-guide',
    title: 'The Ultimate E-Commerce SEO Guide for 2025',
    excerpt: 'Drive organic traffic to your online store with our comprehensive SEO guide covering technical SEO, content strategy, and link building.',
    category: 'SEO',
    date: '2025-04-28',
    readTime: '15 min',
    color: 'from-rose-500 to-pink-600',
    featured: false,
  },
  {
    slug: 'tailwind-css-tips',
    title: '20 Tailwind CSS Tricks Every Developer Should Know',
    excerpt: 'Level up your Tailwind CSS skills with these advanced techniques for custom animations, complex layouts, and design system creation.',
    category: 'Web Development',
    date: '2025-04-15',
    readTime: '10 min',
    color: 'from-violet-500 to-purple-600',
    featured: false,
  },
  {
    slug: 'mongodb-performance-optimization',
    title: 'MongoDB Performance Optimization: From Slow to Blazing Fast',
    excerpt: 'Practical techniques for optimizing MongoDB queries, indexing strategies, and schema design patterns for high-traffic applications.',
    category: 'Backend',
    date: '2025-04-02',
    readTime: '11 min',
    color: 'from-green-500 to-emerald-600',
    featured: false,
  },
  {
    slug: 'business-automation-roi',
    title: 'How Business Automation Delivers 10x ROI (With Real Examples)',
    excerpt: 'A data-driven look at how business process automation delivers measurable returns, with case studies from our client portfolio.',
    category: 'Automation',
    date: '2025-03-20',
    readTime: '9 min',
    color: 'from-orange-500 to-amber-600',
    featured: false,
  },
  {
    slug: 'web-performance-2025',
    title: 'Web Performance in 2025: The Developer\'s Complete Guide',
    excerpt: 'Core Web Vitals, image optimization, lazy loading, code splitting — everything you need to build a blazing-fast website.',
    category: 'Web Development',
    date: '2025-03-05',
    readTime: '14 min',
    color: 'from-fuchsia-500 to-pink-600',
    featured: false,
  },
]

export default function BlogPage() {
  const featured = posts.filter(p => p.featured)
  const rest = posts.filter(p => !p.featured)

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
              Expert articles on web development, Shopify, UI/UX, and digital strategy from the AirX team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="glass-card overflow-hidden card-hover">
                    <div className={`h-48 bg-gradient-to-br ${post.color} relative flex items-end p-6`}>
                      <span className="badge bg-white/20 text-white">{post.category}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">{post.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} read</span>
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

      {/* All Posts */}
      <section className="py-16 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="glass-card overflow-hidden card-hover">
                    <div className={`h-36 bg-gradient-to-br ${post.color}` } />
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs">{post.category}</span>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-2 font-display text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
