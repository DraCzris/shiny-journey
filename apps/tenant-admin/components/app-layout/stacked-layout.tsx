import { Fragment } from 'react'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const userNavigation = [{ name: 'Sign out', href: '/logout' }]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = { children: React.ReactNode }
export const StackedLayout = ({ children }: Props) => {
  const { user } = useUser()

  return (
    <>
      <div className="min-h-full">
        <div className="bg-white lg:border-b lg:border-blue-400 lg:border-opacity-25">
          <Disclosure as="nav" className=" bg-white">
            {({ open }) => (
              <>
                <div className="mx-auto px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0">
                        <Image
                          alt="logo"
                          height={64}
                          src="/images/waypoint-logo.svg"
                          width={128}
                        />
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-blue-200 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            aria-hidden="true"
                            className="block h-6 w-6"
                          />
                        ) : (
                          <Bars3Icon
                            aria-hidden="true"
                            className="block h-6 w-6"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                          <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <span className="hidden lg:flex lg:items-center">
                              <span
                                aria-hidden="true"
                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                              >
                                {user?.name ?? user?.email ?? ''}
                              </span>
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="ml-2 h-5 w-5 text-gray-400"
                              />
                            </span>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
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
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="border-t border-blue-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0"></div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-900">
                          {user?.name ?? user?.email ?? ''}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75"
                          href={item.href}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <main className="mt-10">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
