'use client'
import { useParams } from 'next/navigation'

import { useGetNodeById } from '@waypoint/api-console'

import { MainBody, NodesRevisions } from 'console-ui/components'

export const NodeDetailView = () => {
  const { id } = useParams<{ id: string }>()

  const { data: nodeData } = useGetNodeById({
    id,
  })

  return (
    <MainBody title={`Node detail | ${nodeData?.data.name ?? ''} `}>
      <div className="sm:flex-auto m-8 mb-4">
        <h1 className="text-base font-semibold leading-6 text-gray-100">
          Nodes revisions:
        </h1>
      </div>
      <NodesRevisions nodeId={id} />
    </MainBody>
  )
}
