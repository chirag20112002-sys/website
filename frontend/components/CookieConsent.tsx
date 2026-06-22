'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Check } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setTimeout(() => setShow(true), 2000)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px] z-40"
        >
          <div className="glass-card p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-1 text-sm">We use cookies</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  We use cookies to enhance your experience. By continuing, you agree to our{' '}
                  <Link href="/privacy-policy" className="text-indigo-500 hover:underline">Privacy Policy</Link>.
                </p>
                <div className="flex gap-2">
                  <button onClick={accept} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors">
                    <Check className="w-3.5 h-3.5" /> Accept All
                  </button>
                  <button onClick={decline} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Decline
                  </button>
                </div>
              </div>
              <button onClick={decline} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
