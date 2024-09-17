import type { ReactElement } from 'react'

import Link from 'next/link'

import type { NodeDefinitionSchema } from '@waypoint/api-console'

import { MappedNodeDefinitionTypeColor, MappedTypes } from 'console-ui/utils'

import { Badge } from '../badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../table'

type Props = {
  nodes: NodeDefinitionSchema[]
  title: string | ReactElement
}
export const NodeDefinitionTable = ({ nodes, title }: Props) => (
  <section>
    <div className="sm:flex-auto m-8 mb-4">
      <h1 className="text-base font-semibold leading-6 text-gray-100">
        {title}
      </h1>
    </div>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell first>Name</TableHeadCell>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell>Group</TableHeadCell>
          <TableHeadCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {nodes.map((node) => (
          <TableRow key={node.id}>
            <TableCell first>{node.name}</TableCell>
            <TableCell>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Badge variant={MappedNodeDefinitionTypeColor[node.type] as any}>
                {MappedTypes[node.type].name}
              </Badge>
            </TableCell>
            <TableCell>{node.group_name}</TableCell>
            <TableCell>
              <Link
                className="flex gap-x-2 text-blue-400 hover:text-blue-500"
                href={`/nodes-definitions/${node.id}`}
              >
                Node detail
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </section>
)
