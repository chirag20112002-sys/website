'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Target, Eye, Heart, Zap, Users, Trophy, ArrowRight, CheckCircle, Lightbulb, Globe, Shield, TrendingUp } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'

type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  photo: string
  initials: string
  color: string
}

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
  { icon: Zap, title: 'Innovation First', desc: 'We embrace cutting-edge technologies and creative solutions to solve complex business challenges.' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'Every module we build meets rigorous quality standards before it goes live in your business.' },
  { icon: Heart, title: 'Client-Centric', desc: 'Your success is our success. We go above and beyond to exceed your expectations at every step.' },
  { icon: Globe, title: 'India-Focused', desc: 'Built for Indian businesses — GST-ready, multi-language, and compliant with local regulations.' },
  { icon: TrendingUp, title: 'Growth Mindset', desc: 'We continuously learn, improve, and stay ahead of industry trends to serve you better.' },
  { icon: Users, title: 'Collaborative', desc: 'We work as an extension of your team, keeping you involved and informed throughout the project.' },
]

const DEFAULT_TEAM: TeamMember[] = [
  { id: 1, name: 'Chirag Chhatwal', role: 'Founder, CEO & Managing Director', initials: 'CC', color: 'from-violet-500 to-purple-700', photo: '', bio: '8+ years in business software and digital solutions. Passionate about making technology accessible to every Indian business.' },
  { id: 2, name: 'Nitin Kumar', role: 'Co-Founder', initials: 'NK', color: 'from-indigo-500 to-blue-700', photo: '', bio: 'Full-stack engineer specializing in ERP systems, cloud infrastructure, and scalable architectures.' },
  { id: 3, name: 'Riya', role: 'Social Media Manager', initials: 'R', color: 'from-pink-500 to-rose-600', photo: '', bio: 'Crafts compelling brand stories and drives engagement across all digital platforms.' },
  { id: 4, name: 'Sonu', role: 'Creative Designer', initials: 'S', color: 'from-emerald-500 to-teal-600', photo: '', bio: 'Translates ideas into stunning visuals. Specializes in UI/UX and brand identity design.' },
  { id: 5, name: 'Sunny Rathor', role: 'Performance Marketing Manager', initials: 'SR', color: 'from-amber-500 to-orange-600', photo: '', bio: 'Data-driven marketer focused on ROI, paid ads, and growth strategies for Indian markets.' },
]

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM)

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (Array.isArray(data) && data.length > 0) setTeam(data) })
      .catch(() => {})
  }, [])

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-violet-100 text-violet-600 mb-5">About SARAL MIS</span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              We're a Team of <span className="gradient-text">Digital Builders</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Founded with a mission to simplify business operations for every company, SARAL MIS has grown into a trusted partner for 80+ businesses across India and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <FadeIn className="flex-1">
              <span className="badge bg-violet-100 text-violet-600 mb-4">Our Story</span>
              <h2 className="text-4xl font-bold font-display mb-5">Built From <span className="gradient-text">Passion</span></h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>SARAL MIS was founded in 2020 when Chirag Chhatwal and Nitin Kumar saw a gap: powerful business software was either too expensive or too complex for Indian SMBs. They vowed to build solutions that actually fit how Indian businesses operate.</p>
                <p>Starting as a two-person team, we took on every project with the same level of care — whether it was a simple billing system or a full ERP platform. That commitment earned us our first clients, who became our biggest advocates.</p>
                <p>Today, we're a team of 15+ specialists across development, design, and strategy. We've delivered 150+ projects across 20+ industries, and we're just getting started.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: '2020', icon: Lightbulb },
                  { label: 'Team Members', value: '15+', icon: Users },
                  { label: 'Projects Delivered', value: '150+', icon: Trophy },
                  { label: 'Industries Served', value: '20+', icon: Globe },
                ].map(item => (
                  <div key={item.label} className="glass-card p-6 text-center">
                    <item.icon className="w-8 h-8 mx-auto mb-3 text-violet-500" />
                    <p className="text-3xl font-bold gradient-text font-display">{item.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="section-heading mb-4">Our <span className="gradient-text">Mission & Vision</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="glass-card p-8 h-full border-l-4 border-violet-500">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-800 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To empower Indian businesses of every size with powerful, affordable management software — CRM, ERP, HRMS, Payroll, and more — that actually simplifies operations and drives measurable growth.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="glass-card p-8 h-full border-l-4 border-purple-500">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-800 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To become the most trusted business software partner for growing companies in India — a team that doesn't just build products, but builds lasting relationships through transparency, quality, and shared success.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-violet-100 text-violet-600 mb-4">What We Stand For</span>
            <h2 className="section-heading mb-4">Our Core <span className="gradient-text">Values</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="glass-card p-6 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 font-display">{v.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-violet-100 text-violet-600 mb-4">The People</span>
            <h2 className="section-heading mb-4">Meet Our <span className="gradient-text">Team</span></h2>
            <p className="section-sub">A passionate group of engineers, designers, and strategists committed to your business success.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <div className="glass-card p-6 text-center card-hover">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 shadow-lg border-2 border-violet-100"
                    />
                  ) : (
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                      {m.initials}
                    </div>
                  )}
                  <h4 className="font-bold text-slate-800 font-display text-lg">{m.name}</h4>
                  <p className="text-violet-600 text-sm font-semibold mb-2">{m.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.bio}</p>
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
            <h2 className="text-4xl font-bold font-display text-white mb-5">Ready to Simplify Your Business?</h2>
            <p className="text-xl text-white/70 mb-8">Let's discuss your requirements and build the right solution together.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-700 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
