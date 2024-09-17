import { useEffect } from 'react'

import { python } from '@codemirror/lang-python'
import { okaidiaInit } from '@uiw/codemirror-theme-okaidia'
import CodeMirror from '@uiw/react-codemirror'
import { Controller, useForm } from 'react-hook-form'

import type { AnalysisConfiguration } from '@waypoint/api-console'

import { Button } from 'console-ui/components'
import { MappedTypes } from 'console-ui/utils'

export type NodeDefinitionCreateFormValues = {
  name: string
  type: number
  inputs: string
  analysisConfigurationId: string
  group_name: string
  attributes: {
    type: 'prompt' | 'script'
    user_prompt: string
    system_prompt: string
    function: string
  }
}

const extensions = [python()]

type Props = {
  analysisConfigurationList: AnalysisConfiguration[]
  onSubmit: (values: NodeDefinitionCreateFormValues) => void
}

export const NodeDefinitionCreateForm = ({
  onSubmit,
  analysisConfigurationList,
}: Props) => {
  const { handleSubmit, register, control, watch, unregister, setValue } =
    useForm<NodeDefinitionCreateFormValues>({
      defaultValues: {
        name: '',
        type: 1,
        inputs: '',
        analysisConfigurationId: analysisConfigurationList[0]?.id,
        group_name: '',
        attributes: {
          type: undefined,
          user_prompt: '',
          system_prompt: '',
          function: '',
        },
      },
    })

  const isPrompt = Number(watch('type')) === 3
  const isScript = Number(watch('type')) === 5

  useEffect(() => {
    if (isPrompt) {
      register('attributes.user_prompt')
      register('attributes.system_prompt')
      setValue('attributes.type', 'prompt')

      unregister('attributes.function')
    }

    if (isScript) {
      register('attributes.function')
      setValue('attributes.type', 'script')
      unregister('attributes.user_prompt')
      unregister('attributes.system_prompt')
    }
  }, [isPrompt, isScript, register, unregister, setValue])

  return (
    <div className="mt-12 pb-5 px-16 py-4">
      <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-800 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              Node Definition info
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="col-span-full">
              <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                Name
              </p>
              <input
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                placeholder="bug_summary"
                type="text"
                {...register('name', { required: true })}
              />
            </div>
            <div className="col-span-full">
              <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                Group name
              </p>
              <input
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                placeholder="Jira {{ external_id }}"
                type="text"
                {...register('group_name', { required: true })}
              />
            </div>
            <div className="col-span-full">
              <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                Type
              </p>
              <select
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 cursor-pointer"
                {...register('type', {
                  required: true,
                })}
              >
                <option value={1}>{MappedTypes[1].name}</option>
                <option value={2}>{MappedTypes[2].name}</option>
                <option value={3}>{MappedTypes[3].name}</option>
                <option value={4}>{MappedTypes[4].name}</option>
                <option value={5}>{MappedTypes[5].name}</option>
                <option value={5}>{MappedTypes[6].name}</option>
              </select>
            </div>
            <div className="col-span-full">
              <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                Analysis configuration
              </p>
              <select
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 cursor-pointer"
                {...register('analysisConfigurationId', {
                  required: true,
                })}
              >
                {analysisConfigurationList.map((configuration) => (
                  <option key={configuration.id} value={configuration.id}>
                    {configuration.name} {configuration.version}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-800 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              Inputs
            </h2>
          </div>
          <div className="grid max-w-4xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="col-span-full">
              <p className="max-w-4xl text-sm font-bold text-gray-300 mb-2">
                Inputs
              </p>
              <textarea
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                rows={10}
                {...register('inputs', {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>

        {(isPrompt || isScript) && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-800 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-100">
                Attributes
              </h2>
            </div>
            <div className="grid max-w-4xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              {isPrompt && (
                <>
                  <div className="col-span-full">
                    <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                      User prompt
                    </p>
                    <textarea
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      rows={10}
                      {...register('attributes.user_prompt')}
                    />
                  </div>
                  <div className="col-span-full">
                    <p className="max-w-4xl text-sm font-bold text-gray-300 mb-2">
                      System prompt
                    </p>
                    <textarea
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      rows={10}
                      {...register('attributes.system_prompt')}
                    />
                  </div>
                </>
              )}

              {isScript && (
                <div className="col-span-full">
                  <p className="max-w-4xl text-sm font-bold text-gray-300 mb-2">
                    Function
                  </p>
                  <Controller
                    control={control}
                    name="attributes.function"
                    render={({ field }) => (
                      <CodeMirror
                        className="block w-full rounded-md border-0 bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 overflow-hidden"
                        extensions={extensions}
                        minHeight="300px"
                        theme={okaidiaInit({
                          settings: {
                            background: 'rgb(255 255 255 / 0.05)',
                            gutterBackground: 'rgb(255 255 255 / 0)',
                          },
                        })}
                        value={field.value}
                        // eslint-disable-next-line react/jsx-handler-names
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button to="/nodes" type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  )
}
