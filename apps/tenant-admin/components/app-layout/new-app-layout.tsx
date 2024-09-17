import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ProfileDropdown, SideNavigation } from '../navigation'
import { navigation } from '../navigation/navigation'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  sectionName?: string
  endAdornment?: React.ReactNode
  children: React.ReactNode
}

const widePages: string[] = ['/report(.*)']

export const NewAppLayout = ({
  children,
  sectionName,
  endAdornment,
}: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const [isWidePage, setIsWidePage] = useState(false)

  useEffect(() => {
    setIsNavigationCollapsed(isWidePage || isNarrow)
  }, [isWidePage, isNarrow])

  useEffect(() => {
    const isWidePage = Boolean(
      widePages.find((regex) => new RegExp(regex, 'g').test(router.asPath))
    )

    setIsWidePage(isWidePage)
  }, [router.asPath])

  useEffect(() => {
    const handler = () => {
      setIsNarrow(window.innerWidth < 1280)
    }

    handler()

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  // check if user scrolled from top to show shadow
  const [scrollY, setScrollY] = useState(0)
  const handleScroll = () => setScrollY(window.scrollY)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Transition.Root as={Fragment} show={sidebarOpen}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      className="-m-2.5 p-2.5"
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </button>
                  </div>
                </Transition.Child>

                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#f8fafc] px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      alt="logo"
                      height="48"
                      src="/images/waypoint-logo.svg"
                      width="180"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7" role="list">
                      <li>
                        <ul className="-mx-2 space-y-1" role="list">
                          {navigation.map((item) => {
                            const isActive = router.pathname === item.href

                            return (
                              <li key={item.name}>
                                <Link
                                  className={classNames(
                                    isActive
                                      ? 'bg-blue-100/80 text-blue-600 '
                                      : 'text-gray-800 hover:text-white hover:bg-blue-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                  href={item.href}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      isActive
                                        ? 'text-blue-600'
                                        : 'text-gray-800 group-hover:text-white',
                                      'h-6 w-6 shrink-0'
                                    )}
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <SideNavigation collapsed={isNavigationCollapsed} />

      <div
        className={classNames(
          'transition-all duration-300 ease-in-out',
          isNavigationCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        )}
      >
        <div
          className={classNames(
            'sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8 bg-[#f8fafc] transition-all duration-200 ease-in-out',
            scrollY > 5 ? 'shadow' : ''
          )}
        >
          <button
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            type="button"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-900/10 lg:hidden"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <h3 className="font-semibold text-lg">{sectionName}</h3>
            </div>
            {endAdornment}

            <ProfileDropdown />
          </div>
        </div>

        <main>{children}</main>
      </div>
    </>
  )
}
