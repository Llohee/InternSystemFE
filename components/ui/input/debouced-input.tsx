import { VariantProps } from 'class-variance-authority'
import React, { useState } from 'react'
import { inputStyles } from './input'
import { spaceRegexFirst } from '@/hooks/regex'

interface DebouncedInputProps extends VariantProps<typeof inputStyles> {
  value: string | number
  onChange: (value: string) => void
  debounce?: number
  icon?: React.ReactNode
  type?: 'text' | 'search'
}
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (value != initialValue) onChange(value.toString())
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <>
      <div
        className={inputStyles({
          intent: props.intent,
          disabled: props.disabled,
          className:
            '!border !border-border-2 !bg-grey-1 !shadow-none ' +
            props.className,
          size: props.size,
        })}
      >
        <div className="relative flex items-center gap-2 z-0">
          {props.icon ?? <></>}
          <input
            {...props}
            type={props.type ? props.type : 'search'}
            autoFocus={value ? true : false}
            value={value}
            onChange={(e) => {
              const value = e.currentTarget.value.replace(spaceRegexFirst, '')
              setValue(value)
            }}
            disabled={props.disabled ?? false}
            className="grow block w-full text-body-3 text-typography-body bg-transparent border-0 appearance-none outline-none peer !shadow-none placeholder:text-placeholder-2 placeholder:text-typography-placeholder"
            placeholder={props.placeholder ?? ' '}
          />
        </div>
      </div>
    </>
  )
}
