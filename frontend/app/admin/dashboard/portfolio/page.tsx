'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const initial = [
  { id: 1, title: 'LuxeCommerce Fashion Store', category: 'Shopify', client: 'LuxeStyle Inc.', status: 'published' },
  { id: 2, title: 'FinTrack Analytics Dashboard', category: 'Admin Panel', client: 'FinEdge Corp.', status: 'published' },
  { id: 3, title: 'MediCare Patient Portal', category: 'Web App', client: 'MediCare Group', status: 'published' },
  { id: 4, title: 'SwiftDeliver Marketplace', category: 'E-Commerce', client: 'SwiftDeliver Ltd.', status: 'published' },
  { id: 5, title: 'AutoPilot Sales CRM', category: 'Automation', client: 'GrowthMax Agency', status: 'draft' },
]

const categories = ['Web Dev', 'Shopify', 'Admin Panel', 'E-Commerce', 'Web App', 'Automation']

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState(initial)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<null | typeof initial[0]>(null)
  const [form, setForm] = useState({ title: '', category: '', client: '', status: 'draft' as 'draft' | 'published' })

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const openCreate = () => { setForm({ title: '', category: '', client: '', status: 'draft' }); setEditing(null); setShowForm(true) }
  const openEdit = (p: typeof initial[0]) => { setForm({ title: p.title, category: p.category, client: p.client, status: p.status as any }); setEditing(p); setShowForm(true) }

  const handleSave = () => {
    if (!form.title.trim()) return
    if (editing) {
      setProjects(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p))
    } else {
      setProjects(prev => [...prev, { id: Date.now(), ...form }])
    }
    setShowForm(false)
  }

  const handleDelete = (id: number) => { if (confirm('Delete this project?')) setProjects(prev => prev.filter(p => p.id !== id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Portfolio</h1>
          <p className="text-slate-400 text-sm">{projects.length} projects</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2.5">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-white font-display mb-5">{editing ? 'Edit Project' : 'Add Project'}</h2>
            <div className="space-y-4">
              {[
                { label: 'Project Title', key: 'title', type: 'input', placeholder: 'Project name' },
                { label: 'Client Name', key: 'client', type: 'input', placeholder: 'Client company' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    value={(form as any)[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="input-field"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  <option value="">Select</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="badge bg-indigo-500/10 text-indigo-400 text-xs">{p.category}</span>
              <span className={`badge text-xs ${p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{p.status}</span>
            </div>
            <h3 className="font-bold text-white mb-1 font-display text-sm">{p.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{p.client}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDelete(p.id)} className="px-3 py-2 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20 text-xs transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
