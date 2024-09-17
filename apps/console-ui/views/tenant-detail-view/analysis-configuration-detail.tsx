import type { NodeDefinitionSchema } from '@waypoint/api-console'
import { useGetDefinitionsByConfiguration } from '@waypoint/api-console'

import { NodeDefinitionTable } from '../../components'

type Props = {
  configurationId: string
  configurationName: string
}

export const AnalysisConfigurationDetail = ({
  configurationId,
  configurationName,
}: Props) => {
  const { data: response, isLoading } = useGetDefinitionsByConfiguration({
    id: configurationId,
  })

  if (isLoading) {
    return <div className="text-white p-4">Loading...</div>
  }

  const data = response?.data as NodeDefinitionSchema[]

  return (
    <div className="pb-8">
      <NodeDefinitionTable
        nodes={data}
        title={`${configurationName}'s nodes definitions`}
      />
    </div>
  )
}
