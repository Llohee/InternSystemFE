import { cva } from 'class-variance-authority'

export const checkboxStyle = cva(
  'appearance-none cursor-pointer border w-5 h-5 p-[2px] border-border-1 hover:border-[#00358066] transition-all ease-in-out duration-100 rounded-md checked:bg-primary-base checked:shadow-primary-hover checked:shadow-sm indeterminate:shadow-primary-hover indeterminate:shadow-sm indeterminate:bg-primary-base indeterminate:after:absolute indeterminate:after:ml-[0.2rem] indeterminate:after:mt-[6px] indeterminate:after:w-[0.5rem] indeterminate:after:border-[0.12rem] indeterminate:after:border-solid indeterminate:after:border-white indeterminate:focus:after:w-[0.5rem] indeterminate:focus:after:rounded-none indeterminate:focus:after:border-[0.125rem] indeterminate:focus:after:border-b-0 indeterminate:focus:after:border-l-0 indeterminate:focus:after:border-r-0 checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.225rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white disabled:opacity-60',
  {
    variants: {
      size: {
        small: 'scale-75',
        large: '',
      },
    },
    defaultVariants: { size: 'small' },
  }
)
