import { PageButton } from './page-button'
import { PaginationArrowAction } from './pagination-arrow-action'
import { PaginationDivider } from './pagination-divider'

type Props = {
  onPrevClick: () => void
  onNextClick: () => void
  onPageClick: (page: number) => void
  currentPage: number
  pagesNeeded: number
}

export const Pagination = ({
  onPrevClick,
  onNextClick,
  onPageClick,
  currentPage,
  pagesNeeded,
}: Props) => {
  const threshold = 2
  const displayFirstItem = currentPage > threshold
  const displayLastItem = currentPage < pagesNeeded - 1

  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  return (
    <nav className="flex items-center justify-between px-4 sm:px-0">
      <PaginationArrowAction onClick={onPrevClick} />
      <div className="hidden md:-mt-px md:flex">
        {/* always show first and last page */}
        {displayFirstItem && (
          <PageButton
            pageNumber={1}
            onClick={onPageClick}
            currentPage={currentPage}
          />
        )}

        <PaginationDivider page={currentPage} type="before" />

        {/* display `previous` page button if possible */}
        {previousPage > 0 && (
          <PageButton
            currentPage={currentPage}
            pageNumber={previousPage}
            onClick={onPageClick}
          />
        )}

        {/* `current` item is always displayed in center of list */}
        <PageButton
          currentPage={currentPage}
          pageNumber={currentPage}
          onClick={onPageClick}
        />

        {/* display `next` page button if possible */}
        {currentPage < pagesNeeded && (
          <PageButton
            currentPage={currentPage}
            pageNumber={nextPage}
            onClick={onPageClick}
          />
        )}

        <PaginationDivider
          page={currentPage}
          pagesTotal={pagesNeeded}
          type="after"
        />

        {/* always show first and last page */}
        {displayLastItem && (
          <PageButton
            pageNumber={pagesNeeded}
            onClick={onPageClick}
            currentPage={currentPage}
          />
        )}
      </div>
      <PaginationArrowAction variant="next" onClick={onNextClick} />
    </nav>
  )
}
