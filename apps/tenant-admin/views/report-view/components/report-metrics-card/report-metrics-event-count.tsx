import { classNames } from '@waypoint/components'

type Props = {
  collapsed: boolean
  color?: 'blue' | 'red' | 'indigo'
  count: number
}
export const ReportMetricsEventCount = ({ collapsed, color, count }: Props) => (
  <span
    className={classNames(
      'font-semibold text-center rounded-md px-1 py-0.5',
      collapsed ? 'text-xs  min-w-4' : 'text-sm  min-w-6',
      color === 'red' ? 'text-red-600 bg-red-100' : '',
      color === 'blue' ? 'text-blue-600 bg-blue-100' : '',
      color === 'indigo' ? 'text-indigo-600 bg-indigo-100' : ''
    )}
  >
    {count}
  </span>
)
