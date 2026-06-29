// ─── Site Configuration ────────────────────────────────────────────────────
// All branding, content, and settings are controlled from this file.
// Change values here to update the entire website.

export const siteConfig = {
  name: 'SARAL MIS',
  shortName: 'SARAL',
  fullName: 'SARAL MIS — Management Information System',
  tagline: 'Simplify. Automate. Grow.',
  headline: 'The Smartest Way to Manage Your Business Operations',
  subheadline:
    'SARAL MIS delivers powerful management software and digital solutions that help businesses digitize, automate, and scale with ease.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://saralmis.in',
  email: 'info@saralmis.in',
  emailSecondary: 'chirag.worksplace@gmail.com',
  phone: '+91 93105 93035',
  whatsapp: '919310593035',
  address: 'New Delhi, India',
  founded: '2020',

  social: {
    twitter: 'https://twitter.com/saralmis',
    linkedin: 'https://linkedin.com/company/saralmis',
    github: 'https://github.com/saralmis',
    instagram: 'https://instagram.com/saralmis',
  },

  seo: {
    title: 'SARAL MIS — Management Information System & Business Software',
    description:
      'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions for modern businesses.',
    keywords:
      'management information system, business software, CRM, ERP, HRMS, payroll, inventory management, SARAL MIS',
    ogImage: '/og-image.png',
  },

  stats: [
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 80, suffix: '+', label: 'Happy Clients' },
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
  ],

  cta: {
    primary: { label: 'Get Started Free', href: '/contact' },
    secondary: { label: 'View Our Work', href: '/portfolio' },
  },
}

export const solutions = [
  {
    id: 'digital-presence',
    icon: 'Globe',
    title: 'Digital Presence',
    color: 'from-indigo-500 to-violet-600',
    description: 'Beautiful websites and landing pages that convert visitors into customers.',
    services: ['Custom Website Development', 'Landing Pages', 'Company Profiles', 'Portfolio Design'],
  },
  {
    id: 'business-software',
    icon: 'LayoutDashboard',
    title: 'Business Software',
    color: 'from-emerald-500 to-teal-600',
    description: 'End-to-end business management systems that streamline your operations.',
    services: ['ERP Modules', 'CRM Development', 'HRMS', 'Payroll System', 'Attendance Management'],
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingBag',
    title: 'Ecommerce',
    color: 'from-orange-500 to-amber-600',
    description: 'High-converting online stores built on proven platforms.',
    services: ['Shopify Development', 'Ecommerce Solutions', 'Inventory Management', 'Purchase & Sales'],
  },
  {
    id: 'marketing',
    icon: 'TrendingUp',
    title: 'Marketing',
    color: 'from-rose-500 to-pink-600',
    description: 'Data-driven marketing strategies that grow your brand and revenue.',
    services: ['Digital Marketing', 'SEO', 'Social Media Management', 'Content Strategy'],
  },
  {
    id: 'design',
    icon: 'Palette',
    title: 'Design',
    color: 'from-purple-500 to-fuchsia-600',
    description: 'World-class design that communicates your brand story visually.',
    services: ['Branding', 'Graphic Design', 'UI/UX Design', 'Motion Design'],
  },
  {
    id: 'automation',
    icon: 'Zap',
    title: 'Automation & AI',
    color: 'from-cyan-500 to-blue-600',
    description: 'AI-powered automation that eliminates repetitive work and scales your business.',
    services: ['AI Automation', 'API Integration', 'Dashboard Development', 'Cloud Deployment'],
  },
]

export const products = [
  {
    id: 'crm',
    icon: 'Users',
    title: 'CRM',
    subtitle: 'Customer Relationship Management',
    color: 'from-indigo-500 to-violet-600',
    description: 'Manage leads, track deals, and close more sales with our intelligent CRM.',
    badge: 'Popular',
  },
  {
    id: 'inventory',
    icon: 'Package',
    title: 'Inventory',
    subtitle: 'Stock & Warehouse Management',
    color: 'from-emerald-500 to-teal-600',
    description: 'Real-time inventory tracking across warehouses and sales channels.',
    badge: '',
  },
  {
    id: 'hrms',
    icon: 'UserCheck',
    title: 'HRMS',
    subtitle: 'Human Resource Management',
    color: 'from-blue-500 to-cyan-600',
    description: 'Complete HR suite for onboarding, attendance, leaves, and performance.',
    badge: '',
  },
  {
    id: 'payroll',
    icon: 'BadgeDollarSign',
    title: 'Payroll',
    subtitle: 'Salary & Compliance',
    color: 'from-amber-500 to-orange-600',
    description: 'Automated payroll processing with tax calculation and compliance.',
    badge: '',
  },
  {
    id: 'projects',
    icon: 'Kanban',
    title: 'Projects',
    subtitle: 'Project Management',
    color: 'from-violet-500 to-purple-600',
    description: 'Plan, track, and deliver projects on time with visual boards.',
    badge: 'New',
  },
  {
    id: 'pos',
    icon: 'ShoppingCart',
    title: 'POS',
    subtitle: 'Point of Sale System',
    color: 'from-rose-500 to-pink-600',
    description: 'Fast checkout, inventory sync, and real-time sales reporting.',
    badge: '',
  },
  {
    id: 'analytics',
    icon: 'BarChart3',
    title: 'Analytics',
    subtitle: 'Business Intelligence',
    color: 'from-cyan-500 to-blue-600',
    description: 'Turn raw data into actionable insights with powerful dashboards.',
    badge: '',
  },
  {
    id: 'operations',
    icon: 'Settings',
    title: 'Operations',
    subtitle: 'Operations Dashboard',
    color: 'from-slate-500 to-slate-700',
    description: 'Unified operations hub connecting all your business workflows.',
    badge: '',
  },
]

