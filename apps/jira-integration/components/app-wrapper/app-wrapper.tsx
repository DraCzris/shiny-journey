import { RestProvider } from 'console-ui/components'

export const AppWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const apiUrl = process.env.BACKEND_URL

  return <RestProvider apiUrl={apiUrl}>{children}</RestProvider>
}
