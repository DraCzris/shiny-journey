import { CheckCircleIcon, CheckIcon } from '@heroicons/react/20/solid'

import { Button } from '@waypoint/components'

type Props = {
  id: string
  highlighted?: boolean
  name: string
  description: string
  price: string
  onSelect?: (id: string) => void
  features: string[]
  isCurrent: boolean
  customButton?: React.ReactNode
  withoutPeriod?: boolean
  planChangeLoading?: boolean
  disabled?: boolean
}
export const PricingPlanTierItem = ({
  id,
  highlighted,
  name,
  price,
  description,
  onSelect,
  features,
  isCurrent,
  customButton,
  withoutPeriod,
  planChangeLoading,
  disabled,
}: Props) => {
  const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

  return (
    <div
      key={id}
      className={classNames(
        highlighted ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200',
        'rounded-3xl p-8 xl:p-10 bg-white'
      )}
    >
      <div className="flex items-center justify-between gap-x-4">
        <h3
          className={classNames(
            highlighted ? 'text-blue-600' : 'text-gray-900',
            'text-lg font-semibold leading-8'
          )}
          id={id}
        >
          {name}
        </h3>
        {isCurrent && (
          <div>
            <CheckCircleIcon
              aria-hidden="true"
              className="h-8 w-8 text-blue-600"
            />
          </div>
        )}
        {highlighted ? (
          <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600 truncate">
            Most&nbsp;popular
          </p>
        ) : null}
      </div>
      <p className="mt-4 h-10 text-sm leading-6 text-gray-600">{description}</p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-gray-900">
          {price}
        </span>
        {withoutPeriod ? null : (
          <span className="text-sm font-semibold leading-6 text-gray-600">
            /month
          </span>
        )}
      </p>
      {customButton || (
        <div className="mt-6">
          <Button
            fullWidth
            disabled={disabled || planChangeLoading || isCurrent}
            size="lg"
            variant={highlighted ? 'primary' : 'primary-soft'}
            onClick={() => onSelect?.(id)}
          >
            {isCurrent ? 'Current plan' : 'Choose plan'}
          </Button>
        </div>
      )}

      <ul
        className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
        role="list"
      >
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon
              aria-hidden="true"
              className="h-6 w-5 flex-none text-blue-600"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
