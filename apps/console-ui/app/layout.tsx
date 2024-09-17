import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@waypoint/components/styles.css'

import { AppWrapper } from '../components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Console UI',
  description: 'Console UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full bg-gray-900" data-mode="dark" lang="en">
      <body className={`${inter.className} h-full`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
