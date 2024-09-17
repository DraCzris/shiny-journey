import { UnmetRequirementsList as UnmetRequirementsListType } from '@waypoint/api-tenant-admin'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
type Props = {
  item: UnmetRequirementsListType
}
export const UnmetRequirementsList = ({ item }: Props) => {
  return (
    <div>
      <p className="text-gray-800 font-semibold mb-3">Requirements:</p>
      <ul className="text-gray-700 px-4 flex gap-4 flex-col">
        {item.data.map((item, index) => (
          <li key={index}>
            <div className="flex flex-wrap">
              <div className="flex gap-3 items-center">
                {item.is_fulfilled ? (
                  <div className="bg-blue-50 ring-1 ring-blue-600 inline-block p-1 rounded-md">
                    <CheckIcon className="h-4 w-4 text-blue-600 stroke-[2.5px]" />
                  </div>
                ) : (
                  <div className="bg-red-50 h-6 w-6 inline-block p-1 ring-1 ring-red-600 rounded-md">
                    <XMarkIcon className="h-4 w-4 text-red-600 stroke-[2.5px]" />
                  </div>
                )}

                <p className="text-md font-semibold text-gray-800">
                  {item.requirement.definition}
                </p>
              </div>
              {item.question && (
                <p className="text-sm text-gray-600 pl-9">{item.question}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
