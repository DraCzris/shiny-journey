import type {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react'

import Link from 'next/link'

import { classNames } from '../utils'

type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'primary-soft'
  | 'error'
  | 'text'
type ButtonSizes = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children?: ReactNode | string
  variant?: ButtonVariants
  size?: ButtonSizes
  href?: string
  target?: string
  disabled?: boolean
  fullWidth?: boolean
  startAdornment?: ReactElement
  className?: string
  onClick?: (
    e: MouseEvent<HTMLAnchorElement & HTMLButtonElement>
  ) => unknown | Promise<unknown>
} & (
  | {
      href: string
      onClick?: (e: MouseEvent<HTMLAnchorElement>) => unknown | Promise<unknown>
      target?: string
    }
  | ({
      onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown | Promise<unknown>
    } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>)
)

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  href,
  disabled,
  fullWidth,
  startAdornment,
  className,
  target,
  ...rest
}: ButtonProps) => {
  const classesPerVariant: Record<ButtonVariants | 'disabled', string> = {
    primary:
      'rounded-md text-center bg-blue-600 dark:bg-blue-500 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-500',
    secondary:
      'rounded-md text-center bg-white dark:bg-white/10 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 dark:ring-0 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-white/20',
    'primary-soft':
      'rounded-md text-center bg-blue-100 dark:bg-blue-100 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100 dark:hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-50 dark:focus-visible:outline-blue-50',
    disabled:
      'rounded-md text-center bg-gray-900/10 dark:bg-gray-100/10 text-sm font-semibold text-gray-400 dark:text-gray-600',
    error:
      'rounded-md text-center bg-red-600 dark:bg-red-700 text-sm font-semibold text-white shadow-sm hover:bg-red-500 dark:hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:focus-visible:outline-red-500',
    text: 'text-blue-600 text-sm font-semibold dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400',
  }

  const buttonSizeClasses: Record<ButtonSizes, string> = {
    sm: 'px-4 py-1.5',
    md: 'px-5 py-2',
    lg: 'px-6 py-2.5',
  }

  const startAdornmentClasses =
    'inline-flex items-center gap-x-2.5 justify-center'

  const variantStyle = disabled
    ? classesPerVariant.disabled
    : classesPerVariant[variant]

  const classes = classNames(
    variantStyle,
    variant === 'text' ? '' : buttonSizeClasses[size],
    fullWidth ? 'w-full' : '',
    startAdornment ? startAdornmentClasses : '',
    className || ''
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} target={target}>
        {startAdornment}
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {startAdornment}
      {children}
    </button>
  )
}
