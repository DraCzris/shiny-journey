import Image from 'next/image'

import { useGetTenant } from '@waypoint/api-tenant-admin'
import { Button } from '@waypoint/components'
import { getEnvironmentConfig } from '@waypoint/environment'

import { AppContainer, Stats } from '../../components'

import { AnalyzedIssuesList } from './analyzed-issues-list'

export const StandardOverview = () => {
  const { data: response } = useGetTenant()
  const host = typeof window !== 'undefined' ? window.location.host : ''

  const config = getEnvironmentConfig(host)

  const data = response?.data

  if (!data) {
    return null
  }

  return (
    <AppContainer>
      <section className="grid gap-10 max-w-7xl m-auto">
        {data.account.type === 'standard' && !data.account.is_linked && (
          <div className="bg-blue-100/80 px-6 py-8 sm:px-8 rounded-xl">
            <div className="flex gap-3 items-center mb-4">
              <div className="h-12 w-12 flex justify-center items-center rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
                <Image
                  alt="Waypoint"
                  className="h-9 w-9"
                  height={48}
                  src="/images/jira.svg"
                  width={48}
                />
              </div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Get started: Connect Waypoint to Jira
              </h3>
            </div>
            <p className="text-sm text-gray-800 mb-4">
              To generate bug analysis & more, install Waypoint in your Jira
              environment. Click the link to open the Waypoint App page on the
              Atlassian Marketplace. Install the application in your Jira
              environment! That’s it!
            </p>
            <div className="flex items-center gap-x-4">
              <Button
                href="https://marketplace.atlassian.com/apps/1232678/waypoint-ai-for-jira?tab=overview&hosting=cloud"
                variant="primary"
              >
                Link your Jira account
              </Button>
              <Button href="/integrations" variant="text">
                See other integrations
              </Button>
            </div>
          </div>
        )}

        {config.FEATURE_METRICS_ENABLED && <Stats />}

        <section>
          <h1 className="text-base font-semibold leading-7 text-gray-900 mb-4">
            Bug Analysis Log
          </h1>
          <AnalyzedIssuesList />
        </section>
      </section>
    </AppContainer>
  )
}
