import Link from 'next/link'
import { useParams } from 'next/navigation'

import type { Type } from '@waypoint/api-console'
import { useGetRevisionsByNode } from '@waypoint/api-console'

import { Badge } from '../../components'
import {
  MappedNodeDefinitionTypeColor,
  MappedRevisionStatus,
  MappedRevisionStatusColor,
  MappedTypes,
  classNames,
} from '../../utils'

export const ListOfNodeRevisions = () => {
  const { id, revisionID } = useParams<{ id: string; revisionID: string }>()

  const { data } = useGetRevisionsByNode({
    id,
  })

  return (
    <div className="absolute right-5 top-5 -p-3 rounded-md  bg-gray-800 text-white z-10 grid gap-2">
      {data?.data.map((revision) => (
        <Link
          key={revision.id}
          replace
          className="hover:bg-gray-700 flex gap-3 py-2 px-4 items-center"
          href={`/node/${id}/revision/${revision.id}/snapshot`}
        >
          <div>
            <span
              className={classNames(
                revision.id === revisionID
                  ? 'w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-800 inline-block'
                  : 'w-2 h-2 rounded-full bg-gray-400 ring-2 ring-gray-600 inline-block'
              )}
            />
          </div>
          <div className="text-sm text-gray-200">
            {new Date(revision.initiated_at).toLocaleString()}
          </div>
          <div>
            <Badge variant={MappedRevisionStatusColor[revision.status]}>
              {MappedRevisionStatus[revision.status].name}
            </Badge>
          </div>
          <div>
            <Badge
              variant={
                MappedNodeDefinitionTypeColor[revision.resolver_type as Type]
              }
            >
              {MappedTypes[revision.resolver_type as Type].name}
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  )
}
