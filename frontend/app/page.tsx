'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Code2, ShoppingBag, Settings, LayoutDashboard, ShoppingCart,
  Globe, Wrench, Palette, Bot, Star, CheckCircle, Users, Trophy, Coffee,
  Zap, Shield, Headphones, TrendingUp, ChevronRight, Play, Quote
} from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'

/* ─── Data ────────────────────────────────────────────────────── */
const services = [
  { icon: Code2, title: 'Website Development', desc: 'Custom, blazing-fast websites built with modern frameworks. Pixel-perfect design meets rock-solid performance.', color: 'from-indigo-500 to-purple-600', href: '/services#web' },
  { icon: ShoppingBag, title: 'Shopify Development', desc: 'Launch and scale your Shopify store with expert setup, theme customization, and app integrations.', color: 'from-emerald-500 to-teal-600', href: '/services#shopify' },
  { icon: Settings, title: 'Store Customization', desc: 'Transform your existing Shopify store with custom features, unique design, and enhanced UX.', color: 'from-orange-500 to-amber-600', href: '/services#shopify' },
  { icon: LayoutDashboard, title: 'Admin Panels', desc: 'Powerful, intuitive dashboards that give you complete control over your business data and operations.', color: 'from-blue-500 to-cyan-600', href: '/services#admin' },
  { icon: ShoppingCart, title: 'E-Commerce Solutions', desc: 'End-to-end e-commerce development — from product catalog to secure checkout and order management.', color: 'from-rose-500 to-pink-600', href: '/services#ecommerce' },
  { icon: Bot, title: 'Business Automation', desc: 'Automate repetitive tasks, integrate your tools, and let technology do the heavy lifting for growth.', color: 'from-violet-500 to-purple-600', href: '/services#automation' },
]

const whyUs = [
  { icon: Zap, title: 'Lightning Fast', desc: 'We deliver projects on time, every time. Speed is in our DNA.' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security practices in every project we build.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Our team is always available to help you grow and scale.' },
  { icon: TrendingUp, title: 'Results Driven', desc: 'We measure success by the growth and ROI we deliver for clients.' },
  { icon: Palette, title: 'Premium Design', desc: 'Stunning visuals that convert visitors into paying customers.' },
  { icon: Globe, title: 'Global Standards', desc: 'We build to international standards — accessible, SEO-ready, and performant.' },
]

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 80, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: ' yrs', label: 'Industry Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
]

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CEO', company: 'StyleVault', avatar: 'SM', rating: 5, text: 'AirX Solution transformed our online store into a revenue machine. Our conversions jumped 340% after the redesign. Absolutely phenomenal team!' },
  { name: 'James Rodriguez', role: 'Founder', company: 'TechNova Labs', avatar: 'JR', rating: 5, text: 'The admin dashboard they built saves us 15 hours a week. Clean code, great communication, delivered ahead of schedule. Highly recommend.' },
  { name: 'Priya Sharma', role: 'Marketing Director', company: 'GreenLeaf Co.', avatar: 'PS', rating: 5, text: 'From concept to launch in 3 weeks. The website looks stunning and loads in under 2 seconds. Our bounce rate dropped by 60%. Incredible work!' },
  { name: 'David Chen', role: 'CTO', company: 'FinEdge', avatar: 'DC', rating: 5, text: "We've worked with many agencies, but AirX stands apart. They genuinely care about the product and go above and beyond. True professionals." },
]

const portfolio = [
  { title: 'LuxeCommerce Store', category: 'Shopify', desc: 'Premium fashion brand with 50k+ products, custom checkout flow, and subscription features.', color: 'from-indigo-600 to-purple-700', icon: ShoppingBag },
  { title: 'FinTrack Dashboard', category: 'Admin Panel', desc: 'Real-time financial analytics dashboard processing $2M+ monthly transactions.', color: 'from-emerald-600 to-teal-700', icon: LayoutDashboard },
  { title: 'MediCare Portal', category: 'Web App', desc: 'Patient management system serving 5,000+ users with HIPAA-compliant data handling.', color: 'from-blue-600 to-cyan-700', icon: Globe },
  { title: 'SwiftDeliver Platform', category: 'E-Commerce', desc: 'Multi-vendor marketplace with real-time tracking and integrated logistics API.', color: 'from-orange-600 to-amber-700', icon: ShoppingCart },
  { title: 'AutoPilot CRM', category: 'Automation', desc: 'AI-powered sales CRM that automated 70% of the client\'s follow-up process.', color: 'from-violet-600 to-purple-700', icon: Bot },
  { title: 'EduLearn Academy', category: 'Web Dev', desc: 'E-learning platform with 10,000+ enrolled students and interactive video courses.', color: 'from-rose-600 to-pink-700', icon: Code2 },
]

