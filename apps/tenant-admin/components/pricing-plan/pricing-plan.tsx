import { useGetPlans } from '@waypoint/api-tenant-admin'

import { PricingPlanTierItem } from './pricing-plan-tier-item'

const features = {
  FREE: [
    '15 bugs analyzed per month',
    'Email support',
    '90 day bug history',
    'AI generated bug analysis',
    'Jira integration',
    'Slack integration',
    'Quality assurance (QA) Test cases',
    'Unlimited users',
  ],
  ESSENTIALS: [
    '50 bugs analyzed per month',
    'Email & chat support',
    '365 day bug history',
    'AI generated bug analysis',
    'Jira integration',
    'Slack integration',
    'Quality assurance (QA) Test cases',
    'Unlimited users',
    'Bug history timeline',
    'Related issues',
    'Suggested Triage Questions',
    'Personalized Coaching',
    'Localize to Multiple Languages',
    'Create Bugs from Slack using AI',
  ],
  PRO: [
    '100 bugs analyzed per month',
    'Email & chat support',
    'unlimited bug history',
    'AI generated bug analysis',
    'Jira integration',
    'Slack integration',
    'Quality assurance (QA) Test cases',
    'Unlimited users',
    'Bug history timeline',
    'Related issues',
    'Suggested Triage Questions',
    'Personalized Coaching',
    'Localize to Multiple Languages',
    'Create Bugs from Slack using AI',
    'Confluence Integration',
    'Github Integration',
    'Custom Prompts',
    'Code Repo Analysis',
  ],
  ENTERPRISE: [
    'unlimited bugs analyzed per month',
    'Email & chat support',
    'unlimited bug history',
    'AI generated bug analysis',
    'Jira integration',
    'Slack integration',
    'Quality assurance (QA) Test cases',
    'Unlimited users',
    'Bug history timeline',
    'Related issues',
    'Suggested Triage Questions',
    'Personalized Coaching',
    'Localize to Multiple Languages',
    'Create Bugs from Slack using AI',
    'Confluence Integration',
    'Github Integration',
    'Custom Prompts',
    'Code Repo Analysis',
    'Bring Your Own Model (BYOM)',
    'Dedicated Tenants',
    'On-prem Deployments',
  ],
}

const tiers = {
  FREE: {
    description: 'Start solving Jira bugs faster.',
    features: [
      '15 bugs analyzed per month',
      'Email support',
      '90 day bug history',
      'AI generated bug analysis',
      'Jira integration',
      'Slack integration',
      'Quality assurance (QA) Test cases',
      'Unlimited users',
    ],
  },
  ESSENTIALS: {
    description: 'Core bug analytics & QA automation for small teams.',
    features: [
      '50 bugs analyzed per month',
      'Email & chat support',
      '365 day bug history',
      'AI generated bug analysis',
      'Jira integration',
      'Slack integration',
      'Quality assurance (QA) Test cases',
      'Unlimited users',
      'Bug history timeline',
      'Related issues',
      'Suggested Triage Questions',
      'Personalized Coaching',
      'Localize to Multiple Languages',
      'Create Bugs from Slack using AI',
    ],
  },
  PRO: {
    description: 'Advanced tools, customization & integrations.',
    features: [
      '100 bugs analyzed per month',
      'Email & chat support',
      'unlimited bug history',
      'AI generated bug analysis',
      'Jira integration',
      'Slack integration',
      'Quality assurance (QA) Test cases',
      'Unlimited users',
      'Bug history timeline',
      'Related issues',
      'Suggested Triage Questions',
      'Personalized Coaching',
      'Localize to Multiple Languages',
      'Create Bugs from Slack using AI',
      'Confluence Integration',
      'Github Integration',
      'Custom Prompts',
      'Code Repo Analysis',
    ],
  },
  ENTERPRISE: {
    description: 'Custom solutions for Engineering, Product & QA teams!',
    features: [
      'unlimited bugs analyzed per month',
      'Email & chat support',
      'unlimited bug history',
      'AI generated bug analysis',
      'Jira integration',
      'Slack integration',
      'Quality assurance (QA) Test cases',
      'Unlimited users',
      'Bug history timeline',
      'Related issues',
      'Suggested Triage Questions',
      'Personalized Coaching',
      'Localize to Multiple Languages',
      'Create Bugs from Slack using AI',
      'Confluence Integration',
      'Github Integration',
      'Custom Prompts',
      'Code Repo Analysis',
      'Bring Your Own Model (BYOM)',
      'Dedicated Tenants',
      'On-prem Deployments',
    ],
  },
}

type Props = {
  handlePlanChange: (planId: string) => void
  planChangeLoading?: boolean
  activePlan?: string
  disabled?: boolean
}

export const PricingPlan = ({
  handlePlanChange,
  activePlan,
  planChangeLoading,
  disabled,
}: Props) => {
  const { data } = useGetPlans()

  const currentPlanTitle =
    activePlan ||
    (data?.data.current_subscription
      ? data.data.current_subscription.data.title
      : null)

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-blue-600">
          Pricing
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Pricing plans for teams of&nbsp;all&nbsp;sizes
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Choose an affordable plan that’s packed with the best features for your
        company and your needs.
      </p>
      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {data?.data.plans.map((tier) => (
          <PricingPlanTierItem
            key={tier.id}
            description={tiers[tier.title as keyof typeof features].description}
            disabled={disabled}
            features={
              tier.title in features
                ? features[tier.title as keyof typeof features]
                : []
            }
            highlighted={tier.title === 'ESSENTIALS'}
            id={tier.id}
            isCurrent={tier.title === currentPlanTitle}
            name={tier.title}
            planChangeLoading={planChangeLoading}
            price={`$${tier.price}`}
            onSelect={handlePlanChange}
          />
        ))}
        {/* Hidden Enterprise plan - Custom */}
        {/* <PricingPlanTierItem
          isCurrent={false}
          disabled={disabled}
          withoutPeriod
          price="Custom"
          name="ENTERPRISE"
          description={''}
          key="ENTERPRISE"
          id="ENTERPRISE"
          features={features['ENTERPRISE']}
          onSelect={() => console.log('click')}
          customButton={
            <a
              href="mailto:contact@mywaypoint.ai"
              aria-describedby="tier-enterprise"
              className={classNames(
                'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300',
                'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              )}
            >
              Contact sales
            </a>
          }
        /> */}
      </div>
    </div>
  )
}
