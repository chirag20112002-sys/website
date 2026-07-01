'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, FileText, Briefcase, Star, ArrowUp, Mail, Activity, Globe, RefreshCw, Clock } from 'lucide-react'
import Link from 'next/link'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const quickLinks = [
  { href: '/admin/dashboard/messages', label: 'View Inquiries', icon: Mail, desc: 'Read contact form messages' },
  { href: '/admin/dashboard/portfolio', label: 'Add Project', icon: Briefcase, desc: 'Showcase new work' },
  { href: '/admin/dashboard/team', label: 'Manage Team', icon: Users, desc: 'Update team members' },
  { href: '/admin/dashboard/settings', label: 'Site Settings', icon: Globe, desc: 'Manage SEO & meta' },
]

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type Message = {
  id: string
  name: string
  email: string
  company: string
  service: string
  created_at: string
  status: string
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [portfolioCount, setPortfolioCount] = useState(0)
  const [testimonialCount, setTestimonialCount] = useState(0)
  const [serviceCount, setServiceCount] = useState(0)

  const load = async () => {
    setLoading(true)
    try {
      const [msgRes, portRes, testRes, svcRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/portfolio?admin=true'),
        fetch('/api/testimonials?admin=true'),
        fetch('/api/services?admin=true'),
      ])
      if (msgRes.ok) setMessages(await msgRes.json())
      if (portRes.ok) setPortfolioCount((await portRes.json()).length)
      if (testRes.ok) setTestimonialCount((await testRes.json()).length)
      if (svcRes.ok) setServiceCount((await svcRes.json()).length)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const newCount = messages.filter(m => m.status === 'new').length
  const recentMessages = messages.slice(0, 5)

  // Build last-7-days chart from real message timestamps
  const chartData = (() => {
    const today = new Date()
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() - (6 - i))
      return { label: DAY_LABELS[d.getDay()], date: d.toDateString(), count: 0 }
    })
    messages.forEach(m => {
      const msgDate = new Date(m.created_at).toDateString()
      const slot = days.find(d => d.date === msgDate)
      if (slot) slot.count++
    })
    return days
  })()

  const maxCount = Math.max(...chartData.map(d => d.count), 1)

  const stats = [
    { label: 'Contact Inquiries', value: messages.length, sub: `${newCount} new`, icon: Mail, bg: 'bg-violet-50', iconColor: 'text-violet-600' },
    { label: 'Portfolio Projects', value: portfolioCount, sub: 'total added', icon: Briefcase, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Testimonials', value: testimonialCount, sub: 'in database', icon: Star, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
    { label: 'Active Services', value: serviceCount, sub: 'on website', icon: Globe, bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  ]

  const statusColor = (s: string) =>
    s === 'new' ? 'bg-violet-100 text-violet-700' :
    s === 'replied' ? 'bg-emerald-100 text-emerald-700' :
    'bg-gray-100 text-slate-500'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800 mb-1">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Live data from your database.</p>
        </div>
        <button onClick={load} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all" title="Refresh">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08}>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                {loading ? (
                  <div className="w-8 h-4 bg-gray-100 rounded animate-pulse" />
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ArrowUp className="w-3 h-3" /> Live
                  </span>
                )}
              </div>
              {loading ? (
                <div className="space-y-2">
                  <div className="w-12 h-7 bg-gray-100 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label} · {s.sub}</p>
                </>
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <FadeIn className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-slate-800 font-display mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-violet-50 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <link.icon className="text-violet-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{link.label}</p>
                    <p className="text-xs text-slate-400">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Recent Messages */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 font-display">Recent Inquiries</h2>
              <Link href="/admin/dashboard/messages" className="text-xs text-violet-600 hover:text-violet-700">View all</Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="w-32 h-3 bg-gray-100 rounded animate-pulse" />
                      <div className="w-48 h-2.5 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No inquiries yet.</p>
            ) : (
              <div className="space-y-1">
                {recentMessages.map(msg => (
                  <div key={msg.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 justify-between">
                        <p className="text-sm font-medium text-slate-700 truncate">{msg.name}</p>
                        <span className={`badge text-xs flex-shrink-0 ${statusColor(msg.status)}`}>{msg.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                        {msg.service && <span>{msg.service} · </span>}
                        <Clock className="w-2.5 h-2.5 inline" />
                        {' '}{new Date(msg.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Activity chart — messages per day (last 7 days) */}
      <FadeIn delay={0.2}>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-800 font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-600" /> Contact Inquiries — Last 7 Days
            </h2>
            <span className="text-xs text-slate-400">{messages.length} total messages</span>
          </div>
          {loading ? (
            <div className="flex items-end gap-2 h-32">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gray-100 rounded-t-lg animate-pulse" style={{ height: `${Math.random() * 60 + 20}%` }} />
                  <div className="w-5 h-2.5 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-end gap-2 h-32">
              {chartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg gradient-bg transition-all duration-500 cursor-pointer hover:opacity-90"
                    style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count > 0 ? '6px' : '2px', opacity: d.count > 0 ? 0.8 : 0.15 }}
                    title={`${d.label}: ${d.count} message${d.count !== 1 ? 's' : ''}`}
                  />
                  <span className="text-xs text-slate-400">{d.label}</span>
                </div>
              ))}
            </div>
          )}
          {!loading && messages.length === 0 && (
            <p className="text-xs text-slate-400 text-center mt-2">No messages yet — chart will populate as inquiries come in.</p>
          )}
        </div>
      </FadeIn>
    </div>
  )
}
