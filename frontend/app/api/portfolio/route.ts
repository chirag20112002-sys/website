import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = createServerClient()
  const admin = req.nextUrl.searchParams.get('admin') === 'true'

  let query = supabase.from('portfolio_projects').select('*').order('display_order', { ascending: true })
  if (!admin) query = query.eq('status', 'published')

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, category, client, description, tech, results, status, display_order } = body
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert({ title, category, client, description, tech: tech ?? [], results: results ?? [], status: status ?? 'draft', display_order: display_order ?? 0 })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, title, category, client, description, tech, results, status, display_order } = body
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('portfolio_projects')
    .update({ title, category, client, description, tech, results, status, display_order })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const supabase = createServerClient()
  const { error } = await supabase.from('portfolio_projects').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
