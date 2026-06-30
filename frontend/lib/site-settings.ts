import { cache } from 'react'
import { createServerClient } from './supabase-server'

export interface SiteSettings {
  site_name: string
  tagline: string
  logo_url: string
  favicon_url: string

  hero_headline: string
  hero_subheadline: string
  hero_cta_primary: string
  hero_cta_secondary: string
  hero_image_url: string
  hero_video_url: string

  stat1_value: string; stat1_label: string
  stat2_value: string; stat2_label: string
  stat3_value: string; stat3_label: string
  stat4_value: string; stat4_label: string

  about_title: string
  about_text: string
  about_image_url: string

  email: string
  email_secondary: string
  phone: string
  whatsapp: string
  address: string
  google_maps_url: string

  meta_title: string
  meta_desc: string

  seo_home_title: string; seo_home_desc: string
  seo_about_title: string; seo_about_desc: string
  seo_contact_title: string; seo_contact_desc: string
  seo_services_title: string; seo_services_desc: string
  seo_portfolio_title: string; seo_portfolio_desc: string
  seo_pricing_title: string; seo_pricing_desc: string
  seo_faq_title: string; seo_faq_desc: string
  seo_blog_title: string; seo_blog_desc: string

  twitter: string
  linkedin: string
  github: string
  instagram: string

  portfolio_img1: string
  portfolio_img2: string
  portfolio_img3: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  site_name: 'SARAL MIS',
  tagline: 'Simplify. Automate. Grow.',
  logo_url: '',
  favicon_url: '',

  hero_headline: 'The Smartest Way to Manage Your Business Operations',
  hero_subheadline: 'SARAL MIS delivers powerful management software and digital solutions that help businesses digitize, automate, and scale with ease.',
  hero_cta_primary: 'Get Started Free',
  hero_cta_secondary: 'View Our Work',
  hero_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  hero_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-businessman-working-on-a-laptop-with-graphs-4835-large.mp4',

  stat1_value: '150+', stat1_label: 'Projects Delivered',
  stat2_value: '80+',  stat2_label: 'Happy Clients',
  stat3_value: '5+',   stat3_label: 'Years Experience',
  stat4_value: '99%',  stat4_label: 'Client Satisfaction',

  about_title: 'About SARAL MIS',
  about_text: 'We are a technology company specializing in business management software and digital solutions. From CRM to ERP, HRMS to Payroll — we build software that simplifies your operations.',
  about_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',

  email: 'info@saralmis.in',
  email_secondary: 'chirag.worksplace@gmail.com',
  phone: '+91 93105 93035',
  whatsapp: '919310593035',
  address: 'New Delhi, India',
  google_maps_url: '',

  meta_title: 'SARAL MIS — Management Information System & Business Software',
  meta_desc: 'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions.',

  seo_home_title: '', seo_home_desc: '',
  seo_about_title: '', seo_about_desc: '',
  seo_contact_title: '', seo_contact_desc: '',
  seo_services_title: '', seo_services_desc: '',
  seo_portfolio_title: '', seo_portfolio_desc: '',
  seo_pricing_title: '', seo_pricing_desc: '',
  seo_faq_title: '', seo_faq_desc: '',
  seo_blog_title: '', seo_blog_desc: '',

  twitter: 'https://twitter.com/saralmis',
  linkedin: 'https://linkedin.com/company/saralmis',
  github: 'https://github.com/saralmis',
  instagram: 'https://instagram.com/saralmis',

  portfolio_img1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  portfolio_img2: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  portfolio_img3: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
    if (error || !data) return DEFAULT_SETTINGS
    const raw: Record<string, string> = {}
    data.forEach((row: { key: string; value: string }) => {
      raw[row.key] = row.value
    })
    return { ...DEFAULT_SETTINGS, ...raw }
  } catch {
    return DEFAULT_SETTINGS
  }
})
