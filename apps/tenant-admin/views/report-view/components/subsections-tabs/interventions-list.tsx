import { Card } from '@waypoint/components'

import { EmptyState } from '../empty-state'
import { useFilters } from '../report-filter-provider'

import { InterventionItem } from './intervention-item'

export const InterventionsList = () => {
  const { filteredData, isLoadingData } = useFilters()
  // TODO provide loading state
  if (!isLoadingData && !filteredData?.length) {
    return <EmptyState />
  }

  return (
    <Card>
      <ul className="relative" role="list">
        {filteredData?.map((intervention, index) => (
          <InterventionItem
            key={index}
            component="li"
            event={intervention.event}
          />
        ))}
      </ul>
    </Card>
  )
}