/* ─── Animated Counter ────────────────────────────────────────── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / 60
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 20)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Section Wrapper ─────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0a0f1e]">
        {/* Background */}
        <div className="absolute inset-0 bg-grid dark:opacity-100 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-[#0a0f1e] dark:to-[#0a0f1e]" />

        {/* Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Premium Digital Agency
                <ChevronRight className="w-4 h-4" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6"
              >
                We Build{' '}
                <span className="gradient-text">Digital</span>
                <br />
                <span className="gradient-text">Experiences</span>
                <br />
                That Convert
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                From stunning websites and Shopify stores to powerful admin panels and business automation — AirX Solution turns your vision into a high-performing digital reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/portfolio" className="btn-secondary text-base px-8 py-4">
                  View Our Work
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start"
              >
                {['150+ Projects', '80+ Clients', '5★ Rating', '24/7 Support'].map(badge => (
                  <div key={badge} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-indigo-500" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-xl"
            >
              <div className="relative">
                {/* Main card */}
                <div className="glass-card p-8 relative z-10 animate-float">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {['Web Dev', 'Shopify', 'Admin Panel', 'E-Commerce'].map((s, i) => (
                      <div key={s} className={`p-4 rounded-xl bg-gradient-to-br ${['from-indigo-500/20 to-purple-500/20', 'from-emerald-500/20 to-teal-500/20', 'from-blue-500/20 to-cyan-500/20', 'from-rose-500/20 to-pink-500/20'][i]} border border-white/10`}>
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{s}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Premium quality</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div>
                      <p className="text-sm opacity-80">Project Success Rate</p>
                      <p className="text-2xl font-bold">99.8%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Floating stats */}
                <div className="absolute -top-4 -right-4 glass-card px-4 py-3 animate-float-delay z-20">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {['A', 'B', 'C'].map(l => (
                        <div key={l} className="w-7 h-7 rounded-full gradient-bg border-2 border-white flex items-center justify-center text-xs text-white font-bold">{l}</div>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">+80 clients</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 animate-float-delay-2 z-20">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-semibold">Revenue ↑ 340%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1"
        >
          <span className="text-xs font-medium">Scroll Down</span>
          <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-[#0d1423] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots dark:opacity-30 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-16">
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">What We Do</span>
            <h2 className="section-heading mb-4">Services Built for <span className="gradient-text">Growth</span></h2>
            <p className="section-sub">We don't just build websites — we build revenue-generating digital assets that work 24/7 for your business.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <Link href={s.href} className="block group">
                  <div className="glass-card p-7 h-full card-hover cursor-pointer border-transparent hover:border-indigo-500/30">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <s.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{s.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-5">{s.desc}</p>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="p-6">
                  <div className="text-5xl font-bold font-display mb-2">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-white/70 font-medium">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left */}
            <FadeIn className="flex-1">
              <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">Why AirX?</span>
              <h2 className="section-heading mb-5">Why Clients Choose <span className="gradient-text">Us</span></h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                We're not just developers — we're growth partners. Every project we take on is treated like our own business, with meticulous attention to performance, design, and user experience.
              </p>
              <div className="space-y-4 mb-8">
                {['Dedicated project manager for each client', 'Transparent communication throughout development', 'Post-launch support and maintenance included', 'Performance-optimized code, always'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-primary">
                Learn More About Us <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeIn>

            {/* Right Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUs.map((w, i) => (
                <FadeIn key={w.title} delay={i * 0.1}>
                  <div className="glass-card p-6 card-hover">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                      <w.icon className="w-5.5 h-5.5 text-indigo-600 dark:text-indigo-400" size={22} />
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-2 font-display">{w.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{w.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio Preview ──────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-[#0d1423] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-16">
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">Our Work</span>
            <h2 className="section-heading mb-4">Recent <span className="gradient-text">Projects</span></h2>
            <p className="section-sub">A glimpse of what we've built for our clients across industries and technologies.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="glass-card overflow-hidden card-hover group cursor-pointer">
                  <div className={`h-48 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                    <p.icon className="w-20 h-20 text-white/20 absolute" />
                    <div className="text-center text-white relative z-10 p-6">
                      <span className="badge bg-white/20 text-white text-xs mb-3">{p.category}</span>
                      <h4 className="font-bold text-lg font-display">{p.title}</h4>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 duration-300">
                        <ArrowRight className="w-5 h-5 text-slate-800" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary">
              View All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">Testimonials</span>
            <h2 className="section-heading mb-4">What Our Clients <span className="gradient-text">Say</span></h2>
            <p className="section-sub">Don't take our word for it — hear from the businesses we've helped grow.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="glass-card p-7 card-hover relative">
                  <Quote className="w-8 h-8 text-indigo-500/30 absolute top-5 right-5" />
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{t.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <Link href="/testimonials" className="btn-secondary">
              Read More Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20">
              <Coffee className="w-4 h-4" /> Let's Build Something Amazing
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight">
              Ready to Transform<br />Your Business?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's talk about your project. We offer free consultations and detailed project proposals — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold text-base hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-base hover:bg-white/20 transition-all hover:-translate-y-1">
                WhatsApp Us
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/60 text-sm">
              {['Free Consultation', 'No Hidden Fees', 'On-Time Delivery', 'Money-Back Guarantee'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/40" />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
