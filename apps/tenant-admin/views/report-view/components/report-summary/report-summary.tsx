'use client'

import { ClosableIssueCard, OverallStatsCard } from './cards'
import { IssueAlertsCard } from './issue-alerts-card'
import { IssuesEliminatedCard } from './issues-eliminated-card'
import { TotalImpactCard } from './total-impact-card'
import { UnresolvedIssuesCard } from './unresolved-issues-card'

export const ReportSummary = () => (
  <>
    <section className="mb-8">
      <div className="grid grid-cols-12 gap-4 mb-10">
        {/* Total impact */}
        {/* <TotalImpactCard /> */}
        <OverallStatsCard />
        <ClosableIssueCard />
        {/* Chart */}
        {/* <UnresolvedIssuesCard />
        {/* Closable bugs */}
        {/* <IssuesEliminatedCard />  */}
        {/* Incomplete */}
        {/* <IncompleteCard /> */}
        {/* Optimizable */}
        {/* <IssueAlertsCard /> */}
      </div>
    </section>
  </>
)
