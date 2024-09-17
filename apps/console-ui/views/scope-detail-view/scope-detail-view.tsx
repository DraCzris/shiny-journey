'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useGetNodesByScopeId, useGetScopeById } from '@waypoint/api-console'

import {
  MainBody,
  NodesRevisions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'console-ui/components'
import { Badge } from 'console-ui/components/badge'

export const ScopeDetailView = () => {
  const { id } = useParams<{ id: string }>()

  const { data: response } = useGetScopeById({
    id,
  })

  const { data: scopeNodesResponse } = useGetNodesByScopeId({
    id,
  })

  const data = response?.data
  const scopeNodesData = scopeNodesResponse?.data

  const snapshotField = scopeNodesData?.find((node) => node.name === 'Snapshot')

  return (
    <MainBody title={`Scope detail | ${id}`}>
      <div>
        <h2 className="text-md font-semibold text-gray-100 m-8 mb-0">
          Scope history
        </h2>
        <NodesRevisions nodeId={snapshotField?.id} />

        <h2 className="text-md font-semibold text-gray-100 m-8 mb-0">
          List of nodes for {data?.title}
        </h2>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell first>Name</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {scopeNodesData?.map((node) => (
            <TableRow key={node.id}>
              <TableCell first>{node.name}</TableCell>
              <TableCell>
                <Badge>{node.type}</Badge>
              </TableCell>
              <TableCell>{node.id}</TableCell>
              <TableCell>
                <Link
                  className="font-medium text-blue-600 hover:text-blue-900"
                  href={`/node/${node.id}`}
                >
                  Node detail
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainBody>
  )
}
