type Props = {
  children: React.ReactNode
}

export const AppContainer = ({ children }: Props) => (
  <div className="px-4 py-6 sm:px-8 lg:px-8">{children}</div>
)
