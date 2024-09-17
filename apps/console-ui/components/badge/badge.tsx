import { classNames } from 'console-ui/utils'

const badgeClasses = {
  gray: 'bg-gray-400/10 text-gray-400 ring-gray-400/20',
  red: 'bg-red-400/10 text-red-400 ring-red-400/20',
  yellow: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
  green: 'bg-green-400/10 text-green-400 ring-green-400/20',
  blue: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
  indigo: 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/20',
  purple: 'bg-purple-400/10 text-purple-400 ring-purple-400/20',
  pink: 'bg-pink-400/10 text-pink-400 ring-pink-400/20',
}

export type BadgeProps = {
  children: React.ReactNode
  variant?: keyof typeof badgeClasses
}

export const Badge = ({ children, variant = 'gray' }: BadgeProps) => (
  <span
    className={classNames(
      `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`,
      badgeClasses[variant]
    )}
  >
    {children}
  </span>
)
