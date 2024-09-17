import { classNames } from '@waypoint/components'

export const ReportMetricsEventIcon = ({
  icon: Icon,
  color = 'blue',
  collapsed,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
  color?: 'blue' | 'red' | 'indigo'
  collapsed?: boolean
}) => {
  return (
    <div
      className={classNames(
        ' text-blue-600 shrink-0 size-4',
        color === 'red' ? 'text-red-600' : '',
        color === 'blue' ? 'text-blue-600' : '',
        color === 'indigo' ? 'text-indigo-600' : '',
        collapsed ? 'size-4' : 'size-6'
      )}
    >
      <Icon className="size-full" />
    </div>
  )
}
