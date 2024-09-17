import { classNames } from '../utils'

import type { SpinnerSize } from './loader-spinner'
import { LoaderSpinner } from './loader-spinner'

type Props = {
  withText?: boolean
  size?: SpinnerSize
}

const textSizes: Record<SpinnerSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

export const Loader = ({ withText, size = 'sm' }: Props) => (
  <div className="flex items-center gap-4">
    <LoaderSpinner size={size} />
    {withText && (
      <div className={classNames(textSizes[size], 'text-md text-gray-400')}>
        Loading...
      </div>
    )}
  </div>
)
