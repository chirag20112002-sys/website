'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, RefreshCw, Save, X } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

type Member = {
  id: number
  name: string
  role: string
  bio: string
  photo: string
  initials: string
  color: string
}

const COLORS = [
  'from-violet-500 to-purple-700',
  'from-indigo-500 to-blue-700',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
]

const emptyForm = { name: '', role: '', bio: '', photo: '', initials: '', color: COLORS[0] }

export default function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/team')
      if (res.ok) setMembers(await res.json())
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (m: Member) => {
    setForm({ name: m.name, role: m.role, bio: m.bio, photo: m.photo || '', initials: m.initials, color: m.color })
    setEditing(m)
    setShowForm(true)
  }

  const autoInitials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    const payload = { ...form, initials: form.initials || autoInitials(form.name) }
    try {
      if (editing) {
        const res = await fetch('/api/team', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
        if (res.ok) { const updated = await res.json(); setMembers(prev => prev.map(m => m.id === editing.id ? updated : m)) }
      } else {
        const res = await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (res.ok) { const created = await res.json(); setMembers(prev => [...prev, created]) }
      }
      setShowForm(false)
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this team member?')) return
    const res = await fetch('/api/team', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setMembers(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">Team Members</h1>
          <p className="text-slate-500 text-sm">{members.length} members — shown on the About page</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openCreate} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800 font-display">{editing ? 'Edit Member' : 'Add Team Member'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <ImageUpload
                label="Profile Photo"
                value={form.photo}
                onChange={url => setForm(f => ({ ...f, photo: url }))}
                hint="Upload a square photo for best results (min 400×400px)"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, initials: autoInitials(e.target.value) }))} className="input-field" placeholder="e.g. Chirag Chhatwal" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Initials</label>
                  <input type="text" value={form.initials} onChange={e => setForm(f => ({ ...f, initials: e.target.value.toUpperCase().slice(0, 2) }))} className="input-field" maxLength={2} placeholder="CC" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role / Title *</label>
                <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field" placeholder="e.g. Founder & CEO" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="input-field resize-none" placeholder="A brief description about this person…" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Avatar Gradient (if no photo)</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, color: c }))}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${c} transition-all ${form.color === c ? 'ring-2 ring-offset-2 ring-violet-500 scale-110' : 'hover:scale-105'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Member</>}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading && members.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading…</div>
      ) : members.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <p className="text-slate-500 mb-4">No team members yet.</p>
          <button onClick={openCreate} className="btn-primary text-sm">Add First Member</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {members.map(m => (
            <div key={m.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-violet-200 transition-all">
              {/* Big photo */}
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-violet-100 shadow-md"
                />
              ) : (
                <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-3xl shadow-md`}>
                  {m.initials}
                </div>
              )}
              <div>
                <p className="font-bold text-slate-800 text-base leading-tight">{m.name}</p>
                <p className="text-xs text-violet-600 font-semibold mt-0.5">{m.role}</p>
              </div>
              {m.bio && (
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{m.bio}</p>
              )}
              <div className="flex gap-2 mt-auto w-full">
                <button
                  onClick={() => openEdit(m)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-slate-600 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 text-xs font-medium transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="px-3 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
