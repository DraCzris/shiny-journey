import { classNames } from '@waypoint/components'

const tabs = [
  { name: 'Analysis', href: '#', count: '52', current: false },
  { name: 'QA', href: '#', count: '6', current: false },
  { name: 'Zendesk', href: '#', count: '4', current: true },
  { name: 'Timeline', href: '#', current: false },
  { name: 'More', href: '#', current: false },
]

export default function JiraPage() {
  return (
    <div className="rounded-lg bg-blue-100/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-xl">
      <div className="">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-4">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                aria-current={tab.current ? 'page' : undefined}
                className={classNames(
                  tab.current
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium'
                )}
                href="#"
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.current
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2 text-xs font-medium md:inline-block'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div>
        <div className="p-2">
          <div className="mb-1 flex items-center">
            <div className="text-[0.8125rem] font-bold">Bug summary</div>
            <div className="ml-2 text-[0.8125rem] text-gray-400">
              by Waypoint AI
            </div>
            <div className="ml-2">
              <svg
                aria-hidden="true"
                className="h-3 w-3 cursor-pointer text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-2">
              <svg
                aria-hidden="true"
                className="h-3 w-3 cursor-pointer text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex mt-2">
            <svg
              className="ml-1 mr-3 h-5 w-5 animate-spin text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-[0.8125rem] text-gray-400">
              Processing...
            </span>
          </div>
        </div>
        <div className="p-2">
          <div className="mb-1 flex items-center">
            <div className="text-[0.8125rem] font-bold">Current behavior</div>
            <div className="ml-2 text-[0.8125rem] text-gray-400">
              by Waypoint AI
            </div>
            <div className="ml-2">
              <svg
                aria-hidden="true"
                className="h-3 w-3 cursor-pointer text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <p className="text-[0.8125rem] text-gray-500 hover:bg-slate-100">
            From the video, we see that Mary is having trouble uploading
            attachments. She's using Safari and has tried refreshing the browser
            but the issue persists.
          </p>
        </div>
      </div>
    </div>
  )
}
