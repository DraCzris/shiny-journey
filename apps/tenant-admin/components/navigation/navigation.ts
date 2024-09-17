import {
  HomeIcon,
  PresentationChartLineIcon,
  PuzzlePieceIcon,
  RectangleStackIcon,
  SquaresPlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

import type { AccountType } from '@waypoint/api-tenant-admin'

export const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: 'Account',
    href: '/account',
    icon: UserIcon,
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Plan change',
    href: '/plan-change',
    icon: RectangleStackIcon,
  },
  {
    name: 'Escalation dashboard',
    href: '/report',
    icon: PresentationChartLineIcon,
  },
]

export const getNavigationLinks = (accountType: AccountType | undefined) => {
  if (!accountType) {
    return []
  }

  if (accountType === 'standard') {
    return [
      {
        name: 'Dashboard',
        href: '/',
        icon: HomeIcon,
      },
      {
        name: 'Account',
        href: '/account',
        icon: UserIcon,
      },
      {
        name: 'Integrations',
        href: '/integrations',
        icon: SquaresPlusIcon,
      },
      {
        name: 'Plan change',
        href: '/plan-change',
        icon: RectangleStackIcon,
      },
      {
        name: 'Escalation dashboard',
        href: '/report',
        icon: PresentationChartLineIcon,
      },
    ]
  }

  // Showcase account
  return [
    {
      name: 'Escalation dashboard',
      href: '/report',
      icon: PresentationChartLineIcon,
    },
    {
      name: 'Integrations',
      href: '/integrations',
      icon: SquaresPlusIcon,
    },
  ]
}
