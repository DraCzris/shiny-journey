import type { Type } from '@waypoint/api-console'
import { Button } from '@waypoint/components'

import { Badge } from '../../components'
import { MappedNodeDefinitionTypeColor, MappedTypes } from '../../utils'

type Props = {
  type: Type
  onDetailClick?: () => void
}
export const CustomNodeContent = ({ type, onDetailClick }: Props) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <Badge variant={MappedNodeDefinitionTypeColor[type as unknown as Type]}>
        {MappedTypes[type].name}
      </Badge>
      {onDetailClick && (
        <Button size="sm" variant="text" onClick={onDetailClick}>
          Detail
        </Button>
      )}
    </div>
  </div>
)
