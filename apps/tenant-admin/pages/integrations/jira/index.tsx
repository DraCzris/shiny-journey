import type { ReactElement } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { NewAppLayout } from 'tenant-admin/components'
import { JiraProjectsView } from 'tenant-admin/views'

export default function Jira() {
  return <JiraProjectsView />
}

Jira.getLayout = function getLayout(page: ReactElement) {
  return <NewAppLayout sectionName="Jira Integration">{page}</NewAppLayout>
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
