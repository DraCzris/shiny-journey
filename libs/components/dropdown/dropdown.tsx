import { Fragment } from 'react'

import { Menu, MenuButton, Transition } from '@headlessui/react'

import { classNames } from '../utils'

type Props = {
  children: React.ReactNode
  dropdownButton: React.ReactNode
  ariaLabel?: string
  align?: 'left' | 'right'
}

export const Dropdown = ({
  children,
  dropdownButton,
  ariaLabel,
  align,
}: Props) => {
  const alignStyles =
    align === 'right' ? 'origin-top-right right-1' : 'origin-top-left left-1'

  return (
    <div className="flex items-center gap-x-4 lg:gap-x-6">
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">{ariaLabel ?? 'Menu'}</span>
          <span className="hidden lg:flex lg:items-center">
            {dropdownButton}
          </span>
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={classNames(
              'absolute z-10 mt-2.5 min-w-48 rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5 focus:outline-none',
              alignStyles
            )}
          >
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
