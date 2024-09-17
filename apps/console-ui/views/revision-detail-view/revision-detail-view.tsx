'use client'
import { PlayIcon, SparklesIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'

import { useGetRevisionById } from '@waypoint/api-console'

import { Button, CodemirrorField, MainBody } from 'console-ui/components'
import { Badge } from 'console-ui/components/badge'
import {
  MappedNodeDefinitionTypeColor,
  MappedRevisionStatus,
  MappedRevisionStatusColor,
  MappedTypes,
  formatJSON,
} from 'console-ui/utils'

export const RevisionDetailView = () => {
  const { revisionID, id } = useParams<{ id: string; revisionID: string }>()

  const { data: response } = useGetRevisionById({
    id: revisionID,
  })

  if (!response?.data) {
    return null
  }

  const data = response.data

  return (
    <MainBody
      headerEndAdornment={
        <div className="flex gap-2">
          <Button to={`/node/${id}/revision/${revisionID}/snapshot`}>
            {' '}
            <span className="flex items-center gap-1">
              View Snapshot
              <SparklesIcon className="h-4 w-4 text-white inline" />
            </span>
          </Button>
          <Button to={`/node/${id}/revision/${revisionID}/sandbox`}>
            <span className="flex items-center gap-1">
              Try in Sandbox <PlayIcon className="h-4 w-4 text-white inline" />
            </span>
          </Button>
        </div>
      }
      title={`Revision detail | ${revisionID}`}
    >
      <div className="mx-8 mt-4 flex gap-1">
        <Badge variant={MappedRevisionStatusColor[data.status] as never}>
          {MappedRevisionStatus[data.status].name}
        </Badge>
        <Badge variant={MappedNodeDefinitionTypeColor[data.resolver_type]}>
          {MappedTypes[data.resolver_type].name}
        </Badge>
      </div>
      <div className="mx-8 my-4 grid grid-cols-1 gap-4 flex-wrap">
        <div className="grid grid-cols-3">
          <div>
            <p className="text-sm mb-1 text-gray-100 font-semibold">
              Initiated at
            </p>
            <p className="text-sm text-white">
              {dayjs(data.initiated_at).format('DD/MM/YYYY HH:mm:ss')}
            </p>
          </div>
          <div>
            <p className="text-sm mb-1 text-gray-100 font-semibold">
              Finished at
            </p>
            <p className="text-sm text-white">
              {dayjs(data.finished_at).format('DD/MM/YYYY HH:mm:ss')}
            </p>
          </div>
          <div>
            <p className="text-sm mb-1 text-gray-100 font-semibold">Duration</p>
            <p className="text-lg text-white">
              <time className="text-sm" dateTime={data.finished_at ?? ''}>
                {dayjs(data.finished_at)
                  .diff(dayjs(data.initiated_at))
                  .toString()}{' '}
                ms
              </time>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-8 my-4 grid grid-cols-1 gap-4 flex-wrap">
        {data.attributes?.type === 'prompt' && (
          <>
            <div>
              <p className="text-sm mb-2 text-gray-100 font-semibold">
                System prompt
              </p>
              <CodemirrorField
                readonly
                extension="JSON"
                value={formatJSON(data.attributes.system_prompt)}
              />
            </div>
            <div>
              <p className="text-sm mb-2 text-gray-100 font-semibold">
                User prompt
              </p>
              <CodemirrorField
                readonly
                extension="JSON"
                value={formatJSON(data.attributes.user_prompt)}
              />
            </div>
          </>
        )}
        {data.attributes?.type === 'script' && (
          <div>
            <p className="text-sm mb-2 text-gray-100 font-semibold">Function</p>
            <CodemirrorField
              readonly
              extension="python"
              value={formatJSON(data.attributes.function)}
            />
          </div>
        )}
        <div>
          <p className="text-md mb-2 text-gray-100">Input data</p>
          <CodemirrorField
            readonly
            extension="JSON"
            value={formatJSON(data.input_data)}
          />
        </div>
        <div>
          <p className="text-md mb-2 text-gray-100">Output data</p>
          <CodemirrorField
            readonly
            extension="JSON"
            value={formatJSON(data.output_data)}
          />
        </div>
      </div>
    </MainBody>
  )
}
