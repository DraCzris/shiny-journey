export const OverallStatsCard = () => (
  <div className="grid grid-cols-4 bg-white p-4 px-6 rounded-xl shadow-sm justify-between col-span-12 gap-2 flex-wrap items-start">
    <div>
      <h2 className="text-sm font-semibold text-blue-600">Actions</h2>
      <p className="mt-1 text-2xl font-bold tracking-tight inline-block text-gray-900">
        14
      </p>
    </div>
    <div>
      <h2 className="text-sm font-semibold text-blue-600">Actionable Issues</h2>
      <p className="mt-1 text-2xl font-bold tracking-tight inline-block text-gray-900">
        6
      </p>
    </div>
    <div>
      <h2 className="text-sm font-semibold text-blue-600">Savable Eng Hours</h2>
      <p className="mt-1 text-2xl font-bold tracking-tight inline-block text-gray-900">
        48
      </p>
    </div>
    <div>
      <h2 className="text-sm font-semibold text-blue-600">Savable TTR Hours</h2>
      <p className="mt-1 text-2xl font-bold tracking-tight inline-block text-gray-900">
        288
      </p>
    </div>
  </div>
)
