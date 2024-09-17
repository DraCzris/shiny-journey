import {
  ChevronDoubleDownIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/20/solid'

import type { EventType } from '@waypoint/api-tenant-admin'
import { useReportAnalysis } from '@waypoint/api-tenant-admin'

import { EventCountButton } from '../event-count-button.tsx'
import { useFilters } from '../report-filter-provider'
import { BugAntSlashIcon, ListIncompleteSolidIcon } from '@waypoint/components'

export const IssuesEliminatedCard = () => {
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
            Closable Issues
          </h3>
          <p className="mt-1 max-w-4xl text-5xl text-gray-900 font-bold">20</p>
        </div>

        <div className="flex w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
          <ChevronDoubleDownIcon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="flex justify-between flex-wrap xl:flex-nowrap mt-5 gap-4">
        <EventCountButton
          count={data?.counts.incomplete ?? 0}
          icon={<ListIncompleteSolidIcon className="h-6 w-6" />}
          isActive={filters.actions.incomplete && activeActionsCount === 1}
          label="Incomplete: missing critical information"
          onClick={() => setFilter('incomplete', true)}
        />
        <EventCountButton
          count={data?.counts.not_a_bug ?? 0}
          icon={<BugAntSlashIcon className="h-6 w-6" />}
          isActive={filters.actions.not_a_bug && activeActionsCount === 1}
          label="Reclassify: not a bug"
          onClick={() => setFilter('not_a_bug', true)}
        />
      </div>
    </div>
  )
}
