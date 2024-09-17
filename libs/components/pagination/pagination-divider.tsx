type Props = {
  type: 'before' | 'after'
  page: number
  pagesTotal?: number
}

export const PaginationDivider = ({ type, page, pagesTotal = 0 }: Props) => {
  const beforeThreshold = 3
  const afterThreshold = 2

  if (type === 'before' && page <= beforeThreshold) {
    return null
  }

  if (type === 'after' && page >= pagesTotal - afterThreshold) {
    return null
  }

  return (
    <span className="inline-flex items-center border-t-2 border-transparent px-4 text-sm font-medium text-gray-500">
      ...
    </span>
  )
}
