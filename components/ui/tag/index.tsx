// @ts-nocheck
import { cva, VariantProps } from 'class-variance-authority'

const tagStyles = cva('w-fit flex justify-center items-center border', {
  variants: {
    intent: {
      primary: 'bg-info-background border-info-border text-info-base',
      grey: 'bg-grey-2 border-border-2 text-typography-subtitle',
      success: 'bg-success-background border-success-border text-success-base',
      error: 'bg-error-background border-error-border text-error-base',
      warning: 'bg-warning-background  border-warning-border text-warning-base',
      purple:
        'bg-secondary4-background  border-secondary4-border text-secondary4-base',
      disabled: 'bg-grey-disabled border-border-1 text-typography-disabled',
    },
    style: {
      solid: 'border',
      'no-border': 'border-transparent',
      ghost: 'bg-white',
    },
    size: {
      large: 'h-10 px-4 gap-2 text-button-4',
      medium: 'h-8 px-3 gap-2 text-button-4',
      small: 'h-6 px-2 gap-1.5 text-button-6',
      sm: 'h-7 px-2.5 gap-1.5 text-button-6',
    },
    iconOnly: {
      true: 'rounded-full aspect-square !px-0',
    },
    boxy: {
      true: 'rounded-lg',
      false: 'rounded-full',
    },
  },
  defaultVariants: {
    intent: 'primary',
    boxy: false,
    iconOnly: false,
    style: 'no-border',
    size: 'small',
  },
})

export interface TagProps extends VariantProps<typeof tagStyles> {
  children: React.ReactNode
  className?: string
  color?: string
  backgroundColor?: string
  borderColor?: string
}

export const Tag = (props: TagProps) => {
  return (
    <div
      style={{
        background: props.backgroundColor,
        borderColor: props.borderColor,
        color: props.color,
      }}
      className={tagStyles(props)}
    >
      {props.children}
    </div>
  )
}
