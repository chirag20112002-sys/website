'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronDown, ArrowRight } from 'lucide-react'
import { useSiteSettings } from '@/components/SiteSettingsProvider'

const navItems = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Portfolio', href: '/portfolio' },
  {
    label: 'Company',
    children: [
      { label: 'About Us', href: '/about', desc: 'Our story and mission' },
      { label: 'Process', href: '/process', desc: 'How we work' },
      { label: 'Blog', href: '/blog', desc: 'Insights and resources' },
      { label: 'Testimonials', href: '/testimonials', desc: 'Client success stories' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const settings = useSiteSettings()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isHome = pathname === '/'
  const siteName = settings.site_name || 'SARAL MIS'
  const [brandPrefix, brandSuffix] = siteName.includes(' ')
    ? [siteName.split(' ')[0], ' ' + siteName.split(' ').slice(1).join(' ')]
    : [siteName, '']

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-violet-100/80 shadow-sm shadow-violet-100'
          : isHome
            ? 'bg-transparent'
            : 'bg-white/90 backdrop-blur-md border-b border-violet-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {settings.logo_url ? (
              <img
                src={settings.logo_url}
                alt={siteName}
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-[17px] tracking-tight font-display">
                  <span style={{ color: isHome && !scrolled ? '#c4b5fd' : '#A78BFA' }}>{brandPrefix}</span>
                  <span style={{ color: isHome && !scrolled ? '#ffffff' : '#4C1D95' }}>{brandSuffix}</span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isHome && !scrolled
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-violet-600 hover:bg-slate-100'
                  }`}>
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden p-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-violet-50 transition-colors group"
                          >
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-violet-600 flex items-center gap-1.5">
                              {child.label}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                            </span>
                            <span className="text-xs text-slate-400 mt-0.5">{child.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === item.href
                      ? isHome && !scrolled
                        ? 'text-white bg-white/15'
                        : 'text-violet-600 bg-violet-50'
                      : isHome && !scrolled
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-slate-600 hover:text-violet-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link href="/contact" className={`text-sm py-2 px-5 rounded-xl font-semibold transition-all duration-200 ${
              isHome && !scrolled
                ? 'bg-white text-violet-700 hover:bg-white/90'
                : 'btn-primary'
            }`}>
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                isHome && !scrolled
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-violet-200 text-violet-700'
              }`}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-violet-100 bg-white/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="pt-1">
                    <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      pathname === item.href ? 'text-violet-600 bg-violet-50' : 'text-slate-600 hover:text-violet-600 hover:bg-violet-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-slate-100">
                <Link href="/contact" className="btn-primary w-full justify-center">Get a Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
