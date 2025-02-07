import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: ['300'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Depth',
  description: 'A conversation game for meaningful discussions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

