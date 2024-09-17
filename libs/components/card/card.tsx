import { classNames } from '../utils'

type CardProps = {
  children: React.ReactNode
  className?: string
  roundedSize?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const Card = ({
  children,
  className = '',
  roundedSize = 'xl',
}: CardProps) => {
  const roundedSizeClass = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  }[roundedSize]

  return (
    <div
      className={classNames(
        'bg-white overflow-hidden ring-1 ring-black ring-opacity-5 shadow',
        roundedSizeClass,
        className
      )}
    >
      {children}
    </div>
  )
}
