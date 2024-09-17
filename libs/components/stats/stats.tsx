import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

import { Card } from '../card'
import { classNames } from '../utils'

type Props = {
  label: string
  value: string
  trend?: {
    value: number
    type: 'increase' | 'decrease'
  }
}

export const Stats = ({ label, value, trend }: Props) => (
  <Card roundedSize="lg" className="px-4 py-5 sm:p-6">
    <dt className="flex justify-between items-center">
      <p className="truncate text-sm font-medium text-gray-500">{label}</p>
      {trend && (
        <div
          className={classNames(
            trend.type === 'increase'
              ? 'text-green-500 bg-green-100'
              : 'text-red-500 bg-red-100',
            'flex items-baseline text-xs font-semibold p-1.5 px-2 rounded-md overflow-hidden'
          )}
        >
          <>
            {trend.type === 'decrease' ? (
              <ChevronDownIcon
                aria-hidden="true"
                className="size-3 stroke-[3px] flex-shrink-0 self-center text-red-500"
              />
            ) : (
              <ChevronUpIcon
                aria-hidden="true"
                className="size-3 stroke-[3px] flex-shrink-0 self-center text-green-500"
              />
            )}
            <span className="sr-only">
              {trend.type === 'increase' ? 'Increased' : 'Decreased'} by{' '}
            </span>
            <span className="ml-0.5">{trend.value}%</span>
          </>
        </div>
      )}
    </dt>
    <dd className="flex items-baseline">
      <p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>
    </dd>
  </Card>
)