export const industries = [
  { icon: 'Factory', title: 'Manufacturing', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: 'ShoppingCart', title: 'Retail', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: 'Heart', title: 'Healthcare', color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { icon: 'Truck', title: 'Logistics', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { icon: 'UtensilsCrossed', title: 'Restaurants', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { icon: 'GraduationCap', title: 'Education', color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { icon: 'Rocket', title: 'Startups', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { icon: 'Building2', title: 'Real Estate', color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { icon: 'Store', title: 'Wholesale', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { icon: 'Globe', title: 'Ecommerce', color: 'text-pink-500', bg: 'bg-pink-500/10' },
]

export const processSteps = [
  { step: '01', title: 'Discovery', description: 'We deep-dive into your business goals, challenges, and requirements to build a shared understanding.', icon: 'Search' },
  { step: '02', title: 'Planning', description: 'Detailed project plan, tech stack selection, timeline, and resource allocation.', icon: 'FileText' },
  { step: '03', title: 'UI/UX Design', description: 'Wireframes, prototypes, and pixel-perfect designs crafted for your target audience.', icon: 'Palette' },
  { step: '04', title: 'Development', description: 'Clean, scalable code built with modern tech stacks and best practices.', icon: 'Code2' },
  { step: '05', title: 'Testing', description: 'Rigorous QA testing across devices, browsers, and performance benchmarks.', icon: 'CheckCircle' },
  { step: '06', title: 'Deployment', description: 'Smooth launch with CI/CD pipelines, cloud hosting, and monitoring.', icon: 'Rocket' },
  { step: '07', title: 'Support', description: 'Ongoing maintenance, updates, and dedicated support post-launch.', icon: 'HeadphonesIcon' },
]

export const technologies = [
  { name: 'Next.js', color: 'from-slate-600 to-slate-800' },
  { name: 'React', color: 'from-cyan-500 to-blue-600' },
  { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
  { name: 'Tailwind CSS', color: 'from-teal-500 to-cyan-600' },
  { name: 'Supabase', color: 'from-emerald-500 to-green-600' },
  { name: 'PostgreSQL', color: 'from-blue-600 to-indigo-700' },
  { name: 'Node.js', color: 'from-green-500 to-emerald-700' },
  { name: 'Vercel', color: 'from-slate-700 to-slate-900' },
  { name: 'Cloudflare', color: 'from-orange-500 to-amber-600' },
  { name: 'GitHub', color: 'from-slate-600 to-slate-900' },
  { name: 'REST API', color: 'from-violet-500 to-purple-700' },
  { name: 'AI Integration', color: 'from-indigo-500 to-violet-600' },
]

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹15,000',
    period: 'project',
    description: 'Perfect for small businesses getting started online.',
    badge: '',
    color: 'border-slate-700',
    features: [
      '5-page responsive website',
      'Mobile-first design',
      'Contact form',
      'Basic SEO setup',
      'WhatsApp integration',
      '1 month support',
    ],
    cta: 'Get Started',
    href: '/contact',
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹45,000',
    period: 'project',
    description: 'For growing businesses that need more power and features.',
    badge: 'Most Popular',
    color: 'border-indigo-500',
    features: [
      'Everything in Starter',
      'Up to 15 pages',
      'CMS / Admin Panel',
      'Supabase database',
      'Advanced animations',
      'Blog & Portfolio',
      'SEO optimization',
      '3 months support',
    ],
    cta: 'Start Building',
    href: '/contact',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    description: 'For large organizations needing custom software solutions.',
    badge: '',
    color: 'border-violet-500',
    features: [
      'Everything in Business',
      'Custom ERP / CRM / HRMS',
      'Multi-user roles & auth',
      'API integrations',
      'AI automation',
      'Cloud deployment',
      'SLA guarantee',
      'Dedicated support',
      '12 months maintenance',
    ],
    cta: 'Talk to Us',
    href: '/contact',
  },
]

export const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'A standard business website takes 2–4 weeks. Complex projects with custom software (ERP, CRM, HRMS) typically take 6–16 weeks depending on scope.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes, we work with clients across India, US, UK, UAE, and globally. All communication is in English and we support multiple time zones.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We use Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Node.js, and cloud platforms like Vercel and Cloudflare for most projects.',
  },
  {
    q: 'Will I own the source code?',
    a: 'Yes, 100%. After project completion and final payment, full source code ownership transfers to you with documentation.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes. We offer monthly maintenance packages covering security updates, performance monitoring, content updates, and bug fixes.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. We specialize in redesigns that preserve SEO rankings while dramatically improving design, performance, and conversions.',
  },
  {
    q: 'What is your payment process?',
    a: 'We typically work with 40% upfront, 40% at development milestone, and 20% at launch. Enterprise projects use milestone-based billing.',
  },
  {
    q: 'Do you build mobile apps too?',
    a: 'We focus on web applications (which work on mobile) and progressive web apps (PWAs). For native iOS/Android, we partner with trusted mobile developers.',
  },
]
