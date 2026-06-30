'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import { ICON_NAMES, GRADIENT_OPTIONS, DynamicIcon } from '@/lib/icon-map'

type Service = {
  id: number
  title: string
  tagline: string
  description: string
  icon: string
  color: string
  features: string[]
  timeline: string
  tag: string
  image: string
  active: boolean
  order: number
}

const emptyForm = {
  title: '', tagline: '', description: '', icon: 'Code2', color: GRADIENT_OPTIONS[0],
  features: [''], timeline: '', tag: '', image: '', active: true,
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/services?admin=true')
      if (res.ok) setServices(await res.json())
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (s: Service) => {
    setForm({
      title: s.title, tagline: s.tagline || '', description: s.description || '',
      icon: s.icon || 'Code2', color: s.color || GRADIENT_OPTIONS[0],
      features: s.features?.length ? s.features : [''], timeline: s.timeline || '',
      tag: s.tag || '', image: s.image || '', active: s.active !== false,
    })
    setEditing(s)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    const payload = { ...form, features: form.features.map(f => f.trim()).filter(Boolean) }
    try {
      if (editing) {
        const res = await fetch('/api/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
        if (res.ok) setServices(prev => prev.map(s => s.id === editing.id ? { ...s, ...payload } : s))
      } else {
        const res = await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (res.ok) { const created = await res.json(); setServices(prev => [...prev, created]) }
      }
      setShowForm(false)
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return
    const res = await fetch('/api/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setServices(prev => prev.filter(s => s.id !== id))
  }

  const toggleActive = async (s: Service) => {
    const updated = { ...s, active: !s.active }
    setServices(prev => prev.map(x => x.id === s.id ? updated : x))
    await fetch('/api/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s.id, active: updated.active }) })
  }

  const move = async (index: number, dir: -1 | 1) => {
    const next = index + dir
    if (next < 0 || next >= services.length) return
    const reordered = [...services]
    ;[reordered[index], reordered[next]] = [reordered[next], reordered[index]]
    setServices(reordered)
    await fetch('/api/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: reordered }) })
  }

  const setFeature = (i: number, val: string) => setForm(f => ({ ...f, features: f.features.map((x, idx) => idx === i ? val : x) }))
  const addFeature = () => setForm(f => ({ ...f, features: [...f.features, ''] }))
  const removeFeature = (i: number) => setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">Services</h1>
          <p className="text-slate-500 text-sm">{services.length} services — shown on the /services page. Changes save to the database.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openCreate} className="btn-primary text-sm py-2.5"><Plus className="w-4 h-4" /> Add Service</button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800 font-display">{editing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="ERP Development" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Badge / Tag</label>
                  <input type="text" value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} className="input-field" placeholder="Most Popular (optional)" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tagline</label>
                <input type="text" value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} className="input-field" placeholder="Built for speed. Designed to convert." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="input-field resize-none" />
              </div>

              {/* Icon + gradient */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon</label>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${form.color} flex items-center justify-center flex-shrink-0`}>
                      <DynamicIcon name={form.icon} className="w-5 h-5 text-white" />
                    </div>
                    <select value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="input-field">
                      {ICON_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Color</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {GRADIENT_OPTIONS.map(c => (
                      <button key={c} type="button" onClick={() => setForm(f => ({ ...f, color: c }))}
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c} transition-all ${form.color === c ? 'ring-2 ring-offset-1 ring-violet-500 scale-110' : 'hover:scale-105'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Timeline</label>
                <input type="text" value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))} className="input-field" placeholder="2–6 weeks" />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">What's Included (features)</label>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={f} onChange={e => setFeature(i, e.target.value)} className="input-field" placeholder={`Feature ${i + 1}`} />
                      <button type="button" onClick={() => removeFeature(i)} className="px-3 rounded-xl border border-gray-200 text-slate-400 hover:text-red-500 hover:bg-red-50"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addFeature} className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add feature</button>
                </div>
              </div>

              <ImageUpload label="Service Image (optional)" value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} hint="Optional — shown on cards if set" />

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
                <span className="text-sm text-slate-600">Active (visible on website)</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">{saving ? 'Saving…' : <><Save className="w-4 h-4" /> Save Service</>}</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading && services.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading…</div>
      ) : (
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                <DynamicIcon name={s.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-800 text-sm">{s.title}</h3>
                  {s.tag && <span className="badge bg-violet-100 text-violet-700 text-xs">{s.tag}</span>}
                  <span className={`badge text-xs ${s.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-slate-500'}`}>{s.active ? 'Active' : 'Hidden'}</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{s.description}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="p-2 rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(i, 1)} disabled={i === services.length - 1} className="p-2 rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                <button onClick={() => toggleActive(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${s.active ? 'bg-gray-100 text-slate-600 hover:bg-gray-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>{s.active ? 'Hide' : 'Show'}</button>
                <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
