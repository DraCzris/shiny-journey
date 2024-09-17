'use client'

import { type ReactElement, type ReactNode, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

type Props = {
  children: ReactNode
  label: string | ReactElement
}

export const Accordion = ({ children, label }: Props) => {
  const [opened, setOpened] = useState(false)

  return (
    <div>
      <div
        className="flex select-none text-white justify-between gap-2 items-center py-4 px-4 bg-gray-800/20 border-b border-b-gray-800 hover:bg-gray-800 cursor-pointer"
        onClick={() => setOpened(!opened)}
      >
        <div className="w-full">{label}</div>
        <div>
          {opened ? (
            <ChevronUpIcon className="h-4 w-4 text-gray-300 ml-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-gray-300 ml-4" />
          )}
        </div>
      </div>
      {opened && <div>{children}</div>}
    </div>
  )
}
