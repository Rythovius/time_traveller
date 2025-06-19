import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'De Tijd-Detective - Nederlandse Historische Detective Game',
  description: 'Reis door de Nederlandse geschiedenis en los mysteries op door het juiste jaar te raden. Een educatieve game door 10 historische periodes.',
  keywords: ['geschiedenis', 'nederland', 'educatie', 'game', 'detective', 'tijdreizen'],
  authors: [{ name: 'Tom Naberink' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="h-full">
      <body className="h-full bg-amber-50 antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}