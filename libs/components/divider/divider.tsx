import { classNames } from '../utils'

type Props = {
  className?: string
  label?: string
}
export const Divider = ({ className = '', label }: Props) => (
  <div className={classNames('relative', className)}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
    {label && (
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-gray-500">{label}</span>
      </div>
    )}
  </div>
)
