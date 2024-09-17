'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'

import { getEnvironmentConfig } from '@waypoint/environment'

type Props = {
  children: React.ReactNode
  apiUrl: string | undefined
}

const queryClient = new QueryClient()

export const RestProvider = ({ children, apiUrl }: Props) => {
  const host = typeof window !== 'undefined' ? window.location.host : ''

  const { JIRA_INTEGRATION_BACKEND_API_URL } = getEnvironmentConfig(host)

  // Set base URL for all axios requests
  axios.defaults.baseURL = apiUrl ?? JIRA_INTEGRATION_BACKEND_API_URL

  // Set default headers for all axios requests
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    'Content-Type': 'application/json',
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
