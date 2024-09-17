import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useGetTenant } from '@waypoint/api-tenant-admin'
import { classNames } from '@waypoint/components'

import { getNavigationLinks } from './navigation'

type Props = {
  collapsed?: boolean
}
export const SideNavigation = ({ collapsed }: Props) => {
  const router = useRouter()
  const { data } = useGetTenant()

  const links = getNavigationLinks(data?.data.account.type)

  return (
    <div
      className={classNames(
        'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'lg:w-20 group' : 'lg:w-72'
      )}
    >
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5  border-r border-gray-200 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Image
            alt="Waypoint AI"
            className="h-7 w-7"
            height="28"
            src="/images/waypoint-brand-logo.svg"
            width="28"
          />

          <Image
            alt="Waypoint AI"
            className={classNames(
              'h-7 min-w-[160px] absolute block shrink-0 transition-opacity',
              !collapsed ? 'opacity-100' : 'opacity-0'
            )}
            height="28"
            src="/images/waypoint-logo.svg"
            width="164"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7" role="list">
            <li>
              <ul className="-mx-2 space-y-1" role="list">
                {links.map((item) => {
                  const isActive = router.pathname === item.href

                  return (
                    <li key={item.name}>
                      <Link
                        className={classNames(
                          isActive
                            ? 'bg-blue-100/80 text-blue-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                          'group/link flex gap-x-3 rounded-md p-2 px-2.5 text-sm leading-6 font-semibold'
                        )}
                        href={item.href}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            isActive
                              ? 'text-blue-600'
                              : 'text-gray-400 group-hover/link:text-blue-600',
                            'h-6 w-6 shrink-0'
                          )}
                        />
                        <span
                          className={classNames(
                            'whitespace-nowrap transition-opacity duration-300 ease-in-out',
                            collapsed ? 'opacity-0' : 'opacity-100'
                          )}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </nav>
        {data?.data.account.type === 'showcase' && (
          <div
            className={classNames(
              'bg-indigo-100 p-4 rounded-md text-sm',
              collapsed
                ? 'opacity-0 w-0 h-0'
                : 'opacity-100 transition-all duration-300 ease-in-out delay-150'
            )}
          >
            <p className="text-indigo-900 font-semibold mb-1">
              Evaluate Waypoint AI
            </p>
            <p className="text-gray-700">You are using Evaluation account.</p>
          </div>
        )}
        {/* For now hide upgrade account possibility */}
        {/* {data?.data.account.type === 'showcase' && (
          <div className="bg-blue-100/80 p-4 rounded-md text-sm">
            <p className="text-gray-900 font-semibold mb-2">
              Upgrade to Standard account
            </p>
            <p className="text-gray-700 mb-3">
              Get access to more features and integrations. Upgrade your account
              to the Standard plan.
            </p>
            <Button href="/plan-change" variant="text">
              Upgrade now
            </Button>
          </div>
        )} */}
      </div>
    </div>
  )
}
