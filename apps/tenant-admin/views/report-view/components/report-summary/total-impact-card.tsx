export const TotalImpactCard = () => (
  <div className="bg-white p-6 px-10 rounded-xl flex shadow-sm justify-between col-span-12 gap-2 flex-wrap items-start">
    <div>
      <h2 className="text-base font-semibold text-blue-600">Overview</h2>
      <p className="mt-1 text-5xl font-bold tracking-tight inline-block text-gray-900">
        80
        <span className="text-gray-400 text-2xl font-bold ml-1">%</span>
      </p>
    </div>
    <div className="text-sm text-gray-400 inline-grid grid-cols-[1fr auto] gap-x-2 text-end">
      <p>Issues analyzed</p>
      <span className="font-semibold text-gray-700">10,304</span>
      <p>Optimizable issues</p>
      <span className="font-semibold text-gray-700">8,201</span>
    </div>
    <div className="w-full grid gap-1 items-start mt-2">
      <div className="w-full h-1 bg-blue-100 relative rounded-md overflow-hidden">
        <div className="absolute w-[80%] bg-gradient-to-r from-blue-500 to-blue-600 h-full top-0 rounded-md"></div>
      </div>
    </div>
  </div>
)
