'use client'
import { useParams } from 'next/navigation'

import { useGetRevisionById } from '@waypoint/api-console'

import { MainBody, Sandbox } from 'console-ui/components'

export default function RevisionSandbox() {
  const { revisionID } = useParams<{ revisionID: string }>()
  const { data } = useGetRevisionById({
    id: revisionID,
  })

  return (
    <MainBody title="Revision Sandbox">
      {data && (
        <Sandbox
          defaultData={{
            resolverType: data.data.resolver_type,
            inputData: data.data.input_data ?? '',
            attributes: data.data.attributes,
          }}
        />
      )}
    </MainBody>
  )
}
