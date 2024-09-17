import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'

import { NewAppLayout } from '../../components'
import { AccountView } from '../../views'

export default function Account() {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <AccountView />
    </>
  )
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Account">{page}</NewAppLayout>
}

export const getServerSideProps = withPageAuthRequired()
