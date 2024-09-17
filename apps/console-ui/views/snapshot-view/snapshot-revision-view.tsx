/* eslint-disable no-param-reassign */
'use client'

import { useState } from 'react'

import { EyeIcon, PlayIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Position } from 'reactflow'

import type { NodeSchema, Type } from '@waypoint/api-console'
import { useGetSnapshotByRevision } from '@waypoint/api-console'
import { SideModal, formatJSON } from '@waypoint/components'

import { Badge, CodemirrorField, MainBody } from 'console-ui/components'

import { MappedNodeDefinitionTypeColor, MappedTypes } from '../../utils'

import { CustomNodeContent } from './custom-node-content'
import { ListOfNodeRevisions } from './list-of-nodes-revisions'
import { ReactFlowChart } from './react-flow-chart'

const levelPositionThreshold = 200
const InLevelPositionTrashhold = 100

type ExtendedNodeSchema = NodeSchema & {
  order: number
}

const typeInLevel: Record<Type, number> = {
  4: 0, // Jira issue ID
  1: 1, // Jira
  2: 1, // Zendesk
  3: 3, // Prompts
  5: 2, // scripts
  6: 4, // Snapshot
}

const orderByGroupName = {
  Jira: 1,
  Zendesk: 1,
  Prefield: 2,
  Field: 3,
}

