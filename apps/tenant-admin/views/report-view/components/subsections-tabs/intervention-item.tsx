import { ReactElement, useState } from 'react'

import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

import type { Event, EventType } from '@waypoint/api-tenant-admin'
import {
  BugAntSlashIcon,
  Button,
  GlowingBorder,
  LinkedDocumentsSolidIcon,
  ListIncompleteSolidIcon,
  MergeDocumentsSolidIcon,
  UserSwitchSolidIcon,
  classNames,
} from '@waypoint/components'

import {
  EventSummaryContent,
  NotABugContent,
  RerouteContent,
} from './event-summary-content'
import { InterventionActionButton } from './intervention-action-button'

type Props = {
  event: Event
  highlighted?: boolean
  component?: 'div' | 'li'
}
export const InterventionItem = ({
  event,
  highlighted,
  component = 'div',
}: Props) => {
  const [opened, setOpened] = useState(highlighted ?? false)

  const eventContent: Record<
    EventType,
    {
      title: string | ReactElement
      icon: JSX.Element
      badgeName: string
      typeColor: 'red' | 'indigo'
      cta?: string
    }
  > = {
    reroute: {
      title: (
        <>
          Reassign issue:{' '}
          <span className="text-blue-600">
            {/* {event.reroute_data?.assignee_from} */}
            Backend
          </span>{' '}
          <ArrowRightIcon className="h-4 w-4 inline" />{' '}
          <span className="text-blue-600">
            {/* {event.reroute_data?.assignee_to} */}
            Frontend
          </span>
        </>
      ),
      icon: <UserSwitchSolidIcon className="h-full w-full flex-none" />,
      badgeName: 'Reassign',
      typeColor: 'red',
      cta: 'Reassign issue',
    },
    not_a_bug: {
      title: (
        <>
          Reclassify:{' '}
          <span className="text-blue-600">{event.report.public_id}</span> is not
          a bug
        </>
      ),
      icon: <BugAntSlashIcon className="h-full w-full flex-none" />,
      badgeName: 'Reclassify',
      typeColor: 'red',
      cta: 'Reclassify',
    },
    reoccurring_report: {
      title: (
        <>
          Link issue:{' '}
          <span className="text-blue-600">{event.report.public_id}</span> is a
          new occurrence of an existing issue
        </>
      ),
      icon: <DocumentDuplicateIcon className="h-full w-full flex-none" />,
      badgeName: 'Reoccurring',
      typeColor: 'indigo',
      cta: 'Link issue',
    },
    incomplete: {
      title: (
        <>
          Incomplete issue:{' '}
          <span className="text-blue-600">{event.report.public_id}</span> is
          missing critical information{' '}
        </>
      ),
      icon: <ListIncompleteSolidIcon className="h-full w-full flex-none" />,
      badgeName: 'Incomplete',
      typeColor: 'indigo',
    },
    link_related: {
      title: (
        <>
          Link issues:{' '}
          <span className="text-blue-600">{event.report.public_id}</span>{' '}
          relates to other issues
        </>
      ),
      icon: <LinkedDocumentsSolidIcon className="h-full w-full flex-none" />,
      badgeName: 'Related',
      typeColor: 'indigo',
      cta: 'Link issues',
    },
    merge: {
      title: (
        <>
          Merge: <span className="text-blue-600">{event.report.public_id}</span>{' '}
          duplicates another issue
        </>
      ),
      icon: <MergeDocumentsSolidIcon className="h-full w-full flex-none" />,
      badgeName: 'Merge',
      typeColor: 'red',
      cta: 'Merge',
    },
  }

  const getTitle = (event: Event) => eventContent[event.type].title
  const getInterventionIcon = (event: Event) => eventContent[event.type].icon
  const Component = component

  return (
    <Component
      className={classNames(
        'relative py-2.5 px-6 transition-all duration-200 ease-in-out',
        highlighted
          ? 'bg-indigo-50/70 border-b border-b-blue-100'
          : 'border-b border-gray-100',
        !highlighted ? 'hover:bg-gray-50' : ''
      )}
    >
      <div
        className="flex items-center justify-between gap-x-6 cursor-pointer"
        onClick={() => setOpened(!opened)}
      >
        <div className="flex min-w-0 gap-x-4">
          <div
            className={classNames(
              'rounded-full flex justify-center items-center flex-shrink-0',
              highlighted ? 'w-10 h-10 p-2' : 'w-10 h-10 p-2',
              eventContent[event.type].typeColor === 'red'
                ? 'text-red-500 '
                : 'text-indigo-500',
              highlighted
                ? 'bg-white'
                : eventContent[event.type].typeColor === 'red'
                  ? 'bg-red-50'
                  : 'bg-indigo-50'
            )}
          >
            {getInterventionIcon(event)}
          </div>
          <div className="min-w-0 flex-auto flex flex-col justify-center items-start">
            <p
              className={classNames(
                'font-semibold leading-6 text-gray-800',
                highlighted ? 'text-base' : 'text-sm'
              )}
            >
              {getTitle(event)}
            </p>
            <p
              className={classNames(
                'text-xs bg-indigo-100 rounded-[4px] px-1.5 text-indigo-600 font-semibold',
                eventContent[event.type].typeColor === 'red'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-indigo-100 text-indigo-700'
              )}
            >
              {eventContent[event.type].badgeName}
            </p>
            {/* {!opened && (
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <span className="relative truncate">
                  {event.summary.map((summaryItem) => {
                    if (summaryItem.type === 'html') {
                      return summaryItem.content
                    }

                    return null
                  })}
                </span>
              </p>
            )} */}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-500">
              <Link
                className="relative flex items-center hover:underline text-blue-600 font-semibold"
                href={`${event.report.link}`}
                target="_blank"
              >
                <Image
                  alt="Jira logo"
                  className="h-3.5 w-3.5 flex-none text-gray-500 mr-1"
                  height={14}
                  src="/images/jira.svg"
                  width={14}
                />
                <span>{event.report.public_id}</span>
              </Link>
            </p>
            <div className="flex gap-2">
              <div
                className={classNames(
                  'text-xs font-semibold py-0.5 px-1.5 inline rounded-md',
                  event.confidence && event.confidence >= 92
                    ? 'bg-green-100 text-green-600'
                    : '',
                  event.confidence &&
                    event.confidence >= 85 &&
                    event.confidence < 92
                    ? 'bg-yellow-100 text-yellow-600'
                    : '',
                  event.confidence && event.confidence < 85
                    ? 'bg-red-100 text-red-600'
                    : ''
                )}
              >
                <span className="font-semibold">{event.confidence}%</span>
              </div>
            </div>
          </div>
          {!opened ? (
            <ChevronUpIcon
              aria-hidden="true"
              className="h-5 w-5 flex-none text-gray-400"
            />
          ) : (
            <ChevronDownIcon
              aria-hidden="true"
              className="h-5 w-5 flex-none text-gray-400"
            />
          )}
        </div>
      </div>

      {/* Content */}
      {opened && (
        <div
          className={classNames(
            'w-full flex gap-4 text-sm py-4',
            highlighted ? ' pl-14' : 'pl-14'
          )}
        >
          <section className="flex flex-col gap-3 max-w-full w-full">
            <section>
              {/* Always display Reason as label */}
              <p className="text-gray-800 font-semibold">
                <span>Reason:</span>
              </p>

              {/* Content generated on BE displayed in FE components */}
              <div className="flex flex-col gap-5 w-full">
                {event.summary.map((summaryItem, index) => (
                  <EventSummaryContent
                    key={index}
                    eventSummaryItem={summaryItem}
                  />
                ))}

                {/* reroute content */}
                {event.type === 'reroute' && (
                  <RerouteContent data={event.reroute_data} />
                )}

                {/* not_a_bug content */}
                {event.type === 'not_a_bug' && <NotABugContent />}

                <div className="flex items-start">
                  {eventContent[event.type].cta && (
                    <InterventionActionButton
                      buttonText={eventContent[event.type].cta ?? ''}
                    />
                  )}
                </div>
              </div>
            </section>
          </section>
        </div>
      )}
    </Component>
  )
}
