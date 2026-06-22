'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CEO', company: 'StyleVault Fashion', avatar: 'SM', rating: 5, project: 'Brand Website', text: 'AirX Solution transformed our online presence completely. The new website is stunning — it perfectly captures our brand identity. Since launch, our conversions jumped 340% and we\'re getting inquiries from boutiques we\'ve been targeting for years. The team was responsive, professional, and genuinely cared about our success.' },
  { name: 'James Rodriguez', role: 'Founder & CTO', company: 'TechNova Labs', avatar: 'JR', rating: 5, project: 'SaaS Admin Dashboard', text: 'The admin dashboard AirX built saves our team over 15 hours every week. It\'s exactly what we needed — clean, fast, and intuitive. They understood our complex requirements from day one and delivered ahead of schedule. Communication was transparent throughout. We\'re already planning our next project with them.' },
  { name: 'Priya Sharma', role: 'Marketing Director', company: 'GreenLeaf Organics', avatar: 'PS', rating: 5, project: 'Shopify Store', text: 'From concept to launch in just 5 weeks — and the result is incredible. Our Shopify store loads in under 2 seconds, looks beautiful on every device, and the subscription feature they built has added $50k/month in recurring revenue. Our bounce rate dropped 60% and email capture doubled. Can\'t recommend enough.' },
  { name: 'David Chen', role: 'Co-Founder', company: 'FinEdge Capital', avatar: 'DC', rating: 5, project: 'Financial Dashboard', text: 'We\'ve worked with four different agencies before AirX. None of them come close. They don\'t just write code — they think about your business. Our analytics dashboard is now processing $2M+ monthly and hasn\'t had a single outage. The code quality is exceptional, documentation is thorough, and post-launch support is outstanding.' },
  { name: 'Amanda Foster', role: 'Operations Manager', company: 'SwiftDeliver', avatar: 'AF', rating: 5, project: 'Marketplace Platform', text: 'Our multi-vendor marketplace was a complex build with real-time tracking, multiple payment methods, and vendor dashboards. AirX handled every challenge with composure and creativity. We launched with 200 vendors on day one and the platform hasn\'t missed a beat. Revenue in the first month exceeded our 6-month target.' },
  { name: 'Michael Torres', role: 'Director of Sales', company: 'GrowthMax Agency', avatar: 'MT', rating: 5, project: 'CRM Automation', text: 'The automation system AirX built changed how our sales team works. We went from manually following up on 500+ leads a week to having 70% of follow-ups handled automatically. Our pipeline velocity tripled. The AI integrations they suggested were spot-on. This investment paid for itself in 3 weeks.' },
  { name: 'Lisa Nakamura', role: 'Brand Manager', company: 'LuxeStyle Inc.', avatar: 'LN', rating: 5, project: 'Shopify Store', text: 'We needed a Shopify store that could handle 50,000+ SKUs without slowing down, with a custom checkout and subscription tiers. AirX delivered all of it — beautifully. The theme they built for us has been featured in Shopify\'s showcase. Monthly revenue is up 4x compared to our old WooCommerce store.' },
  { name: 'Robert Kim', role: 'CTO', company: 'EduLearn Academy', avatar: 'RK', rating: 5, project: 'E-Learning Platform', text: 'Building an e-learning platform is hard. Building one that scales to 10,000+ students, handles video streaming, course progression, and live tutoring is extremely hard. AirX made it look easy. The platform has a 95% course completion rate — something most platforms can only dream about. Exceptional work.' },
  { name: 'Emma Wilson', role: 'Founder', company: 'MediCare Health Group', avatar: 'EW', rating: 5, project: 'Patient Portal', text: 'HIPAA compliance in healthcare technology is non-negotiable. AirX understood this from our very first meeting. They built a patient portal that\'s not only fully compliant but genuinely enjoyable to use. Our patients actually give it a 4.9-star rating. That\'s unheard of in healthcare software.' },
  { name: 'Carlos Mendez', role: 'E-Commerce Manager', company: 'Artisan Collective', avatar: 'CM', rating: 5, project: 'Web Development', text: 'Small team, big results. That\'s AirX. We\'re an artisan marketplace with niche needs — custom product configurators, artisan profiles, commission tracking. They built everything we asked for and suggested improvements we hadn\'t even thought of. Genuine partners who care about your mission.' },
]

export default function TestimonialsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white dark:bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:opacity-20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-5">
              <Star className="w-3 h-3 fill-amber-500" /> 5.0 Average Rating
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold font-display mb-6">
              Client Stories & <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Real results from real businesses. Here's what our clients say about working with AirX Solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rating summary */}
      <section className="py-12 bg-slate-50 dark:bg-[#0d1423]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 justify-center text-center">
            <div>
              <p className="text-7xl font-bold gradient-text font-display">5.0</p>
              <div className="flex gap-1 justify-center my-2">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Average Rating</p>
            </div>
            <div className="hidden md:block w-px h-20 bg-slate-200 dark:bg-slate-700" />
            {[['80+', 'Happy Clients'], ['150+', 'Projects Completed'], ['100%', 'Recommendation Rate']].map(([v, l]) => (
              <div key={l}>
                <p className="text-4xl font-bold gradient-text font-display">{v}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-20 bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.05} className="break-inside-avoid mb-6">
                <div className="glass-card p-6 relative">
                  <Quote className="w-8 h-8 text-indigo-500/20 absolute top-5 right-5" />
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs mb-3">{t.project}</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-sm italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-4xl font-bold font-display text-white mb-5">Join 80+ Happy Clients</h2>
            <p className="text-xl text-white/70 mb-8">Your success story starts here. Let's build something great together.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all hover:-translate-y-1 shadow-xl">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  )
}
