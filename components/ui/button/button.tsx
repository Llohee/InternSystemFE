import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
  'relative whitespace-nowrap overflow-hidden tracking-wide transition-all disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        brand:
          'bg-brand-base enabled:hover:bg-brand-hover enabled:active:bg-brand-pressed  border-brand-base enabled:hover:border-brand-hover enabled:active:border-brand-pressed text-brand-base enabled:hover:text-brand-hover enabled:active:text-brand-pressed fill-brand-base enabled:hover:fill-brand-hover enabled:active:fill-brand-pressed stroke-brand-base enabled:hover:stroke-brand-hover enabled:active:stroke-brand-pressed',
        primary:
          'bg-primary-base shadow-primary-base enabled:hover:bg-primary-hover enabled:active:bg-primary-pressed  border-primary-base enabled:hover:border-primary-hover enabled:active:border-primary-pressed text-primary-base enabled:hover:text-primary-hover enabled:active:text-primary-pressed fill-primary-base enabled:hover:fill-primary-hover enabled:active:fill-primary-pressed stroke-primary-base enabled:hover:stroke-primary-hover enabled:active:stroke-primary-pressed',
        grey: 'bg-grey-2 shadow-grey-2 enabled:hover:bg-grey-4 enabled:active:bg-grey-5  border-grey-3 enabled:hover:border-primary-hover enabled:active:border-primary-pressed text-typography-subtitle enabled:hover:text-primary-hover enabled:active:text-primary-pressed enabled:hover:fill-primary-hover enabled:active:fill-primary-pressed enabled:hover:stroke-primary-hover enabled:active:stroke-primary-pressed',
        success:
          'bg-success-base shadow-success-base enabled:hover:bg-success-hover enabled:active:bg-success-pressed border-success-base enabled:hover:border-success-hover enabled:active:border-success-pressed text-success-base enabled:hover:text-success-hover enabled:active:text-success-pressed fill-success-base enabled:hover:fill-success-hover enabled:active:fill-success-pressed stroke-success-base enabled:hover:stroke-success-hover enabled:active:stroke-success-pressed',
        error:
          'bg-error-base shadow-error-base enabled:hover:bg-error-hover enabled:active:bg-error-pressed border-error-base enabled:hover:border-error-hover enabled:active:border-error-pressed text-error-base enabled:hover:text-error-hover enabled:active:text-error-pressed fill-error-base enabled:hover:fill-error-hover enabled:active:fill-error-pressed stroke-error-base enabled:hover:stroke-error-hover enabled:active:stroke-error-pressed',
        warning:
          'bg-warning-base shadow-warning-base enabled:hover:bg-warning-hover enabled:active:bg-warning-pressed border-warning-base enabled:hover:border-warning-hover enabled:active:border-warning-pressed text-warning-base enabled:hover:text-warning-hover enabled:active:text-warning-pressed fill-warning-base enabled:hover:fill-warning-hover enabled:active:fill-warning-pressed stroke-warning-base enabled:hover:stroke-warning-hover enabled:active:stroke-warning-pressed',
        disabled:
          'bg-grey-disabled border-grey-disabled text-typography-disabled',
      },
      btnStyle: {
        solid: 'border-none',
        ghost: 'border !bg-white',
        dash: 'border-dashed border !bg-white',
        'no-background': '!border-none !bg-transparent !p-0',
        'transparent-background': '!border-none',
      },
      size: {
        xs: 'text-button-5 px-[8px] py-[1px] rounded',
        small: 'text-button-3 px-[12px] py-[5px] rounded',
        medium: 'text-button-1 px-[20px] py-[9px] rounded-lg',
        large: 'text-button-1 px-[24px] py-[12px] rounded-lg',
        xl: 'text-button-1 px-[24px] py-[12px] rounded-lg',
      },
      iconOnly: {
        true: '!rounded-full !aspect-square',
      },
      bounce: {
        true: 'duration-300 ease-in-out enabled:hover:-translate-y-1 enabled:hover:shadow-lg shadow-primary-base',
      },
      posting: {
        true: 'duration-0 first:*:text-transparent',
      },
      // enable true if you want to style svg's stroke
      iconStroke: {
        true: '',
        false: '!stroke-none',
      },
      fullWidth: {
        true: 'w-full !transform-none',
        false: 'w-fit',
      },
      noScale: {
        true: '',
        false: 'enabled:active:scale-[0.96]',
      },
    },
    compoundVariants: [
      {
        intent: 'disabled',
        iconOnly: true,
        // className: 'opacity-20',
      },
      {
        intent: 'grey',
        btnStyle: 'solid',
        className:
          '!text-typography-subtitle !fill-typography-subtitle !stroke-typography-subtitle',
      },
      {
        intent: ['brand', 'primary', 'success', 'error', 'warning'],
        btnStyle: ['solid'],
        className: '!text-white !fill-white !stroke-white',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      btnStyle: 'solid',
      size: 'small',
      fullWidth: false,
      posting: false,
      iconOnly: false,
      iconStroke: false,
      bounce: false,
      noScale: false,
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  ariaLabel?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      posting,
      disabled,
      btnStyle,
      fullWidth,
      iconOnly,
      iconStroke,
      bounce,
      noScale,
      children,
      type,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={posting || disabled}
        type={type || 'button'}
        aria-label={props.ariaLabel}
        className={`${buttonStyles({
          intent: disabled ? 'disabled' : intent,
          btnStyle,
          size,
          posting,
          fullWidth,
          iconOnly,
          iconStroke,
          bounce,
          noScale,
          className,
        })}
        `}
        {...props}
      >
        <span className="flex justify-center items-center gap-1.5">
          {children}
        </span>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            posting ? 'block' : 'hidden'
          }`}
          role="status"
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6 animate-spin stroke-0"
          >
            <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </button>
    )
  }
)
// interface LinkButtonProps {
//   className?: string
//   children: React.ReactNode
//   href?: string
// }

// export const LinkButton = React.forwardRef(
//   (props: LinkButtonProps, ref: React.LegacyRef<HTMLAnchorElement>) => {
//     return (
//       <a
//         className={`${props.className} whitespace-nowrap overflow-hidden px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-primary rounded-md enabled:hover:bg-primary-hover focus:outline-none enabled:active:focus:duration-0 enabled:active:bg-primary-focus`}
//         href={props.href}
//         ref={ref}
//       >
//         {props.children}
//       </a>
//     )
//   }
// )
