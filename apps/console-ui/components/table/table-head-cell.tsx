import { classNames } from 'console-ui/utils'

type Props = {
  first?: boolean
  children?: React.ReactNode
}

export const TableHeadCell = ({ children, first }: Props) => (
  <th
    className={classNames(
      'py-3.5 text-left text-sm font-semibold text-gray-100',
      first ? 'pl-4 pr-3 sm:pl-6' : 'px-3'
    )}
    scope="col"
  >
    {children}
  </th>
)
