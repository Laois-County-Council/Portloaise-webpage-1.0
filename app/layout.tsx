import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from './providers'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'Laois Guide - Welcome to Ireland',
  description: 'A comprehensive guide for immigrants in Laois, Ireland. Learn English, find resources, and adapt to life in Ireland.',
  generator: 'v0.app',
  keywords: ['Laois', 'Ireland', 'immigrants', 'ESOL', 'English learning', 'community guide'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 1. Changed lang to "ar" if you are targeting Arabic-first users, 
    // and kept suppressHydrationWarning intact.
    <html lang="ar" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}>
        {/* 2. We wrap the ThemeProvider or add properties so the root script 
          injection is ignored by the automated Chrome translator extension.
        */}
        <div translate="no">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* We allow translation to happen safely back inside the dynamic components area */}
            <div translate="yes">
              <Providers>
                {children}
              </Providers>
            </div>
          </ThemeProvider>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}