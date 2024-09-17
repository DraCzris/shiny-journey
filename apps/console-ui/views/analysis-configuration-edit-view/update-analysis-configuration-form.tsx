import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import type {
  AnalysisConfiguration,
  UpdateAnalysisConfiguration,
} from '@waypoint/api-console'
import { Button } from '@waypoint/components'
//
export type CreateAnalysisConfigurationFormValues = UpdateAnalysisConfiguration

type Props = {
  isSubmitting?: boolean
  onSubmit: (values: CreateAnalysisConfigurationFormValues) => void
  defaultValues?: AnalysisConfiguration
}

export const UpdateAnalysisConfigurationForm = ({
  onSubmit,
  isSubmitting,
  defaultValues,
}: Props) => {
  const { id } = useParams<{ id: string }>()
  const { handleSubmit, register } =
    useForm<CreateAnalysisConfigurationFormValues>({
      defaultValues: {
        name: defaultValues?.name ?? '',
        version: defaultValues?.version ?? '1.0',
        description: defaultValues?.description ?? '',
      },
    })

  return (
    <div className="space-y-12 mx-auto max-w-2xl pb-5 px-6 py-4">
      <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
            Name*
          </p>
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="New Software Analysis Configuration"
            type="text"
            {...register('name', { required: true })}
          />
        </div>
        <div className="">
          <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
            Version*
          </p>
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="Jira {{ external_id }}"
            type="text"
            {...register('version', { required: true })}
          />
        </div>

        <div className="">
          <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
            Description
          </p>
          <input
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="Testing new analysis configuration..."
            type="text"
            {...register('description')}
          />
        </div>
        <hr className="border-gray-800 h-px" />
        <div className="flex gap-3 justify-end">
          <Button
            disabled={isSubmitting}
            type="button"
            variant="secondary"
            onClick={() => {
              window.history.back()
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
