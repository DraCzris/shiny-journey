'use client'

import { useParams, useRouter } from 'next/navigation'

import { useCreateAnalysisConfiguration } from '@waypoint/api-console'
import { useToast } from '@waypoint/components'

import { MainBody } from '../../components'

import type { CreateAnalysisConfigurationFormValues } from './create-new-analysis-configuration-form'
import { CreateNewAnalysisConfigurationForm } from './create-new-analysis-configuration-form'

export const CreateNewAnalysisConfigurationView = () => {
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()
  const { addToast } = useToast()

  const { mutate } = useCreateAnalysisConfiguration({
    mutation: {
      onSuccess(data) {
        if (data.data.id) {
          addToast({
            title: 'Analysis configuration created',
            message:
              'New analysis configuration has been created successfully.',
            type: 'success',
          })

          return push(`/tenant/${id}`)
        }

        addToast({
          title: 'Error',
          message: 'An error occurred while creating analysis configuration',
          type: 'error',
        })
      },
      onError() {
        addToast({
          title: 'Error',
          message: 'An error occurred while creating analysis configuration',
          type: 'error',
        })
      },
    },
  })

  const handleSubmit = (values: CreateAnalysisConfigurationFormValues) => {
    mutate({
      data: {
        ...values,
        tenant_id: id,
      },
    })
  }

  return (
    <MainBody title="Create New Analysis Configuration">
      <CreateNewAnalysisConfigurationForm onSubmit={handleSubmit} />
    </MainBody>
  )
}
