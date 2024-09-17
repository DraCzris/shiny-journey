import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import type { CreateAnalysisConfiguration } from '@waypoint/api-console'

import { Button } from 'console-ui/components'

export type CreateAnalysisConfigurationFormValues = CreateAnalysisConfiguration

type Props = {
  isSubmitting?: boolean
  onSubmit: (values: CreateAnalysisConfigurationFormValues) => void
}

export const CreateNewAnalysisConfigurationForm = ({
  onSubmit,
  isSubmitting,
}: Props) => {
  const { id } = useParams<{ id: string }>()
  const { handleSubmit, register } =
    useForm<CreateAnalysisConfigurationFormValues>({
      defaultValues: {
        name: '',
        version: '1.0',
        description: '',
        tenant_id: id,
      },
    })

  return (
    <div className="space-y-12 mx-auto max-w-2xl pb-5 px-6 py-4">
      <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
            Tenant ID*
          </p>
          <input
            className="block w-full rounded-md border-0 bg-gray-600/5 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="1111"
            type="text"
            {...register('tenant_id', { required: true, disabled: true })}
          />
        </div>
        <div>
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
        <div>
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

        <div>
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
            to={`/tenant/${id}`}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}
