import type { ChangeEvent, ReactNode } from 'react'
import { forwardRef } from 'react'

type CheckboxProps = {
  label?: string
  checked?: boolean
  value?: string
  name?: string
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  helperText?: ReactNode
  defaultChecked?: boolean
  defaultValues?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, helperText, ...rest }, ref) => (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          ref={ref}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          id={name}
          name={name}
          type="checkbox"
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          className="font-medium text-gray-900 cursor-pointer select-none"
          htmlFor={name}
        >
          {label}
        </label>
        <p className="text-gray-500">{helperText}</p>
      </div>
    </div>
  )
)

Checkbox.displayName = 'Checkbox'
