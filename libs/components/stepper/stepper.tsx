type Step = {
  id: string
  name: string
  status: 'complete' | 'current' | 'upcoming'
}

type Props = {
  steps: Step[]
}

export const Stepper = ({ steps }: Props) => (
  <nav aria-label="Progress">
    <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0" role="list">
      {steps.map((step) => (
        <li key={step.name} className="md:flex-1">
          {step.status === 'complete' ? (
            <div className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4  md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          ) : step.status === 'current' ? (
            <div
              aria-current="step"
              className="flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
            >
              <span className="text-sm font-medium text-blue-600">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          ) : (
            <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4  md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-gray-500 ">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  </nav>
)
