'use client'
import { useGetDefinitionsTemplates } from '@waypoint/api-console'
import { Button } from '@waypoint/components'

import { MainBody, NodeDefinitionTable } from 'console-ui/components'

export const NodesDefinitionTemplatesPageView = () => {
  const { data } = useGetDefinitionsTemplates()

  return (
    <>
      <MainBody
        activeSection="nodes-definition"
        headerEndAdornment={
          <Button href="/nodes-definitions/create-template">
            Create new template
          </Button>
        }
        title="Nodes definition templates"
      >
        <NodeDefinitionTable
          nodes={data?.data ?? []}
          title="Nodes definition templates"
        />
      </MainBody>
    </>
  )
}
