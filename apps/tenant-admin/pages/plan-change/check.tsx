import { useEffect, useState } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useOnboardingStatus } from '@waypoint/api-tenant-admin'

import { StackedLayout } from 'tenant-admin/components'

export default function SetPlanCheck() {
  const { query, replace } = useRouter()
  const [refetchInterval, setRefetchInterval] = useState<number | false>(1000)

  const redirectUrl = query.redirect as string

  const { data } = useOnboardingStatus({
    query: {
      refetchInterval,
    },
  })

  useEffect(() => {
    // if plan has been selected, redirect to redirectUrl from query
    if (data?.data.has_subscription === true) {
      setRefetchInterval(false)

      replace(redirectUrl)
    }
  }, [data, redirectUrl, replace])

  return (
    <StackedLayout>
      <Head>
        <title>Waypoint AI - Tenant</title>
      </Head>
      <section className="pt-8">
        <div className="max-w-6xl w-full m-auto">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Checking your subscription status...
          </h1>
        </div>
      </section>
    </StackedLayout>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
