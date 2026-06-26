'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, Mail, Twitter, Linkedin, Github, Instagram, RefreshCw } from 'lucide-react'

const defaults = {
  site_name: 'AirX Solution',
  tagline: 'Premium Web Development & Digital Agency',
  email: 'hello@airxsolution.com',
  phone: '+1 (234) 567-8900',
  address: '123 Digital Avenue, Tech City, TC 10001',
  whatsapp: '1234567890',
  meta_title: 'AirX Solution – Premium Web Development & Digital Agency',
  meta_desc: 'AirX Solution delivers premium web development, Shopify store development, custom admin panels, e-commerce solutions, and business automation.',
  twitter: 'https://twitter.com/airxsolution',
  linkedin: 'https://linkedin.com/company/airxsolution',
  github: 'https://github.com/airxsolution',
  instagram: 'https://instagram.com/airxsolution',
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(defaults)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (!data.error) setSettings(s => ({ ...s, ...data }))
    }).finally(() => setLoading(false))
  }, [])

  const handleChange = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }))

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

  if (loading) return <div className="text-center py-16 text-slate-500">Loading settings…</div>

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Site Settings</h1>
          <p className="text-slate-400 text-sm">Manage your website configuration, contact info, and SEO settings.</p>
        </div>
        <button onClick={() => { setLoading(true); fetch('/api/settings').then(r => r.json()).then(d => setSettings(s => ({ ...s, ...d }))).finally(() => setLoading(false)) }}
          className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          ✓ Settings saved successfully to database!
        </div>
      )}
      {saveError && (
        <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
          ✗ Error: {saveError}
        </div>
      )}

      {/* General */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white font-display mb-5 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" /> General Settings
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Site Name</label>
              <input type="text" value={settings.site_name} onChange={e => handleChange('site_name', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Tagline</label>
              <input type="text" value={settings.tagline} onChange={e => handleChange('tagline', e.target.value)} className="input-field" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white font-display mb-5 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" /> Contact Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input type="email" value={settings.email} onChange={e => handleChange('email', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone</label>
              <input type="text" value={settings.phone} onChange={e => handleChange('phone', e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Address</label>
            <input type="text" value={settings.address} onChange={e => handleChange('address', e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">WhatsApp Number (numbers only)</label>
            <input type="text" value={settings.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} className="input-field" />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white font-display mb-5">SEO Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Meta Title</label>
            <input type="text" value={settings.meta_title} onChange={e => handleChange('meta_title', e.target.value)} className="input-field" />
            <p className="text-xs text-slate-500 mt-1">{settings.meta_title.length}/60 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Meta Description</label>
            <textarea value={settings.meta_desc} onChange={e => handleChange('meta_desc', e.target.value)} rows={3} className="input-field resize-none" />
            <p className="text-xs text-slate-500 mt-1">{settings.meta_desc.length}/160 characters</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white font-display mb-5">Social Media Links</h2>
        <div className="space-y-4">
          {[
            { key: 'twitter', icon: Twitter, label: 'Twitter' },
            { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
            { key: 'github', icon: Github, label: 'GitHub' },
            { key: 'instagram', icon: Instagram, label: 'Instagram' },
          ].map(s => (
            <div key={s.key}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-2">
                <s.icon className="w-4 h-4" /> {s.label}
              </label>
              <input type="url" value={(settings as any)[s.key] || ''} onChange={e => handleChange(s.key, e.target.value)} className="input-field" placeholder={`https://${s.key}.com/...`} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="btn-primary">
        <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save All Settings'}
      </button>
    </div>
  )
}
