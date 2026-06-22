'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search, Eye, Calendar } from 'lucide-react'

const initialPosts = [
  { id: 1, title: 'Next.js vs React: Which Should You Choose in 2025?', category: 'Web Development', status: 'published', date: '2025-06-01', views: 1240 },
  { id: 2, title: '12 Shopify Store Optimization Tips That Doubled Our Client\'s Revenue', category: 'Shopify', status: 'published', date: '2025-05-22', views: 2850 },
  { id: 3, title: 'The 7 Design Principles Behind Great Admin Dashboards', category: 'UI/UX Design', status: 'published', date: '2025-05-10', views: 890 },
  { id: 4, title: 'The Ultimate E-Commerce SEO Guide for 2025', category: 'SEO', status: 'draft', date: '2025-04-28', views: 0 },
  { id: 5, title: '20 Tailwind CSS Tricks Every Developer Should Know', category: 'Web Development', status: 'published', date: '2025-04-15', views: 3100 },
]

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<null | typeof initialPosts[0]>(null)
  const [form, setForm] = useState({ title: '', category: '', status: 'draft' as 'draft' | 'published' })

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const openCreate = () => { setForm({ title: '', category: '', status: 'draft' }); setEditing(null); setShowForm(true) }
  const openEdit = (p: typeof initialPosts[0]) => { setForm({ title: p.title, category: p.category, status: p.status as any }); setEditing(p); setShowForm(true) }

  const handleSave = () => {
    if (!form.title.trim()) return
    if (editing) {
      setPosts(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p))
    } else {
      setPosts(prev => [...prev, { id: Date.now(), ...form, date: new Date().toISOString().split('T')[0], views: 0 }])
    }
    setShowForm(false)
  }

  const handleDelete = (id: number) => { if (confirm('Delete this post?')) setPosts(prev => prev.filter(p => p.id !== id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Blog Posts</h1>
          <p className="text-slate-400 text-sm">{posts.length} posts total</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2.5">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-white font-display mb-5">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Title</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="Post title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  <option value="">Select category</option>
                  {['Web Development', 'Shopify', 'UI/UX Design', 'SEO', 'Backend', 'Automation'].map(c => <option key={c}>{c}</option>)}
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
              <button onClick={handleSave} className="btn-primary flex-1 justify-center">Save Post</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Views</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map(post => (
              <tr key={post.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <p className="text-sm font-medium text-white truncate max-w-xs">{post.title}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3" />{post.date}</p>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="badge bg-indigo-500/10 text-indigo-400 text-xs">{post.category}</span>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <span className={`badge text-xs ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <span className="text-sm text-slate-300 flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
