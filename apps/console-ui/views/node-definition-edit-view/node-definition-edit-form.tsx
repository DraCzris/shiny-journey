import { useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form'

import type {
  AnalysisConfiguration,
  GetDefinitionById200,
  NodeDefinitionCreationSchema,
} from '@waypoint/api-console'
import { Button } from '@waypoint/components'

import { CodemirrorField } from 'console-ui/components'
import { MappedTypes, formatJSON } from 'console-ui/utils'

export type NodeDefinitionEditFormValues = NodeDefinitionCreationSchema

type Props = {
  defaultData: GetDefinitionById200
  tenantsAnalysisConfigurations: AnalysisConfiguration[]
  onSubmit: (values: NodeDefinitionEditFormValues) => void
  id: string
}

export const NodeDefinitionEditForm = ({
  onSubmit,
  defaultData,
  id,
  tenantsAnalysisConfigurations,
}: Props) => {
  const functionValue =
    defaultData.attributes?.type === 'script'
      ? defaultData.attributes.function
      : null

  const promptsValue =
    defaultData.attributes?.type === 'prompt' ? defaultData.attributes : null

  const { handleSubmit, register, control, watch, unregister, setValue } =
    useForm<NodeDefinitionEditFormValues>({
      defaultValues: {
        analysis_configuration_id:
          (defaultData.node_type === 'tenant_node'
            ? defaultData.analysis_configuration_id
            : undefined) ?? undefined,
        name: defaultData.name,
        type: defaultData.type,
        inputs: formatJSON(defaultData.inputs),
        group_name: defaultData.group_name,
        attributes: {
          type: defaultData.attributes?.type ?? undefined,
          user_prompt: promptsValue?.user_prompt ?? '',
          system_prompt: promptsValue?.system_prompt ?? '',
          function: functionValue ?? undefined,
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
                type="text"
                {...register('name', { required: true })}
              />
            </div>
            {defaultData.node_type === 'tenant_node' && (
              <div className="col-span-full">
                <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                  analysis_configuration_id
                </p>
                <select
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 cursor-pointer"
                  {...register('analysis_configuration_id', {
                    required: true,
                  })}
                >
                  {tenantsAnalysisConfigurations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} {item.version}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
                <option value={6}>{MappedTypes[6].name}</option>
              </select>
            </div>
            <div className="col-span-full">
              <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
                Group name
              </p>
              <input
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                type="text"
                {...register('group_name', { required: true })}
              />
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
              <Controller
                control={control}
                name="inputs"
                render={({ field }) => (
                  <CodemirrorField
                    extension="JSON"
                    value={field.value}
                    // eslint-disable-next-line react/jsx-handler-names
                    onChange={field.onChange}
                  />
                )}
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
                    <p className="max-w-4xl text-sm font-bold text-gray-300 mb-2">
                      user prompt
                    </p>
                    <Controller
                      control={control}
                      name="attributes.user_prompt"
                      render={({ field }) => (
                        <CodemirrorField
                          extension="JSON"
                          value={field.value}
                          // eslint-disable-next-line react/jsx-handler-names
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-full">
                    <p className="max-w-4xl text-sm font-bold text-gray-300 mb-2">
                      Systen prompt
                    </p>
                    <Controller
                      control={control}
                      name="attributes.system_prompt"
                      render={({ field }) => (
                        <CodemirrorField
                          extension="JSON"
                          value={field.value}
                          // eslint-disable-next-line react/jsx-handler-names
                          onChange={field.onChange}
                        />
                      )}
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
                      <CodemirrorField
                        extension="python"
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
          <Button
            href={`/nodes-definitions/${id}`}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}
