import Head from 'next/head'
import Image from 'next/image'

import { useConfigureZendesk, useZendeskInfo } from '@waypoint/api-tenant-admin'
import { useToast } from '@waypoint/components'

import { AppContainer } from '../../components'

import { FieldDetection } from './field-detection'
import { ZendeskConfigForm } from './zendesk-config-form'

type Fields = {
  email: string
  token: string
  subdomain: string
}

export const ZendeskIntegration = () => {
  const { addToast } = useToast()

  const { data } = useZendeskInfo({
    query: {
      refetchOnWindowFocus: false,
    },
  })

  const { mutate } = useConfigureZendesk({
    mutation: {
      onSuccess: (data) => {
        if (!data.data.email) {
          return addToast({
            title: 'Oppps!',
            message: 'Something went wrong! Try again later!',
            type: 'error',
          })
        }
      },
      onError: (error) => {
        addToast({
          title: 'Oppps!',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message: error.response?.data?.[0]?.message as string,
          type: 'error',
        })
      },
    },
  })

  const onSubmit = (data: Fields) => {
    mutate({
      data: {
        email: data.email,
        token: data.token,
        subdomain: data.subdomain,
      },
    })
  }

  if (!data?.data) {
    return null
  }

  return (
    <>
      <Head>
        <title>Zendesk integration</title>
      </Head>
      <AppContainer>
        <section className="sm:max-w-xl m-auto">
          <div className="h-12 w-12 m-auto mb-4 flex justify-center items-center rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
            <Image
              alt="Zendesk logo"
              className="w-9 h-9"
              height={100}
              src="/images/zendesk.svg"
              width={100}
            />
          </div>
          <FieldDetection data={data.data.field_for_jira_integration} />

          <h2 className="text-base font-semibold leading-7 text-gray-900">
            2. Zendesk configuration
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Configure your Zendesk integration by adding your Zendesk
            credentials below.
          </p>
          {/* Form for adding zendesk config fields, email, token, api key and submit button */}
          <ZendeskConfigForm
            zendeskInfo={data.data.configuration}
            onSubmit={onSubmit}
          />
        </section>
      </AppContainer>
    </>
  )
}
