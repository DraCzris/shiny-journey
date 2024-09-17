type Props = {
  children: React.ReactNode
  tableHead: React.ReactNode
}

export const Table = ({ children, tableHead }: Props) => (
  <table className="min-w-full divide-y divide-gray-300">
    <thead className="bg-gray-50">
      <tr>{tableHead}</tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
)
