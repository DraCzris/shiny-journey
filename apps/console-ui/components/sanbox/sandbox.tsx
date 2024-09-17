'use client'

import { useEffect } from 'react'

import { PlayIcon } from '@heroicons/react/16/solid'
import { Controller, useForm } from 'react-hook-form'

import type {
  RevisionDetailSchemaAttributes,
  Type,
} from '@waypoint/api-console'
import { usePerformSandbox } from '@waypoint/api-console'
import { useToast } from '@waypoint/components'

import type { NodesType } from 'console-ui/types'
import { MappedTypes, formatJSON } from 'console-ui/utils'

import { Button } from '../button'
import { CodemirrorField } from '../codemirror-field'
import { Loader } from '../loader'

type Props = {
  defaultData: {
    resolverType?: NodesType
    inputData?: string
    attributes?: RevisionDetailSchemaAttributes
  }
}

type FormData = {
  resolverType: Type
  inputData: string
  attributes: RevisionDetailSchemaAttributes
}

export const Sandbox = ({ defaultData }: Props) => {
  const { addToast } = useToast()
  const { handleSubmit, control, register, watch, unregister, setValue } =
    useForm<FormData>({
      defaultValues: {
        resolverType: defaultData.resolverType ?? 1,
        inputData: defaultData.inputData ?? '',
        attributes: defaultData.attributes ?? {
          system_prompt: '',
          user_prompt: '',
          function: '',
        },
      },
    })

  const isPrompt = Number(watch('resolverType')) === 3
  const isScript = Number(watch('resolverType')) === 5

  useEffect(() => {
    if (isPrompt) {
      register('attributes.user_prompt', {
        value:
          defaultData.attributes?.type === 'prompt'
            ? defaultData.attributes.user_prompt
            : '',
      })
      setValue(
        'attributes.system_prompt',
        defaultData.attributes?.type === 'prompt'
          ? defaultData.attributes.system_prompt
          : ''
      )
      register('attributes.system_prompt')
      setValue(
        'attributes.user_prompt',
        defaultData.attributes?.type === 'prompt'
          ? defaultData.attributes.user_prompt
          : ''
      )
      unregister('attributes.function')
    }

    if (isScript) {
      register('attributes.function')
      setValue(
        'attributes.function',
        defaultData.attributes?.type === 'script'
          ? defaultData.attributes.function
          : ''
      )
      unregister('attributes.user_prompt')
      unregister('attributes.system_prompt')
    }
  }, [defaultData, isPrompt, isScript, register, setValue, unregister])

  const { mutate, data, isPending } = usePerformSandbox({
    mutation: {
      onSuccess(data) {
        if (!data.data.result) {
          addToast({
            message: 'An error occurred',
            title: 'An error occurred while trying to perform the operation',
            type: 'error',
          })
        }
      },
      onError() {
        addToast({
          message: 'An error occurred',
          title: 'An error occurred while trying to perform the operation',
          type: 'error',
        })
      },
    },
  })

  const onSubmit = (data: FormData) => {
    mutate({
      data: {
        resolver_type: data.resolverType,
        attributes: data.attributes,
        input_data: data.inputData,
      },
    })
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border-r border-gray-800 px-6 py-4">
        <form
          className="flex gap-4 flex-col max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section>
            <Button type="submit">
              <div className="flex gap-1 whitespace-nowrap items-center">
                <span>Try in Sandbox</span>
                <span>
                  {!isPending ? (
                    <PlayIcon className="h-4 w-4 text-white" />
                  ) : (
                    <Loader />
                  )}
                </span>
              </div>
            </Button>
          </section>
          <section>
            <p className="mt-1 inline-block max-w-4xl text-sm font-bold text-gray-300 mb-2">
              Resolver Type
            </p>
            <select
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 cursor-pointer"
              {...register('resolverType', {
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
          </section>

          {isPrompt && (
            <>
              <section>
                <label
                  className="mt-1 inline-block max-w-4xl text-sm font-bold text-gray-300 mb-2"
                  htmlFor="attributes.system_prompt"
                >
                  System prompt
                </label>
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
              </section>
              <section>
                <label
                  className="mt-3 inline-block max-w-4xl text-sm font-bold text-gray-300 mb-2"
                  htmlFor="attributes.user_prompt"
                >
                  User prompt
                </label>
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
              </section>
            </>
          )}
          {isScript && (
            <section>
              <label
                className="mt-1 inline-block max-w-4xl text-sm font-bold text-gray-300 mb-2"
                htmlFor="attributes.function"
              >
                Script
              </label>
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
            </section>
          )}

          <section>
            <label
              className="mt-1 inline-block max-w-4xl text-sm font-bold text-gray-300 mb-2"
              htmlFor="inputData"
            >
              Input Data
            </label>
            <Controller
              control={control}
              name="inputData"
              render={({ field }) => (
                <CodemirrorField
                  extension="JSON"
                  lineWrapping={false}
                  value={formatJSON(field.value)}
                  // eslint-disable-next-line react/jsx-handler-names
                  onChange={field.onChange}
                />
              )}
            />
          </section>
          <section>
            <Button type="submit">
              <div className="flex gap-1 whitespace-nowrap items-center">
                <span>Try in Sandbox</span>
                <span>
                  {!isPending ? (
                    <PlayIcon className="h-4 w-4 text-white" />
                  ) : (
                    <Loader />
                  )}
                </span>
              </div>
            </Button>
          </section>
        </form>
      </div>
      <section className="border-b border-gray-800 pb-5 px-6 py-4">
        <p className="mt-1 max-w-4xl text-sm font-bold text-gray-300 mb-2">
          Results
        </p>
        <CodemirrorField
          extension="JSON"
          value={formatJSON(data?.data.result)}
        />
      </section>
    </div>
  )
}
