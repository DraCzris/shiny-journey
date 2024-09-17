import { UserGroupIcon } from '@heroicons/react/20/solid'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { RerouteEventData } from '@waypoint/api-tenant-admin'
import { Avatar } from '@waypoint/components'

type Props = {
  data?: RerouteEventData | null
}

export const RerouteContent = ({ data }: Props) => {
  return (
    <section>
      <p className="text-gray-800 font-semibold mb-2">Reassign:</p>

      <div className="flex gap-1 items-center">
        <div className="flex gap-2 items-center">
          {/* <Avatar size="xs" />
          <p className="text-sm">{data?.assignee_from}</p> */}
          <UserGroupIcon className="size-8 text-blue-600 rounded-full bg-blue-50 p-1" />
          <p className="text-sm font-semibold">Backend</p>
        </div>
        <ArrowLongRightIcon className="h-5 w-5 inline text-blue-600 mx-2" />
        <div className="flex gap-2 items-center">
          {/* <Avatar size="xs" />
          <p className="text-sm">{data?.assignee_to}</p> */}
          <UserGroupIcon className="size-8 text-blue-600 rounded-full bg-blue-50 p-1" />
          <p className="text-sm font-semibold">Frontend</p>
        </div>
      </div>
    </section>
  )
}
