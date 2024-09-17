import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'

import { StackedLayout } from 'tenant-admin/components'
import { ConsentsCollectionView } from 'tenant-admin/views'

export default function ConsentsCollection() {
  return (
    <StackedLayout>
      <Head>
        <title>Waypoint AI - Accept Terms & Conditions</title>
      </Head>
      <ConsentsCollectionView />
    </StackedLayout>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
