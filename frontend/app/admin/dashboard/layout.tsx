'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { Bell, Search, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const auth = localStorage.getItem('admin-auth')
    if (!auth) router.replace('/admin')
  }, [router])

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search..." className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none flex-1" />
          </div>
          <div className="flex items-center gap-3">
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-700">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">A</div>
              <div>
                <p className="text-xs font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
