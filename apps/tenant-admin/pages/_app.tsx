import '@waypoint/components/styles.css'

import type { ReactElement, ReactNode } from 'react'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { ToastProvider } from '@waypoint/components'

import { RestProvider } from '../components/rest-provider/rest-provider'

const inter = Inter({ subsets: ['latin'] })

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // TODO: Add a layout for the app and for onboarding use its own layout
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <UserProvider>
      <RestProvider>
        <ToastProvider>
          <main className={inter.className}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <style global jsx>{`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}</style>
            {getLayout(<Component {...pageProps} />)}
          </main>
        </ToastProvider>
      </RestProvider>
    </UserProvider>
  )
}
