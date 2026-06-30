'use client'

import { useState, useEffect } from 'react'
import {
  Save, Globe, Mail, Twitter, Linkedin, Github, Instagram,
  RefreshCw, Image, Type, Phone, MapPin, Search, Upload,
  Layers, FileText, Home, Info, MessageSquare, Briefcase, Tag,
} from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

const defaults: Record<string, string> = {
  // Branding
  site_name: 'SARAL MIS',
  tagline: 'Simplify. Automate. Grow.',
  logo_url: '',
  favicon_url: '',

  // Hero
  hero_headline: 'The Smartest Way to Manage Your Business Operations',
  hero_subheadline: 'SARAL MIS delivers powerful management software and digital solutions that help businesses digitize, automate, and scale with ease.',
  hero_cta_primary: 'Get Started Free',
  hero_cta_secondary: 'View Our Work',
  hero_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  hero_video_url: '',

  // Stats
  stat1_value: '150+', stat1_label: 'Projects Delivered',
  stat2_value: '80+',  stat2_label: 'Happy Clients',
  stat3_value: '5+',   stat3_label: 'Years Experience',
  stat4_value: '99%',  stat4_label: 'Client Satisfaction',

  // About
  about_title: 'About SARAL MIS',
  about_text: 'We are a technology company specializing in business management software and digital solutions. From CRM to ERP, HRMS to Payroll — we build software that simplifies your operations.',
  about_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',

  // Contact
  email: 'info@saralmis.in',
  email_secondary: 'chirag.worksplace@gmail.com',
  phone: '+91 93105 93035',
  whatsapp: '919310593035',
  address: 'New Delhi, India',
  google_maps_url: '',

  // SEO Global
  meta_title: 'SARAL MIS — Management Information System & Business Software',
  meta_desc: 'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions.',

  // Per-page SEO
  seo_home_title: '', seo_home_desc: '',
  seo_about_title: '', seo_about_desc: '',
  seo_contact_title: '', seo_contact_desc: '',
  seo_services_title: '', seo_services_desc: '',
  seo_portfolio_title: '', seo_portfolio_desc: '',
  seo_pricing_title: '', seo_pricing_desc: '',
  seo_blog_title: '', seo_blog_desc: '',
  seo_faq_title: '', seo_faq_desc: '',

  // Social
  twitter: 'https://twitter.com/saralmis',
  linkedin: 'https://linkedin.com/company/saralmis',
  github: 'https://github.com/saralmis',
  instagram: 'https://instagram.com/saralmis',

  // Portfolio images
  portfolio_img1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  portfolio_img2: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  portfolio_img3: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
}

type Section = { id: string; label: string; icon: React.ElementType }

const sections: Section[] = [
  { id: 'branding', label: 'Logo & Branding', icon: Upload },
  { id: 'contact', label: 'Contact Info', icon: Phone },
  { id: 'hero', label: 'Hero Section', icon: Type },
  { id: 'stats', label: 'Stats', icon: Globe },
  { id: 'about', label: 'About Section', icon: Info },
  { id: 'seo_global', label: 'SEO — Global', icon: Search },
  { id: 'seo_pages', label: 'SEO — Per Page', icon: Layers },
  { id: 'social', label: 'Social Media', icon: Twitter },
  { id: 'portfolio', label: 'Portfolio Images', icon: Image },
]

