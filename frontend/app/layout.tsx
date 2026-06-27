import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://suprimohub.in'),
  title: {
    default: 'AirX Solution — Premium Web Development & Business Software',
    template: '%s | AirX Solution',
  },
  description: 'We build beautiful digital experiences and powerful business software. Custom websites, ERP, CRM, HRMS, Shopify stores, and AI automation for modern businesses.',
  keywords: ['web development', 'business software', 'CRM', 'ERP', 'HRMS', 'Shopify', 'digital marketing', 'AI automation', 'AirX Solution'],
  authors: [{ name: 'AirX Solution' }],
  creator: 'AirX Solution',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://airxsolution.com',
    siteName: 'AirX Solution',
    title: 'AirX Solution – Premium Web Development & Digital Agency',
    description: 'Transform your digital presence with AirX Solution. Expert web development, Shopify stores, and business automation.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AirX Solution' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AirX Solution – Premium Web Development',
    description: 'Premium web development and digital solutions',
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
