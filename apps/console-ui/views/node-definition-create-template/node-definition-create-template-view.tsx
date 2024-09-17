'use client'
import { useRouter } from 'next/navigation'

import {
  useCreateTemplateDefinition,
  useGetTenantList,
} from '@waypoint/api-console'
import { useToast } from '@waypoint/components'

import { MainBody } from 'console-ui/components'
import type { NodesDefinition } from 'console-ui/types'
import { parseJSON } from 'console-ui/utils'

import type { NodeDefinitionCreateFormValues } from './node-definition-create-template-form'
import { NodeDefinitionCreateTemplateForm } from './node-definition-create-template-form'

export const NodesDefinitionCreateTemplateView = () => {
  const { push } = useRouter()
  const { addToast } = useToast()

  const { data: tenantsListResponse } = useGetTenantList()
  const tenantsListData = tenantsListResponse?.data

  const { mutate } = useCreateTemplateDefinition({
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

  if (!tenantsListData) {
    return null
  }

  const handleSubmit = (values: NodeDefinitionCreateFormValues) => {
    mutate({
      data: {
        name: values.name,
        group_name: values.group_name,
        type: Number(values.type) as NodesDefinition['type'],
        inputs: parseJSON(values.inputs),
        attributes: {
          type:
            Number(values.type) === 3
              ? 'prompt'
              : Number(values.type) === 5
                ? 'script'
                : undefined,
          ...values.attributes,
        },
      },
    })
  }

  return (
    <MainBody
      activeSection="nodes-definition"
      title="Nodes definition | Create"
    >
      <NodeDefinitionCreateTemplateForm onSubmit={handleSubmit} />
    </MainBody>
  )
}
