'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  hint?: string
}

export default function ImageUpload({ value, onChange, label = 'Upload Image', hint }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(value || '')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB'); return }

    setError('')
    setUploading(true)

    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error || 'Upload failed')
      const { url } = await res.json()
      setPreview(url)
      onChange(url)
    } catch (err: any) {
      setError(err.message || 'Upload failed. Enter a URL below instead.')
      setPreview(value || '')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}

      {preview ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-700 hover:bg-gray-100 flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" /> Change
            </button>
            <button
              type="button"
              onClick={() => { setPreview(''); onChange('') }}
              className="px-3 py-1.5 bg-red-500 rounded-lg text-xs font-medium text-white hover:bg-red-600 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50/50 transition-all"
        >
          {uploading ? (
            <><Loader2 className="w-6 h-6 animate-spin" /><span className="text-xs">Uploading…</span></>
          ) : (
            <><ImageIcon className="w-8 h-8" /><span className="text-sm font-medium">Click to upload</span><span className="text-xs">PNG, JPG, WebP — max 5 MB</span></>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
      />

      <input
        type="url"
        value={preview}
        onChange={e => { setPreview(e.target.value); onChange(e.target.value) }}
        placeholder="Or paste image URL…"
        className="input-field text-sm"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
