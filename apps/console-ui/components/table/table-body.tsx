type Props = {
  children: React.ReactNode
}

export const TableBody = ({ children }: Props) => (
  <tbody className="divide-y divide-gray-900 bg-gray-800/20">{children}</tbody>
)
