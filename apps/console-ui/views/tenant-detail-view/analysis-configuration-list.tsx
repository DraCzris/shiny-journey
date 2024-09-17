'use client'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import {
  getGetAnalysisConfigurationsQueryKey,
  useActivateAnalysisConfiguration,
  useGetAnalysisConfigurations,
} from '@waypoint/api-console'
import { Button, getFormattedDate, useToast } from '@waypoint/components'

import { Accordion } from '../../components'

import { AnalysisConfigurationDetail } from './analysis-configuration-detail'

export const AnalysisConfigurationList = () => {
  const { id } = useParams<{ id: string }>()

  const { addToast } = useToast()

  const { data } = useGetAnalysisConfigurations({
    id,
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useActivateAnalysisConfiguration({
    mutation: {
      onSuccess: (data) => {
        addToast({
          title: 'Configuration activated',
          message: 'Configuration activated',
          type: 'success',
        })

        queryClient.setQueryData(getGetAnalysisConfigurationsQueryKey({ id }), {
          data: data.data,
        })
      },
      onError: () => {
        addToast({
          title: 'An error occurred',
          message: 'An error occurred while activating configuration',
          type: 'error',
        })
      },
    },
  })

  const analysisConfigurations = data?.data

  const activateConfiguration = (id: string) => {
    mutate({
      pathParams: {
        id,
      },
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center m-8 mb-4">
        <h2 className="text-base font-semibold leading-6 text-gray-100">
          Analysis configurations
        </h2>
        <div className="flex gap-4">
          <Button
            href={`/nodes-definitions/create-tenant-node/${id}`}
            variant="secondary"
          >
            Create tenant node definition
          </Button>
          <Button href={`/tenant/${id}/create-analysis-configuration`}>
            Create new analysis configuration
          </Button>
        </div>
      </div>
      <div className="sm:flex-auto m-8 mb-4 mt-0 rounded-sm overflow-hidden shadow ring-1 ring-gray-800 sm:rounded-lg">
        {analysisConfigurations?.map(
          ({ name, description, version, id, activated_at, created_at }) => (
            <Accordion
              key={id}
              label={
                <div className="flex justify-between gap-2 w-full">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {name}
                      <span className="text-gray-400 ml-2">{version}</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{description}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {activated_at && (
                      <CheckCircleIcon className="h-6 w-6 text-green-300" />
                    )}
                  </div>
                </div>
              }
            >
              <div className="text-white px-8 pt-4 flex gap-2 flex-col">
                <div>
                  <p className="font-semibold">ID</p>
                  <p className="text-sm text-gray-400">{id}</p>
                </div>
                <div className="grid gap-8 grid-cols-2">
                  <div>
                    <p className="font-semibold">Name</p>
                    <p className="text-sm text-gray-400">{name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Version</p>
                    <p className="text-sm text-gray-400">{version}</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold">Description</p>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
                <div className="grid gap-8 grid-cols-2">
                  <div>
                    <p className="font-semibold">Created at</p>
                    <p className="text-sm text-gray-400">
                      {getFormattedDate(created_at, 'en', {})}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Activated at</p>
                    <p className="text-sm text-gray-400">
                      {getFormattedDate(activated_at ?? '', 'en', {})}
                    </p>
                  </div>
                </div>
              </div>
              <AnalysisConfigurationDetail
                configurationId={id}
                configurationName={name}
              />
              <div className="p-8 pt-0 flex gap-2 justify-end">
                <Button
                  href={`/analysis-configuration/${id}/edit`}
                  variant="secondary"
                >
                  Edit configuration
                </Button>
                <Button
                  disabled={!!activated_at || isPending}
                  onClick={() => activateConfiguration(id)}
                >
                  {activated_at ? 'Activated' : 'Activate configuration'}
                </Button>
              </div>
            </Accordion>
          )
        )}
      </div>
    </div>
  )
}
