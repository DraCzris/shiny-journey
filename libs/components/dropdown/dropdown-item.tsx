import type { ReactElement } from 'react'

import { Menu } from '@headlessui/react'

type Props = {
  disabled?: boolean
  children:
    | ReactElement
    | ((props: { active: boolean; disabled: boolean }) => ReactElement)
}

export const DropDownItem = ({ children, disabled }: Props) => (
  <Menu.Item disabled={disabled}>
    {({ active, disabled }) =>
      typeof children === 'function' ? children({ active, disabled }) : children
    }
  </Menu.Item>
)
