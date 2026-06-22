'use client'

import { useState } from 'react'
import { Save, Globe, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'AirX Solution',
    tagline: 'Premium Web Development & Digital Agency',
    email: 'hello@airxsolution.com',
    phone: '+1 (234) 567-8900',
    address: '123 Digital Avenue, Tech City, TC 10001',
    whatsapp: '1234567890',
    metaTitle: 'AirX Solution – Premium Web Development & Digital Agency',
    metaDesc: 'AirX Solution delivers premium web development, Shopify store development, custom admin panels, e-commerce solutions, and business automation.',
    twitter: 'https://twitter.com/airxsolution',
    linkedin: 'https://linkedin.com/company/airxsolution',
    github: 'https://github.com/airxsolution',
    instagram: 'https://instagram.com/airxsolution',
  })

  const handleChange = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Site Settings</h1>
        <p className="text-slate-400 text-sm">Manage your website configuration, contact info, and SEO settings.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          ✓ Settings saved successfully!
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
              <input type="text" value={settings.siteName} onChange={e => handleChange('siteName', e.target.value)} className="input-field" />
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
            <input type="text" value={settings.metaTitle} onChange={e => handleChange('metaTitle', e.target.value)} className="input-field" />
            <p className="text-xs text-slate-500 mt-1">{settings.metaTitle.length}/60 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Meta Description</label>
            <textarea value={settings.metaDesc} onChange={e => handleChange('metaDesc', e.target.value)} rows={3} className="input-field resize-none" />
            <p className="text-xs text-slate-500 mt-1">{settings.metaDesc.length}/160 characters</p>
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
              <input type="url" value={(settings as any)[s.key]} onChange={e => handleChange(s.key, e.target.value)} className="input-field" placeholder={`https://${s.key}.com/...`} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary">
        <Save className="w-4 h-4" /> Save All Settings
      </button>
    </div>
  )
}
