import Link from 'next/link'
import { useForm } from 'react-hook-form'

import type { ZendeskInfoConfiguration } from '@waypoint/api-tenant-admin'
import { Button } from '@waypoint/components'

import { TextField } from '../../components'

type Fields = {
  email: string
  token: string
  subdomain: string
}

type Props = {
  zendeskInfo?: ZendeskInfoConfiguration
  onSubmit: (data: Fields) => void
}
export const ZendeskConfigForm = ({ zendeskInfo, onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<Fields>({
    defaultValues: {
      email: zendeskInfo?.email,
      token: zendeskInfo?.token,
      subdomain: zendeskInfo?.subdomain,
    },
  })

  const handleOnSubmit = (data: Fields) => {
    onSubmit(data)
  }

  return (
    <form
      noValidate
      className="grid gap-6 mt-6"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="border-b border-gray-900/10 pb-12 grid gap-6">
        <TextField
          {...register('email', {
            required: true,
          })}
          helperText="Your email address for Zendesk account"
          label="E-mail"
        />
        <TextField
          {...register('token', { required: true })}
          helperText={
            <>
              API token for Zendesk account. You can generate one{' '}
              <Link
                className="text-blue-600 hover:text-blue-500"
                href="https://support.zendesk.com/hc/en-us/articles/226022787-Generating-a-new-API-token-"
              >
                here
              </Link>
            </>
          }
          label="Zendesk token"
          type="password"
        />
        <TextField
          {...register('subdomain', { required: true })}
          helperText="Your Zendesk subdomain (https://<subdomain>.zendesk.com)"
          label="Subdomain"
        />
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button href="/integrations" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
