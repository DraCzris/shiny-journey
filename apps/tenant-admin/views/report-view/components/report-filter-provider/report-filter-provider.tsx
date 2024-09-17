import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

import type { EventType, Intervention } from '@waypoint/api-tenant-admin'
import { useReportAnalysis } from '@waypoint/api-tenant-admin'

export type FiltersType = {
  search: string
  actions: Record<EventType, boolean>
}

const FilterContext = createContext<{
  filters: FiltersType
  filteredData: Intervention[] | undefined
  setFilters: (filters: FiltersType) => void
  setFilter: (event: EventType, reset?: boolean) => void
  isLoadingData: boolean
}>({
  filters: {
    search: '',
    actions: {
      not_a_bug: false,
      reroute: false,
      incomplete: false,
      reoccurring_report: false,
      link_related: false,
      merge: false,
    },
  },
  isLoadingData: false,
  filteredData: [],
  setFilters: () => null,
  setFilter: () => null,
})

export const ReportFilterProvider = ({
  children,
  defaultFilter = {
    search: '',
    actions: {
      not_a_bug: false,
      reroute: false,
      incomplete: false,
      reoccurring_report: false,
      link_related: false,
      merge: false,
    },
  },
}: {
  children: ReactNode
  defaultFilter?: FiltersType
}) => {
  const [filters, setFilters] = useState<FiltersType>(defaultFilter)

  const { data: response, isLoading } = useReportAnalysis()
  const data = response?.data

  const filteredInterventions = data?.interventions?.filter((intervention) => {
    // Only if one some filter is active
    const matchesActionType = Object.values(filters.actions).some(
      (value) => !!value
    )
      ? (filters.actions.not_a_bug &&
          intervention.event.type === 'not_a_bug') ||
        (filters.actions.reroute && intervention.event.type === 'reroute') ||
        (filters.actions.reoccurring_report &&
          intervention.event.type === 'reoccurring_report') ||
        (filters.actions.incomplete &&
          intervention.event.type === 'incomplete') ||
        (filters.actions.link_related &&
          intervention.event.type === 'link_related') ||
        (filters.actions.merge && intervention.event.type === 'merge')
      : true

    const matchesSearch =
      intervention.event.report.public_id
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      intervention.event.report.title
        .toLowerCase()
        .includes(filters.search.toLowerCase())

    return matchesActionType && matchesSearch
  })

  const setFilter = (event: EventType, reset?: boolean) => {
    if (reset) {
      return setFilters({
        ...defaultFilter,
        actions: {
          ...defaultFilter.actions,
          [event]: !filters.actions[event],
        },
      })
    }

    setFilters({
      ...filters,
      actions: {
        ...filters.actions,
        [event]: !filters.actions[event],
      },
    })
  }

  return (
    <FilterContext.Provider
      value={{
        isLoadingData: isLoading,
        filters,
        setFilters,
        setFilter,
        filteredData: filteredInterventions,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = () => {
  const filtersContext = useContext(FilterContext)

  return filtersContext
}
