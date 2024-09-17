import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@waypoint/components/styles.css'

import { AppWrapper } from '../components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Waypoint AI',
  description: 'Waypoint AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
