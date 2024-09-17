import { FaceFrownIcon } from '@heroicons/react/24/outline'

export const EmptyState = () => (
  <div className="text-center p-2 py-6">
    <div className="relative h-8 w-8 inline-block">
      <span className="absolute top-[20%] -left-[1%] bg-blue-500/25 w-full h-full rounded-full" />
      <FaceFrownIcon className="w-10 h-10 inline text-blue-600" />
    </div>
    <h3 className="mt-2 text-sm font-semibold text-gray-900">
      No data for this filter
    </h3>
    <p className="mt-1 text-sm text-gray-600">
      Please try another filter options
    </p>
  </div>
)
