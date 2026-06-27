'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, LayoutDashboard, FileText, Briefcase, MessageSquare, Settings,
  Users, Image, BookOpen, LogOut, ChevronLeft, ChevronRight, Globe,
  Star, Mail, Bell
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/dashboard/pages', icon: Globe, label: 'Pages' },
      { href: '/admin/dashboard/services', icon: Briefcase, label: 'Services' },
      { href: '/admin/dashboard/portfolio', icon: Image, label: 'Portfolio' },
      { href: '/admin/dashboard/testimonials', icon: Star, label: 'Testimonials' },
      { href: '/admin/dashboard/blog', icon: BookOpen, label: 'Blog Posts' },
    ]
  },
  {
    label: 'Management',
    items: [
      { href: '/admin/dashboard/messages', icon: Mail, label: 'Messages' },
      { href: '/admin/dashboard/users', icon: Users, label: 'Admin Users' },
      { href: '/admin/dashboard/settings', icon: Settings, label: 'Settings' },
    ]
  },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('admin-auth')
    router.push('/admin')
  }

  return (
    <aside className={`flex flex-col h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && <span className="font-bold font-display text-white">SARAL Admin</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">{group.label}</p>
            )}
            <ul className="space-y-1">
              {group.items.map(item => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        active
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} size={18} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-slate-800 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white w-full transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-900/30 hover:text-red-400 w-full transition-all"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
