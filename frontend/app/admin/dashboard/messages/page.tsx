'use client'

import { useState } from 'react'
import { Mail, Clock, Tag, X, Reply, CheckCircle } from 'lucide-react'

const initial = [
  { id: 1, name: 'John Smith', email: 'john@company.com', phone: '+1 555-0101', company: 'TechCorp', service: 'Shopify Development', budget: '$5,000 – $15,000', message: 'Hi, I need to set up a Shopify store for my fashion brand with about 200 products. We need custom checkout and subscription features. Can you provide a quote?', time: '2025-06-22 10:30', status: 'new' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@startup.io', phone: '+1 555-0102', company: 'StartupIO', service: 'Web Application', budget: '$15,000 – $50,000', message: 'We are building a SaaS platform for project management. Need a full-stack web application with real-time collaboration features.', time: '2025-06-22 08:15', status: 'new' },
  { id: 3, name: 'Michael Lee', email: 'michael@corp.com', phone: '+1 555-0103', company: 'Corp Inc.', service: 'Admin Panel', budget: '$5,000 – $15,000', message: 'Looking for a custom admin dashboard for our inventory and order management system. Currently using spreadsheets and need to automate.', time: '2025-06-21 14:20', status: 'replied' },
  { id: 4, name: 'Emma Davis', email: 'emma@brand.co', phone: '+1 555-0104', company: 'Brand Co.', service: 'UI/UX Design', budget: '$1,000 – $5,000', message: 'Need a complete redesign of our existing website. The current design is outdated and not converting well.', time: '2025-06-21 09:45', status: 'replied' },
  { id: 5, name: 'Carlos Torres', email: 'carlos@agency.com', phone: '+1 555-0105', company: 'Digital Agency', service: 'Website Development', budget: '$1,000 – $5,000', message: 'We need a professional website for our digital marketing agency. 5-6 pages with a portfolio section and lead gen form.', time: '2025-06-20 16:30', status: 'closed' },
]

type Message = typeof initial[0]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(initial)
  const [selected, setSelected] = useState<Message | null>(null)

  const updateStatus = (id: number, status: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const statusColor = (s: string) => s === 'new' ? 'bg-indigo-500/10 text-indigo-400' : s === 'replied' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Contact Inquiries</h1>
        <p className="text-slate-400 text-sm">{messages.filter(m => m.status === 'new').length} new, {messages.length} total</p>
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 space-y-2">
          {messages.map(m => (
            <div
              key={m.id}
              onClick={() => setSelected(m)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selected?.id === m.id
                  ? 'border-indigo-500 bg-indigo-900/10'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white text-sm">{m.name}</p>
                    <span className={`badge text-xs ${statusColor(m.status)}`}>{m.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{m.company} · {m.service}</p>
                  <p className="text-xs text-slate-500 truncate">{m.message}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {m.time.split(' ')[1]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div className="w-96 flex-shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white font-display">Message Detail</h3>
                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <p className="text-xs text-slate-500">From</p>
                  <p className="font-medium text-white">{selected.name}</p>
                  <p className="text-sm text-indigo-400">{selected.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Company</p>
                    <p className="text-sm text-slate-300">{selected.company}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm text-slate-300">{selected.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Service</p>
                    <p className="text-sm text-slate-300">{selected.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="text-sm text-slate-300">{selected.budget}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Message</p>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-800 rounded-lg p-3">{selected.message}</p>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {selected.time}</p>
              </div>

              <div className="space-y-2">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 w-full py-2.5 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-900/20 text-sm font-medium justify-center transition-colors">
                  <Reply className="w-4 h-4" /> Reply via Email
                </a>
                {selected.status !== 'replied' && (
                  <button onClick={() => updateStatus(selected.id, 'replied')} className="flex items-center gap-2 w-full py-2.5 rounded-xl border border-emerald-500 text-emerald-400 hover:bg-emerald-900/20 text-sm font-medium justify-center transition-colors">
                    <CheckCircle className="w-4 h-4" /> Mark as Replied
                  </button>
                )}
                {selected.status !== 'closed' && (
                  <button onClick={() => updateStatus(selected.id, 'closed')} className="flex items-center gap-2 w-full py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-medium justify-center transition-colors">
                    Close Inquiry
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
