import { classNames } from '@waypoint/components'

import { Filters } from '../filters'

const tabs = [{ name: 'Actions' }, { name: 'Issues' }]

type Props = {
  currentIndex: number
  setIndex: (index: number) => void
}
export const Tabs = ({ currentIndex = 0, setIndex }: Props) => (
  <div className="mb-4">
    <div className="sm:hidden">
      <label className="sr-only" htmlFor="tabs">
        Select a tab
      </label>
      {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
      <select
        className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        defaultValue={tabs[currentIndex]?.name}
        id="tabs"
        name="tabs"
      >
        {tabs.map((tab) => (
          <option key={tab.name}>{tab.name}</option>
        ))}
      </select>
    </div>
    <div className="hidden sm:flex justify-between items-end">
      <nav aria-label="Tabs" className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            aria-current={currentIndex === index ? 'page' : undefined}
            className={classNames(
              currentIndex === index
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-gray-700',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            onClick={() => setIndex(index)}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <Filters />
    </div>
  </div>
)
