import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export const NotABugContent = () => {
  return (
    <section>
      <p className="text-gray-800 font-semibold mb-2">Change issue type:</p>

      <div>
        <div className="bg-white text-xs inline-block py-0.5 px-1.5 rounded-md border border-gray-300">
          <span className="w-2 h-2 inline-block rounded-full bg-red-500 mr-2"></span>
          <span className="text-gray-700 font-semibold">bug</span>
        </div>
        <ArrowLongRightIcon className="h-5 w-5 inline text-gray-500 mx-2" />
        <div className="bg-white text-xs inline-block py-0.5 px-1.5 rounded-md border border-gray-300">
          <span className="w-2 h-2 inline-block rounded-full bg-emerald-500 mr-2"></span>
          <span className="text-gray-700 font-semibold">not a bug</span>
        </div>
      </div>
    </section>
  )
}
