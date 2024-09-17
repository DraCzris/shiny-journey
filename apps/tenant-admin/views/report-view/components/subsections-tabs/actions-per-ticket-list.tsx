import { useState } from 'react'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

import type { Intervention } from '@waypoint/api-tenant-admin'
import { Card } from '@waypoint/components'

import { EmptyState } from '../empty-state'
import { useFilters } from '../report-filter-provider'

import type { GroupedItem } from './ticket-detail-modal'
import { TicketDetailModal } from './ticket-detail-modal'

export const ActionsPerTicketList = () => {
  const { filteredData, isLoadingData } = useFilters()

  const [selectedTicket, setSelectedTicket] = useState<GroupedItem | null>(null)

  function groupActionsByContextId(events: Intervention[]): GroupedItem[] {
    const grouped: { [key: string]: GroupedItem } = events.reduce(
      (acc, intervention) => {
        const id = intervention.event.report.public_id

        if (!acc[id]) {
          // eslint-disable-next-line no-param-reassign
          acc[id] = {
            title: intervention.event.report.title,
            description: intervention.event.report.description,
            id,
            created_at: intervention.event.report.created_at,
            assignee: intervention.event.report.assignee,
            opened: intervention.event.report.type === 'jira_open',
            link: intervention.event.report.link,
            actions: [],
          }
        }
        acc[id].actions.push(intervention.event)

        return acc
      },
      {} as { [key: string]: GroupedItem }
    )

    return Object.values(grouped)
  }

  const items = groupActionsByContextId(filteredData ?? [])

  // TODO: add loading state
  if (!items.length && !isLoadingData) {
    return <EmptyState />
  }

  return (
    <Card className="mb-20">
      <TicketDetailModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
      <ul className="divide-y divide-gray-100" role="list">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative flex justify-between gap-x-6 py-5 px-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full shrink-0 flex justify-center items-center">
                <Image
                  alt="Jira logo"
                  className="h-6 w-6 flex-none -ml-1"
                  height={20}
                  src="/images/jira.svg"
                  width={20}
                />
              </div>

              <div className="min-w-0 flex-auto">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  <div onClick={() => setSelectedTicket(item)}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    <span>
                      <Link
                        className="relative truncate hover:underline text-blue-600 font-semibold inline-flex items-baseline gap-1"
                        href={item.link}
                        target="_blank"
                      >
                        <span>{item.id}</span>
                      </Link>
                    </span>
                    <span className="text-gray-300 mx-1.5">&bull;</span>
                    <span>{item.title}</span>
                    <p className="relative truncate text-xs leading-5 text-gray-500 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="flex items-center gap-x-1.5">
                  <dt>
                    <span className="sr-only">Total actions</span>
                  </dt>
                  <dd className="text-sm flex items-center gap-1 leading-6 text-red-600 bg-red-100 py-0.3 px-2 rounded-md font-semibold">
                    {item.actions.length}
                  </dd>
                </div>
              </div>
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
