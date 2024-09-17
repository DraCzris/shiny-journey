import { classNames } from 'console-ui/utils'

type Props = {
  first?: boolean
  children: React.ReactNode
}

export const TableCell = ({ children, first = false }: Props) => (
  <td
    className={classNames(
      'whitespace-nowrap text-sm',
      first
        ? 'py-4 pl-4 pr-3 font-medium text-gray-100 sm:pl-6'
        : 'px-3 py-4 text-sm text-gray-400'
    )}
    scope="col"
  >
    {children}
  </td>
)
