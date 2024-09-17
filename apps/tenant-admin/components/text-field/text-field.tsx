import { forwardRef } from 'react'
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'

import { Input } from './input'
import { PasswordTextField } from './password-text-field'

type TextFieldProps = {
  label?: string
  value?: string
  name?: string
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'password' | 'email' | 'search'
  helperText?: ReactNode
  endAdornment?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
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
  ) => {
    if (type === 'password') {
      return (
        <PasswordTextField
          ref={ref}
          helperText={helperText}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )
    }

    return (
      <Input
        ref={ref}
        endAdornment={endAdornment}
        helperText={helperText}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    )
  }
)

TextField.displayName = 'TextField'
