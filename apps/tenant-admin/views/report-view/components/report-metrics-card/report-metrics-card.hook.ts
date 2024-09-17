import { useContext } from 'react'
import { reportMetricsCardContext } from './report-metrics-card'

export const useReportMetricsCard = () => {
  const context = useContext(reportMetricsCardContext)

  if (!context) {
    throw new Error(
      'useReportMetricsCard must be used within a ReportMetricsCardProvider'
    )
  }

  return context
}
