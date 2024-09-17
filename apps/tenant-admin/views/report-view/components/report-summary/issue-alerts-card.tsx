import {
  ChevronDoubleDownIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/20/solid'

import type { EventType } from '@waypoint/api-tenant-admin'
import { useReportAnalysis } from '@waypoint/api-tenant-admin'

import { EventCountButton } from '../event-count-button.tsx'
import { useFilters } from '../report-filter-provider'

import {
  UserSwitchSolidIcon,
  MergeDocumentsSolidIcon,
  LinkedDocumentsSolidIcon,
} from '@waypoint/components'

export const IssueAlertsCard = () => {
  const { data: response } = useReportAnalysis()
  const { filters, setFilter } = useFilters()
  const data = response?.data

  const activeActionsCount = Object.keys(filters.actions).filter(
    (key) => filters.actions[key as EventType]
  ).length

  return (
    <div className="col-span-12 bg-white p-6 px-10 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="text-base leading-6 text-blue-600 font-semibold">
            Total Actions
          </h3>
          <p className="mt-1 max-w-4xl text-5xl text-gray-900 font-bold">20</p>
        </div>

        <div className="flex w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
          <ChevronDoubleDownIcon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 justify-between flex-wrap 2xl:flex-nowrap mt-5 gap-4">
        <EventCountButton
          color="red"
          count={data?.counts.reroute ?? 0}
          icon={<UserSwitchSolidIcon className="h-6 w-6" />}
          isActive={filters.actions.reroute && activeActionsCount === 1}
          label="Reassign"
          onClick={() => setFilter('reroute', true)}
        />
        <EventCountButton
          color="red"
          count={data?.counts.reoccurring_report ?? 0}
          icon={<DocumentDuplicateIcon className="h-6 w-6" />}
          isActive={
            filters.actions.reoccurring_report && activeActionsCount === 1
          }
          label="Link: Reoccurring"
          onClick={() => setFilter('reoccurring_report', true)}
        />
        <EventCountButton
          color="red"
          count={data?.counts.link_related ?? 0}
          icon={<LinkedDocumentsSolidIcon className="h-6 w-6" />}
          isActive={filters.actions.link_related && activeActionsCount === 1}
          label="Link: Related"
          onClick={() => setFilter('link_related', true)}
        />
        <EventCountButton
          color="red"
          count={0}
          icon={<MergeDocumentsSolidIcon className="h-6 w-6" />}
          isActive={filters.actions.merge && activeActionsCount === 1}
          label="Merge: Duplicate"
          onClick={() => setFilter('merge', true)}
        />
      </div>
    </div>
  )
}
