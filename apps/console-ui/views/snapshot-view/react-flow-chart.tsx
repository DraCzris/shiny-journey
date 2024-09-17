'use client'
import { memo, useCallback, useState } from 'react'

import type { Connection, Edge, Node } from 'reactflow'
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'

import 'reactflow/dist/style.css'
import { CustomNode } from './custom-node'

const nodeTypes = {
  customNode: CustomNode,
}

type Props = {
  nodes: Node[]
  edges: Edge[]
}

export const ReactFlowChart = memo(
  ({ nodes: initialNodes, edges: initialEdges }: Props) => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [highlightedNodes, setHighlightedNodes] = useState<Array<Node['id']>>(
      []
    )
    const [highlightedEdges, setHighlightedEdges] = useState<Array<Edge['id']>>(
      []
    )

    const onConnect = useCallback(
      (params: Connection) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
    )

    // Event handler for node hover
    const onNodeHover = (node: Node<unknown, string | undefined>) => {
      // Find child nodes based on edges
      const childNodes = initialEdges
        .filter((element) => element.source === node.id)
        .map((element) =>
          element.source === node.id ? element.target : element.source
        )

      const childEdges = initialEdges.filter(
        (element) => element.source === node.id
      )

      // Highlight child nodes
      setHighlightedNodes(childNodes)

      // Highlight child edges
      setHighlightedEdges(childEdges.map((edge) => edge.id))
    }

    // take highlighted nodes and change their style
    const updatedNodes = nodes.map((node) => {
      if (highlightedNodes.includes(node.id)) {
        return {
          ...node,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          data: {
            ...node.data,
            input: node,
            active: true,
          },
        }
      }

      return {
        ...node,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      }
    })

    // update edges based on highlighted nodes
    const updatedEdges = edges.map((edge) => {
      if (highlightedEdges.includes(edge.id)) {
        return {
          ...edge,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'rgb(6 182 212)',
          },
          style: {
            stroke: 'rgb(6 182 212)',
          },
        }
      }

      return {
        ...edge,
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#374151',
        },
        style: {
          stroke: '#374151',
        },
      }
    })

    const cleanUpHover = () => {
      setHighlightedNodes([])
      setHighlightedEdges([])
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          edges={updatedEdges}
          nodeTypes={nodeTypes}
          nodes={updatedNodes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={(e, node) => onNodeHover(node)}
          onNodeMouseLeave={cleanUpHover}
          onNodesChange={onNodesChange}
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
    )
  }
)

ReactFlowChart.displayName = 'ReactFlowChart'
