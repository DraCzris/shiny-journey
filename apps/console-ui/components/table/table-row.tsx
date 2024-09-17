import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const TableRow = ({ children }: Props) => <tr>{children}</tr>
