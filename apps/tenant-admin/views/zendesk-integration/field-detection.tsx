import { ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

import type { ZendeskField } from '@waypoint/api-tenant-admin'
import {
  getZendeskInfoQueryKey,
  useZendeskFieldDetection,
} from '@waypoint/api-tenant-admin'
import { Button, useToast } from '@waypoint/components'

import { classNames } from '../../utils'

type Props = {
  data?: ZendeskField
}

export const FieldDetection = ({ data }: Props) => {
  const { addToast } = useToast()
  const queryClient = useQueryClient()

  const { mutate: syncField, isPending } = useZendeskFieldDetection({
    mutation: {
      onSuccess: (data) => {
        if (!data.data.id) {
          return addToast({
            title: 'Oppps!',
            message:
              'Field probably not found in your Jira project. Please create it manually and try again.',
            type: 'error',
          })
        }

        queryClient.invalidateQueries({ queryKey: getZendeskInfoQueryKey() })

        addToast({
          title: 'Field found and configured',
          message:
            '"Zendesk Ticket IDs" field has been found in your Jira project and configured successfully',
          type: 'success',
        })
      },
      onError: () => {
        addToast({
          title: 'Error',
          message:
            'An error occurred while syncing the field. Please try again.',
          type: 'error',
        })
      },
    },
  })

  return (
    <div className="border-b border-gray-900/10 mb-4 py-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        1. Check for existing field
      </h2>
      <div>
        {data?.id ? (
          <div className="mt-4 text-sm text-gray-800 flex gap-3 justify-between p-3 rounded-md ring-1 ring-green-200 bg-green-50">
            <div className="flex gap-2">
              <div className="bg-green-100 rounded-full h-8 w-8 inline-flex justify-center items-center">
                <CheckCircleIcon className="h-6 w-6 inline-block text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  We are already watching following field in your Jira project:
                </p>
                <div className="text-sm text-gray-600">
                  <b>{data.name}</b>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={() => syncField()}>
                <ArrowPathIcon
                  className={classNames(
                    'h-4 w-4 inline-block stroke-2',
                    isPending ? 'animate-spin' : ''
                  )}
                />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Before adding your Zendesk credentials, check if following field
              for Zendesk integration already exists in your Jira project:
            </p>

            <div className="mt-4 text-sm text-gray-800 flex gap-3 items-center justify-between p-3 rounded-md ring-1 ring-orange-200 bg-orange-50">
              <div>
                <span className="text-sm text-gray-500 font-medium">
                  Field name:
                </span>
                <p className="text-sm text-gray-600 mb-1">
                  <b>{data?.name}</b>
                </p>
              </div>
              <div>
                <Button onClick={() => syncField()}>
                  <span className="mr-2">Sync</span>

                  <ArrowPathIcon
                    className={classNames(
                      'h-4 w-4 inline-block stroke-2',
                      isPending ? 'animate-spin' : ''
                    )}
                  />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
