import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('site_settings').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Convert rows to key-value object
  const settings = Object.fromEntries(data.map(r => [r.key, r.value]))
  return NextResponse.json(settings)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = createServerClient()

  const rows = Array.isArray(body)
    ? body
    : Object.entries(body as Record<string, unknown>)
        .filter(([k]) => k !== 'error')
        .map(([key, value]) => ({ key, value: String(value ?? ''), updated_at: new Date().toISOString() }))

  const { data, error } = await supabase
    .from('site_settings')
    .upsert(rows, { onConflict: 'key' })
    .select()

  if (error) {
    console.error('[settings POST]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true, data })
}
