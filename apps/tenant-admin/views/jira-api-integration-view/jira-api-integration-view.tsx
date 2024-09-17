import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useConfigureJiraApi, useJiraApiInfo } from '@waypoint/api-tenant-admin'
import { isEmpty, useToast } from '@waypoint/components'

import { AppContainer } from '../../components'

import type { FormFields } from './jira-api-config-form'
import { JiraApiConfigForm } from './jira-api-config-form'

export const JiraApiIntegrationView = () => {
  const { data, isLoading } = useJiraApiInfo()
  const { addToast } = useToast()
  const { push } = useRouter()

  const { mutate } = useConfigureJiraApi({
    mutation: {
      onSuccess: (data) => {
        if (isEmpty(data.data)) {
          return addToast({
            title: 'Oops!',
            message: 'Something went wrong! Try again later!',
            type: 'error',
          })
        }

        push('/integrations/jira-api/credentials-submitted')

        addToast({
          title: 'Jira API integration has been successfully configured',
          message: 'Changes saved',
          type: 'success',
        })
      },
      onError: () => {
        addToast({
          title: 'Error',
          message: 'An error occurred while configuring Jira API',
          type: 'error',
        })
      },
    },
  })

  const defaultData = data?.data

  if (isLoading) {
    return null
  }

  const handleSubmit = (values: FormFields) => {
    mutate({
      data: {
        ...values,
      },
    })
  }

  return (
    <>
      <AppContainer>
        <Head>
          <title>Jira API Integration</title>
        </Head>
        <section className="sm:max-w-xl m-auto">
          <div className="h-12 w-12 m-auto mb-4 flex justify-center items-center rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
            <Image
              alt="Zendesk logo"
              className="w-9 h-9"
              height={100}
              src="/images/jira.svg"
              width={100}
            />
          </div>

          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Jira API configuration
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Before we can analyze your issues and generate a report, please
            configure your Jira integration by entering your Jira credentials
            below. These credentials will allow us to authenticate with Jira and
            access your issues via the Jira API.
          </p>

          {/* Form for adding Jira config fields, email, token, subdomain and submit button */}
          <JiraApiConfigForm
            defaultValues={defaultData?.configuration}
            onSubmit={handleSubmit}
          />
        </section>
      </AppContainer>
    </>
  )
}
