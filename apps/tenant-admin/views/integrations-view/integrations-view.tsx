import Head from 'next/head'

import type { SupportedIntegrations } from '@waypoint/api-tenant-admin'
import { useIntegrations } from '@waypoint/api-tenant-admin'

import { AppContainer } from '../../components'

import { IntegrationCard, type IntegrationOptions } from './components'

export type IntegrationListDefinition = IntegrationOptions & {
  configured: boolean
}

export const IntegrationsView = () => {
  const { data: response, isLoading } = useIntegrations()

  const data = response?.data

  if (isLoading) {
    return <>{null}</>
  }

  if (!data) {
    return (
      <AppContainer>
        <h2 className="text-lg text-center text-red-500">
          Something went wrong
        </h2>
      </AppContainer>
    )
  }

  const supported: Record<
    keyof SupportedIntegrations,
    IntegrationListDefinition
  > = {
    jira: {
      title: 'Jira',
      description:
        'To generate bug analysis & more, install Waypoint in your Jira environment. Click the link to open the Waypoint App page on the Atlassian Marketplace. Install the application in your Jira environment! That’s it!',
      icon: '/images/jira.svg',
      href: data.jira.configured
        ? '/integrations/jira'
        : 'https://marketplace.atlassian.com/apps/1232678/waypoint-ai-for-jira?tab=overview&hosting=cloud',
      cta: 'Configure',
      enabled: data.jira.enabled,
      configured: data.jira.configured,
      customAction: data.jira.custom_action ?? null,
    },
    jira_api: {
      title: 'Jira API',
      description:
        'Connect your Jira account via API to seamlessly analyze your issues and generate comprehensive report. Simply enter your Jira API credentials to get started.',
      icon: '/images/jira.svg',
      href: '/integrations/jira-api',
      cta: 'Configure',
      enabled: data.jira_api.enabled,
      configured: data.jira_api.configured,
      customAction: data.jira_api.custom_action ?? null,
    },
    zendesk: {
      title: 'Zendesk',
      description: 'Connect your Zendesk account to Waypoint',
      icon: '/images/zendesk.svg',
      href: '/integrations/zendesk',
      cta: 'Configure',
      enabled: data.zendesk.enabled,
      configured: data.zendesk.configured,
      customAction: data.zendesk.custom_action ?? null,
    },
    github: {
      title: 'Github',
      description: 'Connect your Github account to Waypoint',
      icon: '/images/github.svg',
      href: undefined,
      cta: 'Not available',
      enabled: data.github.enabled,
      configured: data.github.configured,
      customAction: data.github.custom_action ?? null,
    },
    slack: {
      title: 'Slack',
      description: 'Connect your Slack account to Waypoint',
      icon: '/images/slack.svg',
      href: undefined,
      cta: 'Not available',
      enabled: data.slack.enabled,
      configured: data.slack.configured,
      customAction: data.slack.custom_action ?? null,
    },
  }

  const configuredIntegrations = Object.values(supported).filter(
    (i) => i.configured
  )

  const notConfiguredIntegrations = Object.values(supported).filter(
    (i) => !i.configured
  )

  // sort by enabled
  const sortedByConfiguration = notConfiguredIntegrations.sort(
    (a, b) => Number(b.enabled) - Number(a.enabled)
  )

  return (
    <>
      <Head>
        <title>Integrations</title>
      </Head>
      <AppContainer>
        <section className="grid gap-6 max-w-7xl m-auto">
          {configuredIntegrations.length > 0 && (
            <div>
              <div>
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                  Active integrations
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                  You have already linked the following integrations:
                </p>
              </div>
              <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 items-start">
                {configuredIntegrations.map((integration) => (
                  <IntegrationCard key={integration.title} {...integration} />
                ))}
              </ul>
            </div>
          )}
          <div>
            <h1 className="text-base font-semibold leading-7 text-gray-900 mb-4">
              Available integrations
            </h1>
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 items-start">
              {sortedByConfiguration.map((integration) => (
                <IntegrationCard key={integration.title} {...integration} />
              ))}
            </ul>
          </div>
        </section>
      </AppContainer>
    </>
  )
}
