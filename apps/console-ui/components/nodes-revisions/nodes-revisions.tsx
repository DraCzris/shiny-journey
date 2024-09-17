'use client'
import Link from 'next/link'

import type { Type } from '@waypoint/api-console'
import { useGetRevisionsByNode } from '@waypoint/api-console'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'console-ui/components'
import { Badge } from 'console-ui/components/badge'
import {
  MappedNodeDefinitionTypeColor,
  MappedRevisionStatus,
  MappedRevisionStatusColor,
  MappedTypes,
} from 'console-ui/utils'

type Props = {
  nodeId?: string
}
export const NodesRevisions = ({ nodeId }: Props) => {
  const { data, isFetching } = useGetRevisionsByNode(
    {
      id: nodeId ?? '',
    },
    {
      query: {
        enabled: !!nodeId,
      },
    }
  )

  if (!data && !isFetching) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell first>Initiated at</TableHeadCell>
          <TableHeadCell>Duration</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell></TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.data.map((revision) => (
          <TableRow key={revision.id}>
            <TableCell first>
              <time
                className="text-sm text-gray-300"
                dateTime={revision.initiated_at}
              >
                {new Date(revision.initiated_at).toLocaleString()}
              </time>
            </TableCell>
            <TableCell>
              {revision.finished_at !== undefined ? (
                <time
                  className="text-sm text-gray-300"
                  dateTime={revision.finished_at ?? ''}
                >
                  {(
                    new Date(revision.finished_at ?? '').getTime() -
                    new Date(revision.initiated_at).getTime()
                  ).toString()}{' '}
                  ms
                </time>
              ) : (
                <span className="text-sm text-gray-300">-</span>
              )}
            </TableCell>
            <TableCell>
              <Badge variant={MappedRevisionStatusColor[revision.status]}>
                {MappedRevisionStatus[revision.status].name}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  MappedNodeDefinitionTypeColor[revision.resolver_type as Type]
                }
              >
                {MappedTypes[revision.resolver_type as Type].name}
              </Badge>
            </TableCell>
            <TableCell>
              <Link
                className="text-blue-400 hover:text-blue-300"
                href={`/node/${nodeId}/revision/${revision.id}`}
              >
                Detail
              </Link>
            </TableCell>
            <TableCell>
              <Link
                className="text-blue-400 hover:text-blue-300"
                href={`/node/${nodeId}/revision/${revision.id}/snapshot`}
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
