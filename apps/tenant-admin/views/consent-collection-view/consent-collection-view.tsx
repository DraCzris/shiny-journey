import { useRouter } from 'next/router'

import { useAcceptTerms } from '@waypoint/api-tenant-admin'
import { Button, Stepper } from '@waypoint/components'

import { Card } from '../../components'

import { TermsAndConditions } from './terms-and-condition'

export const ConsentsCollectionView = () => {
  const { push, query } = useRouter()

  const { mutate, isPending } = useAcceptTerms({
    mutation: {
      onSuccess: (data) => {
        if (data.status !== 200) {
          return
        }

        if (query.redirect === undefined) {
          push('/')

          return
        }

        push(query.redirect as string)
      },
    },
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <section className="max-w-6xl w-full m-auto">
      <div className="mb-12">
        <Stepper
          steps={[
            {
              id: 'Step 1',
              name: 'Accept Terms & Conditions',
              status: 'current',
            },
            { id: 'Step 2', name: 'Choose a Plan', status: 'upcoming' },
            { id: 'Step 3', name: 'Connect to Jira', status: 'upcoming' },
          ]}
        />
      </div>

      <div className="max-w-4x">
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Accept Terms&nbsp;&amp;&nbsp;Conditions
        </p>
      </div>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
        Before you continue you must agree with our Terms and Conditions
      </p>
      <Card className="mt-10 mb-4 max-h-80 overflow-scroll shadow-inner-xl shadow-cyan-500/500">
        <div>
          <TermsAndConditions />
        </div>
      </Card>
      <div className="flex justify-end">
        <Button disabled={isPending} variant="primary" onClick={handleOnClick}>
          Accept
        </Button>
      </div>
    </section>
  )
}
