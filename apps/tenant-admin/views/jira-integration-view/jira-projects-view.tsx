import { useQueryClient } from '@tanstack/react-query'
import Head from 'next/head'
import Image from 'next/image'

import {
  getJiraInfoQueryKey,
  useJiraInfo,
  useUpdateJiraProject,
} from '@waypoint/api-tenant-admin'
import { Button, useToast } from '@waypoint/components'

import { AppContainer } from '../../components'

export const JiraProjectsView = () => {
  const { addToast } = useToast()
  const queryClient = useQueryClient()

  const { data } = useJiraInfo()

  const { mutate, isPending } = useUpdateJiraProject({
    mutation: {
      onSuccess: (data) => {
        if (!data.data.id) {
          return addToast({
            title: 'Oppps!',
            message: 'Something went wrong! Try again later!',
            type: 'error',
          })
        }

        queryClient.invalidateQueries({ queryKey: getJiraInfoQueryKey() })

        addToast({
          title: 'Jira integration project has successfully changed',
          message: 'Changes saved',
          type: 'success',
        })
      },
      onError: () => {
        addToast({
          title: 'Error',
          message: 'An error occurred while updating Jira project',
          type: 'error',
        })
      },
    },
  })

  return (
    <AppContainer>
      <Head>
        <title>Jira integration</title>
      </Head>
      <section className="sm:max-w-xl m-auto">
        <div className="h-12 w-12 m-auto mb-4 flex justify-center items-center rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
          <Image
            alt="Zendesk logo"
            className="w-9 h-9"
            height={100}
            src="/images/jira.svg"
            width={100}
          />
        </div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Jira configuration
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          We have enabled Waypoint analyses in following Jira projects:
        </p>
        <div className="mt-4 grid gap-3">
          {data?.data.projects.map((project) => (
            <div
              key={project.external_id}
              className="flex justify-between items-center p-2 px-3 pl-4 border bg-white rounded-lg ring-gray-900/10"
            >
              <div>
                <h3 className="font-bold">{project.name}</h3>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div
                    className={`flex-none rounded-full ${
                      project.enabled ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                    }  p-1`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        project.enabled ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>
                  <p
                    className={`text-xs leading-5 ${
                      project.enabled ? 'text-emerald-500' : 'text-rose-500'
                    } `}
                  >
                    {project.enabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <Button
                disabled={isPending}
                variant={project.enabled ? 'error' : 'secondary'}
                onClick={() => {
                  mutate({
                    data: {
                      id: project.external_id,
                      enabled: !project.enabled,
                    },
                  })
                }}
              >
                {project.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </AppContainer>
  )
}
