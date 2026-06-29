'use client'

import { useState } from 'react'
import { Edit, Save, X } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

const initialServices = [
  { id: 1, title: 'ERP Development', image: '', desc: 'End-to-end ERP solutions tailored for Indian businesses — manufacturing, retail, and services.', active: true },
  { id: 2, title: 'HRMS & Payroll', image: '', desc: 'Complete HR management with GST-compliant payroll, leave tracking, and attendance.', active: true },
  { id: 3, title: 'CRM System', image: '', desc: 'Smart CRM to manage leads, follow-ups, and client relationships effortlessly.', active: true },
  { id: 4, title: 'Inventory Management', image: '', desc: 'Real-time stock tracking, purchase orders, and warehouse management.', active: true },
  { id: 5, title: 'Website Development', image: '', desc: 'Custom, fast websites built with modern frameworks.', active: true },
  { id: 6, title: 'Business Automation', image: '', desc: 'Automate workflows and integrate your existing business tools.', active: false },
]

type Service = typeof initialServices[0]

export default function AdminServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState({ title: '', desc: '', image: '', active: true })

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({ title: s.title, desc: s.desc, image: s.image || '', active: s.active })
  }

  const handleSave = () => {
    if (!editing) return
    setServices(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s))
    setEditing(null)
  }

  const toggleActive = (id: number) => setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800">Services</h1>
        <p className="text-slate-500 text-sm">Manage the services shown on your website.</p>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800 font-display">Edit Service</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-lg text-slate-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Title</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={3} className="input-field resize-none" />
              </div>
              <ImageUpload
                label="Service Image"
                value={form.image}
                onChange={url => setForm(f => ({ ...f, image: url }))}
                hint="Recommended: 800×500px, shown in service cards"
              />
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
                <span className="text-sm text-slate-600">Active (visible on site)</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary flex-1 justify-center"><Save className="w-4 h-4" /> Save Changes</button>
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
            {s.image ? (
              <img src={s.image} alt={s.title} className="w-14 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
            ) : (
              <div className="w-14 h-10 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 text-violet-300 text-xs">No img</div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-800 text-sm">{s.title}</h3>
                <span className={`badge text-xs ${s.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-slate-500'}`}>
                  {s.active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{s.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleActive(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${s.active ? 'bg-gray-100 text-slate-600 hover:bg-gray-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                {s.active ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
