import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { NewAppLayout } from 'tenant-admin/components'
import { JiraApiIntegrationView } from 'tenant-admin/views'

export default function JiraApi() {
  return <JiraApiIntegrationView />
}

JiraApi.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Jira API Integration">{page}</NewAppLayout>
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
