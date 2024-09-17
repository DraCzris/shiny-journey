import Image from 'next/image'

import { useAnalyzedIssues } from '@waypoint/api-tenant-admin'
import { Button, Table, TableRow } from '@waypoint/components'

import { Card } from '../../components'

function mapUrlToZendesk(url: string): string {
  if (url.includes('zendesk')) {
    return '/images/zendesk.svg'
  }

  return '/images/jira.svg'
}

export const AnalyzedIssuesList = () => {
  const { data, error } = useAnalyzedIssues()

  if (data?.data.length === 0 || error) {
    return (
      <Card cardTitle="History">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No history yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Once you link your Jira account, we’ll start analyzing your issues
            and show them here.
          </p>
          <div className="mt-6">
            <Button href="https://marketplace.atlassian.com/apps/1232678/waypoint-ai-for-jira?tab=overview&hosting=cloud">
              Link your Jira account
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card noPadding className="overflow-hidden sm:rounded-lg">
      <Table
        tableHead={
          <>
            <th
              className="sticky top-0 z-10 hidden px-3 py-3.5 pl-6 text-left text-sm font-semibold text-gray-900 lg:table-cell w-8"
              scope="col"
            >
              ID
            </th>

            <th
              className="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
              scope="col"
            ></th>
            <th
              className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell w-80 "
              scope="col"
            >
              Title
            </th>
            <th
              className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              scope="col"
            >
              Summary
            </th>
          </>
        }
      >
        {data?.data.map((issue) => (
          <TableRow key={issue.id}>
            <td className="whitespace-nowrap hidden px-3 py-4 pl-6 text-sm text-gray-500 sm:table-cell align-top text-left">
              <a className="text-blue-500 font-bold" href={issue.url}>
                {issue.id}
              </a>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell align-top align-left">
              <Image
                alt="Logo"
                className="w-5 h-5"
                height={50}
                src={mapUrlToZendesk(issue.url)}
                width={50}
              />
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell align-top">
              {issue.title}
            </td>
            <td className="relative py-4 pr-4 pl-3 text-left text-gray-500 text-sm sm:pr-8 lg:pr-8">
              {issue.summary}
            </td>
          </TableRow>
        ))}
      </Table>
    </Card>
  )
}
