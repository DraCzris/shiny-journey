import {
  ReportMetricsCard,
  ReportMetricsEventFilterButton,
} from '../../report-metrics-card'
import { useFilters } from '../../report-filter-provider'
import {
  BugAntSlashIcon,
  LinkedDocumentsSolidIcon,
  ListIncompleteSolidIcon,
  MergeDocumentsSolidIcon,
  UserSwitchSolidIcon,
} from '@waypoint/components'
import { useReportAnalysis } from '@waypoint/api-tenant-admin'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'

export const ClosableIssueCard = () => {
  const { setFilter, filters } = useFilters()

  const { data } = useReportAnalysis()

  const counts = data?.data.counts
  return (
    <>
      <ReportMetricsCard
        label="Take Action"
        totalCount={
          // TODO: replace with actual count of merge
          (counts?.not_a_bug ?? 0) +
          (data?.data.counts.reroute ?? 0) +
          (data?.data.counts.merge ?? 0)
        }
      >
        <ReportMetricsEventFilterButton
          count={data?.data.counts.reroute ?? 0}
          color="red"
          icon={UserSwitchSolidIcon}
          isActive={filters.actions.reroute}
          label="Reassign: Owner"
          description="Assign to the developer most likely to resolve this issue quickly."
          onClick={() => {
            setFilter('reroute', false)
          }}
        />
        <ReportMetricsEventFilterButton
          count={counts?.not_a_bug ?? 0}
          icon={BugAntSlashIcon}
          color="red"
          isActive={filters.actions.not_a_bug}
          label="Reclassify: Not Bug"
          description="Not a bug: reclassify as a feature request or user training opportunity."
          onClick={() => {
            setFilter('not_a_bug', false)
          }}
        />
        <ReportMetricsEventFilterButton
          count={counts?.merge ?? 0} // TODO: replace with actual count
          icon={MergeDocumentsSolidIcon}
          isActive={filters.actions.merge}
          label="Merge: Duplicate"
          color="red"
          description="Duplicate issue: merge with the existing one and close this."
          onClick={() => {
            setFilter('merge', false)
          }}
        />
      </ReportMetricsCard>
      <ReportMetricsCard
        label="Add Context"
        totalCount={
          (counts?.incomplete ?? 0) +
          (counts?.link_related ?? 0) +
          (counts?.reoccurring_report ?? 0)
        }
      >
        <ReportMetricsEventFilterButton
          count={data?.data.counts.incomplete ?? 0}
          icon={ListIncompleteSolidIcon}
          color="indigo"
          isActive={filters.actions.incomplete}
          label="Request: Missing info"
          description="Missing critical info: provide necessary details to verify the bug or determine its cause."
          onClick={() => {
            setFilter('incomplete', false)
          }}
        />
        <ReportMetricsEventFilterButton
          count={data?.data.counts.link_related ?? 0}
          color="indigo"
          icon={LinkedDocumentsSolidIcon}
          isActive={filters.actions.link_related}
          label="Link: Related"
          description="Related issue: link to similar issues for additional context."
          onClick={() => {
            setFilter('link_related', false)
          }}
        />
        <ReportMetricsEventFilterButton
          count={data?.data.counts.reoccurring_report ?? 0}
          icon={DocumentDuplicateIcon}
          color="indigo"
          isActive={filters.actions.reoccurring_report}
          label="Link: Reoccurring"
          description="Recurring issue: link to previous instance for context."
          onClick={() => {
            setFilter('reoccurring_report', false)
          }}
        />
      </ReportMetricsCard>
    </>
  )
}
