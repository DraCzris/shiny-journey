import Link from 'next/link'

import type { Event } from '@waypoint/api-tenant-admin'
import {
  Avatar,
  Button,
  Card,
  SideModal,
  getFormattedDate,
} from '@waypoint/components'

import { InterventionItem } from './intervention-item'

export type GroupedItem = {
  title: string
  description: string
  id: string
  link: string
  assignee?: string
  created_at: string
  opened: boolean
  actions: Event[]
}

type Props = {
  ticket: GroupedItem | null
  onClose: () => void
}

export const TicketDetailModal = ({ ticket, onClose }: Props) => (
  <SideModal
    open={!!ticket}
    panelTitle={
      <h1 className="text-xl font-semibold leading-6 text-gray-900 dark:text-gray-100 ml-6">
        <Link
          className="text-blue-600 mr-2"
          href={ticket?.link ?? ''}
          target="_blank"
        >
          {ticket?.id}
        </Link>
        <span className="text-gray-300 mr-2">&bull;</span>
        {ticket?.title}
      </h1>
    }
    sizeVariant="6xl"
    onClose={onClose}
  >
    <section className="px-6 mb-14">
      <div className="grid gap-3 grid-cols-12 items-start">
        <div className="col-span-2">
          <p className="text-base font-semibold mb-1">Status</p>
          <span className="text-sm leading-6 text-blue-700 py-1 px-2 bg-blue-100 rounded-md font-semibold">
            Open
          </span>
        </div>
        <div className="col-span-4">
          <p className="text-base font-semibold mb-2">Assignee</p>
          <div className="flex gap-2">
            {ticket?.assignee ? (
              <>
                <Avatar className="h-6 w-6" />
                <p className="text-sm leading-6 text-gray-800">
                  {ticket.assignee}
                </p>
              </>
            ) : (
              <p className="text-sm leading-6 text-gray-800">Unassigned</p>
            )}
          </div>
        </div>
        <div className="col-span-4">
          <p className="text-base font-semibold mb-1">Created at</p>
          <p className="text-sm leading-6 text-gray-800 font-normal">
            {ticket?.created_at
              ? getFormattedDate(ticket.created_at, 'en', {})
              : ''}
          </p>
        </div>
        <div className="col-span-12">
          <p className="text-base font-semibold mb-1">Description</p>
          <p className="text-sm leading-6 text-gray-800 font-normal">
            {ticket?.description}
          </p>
          <div className="mt-2 flex justify-end">
            <Button href={ticket?.link ?? ''} target="_blank" variant="text">
              Open in Jira
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="mt-10 px-6">
      <h2 className="text-md font-semibold leading-6 text-gray-900 mb-4">
        Recommended actions
      </h2>
      <Card className="mb-20">
        <ul className="relative" role="list">
          {ticket?.actions.map((event, index) => (
            <InterventionItem key={index} component="li" event={event} />
          ))}
        </ul>
      </Card>
    </section>
  </SideModal>
)
