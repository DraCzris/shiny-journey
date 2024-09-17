import Image from 'next/image'

import { useGetTenant } from '@waypoint/api-tenant-admin'
import { Button } from '@waypoint/components'

import { AppContainer, Card, Progress } from '../../components'
import { getFormattedDate } from '../../utils'

export const AccountView = () => {
  const { data: response } = useGetTenant()

  const data = response?.data

  if (!data) {
    return null
  }

  const dataAccount = data.account.type === 'standard' ? data.account : null
  const percentage = dataAccount?.quota
    ? (dataAccount.quota.used / dataAccount.quota.limit) * 100
    : 0

  return (
    <AppContainer>
      <section className="grid gap-6 max-w-7xl m-auto">
        {!dataAccount?.is_linked && (
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

        <section>
          <h1 className="text-base font-semibold leading-7 text-gray-900 mb-4">
            Period info
          </h1>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <Card cardTitle="Your plan">
              <dt className="truncate text-sm font-medium text-gray-500 flex items-center gap-x-3">
                <span>Current plan</span>
                <div className="flex-none rounded-full p-1 text-green-400 bg-green-400/10">
                  <div className="h-2 w-2 rounded-full bg-current"></div>
                </div>
              </dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                {dataAccount?.subscription?.data.title}
              </dd>

              <dt className="truncate text-sm font-medium text-gray-500">
                Active since
              </dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                {dataAccount?.subscription?.active_from &&
                  getFormattedDate(dataAccount.subscription.active_from, 'en', {
                    dateStyle: 'short',
                  })}
              </dd>
            </Card>

            <Card cardTitle="Current period usage">
              <Progress
                percentage={percentage}
                title={`${dataAccount?.quota?.used ?? 0} of ${
                  dataAccount?.quota?.limit ?? 0
                } bugs summarized`}
              />

              <p className="text-sm mt-2 mb-3">
                Not enough? Upgrade your plan to analyze more bugs.
              </p>
              <Button
                fullWidth
                className="block"
                href="/plan-change"
                variant="primary"
              >
                Upgrade your plan
              </Button>
            </Card>
          </div>
        </section>
      </section>
    </AppContainer>
  )
}
