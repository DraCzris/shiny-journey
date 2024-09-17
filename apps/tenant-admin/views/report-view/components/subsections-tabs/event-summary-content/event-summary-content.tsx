import type { EventSummaryItem } from '@waypoint/api-tenant-admin'
import { HTMLContentEventSummary } from './html-content'
import { UnmetRequirementsList } from './unmet-requirements-list'
import { BugReportList } from './bug-report-list'
import { MergeSuggestion } from './merge-suggestion'

type Props = {
  eventSummaryItem: EventSummaryItem
}

export const EventSummaryContent = ({ eventSummaryItem }: Props) => {
  if (eventSummaryItem.type === 'html') {
    return <HTMLContentEventSummary item={eventSummaryItem} />
  }

  if (eventSummaryItem.type === 'merge_suggestion') {
    return <MergeSuggestion item={eventSummaryItem} />
  }

  if (eventSummaryItem.type === 'bug_report_list') {
    return <BugReportList item={eventSummaryItem} />
  }

  if (eventSummaryItem.type === 'unmet_requirements_list') {
    return <UnmetRequirementsList item={eventSummaryItem} />
  }

  return null
}
