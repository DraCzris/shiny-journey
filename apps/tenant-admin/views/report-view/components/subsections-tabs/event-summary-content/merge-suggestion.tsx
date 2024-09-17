import { CheckCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowLongDownIcon,
  ArrowLongRightIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline'
import {
  MergeSuggestion as MergeSuggestionContent,
  JiraOpen,
} from '@waypoint/api-tenant-admin'
import {
  classNames,
  GlowingBorder,
  SparklesSolidIcon,
} from '@waypoint/components'
import Link from 'next/link'
import { ReactElement } from 'react'

type Props = {
  item: MergeSuggestionContent
}

export const MergeSuggestion = ({ item }: Props) => {
  const TicketItem = ({
    type,
    ticketInfo,
    mergeTitle,
    endAdornment,
  }: {
    type?: 'target' | 'source' | 'result'
    mergeTitle?: string
    ticketInfo: JiraOpen
    endAdornment?: ReactElement
  }) => {
    return (
      <Link
        href={ticketInfo.link}
        target="_blank"
        className={classNames(
          'flex flex-wrap items-start min-w-0 gap-x-2 py-2 px-2 rounded-md pr-3 max-w-full w-full hover:bg-blue-50 transition-colors bg-white',
          type === 'result' ? '' : ' ring-1 ring-gray-200'
        )}
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-2 w-full">
            <div className="w-3 h-3 mt-1 bg-red-500 rounded-sm flex justify-center items-center flex-shrink-0">
              <span className="bg-white rounded-full h-1.5 w-1.5" />
            </div>
            <p className="font-semibold text-blue-600 flex-shrink-0">
              {ticketInfo.public_id}
            </p>
          </div>

          {endAdornment && <div>{endAdornment}</div>}
        </div>

        <div className="min-w-0 flex-auto flex justify-center flex-grow-0 flex-shrink-1 flex-col ml-5">
          <p
            className={classNames(
              'flex text-sm leading-5 text-gray-700 font-semibold',
              type === 'result' ? 'line-through' : ''
            )}
          >
            <span className="relative truncate">{ticketInfo.title}</span>
          </p>
          {type === 'result' && (
            <p className="flex text-sm leading-5 text-gray-700 font-semibold">
              <span className="relative truncate">{mergeTitle}</span>
            </p>
          )}
        </div>
      </Link>
    )
  }

  return (
    <div>
      <p className="text-gray-800 font-semibold mb-2">
        Suggested action: Merge issues
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex flex-row max-w-full w-full gap-3  items-center flex-wrap xl:flex-nowrap">
          <div className="min-w-0 flex gap-1 flex-col max-w-full w-full items-center border border-gray-200 p-3 rounded-lg bg-gray-50/20">
            <TicketItem
              type="target"
              ticketInfo={item.merge_target}
              endAdornment={
                <CheckCircleIcon className="size-5 stroke-2 text-blue-600" />
              }
            />
            <ArrowsUpDownIcon className="size-4 z-10 bg-white rounded-full text-blue-600 stroke-2 text-center" />
            <TicketItem type="source" ticketInfo={item.merge_source} />
          </div>
          <div className="xl:mb-0 flex justify-center items-center w-full xl:w-5">
            <ArrowLongRightIcon className="size-5 text-blue-600 stroke-2 hidden xl:block" />
            <ArrowLongDownIcon className="size-5 text-blue-600 stroke-2 xl:hidden" />
          </div>
          <GlowingBorder className="rounded-lg h-full" variant="rainbow">
            <TicketItem
              type="result"
              ticketInfo={item.merge_target}
              mergeTitle={item.merged_title}
              endAdornment={
                <SparklesSolidIcon className="size-3 animate-sparkleColor" />
              }
            />
          </GlowingBorder>
        </div>
      </div>
    </div>
  )
}
