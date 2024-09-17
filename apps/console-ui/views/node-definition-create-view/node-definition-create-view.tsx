'use client'
import { useParams, useRouter } from 'next/navigation'

import {
  useCreateDefinition,
  useGetAnalysisConfigurations,
} from '@waypoint/api-console'
import { useToast } from '@waypoint/components'

import { MainBody } from 'console-ui/components'
import type { NodesDefinition } from 'console-ui/types'
import { parseJSON } from 'console-ui/utils'

import {
  NodeDefinitionCreateForm,
  type NodeDefinitionCreateFormValues,
} from './node-definition-create-form'

export const NodesDefinitionCreateView = () => {
  const { push } = useRouter()
  const { addToast } = useToast()
  const { tenantId } = useParams<{ tenantId: string }>()

  const { data: analysisConfigurationResponse } = useGetAnalysisConfigurations({
    id: tenantId,
  })
  const configurationListData = analysisConfigurationResponse?.data

  const { mutate } = useCreateDefinition({
    mutation: {
      onSuccess(data) {
        if (data.data.id) {
          addToast({
            title: 'Node definition created',
            message: 'New node definition has been created successfully.',
            type: 'success',
          })

          return push(`/nodes-definitions/${data.data.id}`)
        }

        addToast({
          title: 'Error',
          message: 'An error occurred while creating node definition',
          type: 'error',
        })
      },
      onError() {
        addToast({
          title: 'Error',
          message: 'An error occurred while creating node definition',
          type: 'error',
        })
      },
    },
  })

  const handleSubmit = (values: NodeDefinitionCreateFormValues) => {
    mutate({
      data: {
        analysis_configuration_id: values.analysisConfigurationId,
        name: values.name,
        group_name: values.group_name,
        type: Number(values.type) as NodesDefinition['type'],
        inputs: parseJSON(values.inputs),
        attributes: values.attributes,
      },
    })
  }

  return (
    <MainBody
      activeSection="nodes-definition"
      title={`Nodes definition | Create Tenant node - ${tenantId}`}
    >
      <NodeDefinitionCreateForm
        analysisConfigurationList={configurationListData ?? []}
        onSubmit={handleSubmit}
      />
    </MainBody>
  )
}
