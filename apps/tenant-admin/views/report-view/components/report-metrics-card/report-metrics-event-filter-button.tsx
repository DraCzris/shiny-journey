import { classNames } from '@waypoint/components'
import { useReportMetricsCard } from './report-metrics-card.hook'
import { ReportMetricsEventCount } from './report-metrics-event-count'
import { ReportMetricsEventIcon } from './report-metrics-event-icon'

type Props = {
  count?: number
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
  color?: 'blue' | 'red' | 'indigo'
  description?: string
  onClick?: () => void
  isActive?: boolean
}

export const ReportMetricsEventFilterButton = ({
  count,
  label,
  icon: Icon,
  color = 'blue',
  onClick,
  isActive,
  description,
}: Props) => {
  const { collapsed } = useReportMetricsCard()

  return (
    <button
      className={classNames(
        'flex gap-3 transition-colors duration-200 text-start',
        color === 'red' ? 'bg-red-50/70 hover:bg-red-100 ring-red-500' : '',
        color === 'blue' ? 'bg-blue-50/70 hover:bg-blue-100 ring-blue-500' : '',
        color === 'indigo'
          ? 'bg-indigo-50/70 hover:bg-indigo-100 ring-indigo-500'
          : '',
        isActive ? 'ring-1' : '',
        collapsed ? 'py-2 px-2 rounded-md' : 'p-3 w-full col-span-2 rounded-lg'
      )}
      onClick={onClick}
    >
      {collapsed && (
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              {collapsed && (
                <ReportMetricsEventCount
                  collapsed={collapsed}
                  count={count ?? 0}
                  color={color}
                />
              )}
              <span
                className={classNames(
                  'font-semibold text-xs',
                  color === 'red' ? 'text-red-600' : '',
                  color === 'blue' ? 'text-blue-600' : '',
                  color === 'indigo' ? 'text-indigo-600' : ''
                )}
              >
                {label}
              </span>
            </div>
            {collapsed && (
              <ReportMetricsEventIcon icon={Icon} color={color} collapsed />
            )}
          </div>
        </div>
      )}

      {!collapsed && (
        <>
          <span
            className={classNames(
              'overflow-hidden flex items-center justify-center w-12 h-12 rounded-full shrink-0',
              color === 'red' ? 'text-red-600 bg-red-100' : '',
              color === 'blue' ? 'text-blue-600 bg-blue-100' : '',
              color === 'indigo' ? 'text-indigo-600 bg-indigo-100' : ''
            )}
          >
            <ReportMetricsEventIcon icon={Icon} color={color} />
          </span>

          <div className="w-full">
            <div className="flex justify-between w-full items-end mb-1">
              <span
                className={classNames(
                  'font-semibold mr-3 text-sm',
                  color === 'red' ? 'text-red-600' : '',
                  color === 'blue' ? 'text-blue-600' : '',
                  color === 'indigo' ? 'text-indigo-600' : ''
                )}
              >
                {label}
              </span>

              <ReportMetricsEventCount
                collapsed={collapsed}
                count={count ?? 0}
                color={color}
              />
            </div>
            <p className="text-xs text-gray-800 w-full">{description}</p>
          </div>
        </>
      )}
    </button>
  )
}
