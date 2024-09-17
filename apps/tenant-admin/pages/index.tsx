import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'

import { NewAppLayout } from '../components/app-layout/new-app-layout'
import { OverviewView } from '../views'

export default function Home() {
  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <OverviewView />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Dashboard">{page}</NewAppLayout>
}

export const getServerSideProps = withPageAuthRequired()
