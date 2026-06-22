'use client'

import { useState } from 'react'
import { Edit, Save, Plus, Trash2 } from 'lucide-react'

const initialServices = [
  { id: 1, title: 'Website Development', icon: 'Code2', desc: 'Custom, blazing-fast websites built with modern frameworks.', active: true, order: 1 },
  { id: 2, title: 'Shopify Store Setup', icon: 'ShoppingBag', desc: 'Launch your Shopify store with expert setup and configuration.', active: true, order: 2 },
  { id: 3, title: 'Shopify Customization', icon: 'Settings', desc: 'Transform your existing Shopify store with custom features.', active: true, order: 3 },
  { id: 4, title: 'Admin Panels', icon: 'LayoutDashboard', desc: 'Powerful, intuitive dashboards for business control.', active: true, order: 4 },
  { id: 5, title: 'E-Commerce Solutions', icon: 'ShoppingCart', desc: 'Full-stack e-commerce development solutions.', active: true, order: 5 },
  { id: 6, title: 'Business Automation', icon: 'Bot', desc: 'Automate repetitive tasks and integrate your business tools.', active: false, order: 6 },
]

export default function AdminServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [editing, setEditing] = useState<null | typeof initialServices[0]>(null)
  const [form, setForm] = useState({ title: '', desc: '', active: true })

  const openEdit = (s: typeof initialServices[0]) => { setEditing(s); setForm({ title: s.title, desc: s.desc, active: s.active }) }

  const handleSave = () => {
    if (!editing) return
    setServices(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s))
    setEditing(null)
  }

  const toggleActive = (id: number) => setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Services</h1>
        <p className="text-slate-400 text-sm">Manage the services shown on your website.</p>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-white font-display mb-5">Edit Service</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Service Title</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={3} className="input-field resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="sr-only peer" />
                  <div className="w-10 h-5 bg-slate-700 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className="text-sm text-slate-300">Active (visible on site)</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary flex-1 justify-center"><Save className="w-4 h-4" /> Save Changes</button>
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-white text-sm">{s.title}</h3>
                <span className={`badge text-xs ${s.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                  {s.active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  s.active
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50'
                }`}
              >
                {s.active ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
