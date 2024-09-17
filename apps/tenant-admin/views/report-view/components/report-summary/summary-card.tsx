import type { ReactNode } from 'react'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

type Props = {
  label: string
  value: number | string
  icon: ReactNode
  link?: string
}

export const SummaryCard = ({ label, icon, value, link }: Props) => (
  <Link
    className="rounded-xl w-full flex flex-wrap justify-between gap-4 shadow-sm p-6 px-10 bg-white cursor-pointer hover:bg-blue-50 transition-all border-2 border-white hover:border-blue-500"
    href={link ?? ''}
  >
    <div>
      <p className="text-md text-blue-600 font-semibold mb-1">{label}</p>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
    </div>
    <div className="rounded-full w-12 h-12 flex justify-center items-center bg-blue-50 mb-2">
      {icon}
    </div>
    <div className="w-full flex justify-between -mb-2">
      <p className="text-sm text-gray-400 font-semibold">Show all</p>
      <ChevronRightIcon className="h-6 w-6 text-blue-500" />
    </div>
  </Link>
)
