import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const spinnerStyles = cva('text-grey-5 animate-spin stroke-0', {
  variants: {
    intent: {
      primary: 'fill-primary-base',
      neutral: 'fill-black',
    },
    size: {
      small: 'size-5',
      medium: 'size-10',
      large: 'size-20',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
})

interface SpinnerProps extends VariantProps<typeof spinnerStyles> {
  className?: string
}

export const Spinner = (props: SpinnerProps) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={spinnerStyles({
        intent: props.intent,
        size: props.size,
        className: props.className,
      })}
    >
      <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" />
    </svg>
  )
}

export const BackgroundFetchingSpinner = () => {
  return (
    <svg
      width="32"
      height="32"
      stroke="#000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-grey-9/40 stroke-[1.5px]"
    >
      <g className="spinner_V8m1">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
      </g>
    </svg>
  )
}
