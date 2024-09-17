import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { NewAppLayout } from '../../components'
import { IntegrationsView } from '../../views'

export default function Integrations() {
  return <IntegrationsView />
}

Integrations.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Integration">{page}</NewAppLayout>
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired({
  // return server-side props section name once Layout is in top level
})
