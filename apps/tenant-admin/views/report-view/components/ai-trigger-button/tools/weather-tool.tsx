import { SunIcon } from '@heroicons/react/20/solid'

type Props = {
  toolName: string
  location: string
  temperature: string
}

export const WeatherTool = ({ toolName, location, temperature }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <span className="text-gray-400 text-xs">Tool call {toolName}</span>
      <div>
        <p className="font-semibold text-blue-500">{location}</p>
        <div>
          <SunIcon className="h-5 w-5 text-yellow-400" />
          {temperature}°F
        </div>
      </div>
    </div>
  )
}
