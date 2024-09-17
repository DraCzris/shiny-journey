import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { NewAppLayout } from '../../components'
import { ZendeskIntegration } from '../../views'

export default function Zendesk() {
  return <ZendeskIntegration />
}

Zendesk.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Zendesk Integration">{page}</NewAppLayout>
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
