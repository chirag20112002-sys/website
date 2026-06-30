'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Play, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryItem = {
  id: number
  type: 'image' | 'video'
  src: string
  title: string
  category: string
  order: number
}

/** Convert a YouTube/Vimeo/direct URL into an embeddable URL. */
function toEmbedUrl(url: string): { embed: string; isFrame: boolean } {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  if (yt) return { embed: `https://www.youtube.com/embed/${yt[1]}?autoplay=1`, isFrame: true }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return { embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`, isFrame: true }
  return { embed: url, isFrame: false }
}

/** Thumbnail for a video URL (YouTube gets a real thumb; others get a poster frame). */
function videoThumb(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`
  return null
}

export default function GalleryShowcase() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (Array.isArray(data)) setItems(data) })
      .catch(() => {})
  }, [])

  if (items.length === 0) return null

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))]
  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)
  const activeItem = active !== null ? filtered.find(i => i.id === active) : null
  const activeIndex = activeItem ? filtered.indexOf(activeItem) : -1

  const go = (dir: 1 | -1) => {
    if (activeIndex === -1) return
    const next = (activeIndex + dir + filtered.length) % filtered.length
    setActive(filtered[next].id)
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge bg-violet-100 text-violet-600 mb-4">Our Showcase</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 font-display">
            Work That <span className="gradient-text">Speaks for Itself</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A glimpse of the products, dashboards, and solutions we've delivered for businesses across India.
          </p>
        </motion.div>

        {/* Category filter */}
        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Masonry grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          <AnimatePresence>
            {filtered.map((item, i) => {
              const thumb = item.type === 'video' ? (videoThumb(item.src) || item.src) : item.src
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => setActive(item.id)}
                  className="mb-5 break-inside-avoid group cursor-pointer relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-500"
                >
                  <div className="overflow-hidden">
                    <img
                      src={thumb}
                      alt={item.title}
                      loading="lazy"
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-violet-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.type === 'video'
                        ? <Play className="w-4 h-4 text-violet-300 fill-violet-300" />
                        : <ImageIcon className="w-4 h-4 text-violet-300" />}
                      <span className="text-xs text-violet-200 font-medium uppercase tracking-wide">{item.category}</span>
                    </div>
                    <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</p>
                  </div>
                  {/* Video play badge (always visible) */}
                  {item.type === 'video' && (
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-violet-600 fill-violet-600 ml-0.5" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button onClick={() => setActive(null)} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <X className="w-5 h-5" />
            </button>
            {filtered.length > 1 && (
              <>
                <button onClick={e => { e.stopPropagation(); go(-1) }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={e => { e.stopPropagation(); go(1) }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh]"
            >
              {activeItem.type === 'video' ? (
                (() => {
                  const { embed, isFrame } = toEmbedUrl(activeItem.src)
                  return isFrame ? (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <iframe src={embed} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
                    </div>
                  ) : (
                    <video src={embed} controls autoPlay className="w-full max-h-[85vh] rounded-2xl shadow-2xl" />
                  )
                })()
              ) : (
                <img src={activeItem.src} alt={activeItem.title} className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
              )}
              <p className="text-center text-white/90 font-medium mt-4">{activeItem.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
