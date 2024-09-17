import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'

import { Button } from '@waypoint/components'

import { AppContainer } from '../../components'

export const JiraApiCredentialsSubmittedView = () => (
  <AppContainer>
    <Head>
      <title>Jira Credentials Submitted</title>
    </Head>
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center max-w-xl">
        <div>
          <CheckCircleIcon className="w-14 h-14 text-blue-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Your Jira credentials have been submitted
        </h1>
        <p className="mt-2 max-w-4xl text-md text-center text-gray-700">
          Thank you. Now we are able to fetch data from your Jira instance and
          analyze it. You can check the status of your report on the Report
          page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-3">
          <Button href="/integrations/jira-api" variant="secondary">
            Edit credentials
          </Button>
          <Button href="/report" variant="primary">
            Go to Report
          </Button>
        </div>
      </div>
    </div>
  </AppContainer>
)
