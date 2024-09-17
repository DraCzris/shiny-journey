import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

import {
  getReportAnalysisStatusQueryKey,
  useIntegrations,
  useTriggerAnalysis,
} from '@waypoint/api-tenant-admin'
import { Button, Card, Divider } from '@waypoint/components'

export const ReportDataInputCard = () => {
  const { data: integrationResponse } = useIntegrations()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useTriggerAnalysis({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(getReportAnalysisStatusQueryKey(), {
          data: data.data,
        })
      },
    },
  })

  if (!integrationResponse?.data) {
    return null
  }

  const hasJiraIntegrationConfigured =
    integrationResponse.data.jira_api.configured

  const handleGenerateReport = () => {
    mutate()
  }

  if (hasJiraIntegrationConfigured) {
    return (
      <Card className="p-3">
        <div className="bg-blue-100 flex flex-wrap justify-center text-center p-6 gap-4 rounded-md">
          <div className=" h-12 w-12 bg-blue-200 rounded-full flex justify-center items-center">
            <CheckCircleIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="w-full mb-2">
            <h2 className="text-lg font-semibold">
              We now have access to your data
            </h2>
            <p className="text-gray-800 text-md w-full">
              We will analyze your data and generate a report for you.
            </p>
          </div>

          <Button fullWidth disabled={isPending} onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex flex-col p-6 gap-4">
        <div className="p-4 rounded-lg overflow-hidden bg-blue-50">
          <div className="flex justify-between items-center  mb-2">
            <h2 className="text-md font-semibold">JIRA API Integration </h2>
            <span className="text-[10px] font-bold border text-blue-500 rounded-md bg-blue-200 py-0.5 px-1.5">
              RECOMMENDED
            </span>
          </div>

          <p className="text-gray-700 text-sm mb-6">
            Connect with us by giving us access to your Jira by official's Jira
            API and we will analyze your data.
          </p>

          <Button
            className="p-0"
            href="/integrations/jira-api"
            variant="primary"
          >
            Connect Jira
          </Button>
        </div>
        <Divider label="OR" />
        <div>
          <h2 className="text-md font-semibold mb-3">
            Upload CSV export from your Jira
          </h2>
          <div className="border-dashed text-sm rounded-lg border-2 border-gray-300 p-4 flex flex-col justify-center items-center align-middle  hover:bg-gray-100 cursor-pointer font-semibold text-gray-500">
            <PlusCircleIcon className="h-6 w-6 mb-2" />
            <p>Select file or drag and drop it here</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
