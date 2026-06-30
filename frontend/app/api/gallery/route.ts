import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export type GalleryItem = {
  id: number
  type: 'image' | 'video'
  src: string          // image URL, or video URL / YouTube / Vimeo link
  title: string
  category: string
  order: number
}

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80', title: 'Analytics Dashboard', category: 'ERP', order: 0 },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80', title: 'Team Collaboration', category: 'CRM', order: 1 },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80', title: 'Inventory System', category: 'Inventory', order: 2 },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80', title: 'Sales Reports', category: 'ERP', order: 3 },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80', title: 'HR Management', category: 'HRMS', order: 4 },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80', title: 'Automation Flow', category: 'Automation', order: 5 },
]

async function getGallery(supabase: ReturnType<typeof createServerClient>): Promise<GalleryItem[]> {
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'gallery_items')
    .single()
  if (data?.value) {
    try { return JSON.parse(data.value) } catch { return DEFAULT_GALLERY }
  }
  return DEFAULT_GALLERY
}

async function save(supabase: ReturnType<typeof createServerClient>, items: GalleryItem[]) {
  await supabase.from('site_settings').upsert(
    { key: 'gallery_items', value: JSON.stringify(items) },
    { onConflict: 'key' }
  )
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const items = await getGallery(supabase)
    return NextResponse.json(items.sort((a, b) => a.order - b.order))
  } catch {
    return NextResponse.json(DEFAULT_GALLERY)
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await req.json()
    const items = await getGallery(supabase)
    const newItem: GalleryItem = {
      id: Date.now(),
      type: body.type || 'image',
      src: body.src || '',
      title: body.title || '',
      category: body.category || 'General',
      order: items.length,
    }
    await save(supabase, [...items, newItem])
    return NextResponse.json(newItem)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await req.json()
    const items = await getGallery(supabase)
    // Bulk reorder: body = { items: GalleryItem[] }
    if (Array.isArray(body.items)) {
      const reordered = body.items.map((it: GalleryItem, i: number) => ({ ...it, order: i }))
      await save(supabase, reordered)
      return NextResponse.json(reordered)
    }
    // Single update
    const updated = items.map(it => it.id === body.id ? { ...it, ...body } : it)
    await save(supabase, updated)
    return NextResponse.json(body)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { id } = await req.json()
    const items = await getGallery(supabase)
    const updated = items.filter(it => it.id !== id).map((it, i) => ({ ...it, order: i }))
    await save(supabase, updated)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
