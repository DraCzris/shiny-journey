'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  children: React.ReactNode
  token?: string
}

const queryClient = new QueryClient()

export const RestProvider = ({ children }: Props) => {
  // Set base URL for all axios requests
  axios.defaults.baseURL = '/api/proxy/'

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
