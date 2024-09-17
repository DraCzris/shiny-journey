'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useGetDefinitionById } from '@waypoint/api-console'

import { Badge, Button, CodemirrorField, MainBody } from 'console-ui/components'
import { MappedNodeDefinitionTypeColor, MappedTypes } from 'console-ui/utils'

export const NodesDefinitionDetailView = () => {
  const { id } = useParams<{ id: string }>()

  const { data: response } = useGetDefinitionById({
    id,
  })

  if (!response) {
    return null
  }

  const { data } = response

  return (
    <MainBody
      activeSection="nodes-definition"
      headerEndAdornment={
        <Button to={`/nodes-definitions/${id}/edit`}>Edit</Button>
      }
      title={`Nodes definition | ${data.name}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* basic info group */}
        <div className="border-b border-gray-800 pb-5 px-6 py-8 grid gap-8">
          <div className="grid grid-cols-2">
            <div>
              <h3 className="text-md font-semibold text-gray-200">Name</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-400">
                {data.name}
              </p>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-200">Type</h3>
              <div className="mt-2 max-w-4xl text-sm text-gray-400">
                <Badge
                  variant={MappedNodeDefinitionTypeColor[data.type] as never}
                >
                  {MappedTypes[data.type].name}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold leading-6 text-gray-200">
              Group
            </h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-400">
              {data.group_name}
            </p>
          </div>

          {data.node_type === 'tenant_node' && (
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              <div>
                <h3 className="text-md font-semibold leading-6 text-gray-200">
                  Tenant
                </h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-400">
                  <Link
                    className="text-blue-500"
                    href={`/tenant/${data.tenant_id}`}
                  >
                    {data.tenant_id}
                  </Link>
                </p>
              </div>
              <div>
                <h3 className="text-md font-semibold leading-6 text-gray-200">
                  Analysis configuration
                </h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-400">
                  <Link
                    className="text-blue-500"
                    href={`/analysis-configuration/${data.analysis_configuration_id}`}
                  >
                    {data.analysis_configuration_id}
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-800 pb-5 px-6 py-8">
          <h3 className="text-base font-semibold leading-6 text-gray-200 mb-4">
            Attributes
          </h3>

          {data.attributes?.type === 'prompt' && (
            <>
              <div className="mt-2">
                <p className="mt-1 text-sm font-bold text-gray-400">
                  User prompt
                </p>
                <pre className="mt-2 text-sm text-gray-300 text-wrap">
                  <CodemirrorField
                    readonly
                    extension="JSON"
                    value={data.attributes.user_prompt}
                  />
                </pre>
              </div>
              <div className="mt-8">
                <p className="mt-2 text-sm font-bold text-gray-300">
                  System prompt
                </p>
                <pre className="mt-2 text-sm text-gray-300 italic text-wrap">
                  <CodemirrorField
                    readonly
                    extension="JSON"
                    value={data.attributes.system_prompt}
                  />
                </pre>
              </div>
            </>
          )}

          {data.attributes?.type === 'script' && (
            <div className="mt-2">
              <p className="mt-2 max-w-4xl text-sm font-bold text-gray-300">
                Function
              </p>
              <pre className="mt-2  text-sm text-gray-300 italic text-wrap">
                <CodemirrorField
                  readonly
                  extension="python"
                  value={data.attributes.function}
                />
              </pre>
            </div>
          )}
        </div>

        <div className="pb-5 px-6 py-8">
          <h3 className="text-base font-semibold leading-6 text-gray-200">
            Inputs
          </h3>
          <div className="mt-2">
            {response.data.inputs.map((input) => (
              <div key={input.id} className="mt-2">
                <CodemirrorField readonly extension="JSON" value={input} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainBody>
  )
}
