'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, FileText, Briefcase, Star, TrendingUp, Eye, ArrowUp, Mail, Activity, Globe } from 'lucide-react'
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

const stats = [
  { label: 'Total Page Views', value: '24,895', change: '+18.2%', icon: Eye, color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-500/10' },
  { label: 'Contact Inquiries', value: '142', change: '+12.5%', icon: Mail, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/10' },
  { label: 'Portfolio Projects', value: '9', change: '+3', icon: Briefcase, color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500/10' },
  { label: 'Testimonials', value: '10', change: '+2', icon: Star, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-500/10' },
]

const quickLinks = [
  { href: '/admin/dashboard/blog', label: 'Add Blog Post', icon: FileText, desc: 'Publish new articles' },
  { href: '/admin/dashboard/portfolio', label: 'Add Project', icon: Briefcase, desc: 'Showcase new work' },
  { href: '/admin/dashboard/testimonials', label: 'Add Testimonial', icon: Star, desc: 'Add client review' },
  { href: '/admin/dashboard/settings', label: 'Site Settings', icon: Globe, desc: 'Manage SEO & meta' },
]

const recentMessages = [
  { name: 'Rajesh Agarwal', email: 'rajesh@agarwaltraders.in', service: 'ERP Development', time: '2 hours ago', status: 'new' },
  { name: 'Pooja Mehta', email: 'pooja@techstartup.in', service: 'HRMS & Payroll', time: '5 hours ago', status: 'new' },
  { name: 'Sunil Verma', email: 'sunil@vermaenterprises.in', service: 'CRM System', time: '1 day ago', status: 'replied' },
  { name: 'Anita Sharma', email: 'anita@sharmagroup.com', service: 'Inventory Management', time: '2 days ago', status: 'replied' },
  { name: 'Mohammed Farouk', email: 'farouk@gulflogistics.ae', service: 'Business Software', time: '3 days ago', status: 'closed' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-white mb-1">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <ArrowUp className="w-3 h-3" /> {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <FadeIn className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="font-bold text-white font-display mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickLinks.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                    <link.icon className="w-4.5 h-4.5 text-indigo-400" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{link.label}</p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Recent Messages */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white font-display">Recent Inquiries</h2>
              <Link href="/admin/dashboard/messages" className="text-xs text-indigo-400 hover:text-indigo-300">View all</Link>
            </div>
            <div className="space-y-3">
              {recentMessages.map(msg => (
                <div key={msg.email} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 justify-between">
                      <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                      <span className={`badge text-xs flex-shrink-0 ${
                        msg.status === 'new' ? 'bg-indigo-500/20 text-indigo-400' :
                        msg.status === 'replied' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>{msg.status}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{msg.service} · {msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Activity chart placeholder */}
      <FadeIn delay={0.2}>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white font-display flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-indigo-400" size={18} /> Site Activity (Last 7 Days)
            </h2>
            <select className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="flex items-end gap-2 h-32">
            {[65, 80, 55, 90, 70, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg gradient-bg opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${h}%` }}
                  title={`Day ${i + 1}: ${h * 10} views`}
                />
                <span className="text-xs text-slate-600">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
