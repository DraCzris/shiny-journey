import { CheckIcon } from '@heroicons/react/24/outline'
import { Button, GlowingBorder } from '@waypoint/components'
import { useState } from 'react'

type Props = {
  buttonText: string
}
export const InterventionActionButton = ({ buttonText }: Props) => {
  const [activated, setActivated] = useState(false)
  if (activated) {
    return (
      <div className="px-3 py-2 pr-5 text-emerald-800 rounded-lg text-sm font-semibold bg-emerald-100 flex items-center">
        <CheckIcon className="size-5 inline mr-3 stroke-2 rounded-full p-1 bg-emerald-500 text-white" />
        <span>Action Completed</span>
      </div>
    )
  }

  return (
    <GlowingBorder className="rounded-[7px] max-w-fit">
      <Button
        size="sm"
        variant="secondary"
        className="border-none ring-0"
        onClick={() => setActivated(true)}
      >
        {buttonText}
      </Button>
    </GlowingBorder>
  )
}
