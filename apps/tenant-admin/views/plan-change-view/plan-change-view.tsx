import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import {
  getGetTenantQueryKey,
  useGetTenant,
  useSetInitialPlan,
  useSetPlan,
} from '@waypoint/api-tenant-admin'
import { useToast } from '@waypoint/components'

import { FeedbackAlert, PricingPlan } from '../../components'

import { ChangePlanConfirmationModal } from './change-plan-confirmation-modal'
import { SuccessPlanChangeModal } from './success-plan-change-modal'

export const PlanChangeView = () => {
  const [changePlanId, setChangePlanId] = useState<string | null>(null)
  const [opened, setOpened] = useState(false)

  const { push, query } = useRouter()
  const { addToast } = useToast()

  const queryClient = useQueryClient()

  const { data: tenantResponse } = useGetTenant()

  const { mutate: setInitialPlan, isPending } = useSetInitialPlan({
    mutation: {
      onSuccess: (data) => {
        push(data.data.payment_link)
      },
    },
  })

  const handleSetInitialPlan = (planId: string) => {
    const successRedirectUrl = encodeURI(
      (query.redirect as string | undefined) ?? window.location.origin
    )

    setInitialPlan({
      data: {
        plan_id: planId,
        success_url: `${window.location.origin}/plan-change/check?redirect=${successRedirectUrl}`,
        cancel_url: `${window.location.origin}/plan-change`,
      },
    })
  }

  const { mutate, data: updatedSubscriptionData } = useSetPlan({
    mutation: {
      onSuccess: (response) => {
        const data = response.data

        if (data?.schedule) {
          setOpened(true)
        }

        queryClient.invalidateQueries({ queryKey: getGetTenantQueryKey() })
      },
      onError: () => {
        addToast({
          title: 'Error',
          message: 'An error occurred while changing the plan',
          type: 'error',
        })
      },
    },
  })

  const data = tenantResponse?.data

  const handlePlanChange = (planId: string) => {
    // if customer is just showcase we want to call initial plan change
    if (data?.account.type === 'showcase') {
      return handleSetInitialPlan(planId)
    }

    setChangePlanId(planId)
  }

  const handleConfirmPlanChange = (planId: string) => {
    setChangePlanId(null)
    mutate({
      data: {
        plan_id: planId,
      },
    })
  }

  const customer = data?.account.type === 'standard' ? data.account : undefined

  const activePlan = customer?.subscription?.schedule?.scheduled_to
    ? undefined
    : customer?.subscription?.schedule?.new_plan.title
  const updatedActivePlan = updatedSubscriptionData?.data?.schedule
    ?.scheduled_to
    ? undefined
    : updatedSubscriptionData?.data?.schedule?.new_plan.title
  const changeScheduledToFuture =
    customer?.subscription?.schedule?.scheduled_to ||
    updatedSubscriptionData?.data?.schedule?.scheduled_to

  return (
    <>
      {/* Confirmation modal */}
      <ChangePlanConfirmationModal
        planToBeChanged={changePlanId}
        onClose={() => setChangePlanId(null)}
        onConfirm={handleConfirmPlanChange}
      />

      {/* Success modal */}
      <SuccessPlanChangeModal
        opened={opened}
        onClose={() => setOpened(false)}
      />

      {changeScheduledToFuture && (
        <div className="mb-3">
          <FeedbackAlert
            description="Your subscription will be changed on the next billing date."
            title="Your plan has been changed"
          />
        </div>
      )}

      {/* 
        scheduled to => active plan = undefined
      */}
      <PricingPlan
        activePlan={activePlan ?? updatedActivePlan ?? undefined}
        disabled={!!changeScheduledToFuture || isPending}
        handlePlanChange={handlePlanChange}
      />
    </>
  )
}
