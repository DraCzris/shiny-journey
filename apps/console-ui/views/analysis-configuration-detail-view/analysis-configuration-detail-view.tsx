'use client'
import { useParams } from 'next/navigation'

import { useGetAnalysisConfiguration } from '@waypoint/api-console'
import { getFormattedDate } from '@waypoint/components'

import { MainBody } from '../../components'
import { AnalysisConfigurationDetail } from '../tenant-detail-view'

export const AnalysisConfigurationDetailView = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useGetAnalysisConfiguration({
    id,
  })

  const name = data?.data.name
  const version = data?.data.version
  const description = data?.data.description
  const created_at = data?.data.created_at
  const activated_at = data?.data.activated_at

  return (
    <MainBody title="Analysis configuration detail">
      {/* TODO: finish later */}
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
              {getFormattedDate(created_at ?? '', 'en', {})}
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
        configurationName="Configuration"
      />
    </MainBody>
  )
}
