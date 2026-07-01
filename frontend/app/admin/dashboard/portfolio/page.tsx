'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, RefreshCw, X } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

type Project = {
  id: string
  title: string
  category: string
  client: string
  description: string
  image: string
  status: string
}

const categories = ['ERP', 'HRMS', 'CRM', 'Inventory', 'Web Dev', 'Admin Panel', 'E-Commerce', 'Web App', 'Automation']
const emptyForm = { title: '', category: '', client: '', description: '', image: '', status: 'draft' as 'draft' | 'published' }

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/portfolio?admin=true')
      if (res.ok) setProjects(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (p: Project) => {
    setForm({ title: p.title, category: p.category, client: p.client || '', description: p.description || '', image: (p as any).image || '', status: p.status as any })
    setEditing(p)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch('/api/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        })
        if (res.ok) { const updated = await res.json(); setProjects(prev => prev.map(p => p.id === editing.id ? updated : p)) }
      } else {
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) { const created = await res.json(); setProjects(prev => [created, ...prev]) }
      }
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const res = await fetch('/api/portfolio', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">Portfolio</h1>
          <p className="text-slate-500 text-sm">{projects.length} projects</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openCreate} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800 font-display">{editing ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title *</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="Project name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Client Name</label>
                <input type="text" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} className="input-field" placeholder="Client company" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="input-field resize-none" placeholder="Project description" />
              </div>
              <ImageUpload
                label="Project Screenshot / Cover Image"
                value={form.image}
                onChange={url => setForm(f => ({ ...f, image: url }))}
                hint="Recommended: 1200×800px"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                    <option value="">Select</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))} className="input-field">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {loading && projects.length === 0 ? (
        <div className="text-center py-12 text-slate-500">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {(p as any).image ? (
                <img src={(p as any).image} alt={p.title} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-24 bg-violet-50 flex items-center justify-center text-violet-200 text-xs">No image</div>
              )}
              <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="badge bg-violet-100 text-violet-700 text-xs">{p.category}</span>
                <span className={`badge text-xs ${p.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-slate-500'}`}>{p.status}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 font-display text-sm">{p.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{p.client}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 text-xs font-medium transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-xs transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
