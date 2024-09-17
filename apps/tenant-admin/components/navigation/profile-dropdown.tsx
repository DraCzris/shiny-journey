import { Fragment } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { useGetTenant } from '@waypoint/api-tenant-admin'
import { Avatar, classNames } from '@waypoint/components'

const userNavigation = [{ name: 'Sign out', href: '/logout' }]

export const ProfileDropdown = () => {
  const { user } = useUser()
  const { data: response } = useGetTenant()
  const initial = user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? ''

  const data = response?.data

  const accountType = data?.account.type

  return (
    <div className="flex items-center gap-x-4 lg:gap-x-6">
      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5 rounded-lg hover:bg-gray-100">
          <span className="sr-only">Open user menu</span>
          <span className="hidden lg:flex lg:items-center">
            <Avatar initials={initial} size="sm" />
            <span className="ml-3 text-sm font-semibold leading-6">
              {user?.email ?? user?.name ?? 'User'}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="ml-2 h-5 w-5 text-gray-400"
            />
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
          <MenuItems className="absolute right-1 z-10 mt-2.5 min-w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <div className="text-sm p-3 py-1 pb-2 font-medium mb-2 border-b-2 border-gray-100">
              <span>{user?.email ?? user?.name ?? 'User'}</span>

              {accountType === 'showcase' && (
                <div className="w-full flex justify-start mt-1">
                  <span className="inline-block py-0.5 px-1.5 bg-indigo-100 text-[10px] font-semibold rounded-md text-indigo-600">
                    Evaluation
                  </span>
                </div>
              )}
            </div>

            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                    href={item.href}
                  >
                    {item.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
