import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = createServerClient()
  const admin = req.nextUrl.searchParams.get('admin') === 'true'

  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  if (!admin) query = query.eq('status', 'published')

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = createServerClient()
  const { title, slug, excerpt, content, category, status } = body
  const finalSlug = slug || title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now()

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({ title, slug: finalSlug, excerpt, content, category, status: status ?? 'draft' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, title, slug, excerpt, content, category, status } = body
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .update({ title, slug, excerpt, content, category, status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const supabase = createServerClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
