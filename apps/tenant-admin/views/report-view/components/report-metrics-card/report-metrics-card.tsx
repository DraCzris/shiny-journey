import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode
  label: string
  totalCount: number
}

type ReportMetricsCardContext = {
  collapsed: boolean
}

export const reportMetricsCardContext = createContext<ReportMetricsCardContext>(
  {
    collapsed: true,
  }
)

export const ReportMetricsCard = ({ label, children, totalCount }: Props) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className="col-span-12 bg-white p-4 px-6 rounded-lg shadow-sm transition-all overflow-hidden">
      <div className="flex justify-between items-start gap-6">
        <div className="shrink-0 min-w-32">
          <h3 className="text-sm text-blue-600 font-semibold">{label}</h3>
          <p className="mt-1 max-w-4xl text-2xl text-gray-900 font-bold">
            {totalCount}
          </p>
        </div>
        {!collapsed && (
          <>
            <div className="shrink-0 min-w-48">
              <h3 className="text-sm leading-6 text-blue-600 font-semibold">
                Savable Eng Hours
              </h3>
              <p className="mt-1 max-w-2xl text-2xl text-gray-900 font-bold">
                24
              </p>
            </div>
            <div className="shrink-0 min-w-48">
              <h3 className="text-sm leading-6 text-blue-600 font-semibold">
                Savable TTR Hours
              </h3>
              <p className="mt-1 max-w-2xl text-2xl text-gray-900 font-bold">
                144
              </p>
            </div>
          </>
        )}
        {collapsed && (
          <div className="grid grid-cols-3 h-full w-full gap-3 items-end justify-start self-end flex-wrap">
            <reportMetricsCardContext.Provider value={{ collapsed }}>
              {children}
            </reportMetricsCardContext.Provider>
          </div>
        )}
        <button
          className="self-start hover:bg-gray-50 rounded-full p-1 transition-colors duration-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronDownIcon className="h-4 w-4 text-gray-400 stroke-2" />
        </button>
      </div>
      {!collapsed && (
        <div className="grid grid-cols-4 mt-6 w-full gap-3 justify-start self-end flex-wrap">
          <reportMetricsCardContext.Provider value={{ collapsed }}>
            {children}
          </reportMetricsCardContext.Provider>
        </div>
      )}
    </div>
  )
}
