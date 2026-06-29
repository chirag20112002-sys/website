'use client'

import { useState, useEffect } from 'react'
import {
  Save, Globe, Mail, Twitter, Linkedin, Github, Instagram,
  RefreshCw, Image, Type, Phone, MapPin, Search, Zap,
} from 'lucide-react'

const defaults: Record<string, string> = {
  // Branding
  site_name: 'SARAL MIS',
  tagline: 'Simplify. Automate. Grow.',
  logo_url: '',

  // Hero
  hero_headline: 'The Smartest Way to Manage Your Business Operations',
  hero_subheadline: 'SARAL MIS delivers powerful management software and digital solutions that help businesses digitize, automate, and scale with ease.',
  hero_cta_primary: 'Get Started Free',
  hero_cta_secondary: 'View Our Work',
  hero_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',

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

  // SEO
  meta_title: 'SARAL MIS — Management Information System & Business Software',
  meta_desc: 'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions.',

  // Social
  twitter: 'https://twitter.com/saralmis',
  linkedin: 'https://linkedin.com/company/saralmis',
  github: 'https://github.com/saralmis',
  instagram: 'https://instagram.com/saralmis',

  // Portfolio images (can be updated from admin)
  portfolio_img1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  portfolio_img2: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  portfolio_img3: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
}

type Section = { id: string; label: string; icon: React.ElementType; keys: string[] }

const sections: Section[] = [
  {
    id: 'branding', label: 'Branding', icon: Zap,
    keys: ['site_name', 'tagline', 'logo_url'],
  },
  {
    id: 'hero', label: 'Hero Section', icon: Type,
    keys: ['hero_headline', 'hero_subheadline', 'hero_cta_primary', 'hero_cta_secondary', 'hero_image_url'],
  },
  {
    id: 'stats', label: 'Stats', icon: Globe,
    keys: ['stat1_value', 'stat1_label', 'stat2_value', 'stat2_label', 'stat3_value', 'stat3_label', 'stat4_value', 'stat4_label'],
  },
  {
    id: 'about', label: 'About Section', icon: Image,
    keys: ['about_title', 'about_text', 'about_image_url'],
  },
  {
    id: 'contact', label: 'Contact Info', icon: Phone,
    keys: ['email', 'email_secondary', 'phone', 'whatsapp', 'address'],
  },
  {
    id: 'seo', label: 'SEO', icon: Search,
    keys: ['meta_title', 'meta_desc'],
  },
  {
    id: 'social', label: 'Social Media', icon: Twitter,
    keys: ['twitter', 'linkedin', 'github', 'instagram'],
  },
  {
    id: 'portfolio', label: 'Portfolio Images', icon: Image,
    keys: ['portfolio_img1', 'portfolio_img2', 'portfolio_img3'],
  },
]

const fieldMeta: Record<string, { label: string; type?: string; textarea?: boolean; hint?: string }> = {
  site_name:          { label: 'Company Name' },
  tagline:            { label: 'Tagline' },
  logo_url:           { label: 'Logo Image URL', hint: 'Paste a URL to your logo image' },
  hero_headline:      { label: 'Hero Headline', textarea: true },
  hero_subheadline:   { label: 'Hero Subheadline', textarea: true },
  hero_cta_primary:   { label: 'Primary CTA Button Text' },
  hero_cta_secondary: { label: 'Secondary CTA Button Text' },
  hero_image_url:     { label: 'Hero Image URL', hint: 'URL of dashboard/product screenshot' },
  stat1_value: { label: 'Stat 1 Value (e.g. 150+)' }, stat1_label: { label: 'Stat 1 Label' },
  stat2_value: { label: 'Stat 2 Value' },             stat2_label: { label: 'Stat 2 Label' },
  stat3_value: { label: 'Stat 3 Value' },             stat3_label: { label: 'Stat 3 Label' },
  stat4_value: { label: 'Stat 4 Value' },             stat4_label: { label: 'Stat 4 Label' },
  about_title:     { label: 'About Section Title' },
  about_text:      { label: 'About Description', textarea: true },
  about_image_url: { label: 'About Image URL' },
  email:           { label: 'Primary Email', type: 'email' },
  email_secondary: { label: 'Secondary Email', type: 'email' },
  phone:           { label: 'Phone Number' },
  whatsapp:        { label: 'WhatsApp Number (digits only)', hint: 'e.g. 919310593035' },
  address:         { label: 'Office Address' },
  meta_title:      { label: 'Meta Title', hint: 'Recommended: 50–60 characters' },
  meta_desc:       { label: 'Meta Description', textarea: true, hint: 'Recommended: 150–160 characters' },
  twitter:         { label: 'Twitter URL', type: 'url' },
  linkedin:        { label: 'LinkedIn URL', type: 'url' },
  github:          { label: 'GitHub URL', type: 'url' },
  instagram:       { label: 'Instagram URL', type: 'url' },
  portfolio_img1:  { label: 'Portfolio Image 1 URL', hint: 'Paste image URL — change later anytime' },
  portfolio_img2:  { label: 'Portfolio Image 2 URL' },
  portfolio_img3:  { label: 'Portfolio Image 3 URL' },
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(defaults)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('branding')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { if (!data.error) setSettings(s => ({ ...s, ...data })) })
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (key: string, value: string) =>
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
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setSaveError(json.error || `Save failed (${res.status})`)
      }
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

  const currentSection = sections.find(s => s.id === activeSection)!

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Control every piece of content on your website from here.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:text-white hover:bg-gray-100 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-4">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-xl flex items-center gap-2">
          ✓ Settings saved to database!
        </div>
      )}
      {saveError && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
          ✗ {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-2 space-y-1 sticky top-4">
            {sections.map(s => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                    activeSection === s.id
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-gray-100'
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
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <currentSection.icon className="w-5 h-5 text-violet-400" />
              {currentSection.label}
            </h2>

            <div className="space-y-5">
              {/* Stats section gets a 2-col grid */}
              {currentSection.id === 'stats' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentSection.keys.map(key => {
                    const meta = fieldMeta[key] || { label: key }
                    return (
                      <div key={key}>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">{meta.label}</label>
                        <input
                          type="text"
                          value={settings[key] || ''}
                          onChange={e => handleChange(key, e.target.value)}
                          className="input-field"
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                currentSection.keys.map(key => {
                  const meta = fieldMeta[key] || { label: key }
                  const isImage = key.includes('image') || key.includes('logo') || key.includes('img')
                  const val = settings[key] || ''
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{meta.label}</label>
                      {meta.textarea ? (
                        <textarea
                          value={val}
                          onChange={e => handleChange(key, e.target.value)}
                          rows={3}
                          className="input-field resize-none"
                        />
                      ) : (
                        <input
                          type={meta.type || 'text'}
                          value={val}
                          onChange={e => handleChange(key, e.target.value)}
                          className="input-field"
                        />
                      )}
                      {meta.hint && <p className="text-xs text-slate-500 mt-1">{meta.hint}</p>}
                      {/* Image preview */}
                      {isImage && val && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 w-48 h-28">
                          <img src={val} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                        </div>
                      )}
                      {/* Character count for meta fields */}
                      {(key === 'meta_title' || key === 'meta_desc') && (
                        <p className={`text-xs mt-1 ${val.length > (key === 'meta_title' ? 60 : 160) ? 'text-red-400' : 'text-slate-500'}`}>
                          {val.length}/{key === 'meta_title' ? 60 : 160} characters
                        </p>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Settings'}
              </button>
              {saved && <span className="text-emerald-400 text-sm font-medium">✓ Saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
