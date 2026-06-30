'use client'

import Link from 'next/link'
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, ArrowRight, Heart } from 'lucide-react'
import { useSiteSettings } from '@/components/SiteSettingsProvider'

const footerLinks = {
  Solutions: [
    { label: 'Digital Presence', href: '/solutions#digital-presence' },
    { label: 'Business Software', href: '/solutions#business-software' },
    { label: 'Ecommerce', href: '/solutions#ecommerce' },
    { label: 'Marketing', href: '/solutions#marketing' },
    { label: 'Design', href: '/solutions#design' },
    { label: 'AI & Automation', href: '/solutions#automation' },
  ],
  Products: [
    { label: 'CRM', href: '/products#crm' },
    { label: 'Inventory', href: '/products#inventory' },
    { label: 'HRMS', href: '/products#hrms' },
    { label: 'Payroll', href: '/products#payroll' },
    { label: 'POS', href: '/products#pos' },
    { label: 'Analytics', href: '/products#analytics' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Industries', href: '/industries' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' },
  ],
  Resources: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Process', href: '/process' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  const settings = useSiteSettings()

  const socials = [
    { icon: Twitter, href: settings.twitter, label: 'Twitter' },
    { icon: Linkedin, href: settings.linkedin, label: 'LinkedIn' },
    { icon: Github, href: settings.github, label: 'GitHub' },
    { icon: Instagram, href: settings.instagram, label: 'Instagram' },
  ].filter(s => s.href)

  const siteName = settings.site_name || 'SARAL MIS'
  const [brandPrefix, brandSuffix] = siteName.includes(' ')
    ? [siteName.split(' ')[0], ' ' + siteName.split(' ').slice(1).join(' ')]
    : [siteName, '']

  return (
    <footer className="relative bg-[#1e0a4a] border-t border-violet-900/40 overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Newsletter Banner */}
      <div className="border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg opacity-10" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 border border-indigo-500/20 rounded-2xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Stay Ahead of the Curve</h3>
                <p className="text-slate-400 text-sm">Get insights on tech, design, and business automation. No spam.</p>
              </div>
              <form className="flex w-full md:w-auto gap-3" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 md:w-60 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap">
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt={siteName} className="h-8 w-auto object-contain" />
              ) : (
                <>
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-[17px] font-display">
                    <span style={{ color: '#A78BFA' }}>{brandPrefix}</span>
                    <span className="text-white">{brandSuffix}</span>
                  </span>
                </>
              )}
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {settings.tagline || 'We build beautiful digital experiences and powerful business software that helps companies grow, automate, and scale.'}
            </p>
            {/* Contact */}
            <div className="space-y-3">
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm group">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                {settings.email}
              </a>
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm group">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                {settings.phone}
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                {settings.address}
              </div>
            </div>

            {/* Social */}
            {socials.length > 0 && (
              <div className="flex gap-2.5 mt-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    <s.icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-indigo-500 transition-colors flex-shrink-0" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for amazing businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
