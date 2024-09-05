import React from 'react'
import { cva, cx, VariantProps } from 'class-variance-authority'

const emptyViewStyles = cva(
  'rounded-lg flex flex-col items-center justify-center h-full [&>img]:select-none [&>img]:pointer-events-none',
  {
    variants: {
      intent: {
        solid: 'border border-border-2 bg-grey-1',
        dash: 'border border-dashed border-border-1 bg-white',
        'transparent-background': 'bg-white',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      textSize: {
        small:
          '[&>h5]:text-heading-8 [&>h5]:mt-2 [&>p]:text-caption-1 [&>p]:mt-1',
        large: '[&>h5]:text-heading-6 [&>p]:text-subtitle-2 [&>p]:mt-2',
        extra: '[&>h5]:text-heading-3 [&>p]:text-subtitle-1 [&>p]:mt-4',
      },
    },
    defaultVariants: {
      intent: 'transparent-background',
      fullWidth: true,
      textSize: 'large',
    },
  }
)

export const EmptyView = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyViewStyles>
>(({ className, intent, fullWidth, textSize, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={emptyViewStyles({ intent, fullWidth, textSize, className })}
      {...props}
    />
  )
})

export const EmptyViewTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cx(
      'text-typography-title tracking-tight text-center text-pretty w-10/12',
      className
    )}
    {...props}
  />
))

export const EmptyViewDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cx(
      'text-typography-subtitle text-center text-pretty w-3/4',
      className
    )}
    {...props}
  />
))
