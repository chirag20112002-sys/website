'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, RefreshCw, Save, X, ArrowUp, ArrowDown, Image as ImageIcon, Video } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

type GalleryItem = {
  id: number
  type: 'image' | 'video'
  src: string
  title: string
  category: string
  order: number
}

const emptyForm = { type: 'image' as 'image' | 'video', src: '', title: '', category: '' }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState(emptyForm)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/gallery')
      if (res.ok) setItems(await res.json())
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (it: GalleryItem) => {
    setForm({ type: it.type, src: it.src, title: it.title, category: it.category })
    setEditing(it)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.src.trim()) return
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch('/api/gallery', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
        if (res.ok) setItems(prev => prev.map(it => it.id === editing.id ? { ...it, ...form } : it))
      } else {
        const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (res.ok) { const created = await res.json(); setItems(prev => [...prev, created]) }
      }
      setShowForm(false)
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return
    const res = await fetch('/api/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) setItems(prev => prev.filter(it => it.id !== id))
  }

  const move = async (index: number, dir: -1 | 1) => {
    const next = index + dir
    if (next < 0 || next >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[next]] = [reordered[next], reordered[index]]
    setItems(reordered)
    await fetch('/api/gallery', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: reordered }) })
  }

  const videoThumb = (url: string) => {
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
    return yt ? `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg` : null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">Gallery & Showcase</h1>
          <p className="text-slate-500 text-sm">{items.length} items — shown in the homepage showcase. Drag order with arrows.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg border border-gray-200 text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openCreate} className="btn-primary text-sm py-2.5">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800 font-display">{editing ? 'Edit Item' : 'Add Gallery Item'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {/* Type toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, type: 'image' }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.type === 'image' ? 'bg-violet-600 text-white border-violet-600' : 'border-gray-200 text-slate-600 hover:bg-gray-50'}`}
                >
                  <ImageIcon className="w-4 h-4" /> Image
                </button>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, type: 'video' }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.type === 'video' ? 'bg-violet-600 text-white border-violet-600' : 'border-gray-200 text-slate-600 hover:bg-gray-50'}`}
                >
                  <Video className="w-4 h-4" /> Video
                </button>
              </div>

              {form.type === 'image' ? (
                <ImageUpload
                  label="Image"
                  value={form.src}
                  onChange={url => setForm(f => ({ ...f, src: url }))}
                  hint="Upload or paste an image URL"
                />
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Video URL</label>
                  <input type="url" value={form.src} onChange={e => setForm(f => ({ ...f, src: e.target.value }))} className="input-field" placeholder="YouTube, Vimeo, or direct .mp4 link" />
                  <p className="text-xs text-slate-400 mt-1">Paste a YouTube link (youtube.com/watch?v=…), Vimeo link, or a direct video file URL.</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="e.g. Analytics Dashboard" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                <input type="text" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field" placeholder="e.g. ERP, CRM, HRMS, Web" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? 'Saving…' : <><Save className="w-4 h-4" /> Save</>}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading && items.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <p className="text-slate-500 mb-4">No gallery items yet.</p>
          <button onClick={openCreate} className="btn-primary text-sm">Add First Item</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const thumb = it.type === 'video' ? (videoThumb(it.src) || it.src) : it.src
            return (
              <div key={it.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
                <div className="relative h-44 bg-slate-100">
                  <img src={thumb} alt={it.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 badge text-xs ${it.type === 'video' ? 'bg-rose-100 text-rose-700' : 'bg-violet-100 text-violet-700'}`}>
                    {it.type === 'video' ? <><Video className="w-3 h-3" /> Video</> : <><ImageIcon className="w-3 h-3" /> Image</>}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <p className="font-bold text-slate-800 text-sm">{it.title || 'Untitled'}</p>
                  {it.category && <span className="badge bg-gray-100 text-slate-500 text-xs w-fit">{it.category}</span>}
                  <div className="flex gap-2 mt-auto pt-2">
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="p-2 rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 disabled:opacity-30" title="Move up">
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-2 rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 disabled:opacity-30" title="Move down">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => openEdit(it)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-violet-50 hover:text-violet-700 text-xs font-medium transition-colors">
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleDelete(it.id)} className="px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-xs transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
