import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'elitea.ai - Where AI gets practical',
  description: 'Applied AI Lab building practical solutions at the intersection of AI, Data, and Software Engineering. From QA automation to intelligent workflows.',
  keywords: 'AI, Machine Learning, Applied AI, Testing, QA Automation, Software Engineering',
  authors: [{ name: 'elitea.ai Team' }],
  openGraph: {
    title: 'elitea.ai - Where AI gets practical',
    description: 'Applied AI Lab building practical solutions at the intersection of AI, Data, and Software Engineering.',
    url: 'https://elitea.ai',
    siteName: 'elitea.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'elitea.ai - Where AI gets practical',
    description: 'Applied AI Lab building practical solutions at the intersection of AI, Data, and Software Engineering.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

import CookieBanner from '@/components/CookieBanner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}