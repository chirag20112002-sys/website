import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export type Service = {
  id: number
  title: string
  tagline: string
  description: string
  icon: string          // lucide icon name (see iconMap on frontend)
  color: string         // tailwind gradient e.g. 'from-indigo-500 to-purple-600'
  features: string[]
  timeline: string
  tag: string           // optional badge e.g. 'Most Popular'
  image: string
  active: boolean
  order: number
}

const DEFAULT_SERVICES: Service[] = [
  { id: 1, title: 'Website Development', tagline: 'Built for speed. Designed to convert.', icon: 'Code2', color: 'from-indigo-500 to-purple-600', description: 'High-performance, SEO-optimized websites that look stunning and drive real business results — from landing pages to complex multi-page sites.', features: ['Custom design & development', 'Next.js / React', 'SEO-optimized codebase', 'Core Web Vitals optimized', 'Mobile-first responsive', 'CMS integration', 'Analytics & conversion tracking'], timeline: '2–6 weeks', tag: 'Most Popular', image: '', active: true, order: 0 },
  { id: 2, title: 'ERP Development', tagline: 'Run your whole business from one place.', icon: 'Settings', color: 'from-orange-500 to-amber-600', description: 'End-to-end ERP solutions tailored for Indian businesses — manufacturing, retail, and services — with GST-ready workflows.', features: ['Custom modules', 'GST-compliant billing', 'Inventory & purchase', 'Accounting integration', 'Role-based access', 'Real-time reports', 'Cloud deployment'], timeline: '6–16 weeks', tag: 'Enterprise', image: '', active: true, order: 1 },
  { id: 3, title: 'HRMS & Payroll', tagline: 'People management, simplified.', icon: 'Users', color: 'from-emerald-500 to-teal-600', description: 'Complete HR management with GST-compliant payroll, leave tracking, attendance, and employee self-service.', features: ['Payroll automation', 'Attendance & leave', 'Employee self-service', 'Statutory compliance (PF/ESI)', 'Document management', 'Performance tracking', 'Mobile app'], timeline: '4–10 weeks', tag: '', image: '', active: true, order: 2 },
  { id: 4, title: 'CRM System', tagline: 'Never lose a lead again.', icon: 'LayoutDashboard', color: 'from-blue-500 to-cyan-600', description: 'Smart CRM to manage leads, follow-ups, pipelines, and client relationships effortlessly.', features: ['Lead & pipeline management', 'Follow-up reminders', 'Email & WhatsApp integration', 'Sales analytics', 'Custom stages', 'Team performance', 'Mobile responsive'], timeline: '3–8 weeks', tag: '', image: '', active: true, order: 3 },
  { id: 5, title: 'E-Commerce Development', tagline: 'Sell more with a store built to perform.', icon: 'ShoppingCart', color: 'from-rose-500 to-pink-600', description: 'Full-stack e-commerce — custom platforms, multi-vendor marketplaces, subscriptions, and complex catalog management.', features: ['Custom cart & checkout', 'Payment gateway integration', 'Inventory management', 'Multi-vendor support', 'Order management', 'Analytics dashboard', 'SEO foundations'], timeline: '4–12 weeks', tag: '', image: '', active: true, order: 4 },
  { id: 6, title: 'Business Automation', tagline: 'Work smarter, not harder.', icon: 'Bot', color: 'from-indigo-500 to-cyan-600', description: 'Automate workflows with custom integrations, scheduled tasks, and intelligent process automation across your tools.', features: ['Workflow automation', 'API integrations', 'Email automation', 'CRM integrations', 'Report generation', 'Data sync across platforms', 'Custom bots'], timeline: '2–6 weeks', tag: '', image: '', active: true, order: 5 },
]

async function getServices(supabase: ReturnType<typeof createServerClient>): Promise<Service[]> {
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'services_items').single()
  if (data?.value) {
    try { return JSON.parse(data.value) } catch { return DEFAULT_SERVICES }
  }
  return DEFAULT_SERVICES
}

async function save(supabase: ReturnType<typeof createServerClient>, items: Service[]) {
  await supabase.from('site_settings').upsert({ key: 'services_items', value: JSON.stringify(items) }, { onConflict: 'key' })
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const all = (await getServices(supabase)).sort((a, b) => a.order - b.order)
    const admin = new URL(req.url).searchParams.get('admin') === 'true'
    return NextResponse.json(admin ? all : all.filter(s => s.active))
  } catch {
    return NextResponse.json(DEFAULT_SERVICES)
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await req.json()
    const items = await getServices(supabase)
    const newItem: Service = {
      id: Date.now(),
      title: body.title || '', tagline: body.tagline || '', description: body.description || '',
      icon: body.icon || 'Zap', color: body.color || 'from-violet-500 to-purple-600',
      features: Array.isArray(body.features) ? body.features : [],
      timeline: body.timeline || '', tag: body.tag || '', image: body.image || '',
      active: body.active !== false, order: items.length,
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
    const items = await getServices(supabase)
    if (Array.isArray(body.items)) {
      const reordered = body.items.map((it: Service, i: number) => ({ ...it, order: i }))
      await save(supabase, reordered)
      return NextResponse.json(reordered)
    }
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
    const items = await getServices(supabase)
    const updated = items.filter(it => it.id !== id).map((it, i) => ({ ...it, order: i }))
    await save(supabase, updated)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
