import Image from 'next/image'

import type { IntegrationCustomAction } from '@waypoint/api-tenant-admin'
import { Button } from '@waypoint/components'

export type IntegrationOptions = {
  title: string
  description: string
  icon: string
  href?: string
  cta: string
  enabled: boolean
  customAction: IntegrationCustomAction
}

export const IntegrationCard = ({
  title,
  description,
  icon,
  href,
  cta,
  enabled,
  customAction,
}: IntegrationOptions) => {
  const hasCustomAction = customAction === 'enterprise-only'
  const contactUsPageUrl = `${process.env.NEXT_PUBLIC_MARKETING_WEB_URL}/contact`

  const link = hasCustomAction
    ? {
        href: contactUsPageUrl,
        target: '_blank',
      }
    : {
        href,
      }

  const actionName = hasCustomAction ? 'Contact us' : cta

  return (
    <li
      key={title}
      className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex items-center gap-x-4">
          <div className="h-12 w-12 flex justify-center items-center rounded-lg bg-white object-cover ring-1 ring-gray-900/10">
            <Image
              alt={title}
              className="h-9 w-9"
              height={48}
              src={icon}
              width={48}
            />
          </div>
          <div className="text-m font-medium leading-6 text-gray-900">
            {title}
          </div>
        </div>
        <div>
          <Button disabled={!enabled} href={link.href} target={link.target}>
            {enabled ? actionName : 'Not available'}
          </Button>
        </div>
      </div>
      <div className="bg-white py-4 px-6">
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  )
}
