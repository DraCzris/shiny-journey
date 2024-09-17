'use client'

import { useParams, useRouter } from 'next/navigation'

import {
  useGetAnalysisConfiguration,
  useUpdateAnalysisConfiguration,
} from '@waypoint/api-console'
import { useToast } from '@waypoint/components'

import { MainBody } from '../../components'

import type { CreateAnalysisConfigurationFormValues } from './update-analysis-configuration-form'
import { UpdateAnalysisConfigurationForm } from './update-analysis-configuration-form'

export const AnalysisConfigurationEditView = () => {
  const { id } = useParams<{ id: string }>()
  const { push } = useRouter()
  const { addToast } = useToast()

  const { data, isLoading } = useGetAnalysisConfiguration({
    id,
  })

  const { mutate } = useUpdateAnalysisConfiguration({
    mutation: {
      onSuccess(data) {
        if (data.data.id) {
          addToast({
            title: 'Analysis configuration updated',
            message:
              'New analysis configuration has been updated successfully.',
            type: 'success',
          })

          return push(`/analysis-configuration/${id}`)
        }

        addToast({
          title: 'An error occurred',
          message: 'An error occurred while updating analysis configuration',
          type: 'error',
        })
      },
      onError() {
        addToast({
          title: 'An error occurred',
          message: 'An error occurred while updating analysis configuration',
          type: 'error',
        })
      },
    },
  })

  const handleSubmit = (values: CreateAnalysisConfigurationFormValues) => {
    mutate({
      data: {
        ...values,
      },
      pathParams: {
        id,
      },
    })
  }

  if (isLoading) {
    return <MainBody title="Update Analysis Configuration" />
  }

  return (
    <MainBody title="Update Analysis Configuration">
      <UpdateAnalysisConfigurationForm
        defaultValues={data?.data}
        onSubmit={handleSubmit}
      />
    </MainBody>
  )
}
