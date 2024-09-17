import { Chart } from '../chart'

export const UnresolvedIssuesCard = () => (
  <div className="grid grid-cols-9 gap-4 col-span-12 xl:col-span-6">
    <div className="rounded-xl w-full bg-white shadow-sm p-6 px-10 pb-0 col-span-9 overflow-hidden grid gap-2 grid-cols-2">
      <div>
        <h2 className="text-base font-semibold text-blue-600">Open Issues</h2>
        <p className="mt-1 text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          1,400
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-400 font-semibold text-end">
          02/2021 - 08/2021
        </p>
        <div className="h-24 w-[calc(100%+60px)] relative -left-8 -right-5 overflow-hidden">
          <Chart />
          <div className="w-full top-0 left-0 absolute h-full shadow-[inset_-20px_-20px_20px_white]"></div>
        </div>
      </div>
    </div>
  </div>
)