export const SnapshotRevisionView = () => {
  const { revisionID } = useParams<{ revisionID: string; id: string }>()
  const { data: response } = useGetSnapshotByRevision({
    id: revisionID,
  })

  const [nodeDetail, setNodeDetail] = useState<NodeSchema | null>(null)

  if (!response?.data) {
    return <div>Loading...</div>
  }

  const data = response.data
  const edges = data.edges
  const nodes = data.nodes

  // get all groups of nodes
  const groups: Array<{
    id: string
    order: number
    width: number
    height: number
    nodesStages: Record<number, ExtendedNodeSchema[]>
  }> = []

  const prepareNode = ({
    node,
    x,
    y,
    elementType,
  }: {
    node: NodeSchema
    x: number
    y: number
    elementType: string
  }) => ({
    id: node.id,
    parentId: node.group_name,
    data: {
      label: node.name,
      type: node.type,
      elementType,
      content: (
        <CustomNodeContent
          type={node.type}
          onDetailClick={() => setNodeDetail(node)}
        />
      ),
    },
    position: {
      x, // horizontal
      y, // vertical
    },
    type: 'customNode',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  })

  nodes.map((node, index, allNodes) => {
    const currentGroup = groups.find((group) => group.id === node.group_name)

    if (!currentGroup) {
      const order = Object.entries(orderByGroupName).find(([key]) =>
        node.group_name.includes(key)
      )

      const allGroupNodes = allNodes.filter(
        (n) => n.group_name === node.group_name
      )

      // get how many different types of nodes are in the group
      const types = allGroupNodes.map((n) => n.type)
      const uniqueTypes = new Set(types)

      // calculate the width and height of the group
      const width = uniqueTypes.size * levelPositionThreshold

      // calculated height as count of the most common type of node and multiplied by 100
      const height = Math.max(
        ...Object.values(
          types.reduce(
            (acc, type) => {
              acc[type] = (acc[type] || 0) + 1

              return acc
            },
            {} as Record<Type, number>
          )
        )
      )

      const nodesStages = allGroupNodes.reduce(
        (acc, node) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!acc[typeInLevel[node.type]]) {
            acc[typeInLevel[node.type]] = []
          }
          acc[typeInLevel[node.type]].push({
            ...node,
            order: typeInLevel[node.type],
          })

          return acc
        },
        {} as Record<number, ExtendedNodeSchema[]>
      )

      groups.push({
        id: node.group_name,
        order: order?.[1] ?? 1,
        width,
        height: height * 100 + 10,
        nodesStages,
      })
    }

    return null
  })
  const orderLevelWidth: Record<number, number> = {}

  const preparedGroupNodes = groups
    .sort((a, b) => a.order - b.order)
    .map((group, index, allGroups) => {
      const currentStepGroups = allGroups.filter((g) => g.order === group.order)
      const indexOfCurrentGroupInStep = currentStepGroups.findIndex(
        (g) => g.id === group.id
      )

      const groupPositionStart = 50

      // sum up height of all previous groups in the same step
      const previousGroupSteps = currentStepGroups.slice(
        0,
        indexOfCurrentGroupInStep
      )

      const sumOfPreviousGroupsHeight = previousGroupSteps.reduce(
        (acc, g) => acc + g.height,
        0
      )

      const orderLevel = Object.entries(orderLevelWidth).filter(
        ([key]) => key !== group.order.toString()
      )

      const sumOfAllPreviousGroupsWidth = orderLevel.reduce(
        (acc, [, value]) => acc + value,
        0
      )

      const positionX =
        groupPositionStart +
        (group.order - 1) * 200 +
        sumOfAllPreviousGroupsWidth
      const positionY =
        groupPositionStart +
        sumOfPreviousGroupsHeight +
        indexOfCurrentGroupInStep * groupPositionStart

      if (
        !orderLevelWidth[group.order] ||
        orderLevelWidth[group.order] < group.width
      ) {
        orderLevelWidth[group.order] = group.width
      }

      return {
        id: group.id,
        data: {
          label: group.id,
          index: indexOfCurrentGroupInStep,
          preveight: sumOfPreviousGroupsHeight,
        },
        style: {
          // backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderRadius: 10,
          border: '2px dashed rgb(37, 44, 55)',
          background: 'transparent',
          width: group.width,
          height: group.height,
        },
        position: {
          x: positionX,
          y: positionY,
        },
        type: 'group',
      }
    })

  const preparedNodes = Object.values(groups).flatMap((group) => {
    const nodesStages = group.nodesStages

    return Object.entries(nodesStages).flatMap(([, nodes], index) => {
      const indexInLevel = index

      return nodes.map((node, index) =>
        prepareNode({
          node,
          x: Number(indexInLevel) * levelPositionThreshold + 20, // this works
          y: index * InLevelPositionTrashhold + 10,
          elementType: 'default',
        })
      )
    })
  })

  const preparedEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }))

  return (
    <MainBody title={`Snapshot - Revision ${revisionID}`}>
      <div className="w-100 h-[calc(100vh-5rem)] relative">
        <SideModal
          open={!!nodeDetail}
          panelTitle={
            <>
              {nodeDetail?.name}
              <div className="mt-1">
                <Badge
                  variant={MappedNodeDefinitionTypeColor[nodeDetail?.type ?? 3]}
                >
                  {MappedTypes[nodeDetail?.type ?? 3].name}
                </Badge>
              </div>
            </>
          }
          onClose={() => {
            setNodeDetail(null)
          }}
        >
          <div>
            <div className="flex flex-wrap gap-1 py-2 -ml-2">
              <Link
                className="flex w-full gap-4 text-gray-100 p-2 items-center hover:bg-gray-900 rounded-md "
                href={`/node/${nodeDetail?.id}/revision/${nodeDetail?.revision.id}`}
              >
                <div className="bg-blue-500/20 rounded-full h-8 w-8 flex items-center justify-center">
                  <EyeIcon className="w-5 h-5 text-blue-500" />
                </div>

                <p className="text-sm font-semibold">Show more details</p>
              </Link>
              <Link
                className="flex w-full gap-4 text-gray-100 p-2 items-center hover:bg-gray-900 rounded-md"
                href={`/node/${nodeDetail?.id}/revision/${nodeDetail?.revision.id}/sandbox`}
              >
                <div className="bg-blue-500/20 rounded-full h-8 w-8 flex items-center justify-center">
                  <PlayIcon className="w-5 h-5 text-blue-500" />
                </div>

                <p className="text-sm font-semibold">Try in SandBox</p>
              </Link>
            </div>
            <hr className="my-2 border-gray-700" />

            <p className="text-sm font-semibold text-white mb-2">Input data</p>
            <pre>
              <CodemirrorField
                readonly
                extension="JSON"
                lineWrapping={false}
                value={formatJSON(nodeDetail?.revision.input_data)}
              />
            </pre>
            <p className="text-sm font-semibold text-white mt-4 mb-2">
              Output data
            </p>
            <CodemirrorField
              readonly
              extension="JSON"
              lineWrapping={false}
              value={formatJSON(nodeDetail?.revision.output_data)}
            />
          </div>
        </SideModal>

        <ListOfNodeRevisions />
        <ReactFlowChart
          edges={preparedEdges}
          nodes={[...preparedGroupNodes, ...preparedNodes]}
        />
      </div>
    </MainBody>
  )
}
