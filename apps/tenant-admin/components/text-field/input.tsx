import { forwardRef } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

type TextFieldProps = {
  label?: string
  value?: string
  name?: string
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'password' | 'email' | 'search'
  helperText?: ReactNode
  endAdornment?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      onChange,
      name,
      label,
      value,
      type = 'text',
      helperText,
      endAdornment,
      ...rest
    },
    ref
  ) => (
    <div className="sm:col-span-3">
      {label && (
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="mt-2 relative">
        <input
          ref={ref}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e)}
          {...rest}
        />
        {!!endAdornment && (
          <div className="absolute right-2 top-0 h-full flex justify-center items-center">
            {endAdornment}
          </div>
        )}
      </div>
      {helperText && (
        <p className="mt-2 text-sm leading-6 text-gray-600">{helperText}</p>
      )}
    </div>
  )
)

Input.displayName = 'Input'
