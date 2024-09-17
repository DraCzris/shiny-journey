import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'

import { AppContainer } from '../../components'
import { NewAppLayout } from '../../components/app-layout/new-app-layout'
import { PlanChangeView } from '../../views'

export default function PlanChange() {
  return (
    <AppContainer>
      <Head>
        <title>Pricing</title>
      </Head>

      <PlanChangeView />
    </AppContainer>
  )
}

PlanChange.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Pricing">{page}</NewAppLayout>
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
