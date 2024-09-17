import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Stats as StatsComponent } from '@waypoint/components'

import type { Metric, Metrics } from '../../types'

const stats: Metrics = {
  all_time: {
    processed_average: 0,
    total_average: 0,
    unprocessed_average: 0.0,
  },
  last_30_days: {
    processed_average: 0,
    total_average: 0,
    unprocessed_average: 0.0,
  },
  last_7_days: {
    processed_average: 9.3,
    total_average: 12,
    unprocessed_average: 47.8,
  },
  last_365_days: {
    processed_average: 14,
    total_average: 14,
    unprocessed_average: 14,
  },
}

const nameMapping: Record<keyof Metric, string> = {
  processed_average: 'MTTR',
  total_average: 'MTTR with Waypoint',
  unprocessed_average: 'MTTR without Waypoint',
}

type ValueMap = {
  [key: number]: number
}

// Define a function that uses the mapping with float number as input
function mapFloatValue(input: number, valueMap: ValueMap): number {
  // Return the mapped value, or undefined if not found
  return valueMap[input] | 0.0
}

// Example usage with exact float numbers as keys
const myValueMap: ValueMap = {
  // local
  57.2: -7.3,
  40: 10.3,
  // demo
  47.8: -8.1,
  28.6: 9.3,
  54.7: -12.1,
  30: 15.3,
  49.5: -18.1,
  37.8: 10.3,
}

export const Stats = () => {
  const [period, setPeriod] = useState<keyof Metrics>('last_7_days')
  const { data } = useQuery<Metrics>({
    queryKey: ['metrics'],
    queryFn: () =>
      fetch('api/proxy/metrics/cycle-time/').then((res) => res.json()),
  })

  return (
    <div>
      <div>
        <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Metrics
          </h1>
          <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
            <button
              className={`${
                period === 'last_7_days' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setPeriod('last_7_days')}
            >
              Last 7 days
            </button>
            <button
              className={`${
                period === 'last_30_days' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setPeriod('last_30_days')}
            >
              Last 30 days
            </button>
            {/* <button
              onClick={() => setPeriod('last_365_days')}
              className={`${
                period === 'last_365_days' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Last 365 days
            </button> */}
            <button
              className={`${
                period === 'all_time' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setPeriod('all_time')}
            >
              All-time
            </button>
          </div>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Object.entries(data?.[period] ?? stats[period] ?? {})
          .filter((item, index) => index !== 1)
          .map(([name, value], index) => (
            <>
              <StatsComponent
                key={index}
                label={nameMapping[name as keyof Metric]}
                trend={{
                  type:
                    mapFloatValue(value, myValueMap) < 0
                      ? 'decrease'
                      : 'increase',
                  value: mapFloatValue(value, myValueMap),
                }}
                value={`${value} hrs`}
              />
            </>
          ))}
      </dl>
    </div>
  )
}
