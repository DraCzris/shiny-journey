import type { ReactElement } from 'react'
import { useState } from 'react'

import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'

import type { AccountType } from '@waypoint/api-tenant-admin'
import { useSetAccountType } from '@waypoint/api-tenant-admin'
import { Button, classNames, useToast } from '@waypoint/components'

import { StackedLayout } from 'tenant-admin/components'

export default function ConsentsCollection() {
  const { push, query } = useRouter()

  const { mutate } = useSetAccountType({
    mutation: {
      onSuccess: (data) => {
        if (data.data.account_type) {
          if (query.redirect === undefined) {
            push('/')

            return
          }

          push(query.redirect as string)

          addToast({
            title: 'Account type updated',
            message: `Your account type has been updated to ${data.data.account_type}`,
            type: 'success',
          })
        }
      },
      onError: (error) => {
        addToast({
          title: 'Error',
          message: error.message,
          type: 'error',
        })
      },
    },
  })

  const { addToast } = useToast()

  const [selectedAccountType, setSelectedAccountType] =
    useState<AccountType>('standard')

  const handleAccountType = () => {
    mutate({
      data: {
        type: selectedAccountType,
      },
    })
  }

  const accountTypesOptions: Record<
    AccountType,
    { name: string; value: string; description?: ReactElement }
  > = {
    standard: {
      name: 'Standard',
      value: 'standard',
      description: <>Standard account type with all features</>,
    },
    showcase: {
      name: 'Evaluation',
      value: 'showcase',
      description: (
        <>
          <p>
            Evaluation account type with limited features - easy setup for free
          </p>
          <div className="text-xs mt-2 font-semibold inline-block text-gray-800">
            No card required
          </div>
        </>
      ),
    },
  }

  return (
    <StackedLayout>
      <Head>
        <title>Waypoint AI - Choose account you want to use</title>
      </Head>

      <h1 className="text-2xl font-semibold mb-2">Choose account type</h1>
      <p className="text-gray-700 text-md mb-6">
        Choose the account type that best suits your needs. You can change this
        later.
      </p>
      <fieldset aria-label="Account type">
        <RadioGroup
          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6"
          value={selectedAccountType}
          onChange={setSelectedAccountType}
        >
          {Object.values(accountTypesOptions).map((account) => (
            <Radio
              key={account.value}
              aria-label={account.name}
              className={({ focus, checked }) =>
                classNames(
                  focus ? 'border-blue-600 ring-2 ring-blue-600' : '',
                  !focus ? 'border-gray-300' : '',
                  checked ? 'bg-blue-50' : 'bg-white',
                  'relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none'
                )
              }
              value={account.value}
            >
              {({ checked, focus }) => (
                <>
                  <div className="flex justify-between">
                    <span
                      className={classNames(
                        'text-md font-semibold  mb-2',
                        checked ? 'text-blue-900' : 'text-gray-900'
                      )}
                    >
                      {account.name}
                    </span>
                    <CheckCircleIcon
                      aria-hidden="true"
                      className={classNames(
                        !checked ? 'invisible' : '',
                        'h-5 w-5 text-blue-600'
                      )}
                    />
                  </div>
                  <span
                    className={classNames(
                      'block text-sm',
                      checked ? 'text-blue-700' : 'text-gray-500'
                    )}
                  >
                    {account.description}
                  </span>

                  <span
                    aria-hidden="true"
                    className={classNames(
                      checked ? 'border-blue-600' : 'border-transparent',
                      focus ? 'border' : 'border-2',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                  />
                </>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
      <div className="flex justify-end">
        <Button className="mt-6" variant="primary" onClick={handleAccountType}>
          Continue
        </Button>
      </div>
    </StackedLayout>
  )
}

// You can optionally pass your own `getServerSideProps` function into
// `withPageAuthRequired` and the props will be merged with the `user` prop
export const getServerSideProps = withPageAuthRequired()
