'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'What services does AirX Solution offer?', a: 'We offer a full spectrum of digital services including website development, Shopify store setup and customization, custom admin panels, e-commerce solutions, web application development, UI/UX design, business automation, and ongoing maintenance & support.' },
      { q: 'How long does it take to complete a project?', a: 'Project timelines vary based on complexity. A basic landing page takes 1–2 weeks; a full website 3–6 weeks; a Shopify store 2–5 weeks; a complex web application or admin panel 8–20 weeks. We always provide a detailed timeline in our proposal.' },
      { q: 'Where is AirX Solution based? Do you work with international clients?', a: 'We\'re headquartered in Tech City, TC, but we work with clients globally. We\'ve delivered projects for clients across North America, Europe, Asia, and the Middle East. Time zone coordination is never a barrier for us.' },
      { q: 'Do I own the code and design after project completion?', a: 'Absolutely. Upon final payment, you receive full ownership of all code, design assets, and intellectual property. We provide clean, well-documented codebases with deployment instructions.' },
    ]
  },
  {
    category: 'Pricing & Payment',
    questions: [
      { q: 'How much does a website cost?', a: 'Pricing depends on scope and complexity. A basic business website starts at $1,500. A full custom website with CMS starts at $3,500. Shopify stores start at $1,000. We provide exact quotes after a discovery call — no guesswork.' },
      { q: 'What are your payment terms?', a: 'We typically use a milestone-based payment structure: 40% deposit to start, 30% at midpoint review, and 30% upon project completion. For larger projects, we can discuss custom payment schedules.' },
      { q: 'Do you offer monthly payment plans?', a: 'Yes, for projects over $5,000, we can arrange installment plans. We also offer monthly maintenance & support retainers starting at $299/month, which include updates, monitoring, and bug fixes.' },
      { q: 'Are there any hidden fees?', a: 'Never. Our proposals are comprehensive and fixed-price. The only additional costs would be third-party services you choose (hosting, domain, paid plugins), which we\'ll clearly outline upfront.' },
    ]
  },
  {
    category: 'Development Process',
    questions: [
      { q: 'What does your development process look like?', a: 'Our process: (1) Discovery call to understand your goals. (2) Proposal with timeline and quote. (3) Design mockups for your approval. (4) Development with weekly progress updates. (5) Review and revisions. (6) Launch and post-launch support.' },
      { q: 'How many revisions do I get?', a: 'We include unlimited minor revisions during development and 3 rounds of major revision cycles. After launch, our 30-day support window covers any bugs or adjustments needed.' },
      { q: 'Will I be able to update the website myself?', a: 'Yes. For content-heavy sites, we integrate a user-friendly CMS (like Sanity or a custom admin panel) so you can update text, images, blog posts, and more without touching code.' },
      { q: 'What technologies do you use?', a: 'We specialize in Next.js, React, Node.js, MongoDB, PostgreSQL, Tailwind CSS, and Shopify (Liquid). We choose the technology that best fits your project\'s needs, not what\'s easiest for us.' },
    ]
  },
  {
    category: 'Shopify',
    questions: [
      { q: 'Can you migrate my existing store to Shopify?', a: 'Yes, we handle full migrations from WooCommerce, Magento, BigCommerce, and custom platforms to Shopify. This includes product data, customer records, order history, and SEO URL redirects.' },
      { q: 'Do you build custom Shopify apps?', a: 'Yes. We develop public and private Shopify apps using the Shopify API and Remix framework. From inventory management tools to custom checkout experiences and loyalty programs.' },
      { q: 'Can you customize a premium Shopify theme I purchased?', a: 'Absolutely. We can modify any Shopify theme at the code level — sections, blocks, Liquid templates, and JavaScript — to match your exact vision without breaking update compatibility.' },
    ]
  },
  {
    category: 'Support & Maintenance',
    questions: [
      { q: 'Do you offer support after project launch?', a: 'All projects include 30 days of free post-launch support for bug fixes and minor adjustments. After that, we offer ongoing maintenance retainers with priority support, security updates, and performance monitoring.' },
      { q: 'What does your maintenance plan include?', a: 'Our maintenance plans include: weekly backups, security patches, plugin/dependency updates, uptime monitoring, performance optimization, bug fixes, and up to 4 hours of content updates per month.' },
      { q: 'How quickly do you respond to urgent issues?', a: 'For clients on a maintenance retainer, we guarantee a 4-hour response to critical issues (site down, security breach) and 24-hour response for non-critical bugs. Without a retainer, we aim to respond within 1–2 business days.' },
    ]
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-indigo-500' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('General')

  return (
    <SiteLayout>
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5">
              <HelpCircle className="w-3 h-3" /> FAQ
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about working with AirX Solution. Don't see your question? Ask us directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {faqs.map(cat => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.category
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {faqs.filter(cat => cat.category === activeCategory).map(cat => (
            <FadeIn key={cat.category}>
              <div className="glass-card p-6 md:p-8">
                <h2 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-2">{cat.category}</h2>
                <div>
                  {cat.questions.map(item => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.2} className="mt-10 glass-card p-8 text-center">
            <HelpCircle className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-2">Still Have Questions?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-5">Our team is ready to help. Reach out through any channel.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Chat
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
