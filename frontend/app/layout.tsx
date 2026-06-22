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
  title: {
    default: 'AirX Solution – Premium Web Development & Digital Agency',
    template: '%s | AirX Solution',
  },
  description: 'AirX Solution delivers premium web development, Shopify store development, custom admin panels, e-commerce solutions, and business automation. Transform your digital presence today.',
  keywords: ['web development', 'Shopify development', 'e-commerce', 'admin panel', 'UI/UX design', 'business automation', 'AirX Solution'],
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
