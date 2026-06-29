import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

const DEFAULT_TEAM = [
  { id: 1, name: 'Chirag Chhatwal', role: 'Founder, CEO & Managing Director', bio: '8+ years in business software and digital solutions. Passionate about making technology accessible to every Indian business.', photo: '', initials: 'CC', color: 'from-violet-500 to-purple-700' },
  { id: 2, name: 'Nitin Kumar', role: 'Co-Founder', bio: 'Full-stack engineer specializing in ERP systems, cloud infrastructure, and scalable architectures.', photo: '', initials: 'NK', color: 'from-indigo-500 to-blue-700' },
  { id: 3, name: 'Riya', role: 'Social Media Manager', bio: 'Crafts compelling brand stories and drives engagement across all digital platforms.', photo: '', initials: 'R', color: 'from-pink-500 to-rose-600' },
  { id: 4, name: 'Sonu', role: 'Creative Designer', bio: 'Translates ideas into stunning visuals. Specializes in UI/UX and brand identity design.', photo: '', initials: 'S', color: 'from-emerald-500 to-teal-600' },
  { id: 5, name: 'Sunny Rathor', role: 'Performance Marketing Manager', bio: 'Data-driven marketer focused on ROI, paid ads, and growth strategies for Indian markets.', photo: '', initials: 'SR', color: 'from-amber-500 to-orange-600' },
]

async function getTeam(supabase: ReturnType<typeof createServerClient>) {
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'team_members')
    .single()
  if (data?.value) {
    try { return JSON.parse(data.value) } catch { return DEFAULT_TEAM }
  }
  return DEFAULT_TEAM
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const team = await getTeam(supabase)
    return NextResponse.json(team)
  } catch {
    return NextResponse.json(DEFAULT_TEAM)
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await req.json()
    const team = await getTeam(supabase)
    const newMember = { ...body, id: Date.now() }
    const updated = [...team, newMember]
    await supabase.from('site_settings').upsert({ key: 'team_members', value: JSON.stringify(updated) }, { onConflict: 'key' })
    return NextResponse.json(newMember)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await req.json()
    const team = await getTeam(supabase)
    const updated = team.map((m: any) => m.id === body.id ? { ...m, ...body } : m)
    await supabase.from('site_settings').upsert({ key: 'team_members', value: JSON.stringify(updated) }, { onConflict: 'key' })
    return NextResponse.json(body)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { id } = await req.json()
    const team = await getTeam(supabase)
    const updated = team.filter((m: any) => m.id !== id)
    await supabase.from('site_settings').upsert({ key: 'team_members', value: JSON.stringify(updated) }, { onConflict: 'key' })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
