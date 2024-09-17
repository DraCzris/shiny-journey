import type { ReactElement } from 'react'
import { memo } from 'react'

import { Handle, Position } from 'reactflow'

import { classNames } from 'console-ui/utils'

type Props = {
  data: {
    label: string
    type: number
    active: boolean
    elementType?: 'input' | 'output' | 'default'
    content?: ReactElement
  }
  isConnectable: boolean
}

export const CustomNode = memo(({ data, isConnectable }: Props) => (
  <>
    {data.elementType !== 'input' && (
      <Handle
        isConnectable={isConnectable}
        position={Position.Left}
        style={{
          background: '#555',
        }}
        type="target"
      />
    )}
    <div
      className={classNames(
        'rounded-lg ring-2 min-w-40 overflow-hidden',
        data.active ? 'ring-cyan-500' : 'ring-gray-700'
      )}
    >
      <div className="bg-gray-800/60 p-2 border-b-2 border-gray-700 text-gray-200 text-sm">
        {data.label}
      </div>
      <div className="p-2 bg-gray-800">{data.content}</div>
    </div>
    {data.elementType !== 'output' && (
      <Handle
        id="b"
        isConnectable={isConnectable}
        position={Position.Right}
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        type="source"
      />
    )}
  </>
))

CustomNode.displayName = 'CustomNode'
