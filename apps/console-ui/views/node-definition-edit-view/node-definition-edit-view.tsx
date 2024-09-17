'use client'
import { useParams } from 'next/navigation'

import {
  useGetAnalysisConfigurations,
  useGetDefinitionById,
  useUpdateNodeDefinition,
  useUpdateNodeTemplateDefinition,
} from '@waypoint/api-console'
import { useToast } from '@waypoint/components'

import { MainBody } from 'console-ui/components'

import type { NodeDefinitionEditFormValues } from './node-definition-edit-form'
import { NodeDefinitionEditForm } from './node-definition-edit-form'

export const NodesDefinitionEditView = () => {
  const { id } = useParams<{ id: string }>()
  const { addToast } = useToast()

  const { data: response } = useGetDefinitionById({
    id,
  })

  const { data: responseData } = useGetAnalysisConfigurations(
    {
      id:
        response?.data.node_type === 'tenant_node'
          ? response.data.tenant_id
          : '',
    },
    {
      query: {
        enabled: response?.data.node_type === 'tenant_node',
      },
    }
  )

  const { mutate: updateNodeDefinition } = useUpdateNodeDefinition({
    mutation: {
      onSuccess: (data) => {
        if (data.data.id) {
          return addToast({
            title: 'Node definition updated',
            message: 'Node definition has been updated successfully.',
            type: 'success',
          })
        }

        addToast({
          title: 'Error',
          message: 'An error occurred while updating node definition',
          type: 'error',
        })
      },
      onError: () => {
        addToast({
          title: 'Error',
          message: 'An error occurred while updating node definition',
          type: 'error',
        })
      },
    },
  })

  const { mutate: updateNodeTemplate } = useUpdateNodeTemplateDefinition({
    mutation: {
      onSuccess: (data) => {
        if (data.data.id) {
          return addToast({
            title: 'Node definition updated',
            message: 'Node definition has been updated successfully.',
            type: 'success',
          })
        }

        addToast({
          title: 'Error',
          message: 'An error occurred while updating node definition',
          type: 'error',
        })
      },
      onError: () => {
        addToast({
          title: 'Error',
          message: 'An error occurred while updating node definition',
          type: 'error',
        })
      },
    },
  })

  if (!response?.data) {
    return null
  }

  const handleSubmit = (values: NodeDefinitionEditFormValues) => {
    if (response.data.node_type === 'tenant_node') {
      return updateNodeDefinition({
        data: {
          ...values,
          inputs: JSON.parse(values.inputs as unknown as string),
        },
        pathParams: {
          id,
        },
      })
    }

    updateNodeTemplate({
      data: {
        ...values,
        inputs: JSON.parse(values.inputs as unknown as string),
      },
      pathParams: {
        id,
      },
    })
  }

  return (
    <MainBody
      activeSection="nodes-definition"
      title={`Nodes definition | ${response.data.name}`}
    >
      <NodeDefinitionEditForm
        defaultData={response.data}
        id={id}
        tenantsAnalysisConfigurations={responseData?.data ?? []}
        onSubmit={handleSubmit}
      />
    </MainBody>
  )
}
