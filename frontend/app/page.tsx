'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Zap, Globe, LayoutDashboard, ShoppingBag, TrendingUp, Palette,
  Star, CheckCircle, Users, Trophy, Code2, Package, UserCheck, BadgeDollarSign,
  Kanban, ShoppingCart, BarChart3, Settings, Quote, Play, X,
  Factory, Heart, Truck, GraduationCap, Rocket, Building2, Store,
  Search, FileText, Shield, Clock, Sparkles, ArrowUpRight,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import { siteConfig, solutions, products, technologies, processSteps, industries } from '@/config/site'

/* ─── helpers ─────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', direction = 'up' }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: 'up' | 'left' | 'right' | 'none'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const variants = {
    up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  }[direction]
  return (
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function Counter({ to, suffix = '', duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

const iconMap: Record<string, React.ElementType> = {
  Globe, LayoutDashboard, ShoppingBag, TrendingUp, Palette, Zap,
  Users, Package, UserCheck, BadgeDollarSign, Kanban, ShoppingCart, BarChart3, Settings,
  Factory, Heart, Truck, GraduationCap, Rocket, Building2, Store, Search, FileText,
  Code2, CheckCircle, Trophy, Star, ArrowRight,
}
function Icon({ name, className }: { name: string; className?: string }) {
  const C = iconMap[name] ?? Zap
  return <C className={className} />
}

/* ─── Video Modal ────────────────────────────────────────────── */
const DEMO_VIDEO_ID = 'mxBgN6FXmUI' // Replace with your actual YouTube demo video ID

