import { useReportAnalysisStatus } from '@waypoint/api-tenant-admin'

import { ReportDashboardView } from './report-dashboard-view'
import { ReportNotTriggeredView } from './report-not-triggered-view'
import { ReportProcessingView } from './report-processing-view'

export const ReportView = () => {
  const { data, isLoading } = useReportAnalysisStatus()

  if (isLoading) {
    return null
  }

  return <ReportDashboardView />

  // if (data?.data.status?.type === 'pending') {
  //   return <ReportProcessingView />
  // }

  // if (data?.data.status?.type === 'completed') {
  //   return <ReportDashboardView />
  // }

  // return <ReportNotTriggeredView />
}
