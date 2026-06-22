'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Star } from 'lucide-react'

const initial = [
  { id: 1, name: 'Sarah Mitchell', role: 'CEO', company: 'StyleVault', rating: 5, status: 'published', text: 'AirX Solution transformed our online store.' },
  { id: 2, name: 'James Rodriguez', role: 'Founder', company: 'TechNova Labs', rating: 5, status: 'published', text: 'The admin dashboard they built saves us 15 hours a week.' },
  { id: 3, name: 'Priya Sharma', role: 'Marketing Director', company: 'GreenLeaf Co.', rating: 5, status: 'published', text: 'From concept to launch in 3 weeks. Incredible work!' },
  { id: 4, name: 'David Chen', role: 'CTO', company: 'FinEdge', rating: 5, status: 'draft', text: 'True professionals who care about the product.' },
]

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<null | typeof initial[0]>(null)
  const [form, setForm] = useState({ name: '', role: '', company: '', rating: 5, text: '', status: 'draft' as 'draft' | 'published' })

  const openCreate = () => { setForm({ name: '', role: '', company: '', rating: 5, text: '', status: 'draft' }); setEditing(null); setShowForm(true) }
  const openEdit = (t: typeof initial[0]) => { setForm({ name: t.name, role: t.role, company: t.company, rating: t.rating, text: t.text, status: t.status as any }); setEditing(t); setShowForm(true) }

  const handleSave = () => {
    if (!form.name.trim()) return
    if (editing) {
      setItems(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t))
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...form }])
    }
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Testimonials</h1>
          <p className="text-slate-400 text-sm">{items.length} reviews</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2.5">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white font-display mb-5">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Client name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
                  <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field" placeholder="CEO, Founder..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Company</label>
                <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="input-field" placeholder="Company name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button key={r} onClick={() => setForm(f => ({ ...f, rating: r }))} type="button">
                      <Star className={`w-6 h-6 transition-colors ${r <= form.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Review Text</label>
                <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={4} className="input-field resize-none" placeholder="Client review..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))} className="input-field">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary flex-1 justify-center">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(t => (
          <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className={`badge text-xs ${t.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{t.status}</span>
            </div>
            <p className="text-sm text-slate-400 italic mb-4 line-clamp-2">"{t.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => { if (confirm('Delete?')) setItems(prev => prev.filter(x => x.id !== t.id)) }} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
