import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline'

import { classNames } from '../utils'

type Props = {
  variant?: 'prev' | 'next'
  onClick: () => void
}
export const PaginationArrowAction = ({ variant = 'prev', onClick }: Props) => (
  <div
    className={classNames(
      '-mt-px flex w-0 flex-1',
      variant === 'next' ? 'justify-end' : ''
    )}
  >
    <button
      onClick={onClick}
      className="inline-flex items-center text-sm py-1 px-2 rounded-md font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      {variant === 'prev' ? (
        <>
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </>
      ) : (
        <>
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </>
      )}
    </button>
  </div>
)
