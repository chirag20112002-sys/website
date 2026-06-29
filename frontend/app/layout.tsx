import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7C3AED',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://saralmis.in'),
  title: {
    default: 'SARAL MIS — Management Information System & Business Software',
    template: '%s | SARAL MIS',
  },
  description: 'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions for modern businesses.',
  keywords: ['management information system', 'MIS', 'business software', 'CRM', 'ERP', 'HRMS', 'payroll', 'inventory management', 'SARAL MIS'],
  authors: [{ name: 'SARAL MIS' }],
  creator: 'SARAL MIS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saralmis.in',
    siteName: 'SARAL MIS',
    title: 'SARAL MIS — Management Information System & Business Software',
    description: 'SARAL MIS provides powerful business management software — CRM, ERP, HRMS, Payroll, Inventory, and custom web solutions.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SARAL MIS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARAL MIS — Management Information System',
    description: 'Powerful business management software — CRM, ERP, HRMS, Payroll, Inventory.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