function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
          style={{ aspectRatio: '16/9' }}
          onClick={e => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Section: Hero ─────────────────────────────────────────── */
function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-20 -left-32 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />

      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 text-sm font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" /> {siteConfig.tagline}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-slate-900"
            >
              {siteConfig.headline.split(' ').slice(0, 3).join(' ')}{' '}
              <span className="gradient-text">{siteConfig.headline.split(' ').slice(3, 6).join(' ')}</span>
              {' '}{siteConfig.headline.split(' ').slice(6).join(' ')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-8 max-w-xl"
            >
              {siteConfig.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link href={siteConfig.cta.primary.href} className="btn-primary text-base px-7 py-3.5">
                {siteConfig.cta.primary.label} <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Watch Demo Button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-violet-400 hover:text-violet-600 transition-all text-base group"
              >
                <span className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-700 transition-colors animate-pulse-glow">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </span>
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { icon: CheckCircle, label: 'No hidden fees' },
                { icon: Shield, label: 'Source code ownership' },
                { icon: Clock, label: 'On-time delivery' },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-500">
                  <I className="w-4 h-4 text-emerald-500" /> {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-violet-500/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-3 h-5 rounded-md bg-slate-200 text-[10px] text-slate-400 flex items-center px-2">suprimohub.in/dashboard</div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Revenue', val: '₹2.4L', change: '+18%', color: 'text-emerald-500' },
                    { label: 'Orders', val: '1,284', change: '+12%', color: 'text-blue-500' },
                    { label: 'Clients', val: '84', change: '+6%', color: 'text-violet-500' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className="text-[10px] text-slate-400 mb-1">{s.label}</p>
                      <p className="text-lg font-bold text-slate-800 leading-none">{s.val}</p>
                      <p className={`text-[10px] font-semibold mt-1 ${s.color}`}>{s.change}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-semibold text-slate-600 mb-3">Monthly Growth</p>
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 78, 100].map((h, i) => (
                      <motion.div key={i}
                        initial={{ height: 0 }} animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className={`flex-1 rounded-t-sm ${i === 11 ? 'bg-gradient-to-t from-violet-600 to-purple-500' : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Jan', 'Apr', 'Jul', 'Oct', 'Dec'].map(m => <span key={m} className="text-[9px] text-slate-400">{m}</span>)}
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'New client onboarded', time: '2m ago', status: 'success' },
                    { name: 'Invoice generated', time: '1h ago', status: 'info' },
                    { name: 'Payroll processed', time: '3h ago', status: 'warning' },
                  ].map(a => (
                    <div key={a.name} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.status === 'success' ? 'bg-emerald-500' : a.status === 'info' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                        <span className="text-xs text-slate-700">{a.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
              <div><p className="text-xs font-bold text-slate-800">Project Live</p><p className="text-[10px] text-slate-400">Delivered on time</p></div>
            </motion.div>

            <motion.div animate={{ y: [8, -8, 8] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-violet-500" /></div>
              <div><p className="text-xs font-bold text-slate-800">+340% Efficiency</p><p className="text-[10px] text-slate-400">Client result</p></div>
            </motion.div>

            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-10 bg-white rounded-2xl border border-slate-200 shadow-xl p-3">
              <div className="flex gap-1 mb-1">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
              <p className="text-[10px] font-bold text-slate-800">5.0 Rating</p>
              <p className="text-[9px] text-slate-400">80+ reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Section: Marquee Strip ─────────────────────────────────── */
const marqueeItems = [
  '🏭 Manufacturing', '🛒 Retail', '🏥 Healthcare', '🚚 Logistics',
  '🎓 Education', '🏠 Real Estate', '🍽️ Restaurants', '🚀 Startups',
  '🏪 Wholesale', '🌐 Ecommerce', '💰 Finance', '⚡ Energy',
]

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="py-5 bg-[#1e0a4a] border-y border-violet-900/40 overflow-hidden">
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-0 flex-shrink-0">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 px-8 border-r border-violet-800/60 last:border-0">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Section: Stats ─────────────────────────────────────────── */
function StatsSection() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-200">
          {siteConfig.stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center lg:px-8">
              <p className="text-4xl lg:text-5xl font-bold gradient-text font-display mb-1">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section: Solutions ────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="badge bg-violet-100 text-violet-600 mb-4">What We Do</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            Everything Your Business <span className="gradient-text">Needs to Grow</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From beautiful websites to powerful software that automates and scales your business operations.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.07}>
              <Link href={`/solutions#${s.id}`} className="block group">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon name={s.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-violet-600 transition-colors">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.services.slice(0, 3).map(sv => (
                      <span key={sv} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">{sv}</span>
                    ))}
                    {s.services.length > 3 && <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">+{s.services.length - 3} more</span>}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all">
            Explore all solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Section: Products Carousel ────────────────────────────── */
function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const onScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanLeft(scrollLeft > 10)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  // Auto-advance every 3 s
  useEffect(() => {
    const timer = setInterval(() => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' })
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="badge bg-purple-100 text-purple-600 mb-3">SaaS Products</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Powerful Software <span className="gradient-text">Built for Scale</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                canLeft ? 'border-violet-600 text-violet-600 hover:bg-violet-50' : 'border-slate-200 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                canRight ? 'border-violet-600 text-violet-600 hover:bg-violet-50' : 'border-slate-200 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative flex-shrink-0 w-64 snap-start rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {p.badge && (
                <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badge === 'Popular' ? 'bg-violet-500 text-white' : 'bg-emerald-500 text-white'}`}>
                  {p.badge}
                </span>
              )}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon name={p.icon} className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-violet-600 transition-colors">{p.title}</h3>
              <p className="text-[11px] text-slate-400 mb-2 font-medium">{p.subtitle}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        <FadeIn className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all">
            See all products <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Section: Process ──────────────────────────────────────── */
function ProcessSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="badge bg-emerald-100 text-emerald-600 mb-4">How We Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            A Process Designed for <span className="gradient-text">Flawless Delivery</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Every project follows our proven 7-step process that ensures quality, transparency, and on-time delivery.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-20" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.slice(0, 4).map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="relative text-center p-6 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors group">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                    <Icon name={step.icon} className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-violet-500 mb-1 block">STEP {step.step}</span>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 max-w-3xl mx-auto">
            {processSteps.slice(4).map((step, i) => (
              <FadeIn key={step.step} delay={0.4 + i * 0.1}>
                <div className="relative text-center p-6 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors group">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                    <Icon name={step.icon} className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-violet-500 mb-1 block">STEP {step.step}</span>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section: Technologies ────────────────────────────────── */
function TechSection() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="badge bg-cyan-100 text-cyan-600 mb-4">Tech Stack</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            Built with <span className="gradient-text">World-Class Technology</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We use the same technology stack as the world's top companies — built for speed, scale, and reliability.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.04}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tech.color} mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform`} />
                <p className="text-sm font-semibold text-slate-700 group-hover:text-violet-600 transition-colors">{tech.name}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section: Industries ───────────────────────────────────── */
function IndustriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="badge bg-amber-100 text-amber-600 mb-4">Industries</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            We Serve <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From manufacturing to retail, healthcare to logistics — our solutions adapt to every sector's unique challenges.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <FadeIn key={ind.title} delay={i * 0.05}>
              <Link href="/industries" className="group block">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl ${ind.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon name={ind.icon} className={`w-6 h-6 ${ind.color}`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-violet-600 transition-colors">{ind.title}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section: Testimonials Infinite Slider ─────────────────── */
const allTestimonials = [
  { id: '1', name: 'Rajesh Agarwal', role: 'CEO', company: 'Agarwal Traders', rating: 5, text: 'SARAL MIS transformed how we manage inventory and billing. What used to take 3 hours now takes 15 minutes. Exceptional work!' },
  { id: '2', name: 'Priya Sharma', role: 'HR Manager', company: 'TechNova Pvt Ltd', rating: 5, text: 'The HRMS and Payroll system saved our team 20+ hours every month. Delivered on time and works flawlessly.' },
  { id: '3', name: 'Mohammed Farouk', role: 'Operations Head', company: 'Gulf Logistics', rating: 5, text: 'From CRM to operations dashboard in 6 weeks. Team visibility improved 10x and customer satisfaction jumped.' },
  { id: '4', name: 'Sunita Kapoor', role: 'Founder', company: 'Kapoor Retail Chain', rating: 5, text: 'The POS and inventory system synced perfectly across our 5 stores. Best investment we made this year.' },
  { id: '5', name: 'Vikram Singh', role: 'Director', company: 'Singh Constructions', rating: 5, text: 'Project tracking and billing in one dashboard — our team finally stopped chasing Excel sheets. Love it.' },
  { id: '6', name: 'Anita Patel', role: 'CFO', company: 'Patel Industries', rating: 5, text: 'GST-ready payroll with automatic calculations. We cut our accounting overhead by 40%. Highly recommended.' },
  { id: '7', name: 'Deepak Nair', role: 'MD', company: 'Kerala Exports', rating: 5, text: 'Multi-location inventory management made simple. SARAL MIS understood our business from day one.' },
  { id: '8', name: 'Ritu Gupta', role: 'Owner', company: 'Gupta Restaurant Group', rating: 5, text: 'The POS system is fast, clean, and our staff trained in a day. Sales reports are crystal clear.' },
]

function TestimonialCard({ t }: { t: typeof allTestimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-80 mx-3 rounded-2xl border border-slate-200 bg-white p-6 relative">
      <Quote className="w-7 h-7 text-violet-200 absolute top-5 right-5" />
      <div className="flex gap-1 mb-3">
        {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
          <p className="text-xs text-slate-400">{t.role}, {t.company}</p>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const row1 = [...allTestimonials, ...allTestimonials]
  const row2 = [...allTestimonials.slice(4), ...allTestimonials.slice(0, 4), ...allTestimonials.slice(4), ...allTestimonials.slice(0, 4)]

  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn className="text-center">
          <span className="badge bg-rose-100 text-rose-600 mb-4">Client Stories</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Trusted by <span className="gradient-text">Growing Businesses</span>
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            <span className="ml-2 font-bold text-slate-700">5.0</span>
            <span className="text-slate-400 text-sm ml-1">· 80+ happy clients</span>
          </div>
        </FadeIn>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex overflow-hidden mb-4">
        <div className="flex animate-marquee-slow py-1">
          {row1.map((t, i) => <TestimonialCard key={`r1-${i}`} t={t} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee-reverse py-1">
          {row2.map((t, i) => <TestimonialCard key={`r2-${i}`} t={t} />)}
        </div>
      </div>

      <FadeIn className="text-center mt-10">
        <Link href="/testimonials" className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all">
          Read all stories <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </section>
  )
}

/* ─── Section: CTA ───────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5" /> Ready to get started?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Simplify Your <br />Business Operations
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join 80+ businesses who've chosen SARAL MIS to digitize, automate, and scale. Free consultation — no commitment required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl text-lg">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all hover:-translate-y-1 text-lg">
              WhatsApp Us
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <SolutionsSection />
      <ProductsSection />
      <ProcessSection />
      <TechSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
    </SiteLayout>
  )
}
