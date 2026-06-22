'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, Facebook, ArrowRight, Heart } from 'lucide-react'

const services = [
  { label: 'Website Development', href: '/services#web' },
  { label: 'Shopify Development', href: '/services#shopify' },
  { label: 'E-Commerce Solutions', href: '/services#ecommerce' },
  { label: 'Admin Panel', href: '/services#admin' },
  { label: 'Web Applications', href: '/services#webapp' },
  { label: 'UI/UX Design', href: '/services#uiux' },
]

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const legal = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
]

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-[#060c18] text-slate-300 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Newsletter CTA */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white font-display mb-2">Stay in the Loop</h3>
              <p className="text-slate-400">Get the latest news, tips, and updates from AirX Solution.</p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">AirX Solution</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-xs">
              We build premium digital experiences — from high-performance websites and Shopify stores to custom admin panels and business automation tools.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@airxsolution.com" className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                hello@airxsolution.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                +1 (234) 567-8900
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                123 Digital Avenue, Tech City, TC 10001
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 font-display">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.href}>
                  <Link href={s.href} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-5 font-display">Company</h4>
            <ul className="space-y-3">
              {company.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-semibold text-white mb-5 font-display">Follow Us</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <s.icon className="w-4.5 h-4.5" size={18} />
                </a>
              ))}
            </div>
            <h4 className="font-semibold text-white mb-4 font-display">Legal</h4>
            <ul className="space-y-3">
              {legal.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AirX Solution. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by AirX Solution
          </p>
        </div>
      </div>
    </footer>
  )
}
