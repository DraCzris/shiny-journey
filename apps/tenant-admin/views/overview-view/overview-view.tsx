import { useGetTenant } from '@waypoint/api-tenant-admin'

import { StandardOverview } from './standard-overview'

export const OverviewView = () => {
  const { data: response } = useGetTenant()

  const data = response?.data

  if (!data) {
    return null
  }

  if (data.account.type === 'standard') {
    return <StandardOverview />
  }
}
