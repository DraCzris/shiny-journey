import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const TableHead = ({ children }: Props) => (
  <thead className="bg-gray-800/50">{children}</thead>
)
