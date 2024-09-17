import Link from 'next/link'
import { useForm } from 'react-hook-form'

import type { JiraAPIConfiguration } from '@waypoint/api-tenant-admin'
import { Button } from '@waypoint/components'

import { TextField } from '../../components'

export type FormFields = {
  token: string
  base_url: string
  email: string
}

type Props = {
  defaultValues?: JiraAPIConfiguration | null
  onSubmit: (values: FormFields) => void
}

export const JiraApiConfigForm = ({ defaultValues, onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      token: defaultValues?.token ?? '',
      base_url: defaultValues?.base_url ?? '',
      email: defaultValues?.email ?? '',
    },
  })

  return (
    <form
      noValidate
      className="grid gap-6 mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="border-b border-gray-900/10 pb-6 grid gap-6">
        <TextField
          {...register('email', { required: true })}
          helperText="Email you are using to login to Jira"
          label="E-mail"
        />
        <TextField
          {...register('token', { required: true })}
          helperText={
            <>
              You can generate a token in your{' '}
              <Link
                className="text-blue-500 font-semibold hover:underline"
                href="https://id.atlassian.com/manage-profile/security/api-tokens"
              >
                Atlassian account settings
              </Link>
            </>
          }
          label="API token"
          type="password"
        />
        <TextField
          {...register('base_url', { required: true })}
          helperText="Base URL of your Atlassian workspace (For example: https://waypoint-ai.atlassian.net)"
          label="Base URL"
        />
      </div>
      <div className="flex items-center justify-end gap-x-6">
        <Button href="/integrations" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
