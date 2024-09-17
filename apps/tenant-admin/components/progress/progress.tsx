type Props = {
  percentage: number
  title: string
}
export const Progress = ({ percentage, title }: Props) => (
  <div>
    <h4 className="text-sm font-medium text-gray-900">{title}</h4>
    <div aria-hidden="true" className="mt-6">
      <div className="overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  </div>
)
