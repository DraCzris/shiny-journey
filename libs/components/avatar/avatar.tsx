import type { ReactElement } from 'react'

import { UserIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import { classNames } from '../utils'

type Size = 'xs' | 'sm' | 'md' | 'lg'

const sizeClass: Record<
  Size,
  { style: string; width: number; height: number }
> = {
  xs: {
    style: 'h-6 w-6 text-xs',
    width: 24,
    height: 24,
  },
  sm: {
    style: 'h-8 w-8 text-sm',
    width: 32,
    height: 32,
  },
  md: {
    style: 'h-12 w-12 text-md',
    width: 48,
    height: 48,
  },
  lg: {
    style: 'h-16 w-16 text-lg',
    width: 64,
    height: 64,
  },
}

type Props = {
  size?: Size
  alt?: string
  src?: string
  children?: ReactElement
  initials?: string
  className?: string
}

export const Avatar = ({
  size = 'md',
  alt,
  children,
  src,
  initials,
  className = '',
}: Props) => {
  if (initials) {
    return (
      <div
        className={classNames(
          'avatar overflow-hidden',
          sizeClass[size].style,
          'rounded-full inline-flex items-center justify-center font-semibold leading-6 text-blue-500 bg-blue-100',
          className
        )}
      >
        {initials}
      </div>
    )
  }

  if (children) {
    return (
      <div
        className={classNames(
          'avatar overflow-hidden',
          sizeClass[size].style,
          'rounded-full inline-block',
          className
        )}
      >
        {children}
      </div>
    )
  }

  if (src) {
    return (
      <Image
        className={classNames(
          'avatar overflow-hidden',
          sizeClass[size].style,
          'rounded-full inline-block',
          className
        )}
        src={src}
        width={sizeClass[size].width}
        height={sizeClass[size].height}
        alt={alt ?? ''}
      />
    )
  }

  return (
    <div
      className={classNames(
        'avatar overflow-hidden',
        sizeClass[size].style,
        'rounded-full inline-block p-1 bg-blue-100',
        className
      )}
    >
      <UserIcon className="h-full w-full text-blue-600" />
    </div>
  )
}
