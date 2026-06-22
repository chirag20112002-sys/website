'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Heart, Zap, Users, Trophy, ArrowRight, CheckCircle, Lightbulb, Globe, Shield, TrendingUp } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const values = [
  { icon: Zap, title: 'Innovation First', desc: 'We embrace cutting-edge technologies and creative solutions to solve complex challenges.' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'Every line of code we write meets our rigorous quality standards before it goes live.' },
  { icon: Heart, title: 'Client-Centric', desc: 'Your success is our success. We go above and beyond to exceed your expectations.' },
  { icon: Globe, title: 'Global Perspective', desc: 'We design and build for diverse audiences with accessibility and inclusivity at the core.' },
  { icon: TrendingUp, title: 'Growth Mindset', desc: 'We are continuously learning, improving, and staying ahead of industry trends.' },
  { icon: Users, title: 'Collaborative', desc: 'We work as an extension of your team, keeping you involved and informed at every step.' },
]

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', initials: 'AR', color: 'from-indigo-500 to-purple-600', bio: '10+ years in web development and digital strategy.' },
  { name: 'Sarah Kim', role: 'Lead Designer', initials: 'SK', color: 'from-emerald-500 to-teal-600', bio: 'UI/UX expert with a passion for beautiful, functional design.' },
  { name: 'Marcus Chen', role: 'Head of Engineering', initials: 'MC', color: 'from-orange-500 to-amber-600', bio: 'Full-stack engineer specializing in scalable architectures.' },
  { name: 'Priya Patel', role: 'Shopify Expert', initials: 'PP', color: 'from-rose-500 to-pink-600', bio: 'Certified Shopify developer with 50+ store launches.' },
  { name: 'James Thompson', role: 'Project Manager', initials: 'JT', color: 'from-blue-500 to-cyan-600', bio: 'PMP certified, ensures every project runs like clockwork.' },
  { name: 'Layla Hassan', role: 'Backend Developer', initials: 'LH', color: 'from-violet-500 to-purple-600', bio: 'Node.js & database architecture specialist.' },
]

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">About AirX Solution</span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              We're a Team of <span className="gradient-text">Digital Craftsmen</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Founded with a mission to make premium digital experiences accessible to businesses of all sizes, AirX Solution has grown into a trusted partner for over 80 companies worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <FadeIn className="flex-1">
              <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">Our Story</span>
              <h2 className="text-4xl font-bold font-display mb-5">Built From <span className="gradient-text">Passion</span></h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>AirX Solution was born in 2019 from a simple frustration: great digital agencies were out of reach for most small and medium businesses. Our founder, Alex Rivera, saw businesses struggle with overpriced, underperforming websites and vowed to change that.</p>
                <p>Starting as a two-person team, we took on every project with the same level of care and craftsmanship — whether it was a simple landing page or a complex e-commerce platform. That commitment to quality earned us our first clients, who became our biggest advocates.</p>
                <p>Today, we're a team of 15+ specialists across development, design, and strategy. We've delivered 150+ projects across 20+ industries, and we're just getting started.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: '2019', icon: Lightbulb },
                  { label: 'Team Members', value: '15+', icon: Users },
                  { label: 'Projects Delivered', value: '150+', icon: Trophy },
                  { label: 'Countries Served', value: '12+', icon: Globe },
                ].map(item => (
                  <div key={item.label} className="glass-card p-6 text-center">
                    <item.icon className="w-8 h-8 mx-auto mb-3 text-indigo-500" />
                    <p className="text-3xl font-bold gradient-text font-display">{item.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="section-heading mb-4">Our <span className="gradient-text">Mission & Vision</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="glass-card p-8 h-full border-l-4 border-indigo-500">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-4">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To empower businesses of every size with world-class digital solutions that drive real, measurable growth. We believe that exceptional technology should be accessible, not a luxury reserved for Fortune 500 companies.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="glass-card p-8 h-full border-l-4 border-cyan-500">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-800 dark:text-white mb-4">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To be the most trusted digital partner for growing businesses worldwide — a team that doesn't just build products, but builds lasting relationships through transparency, quality, and shared success.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">What We Stand For</span>
            <h2 className="section-heading mb-4">Our Core <span className="gradient-text">Values</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="glass-card p-6 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 font-display">{v.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">The People</span>
            <h2 className="section-heading mb-4">Meet Our <span className="gradient-text">Team</span></h2>
            <p className="section-sub">A passionate group of designers, developers, and strategists committed to your success.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <div className="glass-card p-6 text-center card-hover">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                    {m.initials}
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white font-display">{m.name}</h4>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-2">{m.role}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.bio}</p>
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
            <h2 className="text-4xl font-bold font-display text-white mb-5">Ready to Work Together?</h2>
            <p className="text-xl text-white/70 mb-8">Let's discuss your project and create something amazing.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
