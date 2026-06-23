'use client'

import { useState, useEffect } from 'react'
import { Mail, Clock, X, Reply, CheckCircle, RefreshCw } from 'lucide-react'

type Message = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  message: string
  created_at: string
  status: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact')
      if (res.ok) setMessages(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m))
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
    }
  }

  const statusColor = (s: string) =>
    s === 'new' ? 'bg-indigo-500/10 text-indigo-400' :
    s === 'replied' ? 'bg-emerald-500/10 text-emerald-400' :
    'bg-slate-500/10 text-slate-400'

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Contact Inquiries</h1>
          <p className="text-slate-400 text-sm">{messages.filter(m => m.status === 'new').length} new, {messages.length} total</p>
        </div>
        <button onClick={load} className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && messages.length === 0 ? (
        <div className="text-center py-16 text-slate-500">Loading messages…</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No messages yet. They'll appear here when visitors submit the contact form.</div>
      ) : (
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
                    {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                      <p className="text-sm text-slate-300">{selected.company || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-sm text-slate-300">{selected.phone || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Service</p>
                      <p className="text-sm text-slate-300">{selected.service || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Budget</p>
                      <p className="text-sm text-slate-300">{selected.budget || '—'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Message</p>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-800 rounded-lg p-3">{selected.message}</p>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(selected.created_at)}</p>
                </div>

                <div className="space-y-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 w-full py-2.5 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-900/20 text-sm font-medium justify-center transition-colors"
                  >
                    <Reply className="w-4 h-4" /> Reply via Email
                  </a>
                  {selected.status !== 'replied' && (
                    <button
                      onClick={() => updateStatus(selected.id, 'replied')}
                      className="flex items-center gap-2 w-full py-2.5 rounded-xl border border-emerald-500 text-emerald-400 hover:bg-emerald-900/20 text-sm font-medium justify-center transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Replied
                    </button>
                  )}
                  {selected.status !== 'closed' && (
                    <button
                      onClick={() => updateStatus(selected.id, 'closed')}
                      className="flex items-center gap-2 w-full py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 text-sm font-medium justify-center transition-colors"
                    >
                      Close Inquiry
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
