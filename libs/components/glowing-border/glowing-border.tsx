import { ReactNode } from 'react'
import { classNames } from '../utils'

type Props = {
  children: ReactNode
  className?: string
  variant?: 'rainbow' | 'blue'
}
export const GlowingBorder = ({
  children,
  className,
  variant = 'rainbow',
}: Props) => {
  return (
    <div
      className={classNames(
        'relative p-[1px] -m-[2px] overflow-hidden w-full',
        className ?? ''
      )}
    >
      <div className="animate-[rotate_4s_linear_infinite] duration-700 h-full absolute w-full">
        <div
          className={classNames(
            'pt-[100%] absolute w-full top-2/4 -translate-y-2/4 bg-gray-100',
            variant === 'blue'
              ? 'bg-[conic-gradient(#80bbff_0deg,#73b2fb_112.5deg,#2a8af6_228.75deg,rgba(42,138,246,0)_360deg)]'
              : '',
            variant === 'rainbow'
              ? 'bg-[conic-gradient(#e92a67_0deg,#a853ba_112.5deg,#2a8af6_228.75deg,rgba(42,138,246,0)_360deg)]'
              : ''
          )}
        ></div>
      </div>
      <div className="w-full h-full relative">{children}</div>
    </div>
  )
}
