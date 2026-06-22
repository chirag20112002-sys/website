'use client'

import { useState } from 'react'
import { Edit, Save, X } from 'lucide-react'

const pages = [
  { id: 'home', label: 'Home Page', fields: [
    { key: 'heroTitle', label: 'Hero Title', value: 'We Build Digital Experiences That Convert', type: 'text' },
    { key: 'heroSubtitle', label: 'Hero Subtitle', value: 'From stunning websites and Shopify stores to powerful admin panels and business automation — AirX Solution turns your vision into a high-performing digital reality.', type: 'textarea' },
    { key: 'heroCTA', label: 'CTA Button Text', value: 'Start Your Project', type: 'text' },
    { key: 'statsProjects', label: 'Projects Count', value: '150', type: 'text' },
    { key: 'statsClients', label: 'Clients Count', value: '80', type: 'text' },
  ]},
  { id: 'about', label: 'About Page', fields: [
    { key: 'aboutTitle', label: 'Page Title', value: 'We\'re a Team of Digital Craftsmen', type: 'text' },
    { key: 'aboutStory', label: 'Company Story', value: 'AirX Solution was born in 2019 from a simple frustration: great digital agencies were out of reach for most small and medium businesses.', type: 'textarea' },
    { key: 'mission', label: 'Mission Statement', value: 'To empower businesses of every size with world-class digital solutions that drive real, measurable growth.', type: 'textarea' },
    { key: 'vision', label: 'Vision Statement', value: 'To be the most trusted digital partner for growing businesses worldwide.', type: 'textarea' },
  ]},
  { id: 'contact', label: 'Contact Page', fields: [
    { key: 'contactTitle', label: 'Page Title', value: 'Let\'s Build Something Amazing', type: 'text' },
    { key: 'contactSubtitle', label: 'Subtitle', value: 'Have a project in mind? Reach out and let\'s have a conversation.', type: 'textarea' },
    { key: 'responseTime', label: 'Response Time Badge', value: 'We respond within 4 hours', type: 'text' },
  ]},
]

export default function AdminPagesPage() {
  const [activePage, setActivePage] = useState(pages[0])
  const [fields, setFields] = useState(pages[0].fields)
  const [editing, setEditing] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const switchPage = (page: typeof pages[0]) => {
    setActivePage(page)
    setFields(page.fields)
    setEditing(null)
  }

  const updateField = (key: string, value: string) => {
    setFields(prev => prev.map(f => f.key === key ? { ...f, value } : f))
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); setEditing(null) }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Page Content</h1>
        <p className="text-slate-400 text-sm">Edit text content for each page without touching code.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm">
          ✓ Changes saved successfully!
        </div>
      )}

      <div className="flex gap-6">
        {/* Page selector */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {pages.map(p => (
              <button
                key={p.id}
                onClick={() => switchPage(p)}
                className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-slate-800 last:border-0 transition-colors ${
                  activePage.id === p.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="font-bold text-white font-display mb-5">{activePage.label}</h2>
            <div className="space-y-5">
              {fields.map(f => (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-slate-300">{f.label}</label>
                    <button onClick={() => setEditing(editing === f.key ? null : f.key)} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      <Edit className="w-3 h-3" /> {editing === f.key ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  {editing === f.key ? (
                    f.type === 'textarea' ? (
                      <textarea
                        value={f.value}
                        onChange={e => updateField(f.key, e.target.value)}
                        rows={3}
                        className="input-field resize-none"
                        autoFocus
                      />
                    ) : (
                      <input
                        type="text"
                        value={f.value}
                        onChange={e => updateField(f.key, e.target.value)}
                        className="input-field"
                        autoFocus
                      />
                    )
                  ) : (
                    <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                      {f.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleSave} className="btn-primary mt-6">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