const seoPages = [
  { id: 'home', label: 'Home', titleKey: 'seo_home_title', descKey: 'seo_home_desc', icon: Home },
  { id: 'about', label: 'About', titleKey: 'seo_about_title', descKey: 'seo_about_desc', icon: Info },
  { id: 'contact', label: 'Contact', titleKey: 'seo_contact_title', descKey: 'seo_contact_desc', icon: MessageSquare },
  { id: 'services', label: 'Services', titleKey: 'seo_services_title', descKey: 'seo_services_desc', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio', titleKey: 'seo_portfolio_title', descKey: 'seo_portfolio_desc', icon: Image },
  { id: 'pricing', label: 'Pricing', titleKey: 'seo_pricing_title', descKey: 'seo_pricing_desc', icon: Tag },
  { id: 'blog', label: 'Blog', titleKey: 'seo_blog_title', descKey: 'seo_blog_desc', icon: FileText },
  { id: 'faq', label: 'FAQ', titleKey: 'seo_faq_title', descKey: 'seo_faq_desc', icon: MessageSquare },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(defaults)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('branding')
  const [activeSeoPage, setActiveSeoPage] = useState('home')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { if (!data.error) setSettings(s => ({ ...s, ...data })) })
      .finally(() => setLoading(false))
  }, [])

  const set = (key: string, value: string) =>
    setSettings(prev => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const json = await res.json()
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
      else setSaveError(json.error || `Save failed (${res.status})`)
    } catch (e: any) {
      setSaveError(e.message || 'Network error')
    } finally {
      setSaving(false)
    }
  }

  const refresh = () => {
    setLoading(true)
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (!d.error) setSettings(s => ({ ...s, ...d })) })
      .finally(() => setLoading(false))
  }

  if (loading) return <div className="text-center py-16 text-slate-400">Loading settings…</div>

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Site Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Update once — applies everywhere on the website automatically.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="p-2 rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-4">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-xl flex items-center gap-2">
          ✓ Settings saved — live on your website!
        </div>
      )}
      {saveError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          ✗ {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-2 space-y-0.5 sticky top-4">
            {sections.map(s => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                    activeSection === s.id
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl p-6">

            {/* ── BRANDING ─────────────────────────── */}
            {activeSection === 'branding' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-violet-500" /> Logo & Branding
                </h2>
                <ImageUpload
                  label="Company Logo"
                  value={settings.logo_url || ''}
                  onChange={url => set('logo_url', url)}
                  hint="Recommended: PNG with transparent background, min 200px wide. Shown in Navbar and Footer."
                />
                {settings.logo_url && (
                  <div className="p-4 bg-slate-900 rounded-xl">
                    <p className="text-xs text-slate-400 mb-2">Preview on dark background (Navbar / Footer)</p>
                    <img src={settings.logo_url} alt="Logo" className="h-10 w-auto object-contain" />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Favicon URL</label>
                  <input type="text" value={settings.favicon_url || ''} onChange={e => set('favicon_url', e.target.value)} className="input-field" placeholder="https://... or leave blank to use default" />
                  <p className="text-xs text-slate-400 mt-1">The small icon shown in browser tabs. Leave blank to use the default SVG.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input type="text" value={settings.site_name || ''} onChange={e => set('site_name', e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tagline / Slogan</label>
                  <input type="text" value={settings.tagline || ''} onChange={e => set('tagline', e.target.value)} className="input-field" placeholder="Simplify. Automate. Grow." />
                </div>
              </div>
            )}

            {/* ── CONTACT INFO ─────────────────────── */}
            {activeSection === 'contact' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-violet-500" /> Contact Info
                </h2>
                <p className="text-sm text-slate-500 -mt-3 pb-1 border-b border-gray-100">Update once — auto-updates in Footer, Contact page, WhatsApp button, and every CTA.</p>
                {[
                  { key: 'email', label: 'Primary Email', type: 'email', placeholder: 'info@saralmis.in' },
                  { key: 'email_secondary', label: 'Secondary / Support Email', type: 'email', placeholder: 'support@saralmis.in' },
                  { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 93105 93035' },
                  { key: 'whatsapp', label: 'WhatsApp Number (digits only)', type: 'text', placeholder: '919310593035', hint: 'Include country code without + (e.g. 919310593035)' },
                  { key: 'address', label: 'Office Address', type: 'text', placeholder: 'New Delhi, India' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                    <input type={f.type} value={settings[f.key] || ''} onChange={e => set(f.key, e.target.value)} className="input-field" placeholder={f.placeholder} />
                    {f.hint && <p className="text-xs text-slate-400 mt-1">{f.hint}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Google Maps Embed URL</label>
                  <textarea value={settings.google_maps_url || ''} onChange={e => set('google_maps_url', e.target.value)} rows={3} className="input-field resize-none" placeholder="Paste the full embed src URL from Google Maps → Share → Embed a map" />
                  <p className="text-xs text-slate-400 mt-1">Go to Google Maps → Share → Embed a map → copy the src="..." URL</p>
                </div>
              </div>
            )}

            {/* ── HERO ─────────────────────────────── */}
            {activeSection === 'hero' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Type className="w-5 h-5 text-violet-500" /> Hero Section
                </h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Main Headline</label>
                  <textarea value={settings.hero_headline || ''} onChange={e => set('hero_headline', e.target.value)} rows={2} className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Subheadline</label>
                  <textarea value={settings.hero_subheadline || ''} onChange={e => set('hero_subheadline', e.target.value)} rows={3} className="input-field resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary CTA Button</label>
                    <input type="text" value={settings.hero_cta_primary || ''} onChange={e => set('hero_cta_primary', e.target.value)} className="input-field" placeholder="Get Started Free" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Secondary CTA Button</label>
                    <input type="text" value={settings.hero_cta_secondary || ''} onChange={e => set('hero_cta_secondary', e.target.value)} className="input-field" placeholder="View Our Work" />
                  </div>
                </div>
                <ImageUpload
                  label="Hero Background / Dashboard Image"
                  value={settings.hero_image_url || ''}
                  onChange={url => set('hero_image_url', url)}
                  hint="Recommended: 1600×900px, shows on homepage hero"
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Hero Background Video URL</label>
                  <input type="url" value={settings.hero_video_url || ''} onChange={e => set('hero_video_url', e.target.value)} className="input-field" placeholder="https://...mp4 — leave blank for default" />
                  <p className="text-xs text-slate-400 mt-1">Plays muted behind the homepage hero. Use a direct .mp4 link (e.g. from Mixkit/Coverr) or leave blank for the default.</p>
                </div>
              </div>
            )}

            {/* ── STATS ────────────────────────────── */}
            {activeSection === 'stats' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-violet-500" /> Homepage Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="border border-gray-100 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-violet-600 uppercase tracking-wide">Stat {n}</p>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Value</label>
                        <input type="text" value={settings[`stat${n}_value`] || ''} onChange={e => set(`stat${n}_value`, e.target.value)} className="input-field text-sm py-2" placeholder="150+" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Label</label>
                        <input type="text" value={settings[`stat${n}_label`] || ''} onChange={e => set(`stat${n}_label`, e.target.value)} className="input-field text-sm py-2" placeholder="Projects Delivered" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ABOUT ────────────────────────────── */}
            {activeSection === 'about' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Info className="w-5 h-5 text-violet-500" /> About Section
                </h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Section Title</label>
                  <input type="text" value={settings.about_title || ''} onChange={e => set('about_title', e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                  <textarea value={settings.about_text || ''} onChange={e => set('about_text', e.target.value)} rows={4} className="input-field resize-none" />
                </div>
                <ImageUpload
                  label="About / Team Photo"
                  value={settings.about_image_url || ''}
                  onChange={url => set('about_image_url', url)}
                  hint="Recommended: 1200×800px"
                />
              </div>
            )}

            {/* ── SEO GLOBAL ───────────────────────── */}
            {activeSection === 'seo_global' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Search className="w-5 h-5 text-violet-500" /> Global SEO
                </h2>
                <p className="text-sm text-slate-500 -mt-2">Default meta tags used by all pages unless overridden in Per-Page SEO.</p>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Default Meta Title</label>
                  <input type="text" value={settings.meta_title || ''} onChange={e => set('meta_title', e.target.value)} className="input-field" />
                  <p className={`text-xs mt-1 ${(settings.meta_title || '').length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                    {(settings.meta_title || '').length}/60 chars — recommended: 50–60
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Default Meta Description</label>
                  <textarea value={settings.meta_desc || ''} onChange={e => set('meta_desc', e.target.value)} rows={3} className="input-field resize-none" />
                  <p className={`text-xs mt-1 ${(settings.meta_desc || '').length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                    {(settings.meta_desc || '').length}/160 chars — recommended: 150–160
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700">
                  <p className="font-semibold mb-1">Schema.org + JSON-LD auto-generated</p>
                  <p className="text-xs text-blue-600">Organization schema is automatically injected using your company name, contact, and social media links above.</p>
                </div>
              </div>
            )}

            {/* ── SEO PER PAGE ─────────────────────── */}
            {activeSection === 'seo_pages' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-violet-500" /> Per-Page SEO
                </h2>
                <p className="text-sm text-slate-500 -mt-2">Override the global meta title and description for specific pages. Leave blank to use the global default.</p>

                {/* Page tabs */}
                <div className="flex flex-wrap gap-2">
                  {seoPages.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setActiveSeoPage(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeSeoPage === p.id
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {seoPages.filter(p => p.id === activeSeoPage).map(p => (
                  <div key={p.id} className="space-y-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <p.icon className="w-4 h-4 text-violet-500" />
                      <p className="font-semibold text-slate-700">{p.label} Page SEO</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Page Title</label>
                      <input
                        type="text"
                        value={settings[p.titleKey] || ''}
                        onChange={e => set(p.titleKey, e.target.value)}
                        className="input-field"
                        placeholder={`e.g. ${p.label} | SARAL MIS`}
                      />
                      <p className={`text-xs mt-1 ${(settings[p.titleKey] || '').length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                        {(settings[p.titleKey] || '').length}/60 chars
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                      <textarea
                        value={settings[p.descKey] || ''}
                        onChange={e => set(p.descKey, e.target.value)}
                        rows={3}
                        className="input-field resize-none"
                        placeholder={`Describe the ${p.label.toLowerCase()} page for search engines…`}
                      />
                      <p className={`text-xs mt-1 ${(settings[p.descKey] || '').length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                        {(settings[p.descKey] || '').length}/160 chars
                      </p>
                    </div>
                    {(settings[p.titleKey] || settings[p.descKey]) && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Google Preview</p>
                        <p className="text-blue-600 text-sm font-medium truncate">{settings[p.titleKey] || settings.meta_title}</p>
                        <p className="text-xs text-slate-400">saralmis.in/{p.id === 'home' ? '' : p.id}</p>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{settings[p.descKey] || settings.meta_desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── SOCIAL ───────────────────────────── */}
            {activeSection === 'social' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Twitter className="w-5 h-5 text-violet-500" /> Social Media
                </h2>
                {[
                  { key: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: 'https://twitter.com/saralmis' },
                  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/saralmis' },
                  { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/saralmis' },
                  { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/saralmis' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                      <f.icon className="w-4 h-4 text-slate-400" /> {f.label}
                    </label>
                    <input type="url" value={settings[f.key] || ''} onChange={e => set(f.key, e.target.value)} className="input-field" placeholder={f.placeholder} />
                  </div>
                ))}
              </div>
            )}

            {/* ── PORTFOLIO IMAGES ─────────────────── */}
            {activeSection === 'portfolio' && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Image className="w-5 h-5 text-violet-500" /> Portfolio Images
                </h2>
                <p className="text-sm text-slate-500 -mt-2">Default images shown in the portfolio section when no project images are set.</p>
                {[1, 2, 3].map(n => (
                  <ImageUpload
                    key={n}
                    label={`Portfolio Image ${n}`}
                    value={settings[`portfolio_img${n}`] || ''}
                    onChange={url => set(`portfolio_img${n}`, url)}
                    hint="Recommended: 1200×800px"
                  />
                ))}
              </div>
            )}

            {/* Save button */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Settings'}
              </button>
              {saved && <span className="text-emerald-600 text-sm font-semibold">✓ Saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
