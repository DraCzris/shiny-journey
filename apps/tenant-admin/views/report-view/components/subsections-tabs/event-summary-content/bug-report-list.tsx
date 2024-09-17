import { BugReportList as BugReportListType } from '@waypoint/api-tenant-admin'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  item: BugReportListType
}

export const BugReportList = ({ item }: Props) => {
  return (
    <div className="w-full">
      <p className="text-gray-800 font-semibold mb-1">Suggested issues to link:</p>
      <ul className=" text-gray-700 rounded-lg overflow-hidden bg-white/80 ring-1 ring-gray-200 divide-y divide-gray-200 w-full">
        {item.data.map((item, index) => (
          <li key={index}>
            <a
              className="hover:bg-blue-50 p-4 px-4 grid gap-1 transition-colors duration-200 ease-in-out hover:shadow-sm"
              href={item.link}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex w-full gap-1 items-center justify-start">
                <div className="flex justify-center items-center">
                  <Image
                    alt={item.public_id}
                    className="h-3.5 w-3.5"
                    height="16"
                    src="/images/jira.svg"
                    width="16"
                  />
                </div>
                <Link
                  className="text-blue-600 font-semibold shrink-0"
                  href={item.link}
                  target="_blank"
                >
                  {item.public_id}
                </Link>
                <div className=" ml-1 flex w-full items-center justify-between">
                  <span className="font-semibold block">{item.title}</span>
                </div>
              </div>
              <div className="flex">
                <span className="text-red-700  text-xs px-2 py-0.5 font-semibold bg-red-100 inline-block rounded-md self-end">
                  closed
                </span>

                <div className="ml-2 inline-flex gap-2 items-center mt-1">
                  <span className="text-gray-500 text-xs">{item.assignee}</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
