import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const AvatarGroup = ({ children }: Props) => (
  <div
    className={`flex -space-x-1 overflow-hidden [&>.avatar]:ring-2 [&>.avatar]:ring-white`}
  >
    {children}
  </div>
)
