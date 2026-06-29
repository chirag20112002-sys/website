'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    if (email === 'admin@saralmis.in' && password === 'admin123') {
      localStorage.setItem('admin-auth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Invalid email or password. Try admin@saralmis.in / admin123')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white mb-1">Admin Panel</h1>
            <p className="text-slate-400 text-sm">SARAL MIS Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@saralmis.in"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" size={18} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="p-3 rounded-xl bg-indigo-900/20 border border-indigo-500/30 text-indigo-400 text-xs">
              Demo: admin@saralmis.in / admin123
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                'Sign In to Admin Panel'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
