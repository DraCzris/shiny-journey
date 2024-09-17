import { classNames } from '@waypoint/components'

type CardProps = {
  children: React.ReactNode
  className?: string
  cardTitle?: React.ReactNode
  noPadding?: boolean
}
export const Card = ({
  children,
  cardTitle,
  className,
  noPadding = false,
}: CardProps) => (
  <div
    className={`bg-white overflow-hidden rounded-xl ring-1 ring-black ring-opacity-5 shadow ${className}`}
  >
    {cardTitle && (
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {cardTitle}
        </h3>
      </div>
    )}
    <div className={classNames(!noPadding ? 'px-4 py-5 sm:p-6' : '')}>
      {children}
    </div>
  </div>
)
