import type { ReactNode } from 'react'

import { classNames } from '@waypoint/components'

type Props = {
  count?: number
  label: string
  icon: ReactNode
  color?: 'blue' | 'red'
  onClick?: () => void
  isActive?: boolean
}

export const EventCountButton = ({
  count,
  label,
  icon,
  color = 'blue',
  onClick,
  isActive,
}: Props) => (
  <button
    className={classNames(
      'p-3 rounded-xl w-full flex justify-between gap-3 transition-colors duration-200 ',
      color === 'red'
        ? 'bg-red-50 hover:bg-red-100 ring-red-500'
        : 'bg-blue-50 hover:bg-blue-100 ring-blue-500',
      isActive ? 'ring-1' : ''
    )}
    onClick={onClick}
  >
    <div className="flex gap-3">
      <span
        className={classNames(
          'bg-blue-100 text-blue-600 size-10 flex items-center justify-center rounded-full',
          color === 'red'
            ? 'bg-red-100 text-red-600'
            : 'bg-blue-100 text-blue-600'
        )}
      >
        {icon}
      </span>
      <div>
        <span
          className={classNames(
            'text-sm font-semibold',
            color === 'red' ? 'text-red-600' : 'text-blue-600'
          )}
        >
          {label}
        </span>

        <span className="font-semibold text-gray-700 block text-start">
          {count}
        </span>
      </div>
    </div>
  </button>
)
