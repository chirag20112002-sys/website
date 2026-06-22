'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Code2, ShoppingBag, Settings, LayoutDashboard, ShoppingCart,
  Globe, Wrench, Palette, Bot, ArrowRight, CheckCircle, Zap
} from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const services = [
  {
    id: 'web',
    icon: Code2,
    title: 'Website Development',
    tagline: 'Built for speed. Designed to convert.',
    color: 'from-indigo-500 to-purple-600',
    desc: 'We craft high-performance, SEO-optimized websites that not only look stunning but actually drive business results. From landing pages to complex multi-page sites, every pixel is intentional.',
    features: ['Custom design & development', 'Next.js / React / Vue.js', 'SEO-optimized codebase', 'Core Web Vitals optimized', 'Mobile-first responsive', 'CMS integration (Contentful, Sanity)', 'Analytics & conversion tracking'],
    time: '2–6 weeks',
    tag: 'Most Popular',
  },
  {
    id: 'shopify',
    icon: ShoppingBag,
    title: 'Shopify Store Setup',
    tagline: 'Launch your store, start selling faster.',
    color: 'from-emerald-500 to-teal-600',
    desc: 'We set up professional Shopify stores from scratch — product setup, payment gateways, shipping, custom themes, and everything you need to start selling on day one.',
    features: ['Full store configuration', 'Custom theme selection & setup', 'Product import & setup', 'Payment gateway integration', 'Shipping & tax setup', 'App installation & config', 'SEO foundations'],
    time: '1–3 weeks',
    tag: 'Fast Launch',
  },
  {
    id: 'shopify-custom',
    icon: Settings,
    title: 'Shopify Customization',
    tagline: 'Stand out with a store that\'s uniquely yours.',
    color: 'from-orange-500 to-amber-600',
    desc: 'Transform your existing Shopify store with custom design tweaks, feature development, and Liquid code customization that makes your brand impossible to ignore.',
    features: ['Custom Liquid development', 'Theme modification & redesign', 'Custom sections & blocks', 'Checkout customization', 'App development & integration', 'Performance optimization', 'A/B testing setup'],
    time: '1–4 weeks',
    tag: null,
  },
  {
    id: 'admin',
    icon: LayoutDashboard,
    title: 'Custom Admin Panels',
    tagline: 'Control your business from one powerful hub.',
    color: 'from-blue-500 to-cyan-600',
    desc: 'We build intuitive, feature-rich admin dashboards tailored to your exact workflow — whether you\'re managing inventory, users, analytics, or all of the above.',
    features: ['Role-based access control', 'Real-time data visualization', 'Custom reports & exports', 'User management', 'Audit logs & activity tracking', 'API integrations', 'Mobile responsive panel'],
    time: '3–8 weeks',
    tag: null,
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    tagline: 'Sell more with a store built to perform.',
    color: 'from-rose-500 to-pink-600',
    desc: 'Full-stack e-commerce solutions beyond Shopify — custom platforms, multi-vendor marketplaces, subscription models, and complex catalog management.',
    features: ['Custom cart & checkout', 'Payment gateway integration', 'Inventory management', 'Multi-vendor support', 'Subscription billing', 'Order management system', 'Analytics dashboard'],
    time: '4–12 weeks',
    tag: 'Enterprise',
  },
  {
    id: 'webapp',
    icon: Globe,
    title: 'Web Applications',
    tagline: 'Complex problems. Elegant solutions.',
    color: 'from-violet-500 to-purple-600',
    desc: 'From SaaS platforms to internal tools and customer portals — we build robust, scalable web applications with the architecture to grow with your business.',
    features: ['SaaS platform development', 'API design & development', 'Database architecture', 'Authentication & security', 'Real-time features', 'Third-party integrations', 'Scalable cloud deployment'],
    time: '6–20 weeks',
    tag: null,
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance & Support',
    tagline: 'Keep your digital assets at their best.',
    color: 'from-slate-500 to-gray-600',
    desc: 'Ongoing website maintenance, security monitoring, performance optimization, content updates, and technical support to keep your site running at peak performance.',
    features: ['Monthly security updates', 'Performance monitoring', 'Bug fixes & patches', 'Content updates', 'Daily/weekly backups', 'Uptime monitoring 24/7', 'Priority support response'],
    time: 'Monthly plans',
    tag: null,
  },
  {
    id: 'uiux',
    icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Design that delights and converts.',
    color: 'from-fuchsia-500 to-pink-600',
    desc: 'User-centered design that balances beauty with functionality. We create interfaces that users love and that guide them naturally toward your conversion goals.',
    features: ['User research & personas', 'Wireframing & prototyping', 'Visual design system', 'Figma design files', 'Usability testing', 'Responsive design specs', 'Design handoff'],
    time: '2–5 weeks',
    tag: null,
  },
  {
    id: 'automation',
    icon: Bot,
    title: 'Business Automation',
    tagline: 'Work smarter, not harder.',
    color: 'from-indigo-500 to-cyan-600',
    desc: 'Automate your business workflows with custom integrations, scheduled tasks, API connections between your tools, and intelligent process automation.',
    features: ['Workflow automation', 'API integrations (Zapier-level)', 'Email automation', 'CRM integrations', 'Report generation', 'Data sync across platforms', 'Custom scripts & bots'],
    time: '2–6 weeks',
    tag: null,
  },
]

export default function ServicesPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">Our Services</span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Everything Your Business <span className="gradient-text">Needs Online</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive digital services delivered with precision, passion, and a relentless focus on results. We don't just complete projects — we build lasting digital assets.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {services.map(s => (
                <a key={s.id} href={`#${s.id}`} className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((s, i) => (
            <FadeIn key={s.id} delay={0.1}>
              <div id={s.id} className="scroll-mt-24">
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}>
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <s.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-3xl font-bold font-display text-slate-800 dark:text-white">{s.title}</h2>
                      {s.tag && <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{s.tag}</span>}
                    </div>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4 italic">"{s.tagline}"</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                      <Zap className="w-4 h-4 text-indigo-500" />
                      Typical timeline: <strong className="text-slate-700 dark:text-slate-300">{s.time}</strong>
                    </div>
                    <Link href="/contact" className="btn-primary">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {/* Features */}
                  <div className="flex-1 w-full">
                    <div className="glass-card p-7">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-5 font-display text-lg">What's Included</h4>
                      <ul className="space-y-3">
                        {s.features.map(f => (
                          <li key={f} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600 dark:text-slate-400 text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold font-display text-white mb-5">Not Sure What You Need?</h2>
            <p className="text-xl text-white/70 mb-8">Let's have a free 30-minute strategy call. We'll assess your needs and recommend the best approach.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Book a Free Call <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
