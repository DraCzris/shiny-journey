import {
  ChartBarSquareIcon,
  DocumentDuplicateIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid'

import { ReportDataInputCard } from './report-data-input-card'

const features = [
  {
    name: 'Metrics analysis.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ChartBarSquareIcon,
  },
  {
    name: 'Issues Deduplication.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Issue routing.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: UserPlusIcon,
  },
]

export const ReportNotTriggeredView = () => (
  <div className="overflow-hidden 2xl:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl items-center align-middle grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <span className="text-md font-semibold leading-7 text-blue-600">
              Generate report
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Try out Waypoint AI in one easy step
            </h2>
            <p className="mt-4 text-md leading-6 text-gray-600">
              We can analyze data from Jira API or from a CSV file you upload.
              Report will be generated shortly after that.
            </p>
            <dl className="mt-8 max-w-xl space-y-6 text-md leading-7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-5 w-5 text-blue-600"
                    />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ReportDataInputCard />
      </div>
    </div>
  </div>
)
