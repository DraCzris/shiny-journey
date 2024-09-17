import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSetInitialPlan } from '@waypoint/api-tenant-admin'
import { Stepper } from '@waypoint/components'

import { PricingPlan, StackedLayout } from 'tenant-admin/components'

export default function SetPlan() {
  const { push, query } = useRouter()

  const { mutate, isPending } = useSetInitialPlan({
    mutation: {
      onSuccess: (data) => {
        push(data.data.payment_link)
      },
    },
  })

  const handlePlanChange = (planId: string) => {
    const successRedirectUrl = encodeURI(
      (query.redirect as string | undefined) ?? window.location.origin
    )

    mutate({
      data: {
        plan_id: planId,
        success_url: `${window.location.origin}/onboarding/set-plan/check?redirect=${successRedirectUrl}`,
        cancel_url: successRedirectUrl,
      },
    })
  }

  return (
    <StackedLayout>
      <Head>
        <title>Choose your plan</title>
      </Head>
      <div className="max-w-6xl w-full m-auto mb-12">
        <Stepper
          steps={[
            {
              id: 'Step 1',
              name: 'Accept Terms & Conditions',
              status: 'complete',
            },
            { id: 'Step 2', name: 'Choose a Plan', status: 'current' },
            { id: 'Step 3', name: 'Connect to Jira', status: 'upcoming' },
          ]}
        />
      </div>

      <PricingPlan
        handlePlanChange={handlePlanChange}
        planChangeLoading={isPending}
      />
    </StackedLayout>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
