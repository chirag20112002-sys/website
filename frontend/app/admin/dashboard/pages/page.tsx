'use client'

import { useState, useEffect } from 'react'
import { Edit2, Save, RefreshCw } from 'lucide-react'

const pages = [
  { id: 'home', label: 'Home Page', fields: [
    { key: 'hero_headline', label: 'Hero Title', type: 'text' },
    { key: 'hero_subheadline', label: 'Hero Subtitle', type: 'textarea' },
    { key: 'hero_cta_primary', label: 'Primary CTA Button', type: 'text' },
    { key: 'hero_cta_secondary', label: 'Secondary CTA Button', type: 'text' },
    { key: 'stat1_value', label: 'Stat 1 Value (e.g. 150+)', type: 'text' },
    { key: 'stat1_label', label: 'Stat 1 Label', type: 'text' },
    { key: 'stat2_value', label: 'Stat 2 Value', type: 'text' },
    { key: 'stat2_label', label: 'Stat 2 Label', type: 'text' },
  ]},
  { id: 'about', label: 'About Page', fields: [
    { key: 'about_title', label: 'About Section Title', type: 'text' },
    { key: 'about_text', label: 'Company Description', type: 'textarea' },
  ]},
  { id: 'contact', label: 'Contact Page', fields: [
    { key: 'email', label: 'Primary Email', type: 'text' },
    { key: 'phone', label: 'Phone Number', type: 'text' },
    { key: 'whatsapp', label: 'WhatsApp Number (digits only)', type: 'text' },
    { key: 'address', label: 'Office Address', type: 'text' },
    { key: 'google_maps_url', label: 'Google Maps Embed URL', type: 'textarea' },
  ]},
  { id: 'branding', label: 'Branding', fields: [
    { key: 'site_name', label: 'Company Name', type: 'text' },
    { key: 'tagline', label: 'Tagline / Slogan', type: 'text' },
  ]},
]

const defaults: Record<string, string> = {
  hero_headline: 'The Smartest Way to Manage Your Business Operations',
  hero_subheadline: 'SARAL MIS delivers powerful management software and digital solutions that help businesses digitize, automate, and scale with ease.',
  hero_cta_primary: 'Get Started Free',
  hero_cta_secondary: 'View Our Work',
  stat1_value: '150+', stat1_label: 'Projects Delivered',
  stat2_value: '80+',  stat2_label: 'Happy Clients',
  about_title: 'About SARAL MIS',
  about_text: 'We are a technology company specializing in business management software and digital solutions.',
  email: 'info@saralmis.in',
  phone: '+91 93105 93035',
  whatsapp: '919310593035',
  address: 'New Delhi, India',
  google_maps_url: '',
  site_name: 'SARAL MIS',
  tagline: 'Simplify. Automate. Grow.',
}

export default function AdminPagesPage() {
  const [activePage, setActivePage] = useState(pages[0])
  const [settings, setSettings] = useState<Record<string, string>>(defaults)
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const load = () => {
    setLoading(true)
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { if (!data.error) setSettings(s => ({ ...s, ...data })) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    } finally {
      setSaving(false)
      setEditing(null)
    }
  }

  if (loading) return <div className="text-center py-16 text-slate-400">Loading…</div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">Page Content</h1>
          <p className="text-slate-500 text-sm">Edit text content for each page without touching code.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:bg-gray-100 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-4">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          ✓ Changes saved to database — live on your website now!
        </div>
      )}

      <div className="flex gap-6">
        {/* Page selector */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {pages.map(p => (
              <button
                key={p.id}
                onClick={() => { setActivePage(p); setEditing(null) }}
                className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors ${
                  activePage.id === p.id
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-slate-800 font-display mb-5 text-lg">{activePage.label}</h2>
            <div className="space-y-5">
              {activePage.fields.map(f => (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-slate-700">{f.label}</label>
                    <button
                      onClick={() => setEditing(editing === f.key ? null : f.key)}
                      className="text-xs text-violet-600 hover:text-violet-700 flex items-center gap-1 font-medium"
                    >
                      <Edit2 className="w-3 h-3" /> {editing === f.key ? 'Done' : 'Edit'}
                    </button>
                  </div>
                  {editing === f.key ? (
                    f.type === 'textarea' ? (
                      <textarea
                        value={settings[f.key] || ''}
                        onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        rows={3}
                        className="input-field resize-none"
                        autoFocus
                      />
                    ) : (
                      <input
                        type="text"
                        value={settings[f.key] || ''}
                        onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                        className="input-field"
                        autoFocus
                      />
                    )
                  ) : (
                    <div
                      className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm cursor-pointer hover:border-violet-300 hover:bg-violet-50/50 transition-colors"
                      onClick={() => setEditing(f.key)}
                    >
                      {settings[f.key] || <span className="text-slate-400 italic">Not set — click to edit</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleSave} disabled={saving} className="btn-primary mt-6">
              <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
