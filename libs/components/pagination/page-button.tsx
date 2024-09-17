import { classNames } from '../utils'

type Props = {
  onClick: (page: number) => void
  pageNumber: number
  currentPage?: number
}

export const PageButton = ({ onClick, pageNumber, currentPage }: Props) => {
  const isActive = currentPage === pageNumber

  return (
    <button
      onClick={() => onClick(pageNumber)}
      className={classNames(
        'inline-flex items-center justify-center rounded-full w-6 h-6 text-sm font-medium',
        isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      )}
      aria-current="page"
    >
      {pageNumber}
    </button>
  )
}
