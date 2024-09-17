'use client'

import { forwardRef, useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

import { Input } from './input'

type TextFieldProps = {
  label?: string
  value?: string
  name?: string
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  helperText?: ReactNode
}

export const PasswordTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ onChange, name, label, value, helperText, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <Input
        ref={ref}
        endAdornment={
          <button
            className="absolute right-2 top-0 h-full flex justify-center items-center text-gray-400 hover:text-gray-500"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeSlashIcon aria-hidden="true" className="h-5 w-5" />
            ) : (
              <EyeIcon aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        }
        helperText={helperText}
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        {...rest}
      />
    )
  }
)

PasswordTextField.displayName = 'PasswordTextField'
