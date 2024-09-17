import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useMutation } from '@tanstack/react-query'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Button } from '@waypoint/components'

import { StackedLayout } from '../../components'
import type { LinkAccountResponse } from '../../types'

export default function Link() {
  const { query, push } = useRouter()
  const id = query.id as string

  // asking internal API for link to redirect
  const { mutate, isPending } = useMutation<LinkAccountResponse>({
    mutationKey: ['apiLink'],
    mutationFn: () => fetch(`/api/link/${id}`).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data.url) {
        return
      }

      if (data.url) {
        push(data.url)

        return
      }

      push('/')
    },
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <StackedLayout>
      <Head>
        <title>Waypoint AI - Link Account</title>
      </Head>
      <section className="pt-8">
        <div className="mb-6">
          <h2 className="text-base text-center font-semibold leading-7 text-blue-600">
            Connect
          </h2>
          <h1 className="text-3xl font-bold text-center">
            Connect Waypoint AI ✨ with Jira
          </h1>
        </div>

        <div className="flex gap-2 justify-center mb-8 items-center">
          <div>
            <Image alt="logo" height={64} src="/images/jira.svg" width={64} />
          </div>

          {/* divider */}
          <div className="relative w-32">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-dashed border-t-2" />
            </div>
            <div className="relative flex justify-center">
              <CheckCircleIcon className="h-14 w-14 text-emerald-500 bg-gray-50 p-2" />
            </div>
          </div>

          <div>
            <Image
              alt="logo"
              height={70}
              src="/images/waypoint-brand-logo.svg"
              width={70}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            disabled={isPending}
            variant="primary"
            onClick={handleOnClick}
          >
            Finish integration
          </Button>

          <Button href="/" variant="secondary">
            Cancel
          </Button>
        </div>
      </section>
    </StackedLayout>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
