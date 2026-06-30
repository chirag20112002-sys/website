import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider'
import { getSettings } from '@/lib/site-settings'
import './globals.css'

// Render every route dynamically so site settings (logo, contact, hero, etc.)
// are read fresh from the database on each request. Without this, Next.js
// statically bakes settings at build time and admin changes never appear.
export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7C3AED',
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()
  const title = s.meta_title || 'SARAL MIS — Management Information System & Business Software'
  const description = s.meta_desc || 'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions.'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saralmis.in'
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${s.site_name}` },
    description,
    keywords: ['management information system', 'MIS', 'business software', 'CRM', 'ERP', 'HRMS', 'payroll', 'inventory management', s.site_name],
    authors: [{ name: s.site_name }],
    creator: s.site_name,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: siteUrl,
      siteName: s.site_name,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: s.site_name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saralmis.in'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_name,
    url: siteUrl,
    logo: settings.logo_url || `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.phone,
      contactType: 'customer service',
      email: settings.email,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.address,
      addressCountry: 'IN',
    },
    sameAs: [settings.twitter, settings.linkedin, settings.instagram].filter(Boolean),
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href={settings.favicon_url || '/favicon.svg'}
          type={settings.favicon_url ? 'image/x-icon' : 'image/svg+xml'}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
          <SiteSettingsProvider settings={settings}>
            {children}
          </SiteSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
