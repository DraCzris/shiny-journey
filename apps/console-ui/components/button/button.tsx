import type { ButtonHTMLAttributes } from 'react'

import Link from 'next/link'

import { classNames } from '../../utils'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium'
  to?: string
}

export const Button = ({
  children,
  onClick,
  disabled,
  type,
  variant = 'primary',
  size = 'medium',
  to,
}: Props) => {
  const buttonClasses = {
    primary:
      'bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500 text-white',
    secondary:
      'bg-gray-200 hover:bg-gray-300 focus-visible:outline-gray-300 text-gray-800',
  }

  const sizeClasses = {
    small: 'rounded-md px-2 py-1 text-xs ',
    medium: 'rounded-md px-3 py-2 text-sm ',
  }

  if (to) {
    return (
      <Link
        className={classNames(
          'font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 inline-block',
          buttonClasses[variant],
          sizeClasses[size]
        )}
        href={to}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classNames(
        'font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        buttonClasses[variant],
        sizeClasses[size]
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
