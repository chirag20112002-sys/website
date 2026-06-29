'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, User } from 'lucide-react'

const initial = [
  { id: 1, name: 'Chirag Patel', email: 'admin@saralmis.in', role: 'super_admin', status: 'active', lastLogin: '2025-06-22 10:30' },
  { id: 2, name: 'Nitin Sharma', email: 'nitin@saralmis.in', role: 'editor', status: 'active', lastLogin: '2025-06-21 16:00' },
  { id: 3, name: 'Anjali Gupta', email: 'anjali@saralmis.in', role: 'viewer', status: 'active', lastLogin: '2025-06-25 09:00' },
]

const roles = [
  { value: 'super_admin', label: 'Super Admin', desc: 'Full access to all features', color: 'text-red-400 bg-red-500/10' },
  { value: 'editor', label: 'Editor', desc: 'Manage content and blog', color: 'text-blue-400 bg-blue-500/10' },
  { value: 'viewer', label: 'Viewer', desc: 'Read-only access', color: 'text-slate-400 bg-slate-500/10' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'editor', password: '' })

  const handleAdd = () => {
    if (!form.name || !form.email) return
    setUsers(prev => [...prev, { id: Date.now(), ...form, status: 'active', lastLogin: 'Never' }])
    setForm({ name: '', email: '', role: 'editor', password: '' })
    setShowForm(false)
  }

  const getRoleInfo = (r: string) => roles.find(x => x.value === r)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Admin Users</h1>
          <p className="text-slate-400 text-sm">{users.length} users</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2.5">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Roles overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roles.map(r => (
          <div key={r.value} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className={`badge ${r.color} mb-2`}>{r.label}</div>
            <p className="text-xs text-slate-500">{r.desc}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-white font-display mb-5">Add Admin User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="user@saralmis.in" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field" placeholder="Secure password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field">
                  {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAdd} className="btn-primary flex-1 justify-center">Create User</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase">User</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">Role</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase hidden sm:table-cell">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase hidden lg:table-cell">Last Login</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map(u => {
              const roleInfo = getRoleInfo(u.role)
              return (
                <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`badge text-xs ${roleInfo?.color}`}>{roleInfo?.label}</span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className={`badge text-xs ${u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{u.status}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-xs text-slate-400">{u.lastLogin}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      {u.role !== 'super_admin' && (
                        <button onClick={() => { if (confirm('Delete user?')) setUsers(prev => prev.filter(x => x.id !== u.id)) }} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
