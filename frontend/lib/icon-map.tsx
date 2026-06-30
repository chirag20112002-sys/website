import {
  Code2, ShoppingBag, Settings, LayoutDashboard, ShoppingCart, Globe, Wrench,
  Palette, Bot, Users, Package, BarChart3, Zap, Shield, TrendingUp, Rocket,
  Briefcase, Database, Smartphone, Cloud, Lock, FileText, Megaphone, Heart,
} from 'lucide-react'

export const ICON_MAP: Record<string, React.ElementType> = {
  Code2, ShoppingBag, Settings, LayoutDashboard, ShoppingCart, Globe, Wrench,
  Palette, Bot, Users, Package, BarChart3, Zap, Shield, TrendingUp, Rocket,
  Briefcase, Database, Smartphone, Cloud, Lock, FileText, Megaphone, Heart,
}

export const ICON_NAMES = Object.keys(ICON_MAP)

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const C = ICON_MAP[name] ?? Zap
  return <C className={className} />
}

export const GRADIENT_OPTIONS = [
  'from-indigo-500 to-purple-600',
  'from-violet-500 to-purple-700',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-cyan-600',
  'from-orange-500 to-amber-600',
  'from-rose-500 to-pink-600',
  'from-fuchsia-500 to-pink-600',
  'from-slate-500 to-gray-600',
]
