import { useEffect, useState } from 'react'

import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'
import { useDebounce } from 'use-debounce'

import { Checkbox, Dropdown } from '@waypoint/components'

import { TextField } from 'tenant-admin/components'

import { useFilters } from '../report-filter-provider'

export const Filters = () => {
  const { filters, setFilters, setFilter } = useFilters()
  const [search, setSearch] = useState('')

  const [debouncedSearch] = useDebounce(search, 500)

  useEffect(() => {
    setFilters({
      ...filters,
      search: debouncedSearch,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, setFilters])

  const activeFilterCount = Object.values(filters.actions).filter(
    Boolean
  ).length

  return (
    <div className="flex gap-4 items-end">
      <form className="flex gap-4 items-end">
        <TextField
          placeholder="Search ticket"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Dropdown
          align="right"
          dropdownButton={
            <div className="px-5 py-2 flex gap-0.5 rounded-md text-center bg-white dark:bg-white/10 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 dark:ring-0 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-white/20">
              <span className="inline-block mr-1 text-gray-800">Filters</span>
              {activeFilterCount > 0 ? (
                <span className="text-blue-600 font-semibold h-5 w-5 bg-blue-100 block rounded-md">
                  {activeFilterCount}
                </span>
              ) : (
                <AdjustmentsVerticalIcon className="h-5 w-5 text-gray-800 block" />
              )}
            </div>
          }
        >
          <fieldset className="px-2 pl-4 py-1 space-y-1">
            <legend className="sr-only">Actions</legend>

            <Checkbox
              checked={filters.actions.reroute}
              label="Reassign"
              name="reroute"
              onChange={() => setFilter('reroute')}
            />
            <Checkbox
              checked={filters.actions.not_a_bug}
              label="Reclassify"
              name="not_a_bug"
              onChange={() => setFilter('not_a_bug')}
            />
            <Checkbox
              checked={filters.actions.reoccurring_report}
              label="Reoccurring"
              name="reoccurring_report"
              onChange={() => setFilter('reoccurring_report')}
            />
            <Checkbox
              checked={filters.actions.link_related}
              label="Related"
              name="link_related"
              onChange={() => setFilter('link_related')}
            />
            <Checkbox
              checked={filters.actions.incomplete}
              label="Incomplete"
              name="incomplete"
              onChange={() => setFilter('incomplete')}
            />
            <Checkbox
              checked={filters.actions.merge}
              label="Merge"
              name="merge"
              onChange={() => setFilter('merge')}
            />
          </fieldset>
        </Dropdown>
      </form>
    </div>
  )
}
